import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import * as client from './../library-client';

import Spinner from 'reactjs-simple-spinner'

const block = {
  display: 'block',
} as React.CSSProperties;



export default function UserList(props) {

  let { mainUser, addUserHandler, handles, removeUserHandler, token, waitingFunc, passSummaries, waiting, waitingHandle, userWaitingFunc } = props;

  const [summaries, setSummaries] = useState({} as any);

  const listRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const scrollToList = () => {
    if (listRef) {
      scrollToRef(listRef)
    }
  };


  useEffect(() => {
    if (summaries && summaries.length > 1) {
      scrollToList();
    }
  // eslint-disable-next-line
  }, [summaries]);


  useEffect(() => {

    if (!token || token === '' || mainUser === '') {
      return;
    }

    client.fetchFriends(mainUser, token)
      .then(sums => {
        setSummaries(sums);
        passSummaries(sums);
        if (waitingFunc && waitingFunc !== null) {
          waitingFunc(false);
        }
      });

  // eslint-disable-next-line
  }, [mainUser, token]);


  const toggleFriend = handle => {

    userWaitingFunc(true, handle);

    if (!handles.includes(handle)) {
      addUserHandler(handle, token);
    } else {
      removeUserHandler(handle, token);
    }
  }

  if (!summaries || Object.keys(summaries).length === 0) {
    return null;
  }

  let initAttr = {'init': 'true'};

  return (<div style={block} ref={listRef}>
    <p style={{fontSize:'18px', marginLeft: '10px', paddingTop: '20px'}}>
      Select friends to compare.<br/><br/>
      Scroll down for results.
    </p>
    <div className="list select multiple" style={{
      maxWidth: '333px', marginLeft: '5px', marginBottom: '20px'}}>
    {
      summaries.map(user => { return user === undefined ? <></> :
       (<div {...initAttr} className={handles.includes(user.steamID) ? 'item active' : 'item'} key={`user_${user.nickname}`}
          style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            maxWidth: '333px'}}

            onClick={event => {
              if ($(event.target).parent().hasClass("multiple")) {
                $(event.target).toggleClass("active")
              } else {
                $(event.target).siblings().removeClass("active")
                $(event.target).addClass("active")
              }
              $(event.target).attr("init", "true");
              toggleFriend(user.steamID)
            }}>
            <img src={user.avatar.medium}
               alt=""
               title={user.nickname}
               width="30"
               height="30"
               style={{marginRight: '20px'}}/>
               <span style={{marginRight: '20px'}}>{user.nickname}</span>
               { waiting && waitingHandle === user.steamID ? <Spinner /> : <></> }
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
  waitingFunc: PropTypes.any,
  userWaitingFunc: PropTypes.any,
  passSummaries: PropTypes.any.isRequired,
  waiting: PropTypes.any,
  waitingHandle: PropTypes.any,
};
