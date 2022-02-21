import axios from 'axios';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const getColumns = async () => {
  const res = await axios.get(BASE_URL + 'columns').catch(error => error);
  return res;
};

export const addColumn = async (title: string) => {
  const res = await axios
    .post(BASE_URL + 'columns', { title, description: '' })
    .catch(error => error);
  return res;
};

export const deleteColumn = async (columnId: string) => {
  const res = await axios
    .delete(BASE_URL + 'columns/' + columnId)
    .catch(error => error);
  return res;
};
