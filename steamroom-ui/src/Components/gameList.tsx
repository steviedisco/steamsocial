import React, { useState, useEffect } from 'react';
import Game from './game';

import * as client from './../library-client';



function PopulateList(props): any {

  let { handles, libraries, summaries } = props;

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

  useEffect(() => {

    /*
    const handles: string[] =
    [
      'steviedisco',
      'delphboy',
      'chipbarm',
      'StealthBanana',
      'andreas3115',
    ];
    */

    client.getLibraries(handles)
      .then(libs => {
        setLibraries(libs)
      });

    client.getSummaries(handles)
      .then(sums => {
        setSummaries(sums)
      });

  }, [handles]);



  if (handles.length < 2) {
    return null;
  }


  return (
    <div>
      <h4>Matched Games</h4>
      <PopulateList handles={handles} libraries={libraries} summaries={summaries} />
    </div>
  );
}

export default GameList;
