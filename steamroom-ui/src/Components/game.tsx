import React from 'react';


const img = {
  float: 'left',
  marginRight: '20px'
} as React.CSSProperties;

const div = {
  display: 'table',
  marginBottom: '20px'
} as React.CSSProperties;

const inline = {
  display: 'inline',
} as React.CSSProperties;

const row = {
  display: 'table-row',
} as React.CSSProperties;

function Game(props) {

  const key = props.game.appID;
  const name = props.game.name;
  const logoUrl = props.game.logoURL;
  const owned = props.game.owned;

  return (
    <div style={div}>
      <div style={inline}>
        <h5 style={row}>{name}</h5>
        <h5 style={row}>x{owned}</h5>
      </div>
      <img key={key} src={logoUrl} alt={name} style={img} />
    </div>
  );
}

export default Game;
