import { GET_PLAYER, GET_GRAVATAR_IMAGE,
  LOGIN, CHANGE_ASSERTIONS, CHANGE_SCORE } from '../Actions';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

function players(state = INITIAL_STATE, action) {
  console.log(action.payload);
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      player: {
        ...state.player,
        name: action.payload.name,
        gravatarEmail: action.payload.gravatarEmail,
      },
    };
  case GET_PLAYER:
    return { ...state, player: action.payload };

  case GET_GRAVATAR_IMAGE:
    return {
      ...state,
      player: {
        ...state.player,
        gravatarEmail: action.payload.gravatarEmail,
      },
    };

  case CHANGE_ASSERTIONS:
    return {
      ...state,
      player: {
        ...state.player,
        assertions: state.player.assertions + action.payload,
      },
    };

  case CHANGE_SCORE:
    return {
      player: {
        ...state.player,
        score: state.player.score + action.payload,
      },
    };
  default:
    return state;
  }
}

export default players;
