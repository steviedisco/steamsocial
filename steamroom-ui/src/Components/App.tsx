import React from 'react';
import './../styles/app.css';

import GameList from './gameList';


const margin = {
  marginBottom: '20px'
} as React.CSSProperties;


function App() {

  const clearCacheHandler = e => {
    localStorage.clear();
    window.location.reload(false);
  }

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="header">
            <h1>Steam Room</h1>
          </div>
          <pre>
            <code className="prettyprint prettyprinted">
              Compare Steam libraries to help organise online multiplayer sessions with your friends.
            </code>
          </pre>
        </div>
        <div className="btn" style={margin} onClick={clearCacheHandler}>Clear cache</div>
      </div>
      <GameList />
    </>
  );
}

export default App;
