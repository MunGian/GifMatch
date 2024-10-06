import React, {useState} from 'react';
import Home from './Home'
import Main from './Main';

export default function App() {
  const [isHome, setIsHome] = useState(true);

  function onAnyClick() {
    setIsHome(false);
  }

  return (
    <div>
      {isHome ? <Home onAnyClick={onAnyClick} /> : <Main />}
    </div>
  );
}

