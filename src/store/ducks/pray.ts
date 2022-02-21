import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { prayers } from '../../api';
import { StorageService } from 'services';
import { Prayers } from 'types/interfaces';

const pray = createAction<number>('pray/pray');

export const reducer = createReducer(
  {
    prayed: [
      { prayerId: 2282, id: 2281, count: 1, lastPrayed: new Date() },
    ] as Array<{
      prayerId: number;
      id: number;
      count: number;
      lastPrayed: Date;
    }>,
  },
  builder => {
    builder.addCase(pray, (state, action) => {
      const index = state.prayed.findIndex(
        prayer => prayer.prayerId === action.payload,
      );
      if (index > 0) {
        console.log('index', index);
        state.prayed[index].count++;
      } else {
        console.log('index false', index);
        state.prayed.push({
          count: 1,
          id: action.payload,
          lastPrayed: new Date(),
          prayerId: action.payload,
        });
      }
    });
  },
);

export const actions = {
  pray,
};

export const selectors = {
  selectPrayes: (state: RootState) => state.pray.prayed,
};
