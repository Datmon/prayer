import { combineReducers } from 'redux';
import * as authDuck from './auth';
import * as columnsDuck from './columns';
import * as prayersDuck from './prayers';

export const reducer = combineReducers({
  auth: authDuck.reducer,
  columns: columnsDuck.reducer,
  prayers: prayersDuck.reducer,
});

export const actions = {
  auth: authDuck.actions,
  columns: columnsDuck.actions,
  prayers: prayersDuck.actions,
};

export const selectors = {
  auth: authDuck.selectors,
  columns: columnsDuck.selectors,
  prayers: prayersDuck.selectors,
};
