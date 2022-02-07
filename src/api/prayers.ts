import axios from 'axios';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const getPrayers = async () => {
  const res = await axios.get(BASE_URL + 'prayers').catch(error => error);
  return res;
};
