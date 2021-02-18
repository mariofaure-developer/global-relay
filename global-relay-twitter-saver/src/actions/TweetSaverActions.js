import {
    SAVE_TWEET,
    ADD_TWEETS
} from './TweetSaverTypes';
import { constructGETRequest } from '../lib';

export const saveTweet = (tweet) => {
    return {
        type: SAVE_TWEET,
        payload: tweet
    }
}

export const getTweets = () => {
    return (dispatch, state) => {
    
        const auth_token = '';
        
        fetch('https://api.twitter.com/1.1/search/tweets.json?q=nasa&result_type=popular', constructGETRequest(auth_token))
        .then((response) => response.json())
        .then((responseData) => {
            dispatch({ type: ADD_TWEETS, payload: responseData });
        })
        .catch((error) => {
            //handle error
        });
    }
}

export const searchTwitter = (searchTerm) => {
    return (dispatch, state) => {
    
        const auth_token = '';
        
        fetch('https://api.twitter.com/1.1/search/tweets.json?q=' + searchTerm + '&result_type=popular', constructGETRequest(auth_token))
        .then((response) => response.json())
        .then((responseData) => {
            dispatch({ type: ADD_TWEETS, payload: responseData });
        })
        .catch((error) => {
            //handle error
        });
    }
}