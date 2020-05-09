import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as client from './../library-client';



const block = {
  display: 'block',
} as React.CSSProperties;

const pointer = {
  cursor: 'pointer'
} as React.CSSProperties;

const userimg = {
  position: 'absolute',
  left: '360px',
  marginTop: '9px',
} as React.CSSProperties;

const input = {
  maxWidth: '350px',
} as React.CSSProperties;


export default function UserList(props) {

  let { handles, removeUserHandler, token } = props;

  const [summaries, setSummaries] = useState({} as any);

  useEffect(() => {

    if (!token || token === '') {
      return;
    }

    client.getSummaries(handles, token)
      .then(sums => {
        setSummaries(sums)
      });

  // eslint-disable-next-line
}, [handles, token]);

  const removeHandle = handle => {
    removeUserHandler(handle);
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
                <i className="inputIcon material-icons" style={pointer} onClick={() => removeHandle(handle)}>remove_circle</i>
                <img src={user.avatar.medium}
                     title={user.nickname}
                     style={userimg}
                     width="30"
                     height="30" />
                <input className="inputIcon" value={user.nickname} disabled={true} style={input} />
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
  handles: PropTypes.any.isRequired,
  removeUserHandler: PropTypes.any.isRequired,
  token: PropTypes.any.isRequired,
};
