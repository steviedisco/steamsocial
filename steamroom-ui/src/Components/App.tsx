import React from 'react';
import './../styles/app.css';

import GameList from './gameList';

function App() {
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
      </div>
      <GameList />
    </>
  );
}

export default App;
