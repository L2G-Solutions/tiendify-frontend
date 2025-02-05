type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  email_verified: boolean;
  role: 'ADMIN' | 'USER';
};

type GetCurrentSessionResponse = User & {
  shop?: Shop[];
};

type SignUpPayload = {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
};
