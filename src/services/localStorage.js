const PLAYERS = 'players';
const TOKEN = 'token';

if (!JSON.parse(localStorage.getItem(PLAYERS))) {
  localStorage.setItem(PLAYERS, JSON.stringify([]));
}

const readPlayers = () => {
  const players = JSON.parse(localStorage.getItem(PLAYERS));
  return players;
};

const savePlayer = (newPlayer) => {
  let playersList = readPlayers();
  playersList = playersList
    .filter((player) => player.gravatarEmail !== newPlayer.gravatarEmail);
  if (playersList) {
    playersList = [...playersList, newPlayer];
    localStorage.setItem(PLAYERS, JSON.stringify(playersList));
  }
};

const saveToken = (token) => localStorage
  .setItem(TOKEN, JSON.stringify(token));

const readToken = () => JSON.parse(localStorage.getItem(TOKEN));

export { savePlayer, saveToken, readPlayers, readToken };
