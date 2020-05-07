import React, { useState, useEffect } from 'react';

const verifyCaptchaUrl = 'https://54z0aarbpc.execute-api.eu-west-1.amazonaws.com/default/verify_reCaptcha_Function';

const block = {
  display: 'block',
} as React.CSSProperties;

const inline = {
  display: 'inline',
} as React.CSSProperties;

const pointer = {
  cursor: 'pointer'
} as React.CSSProperties;



function UserAdd(props) {

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

    window["verifyRecaptcha"] = verifyRecaptcha;
    window["addHandle"] = addHandle;

  // eslint-disable-next-line
  }, []);



  const verifyRecaptcha = async (token) => {

    const verify = (token): any => {
      return new Promise((resolve) => {
        (async () => {
          await fetch(`${verifyCaptchaUrl}`, {
              method: 'POST',
              body: JSON.stringify({ 'token': token })
            })
            .then(response => response.json())
            .then(response => {
              resolve(response)
            })
            .catch(() => {
              console.log(`Recaptcha verification failed`);
              resolve('');
            });
          })();
        });
      };

    const response = await verify(token);
    return JSON.parse(JSON.stringify(response));
  }



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

    script.type = "text/javascript"
    script.innerHTML = `
      grecaptcha.ready(function(){
          grecaptcha.execute("6LfDq_MUAAAAAB_Kefr15OvioLopWcs2YELeXbP9", {action: 'homepage'}).then(function(token) {
            const jwt = window["verifyRecaptcha"](token);
            if (jwt && jwt !== '') {
              window["addHandle"]('${handle}', jwt);
            }
          });
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
        <input className="inputIcon" placeholder={prompt} value={handle} onChange={handleChange} onKeyPress={handleKeypress} />
      </div>
    </div>
  );
}

export default UserAdd;
