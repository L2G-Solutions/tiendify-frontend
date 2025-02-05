import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/auth',
  withCredentials: true,
});

export const getCurrentSession = async (): Promise<GetCurrentSessionResponse> => {
  return (await fetcher.get('/private/me')).data;
};

export const logout = async (): Promise<void> => {
  await fetcher.post('/private/logout');
};

export const authorizeLogin = async (queryParams: URLSearchParams, validation_uri: string): Promise<void> => {
  const params = new URLSearchParams(queryParams);
  params.append('validation_uri', validation_uri);
  return (
    await fetcher.post(API_URL + '/auth/public/authorize', null, {
      params: params,
    })
  ).data;
};

export const signup = async (data: SignUpPayload): Promise<User> => {
  return (await fetcher.post('/public/signup', data)).data;
};
