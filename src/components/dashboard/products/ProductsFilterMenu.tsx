'use client';
import {
  Button,
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';
import { IconFilter } from '@tabler/icons-react';
import { useState } from 'react';
import type { Selection } from '@nextui-org/react';

const ProductsFilterMenu = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

  return (
    <Dropdown className="shadow-xl" placement="bottom">
      <DropdownTrigger>
          <Button color="default" variant="flat" isIconOnly startContent={<IconFilter size={16} />} />
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect
        aria-label="Filters"
        color="default"
        variant="flat"
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => setSelectedKeys(keys.currentKey === 'clear' ? new Set() : keys)}
      >
        <DropdownSection title="Filters">
          <DropdownItem key="sort-ascending-price">Sort by price (ascending)</DropdownItem>
        </DropdownSection>
        <DropdownSection title="Filter Options">
          <DropdownItem key="clear">Clear all filters</DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProductsFilterMenu;
