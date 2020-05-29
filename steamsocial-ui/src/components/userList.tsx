import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as client from './../library-client';



const block = {
  display: 'block',
} as React.CSSProperties;



export default function UserList(props) {

  let { mainUser, handles, addUserHandler, removeUserHandler, token } = props;

  const [summaries, setSummaries] = useState({} as any);

  useEffect(() => {

    if (!token || token === '') {
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

  if (!Object.keys(summaries)) {
    return null;
  }

  return (<div style={block}>
    {
      handles.map(handle => {
        const user = summaries[handle];
        if (user) {
          return (<div key={`user_${user.nickname}`}>
              <div style={block}>
                <input type="checkbox" onClick={() => toggleFriend(handle)} />
                <input value={user.nickname} disabled={true}
                  ref={(node) => {
                   if (node) {
                     node.style.setProperty("max-width", "290px", "important");
                   }
                 }} />
                 <img src={user.avatar.medium}
                      alt=""
                      title={user.nickname}
                      width="30"
                      height="30"
                      ref={(node) => {
                       if (node) {
                         node.style.setProperty("position", "relative");
                         node.style.setProperty("top", "10px");
                         node.style.setProperty("margin-left", "10px");
                       }
                     }} />
              </div>
            </div>
          );
        }

        return null;
      })
    }
  </div>);
}

UserList.propTypes = {
  mainUser: PropTypes.any.isRequired,
  handles: PropTypes.any.isRequired,
  addUserHandler: PropTypes.any.isRequired,
  removeUserHandler: PropTypes.any.isRequired,
  token: PropTypes.any.isRequired,
};
