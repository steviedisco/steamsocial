import React, { useState, useEffect } from 'react';

import './../styles/app.css';

import UserList from './userList';
import UserCheck from './userCheck';
import GameList from './gameList';
import Theme from './theme';
import Alert from './alert';

import * as client from './../library-client';

const marginBottom = {
  marginBottom: '40px'
} as React.CSSProperties;

const alignCenter = {
  textAlign: 'center',
  display: 'block'
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
  const [mainUser, setMainUser] = useState('');
  const [lastAction, setLastAction] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const [jwt, setJwt] = useState('');
  const [waiting, setWaiting] = useState(false);
  const [summaries, setSummaries] = useState({} as any);

  useEffect(() => {

    const mainUserCache = localStorage.getItem("mainUser")
    // const handleCache = localStorage.getItem("handles")

    if (mainUserCache && mainUserCache !== '') {

      window["verifyRecaptcha"] = client.verifyRecaptcha;
      window["setJwt"] = setJwt;
      window["setMainUser"] = setMainUser;
      window["setHandles"] = setHandles;
      window["mainUser"] = mainUserCache;

      // if (handleCache && handleCache !== '') {
      //   const cachedHandles = JSON.parse(handleCache) as string[];
      //   window["cachedHandles"] = cachedHandles;
      // }

      const script = document.createElement('script');

      script.type = "text/javascript"
      script.innerHTML = `
        grecaptcha.ready(function(){
          grecaptcha.execute("6LfDq_MUAAAAAB_Kefr15OvioLopWcs2YELeXbP9", {action: 'homepage'}).then(function(token) {
            window["verifyRecaptcha"](token, (jwt) => {
              if (jwt && jwt !== '') {
                window["setMainUser"](window["mainUser"]);
                window["setJwt"](jwt);

                // if (window["cachedHandles"] !== undefined) {
                //   window["setHandles"](window["cachedHandles"]);
                // }
              }
            })
          })
        });
      `;

      document.body.appendChild(script);
    }

  }, []);



  const clearCacheHandler = () => {
    const theme = localStorage.getItem("fluidTheme") as string;
    localStorage.clear();
    localStorage.setItem("mainUser", mainUser);
    localStorage.setItem("handles", JSON.stringify(handles));
    localStorage.setItem("fluidTheme", theme);

    window.location.reload(false);
  }


  const waitingHandler = value => {
    setWaiting(value);
  };


  const userHandler = async (handle, token) => {

    if (handle === '') {
      setAlertContent("Please enter a valid Steam user");
      return;
    }

    if (token !== '') {
      setJwt(token);
    }

    if (!handles.includes(handle)) {

      await (async () => {
        const summary = await client.fetchSummaryByHandle(handle, token) as any;

        if (summary) {
          localStorage.setItem("mainUser", handle);
          setMainUser(handle);
          const added = [].concat(summary.steamID);
          localStorage.setItem("handles", JSON.stringify(added));
          setHandles(added);
          setLastAction('add');
          return summary;
        } else {
          setAlertContent("User not found - is your profile public?");
        }
      })();
    } else {
      setAlertContent("User already added");
    }
  };



  const reloadHandler = async (id, token) => {

    if (id === '') {
      setAlertContent("Please enter a valid Steam user");
      return;
    }

    if (token !== '') {
      setJwt(token);
    }

    let summary = {} as any;

    if (!handles.includes(id)) {

      await (async () => {
        summary = await client.fetchSummary(id, token) as any;

        if (summary) {
          const added = [].concat(summary.steamID);
          localStorage.setItem("handles", JSON.stringify(added));
          setHandles(added);
          setLastAction('add');
        } else {
          setAlertContent("User not found - is your profile public?");
        }
      })();
    } else {
      setAlertContent("User already added");
    }

    return summary;
  };


  const addUserHandler = async (handle, token) => {

    if (handle === '') {
      setAlertContent("Please enter a valid Steam user");
      return;
    }

    if (token !== '') {
      setJwt(token);
    }

    if (!handles.includes(handle)) {
      const added = handles.concat(handle);
      localStorage.setItem("handles", JSON.stringify(added));
      setHandles(added);
      setLastAction('add');
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


  const passSummaries = async (sums) => {
    const mainID = localStorage.getItem(`${mainUser}_steamid`);

    reloadHandler(mainID, jwt)
      .then(sum => {
        sums.splice(0, 0, sum);
        setSummaries(sums);
      });
  };


  const closeAlert = () => {
    setAlertContent('');
  }


  const clearCacheButton =
      <div className="btn"
        onClick={clearCacheHandler}
        style={{display: 'flex', alignItems: 'center', height: '60px', justifyContent: 'center', maxWidth: '333px'}}>
        Refresh Cache
      </div>;


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
          <p style={marginBottom}>
            Compare Steam libraries to help organise online multiplayer sessions with your friends.
          </p>
          {/* <p style={marginBottom}>
            Ensure the accounts you want to compare have both a public profile and a public games list.
          </p> */}
          <p style={marginBottom}>
            If you find the service useful, please consider supporting me on ko-fi.<br/><br/><br/><br/>
            <span style={alignCenter}>
              <a href='https://ko-fi.com/Q5Q61R4DM' target='_new'><img height='36' style={{border:'0px', height:'36px'}} src='https://cdn.ko-fi.com/cdn/kofi3.png?v=2'  alt='Buy Me a Coffee at ko-fi.com' /></a>
            </span>
            <br/>
          </p>
        </div>
      </div>
      <div className="section">
        <div className="body">
          <UserCheck waiting={waiting} waitingFunc={waitingHandler} userHandler={userHandler} mainUser={mainUser} />
          <UserList passSummaries={passSummaries} waitingFunc={waitingHandler} mainUser={mainUser} handles={handles} addUserHandler={addUserHandler} removeUserHandler={removeUserHandler} token={jwt} />
          { summaries.length < 2 ? <></> : clearCacheButton }
        </div>
      </div>
      <div className="section">
        <div className="body">
          <GameList handles={handles} scroll={lastAction === 'add'} token={jwt} summaries={summaries} />
        </div>
      </div>
      <div className="section">
        <div className="body">
          <div>
            <br/><br/>
            Please send bug reports and feature requests to <a href='mailto:steve@steviedis.co'>steve@steviedis.co</a>
          </div>
          <div style={alignCenter}>
            <br/><br/>
            <a href='/privacypolicy.html' target='_new'>Privacy policy</a><br/><br/>
          </div>
        </div>
      </div>
      <Alert content={alertContent} onClose={closeAlert} />
    </div>
  );
}


export default App;
