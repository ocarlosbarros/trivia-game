import { GET_ANSWERS } from '../Actions/index';

const INITIAL_STATE = {
  token: '',
  answers: {},
};

const gameInfo = (state = INITIAL_STATE, { type, answers }) => {
  switch (type) {
  case GET_ANSWERS:
    return { ...state, answers };
  default:
    return state;
  }
};

export default gameInfo;
