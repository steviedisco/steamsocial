import React, { useState, useEffect, useRef } from 'react';
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



function GameList(props) {

  let { handles, scroll } = props;

  const [games, setGames] = useState({} as any);
  const [libraries, setLibraries] = useState({} as any);
  const [summaries, setSummaries] = useState({} as any);
  const [multiplayerFlag, setMultiplayerFlag] = useState(true);

  const listRef = useRef(null);
  const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  const scrollToList = () => scrollToRef(listRef);

  const ensureData = () => {
    if (!libraries) {
      return false;
    } else {
      const keys = Object.keys(libraries);
      if (!keys.length) {
        return false;
      }
    }

    if (!summaries) {
      return false;
    } else {
      const keys = Object.keys(summaries);
      if (!keys.length) {
        return false;
      }
    }

    return true;
  };


  useEffect(() => {

    client.getLibraries(handles)
      .then(libs => {
        setLibraries(libs)
      });

    client.getSummaries(handles)
      .then(sums => {
        setSummaries(sums)
      });

    const script = document.createElement('script');
    script.type = "text/javascript"
    script.innerHTML = `fluid.set("pref-multiplayerFlag", "${multiplayerFlag}");`;
    document.body.appendChild(script);

    // eslint-disable-next-line
  }, [handles]);



  useEffect(() => {

    if (!ensureData()) {
      return;
    }

    // hack-tastic, to get round async updates
    if (!(handles.length === Object.keys(libraries).length &&  Object.keys(libraries).length === Object.keys(summaries).length)) {
      return;
    }

    const games = client.process(libraries, summaries);

    setGames(games);

  // eslint-disable-next-line
  }, [libraries, summaries]);



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



  const flagHandler = (event) => {
    const script = document.createElement('script');
    script.type = "text/javascript"
    script.innerHTML = `fluid.set("pref-multiplayerFlag", "${!multiplayerFlag}");`;
    document.body.appendChild(script);

    setMultiplayerFlag(!multiplayerFlag);
  }

  return (
    <div ref={listRef}>
      <br />
      <h4>Matched Games</h4>
      <div className="switch pref-multiplayerFlag" style={marginBottom} onClick={flagHandler}><span className="head"></span></div>
      <div className="label" style={marginBottom}>Multiplayer only</div>
      <PopulateList games={games} multiplayerOnly={multiplayerFlag} />
    </div>
  );
}

export default GameList;
