'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import { Navbar } from '@/components/layout/navbar';
import { CartProvider } from '@/contexts/CartContext';
// import { CartProvider } from '@/contexts/CartContext';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <CartProvider>
          <Navbar />
          {children}
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}