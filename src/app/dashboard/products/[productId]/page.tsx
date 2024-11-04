'use client';
import { deleteProduct, duplicateProduct, getProductById } from '@/service/products';
import { formatPrice } from '@/utils/formatters';
import { BreadcrumbItem, Breadcrumbs, Button, ButtonGroup, Chip, CircularProgress, Tooltip } from '@nextui-org/react';
import { IconCopy, IconEye, IconEyeOff, IconPencil, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

interface IProductDetailsPageProps {
  params: { productId: string };
}

const ProductDetailsPage = ({ params }: IProductDetailsPageProps) => {
  const router = useRouter();

  const {
    data: product,
    isSuccess,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => getProductById({ productId: params.productId }),
    queryKey: ['product-details', params.productId],
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleEditProduct = () => {
    router.push(`/dashboard/products/${params.productId}/edit`);
  };

  const duplicateProductMutation = useMutation(duplicateProduct, {
    onSuccess: (data) => {
      toast.success('Product duplicated successfully');
      router.push(`/dashboard/products/${data.id}`);
    },
  });

  // TODO: Add delete confirmation dialog
  const deleteProductMutation = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success('Product deleted successfully');
      router.push('/dashboard/products');
    },
  });

  // TODO: Add slide show for product images
  return (
    <section>
      <h1>Product Details</h1>
      <small className="text-xs text-default-400">Product code: {params.productId}</small>
      {isSuccess && (
        <>
          <header className="flex items-center justify-between gap-4 mt-4">
            <Breadcrumbs maxItems={2} underline="hover">
              <BreadcrumbItem href="../">Dashboard</BreadcrumbItem>
              <BreadcrumbItem href="./">Products</BreadcrumbItem>
              <BreadcrumbItem>{product.name}</BreadcrumbItem>
            </Breadcrumbs>
            <ButtonGroup>
              <Tooltip content="Duplicate product" placement="top">
                <Button
                  color="default"
                  variant="flat"
                  isIconOnly
                  startContent={!duplicateProductMutation.isLoading && <IconCopy size={16} />}
                  isLoading={duplicateProductMutation.isLoading}
                  onClick={() => duplicateProductMutation.mutate({ productId: params.productId })}
                />
              </Tooltip>
              <Tooltip content="Delete product" placement="top">
                <Button
                  color="default"
                  variant="flat"
                  className="text-danger-500"
                  isIconOnly
                  startContent={!deleteProductMutation.isLoading && <IconTrash size={16} />}
                  isLoading={deleteProductMutation.isLoading}
                  onClick={() => deleteProductMutation.mutate({ productId: params.productId })}
                />
              </Tooltip>
              <Button
                color="default"
                variant="flat"
                className="text-secondary-500"
                startContent={<IconPencil size={16} />}
                onClick={handleEditProduct}
              >
                Edit product
              </Button>
            </ButtonGroup>
          </header>
          <main className="flex flex-col lg:flex-row gap-8 mt-4">
            <div className="w-full flex flex-col lg:flex-row gap-4 items-center">
              {product.mediaFiles?.length ? (
                <>
                  <div>
                    <img
                      src={selectedImage || product.mediaFiles[0]}
                      alt={product.name}
                      className="aspect-square object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex lg:flex-col gap-2 justify-center">
                    {product.mediaFiles?.map((media, index) => (
                      <div key={`media-${index}`}>
                        <img
                          src={media}
                          alt={product.name}
                          className="max-h-16 aspect-square object-cover rounded-lg"
                          onClick={() => setSelectedImage(media)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <img
                  src={product.thumbnailImg}
                  alt={product.name}
                  className="w-48 aspect-square object-cover rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-col gap-2 px-4">
              <div className="flex gap-2 items-center">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <Chip
                  color={product.isHidden ? 'warning' : 'success'}
                  variant="flat"
                  size="sm"
                  className="px-2"
                  startContent={
                    product.isHidden ? <IconEyeOff size={16} stroke={2} /> : <IconEye size={16} stroke={2} />
                  }
                >
                  {product.isHidden ? 'Private' : 'Public'} product
                </Chip>
              </div>
              <p>{product.description}</p>
              <div className="flex gap-2">
                {product.categories?.map((category) => (
                  <Chip key={category} color="secondary" variant="flat" size="sm" className="capitalize px-2">
                    {category}
                  </Chip>
                ))}
              </div>
              <p className="font-bold">{formatPrice(product.price ?? 0)}</p>
              <p className={twMerge(product.stock === 0 && 'text-danger-500')}>
                {product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`}
              </p>
              <small className="text-xs text-default-400">Last updated: {product.createdAt}</small>
            </div>
          </main>
        </>
      )}
      {isLoading && (
        <div className="w-full flex flex-col justify-center items-center gap-2 py-6">
          <CircularProgress />
          Searching for product details...
        </div>
      )}
      {isError && (
        <div className="w-full flex flex-col justify-center items-center gap-2 py-6">
          <p>
            Product not found, go back to the <Link href="/dashboard/products">products list</Link>.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductDetailsPage;
