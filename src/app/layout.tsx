import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers/providers';
import NavBar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Tiendify',
  description: 'Turn your business dreams into an amazing reality!',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <NavBar />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
