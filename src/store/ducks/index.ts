import { combineReducers } from 'redux';
import * as authDuck from './auth';
import * as columnsDuck from './columns';

export const reducer = combineReducers({
  auth: authDuck.reducer,
  columns: columnsDuck.reducer,
});

export const actions = {
  auth: authDuck.actions,
  columns: columnsDuck.actions,
};

export const selectors = {
  auth: authDuck.selectors,
  columns: columnsDuck.selectors,
};
