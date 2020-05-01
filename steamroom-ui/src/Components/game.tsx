import React from 'react';


const img = {
  float: 'left',
  marginRight: '20px'
} as React.CSSProperties;

const userimg = {
  marginRight: '10px'
} as React.CSSProperties;

const div = {
  display: 'table',
  marginBottom: '20px'
} as React.CSSProperties;

const title = {
  display: 'inline-block',
  width: '400px',
  maxWidth: '400px',
  marginRight: '20px'
} as React.CSSProperties;

const users = {
  display: 'inline-block',
} as React.CSSProperties;

const row = {
  display: 'table-row',
} as React.CSSProperties;

const cell = {
  display: 'table-cell',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '400px',
  maxWidth: '400px',
  whiteSpace: 'nowrap'
} as React.CSSProperties;



function Game(props) {

  let { game } = props;
  const key = `img_${game.appID}`;

  return (
    <div style={div}>
      <div style={title}>
        <h5 style={cell}>{game.name}</h5>
        <h5 style={row}>x{game.owned}</h5>
      </div>
      <div style={users}>
        { game.users.map(user => <img key={`${key}_${user.nickname}`} src={user.avatar.medium} alt={user.nickname} style={userimg} />) }
      </div>
      <img key={key} src={game.logoURL} alt={game.name} style={img} />
    </div>
  );
}

export default Game;
