'use client';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from '@nextui-org/react';
import { IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const NAVBAR_LINKS = [
  { name: 'About', href: '/about', withLogin: true, withLogout: true },
  { name: 'Docs', href: '/docs', withLogin: true, withLogout: true },
  { name: 'Infrastructure', href: '/infrastructure', withLogin: true, withLogout: true },
  { name: 'Sign In', href: '/login', withLogin: false, withLogout: true },
];

const NAVBAR_BUTTONS = [{ name: 'Sign Up', href: '/signup', withLogin: false, withLogout: true }];

const NAVBAR_DROPDOWN_SETTINGS = [
  { name: 'Profile', href: '/settings/profile' },
  { name: 'Preferences', href: '/settings/preferences' },
];

const NavBar = () => {
  const router = useRouter();

  // TODO: Update this when the session hook is implemented
  const userSession = {
    email: 'zoe.smith@example.com',
    name: 'Zoe Smith',
  };

  const isLogged = userSession !== null;

  return (
    <Navbar className="py-1 [&>header]:max-w-full fixed" shouldHideOnScroll>
      <NavbarBrand>
        <h2 className="text-primary font-bold">Tiendify 🛍️</h2>
      </NavbarBrand>
      <NavbarContent justify="end">
        {NAVBAR_LINKS.map(({ name, href, withLogin, withLogout }) => {
          if ((isLogged && !withLogin) || (!isLogged && !withLogout)) return null;
          return (
            <NavbarItem key={name} className="px-2">
              <Link color="foreground" href={href}>
                {name}
              </Link>
            </NavbarItem>
          );
        })}
        {NAVBAR_BUTTONS.map(({ name, href, withLogin, withLogout }) => {
          if ((isLogged && !withLogin) || (!isLogged && !withLogout)) return null;
          return (
            <NavbarItem key={name}>
              <Button color="primary" variant="solid" onClick={() => router.push(href)}>
                {name}
              </Button>
            </NavbarItem>
          );
        })}
        {isLogged && (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                showFallback
                fallback={<IconUser size={24} />}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                {/* TODO: Update using session information with session hoook */}
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{userSession.name}</p>
              </DropdownItem>
              <DropdownSection title="Settings">
                {NAVBAR_DROPDOWN_SETTINGS.map(({ name, href }) => (
                  <DropdownItem key={name} onClick={() => router.push(href)}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownSection>
              <DropdownSection title="Account">
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
