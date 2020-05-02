import React from 'react';


const img = {
  float: 'left',
  marginRight: '20px'
} as React.CSSProperties;

const userimg = {
  marginRight: '10px'
} as React.CSSProperties;

const headerRow = {
  display: 'table',
  marginBottom: '10px'
} as React.CSSProperties;

const imgs = {
  display: 'table',
  marginBottom: '30px'
} as React.CSSProperties;

const users = {
  display: 'inline-block',
} as React.CSSProperties;

const header = {
  display: 'inline',
} as React.CSSProperties;


function Game(props) {

  let { game } = props;
  const key = `img_${game.appID}`;

  return (
    <>
    <div style={headerRow}>
      <h5 style={header}>x{game.owned} {game.name}</h5>
    </div>
    <div style={imgs}>
      <div style={users}>
        { game.users.map(user => <img key={`${key}_${user.nickname}`} src={user.avatar.medium} alt={user.nickname} title={user.nickname} style={userimg} />) }
      </div>
      <img key={key} src={game.logoURL} alt={game.name} style={img} />
    </div></>
  );
}

export default Game;
