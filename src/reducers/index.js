import { combineReducers } from "redux";
import techArticlesReducer from "./techArticlesReducer";
import sportsArticlesReducer from "./sportsArticlesReducer";
import businessArticlesReducer from './businessArticlesReducer';
import scienceArticlesReducer from './scienceArticlesReducer';
import politicalArticlesReducer from './politicalArticlesReducer';
import entertainmentArticlesReducer from './entertainmentArticlesReducer';


export default combineReducers({
  techArticles: techArticlesReducer,
  sportsArticles: sportsArticlesReducer,
  businessArticles: businessArticlesReducer,
  scienceArticles: scienceArticlesReducer,
  politicalArticles: politicalArticlesReducer,
  entertainmentArticles: entertainmentArticlesReducer,
});
