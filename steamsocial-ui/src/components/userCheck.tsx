import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as client from './../library-client';

import Spinner from 'reactjs-simple-spinner'

export default function UserCheck(props) {

  let { userHandler, mainUser, waitingFunc, waiting } = props;

  const prompt = 'Enter your Steam profile name';
  const [handle, setHandle] = useState('');
  const [jwt, setJwt] = useState('');


  useEffect(() => {

    if (mainUser !== '') {
      setHandle(mainUser);
    }

    window["verifyRecaptcha"] = client.verifyRecaptcha;
    window["checkUser"] = checkUser;

  // eslint-disable-next-line
  }, [mainUser]);



  const checkUser = (handle, jwt) => {
    userHandler(handle, jwt);
    setJwt(jwt);
  }



  const tryCheckUser = () => {

    if (handle === '') {
      userHandler('', '');
      return;
    }

    if (jwt && jwt !== '') {
      checkUser(handle, jwt);
      return;
    }

    waitingFunc(true);

    const script = document.createElement('script');

    script.type = "text/javascript";
    script.innerHTML = `
      grecaptcha.ready(function(){
        grecaptcha.execute("6LfDq_MUAAAAAB_Kefr15OvioLopWcs2YELeXbP9", {action: 'homepage'}).then(function(token) {
          window["verifyRecaptcha"](token, (jwt) => {
            if (jwt && jwt !== '') {
              window["checkUser"]('${handle}', jwt);
            }
          })
        })
      });
    `;

    document.body.appendChild(script);
  }



  const handleChange = e => {
    setHandle(e.target.value);
  }

  const handleKeypress = e => {
    if (e.key === 'Enter') {
      tryCheckUser();
    }
  }

  return (
    <div style={{marginBottom: '20px'}}>
      <p style={{marginBottom: '20px', marginLeft: '10px'}}>
        {prompt}
      </p>
      <input value={handle} onChange={handleChange} onKeyPress={handleKeypress} style={{marginLeft: '3px', paddingLeft: '20px', fontSize: '18px', height: '60px', maxWidth: '333px'}} />
      <div className="btn" onClick={tryCheckUser} style={{display: 'flex', alignItems: 'center', height: '60px', justifyContent: 'center', maxWidth: '333px'}}>
        <span style={{marginRight: '20px'}}>Get Friends</span>
        { waiting ? <Spinner /> : <></> }
      </div>
    </div>
  );
}



UserCheck.propTypes = {
  userHandler: PropTypes.any.isRequired,
  mainUser: PropTypes.any.isRequired,
  waiting: PropTypes.any.isRequired,
  waitingFunc: PropTypes.any.isRequired,
};
