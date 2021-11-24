const GET_PLAYER = 'GET_PLAYER';

const getPlayerAction = (player) => ({ type: GET_PLAYER, payload: player });

export { getPlayerAction, GET_PLAYER };
