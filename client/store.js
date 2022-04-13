import { createStore, applyMiddleware } from 'redux';
import raceReducer from './store/allRaces';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  raceReducer,
  applyMiddleware(thunkMiddleware, createLogger())
);

export default store;
