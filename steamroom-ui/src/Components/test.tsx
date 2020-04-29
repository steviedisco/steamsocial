import React, { useState, useEffect } from 'react';

const resolveUserUrl = 'https://9192zxrrp6.execute-api.eu-west-1.amazonaws.com/default/get_steamUserIdFromHandle_Function';
const gamesListUrl = 'https://k14n0rcap5.execute-api.eu-west-1.amazonaws.com/default/get_userOwnedGames_Function';

const getUserId = async (handle) => {
  return await fetch(`${resolveUserUrl}?handle=${handle}`)
    .then(response => response.json());
}

const getGames = async (steamid) => {
  return await fetch(`${gamesListUrl}?steamid=${steamid}`)
    .then(response => response.json());
}

const load = async (setSummary) => {
  const steamid = await getUserId('steviedisco');
  const games = await getGames(steamid);

  setSummary(JSON.stringify(games, null, 4));
}


function Test() {

  const [summary, setSummary] = useState('');

  useEffect(() => {
      load(setSummary);
  }, []);

  return (
    <div className="container">
      <div className="section">
        <pre>
          <code className="prettyprint prettyprinted">
            { summary }
          </code>
        </pre>
      </div>
    </div>
  );
}

export default Test;
