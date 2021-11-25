import { combineReducers } from 'redux';
<<<<<<< HEAD:src/Redux/Reduces/index.js
import player from './player';

const rootReducers = combineReducers({
  player,
});
=======
import players from './players';
import gameInfo from './gameInfo';

const rootReducers = combineReducers({ players, gameInfo });
>>>>>>> main-group-11:src/Redux/Reducers/index.js

export default rootReducers;
