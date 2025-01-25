'use client';
import ProductsForm from '@/components/dashboard/products/ProductsForm';
import { editProduct, getProductById } from '@/service/products';
import { CircularProgress } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';

interface IProductEditPageProps {
  params: {
    productId: string;
  };
}

// TODO: Implement product update mutation
const ProductEditPage = ({ params }: IProductEditPageProps) => {
  const router = useRouter();
  const {
    data: originalProduct,
    isSuccess: isOriginalProductSuccess,
    isLoading: isOriginalProductLoading,
    isError: isOriginalProductError,
  } = useQuery({
    queryFn: () => getProductById({ productId: params.productId }),
    queryKey: ['product-details', params.productId],
  });

  const editProductMutation = useMutation({
    mutationFn: (productPayload: editProductPayload) =>
      editProduct({ productId: params.productId, product: productPayload.product }),
    onSuccess: () => {
      toast.success('Product updated successfully');
      router.push(`/dashboard/products/${params.productId}`);
    },
    onError: () => {
      toast.error('Failed to update product');
    },
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
            onSubmit={(productPayload) => {
              editProductMutation.mutate(productPayload as editProductPayload);
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
