import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/customers',
  withCredentials: true,
});

/**
 * Retrieves a paginated list of customers.
 * @param pagination - The page and size options
 * @returns A list of customers and pagination info
 */
export const getCustomers = async ({ pagination }: GetCustomersPayload): Promise<GetCustomersResponse> => {
  const response = await fetcher.get('/', {
    params: pagination,
  });

  return response.data;
};
