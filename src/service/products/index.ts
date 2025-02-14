import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL;

const fetcher = axios.create({
  baseURL: API_URL + '/products',
  withCredentials: true,
});

/**
 * Retrieves a product by its ID.
 * @param productId - Unique identifier of the product
 * @returns The matching product
 */
export const getProductById = async ({ productId }: getProductPayload): Promise<TProduct> => {
  return (await fetcher.get(`/${productId}`)).data;
};

/**
 * Fetches a paginated list of products matching a query.
 * @param page - Current page
 * @param size - Number of items per page
 * @param searchQuery - Query to filter products
 * @returns A list of products and pagination details
 */
export const getShopProducts = async ({
  page,
  size,
  searchQuery,
}: getProductsPayload): Promise<getProductsResponse> => {
  return (
    await fetcher.get('/', {
      params: {
        limit: size,
        offset: (page - 1) * size,
        search: searchQuery,
      },
    })
  ).data;
};

/**
 * Creates a new product with provided details.
 * @param product - Product data
 * @returns The newly created product
 */
export const createProduct = async ({ product }: createProductPayload): Promise<TProduct> => {
  return (await fetcher.post('/', product)).data;
};

/**
 * Updates an existing product with new details.
 * @param productId - The product's unique identifier
 * @param product - Updated fields
 * @returns The updated product
 */
export const editProduct = async ({ productId, product }: editProductPayload): Promise<TProduct> => {
  return (await fetcher.put(`/${productId}`, product)).data;
};

/**
 * Removes a product permanently by its ID.
 * @param productId - The product's unique identifier
 */
export const deleteProduct = async ({ productId }: deleteProductPayload): Promise<void> => {
  await fetcher.delete(`/${productId}`);
};

/**
 * Updates product visibility (hidden or visible).
 * @param productId - The product's unique identifier
 * @param isHidden - Whether the product is hidden
 * @returns The updated product
 */
export const toggleProductVisibility = async ({
  productId,
  isHidden,
}: toggleProductVisibilityPayload): Promise<TProduct> => {
  return (await fetcher.patch(`/${productId}/visibility`, { hidden: isHidden })).data;
};

/**
 * Creates a duplicate of an existing product.
 * @param productId - The ID of the product to duplicate
 * @returns The duplicated product
 */
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

/**
 * Retrieves all product categories.
 * @returns A list of available product categories
 */
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

/**
 * Creates a new category with the provided data.
 * @param category - Category details
 * @returns The newly created product category
 */
export const createProductCategory = async ({ category }: createProductCategoryPayload): Promise<TProductCategory> => {
  // TODO: Implement API call to create a new category
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'TPC126',
        ...category,
      });
    }, 1500);
  });
};

/**
 * Uploads a product image for the specified product.
 * @param productId - The product's ID
 * @param image - The image file to upload
 * @returns Response data from the upload
 */
export const uploadProductImage = async ({ productId, image }: uploadProductImagePayload) => {
  const formData = new FormData();
  formData.append('image', image);

  return (await fetcher.post(`/${productId}/mediafile`, formData)).data;
};
