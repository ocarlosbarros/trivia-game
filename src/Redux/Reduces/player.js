import { GET_PLAYER } from '../../actions/getPlayer';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_PLAYER:
    return { ...state };
  default:
    return state;
  }
}

export default player;
