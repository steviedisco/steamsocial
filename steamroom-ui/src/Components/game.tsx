import React from 'react';

function Game(props) {

  const key = props.game.appID;
  const name = props.game.name;
  const logoUrl = props.game.logoURL;

  return (
    <div>
      <h5>{name}</h5>
      <img src={logoUrl} alt={name} key={key} />
    </div>
  );
}

export default Game;
