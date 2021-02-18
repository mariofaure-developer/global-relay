import { combineReducers } from 'redux';
import TweetSaverReducer from './TweetSaverReducer';

export default combineReducers({
    tweetSaver: TweetSaverReducer
});