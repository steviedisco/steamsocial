import React from 'react';


const img = {
  float: 'left',
  marginRight: '20px',
  marginBottom: '7px'
} as React.CSSProperties;

const userimg = {
  marginRight: '7px',
  marginBottom: '7px'
} as React.CSSProperties;

const imgs = {
  display: 'table',
  marginBottom: '30px'
} as React.CSSProperties;

const users = {
  display: 'inline',
} as React.CSSProperties;



function Game(props) {

  let { game } = props;
  const key = `img_${game.appID}`;

  return (
    <div style={imgs}>
      <h5>{game.name}</h5>
      <img key={key} src={game.logoURL} alt={game.name} style={img} />
      <div style={users}>
        { game.users.map(user =>
          <img key={`${key}_${user.nickname}`}
               src={user.avatar.medium}
               alt={user.nickname}
               title={user.nickname}
               style={userimg}
               width="29"
               height="29" />) }
      </div>
    </div>
  );
}

export default Game;
