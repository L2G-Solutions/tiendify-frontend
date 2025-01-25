import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const getFetcher = (token: string) => {
  const fetcher = axios.create({
    baseURL: API_URL + '/orders',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return fetcher;
};

export const getOrders = async ({ pagination, accessToken }: GetOrdersPayload): Promise<GetOrdersResponse> => {
  return (
    await getFetcher(accessToken).get('/', {
      params: pagination,
    })
  ).data;
};

export const getOrder = async ({ orderId, accessToken }: GetOrderPayload): Promise<GetOrderResponse> => {
  return (await getFetcher(accessToken).get(`/${orderId}`)).data;
};

export const cancelOrder = async ({ orderId, accessToken }: CancelOrderPayload): Promise<void> => {
  await getFetcher(accessToken).patch(`/${orderId}/cancel`);
};
