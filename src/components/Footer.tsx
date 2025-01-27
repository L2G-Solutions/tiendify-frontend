import { getDocUrl } from '@/constants/docLinks';
import { Button } from '@nextui-org/react';
import {
  IconArticleFilled,
  IconBrandLinkedinFilled,
  IconBrandXFilled,
  IconFileCode,
  IconPointFilled,
} from '@tabler/icons-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-16 m-auto w-full py-24 px-20 [clip-path:inset(0_-100vmax)] mt-10 shadow-[0_0_0_100vmax_var(--tw-shadow-color)] shadow-gray-100 bg-gray-100 max-w-[1500px]">
      <section className="flex items-center gap-32 w-full border-b-2 pb-10">
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl font-bold">Tiendify 🛍️</h2>
          <p className="text-gray-500">Turn your business dreams into an amazing reality!</p>
          <div className="flex gap-4">
            <MediaLinkButton href="https://twitter.com/">
              <IconBrandXFilled size={20} />
            </MediaLinkButton>
            <MediaLinkButton href="https://linkedin.com/">
              <IconBrandLinkedinFilled size={20} />
            </MediaLinkButton>
            <Button color="primary">Get started!</Button>
          </div>
        </div>
        <div className="flex justify-between flex-1">
          <section className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">Our company</h4>
            <FooterLinkButton href="/about">About us</FooterLinkButton>
            <FooterLinkButton href="/contact">Contact</FooterLinkButton>
            <FooterLinkButton href="/pricing">Pricing</FooterLinkButton>
          </section>
          <section className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">Resources</h4>
            <FooterLinkButton href={getDocUrl('docs')} newTab>
              <IconFileCode size={20} stroke={1.5} />
              Documentation
            </FooterLinkButton>
            <FooterLinkButton href={getDocUrl('blog')} newTab>
              <IconArticleFilled size={20} />
              Blog
            </FooterLinkButton>
          </section>
          <section className="flex flex-col gap-5">
            <h4 className="text-lg font-bold">Legal</h4>
            <FooterLinkButton href="/privacy-policy">Privacy Policy</FooterLinkButton>
            <FooterLinkButton href="/terms-of-service">Terms of Service</FooterLinkButton>
          </section>
        </div>
      </section>
      <div className="inline-flex items-center gap-8">
        <span className="text-gray-500 text-center">© 2024 Tiendify. All rights reserved.</span>
        <span className="inline-flex items-center gap-3 px-4 py-2 bg-gray-200 rounded-lg">
          <IconPointFilled size={20} className="text-emerald-400" />
          All systems working
        </span>
      </div>
    </footer>
  );
};

type FooterLinkButton = {
  children: React.ReactNode;
  href: string;
  newTab?: boolean;
};

const FooterLinkButton = ({ children, href, newTab }: FooterLinkButton) => {
  return (
    <Link
      href={href}
      className="px-4 py-2 inline-flex gap-3 items-center rounded-lg hover:bg-primary-100 hover:text-primary transition-colors"
      target={newTab ? '_blank' : undefined}
    >
      {children}
    </Link>
  );
};

const MediaLinkButton = ({ children, href }: FooterLinkButton) => {
  return (
    <Link
      href={href}
      className="rounded-full p-3 flex items-center justify-center bg-gray-200 hover:bg-gray-300 transition-colors"
    >
      {children}
    </Link>
  );
};

export default Footer;
