import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/customers',
  withCredentials: true,
});

export const getCustomers = async ({ pagination }: GetCustomersPayload): Promise<GetCustomersResponse> => {
  const response = await fetcher.get('/', {
    params: pagination,
  });

  return response.data;
};
