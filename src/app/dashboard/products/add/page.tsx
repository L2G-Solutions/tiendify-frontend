'use client';
import ProductsForm from '@/components/dashboard/products/ProductsForm';

// TODO: Implement product creation logic
const ProductCreatePage = () => {
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
            console.log(product);
          }}
        />
      </main>
    </section>
  );
};

export default ProductCreatePage;
