'use client';

import { ProductGrid } from '@/components/vendor/product-grid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Dummy data for hotel items
const hotelItemsProducts = [
  {
    id: '1',
    name: 'Tomato Ketchup',
    price: 65,
    image: 'https://images.pexels.com/photos/4113842/pexels-photo-4113842.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium tomato ketchup, perfect for restaurants',
    seller: { name: 'Sauce Supreme', username: 'saucesupreme' }
  },
  {
    id: '2',
    name: 'Soy Sauce',
    price: 85,
    image: 'https://images.pexels.com/photos/1907623/pexels-photo-1907623.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Authentic soy sauce for Asian cuisine',
    seller: { name: 'Asian Flavors', username: 'asianflavors' }
  },
  {
    id: '3',
    name: 'Mayonnaise',
    price: 95,
    image: 'https://images.pexels.com/photos/4113654/pexels-photo-4113654.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Creamy mayonnaise for sandwiches and salads',
    seller: { name: 'Condiment Corner', username: 'condimentcorner' }
  },
  {
    id: '4',
    name: 'White Vinegar',
    price: 55,
    image: 'https://images.pexels.com/photos/4113847/pexels-photo-4113847.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Pure white vinegar for cooking and cleaning',
    seller: { name: 'Pure Products', username: 'pureproducts' }
  },
  {
    id: '5',
    name: 'Olive Oil',
    price: 450,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=800',
    description: 'Extra virgin olive oil, perfect for cooking',
    seller: { name: 'Oil Oasis', username: 'oiloasis' }
  },
  {
    id: '6',
    name: 'Chili Sauce',
    price: 75,
    image: 'https://images.pexels.com/photos/4113848/pexels-photo-4113848.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Spicy chili sauce to add heat to dishes',
    seller: { name: 'Spice Station', username: 'spicestation' }
  }
];

export default function HotelItemsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-6">
          <Link href="/vendor">
            <Button variant="ghost" size="sm" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="text-4xl mr-3">🍯</span>
              Hotel Items
            </h1>
            <p className="mt-2 text-gray-600">Sauces, condiments, and restaurant supplies</p>
          </div>
        </div>

        <ProductGrid products={hotelItemsProducts} category="hotel-items" />
      </div>
    </div>
  );
}