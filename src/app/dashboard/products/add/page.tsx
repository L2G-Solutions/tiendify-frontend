'use client';
import ProductsForm from '@/components/dashboard/products/ProductsForm';
import { createProduct } from '@/service/products';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ProductCreatePage = () => {
  const router = useRouter();

  const createProductMutation = useMutation(createProduct, {
    onSuccess: (product) => {
      toast.success('Product created successfully');
      router.push(`/dashboard/products/${product.id}`);
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });

  return (
    <section>
      <h1>Create a product</h1>
      <p className="text-default-400">
        Fill in the form below to create a new product. Fields marked with <span className="text-danger-500">*</span>{' '}
        are required.
      </p>
      <main className="mt-4">
        <ProductsForm
          onSubmit={(product) => {
            createProductMutation.mutate(product as createProductPayload);
          }}
        />
      </main>
    </section>
  );
};

export default ProductCreatePage;
