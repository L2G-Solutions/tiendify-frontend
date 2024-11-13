import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/products',
});

export const getProductById = async ({ productId }: getProductPayload): Promise<TProduct> => {
  return (await fetcher.get(`/${productId}`)).data;
};

export const getShopProducts = async ({ page, size }: getProductsPayload): Promise<getProductsResponse> => {
  return (
    await fetcher.get('/', {
      params: { page, size },
    })
  ).data;
};

export const createProduct = async ({ product }: createProductPayload): Promise<TProduct> => {
  return (await fetcher.post('/', product)).data;
};

export const editProduct = async ({ productId, product }: editProductPayload): Promise<TProduct> => {
  return (await fetcher.put(`/${productId}`, product)).data;
};

export const deleteProduct = async ({ productId }: deleteProductPayload): Promise<void> => {
  await fetcher.delete(`/${productId}`);
};

// TODO: Implement the corresponding service functions
export const toggleProductVisibility = async ({
  productId,
  isHidden,
}: toggleProductVisibilityPayload): Promise<TProduct> => {
  console.log('Toggling product visibility...', productId, isHidden);
  const product = await getProductById({ productId });
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...product,
        isHidden: !isHidden,
      });
    }, 500);
  });
};

export const duplicateProduct = async ({ productId }: duplicateProductPayload): Promise<TProduct> => {
  const product = await getProductById({ productId });

  if (!product) {
    throw new Error('Product not found');
  }

  return await createProduct({
    product: {
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      categories: product.categories.map((category) => category.id),
      isHidden: product.isHidden,
    },
  });
};

// TODO: Implement the corresponding service functions
export const getProductCategories = async (): Promise<TProductCategory[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'consumible',
          name: 'Consumible',
          description: 'Productos para la ingesta humana',
        },
        {
          id: 'TPC123',
          name: 'Clothing',
          description: 'Clothing category',
        },
        {
          id: 'TPC124',
          name: 'Shoes',
          description: 'Shoes category',
        },
        {
          id: 'TPC125',
          name: 'T-shirt',
          description: 'T-shirt category',
        },
      ]);
    }, 1500);
  });
};

// TODO: Implement the corresponding service functions
export const createProductCategory = async ({ category }: createProductCategoryPayload): Promise<TProductCategory> => {
  console.log('Creating category...', category);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'TPC126',
        ...category,
      });
    }, 1500);
  });
};
