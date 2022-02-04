import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { columns } from '../../api';
import { StorageService } from 'services';
import { Colums } from 'types/interfaces';

const getColumns = createAsyncThunk('columns/getColumns', async () => {
  try {
    const response = await columns.getColumns();
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    console.log('response.data', response.data);
    return response.data;
  } catch (err) {
    return err;
  }
});

export const reducer = createReducer(
  {
    columns: [] as Array<Colums>,
    getColumnsStatus: 'idle',
  },
  builder => {
    builder
      .addCase(getColumns.pending, state => {
        state.getColumnsStatus = 'pending';
      })
      .addCase(getColumns.fulfilled, (state, action) => {
        state.columns = action.payload;
        state.getColumnsStatus = 'fulfilled';
      })
      .addCase(getColumns.rejected, state => {
        state.getColumnsStatus = 'rejected';
      });
  },
);

export const actions = {
  getColumns,
};

export const selectors = {
  selectColumns: (state: RootState) => state.columns.columns,
};
