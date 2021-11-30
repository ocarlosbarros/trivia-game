import { GET_PLAYER, GET_GRAVATAR_IMAGE,
  LOGIN, CHANGE_ASSERTIONS, CHANGE_SCORE } from '../Actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  imagePath: '',
};

function players(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case GET_PLAYER:
    return { ...state, players: action.payload.player };

  case GET_GRAVATAR_IMAGE:
    return { ...state, imagePath: action.payload };

  case CHANGE_ASSERTIONS:
    return { ...state, assertions: state.assertions + action.payload };

  case CHANGE_SCORE:
    return { ...state, score: action.payload };
  default:
    return state;
  }
}

export default players;
