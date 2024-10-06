import React from 'react';
import './style/home.css';
import copyRight from './assets/copyright.png';
import giphyLogo from './assets/giphy-logo.png';

export default function Home({onAnyClick}) {
    return (
        <div className="home" onClick={onAnyClick}>
            <div className="home-content">
                <h1>Welcome to 
                    <span className="name">GifMatch</span>!
                </h1>
                <p className="twinkling-text">
                    Click anywhere on the screen to start the game!
                </p>

                <div className="extra-info">
                    <h2>
                        Powered by <span className="powered-by"></span>
                        <img 
                            className="giphy-logo"
                            src={giphyLogo}
                            alt="Copy Right Icon"
                        />  
                    </h2>
                    <div className="author">
                            <img 
                                src={copyRight}
                                alt="Copy Right Icon"
                            /> 
                        <h2>Mun Gian Soo. 2024</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}