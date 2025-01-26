'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import useCurentUrl from '@/hooks/useCurentUrl';
import { logout } from '@/service/auth';
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
import { useMutation } from 'react-query';

const NAVBAR_BUTTONS = [{ name: 'Sign Up', href: '/signup', withLogin: false, withLogout: true }];

const NAVBAR_DROPDOWN_SETTINGS = [
  { name: 'Profile', href: '/settings/profile' },
  { name: 'Preferences', href: '/settings/preferences' },
];

const NAVBAR_LINKS = [
  { name: 'About', href: '/about', withLogin: true, withLogout: true },
  { name: 'Docs', href: '/docs', withLogin: true, withLogout: true },
  { name: 'Infrastructure', href: '/infrastructure', withLogin: true, withLogout: true },
  { name: 'Sign In', href: '', withLogin: false, withLogout: true },
];

const NavBar = () => {
  const router = useRouter();

  const { status, userData, setUserData } = useAuth();

  const { domainUrl } = useCurentUrl();
  const LOGIN_REDIRECT_URL = `${domainUrl}/auth/authorize`;
  const LOGIN_URL = `${process.env.NEXT_PUBLIC_SHOP_MANAGEMENT_API_URL}/auth/public/login?redirect_uri=${LOGIN_REDIRECT_URL}`;

  const [navbarLinks, setNavbarLinks] = useState(NAVBAR_LINKS);

  useEffect(() => {
    if (domainUrl) {
      setNavbarLinks((prev) =>
        prev.map((link) => {
          if (link.name === 'Sign In') {
            return { ...link, href: LOGIN_URL };
          }
          return link;
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainUrl]);

  const logoutMutation = useMutation({
    mutationFn: logout,
  });

  const handleLogout = () => {
    if (window) {
      setUserData(undefined);
      logoutMutation.mutate();
    }
  };

  return (
    <Navbar className="py-1 [&>header]:max-w-full fixed" shouldHideOnScroll>
      <NavbarBrand>
        <Link href="/">
          <h2 className="text-primary font-bold">Tiendify 🛍️</h2>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        {navbarLinks.map(({ name, href, withLogin, withLogout }) => {
          if ((status === 'authenticated' && !withLogin) || (status !== 'authenticated' && !withLogout)) return null;
          return (
            <NavbarItem key={name} className="px-2">
              <Link color="foreground" href={href}>
                {name}
              </Link>
            </NavbarItem>
          );
        })}
        {NAVBAR_BUTTONS.map(({ name, href, withLogin, withLogout }) => {
          if ((status === 'authenticated' && !withLogin) || (status !== 'authenticated' && !withLogout)) return null;
          return (
            <NavbarItem key={name}>
              <Button color="primary" variant="solid" onClick={() => router.push(href)}>
                {name}
              </Button>
            </NavbarItem>
          );
        })}
        {status === 'authenticated' && (
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
                <p className="font-semibold">{userData?.user.firstName}</p>
              </DropdownItem>
              <DropdownSection title="Settings">
                {NAVBAR_DROPDOWN_SETTINGS.map(({ name, href }) => (
                  <DropdownItem key={name} onClick={() => router.push(href)}>
                    {name}
                  </DropdownItem>
                ))}
              </DropdownSection>
              <DropdownSection title="Account">
                <DropdownItem key="logout" color="danger" onClick={handleLogout}>
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
