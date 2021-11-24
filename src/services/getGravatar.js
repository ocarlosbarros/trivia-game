import { MD5 as generateHash } from 'crypto-js';

const getGravatar = (email) => {
  const HASH = generateHash(email).toString();
  const BASE_URL = 'https://www.gravatar.com/avatar/';

  fetch(`${BASE_URL}${HASH}`)
    .then((response) => response.json())
    .then((gravatarImage) => console.log(gravatarImage));
};

export default getGravatar;
