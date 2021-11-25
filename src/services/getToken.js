const getToken = async () => {
  const result = fetch('https://opentdb.com/api_token.php?command=request');
  const resultJson = (await result).json();
  return resultJson;
};

export default getToken;
