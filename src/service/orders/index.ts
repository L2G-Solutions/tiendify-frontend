import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/orders',
  withCredentials: true,
});

export const getOrders = async ({ pagination }: GetOrdersPayload): Promise<GetOrdersResponse> => {
  return (
    await fetcher.get('/', {
      params: pagination,
    })
  ).data;
};

export const getOrder = async ({ orderId }: GetOrderPayload): Promise<GetOrderResponse> => {
  return (await fetcher.get(`/${orderId}`)).data;
};

export const cancelOrder = async ({ orderId }: CancelOrderPayload): Promise<void> => {
  await fetcher.patch(`/${orderId}/cancel`);
};
