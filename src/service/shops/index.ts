import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/shops',
  withCredentials: true,
});

export const createShop = async (data: CreateShopPayload): Promise<Shop> => {
  return (await fetcher.post('/', data)).data;
};
