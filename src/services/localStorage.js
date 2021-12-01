const PLAYERS = 'players';
const TOKEN = 'token';

if (!JSON.parse(localStorage.getItem(PLAYERS))) {
  localStorage.setItem(PLAYERS, JSON.stringify([]));
}

const readPlayers = () => {
  const players = JSON.parse(localStorage.getItem(PLAYERS));
  console.log(players);
  return players;
};

const savePlayer = (player) => {
  let playerList = readPlayers();
  if (playerList) {
    playerList = [...playerList, player];
    localStorage.setItem(PLAYERS, JSON.stringify(playerList));
  }
};

const saveToken = (token) => localStorage
  .setItem(TOKEN, JSON.stringify(token));

const readToken = () => JSON.parse(localStorage.getItem(TOKEN));

export { savePlayer, saveToken, readPlayers, readToken };
