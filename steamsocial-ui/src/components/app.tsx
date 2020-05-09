import React, { useState, useEffect } from 'react';

import './../styles/app.css';

import UserList from './userList';
import UserAdd from './userAdd';
import GameList from './gameList';
import Theme from './theme';
import Alert from './alert';

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
  const [alertContent, setAlertContent] = useState('');
  const [jwt, setJwt] = useState('');

  useEffect(() => {

    const cacheValue = localStorage.getItem("handles")

    if (cacheValue && cacheValue !== '') {
      const cachedHandles = JSON.parse(cacheValue) as string[];
      if (cachedHandles.length) {

        window["verifyRecaptcha"] = client.verifyRecaptcha;
        window["setJwt"] = setJwt;
        window["setHandles"] = setHandles;
        window["cachedHandles"] = cachedHandles;

        const script = document.createElement('script');

        script.type = "text/javascript"
        script.innerHTML = `
          grecaptcha.ready(function(){
            grecaptcha.execute("6LfDq_MUAAAAAB_Kefr15OvioLopWcs2YELeXbP9", {action: 'homepage'}).then(function(token) {
              window["verifyRecaptcha"](token, (jwt) => {
                if (jwt && jwt !== '') {
                  window["setHandles"](window["cachedHandles"]);
                  window["setJwt"](jwt);
                }
              })
            })
          });
        `;

        document.body.appendChild(script);
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



  const addUserHandler = async (handle, token) => {

    if (handle === '') {
      setAlertContent("Please enter a valid Steam user");
      return;
    }

    if (token !== '') {
      setJwt(token);
    }

    if (!handles.includes(handle)) {

      await (async () => {
        const summary = await client.fetchSummary(handle, token);

        if (summary) {
          const added = handles.concat(handle);
          localStorage.setItem("handles", JSON.stringify(added));
          setHandles(added);
          setLastAction('add');
        } else {
          setAlertContent("User not found - is the user's profile public?");
          return;
        }
      })();
    } else {
      setAlertContent("User already added");
      return;
    }
  };

  const removeUserHandler = async (handle) => {

    if (handle === '') {
      setAlertContent("Username not provided");
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
      setAlertContent("User to remove not found");
    }
  };

  const closeAlert = () => {
    setAlertContent('');
  }


  const clearCacheButton =
      <div className="btn"
        onClick={clearCacheHandler}
        ref={(node) => {
        if (node) {
          node.style.setProperty("max-width", "350px", "important");
          node.style.setProperty("margin-bottom", "60px");
        }}}>Refresh</div>


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
          <UserList handles={handles} removeUserHandler={removeUserHandler} token={jwt} />
          <UserAdd addUserHandler={addUserHandler} handleCount={handles.length} />
          { handles.length < 2 ? <></> : clearCacheButton }
        </div>
      </div>
      <div className="section">
        <div className="body">
          <GameList handles={handles} scroll={lastAction === 'add'} token={jwt} />
        </div>
      </div>
      <Alert content={alertContent} onClose={closeAlert} />
    </div>
  );
}


export default App;
