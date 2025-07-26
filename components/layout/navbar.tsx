'use client';

import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Leaf, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { data: session } = useSession();

  const getDashboardLink = () => {
    if (!session) return '/';
    
    switch (session.user.role) {
      case 'admin':
        return '/admin';
      case 'vendor':
        return '/vendor';
      case 'seller':
        return '/seller';
      default:
        return '/';
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="font-bold text-xl text-gray-900">FreshMarket</span>
          </Link>

          <div className="flex items-center space-x-4">
            <LanguageToggle />
            
            {session ? (
              <div className="flex items-center space-x-4">
                <Link href={getDashboardLink()}>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{session.user.name}</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-green-600 hover:bg-green-700">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}