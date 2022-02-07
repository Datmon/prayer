import axios from 'axios';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const getColumns = async () => {
  const res = await axios.get(BASE_URL + 'columns').catch(error => error);
  return res;
};
