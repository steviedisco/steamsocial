import React from 'react';


const h5 = {
  display: 'inline'
} as React.CSSProperties;

const img = {
  float: 'left',
  marginRight: '20px'
} as React.CSSProperties;

const div = {
  display: 'table',
  marginBottom: '20px'
} as React.CSSProperties;

function Game(props) {

  const key = props.game.appID;
  const name = props.game.name;
  const logoUrl = props.game.logoURL;

  return (
    <div style={div}>
      <h5 style={h5}>{name}</h5>
      <img key={key} src={logoUrl} alt={name} style={img} />
    </div>
  );
}

export default Game;
