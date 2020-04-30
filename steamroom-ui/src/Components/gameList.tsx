import React, { useState, useEffect } from 'react';
import Game from './game';

var _ = require('lodash');

const resolveUserUrl = 'https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function';
const gamesListUrl = 'https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function';


const getUserId = async (handle: string) => {

  const key = `${handle}_steamid`;

  const cachedid = localStorage.getItem(key);
  if (cachedid != null && cachedid !== '')
    return JSON.parse(cachedid);

   const steamid = await fetch(`${resolveUserUrl}?handle=${handle}`)
      .then(response => response.json());

      localStorage.setItem(key, JSON.stringify(steamid));

    return steamid;
}


const getGames = async (steamid: string) => {

  const key = `${steamid}_games`;

  const cachedgames = localStorage.getItem(key);
  if (cachedgames != null && cachedgames !== '')
    return JSON.parse(cachedgames);

  const games = await fetch(`${gamesListUrl}?steamid=${steamid}`)
    .then(response => response.json())
    .then(games => games)
    .catch(error => {
      console.log('Request failed', error);
    });

    if (games) {
      localStorage.setItem(key, JSON.stringify(games));
    }

    return games;
}


const load = async (handles) => {

  let libraries = {};

  handles.forEach(async (handle) => {
    const steamid: string = await getUserId(handle);
    const games = await getGames(steamid);

    if (games) {
      libraries[steamid] = games;
    }
  });

  return libraries;
}


const process = async (libraries) => {

  // combine all libraries, duplicates included
  let combined: any[] = [];

  const keys = Object.keys(libraries);

  keys.forEach(key => {
    const library = libraries[key];
    combined.push(...library);
  });

  // get all unique games in all libraries
  let unique = _.uniqWith(combined, _.isEqual);

  // order the unique games
  const compare = (a, b) => {
    const gameA = a.name.toUpperCase();
    const gameB = b.name.toUpperCase();

    let comparison = 0;
    if (gameA > gameB) {
      comparison = 1;
    } else if (gameA < gameB) {
      comparison = -1;
    }
    return comparison;
  }

  unique.sort(compare);

  // count how many users own each game and add a property to record it
  keys.forEach(key => {

    const library = libraries[key];

    // find values that are in unique list and also in library
    var owned = unique.filter(function(obj) {
        return library.some(function(obj2) {
            return obj.appID === obj2.appID;
        });
    });

    // loop through the owned list and increase the count in the unique list
    owned.forEach(game => {
      const current = unique.filter(test => test.appID === game.appID)

      if (current.length === 1) {
        if (current[0]["owned"]) {
          current[0]["owned"]++;
        } else {
          current[0]["owned"] = 1;
        }
      }
    });
  });

  // order by number owned
  const compare2 = (a, b) => {
    const gameA = a.owned;
    const gameB = b.owned;

    let comparison = 0;
    if (gameA < gameB) {
      comparison = 1;
    } else if (gameA > gameB) {
      comparison = -1;
    }
    return comparison;
  }

  unique.sort(compare2);

  // trim off games that are only owned by 1 users
  const filtered = unique.filter(test => {
    return test.owned > 1
  });

  return filtered;
}


function PopulateList(props): any {

  const games = props.games;

  if (!games || !games.length) {
    return null;
  }

  let output: any[] = [];

  games.forEach(game => {
    output.push(<Game game={game} />);
  });

  if (output.length) {
    return output;
  }

  return null;
}


function GameList() {

  const [games, setGames] = useState({});

  useEffect(() => {

    const handles: string[] =
    [
      'steviedisco',
      'delphboy',
      'chipbarm',
      'StealthBanana',
      'andreas3115',
    ];

    const loadLibraries = async () => {
      return await load(handles);
    }

    loadLibraries()
      .then(libraries => {
        process(libraries)
          .then(games => {
            setGames(games);
          })
      });

  }, []);

  return (
    <div className="container">
      <div className="section">
        <PopulateList games={games} />
      </div>
    </div>
  );
}

export default GameList;
