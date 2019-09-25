import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

// put the key away!!
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI("10352f83dbb844de81f0d52c6a6229bc");

const exampleInitialState = {
  newsList: [],
  pageIndex: 1,
  searchResult: [],
  searchKeyword: ""
};

export const actionTypes = {
  GET_NEWS_LIST: "GET_NEWS_LIST",
  INCREMENT_PAGE_INDEX: "INCREMENT_PAGE_INDEX",
  SEARCH_NEWS: "SEARCH_NEWS",
  RESET_PAGE_INDEX: "RESET_PAGE_INDEX",
  SEARCH_KEYWORD: "SEARCH_KEYWORD"
};

// REDUCERS
export const reducer = (state = exampleInitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NEWS_LIST:
      return Object.assign({}, state, {
        newsList: state.newsList.concat(action.newsList)
      });
    case actionTypes.SEARCH_NEWS:
      return Object.assign({}, state, {
        searchResult: action.searchResult
      });
    case actionTypes.INCREMENT_PAGE_INDEX:
      return Object.assign({}, state, {
        pageIndex: state.pageIndex + 1
      });

    case actionTypes.RESET_PAGE_INDEX:
      return Object.assign({}, state, {
        pageIndex: 1
      });

    case actionTypes.SEARCH_KEYWORD:
      return Object.assign({}, state, {
        searchKeyword: action.searchKeyword
      });
    default:
      return state;
  }
};

// ACTIONS
export const getNewsList = newsList => {
  return { type: actionTypes.GET_NEWS_LIST, newsList: newsList };
};

export const searchResult = result => {
  console.log(result);
  return {
    type: actionTypes.SEARCH_NEWS,
    searchResult: result.searchResult
  };
};

export const incrementPageIndex = () => {
  return { type: actionTypes.INCREMENT_PAGE_INDEX };
};

export const resetPageIndex = () => {
  return { type: actionTypes.RESET_PAGE_INDEX };
};

export const searchKeywordChange = keyword => {
  return { type: actionTypes.SEARCH_KEYWORD, searchKeyword: keyword };
};

export const fetchArticleDetails = pageIndex => {
  return function(dispatch) {
    return newsapi.v2
      .everything({
        sources: "the-washington-post, the-new-york-times",
        pageSize: 10,
        // page is index for infinite-scroll
        page: pageIndex,
        sortBy: "publishedAt"
      })
      .then(response => {
        dispatch(getNewsList(response.articles));
      });
  };
};

export const searchArticle = q => {
  return function(dispatch) {
    if (q !== "") {
      dispatch(resetPageIndex());
      return newsapi.v2
        .everything({
          sources: "the-washington-post, the-new-york-times",
          qInTitle: q,
          pageSize: 100,
          sortBy: "publishedAt"
        })
        .then(response => {
          let searchEmpty = response.articles.length === 0;
          dispatch(
            searchResult({
              searchResult: response.articles
            })
          );
        });
    } else {
      let emptyResult = [];
      //if q is empty, clear the search result
      dispatch(searchResult({ searchResult: emptyResult }));
    }
  };
};

export function initializeStore(initialState = exampleInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
