import { GET_PLAYER, LOGIN } from '../../Actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

function player(state = INITIAL_STATE, action) {
  console.log(action.payload);
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case GET_PLAYER:
    return { ...state };
  default:
    return state;
  }
}

export default player;
