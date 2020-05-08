var _ = require('lodash');

const resolveUserUrl = 'https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function';
const gamesListUrl = 'https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function';
const userSummaryUrl = 'https://8ydkm187n9.execute-api.eu-west-1.amazonaws.com/default/get_userSummary_Function';


export const process = (libraries, summaries) => {

  if (!libraries || !summaries) {
    return null;
  }

  // combine all libraries, duplicates included
  let combined: any[] = [];

  const keys = Object.keys(libraries);

  keys.forEach(key => {
    const library = libraries[key];

    // wipe old data
    library.forEach(game => {
      delete game.owned;
      delete game.users;
    });

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
          current[0]["users"] = [];
        }
        current[0]["users"].push(summaries[key]);
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



const getUserId = async (handle: string, token): Promise<string> => {

  const key = `${handle}_steamid`;

  const cachedid = localStorage.getItem(key);
  if (cachedid != null && cachedid !== '')
    return JSON.parse(cachedid);

  const response = await fetch(`${resolveUserUrl}?handle=${handle}`, {
            method: 'GET',
            headers: {
                "Authentication": `Bearer ${token}`
            }
        });

  const steamid = await response.json();

  localStorage.setItem(key, JSON.stringify(steamid));

  return steamid;
}



const getGames = async (steamid, handle, token) => {

  const key = `${steamid}_games`;

  const cachedgames = localStorage.getItem(key);
  if (cachedgames != null && cachedgames !== '')
    return JSON.parse(cachedgames);

  const fetchGames = (steamid) => {
    return new Promise((resolve) => {
      (async () => {
        await fetch(`${gamesListUrl}?steamid=${steamid}`, {
                  method: 'GET',
                  headers: {
                      "Authentication": `Bearer ${token}`
                  }
              })
          .then(response => response.json())
          .then(response => {
            resolve(response)
          })
          .catch(() => {
            alert(`Game list fetch failed for ${handle}. Are the games listed as public?`);
            resolve(null);
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


const fetchLibraries = async (handles, token) => {

  const fetchLibrary = (handle, token) => {
    return new Promise((resolve) => {
      (async () => {
        await getUserId(handle, token)
          .then(async steamid => {
            await getGames(steamid, handle, token)
              .then(games => {
                  resolve(games);
              })
          });
        })();
      });
  };

  const fetchAll = (token) => {

    return new Promise((resolve) => {

      (async () => {
        let libs = {};
        let resolvedCount = 0;

        for (let i = 0; i < handles.length; i++) {

          const handle = handles[i];

          await (async () => {
            const library = await fetchLibrary(handle, token);

            if (library) {
              libs[handle] = library;
            }
          })();

          resolvedCount++;
          if (resolvedCount === handles.length) {
            resolve(libs);
          }
      }})();
    });
  };

  const libraries = await fetchAll(token);
  return libraries;
};


export const getLibraries = async (handles, token) => {
  return await fetchLibraries(handles, token);
};


export const getSummaries = async (handles, token) => {
  return await fetchSummaries(handles, token);
};


export const fetchSummary = (handle, token) => {
  return new Promise((resolve) => {
    (async () => {
      await getUserId(handle, token)
        .then(async steamid => {
          await getProfile(steamid, token)
            .then(summary => {
                resolve(summary);
            })
            .catch(() => resolve(null));
        })
        .catch(() => resolve(null));
      })();
    });
};


const fetchSummaries = async (handles, token) => {

  const fetchAll = (token) => {

    return new Promise((resolve) => {

      (async () => {
        let sums = {};
        let resolvedCount = 0;

        for (let i = 0; i < handles.length; i++) {

          const handle = handles[i];

          await (async () => {
            const summary = await fetchSummary(handle, token);

            if (summary) {
              sums[handle] = summary;
            }
          })();

          resolvedCount++;
          if (resolvedCount === handles.length) {
            resolve(sums);
          }
      }})();
    });
  };

  const summaries = await fetchAll(token);
  return summaries;
};


const getProfile = async (steamid, token) => {

  const key = `${steamid}_profile`;

  const cachedprofiles = localStorage.getItem(key);
  if (cachedprofiles != null && cachedprofiles !== '')
    return JSON.parse(cachedprofiles);

  const fetchProfile = (steamid, token) => {
    return new Promise((resolve) => {
      (async () => {
        await fetch(`${userSummaryUrl}?steamid=${steamid}`, {
                  method: 'GET',
                  headers: {
                      "Authentication": `Bearer ${token}`
                  }
              })
          .then(response => response.json())
          .then(response => {
            resolve(response)
          })
          .catch(() => {
            console.log("User profile fetch failed");
            resolve(null);
          });
        })();
      });
  };

  const profile = await fetchProfile(steamid, token);

  if (profile) {
    localStorage.setItem(key, JSON.stringify(profile));
  }

  return profile;
}
