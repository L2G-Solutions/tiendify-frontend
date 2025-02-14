import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

/**
 * This fetcher instance is used to make requests to the shop management services.
 */
const fetcher = axios.create({
  baseURL: API_URL + '/shops',
  withCredentials: true,
});

/**
 * Creates a new shop using the provided data
 * @param data - The payload containing shop details
 * @returns The newly created shop
 */
export const createShop = async (data: CreateShopPayload): Promise<Shop> => {
  return (await fetcher.post('/', data)).data;
};
