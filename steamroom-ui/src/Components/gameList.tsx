import React, { useState, useEffect } from 'react';
import Game from './game';

var _ = require('lodash');

const resolveUserUrl = 'https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function';
const gamesListUrl = 'https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function';



const process = (libraries) => {

  if (!libraries) {
    return null;
  }

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

  return filtered
}



const getUserId = async (handle: string): Promise<string> => {

  const key = `${handle}_steamid`;

  const cachedid = localStorage.getItem(key);
  if (cachedid != null && cachedid !== '')
    return JSON.parse(cachedid);

  const response = await fetch(`${resolveUserUrl}?handle=${handle}`);
  const steamid = await response.json();

  localStorage.setItem(key, JSON.stringify(steamid));

  return steamid;
}



const getGames = async (steamid) => {

  const key = `${steamid}_games`;

  const cachedgames = localStorage.getItem(key);
  if (cachedgames != null && cachedgames !== '')
    return JSON.parse(cachedgames);

  const fetchGames = (steamid) => {
    return new Promise((resolve) => {
      (async () => {
        await fetch(`${gamesListUrl}?steamid=${steamid}`)
          .then(response => response.json())
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            console.log("Game list fetch failed");
            return null;
          });
        })();
      });
  };

  const games = await fetchGames(steamid);

  if (games) {
    localStorage.setItem(key, JSON.stringify(games));
  }

  return games;
}


function PopulateList(props): any {

  let { libraries } = props;

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

  const games = process(libraries);
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


const fetchData = (handles) => {

  let libs = {};

  return new Promise((resolve) => {
    handles.forEach(async (handle, index, array) => {
      await getUserId(handle)
        .then(async steamid => {
          await getGames(steamid)
            .then(games => {
              if (games) {
                libs[steamid] = games;
              }
              if (index === array.length - 1) {
                resolve(libs);
              }
            })
        });
      });
    });
  };

  const getLibraries = async (handles) => {
    return await fetchData(handles);
  };


function GameList() {

  const [libraries, setLibraries] = useState({} as any);

  useEffect(() => {

    const handles: string[] =
    [
      'steviedisco',
      'delphboy',
      'chipbarm',
      'StealthBanana',
      'andreas3115',
    ];

    getLibraries(handles)
      .then(libs => {
        setLibraries(libs)
      });

  }, []);

  return (
    <div className="container">
      <div className="section">
        <PopulateList libraries={libraries} />
      </div>
    </div>
  );
}

export default GameList;
