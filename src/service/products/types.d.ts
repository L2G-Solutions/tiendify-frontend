type getProductPayload = {
  productId: string;
};

type getProductsPayload = {
  page: number;
  size: number;
  searchQuery?: string;
};

type getProductsResponse = {
  products: TProduct[];
  total: number;
};

type createProductPayload = {
  product: {
    name: string;
    price: number;
    description: string;
    stock: number;
    categories: string[];
    isHidden: boolean;
  };
};

type editProductPayload = {
  product: Partial<TProduct>;
  productId: string;
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

type createProductCategoryPayload = {
  category: Omit<TProductCategory, 'id'>;
};

type uploadProductImagePayload = {
  productId: string;
  image: File;
};
