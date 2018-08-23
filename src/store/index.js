import { createStore, applyMiddleware, combineReducers } from "redux";
import rootReducer from "../reducers/index";
import { apiMiddleware } from 'redux-api-middleware';

const createStoreWithMiddleware = applyMiddleware(apiMiddleware)(createStore)

// createStore(
//   rootReducer
// );

// export default store;

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
