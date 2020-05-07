import React, { useState, useEffect } from 'react';


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

  useEffect(() => {

    if (handleCount > 0) {
      setPrompt('Enter another Steam User');
    } else {
      setPrompt('Enter a Steam User and press +');
    }


  }, [handleCount]);


  const verifyRecaptcha = (token, handle) => {
    console.log(token, "<= your recaptcha token")

    addUserHandler(handle);
    setHandle('');
  }


  const addHandle = () => {

    window["verifyRecaptcha"] = verifyRecaptcha;

    const script = document.createElement('script');

    script.type = "text/javascript"
    script.innerHTML = `
      grecaptcha.ready(function(){
          grecaptcha.execute("6LfDq_MUAAAAAB_Kefr15OvioLopWcs2YELeXbP9", {action: 'homepage'}).then(function(token) {
            window["verifyRecaptcha"](token, "${handle}");
          });
      });
    `;

    document.body.appendChild(script);
  }

  const handleChange = e => {
    setHandle(e.target.value);
  }

  const handleKeypress = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      addHandle(e);
    }
  }

  return (
    <div style={block}>
      <div style={inline}>
        <i className="inputIcon material-icons" style={pointer} onClick={addHandle}>add_circle</i>
        <input className="inputIcon" placeholder={prompt} value={handle} onChange={handleChange} onKeyPress={handleKeypress} />
      </div>
    </div>
  );
}

export default UserAdd;
