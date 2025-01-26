type Customer = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  default_address_id: string | null;
  created_at: string;
  addresses: {
    address_label: string;
    city: string;
    country: string;
    state: string;
    zip_code: string;
  } | null;
};

type GetCustomersPayload = {
  pagination: Pagination;
};

type GetCustomersResponse = Customer[];
