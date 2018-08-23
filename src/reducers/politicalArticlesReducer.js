import { GET_POLITICAL_ARTICLES_SUCCESS } from "../actions/index.js";
import { fromJS } from 'immutable'

const politicalArticlesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_POLITICAL_ARTICLES_SUCCESS:
      return fromJS(action.payload).get('articles');
    default:
      return state;
  }
};

export default politicalArticlesReducer;
