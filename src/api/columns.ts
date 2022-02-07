import axios from 'axios';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const getColumns = async () => {
  const res = await axios.get(BASE_URL + 'columns').catch(error => error);
  return res;
};

export const postColumnPrayer = async (
  columnId: number,
  body: { title: string; description: string; checked: boolean },
) => {
  const res = await axios
    .post(`${BASE_URL}columns/${columnId}/prayers`, body)
    .catch(error => error);
  return res;
};
