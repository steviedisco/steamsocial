import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as client from './../library-client';

const block = {
  display: 'block',
} as React.CSSProperties;

const inline = {
  display: 'inline',
} as React.CSSProperties;

const pointer = {
  cursor: 'pointer'
} as React.CSSProperties;


export default function UserCheck(props) {

  let { userHandler } = props;

  const prompt = 'Enter your Steam profile name';
  const [handle, setHandle] = useState('');
  const [jwt, setJwt] = useState('');


  useEffect(() => {

    window["verifyRecaptcha"] = client.verifyRecaptcha;
    window["checkUser"] = checkUser;

  // eslint-disable-next-line
  }, []);



  const checkUser = (handle, jwt) => {
    userHandler(handle, jwt);
    setJwt(jwt);
    setHandle('');
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
    <div style={block}>
      <div style={inline}>
        <input placeholder={prompt} value={handle} onChange={handleChange} onKeyPress={handleKeypress}
          ref={(node) => {
             if (node) {
               node.style.setProperty("max-width", "300px", "important");
             }
           }} />
         <div className="btn" onClick={tryCheckUser}>
           <i className="material-icons" style={pointer}>group_add</i>
         </div>
      </div>
    </div>
  );
}



UserCheck.propTypes = {
  userHandler: PropTypes.any.isRequired,
};
