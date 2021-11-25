import { MD5 as generateHash } from 'crypto-js';

const fetchGravatarImage = async (email) => {
  const HASH = generateHash(email).toString();
  const BASE_URL = 'https://www.gravatar.com/avatar/';
  try {
    const { url } = await fetch(`${BASE_URL}${HASH}`);
    return url;
  } catch (error) {
    return error;
  }
};

export default fetchGravatarImage;
