import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { auth } from '../../api';
import { StorageService } from 'services';

const setAccessToken = createAction<string>('auth/setAccessToken');

const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await auth.signIn(email, password);
      if (response.data.message) {
        throw new Error(response.data.message);
      }
      console.log('response.data', response.data);
      await StorageService.setAccessToken(response.data.token);
      const token = await StorageService.getAssessToken();
      console.log('token', token);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

const signOut = createAsyncThunk('auth/signOut', async () => {
  return StorageService.removeAssessToken();
});

interface User {
  email: string;
  token: string;
  id: string;
  name: string;
}

export const reducer = createReducer(
  {
    user: {} as User,
    signingInStatus: 'idle',
    signUpStatus: 'idle',
  },
  builder => {
    builder.addCase(setAccessToken, (state, action) => {
      state.user.token = action.payload;
    });

    builder
      .addCase(signIn.pending, state => {
        state.signingInStatus = 'pending';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload;
        state.signingInStatus = 'fulfilled';
      })
      .addCase(signIn.rejected, state => {
        state.signingInStatus = 'rejected';
      });
  },
);

export const actions = {
  signIn,
  setAccessToken,
  signOut,
};

export const selectors = {
  selectAccessToken: (state: RootState) => state.auth.user.token,
  selectUserData: (state: RootState) => state.auth.user,
};
