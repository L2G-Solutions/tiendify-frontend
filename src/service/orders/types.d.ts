type Order = {
  id: number;
  customer_id: string;
  customers: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  ordered_at: string;
  payments: {
    id: string;
    amount: number;
    method: string;
    status: string;
    paid_at: string;
  };
  shipping: {
    id: string;
    address_id: number;
    addresses: {
      address_label: string;
      city: string;
      country: string;
      state: string;
      zip_code: string;
    } | null;
    status: string;
    estimated_delivery: number;
    delivered_at: string | null;
    shipped_at: string | null;
  };
};

type GetOrdersPayload = {
  pagination: Pagination;
  accessToken: AccessToken;
};

type GetOrdersResponse = Order[];

type GetOrderPayload = {
  orderId: string;
  accessToken: AccessToken;
};

type GetOrderResponse = Order;

type CancelOrderPayload = {
  orderId: number;
  accessToken: AccessToken;
};
