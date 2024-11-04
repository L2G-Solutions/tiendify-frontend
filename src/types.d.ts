type TProductCategory = {
  id: string;
  name: string;
  description?: string;
};

type TProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  thumbnailImg: string;
  mediaFiles: string[];
  stock: number;
  categories: TProductCategory[];
  isHidden: boolean;
  createdAt: string;
};
