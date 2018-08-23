import { GET_SPORTS_ARTICLES_SUCCESS } from "../actions/index.js";
import { fromJS } from 'immutable'

const sportsArticlesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SPORTS_ARTICLES_SUCCESS:
      return fromJS(action.payload).get('articles');
    default:
      return state;
  }
};

export default sportsArticlesReducer;
