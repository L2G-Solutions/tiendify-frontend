'use client';
import ProductCard from '@/components/dashboard/products/ProductCard';
import ProductsFilterMenu from '@/components/dashboard/products/ProductsFilterMenu';
import { getShopProducts } from '@/service/products';
import { Button, CircularProgress, Input, Pagination, Tooltip } from '@nextui-org/react';
import { IconLayoutList, IconLayoutGrid, IconPlus, IconSearch } from '@tabler/icons-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { twMerge } from 'tailwind-merge';

const PAGE_SIZE = 12;

const DashboardProductsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = isNaN(Number(searchParams.get('page'))) ? 1 : Number(searchParams.get('page'));
  const search = searchParams.get('search') || '';

  const {
    data: { products = [], total = 0 } = {},
    isSuccess,
    isLoading,
  } = useQuery({
    queryFn: () => getShopProducts({ page, size: PAGE_SIZE }),
    queryKey: 'shop-products',
  });

  const [isGridLayout, setIsGridLayout] = useState(false);

  const handleLayoutChange = () => {
    setIsGridLayout((prev) => !prev);
  };

  const handleAddProduct = () => {
    router.push('/dashboard/products/add');
  };

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col gap-2">
        <h1 className="mb-2">Products</h1>
        <div className="flex justify-between items-center gap-4">
          <form className="flex-1 inline-flex gap-2" action="">
            <Input
              placeholder="Search products by code or name"
              name="search"
              maxLength={100}
              startContent={<IconSearch size={16} />}
            />
            <Button type="submit" color="default" variant="flat">
              Search
            </Button>
          </form>
          <ul className="flex gap-2">
            <li>
              <ProductsFilterMenu />
            </li>
            <li>
              <Tooltip content={isGridLayout ? 'Switch to list view' : 'Switch to grid view'} placement="top">
                <Button
                  color="default"
                  variant="flat"
                  isIconOnly
                  startContent={isGridLayout ? <IconLayoutList size={16} /> : <IconLayoutGrid size={16} />}
                  onClick={handleLayoutChange}
                />
              </Tooltip>
            </li>
          </ul>
          <Button color="primary" startContent={<IconPlus size={16} />} onClick={handleAddProduct}>
            Add product
          </Button>
        </div>
        {search && (
          <div className="inline-flex gap-2 text-default-500">
            <p>Search results for </p>
            <p className="font-semibold">&quot;{search}&quot;</p>
          </div>
        )}
      </header>
      <main>
        {isSuccess && (
          <ul
            className={twMerge(
              'grid grid-cols-1 gap-4 md:gap-6',
              isGridLayout && 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            )}
          >
            {!products.length ? (
              <div className="flex flex-col items-center gap-4">
                <p>No products found.</p>
                <Button color="primary" startContent={<IconPlus size={16} />} onClick={handleAddProduct}>
                  Add product
                </Button>
              </div>
            ) : (
              products.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} cardType={isGridLayout ? 'grid' : 'list'} />
                </li>
              ))
            )}
          </ul>
        )}
        {isLoading && (
          <div className="flex flex-col items-center gap-4">
            <CircularProgress aria-label="Loading" />
            <p className="text-center">Loading products...</p>
          </div>
        )}
      </main>
      <footer className="flex justify-center">
        {isSuccess && products.length !== 0 && (
          <Pagination
            total={total % PAGE_SIZE === 0 ? total / PAGE_SIZE : Math.floor(total / PAGE_SIZE) + 1}
            initialPage={page}
            showControls
            boundaries={1}
            siblings={2}
            onChange={(page) => {
              router.push(`/dashboard/products?${search && `search=${search}&`}page=${page}`);
            }}
          />
        )}
      </footer>
    </section>
  );
};

export default DashboardProductsPage;
