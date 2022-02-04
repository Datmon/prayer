import axios from 'axios';

const BASE_URL = 'https://prayer.herokuapp.com/';

export const signIn = async (email: string, password: string) => {
  const res = await axios.post(BASE_URL + 'auth/sign-in', { email, password });
  return res;
};

export const signUp = async (name: string, email: string, password: string) => {
  const res = await axios
    .post(BASE_URL + 'auth/sign-up', {
      name,
      email,
      password,
    })
    .catch(error => error);
  return res;
};
