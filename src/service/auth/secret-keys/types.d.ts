type SecretKey = {
  id: string;
  name: string;
  scopes: List[string];
  prefix: string;
  enabled: bool;
  created_at: string;
  updated_at: string;
};

type CreatedSecretKey = {
  name: str;
  secret_key: str;
  scopes: List[str];
  prefix: str;
  enabled: bool;
  created_at: str;
  updated_at: str;
};
