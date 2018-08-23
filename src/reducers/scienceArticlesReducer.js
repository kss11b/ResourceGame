import { GET_SCIENCE_ARTICLES_SUCCESS } from "../actions/index.js";
import { fromJS } from 'immutable'

const scienceArticlesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_SCIENCE_ARTICLES_SUCCESS:
      return fromJS(action.payload).get('articles');
    default:
      return state;
  }
};

export default scienceArticlesReducer;
