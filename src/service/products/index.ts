export const getProductById = async ({ productId }: getProductPayload): Promise<TProduct> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: productId,
        name: 'Tennis',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        price: 123.5,
        stock: 0,
        createdAt: '2021-10-01',
        thumbnailImg: 'https://picfiles.alphacoders.com/364/364333.jpg',
        mediaFiles: [
          'https://picfiles.alphacoders.com/364/364333.jpg',
          'https://picfiles.alphacoders.com/364/364333.jpg',
          'https://picfiles.alphacoders.com/364/364333.jpg',
        ],
        categories: [
          {
            id: 'TPC123',
            name: 'Clothing',
            description: 'Clothing category',
          },
        ],
        isHidden: true,
      });
    }, 1500);
  });
};

export const getShopProducts = async ({ page, size }: getProductsPayload): Promise<getProductsResponse> => {
  // TODO: Fetch shop products from the API
  const products: TProduct[] = [
    {
      id: 'TP32312',
      name: 'Tennis',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      price: 123.5,
      stock: 0,
      createdAt: '2021-10-01',
      thumbnailImg: 'https://picfiles.alphacoders.com/364/364333.jpg',
      mediaFiles: [
        'https://picfiles.alphacoders.com/364/364333.jpg',
        'https://picfiles.alphacoders.com/364/364333.jpg',
        'https://picfiles.alphacoders.com/364/364333.jpg',
      ],
      categories: [
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
      ],
      isHidden: true,
    },
    {
      id: 'TP32313',
      name: 'Sport T-shirt',
      description: 'Product 2 description',
      price: 86.5,
      stock: 20,
      createdAt: '2021-10-01',
      thumbnailImg: 'https://picfiles.alphacoders.com/430/430511.jpg',
      mediaFiles: [
        'https://picfiles.alphacoders.com/430/430511.jpg',
        'https://picfiles.alphacoders.com/430/430511.jpg',
        'https://picfiles.alphacoders.com/430/430511.jpg',
      ],
      categories: [
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
      ],
      isHidden: false,
    },
    {
      id: 'TP32314',
      name: 'Blouse',
      description: 'Product 3 description',
      price: 45.5,
      stock: 10,
      createdAt: '2021-10-01',
      thumbnailImg: 'https://images2.alphacoders.com/551/551806.jpg',
      mediaFiles: [
        'https://images2.alphacoders.com/551/551806.jpg',
        'https://images2.alphacoders.com/551/551806.jpg',
        'https://images2.alphacoders.com/551/551806.jpg',
      ],
      categories: [
        {
          id: 'TPC123',
          name: 'Clothing',
          description: 'Clothing category',
        },
        {
          id: 'TPC124',
          name: 'woman',
          description: 'Woman category',
        },
        {
          id: 'TPC125',
          name: 'Shoes',
          description: 'Shoes category',
        },
      ],
      isHidden: false,
    },
  ];
  console.log('Fetching products...', page, size);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        products: [...products, ...products],
        total: 200,
      });
    }, 1500);
  });
};

export const createProduct = async ({ product }: createProductPayload): Promise<TProduct> => {
  console.log('Creating product...', product);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'TP32315',
        ...product,
        createdAt: '2021-10-01',
        thumbnailImg: 'https://picfiles.alphacoders.com/364/364333.jpg',
        mediaFiles: [
          'https://picfiles.alphacoders.com/364/364333.jpg',
          'https://picfiles.alphacoders.com/364/364333.jpg',
          'https://picfiles.alphacoders.com/364/364333.jpg',
        ],
        categories: [
          {
            id: 'TPC123',
            name: 'Clothing',
            description: 'Clothing category',
          },
        ],
        isHidden: true,
      });
    }, 1500);
  });
};

export const editProduct = async ({ product }: editProductPayload): Promise<TProduct> => {
  console.log('Editing product...', product);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'TP32314',
        name: 'Blouse',
        description: 'Product 3 description',
        price: 45.5,
        stock: 10,
        createdAt: '2021-10-01',
        thumbnailImg: 'https://images2.alphacoders.com/551/551806.jpg',
        mediaFiles: [
          'https://images2.alphacoders.com/551/551806.jpg',
          'https://images2.alphacoders.com/551/551806.jpg',
          'https://images2.alphacoders.com/551/551806.jpg',
        ],
        categories: [
          {
            id: 'TPC123',
            name: 'Clothing',
            description: 'Clothing category',
          },
          {
            id: 'TPC124',
            name: 'woman',
            description: 'Woman category',
          },
          {
            id: 'TPC125',
            name: 'Shoes',
            description: 'Shoes category',
          },
        ],
        isHidden: false,
      });
    }, 1500);
  });
};

export const deleteProduct = async ({ productId }: deleteProductPayload): Promise<void> => {
  console.log('Deleting product...', productId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1500);
  });
};

export const toggleProductVisibility = async ({
  productId,
  isHidden,
}: toggleProductVisibilityPayload): Promise<TProduct> => {
  console.log('Toggling product visibility...', productId, isHidden);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'TP32314',
        name: 'Blouse',
        description: 'Product 3 description',
        price: 45.5,
        stock: 10,
        createdAt: '2021-10-01',
        thumbnailImg: 'https://images2.alphacoders.com/551/551806.jpg',
        mediaFiles: [
          'https://images2.alphacoders.com/551/551806.jpg',
          'https://images2.alphacoders.com/551/551806.jpg',
          'https://images2.alphacoders.com/551/551806.jpg',
        ],
        categories: [
          {
            id: 'TPC123',
            name: 'Clothing',
            description: 'Clothing category',
          },
        ],
        isHidden: !isHidden,
      });
    }, 1500);
  });
};

export const duplicateProduct = async ({ productId }: duplicateProductPayload): Promise<TProduct> => {
  console.log('Duplicating product...', productId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'TP32316',
        name: 'Blouse',
        description: 'Product 3 description',
        price: 45.5,
        stock: 10,
        createdAt: '2021-10-01',
        thumbnailImg: 'https://images2.alphacoders.com/551/551806.jpg',
        mediaFiles: [
          'https://images2.alphacoders.com/551/551806.jpg',
          'https://images2.alphacoders.com/551/551806.jpg',
          'https://images2.alphacoders.com/551/551806.jpg',
        ],
        categories: [
          {
            id: 'TPC123',
            name: 'Clothing',
            description: 'Clothing category',
          },
        ],
        isHidden: false,
      });
    }, 1500);
  });
};
