import axios from 'axios';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const getComments = async () => {
  const res = await axios.get(BASE_URL + 'comments').catch(error => error);
  return res;
};

export const postComment = async (prayerId: number, body: string) => {
  const res = await axios
    .post(`${BASE_URL}prayers/${prayerId}/comments`, { body: body })
    .catch(error => error);
  return res;
};

export const deleteComment = async (commentId: number) => {
  const res = await axios
    .delete(`${BASE_URL}comments/${commentId}`)
    .catch(error => error);
  return res;
};
