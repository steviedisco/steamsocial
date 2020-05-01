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

  let { game } = props;
  const key = `img_${game.appID}`;

  return (
    <div style={div}>
      <div style={inline}>
        <h5 style={row}>{game.name}</h5>
        <h5 style={row}>x{game.owned}</h5>
      </div>
      <img key={key} src={game.logoURL} alt={game.name} style={img} />
    </div>
  );
}

export default Game;
