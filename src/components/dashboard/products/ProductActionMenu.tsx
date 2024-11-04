'use client';
import { Button, Dropdown, DropdownSection, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { IconCopy, IconDotsVertical, IconEye, IconEyeClosed, IconPencil, IconTrash } from '@tabler/icons-react';
import { deleteProduct, toggleProductVisibility, duplicateProduct } from '@/service/products';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
interface IProductActionMenuProps {
  productId: string;
  isProductHidden: boolean;
}

const ProductActionMenu = ({ productId, isProductHidden }: IProductActionMenuProps) => {
  const router = useRouter();

  const handleProductEdit = () => {
    router.push(`/dashboard/products/${productId}/edit`);
  };

  const handleProductDuplicate = useMutation(duplicateProduct, {
    onSuccess: () => {
      toast.success('Product duplicated');
    },
    onError: () => {
      toast.error("Something went wrong. Couldn't duplicate product");
    },
  });

  // TODO: Add delete product dialog confirmation
  const handleProductDelete = useMutation(deleteProduct, {
    onSuccess: () => {
      toast.success('Product deleted');
    },
  });

  const handleProductVisibilityChange = useMutation(toggleProductVisibility, {
    onSuccess: () => {
      toast.success('Product visibility changed');
    },
    onError: () => {
      toast.error("Something went wrong. Couldn't change product visibility");
    },
  });

  const isLoading =
    handleProductDelete.isLoading || handleProductDuplicate.isLoading || handleProductVisibilityChange.isLoading;

  return (
    <Dropdown className="shadow-lg" placement="bottom">
      <DropdownTrigger>
        <Button
          color="default"
          variant="solid"
          isIconOnly
          startContent={!isLoading && <IconDotsVertical size={16} />}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </DropdownTrigger>
      <DropdownMenu closeOnSelect aria-label="Actions" color="default" variant="flat">
        <DropdownSection title="Actions">
          <DropdownItem key="edit" startContent={<IconPencil size={16} />} onClick={handleProductEdit}>
            Edit
          </DropdownItem>
          <DropdownItem
            key="duplicate"
            startContent={<IconCopy size={16} />}
            onClick={() => handleProductDuplicate.mutate({ productId })}
          >
            Duplicate
          </DropdownItem>
          <DropdownItem
            key="hide"
            color="warning"
            startContent={isProductHidden ? <IconEye size={16} /> : <IconEyeClosed size={16} />}
            onClick={() => handleProductVisibilityChange.mutate({ productId, isHidden: !isProductHidden })}
          >
            {isProductHidden ? 'Unhide' : 'Hide'} for customers
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger Zone">
          <DropdownItem
            key="delete"
            color="danger"
            startContent={<IconTrash size={16} />}
            onClick={() => handleProductDelete.mutate({ productId })}
          >
            Delete
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProductActionMenu;
