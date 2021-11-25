import { combineReducers } from 'redux';
import players from './players';
import gameInfo from './gameInfo';

const rootReducers = combineReducers({ players, gameInfo });

export default rootReducers;
