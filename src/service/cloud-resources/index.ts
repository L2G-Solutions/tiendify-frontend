import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/shops',
  withCredentials: true,
});

/**
 * Retrieves cloud resources details for the current shop.
 * @returns The resource usage details
 */
export const getResources = async (): Promise<Resources> => {
  return await (
    await fetcher.get('/resources')
  ).data;
};
