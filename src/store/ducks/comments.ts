import {
  createAsyncThunk,
  createReducer,
  createAction,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { columns, comments } from '../../api';
import { StorageService } from 'services';
import { Colums, Comments } from 'types/interfaces';

const getComments = createAsyncThunk('comments/getComments', async () => {
  try {
    const response = await comments.getComments();
    if (response.data.message) {
      throw new Error(response.data.message);
    }
    console.log('getComments data: ', response.data);
    return response.data;
  } catch (err) {
    return err;
  }
});

const postComment = createAsyncThunk(
  'comments/postComment',
  async ({ prayerId, body }: { prayerId: number; body: string }) => {
    try {
      const response = await comments.postComment(prayerId, body);
      if (response.data.message) {
        throw new Error(response.data.message);
      }
      console.log('postComment data: ', response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

const deleteComment = createAsyncThunk(
  'comments/deteleComment',
  async (commentId: number) => {
    try {
      const response = await comments.deleteComment(commentId);
      if (response.data.message) {
        throw new Error(response.data.message);
      }
      console.log('getComments data: ', response.data);
      return response.data;
    } catch (err) {
      return err;
    }
  },
);

export const reducer = createReducer(
  {
    comments: [] as Array<Comments>,
    getCommentsStatus: 'idle',
    postCommentStatus: 'idle',
  },
  builder => {
    builder
      .addCase(getComments.pending, state => {
        state.getCommentsStatus = 'pending';
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.getCommentsStatus = 'fulfilled';
      })
      .addCase(getComments.rejected, state => {
        state.getCommentsStatus = 'rejected';
      });
  },
);

export const actions = {
  getComments,
  postComment,
  deleteComment,
};

export const selectors = {
  selectComments: (state: RootState) => state.comments.comments,
};
