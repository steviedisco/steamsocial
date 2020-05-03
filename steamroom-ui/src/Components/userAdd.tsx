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
  const [prompt, setPrompt] = useState('Enter your Steam Username');

  useEffect(() => {

    if (handleCount > 0) {
      setPrompt('Enter another Steam Username');
    } else {
      setPrompt('Enter your Steam Username');
    }


  }, [handleCount]);

  const addHandle = e => {
    addUserHandler(handle);
    setHandle('');
  }

  const handleChange = e => {
    setHandle(e.target.value);
  }

  const handleKeypress = e => {
    if (e.key === 'Enter' && e.target.value !== '') {
      addUserHandler(e.target.value);
      setHandle('');
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
