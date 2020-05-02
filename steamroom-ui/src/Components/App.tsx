import React, { useState } from 'react';
import './../styles/app.css';

import UserList from './userList';
import UserAdd from './userAdd';
import GameList from './gameList';

import * as client from './../library-client';


const themeBar = {
  display: 'block',
  marginTop: '20px',
  textAlign: 'right'
} as React.CSSProperties;

const marginBottom = {
  marginBottom: '60px'
} as React.CSSProperties;

const alignCenter = {
  textAlign: 'center'
} as React.CSSProperties;


function App() {

  const [handles, setHandles] = useState([] as string[]);

  const clearCacheHandler = () => {
    localStorage.clear();
    window.location.reload(false);
  }

  const addUserHandler = async (handle) => {

    if (handle === '') {
      alert("Please enter a Steam username");
      return;
    }

    if (!handles.includes(handle)) {

      await (async () => {
        const summary = await client.fetchSummary(handle);

        if (summary) {
          setHandles(handles.concat(handle));
        } else {
          alert("User not found");
          return;
        }
      })();
    } else {
      alert("User already added");
      return;
    }
  };

  const removeUserHandler = async (handle) => {

    if (handle === '') {
      alert("Username not provided");
      return;
    }

    const index = handles.indexOf(handle);
    if (index > -1) {
      const copy = handles.splice(0);
      copy.splice(index, 1);
      setHandles(copy);
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="header">
          <h2>Steam Room</h2>
        </div>
        <div className="body">
          <p style={{ ...alignCenter, ...marginBottom }}>
            Compare Steam libraries to help organise online multiplayer sessions with your friends.
          </p>
        </div>
      </div>
      <div className="btns row themeSelector" style={themeBar}></div>
      <div className="section">
        <div className="body">
          <UserList handles={handles} removeUserHandler={removeUserHandler} />
          <UserAdd addUserHandler={addUserHandler} />
          <div className="btn" style={marginBottom} onClick={clearCacheHandler}>Clear cache</div>
        </div>
      </div>
      <div className="section">
        <div className="body">
          <GameList handles={handles} />
        </div>
      </div>
    </div>
  );
}

export default App;
