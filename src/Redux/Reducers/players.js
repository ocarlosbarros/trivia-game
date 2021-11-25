import { GET_PLAYER, GET_GRAVATAR_IMAGE, LOGIN, CHANGE_SCORE } from '../Actions';

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
    return { ...state };

  case GET_GRAVATAR_IMAGE:
    return { ...state, imagePath: action.payload };

  case CHANGE_SCORE:
    return { ...state, assertions: state.assertions + action.payload };

  default:
    return state;
  }
}

export default players;
