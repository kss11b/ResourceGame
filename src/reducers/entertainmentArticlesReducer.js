import { GET_ENTERTAINMENT_ARTICLES_SUCCESS } from "../actions/index.js";
import { fromJS } from 'immutable'

const entertainmentArticlesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ENTERTAINMENT_ARTICLES_SUCCESS:
    console.log('entertainment action', action.payload)
      return fromJS(action.payload).get('articles');
    default:
      return state;
  }
};

export default entertainmentArticlesReducer;
