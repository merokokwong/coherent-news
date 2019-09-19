import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("10352f83dbb844de81f0d52c6a6229bc");

const exampleInitialState = {
  lastUpdate: 0,
  light: false,
  count: 0,
  newsList: []
};

export const actionTypes = {
  TICK: "TICK",
  INCREMENT: "INCREMENT",
  DECREMENT: "DECREMENT",
  RESET: "RESET",
  GET_NEWS_LIST: "GET_NEWS_LIST"
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.TICK:
      return Object.assign({}, state, {
        lastUpdate: action.ts,
        light: !!action.light
      });
    case actionTypes.INCREMENT:
      return Object.assign({}, state, {
        count: state.count + 1
      });
    case actionTypes.DECREMENT:
      return Object.assign({}, state, {
        count: state.count - 1
      });
    case actionTypes.RESET:
      return Object.assign({}, state, {
        count: exampleInitialState.count
      });
    case actionTypes.GET_NEWS_LIST:
      return Object.assign({}, state, {
        newsList: action.newsList
      });
    default:
      return state;
  }
};

// ACTIONS
export const serverRenderClock = () => {
  return { type: actionTypes.TICK, light: false, ts: Date.now() };
};
export const startClock = () => {
  return { type: actionTypes.TICK, light: true, ts: Date.now() };
};

export const incrementCount = () => {
  return { type: actionTypes.INCREMENT };
};

export const decrementCount = () => {
  return { type: actionTypes.DECREMENT };
};

export const resetCount = () => {
  return { type: actionTypes.RESET };
};

export const getNewsList = newsList => {
  return { type: actionTypes.GET_NEWS_LIST, newsList: newsList };
};

export const fetchArticleDetails = () => {
  return function(dispatch) {
    return newsapi.v2
      .everything({
        sources: "the-washington-post, the-new-york-times",
        pageSize: 10
      })
      .then(response => {
        dispatch(getNewsList(response.articles));
      });
  };
};

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
