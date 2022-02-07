import axios from 'axios';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const getPrayers = async () => {
  const res = await axios.get(BASE_URL + 'prayers').catch(error => error);
  return res;
};

export const deletePrayer = async (prayerId: number) => {
  const res = await axios.delete(`${BASE_URL}prayers/${prayerId}`);
  return res;
};

export const postPrayer = async (
  columnId: number,
  body: { title: string; description: string; checked: boolean },
) => {
  const res = await axios
    .post(`${BASE_URL}columns/${columnId}/prayers`, body)
    .catch(error => error);
  return res;
};
