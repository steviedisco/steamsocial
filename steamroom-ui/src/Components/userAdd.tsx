import React, { useState } from 'react';

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

  let { addUserHandler } = props;

  const [handle, setHandle] = useState('');

  const addHandle = e => {
    addUserHandler(handle);
    setHandle('');
  }

  const handleChange = e => {
    setHandle(e.target.value);
  }

  return (
    <div style={block}>
      <div style={inline}>
        <i className="inputIcon material-icons">face</i>
        <input className="inputIcon" placeholder="Add Steam User" value={handle} onChange={handleChange} />
      </div>
      <div style={inline}>
        <i className="inputIcon material-icons" style={pointer} onClick={addHandle}>add_circle</i>
      </div>
    </div>
  );
}

export default UserAdd;
