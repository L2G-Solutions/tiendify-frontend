import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const getFetcher = (token: string) => {
  const fetcher = axios.create({
    baseURL: API_URL + '/customers',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return fetcher;
};

export const getCustomers = async ({ pagination, accessToken }: GetCustomersPayload): Promise<GetCustomersResponse> => {
  const fetcher = getFetcher(accessToken);

  const response = await fetcher.get('/', {
    params: pagination,
  });

  return response.data;
};
