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

export const authorizeLogin = async (queryParams: URLSearchParams, validation_uri: string): Promise<void> => {
  const params = new URLSearchParams(queryParams);
  params.append('validation_uri', validation_uri);
  return (
    await axios.post(API_URL + '/auth/public/authorize', null, {
      params: params,
      withCredentials: true,
    })
  ).data;
};
