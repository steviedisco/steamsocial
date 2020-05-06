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

const header = {
  textAlign: 'center',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  padding: '20px 0'
} as React.CSSProperties;


function App() {

  const [handles, setHandles] = useState([] as string[]);
  const [lastAction, setLastAction] = useState('');

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
          setLastAction('add');
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
      setLastAction('remove');
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
        <div style={header}>
          <h2>Steam Social</h2>
        </div>
        <div className="body">
          <p style={{ ...alignCenter, ...marginBottom }}>
            Compare Steam libraries to help organise online multiplayer sessions with your friends.
          </p>
          <p style={{ ...alignCenter, ...marginBottom }}>
            To use the service, ensure the accounts you are comparing have both a public profile and a public games list.
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
          <GameList handles={handles} scroll={lastAction === 'add'} />
        </div>
      </div>
    </div>
  );
}

export default App;
