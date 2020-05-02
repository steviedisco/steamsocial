import React from 'react';

const block = {
  display: 'block',
} as React.CSSProperties;

const inline = {
  display: 'inline',
} as React.CSSProperties;



function User(props) {

  let { user } = props;

  return (
    <div style={block}>
      <div style={inline}>
        <i className="inputIcon material-icons">face</i>
      </div>
      <div style={inline}>
        <span>{ user.nickname }</span>
      </div>
    </div>
  );
}

export default User;
