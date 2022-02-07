import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { prayers } from '../../api';
import { StorageService } from 'services';
import { Colums, Prayers } from 'types/interfaces';

const getPrayers = createAsyncThunk('columns/getPrayers', async () => {
  try {
    const response = await prayers.getPrayers();
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    console.log('getPrayers data: ', response.data);
    return response.data;
  } catch (err) {
    return err;
  }
});

export const reducer = createReducer(
  {
    prayers: [] as Array<Prayers>,
    getPrayersStatus: 'idle',
  },
  builder => {
    builder
      .addCase(getPrayers.pending, state => {
        state.getPrayersStatus = 'pending';
      })
      .addCase(getPrayers.fulfilled, (state, action) => {
        state.prayers = action.payload;
        state.getPrayersStatus = 'fulfilled';
      })
      .addCase(getPrayers.rejected, state => {
        state.getPrayersStatus = 'rejected';
      });
  },
);

export const actions = {
  getPrayers,
};

export const selectors = {
  selectPrayers: (state: RootState) => state.prayers.prayers,
};
