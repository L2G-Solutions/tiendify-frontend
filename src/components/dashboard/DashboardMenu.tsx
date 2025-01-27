import { Chip } from '@nextui-org/react';
import {
  IconAddressBook,
  IconApi,
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
      <MenuLink href="/dashboard/products" badge="updated">
        <IconShoppingBag stroke={1} />
        Products
      </MenuLink>
      <MenuLink href="/dashboard/orders" badge="beta">
        <IconTruckDelivery stroke={1} />
        Orders
      </MenuLink>
      <MenuLink href="/dashboard/customers">
        <IconUsers stroke={1} />
        Customers
      </MenuLink>
      <MenuLink href="/dashboard/" badge="coming soon">
        <IconReceipt2 stroke={1} />
        Billing
      </MenuLink>
      <MenuLink href="/dashboard/account" badge="coming soon">
        <IconAddressBook stroke={1} />
        Account
      </MenuLink>
      <MenuLink href="/dashboard/api-integration" badge="new">
        <IconApi stroke={1} />
        API Integration
      </MenuLink>
      <MenuLink href="/dashboard/settings" badge="coming soon">
        <IconSettings stroke={1} />
        Settings
      </MenuLink>
    </menu>
  );
};

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
  badge?: 'new' | 'updated' | 'coming soon' | 'beta';
};

const MenuLink = ({ href, children, badge }: MenuLinkProps) => {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-4 px-28 py-4 hover:bg-primary-100 transition-colors hover:text-primary"
    >
      {children}
      {badge && (
        <Chip
          color={
            badge === 'new'
              ? 'success'
              : badge === 'updated'
              ? 'secondary'
              : badge === 'coming soon'
              ? 'default'
              : 'warning'
          }
          size="sm"
          variant="flat"
          className="capitalize"
        >
          {badge}
        </Chip>
      )}
    </Link>
  );
};
