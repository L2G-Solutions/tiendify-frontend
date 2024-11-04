export const getShopProducts = async (
  page: number,
  size: number
): Promise<{
  products: TProduct[];
  total: number;
}> => {
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
      categories: ['clothing', 'woman', 'shoes'],
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
      categories: ['clothing', 'men', 't-shirt'],
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
      categories: ['clothing', 'woman', 'blouse'],
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
