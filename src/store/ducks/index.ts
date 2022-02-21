import { combineReducers } from 'redux';
import * as authDuck from './auth';
import * as columnsDuck from './columns';
import * as prayersDuck from './prayers';
import * as commentsDuck from './comments';
import * as prayDuck from './pray';

export const reducer = combineReducers({
  auth: authDuck.reducer,
  columns: columnsDuck.reducer,
  prayers: prayersDuck.reducer,
  comments: commentsDuck.reducer,
  pray: prayDuck.reducer,
});

export const actions = {
  auth: authDuck.actions,
  columns: columnsDuck.actions,
  prayers: prayersDuck.actions,
  comments: commentsDuck.actions,
  pray: prayDuck.actions,
};

export const selectors = {
  auth: authDuck.selectors,
  columns: columnsDuck.selectors,
  prayers: prayersDuck.selectors,
  comments: commentsDuck.selectors,
  pray: prayDuck.selectors,
};
