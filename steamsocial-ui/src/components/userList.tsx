import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as client from './../library-client';

const block = {
  display: 'block',
} as React.CSSProperties;



export default function UserList(props) {

  let { mainUser, addUserHandler, removeUserHandler, token } = props;

  const [summaries, setSummaries] = useState({} as any);


  useEffect(() => {

    if (!token || token === '' || mainUser === '') {
      return;
    }

    client.fetchFriends(mainUser, token)
      .then(sums => {
        setSummaries(sums)
      });

  // eslint-disable-next-line
  }, [mainUser, token]);


  const toggleFriend = handle => event => {
    if (event.target.value) {
      addUserHandler(handle);
    } else {
      removeUserHandler(handle);
    }
  }

  if (!summaries || Object.keys(summaries).length === 0) {
    return null;
  }

  return (<div style={block}>
    <div className={'list select multiple'} style={{backgroundColor: 'transparent'}}>
    {

      summaries.map(user => {
        return (<div className="item" key={`user_${user.nickname}`}
          style={{
            marginBottom: '10px',
            backgroundColor: 'var(--inputColor)',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '300px'}}>
          <img src={user.avatar.medium}
               alt=""
               title={user.nickname}
               width="30"
               height="30"
               onClick={() => toggleFriend(user.steamID)}
               style={{marginRight: '20px'}}/>
               {user.nickname}
            </div>)
          })}
          </div>
        </div>)
      }


UserList.propTypes = {
  mainUser: PropTypes.any.isRequired,
  handles: PropTypes.any.isRequired,
  addUserHandler: PropTypes.any.isRequired,
  removeUserHandler: PropTypes.any.isRequired,
  token: PropTypes.any.isRequired,
};
