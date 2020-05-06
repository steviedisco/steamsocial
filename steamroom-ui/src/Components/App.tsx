import React, { useState, useEffect } from 'react';
import './../styles/app.css';

import UserList from './userList';
import UserAdd from './userAdd';
import GameList from './gameList';
import Theme from './theme';

import * as client from './../library-client';

const marginBottom = {
  marginBottom: '60px'
} as React.CSSProperties;

const alignCenter = {
  textAlign: 'center'
} as React.CSSProperties;


function App() {

  const [handles, setHandles] = useState([] as string[]);

  useEffect(() => {

    const cacheValue = localStorage.getItem("handles")

    if (cacheValue && cacheValue !== '') {
      const cachedHandles = JSON.parse(cacheValue) as string[];
      if (cachedHandles.length) {
        setHandles(cachedHandles)
      }
    }

  }, []);

  const clearCacheHandler = () => {
    const theme = localStorage.getItem("fluidTheme") as string;
    localStorage.clear();
    localStorage.setItem("handles", JSON.stringify(handles));
    localStorage.setItem("fluidTheme", theme);

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
          const added = handles.concat(handle);
          localStorage.setItem("handles", JSON.stringify(added));
          setHandles(added);
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
      const removed = handles.splice(0);
      removed.splice(index, 1);
      localStorage.setItem("handles", JSON.stringify(removed));
      setHandles(removed);
    } else {
      alert("User not found");
    }
  };

  return (
    <div className="container">
      <div className="section">
        <div className="body">
          <Theme />
        </div>
        <div className="header">
          <h2>Steam Social</h2>
        </div>
        <div className="body">
          <p style={{ ...alignCenter, ...marginBottom }}>
            Compare Steam libraries to help organise online multiplayer sessions with your friends.
          </p>
        </div>
      </div>
      <div className="section">
        <div className="body">
          <UserList handles={handles} removeUserHandler={removeUserHandler} />
          <UserAdd addUserHandler={addUserHandler} handleCount={handles.length} />
          { handles.length < 2 ? <></> : <div className="btn" style={marginBottom} onClick={clearCacheHandler}>Refresh</div> }
        </div>
      </div>
      <div className="section">
        <div className="body">
          <br/>
          <br/>
          <GameList handles={handles} />
        </div>
      </div>
    </div>
  );
}

export default App;
