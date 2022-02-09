import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { prayers } from '../../api';
import { StorageService } from 'services';
import { Prayers } from 'types/interfaces';

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

const postPrayer = createAsyncThunk(
  'prayers/postPrayer',
  async ({
    columnId,
    body,
  }: {
    columnId: number;
    body: {
      title: string;
      checked: boolean;
      description: string;
    };
  }) => {
    try {
      const response = await prayers.postPrayer(columnId, body);
      if (response.data.message) {
        throw new Error(response.data.message);
      }
      console.log('postColumnPrayer', response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

const deletePrayer = createAsyncThunk(
  'prayers/deletePrayer',
  async (prayerId: number) => {
    try {
      const response = await prayers.deletePrayer(prayerId);
      if (response.data.message) {
        throw new Error(response.data.message);
      }
      console.log('prayerId', prayerId);
      console.log('deletePrayer data: ', response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

const checkPrayer = createAsyncThunk(
  'prayers/checkPrayer',
  async ({
    prayerId,
    body,
  }: {
    prayerId: number;
    body: {
      title: string;
      checked: boolean;
      description: string;
    };
  }) => {
    try {
      const response = await prayers.updatePrayer(prayerId, {
        ...body,
        checked: !body.checked,
      });
      if (response.data.message) {
        throw new Error(response.data.message);
      }
      console.log('updatePrayer', response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

export const reducer = createReducer(
  {
    prayers: [] as Array<Prayers>,
    getPrayersStatus: 'idle',
    postPrayersStatus: 'idle',
    deletePrayerStatus: 'idle',
    updatePrayerStatus: 'idle',
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

    builder
      .addCase(postPrayer.pending, state => {
        state.postPrayersStatus = 'pending';
      })
      .addCase(postPrayer.fulfilled, (state, action) => {
        state.postPrayersStatus = 'fulfilled';
        state.prayers = [...state.prayers, action.payload];
      })
      .addCase(postPrayer.rejected, state => {
        state.postPrayersStatus = 'rejected';
      });

    builder
      .addCase(deletePrayer.pending, state => {
        state.deletePrayerStatus = 'pending';
      })
      .addCase(deletePrayer.fulfilled, (state, action) => {
        state.deletePrayerStatus = 'fulfilled';
        console.log('action', action);
        state.prayers = [
          ...state.prayers.filter(prayer => prayer.id !== action.meta.arg),
        ];
      })
      .addCase(deletePrayer.rejected, state => {
        state.deletePrayerStatus = 'rejected';
      });

    builder
      .addCase(checkPrayer.pending, state => {
        state.updatePrayerStatus = 'pending';
      })
      .addCase(checkPrayer.fulfilled, (state, action) => {
        state.prayers = state.prayers.map(prayer =>
          prayer.id === action.payload.id
            ? { ...action.payload, checked: action.payload.checked }
            : prayer,
        );
        state.updatePrayerStatus = 'fulfilled';
      })
      .addCase(checkPrayer.rejected, state => {
        state.updatePrayerStatus = 'rejected';
      });
  },
);

export const actions = {
  getPrayers,
  postPrayer,
  deletePrayer,
  checkPrayer,
};

export const selectors = {
  selectPrayers: (state: RootState) => state.prayers.prayers,
};
