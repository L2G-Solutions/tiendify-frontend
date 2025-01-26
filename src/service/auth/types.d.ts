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
