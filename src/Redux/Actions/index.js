import getAnswers from '../../services/getAnswers';

export const GET_ANSWERS = 'GET_ANSWERS';

export const actionAnswers = (answers) => ({
  type: GET_ANSWERS,
  answers,
});

export const actionGetAnswers = (token) => async (dispatch) => {
  const answers = await getAnswers(token);
  dispatch(actionAnswers(answers));
};
