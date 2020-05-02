import React, { useState, useEffect } from 'react';

import * as client from './../library-client';



const block = {
  display: 'block',
} as React.CSSProperties;

const pointer = {
  cursor: 'pointer'
} as React.CSSProperties;

const inline = {
  display: 'inline',
} as React.CSSProperties;


function UserList(props) {

  let { handles, removeUserHandler } = props;

  const [summaries, setSummaries] = useState({} as any);

  useEffect(() => {

    client.getSummaries(handles)
      .then(sums => {
        setSummaries(sums)
      });

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
          return (<>
            <div style={block}>
              <i className="inputIcon material-icons">face</i>
              <input key={`user_${user.nickname}`} className="inputIcon" value={user.nickname} disabled={true} />
              <div style={inline}>
                <i className="inputIcon material-icons" style={pointer} onClick={() => removeHandle(user.nickname)}>remove_circle</i>
              </div>
            </div>
            </>
          );
        }

        return <></>;
      })
    }
  </div>);
}

export default UserList;
