type getProductPayload = {
  productId: string;
};

type getProductsPayload = {
  page: number;
  size: number;
};

type getProductsResponse = {
  products: TProduct[];
  total: number;
};

type createProductPayload = {
  product: Omit<TProduct, 'id' | 'createdAt'>;
};

type editProductPayload = {
  product: Partial<Omit<TProduct, 'createdAt'>>;
};

type deleteProductPayload = {
  productId: string;
};

type toggleProductVisibilityPayload = {
  productId: string;
  isHidden: boolean;
};

type duplicateProductPayload = {
  productId: string;
};
