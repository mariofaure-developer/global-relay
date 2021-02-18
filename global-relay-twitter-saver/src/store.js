import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import tweetSaverReducer from "./reducers/TweetSaverReducer";
import storage from 'redux-persist/lib/storage';

const middleware = [thunk];

const config = {
  key: "tweetSaver",
  storage,
  blacklist: ["tweets"]
};

const tweetSaver = persistReducer(config, tweetSaverReducer);

const rootReducer = combineReducers({
    tweetSaver
});

const app = {};

function configureStore() {
  let store = createStore(
    rootReducer,
    app,
    compose(applyMiddleware(...middleware))
  );

  let persistor = persistStore(store);
  //persistor.purge();
  return { persistor, store };
}

export default configureStore;
