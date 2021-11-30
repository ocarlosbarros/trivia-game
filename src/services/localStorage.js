const PLAYERS = 'players';

if (!JSON.parse(localStorage.getItem(PLAYERS))) {
  localStorage.setItem(PLAYERS, JSON.stringify([]));
}
const savePlayer = (player) => {
  const savedPlayer = {
    ...player,
    assertions: 0,
    score: 0,
  };
  localStorage.setItem(PLAYERS, JSON.stringify(savedPlayer));
};

const readPlayers = () => {
  const players = JSON.parse(localStorage.getItem(PLAYERS));

  return players;
};

const saveToken = (token) => localStorage
  .setItem('token', JSON.stringify(token));

export { savePlayer, saveToken, readPlayers };
