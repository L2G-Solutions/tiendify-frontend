import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const getFetcher = (token: string) => {
  const fetcher = axios.create({
    baseURL: API_URL + '/auth',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return fetcher;
};

export const getCurrentSession = async (token: string): Promise<GetCurrentSessionResponse> => {
  return (await getFetcher(token).get('/private/me')).data;
};

export const logout = async (token: string): Promise<void> => {
  await getFetcher(token).post('/private/logout');
};
