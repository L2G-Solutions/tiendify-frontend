'use client';
import { Button, Dropdown, DropdownSection, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';
import { IconCopy, IconDotsVertical, IconEye, IconEyeClosed, IconPencil, IconTrash } from '@tabler/icons-react';

interface IProductActionMenuProps {
  isProductHidden: boolean;
}

const ProductActionMenu = () => {
  return (
    <Dropdown className="shadow-lg" placement="bottom">
      <DropdownTrigger>
        <Button color="default" variant="solid" isIconOnly startContent={<IconDotsVertical size={16} />} />
      </DropdownTrigger>
      <DropdownMenu closeOnSelect aria-label="Actions" color="default" variant="flat">
        <DropdownSection title="Actions">
          <DropdownItem key="edit" startContent={<IconPencil size={16} />}>
            Edit
          </DropdownItem>
          <DropdownItem key="duplicate" startContent={<IconCopy size={16} />}>
            Duplicate
          </DropdownItem>
          <DropdownItem
            key="hide"
            color="warning"
            startContent={isProductHidden ? <IconEye size={16} /> : <IconEyeClosed size={16} />}
            onClick={handleProductVisibilityChange}
          >
            {isProductHidden ? 'Unhide' : 'Hide'} for customers
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Danger Zone">
          <DropdownItem key="hide" color="warning" startContent={<IconEyeClosed size={16} />}>
            Hide for customers
          </DropdownItem>
          <DropdownItem key="delete" color="danger" startContent={<IconTrash size={16} />}>
            Delete
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProductActionMenu;
