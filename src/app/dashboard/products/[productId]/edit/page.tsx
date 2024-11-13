'use client';
import ProductsForm from '@/components/dashboard/products/ProductsForm';
import { getProductById } from '@/service/products';
import { CircularProgress } from '@nextui-org/react';
import { useQuery } from 'react-query';

interface IProductEditPageProps {
  params: {
    productId: string;
  };
}

// TODO: Implement product update mutation
const ProductEditPage = ({ params }: IProductEditPageProps) => {
  const {
    data: originalProduct,
    isSuccess: isOriginalProductSuccess,
    isLoading: isOriginalProductLoading,
    isError: isOriginalProductError,
  } = useQuery({
    queryFn: () => getProductById({ productId: params.productId }),
    queryKey: ['product-details', params.productId],
  });

  return (
    <section>
      <h1>Edit a product</h1>
      <small className="text-xs text-default-400">Product code: {params.productId}</small>
      <p className="text-default-400">
        Fill in the form below to edit a product. Fields marked with <span className="text-danger-500">*</span> are
        required.
      </p>
      <main className="mt-4">
        {isOriginalProductSuccess && (
          <ProductsForm
            product={originalProduct}
            onSubmit={(product) => {
              console.log(product);
            }}
          />
        )}
        {isOriginalProductLoading && (
          <div className="flex items-center justify-center mt-4">
            <CircularProgress />
          </div>
        )}
        {isOriginalProductError && <p>Failed to load product details</p>}
      </main>
    </section>
  );
};

export default ProductEditPage;
