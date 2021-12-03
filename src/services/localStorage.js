const STATE = 'state';

const readPlayer = () => {
  if (!JSON.parse(localStorage.getItem(STATE))) {
    localStorage.setItem(STATE, JSON.stringify({}));
  }
  const player = JSON.parse(localStorage.getItem(STATE));

  return player;
};

const savePlayer = (player) => {
  localStorage.setItem(STATE, JSON.stringify({ player }));
};

const saveToken = (token) => localStorage
  .setItem(TOKEN, JSON.stringify(token));

export { savePlayer, saveToken, readPlayer };
