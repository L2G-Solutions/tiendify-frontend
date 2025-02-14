import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/providers';
import NavBar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Tiendify',
  description: 'Turn your business dreams into an amazing reality!',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

/**
 * Layout component for the entire application.
 *
 * - Sets global metadata for SEO.
 * - Applies the Inter font and global styles.
 * - Wraps the app with `Providers` to manage context and state.
 * - Includes `NavBar` and `Footer` for consistent navigation.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The main content of the page.
 *
 * @returns {JSX.Element} The root layout structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen overflow-x-hidden`}>
        <Providers>
          <NavBar />
          <main className="pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
