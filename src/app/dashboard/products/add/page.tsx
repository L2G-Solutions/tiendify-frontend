'use client';
import ProductsForm from '@/components/dashboard/products/ProductsForm';
import { createProduct, uploadProductImage } from '@/service/products';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ProductCreatePage = () => {
  const router = useRouter();
  const uploadProductImageMutation = useMutation({
    mutationFn: uploadProductImage,
    onSuccess: () => {
      toast.success('Image uploaded successfully');
    },
  });

  const createProductMutation = useMutation({
    mutationFn: async ({ mediafiles, product }: { product: createProductPayload; mediafiles: File[] }) => {
      const prod = await createProduct(product);

      mediafiles.forEach((file) => {
        uploadProductImageMutation.mutate({ productId: prod.id, image: file });
      });

      return prod;
    },
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
          onSubmit={(product, mediafileImages) => {
            createProductMutation.mutate({
              product: product as createProductPayload,
              mediafiles: mediafileImages,
            });
          }}
        />
      </main>
    </section>
  );
};

export default ProductCreatePage;
