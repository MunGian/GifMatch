import React, { useState, useEffect } from "react";
import "./style/gifCard.css";
import icon from "./assets/icon.png";

export default function GifCard(props) {
  const [isFlipping, setIsFlipping] = useState(false); // State to manage delay
  const [showGif, setShowGif] = useState(false);

  // console.log(props.uniqueId);

  useEffect(() => {
    let timer;
    if (props.isFlipped) {
      setIsFlipping(true);
      timer = setTimeout(() => {
        setShowGif(true);
        setIsFlipping(false); // Reset the flipping state after delay
      }, 400); // Delay to match flip transition
    } else {
      setShowGif(false);
    }
    return () => clearTimeout(timer);
  }, [props.isFlipped]);

  return (
    <div
      className="gif-card"
      onClick={() => props.handleFlip(props.uniqueId, props.id)}
    >
      <div
        className={`flip-container ${
          props.isFlipped && !isFlipping ? "flipped" : ""
        }`}
      >
        {props.isFlipped ? (
          <div className="gif-card-front">
            {showGif && (
              <img src={props.url} alt="Minions GIF" className="gif-img" />
            )}
          </div>
        ) : (
          <div className="gif-card-back">
            <img src={icon} alt="icon" className="gif-img" />
          </div>
        )}
      </div>
    </div>
  );
}
