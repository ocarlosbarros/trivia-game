import fetchGravatarImage from '../../services/fetchGravatarImage';
import getAnswers from '../../services/getAnswers';

const GET_ANSWERS = 'GET_ANSWERS';

const actionAnswers = (answers) => ({
  type: GET_ANSWERS,
  answers,
});

const actionGetAnswers = (token) => async (dispatch) => {
  const answers = await getAnswers(token);
  dispatch(actionAnswers(answers));
};

const GET_PLAYER = 'GET_PLAYER';
const GET_GRAVATAR_IMAGE = 'GET_GRAVATAR_IMAGE';
const LOGIN = 'LOGIN';
const getPlayerAction = (player) => ({ type: GET_PLAYER, payload: player });

const loginAction = (player) => ({ type: LOGIN, payload: player });

const getGravatarImage = (imagePath) => (
  { type: GET_GRAVATAR_IMAGE, payload: imagePath });

function getGravatarImageAction(email) {
  return (dispatch) => {
    fetchGravatarImage(email)
      .then((imagePath) => dispatch(getGravatarImage(imagePath)))
      .catch((error) => console.log(error));
  };
}

export {
  getPlayerAction,
  GET_PLAYER,
  loginAction,
  LOGIN,
  getGravatarImageAction,
  GET_GRAVATAR_IMAGE,
  actionGetAnswers,
  actionAnswers,
  GET_ANSWERS,
};
