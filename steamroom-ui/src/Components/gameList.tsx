import React, { useState, useEffect } from 'react';
import Game from './game';

import * as client from './../library-client';

const multiplayerIds = require('./../data/multiplayer.json');

const marginBottom = {
  marginBottom: '20px'
} as React.CSSProperties;



function PopulateList(props): any {

  let { handles, libraries, summaries, multiplayerOnly } = props;

  if (!libraries) {
    console.log("Libraries empty");
    return null;
  } else {
    const keys = Object.keys(libraries);
    if (!keys.length) {
      console.log("Libraries empty");
      return null;
    }
  }

  if (!summaries) {
    console.log("Summaries empty");
    return null;
  } else {
    const keys = Object.keys(summaries);
    if (!keys.length) {
      console.log("Summaries empty");
      return null;
    }
  }

  // hack-tastic, to get round async updates
  if (!(handles.length === Object.keys(libraries).length &&  Object.keys(libraries).length === Object.keys(summaries).length)) {
    return null;
  }

  const games = client.process(libraries, summaries);
  if (!games || !games.length) {
    console.log("Games empty");
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

  let { handles } = props;

  const [libraries, setLibraries] = useState({} as any);
  const [summaries, setSummaries] = useState({} as any);
  const [multiplayerFlag, setMultiplayerFlag] = useState(true);

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

  }, [handles]);



  if (handles.length < 2) {
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
    <div>
      <h4>Matched Games</h4>
      <div className="switch pref-multiplayerFlag" style={marginBottom} onClick={flagHandler}><span className="head"></span></div>
      <div className="label" style={marginBottom}>Multiplayer only</div>
      <PopulateList handles={handles} libraries={libraries} summaries={summaries} multiplayerOnly={multiplayerFlag} />
    </div>
  );
}

export default GameList;
