import { formatPrice } from '@/utils/formatters';
import { Chip } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';
import ProductActionMenu from '@/components/dashboard/products/ProductActionMenu';
import Link from 'next/link';

interface IProductCardProps {
  product: TProduct;
  href?: string;
  cardType?: 'grid' | 'list';
}

const ProductCard = ({ product, cardType, href }: IProductCardProps) => {
  return (
    <article className="group relative bg-gray-50 shadow-md shadow-gray-100 border border-gray-100 rounded-2xl hover:shadow-lg hover:shadow-primary-50">
      <Link href={href ? href : `/dashboard/products/${product.id}`} passHref>
        <main className={twMerge('flex', cardType === 'grid' ? 'flex-col gap-2' : 'flex-row gap-4')}>
          <div className={twMerge('abosulte', cardType === 'list' && 'aspect-square')}>
            <img
              className={twMerge(
                'object-cover aspect-square rounded-2xl shadow-sm group-hover:scale-[1.025] transition-all',
                cardType === 'grid' ? 'h-48' : 'h-44'
              )}
              src={product.thumbnailImg ?? 'https://placehold.co/150?text=📦'}
              width={cardType === 'grid' ? '100%' : 'auto'}
              alt="Product image"
            />
          </div>
          <div className={twMerge('flex-1 flex flex-col gap-2', cardType === 'grid' ? 'p-4 pt-2' : 'p-2')}>
            <small className="text-xs text-default-400">{product.id}</small>
            <h3 className="text-xl font-bold">{product.name}</h3>
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
          </div>
        </main>
      </Link>
      <footer className="absolute top-2 right-2">
        <ProductActionMenu productId={product.id} isProductHidden={product.isHidden ?? false} />
      </footer>
    </article>
  );
};

export default ProductCard;
