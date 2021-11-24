import getToken from './getToken';

const defaultQuestions = 5;

const getAnswers = async (token, questionsCount = defaultQuestions) => {
  const result = await fetch(`https://opentdb.com/api.php?amount=${questionsCount}&token=${token}`);
  const resultJson = await result.json();
  if (resultJson.response_code === 0) return resultJson;
  const newToken = getToken();
  getAnswers(newToken);
};

export default getAnswers;
