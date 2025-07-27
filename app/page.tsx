'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, ShoppingCart, Store, Users } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      switch (session.user.role) {
        case 'admin':
          router.push('/admin');
          break;
        case 'vendor':
          router.push('/vendor');
          break;
        case 'seller':
          router.push('/seller');
          break;
      }
    }
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Leaf className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
              Welcome to <span className="text-green-600">Raah-Bazaar</span>
            </h1>
            <div>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Connect vendors and sellers in a seamless marketplace for fresh produce and food items. 
              Real-time chat, secure payments, and multilingual support.
            </p>
            </div>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link href="/auth/signup">
                  <Button className="w-full bg-green-600 hover:bg-green-700 px-8 py-3 text-base font-medium">
                    Get Started
                  </Button>
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link href="/auth/signin">
                  <Button variant="outline" className="w-full px-8 py-3 text-base font-medium">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Choose Your Role
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Different roles for different needs - Admin, Vendor, or Seller
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>
                  Manage the entire platform, verify users, and oversee all transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• View all products and sellers</li>
                  <li>• Remove unverified users</li>
                  <li>• Platform analytics</li>
                  <li>• User management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <ShoppingCart className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle>Vendor Portal</CardTitle>
                <CardDescription>
                  Browse products, chat with sellers, and make purchases
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Browse product categories</li>
                  <li>• Chat with sellers for pricing</li>
                  <li>• Secure payments via Razorpay</li>
                  <li>• Order tracking</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <Store className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Seller Dashboard</CardTitle>
                <CardDescription>
                  List your products and connect with potential buyers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Create and manage products</li>
                  <li>• Chat with interested vendors</li>
                  <li>• FSSAI verification</li>
                  <li>• Sales analytics</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Categories Preview */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Product Categories
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Fresh produce and food items across multiple categories
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🌾</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Grains</h3>
              <p className="mt-2 text-gray-600">Wheat, rice, pulses, and more</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🥬</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Vegetables</h3>
              <p className="mt-2 text-gray-600">Fresh vegetables and greens</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🍯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Hotel Items</h3>
              <p className="mt-2 text-gray-600">Sauces, condiments, and more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}