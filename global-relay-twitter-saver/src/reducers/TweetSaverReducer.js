import {
    SAVE_TWEET,
    ADD_TWEETS
} from '../actions/TweetSaverTypes.js';

const INIT_STATE = {
    tweets: [
        {
            id:'item_1',
            user: 'Name 1',
            profilePic: 'https://image.flaticon.com/icons/png/512/124/124021.png', 
            handle: '@name1',
            tweet: 'This is tweet 1',
            date: '01/09/21'
        },
        {
            id:'item_2',
            user: 'Name 2',
            profilePic: 'https://image.flaticon.com/icons/png/512/124/124021.png', 
            handle: '@name2',
            tweet: 'This is tweet 2',
            date: '02/09/21'
        },
        {
            id:'item_3',
            user: 'Name 3',
            profilePic: 'https://image.flaticon.com/icons/png/512/124/124021.png', 
            handle: '@name3',
            tweet: 'This is tweet 3',
            date: '03/09/21'
        },
        {
            id:'item_4',
            user: 'Name 4',
            profilePic: 'https://image.flaticon.com/icons/png/512/124/124021.png', 
            handle: '@name4',
            tweet: 'This is tweet 4',
            date: '04/09/21'
        }
    ],
    savedTweets: [
        {
            id:'saved_1',
            user: 'Name 5',
            profilePic: 'https://image.flaticon.com/icons/png/512/124/124021.png', 
            handle: '@name5',
            tweet: 'This is tweet 5',
            date: '05/09/21'
        }
    ],

}


const TweetSaverReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case SAVE_TWEET:
            return {
                ...state,
                savedTweets: action.payload.savedTweets,
                tweets: action.payload.tweets
            }
        case ADD_TWEETS:
            return {
                ...state,
                tweets: action.payload
            }
        default:
            return state;
    }
}

export default TweetSaverReducer;