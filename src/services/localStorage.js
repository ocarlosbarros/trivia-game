const PLAYERS = 'players';

if (!JSON.parse(localStorage.getItem(PLAYERS))) {
  localStorage.setItem(PLAYERS, JSON.stringify([]));
}
const savePlayer = (player) => {
  localStorage.setItem(PLAYERS, JSON.stringify(player));
};

const readPlayers = () => {
  const players = JSON.parse(localStorage.getItem(PLAYERS));

  return players;
};

const saveToken = (token) => localStorage
  .setItem('token', JSON.stringify(token));

export { savePlayer, saveToken, readPlayers };
