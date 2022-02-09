import axios from 'axios';
import { DataPrayer } from 'types/interfaces';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const getPrayers = async () => {
  const res = await axios.get(BASE_URL + 'prayers').catch(error => error);
  return res;
};

export const deletePrayer = async (prayerId: number) => {
  const res = await axios.delete(`${BASE_URL}prayers/${prayerId}`);
  return res;
};

export const postPrayer = async (columnId: number, body: DataPrayer) => {
  const res = await axios
    .post(`${BASE_URL}columns/${columnId}/prayers`, body)
    .catch(error => error);
  return res;
};

export const updatePrayer = async (prayerId: number, body: DataPrayer) => {
  const res = await axios.put(`${BASE_URL}prayers/${prayerId}`, {
    title: body.title,
    description: body.description,
    checked: body.checked,
  });
  return res;
};
