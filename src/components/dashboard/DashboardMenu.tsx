import {
  IconAddressBook,
  IconBuildingStore,
  IconReceipt2,
  IconSettings,
  IconShoppingBag,
  IconTruckDelivery,
  IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';

export const DashboardMenu = () => {
  return (
    <menu className="flex flex-col gap-4 h-[100dvh] pb-20 border-r sticky top-0">
      <MenuLink href="/dashboard">
        <IconBuildingStore stroke={1} />
        My shop
      </MenuLink>
      <MenuLink href="/dashboard/products">
        <IconShoppingBag stroke={1} />
        Products
      </MenuLink>
      <MenuLink href="/dashboard/orders">
        <IconTruckDelivery stroke={1} />
        Orders
      </MenuLink>
      <MenuLink href="/dashboard/customers">
        <IconUsers stroke={1} />
        Customers
      </MenuLink>
      <MenuLink href="/dashboard/billing">
        <IconReceipt2 stroke={1} />
        Billing
      </MenuLink>
      <MenuLink href="/dashboard/account">
        <IconAddressBook stroke={1} />
        Account
      </MenuLink>
      <MenuLink href="/dashboard/settings">
        <IconSettings stroke={1} />
        Settings
      </MenuLink>
    </menu>
  );
};

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
};

const MenuLink = ({ href, children }: MenuLinkProps) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-4 px-28 py-4 hover:bg-primary-100 transition-colors hover:text-primary"
    >
      {children}
    </Link>
  );
};
