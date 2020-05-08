import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import * as client from './../library-client';



const block = {
  display: 'block',
} as React.CSSProperties;

const pointer = {
  cursor: 'pointer'
} as React.CSSProperties;



export default function UserList(props) {

  let { handles, removeUserHandler, token } = props;

  const [summaries, setSummaries] = useState({} as any);

  useEffect(() => {

    client.getSummaries(handles, token)
      .then(sums => {
        setSummaries(sums)
      });

  // eslint-disable-next-line
  }, [handles]);

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
                <input  className="inputIcon" value={user.nickname} disabled={true} />
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
