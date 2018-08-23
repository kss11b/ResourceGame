import { GET_TECH_ARTICLES_SUCCESS } from "../actions/index.js";
import { fromJS } from 'immutable'

const techArticlesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_TECH_ARTICLES_SUCCESS:
      return fromJS(action.payload).get('articles');
    default:
      return state;
  }
};

export default techArticlesReducer;
