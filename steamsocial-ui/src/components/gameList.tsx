import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Game from './game';
import * as client from './../library-client';

const multiplayerIds = require('./../data/multiplayer.json');

const marginBottom = {
  marginBottom: '20px'
} as React.CSSProperties;



function PopulateList(props): any {

    let { games, multiplayerOnly } = props;

    if (!games || !games.length) {
      return null;
    }

    let output: any[] = [];

    games.forEach(game => {
      const key = `game_${game.appID}`;

      if (multiplayerOnly && !multiplayerIds.includes(game.appID)) {
        return;
      }

      output.push(<Game key={key} game={game} />);
    });

    if (output.length) {
      return output;
    }

    return null;
}



export default function GameList(props) {

  let { handles, scroll, token, summaries } = props;

  const [games, setGames] = useState({} as any);
  const [libraries, setLibraries] = useState({} as any);
  const [multiplayerFlag, setMultiplayerFlag] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const listRef = useRef(null);

  const scrollToRef = (ref) => {
    if (ref.current && !scrolled) {
      setScrolled(true);
      // ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const scrollToList = () => {
    if (listRef) {
      scrollToRef(listRef)
    }
  };

  const ensureData = () => {
    if (!libraries) {
      return false;
    } else {
      const keys = Object.keys(libraries);
      if (!keys.length) {
        return false;
      }
    }

    return true;
  };


  useEffect(() => {

    if (!token || token === '') {
      return;
    }

    client.getLibraries(handles, token)
      .then(libs => {

        setLibraries(libs)

        if (!(handles.length === Object.keys(libs as {}).length) || Object.keys(libs as {}).length < 2) {
          return;
        }

        const games = client.process(libs, summaries);

        setGames(games);
      });

  // eslint-disable-next-line
  }, [handles, token]);


  useEffect(() => {
    if (handles.length > 1 && scroll) {
      scrollToList();
    }
  // eslint-disable-next-line
  }, [games]);



  if (handles.length < 2) {
    return null;
  }


  if (!ensureData()) {
    return null;
  }



  const flagHandler = () => {
    setMultiplayerFlag(!multiplayerFlag);
  }



  return (
    <div ref={listRef}>
      <br />
      <h4>Matched Games</h4>
      <div className={`switch ${multiplayerFlag ? 'active' : ''}`} style={marginBottom} onClick={flagHandler}><span className="head"></span></div>
      <div className="label" style={marginBottom}>Multiplayer only</div>
      <PopulateList games={games} multiplayerOnly={multiplayerFlag} />
    </div>
  );
}

GameList.propTypes = {
  handles: PropTypes.any.isRequired,
  scroll: PropTypes.any.isRequired,
  token: PropTypes.any.isRequired,
  summaries: PropTypes.any.isRequired
};
