import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/orders',
  withCredentials: true,
});

/**
 * Retrieves a list of orders based on pagination options.
 * @param pagination - The page and size options
 * @returns A list of orders and pagination info
 */
export const getOrders = async ({ pagination }: GetOrdersPayload): Promise<GetOrdersResponse> => {
  return (
    await fetcher.get('/', {
      params: pagination,
    })
  ).data;
};

/**
 * Retrieves a specific order by its ID.
 * @param orderId - The unique identifier of the order
 * @returns The order details
 */
export const getOrder = async ({ orderId }: GetOrderPayload): Promise<GetOrderResponse> => {
  return (await fetcher.get(`/${orderId}`)).data;
};

/**
 * Cancels an order by its ID.
 * @param orderId - The unique identifier of the order
 */
export const cancelOrder = async ({ orderId }: CancelOrderPayload): Promise<void> => {
  await fetcher.patch(`/${orderId}/cancel`);
};
