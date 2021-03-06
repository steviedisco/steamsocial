var _ = require('lodash');

const verifyCaptchaUrl = 'https://54z0aarbpc.execute-api.eu-west-1.amazonaws.com/default/verify_reCaptcha_Function';
const resolveUserUrl = 'https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function';
const gamesListUrl = 'https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function';
const userSummaryUrl = 'https://8ydkm187n9.execute-api.eu-west-1.amazonaws.com/default/get_userSummary_Function';
const friendListUrl = 'https://nuxq04drl5.execute-api.eu-west-1.amazonaws.com/default/get_userFriendList_Function';

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

        if (summaries && summaries.length > 0) {
          let user = summaries.find(obj => obj.steamID === key);
          current[0]["users"].push(user);
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


export const getUserId = async (handle, token) => {

  const key = `${handle}_steamid`;

  const cachedid = localStorage.getItem(key);
  if (cachedid != null && cachedid !== '')
    return JSON.parse(cachedid);

  const response = await fetch(`${resolveUserUrl}?handle=${handle}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

  const steamid = await response.json();

  localStorage.setItem(key, steamid);

  return steamid;
}


const getGames = async (steamid, token) => {

  const key = `${steamid}_games`;

  const cachedgames = localStorage.getItem(key);
  if (cachedgames && cachedgames !== undefined && cachedgames !== '') {
    try {
       return JSON.parse(cachedgames);
    }
    catch {
      return null;
    }
  }

  const fetchGames = (steamid) => {
    return new Promise((resolve) => {
      (async () => {
        await fetch(`${gamesListUrl}?steamid=${steamid}`, {
                  method: 'GET',
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              })
          .then(response => response.json())
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            console.log(err);
            alert(`Game list fetch failed for ${steamid}. Are the games listed as public?`);
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


export const getFriends = async (steamid, handle, token) => {

  const key = `${steamid}_friends`;

  const cachedfriends = localStorage.getItem(key);
  if (cachedfriends && cachedfriends !== undefined && cachedfriends !== '') {
    try {
       return JSON.parse(cachedfriends);
    }
    catch {
      return null;
    }
  }

  const fetchFriends = (steamid) => {
    return new Promise((resolve) => {
      (async () => {
        await fetch(`${friendListUrl}?steamid=${steamid}`, {
                  method: 'GET',
                  headers: {
                      "Authorization": `Bearer ${token}`
                  }
              })
          .then(response => response.json())
          .then(response => {
            resolve(response)
          })
          .catch(err => {
            alert(`Friend list fetch failed for ${handle}.`);
            resolve(null);
          });
        })();
      });
  };

  const friends = await fetchFriends(steamid);

  if (friends) {
    localStorage.setItem(key, JSON.stringify(friends));
  }

  return friends;
}


const fetchLibraries = async (handles, token) => {

  const fetchLibrary = (steamid, token) => {
    return new Promise((resolve) => {
      (async () => {
        await getGames(steamid, token)
          .then(games => {
              resolve(games);
          })
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


export const fetchSummary = (steamid, token) => {
  return new Promise((resolve) => {
    (async () => {
        await getProfile(steamid, token)
          .then(summary => {
              resolve(summary);
          })
          .catch(() => resolve(null));
      })();
    });
};


export const fetchSummaryByHandle = (handle, token) => {
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


// export const fetchFriends = (handle, token) => {
//   return new Promise((resolve) => {
//     (async () => {
//       await getUserId(handle, token)
//         .then(async steamid => {
//           await getFriends(steamid, handle, token)
//             .then(summaries => {
//                 resolve(summaries);
//             })
//             .catch(() => resolve(null));
//         })
//         .catch(() => resolve(null));
//       })();
//     });
// };


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
                      "Authorization": `Bearer ${token}`
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


export const verifyRecaptcha = (token, callback) => {

  fetch(`${verifyCaptchaUrl}`, {
    method: 'POST',
    body: JSON.stringify({ 'token': token })
  })
  .then(response => response.json())
  .then(response => {
    callback(response);
  })
  .catch(() => {
    console.log(`Recaptcha verification failed`);
  });

}
