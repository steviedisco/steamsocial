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


export default function UserAdd(props) {

  let { addUserHandler, handleCount } = props;

  const [handle, setHandle] = useState('');
  const [prompt, setPrompt] = useState('Enter a Steam Username and press +');
  const [jwt, setJwt] = useState('');

  useEffect(() => {

    if (handleCount > 0) {
      setPrompt('Enter another Steam User');
    } else {
      setPrompt('Enter a Steam User and press +');
    }

  }, [handleCount]);


  useEffect(() => {

    window["verifyRecaptcha"] = client.verifyRecaptcha;
    window["addHandle"] = addHandle;

  // eslint-disable-next-line
  }, []);



  const addHandle = (handle, jwt) => {
    addUserHandler(handle, jwt);
    setJwt(jwt);
    setHandle('');
  }



  const tryAddHandle = () => {

    if (handle === '') {
      addUserHandler('', '');
      return;
    }

    if (jwt && jwt !== '') {
      addHandle(handle, jwt);
      return;
    }

    const script = document.createElement('script');

    script.type = "text/javascript";
    script.innerHTML = `
      grecaptcha.ready(function(){
        grecaptcha.execute("6LfDq_MUAAAAAB_Kefr15OvioLopWcs2YELeXbP9", {action: 'homepage'}).then(function(token) {
          window["verifyRecaptcha"](token, (jwt) => {
            if (jwt && jwt !== '') {
              window["addHandle"]('${handle}', jwt);
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
      tryAddHandle();
    }
  }



  return (
    <div style={block}>
      <div style={inline}>
        <i className="inputIcon material-icons" style={pointer} onClick={tryAddHandle}>add_circle</i>
        <input className="inputIcon" placeholder={prompt} value={handle} onChange={handleChange} onKeyPress={handleKeypress}
          ref={(node) => {
             if (node) {
               node.style.setProperty("max-width", "300px", "important");
             }
           }} />
      </div>
    </div>
  );
}



UserAdd.propTypes = {
  addUserHandler: PropTypes.any.isRequired,
  handleCount: PropTypes.any.isRequired,
};
