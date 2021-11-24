const GET_PLAYER = 'GET_PLAYER';
const LOGIN = 'LOGIN';

const getPlayerAction = (player) => ({ type: GET_PLAYER, payload: player });

const loginAction = (player) => ({ type: LOGIN, payload: player });

export { getPlayerAction, GET_PLAYER, loginAction, LOGIN };
