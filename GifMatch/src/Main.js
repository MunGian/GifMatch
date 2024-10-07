import React, { useEffect, useState } from "react";
import gifCardData from "./gifCardData";
import GifCard from "./gifCard";
import NavBar from "./NavBar";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import "./style/main.css";

export default function Main() {
  const [gifCards, setGifCards] = useState(duplicateAndShuffle(gifCardData));
  const [flippedCards, setFlippedCards] = useState([]); // array for checking the current 2 flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // array for storing matched pair after checking (2 flipped cards are same)
  const [showConfetti, setShowConfetti] = useState(false); // useState for showing confetti after matching all the cards :>
  const [isClickable, setIsClickable] = useState(true);  // useState for disabling clicks when 2 cards are flipped

  // Function to duplicate each item in gifCardData and shuffle the result
  function duplicateAndShuffle(data) {
    // Shuffle the array
    const shuffledData = data.sort(() => Math.random() - 0.5); // Shuffle the array

    // Select the first 9 gifdata
    const selectedGifData = shuffledData.slice(0, 9); // Get the first 9 gifdata

    // Duplicate each card and assign a new uniqueId to the duplicated copy
    const duplicatedData = selectedGifData.flatMap((item) => [
      item,
      { ...item, uniqueId: nanoid() },
    ]); 
    return duplicatedData.sort(() => Math.random() - 0.5); // Shuffle the array
  }

  // Function to handle click on the card
  function handleFlip(uniqueId, id) {

    // Ignore click when waiting for mismatched cards to flip back
    // after the 1.4s delay (setTimeOut())
    if (!isClickable) return;  

    // Ignore click if the same card is clicked twice
    if (flippedCards.length === 1 && flippedCards[0].uniqueId === uniqueId) {
      return; // Do nothing if the same card is clicked
    }  

    // Check if the card is already matched
    // basically means if the card is opened and matched ady,
    // it will not run any flipping effect below and return directly
    // even if the player clicks on the particular card over and over again
    const isMatched = matchedCards.some((card) => card.uniqueId === uniqueId);

    // If the card is matched previously, do nothing and return early
    if (isMatched) {
      return;
    }

    // else, change the isFlipped to true so the card can flip
    // means run the flipping effect
    const updatedGifData = gifCards.map((gif) =>
      gif.uniqueId === uniqueId ? { ...gif, isFlipped: !gif.isFlipped } : gif
    );
    setGifCards(updatedGifData);

    // Check if the card is already in the flippedCards array
    // (To prevent adding to flippedCards array if the
    //  user clicks on the same card twice in a row)
    const isAlreadyFlipped = flippedCards.some(
      (card) => card.uniqueId === uniqueId
    );

    // Only add the card to flippedCards if it hasn't already been added
    if (!isAlreadyFlipped) {
      setFlippedCards([...flippedCards, { uniqueId, id }]);
    }
    // console.log(('flip'));
  }

  function handleReset() {
    setGifCards(duplicateAndShuffle(gifCardData));
    setFlippedCards([]);
    setMatchedCards([]);
    setShowConfetti(false);
  }

  useEffect(() => {
    // Check if the flipped cards match (the two cards currently opened by the player),
    // max items in flippedCards array (useState) is 2, if not matched, reset the flippedCards array to empty array
    if (flippedCards.length === 2) {
      if (flippedCards[0].id === flippedCards[1].id) {
        setMatchedCards([...matchedCards, flippedCards[0], flippedCards[1]]);
      } else {
        setIsClickable(false);  // Disable clicks
        // Flip the two cards back after 1 second if they are not matched
        setTimeout(() => {
          const updatedGifData = gifCards.map((gif) =>
            gif.uniqueId === flippedCards[0].uniqueId ||
            gif.uniqueId === flippedCards[1].uniqueId
              ? { ...gif, isFlipped: false }
              : gif
          );
          setGifCards(updatedGifData);
          setIsClickable(true);  // Re-enable clicks
        }, 1200);
      }
      setFlippedCards([]);
    }

    if (matchedCards.length === gifCards.length) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [flippedCards, matchedCards, gifCards]);

  const gifDisplay = gifCards.map((gif) => {
    return (
      <GifCard
        key={gif.uniqueId}
        id={gif.id}
        uniqueId={gif.uniqueId}
        url={gif.url}
        isFlipped={gif.isFlipped}
        handleFlip={handleFlip}
      />
    );
  });

  return (
    <div>
      <NavBar handleReset={handleReset}/>
      <div className="container">
        {gifDisplay}
        {showConfetti && <Confetti />}
      </div>
    </div>
  );
}
