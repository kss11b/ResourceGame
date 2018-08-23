import { GET_BUSINESS_ARTICLES_SUCCESS } from "../actions/index.js";
import { fromJS } from 'immutable'

const businessArticlesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_BUSINESS_ARTICLES_SUCCESS:
      return fromJS(action.payload).get('articles');
    default:
      return state;
  }
};

export default businessArticlesReducer;
