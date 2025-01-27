import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/auth/private/secret-keys/',
  withCredentials: true,
});

export const getSecretKeys = async (): Promise<SecretKey[]> => {
  return await (
    await fetcher.get('/')
  ).data;
};

export const createSecretKey = async (name: string): Promise<CreatedSecretKey> => {
  return await (
    await fetcher.post('/', { name })
  ).data;
};

export const deleteSecretKey = async (id: string): Promise<void> => {
  await fetcher.delete(`/${id}`);
};