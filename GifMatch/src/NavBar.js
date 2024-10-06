import React, {useState, useEffect} from 'react';
import rotateRight from './assets/rotate-right.png';
import info from './assets/info.png';
import copyRight from './assets/copyright.png';
import './style/navBar.css';

export default function NavBar({ handleReset }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [showInfo, setShowInfo] = useState(false); // State to show/hide modal

    // No need dependency here because we initialize the event listener ady in the beginning
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('resize', handleResize); // Cleanup function
        };
    }, []);

    const handleInfoClick = () => {
        setShowInfo(true); 
    };

    const handleCloseModal = () => {
        setShowInfo(false); 
    };

    return (
        <div className="navbar">
            <div className="title">
                <h1>{windowWidth <= 1024 ? "GifMatch" : "GifMatch (Despicable Me ver.)"}</h1>
            </div>
            <div className="icons">
                <img 
                    src={rotateRight} 
                    alt="Rotate Right Icon"
                    onClick={handleReset}
                />
                <img 
                    src={info} 
                    alt="Info Icon"
                    onClick={handleInfoClick} 
                />
            </div>

            {showInfo && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <h2>About GifMatch</h2>
                        <p>
                            GifMatch is a fun card matching game where you flip cards to find matching GIFs! 
                            Match all pairs to win the game! 
                        </p>
                        <p>
                            Hope you enjoy playing it! 
                        </p>
                        <div className="credits">
                            <img 
                                src={copyRight}
                                alt="Copy Right Icon"
                            /> 
                            <h3>Mun Gian Soo. 2024</h3>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
