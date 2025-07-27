'use client';

import { ProductGrid } from '@/components/vendor/product-grid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';

// 🟢 Dynamically import ChatBox to avoid SSR issues
const ChatBox = dynamic(() => import('@/components/ChatBox'), { ssr: false });

const vegetableProducts = [
  {
    id: '1',
    name: 'Fresh Tomatoes',
    price: 40,
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Farm-fresh red tomatoes, rich in vitamins',
    seller: { name: 'Fresh Farm', username: 'freshfarm' }
  },
  {
    id: '2',
    name: 'Organic Potatoes',
    price: 25,
    image: 'https://images.pexels.com/photos/2286972/pexels-photo-2286972.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Organic potatoes, perfect for all cooking needs',
    seller: { name: 'Organic Oasis', username: 'organicoasis' }
  },
  {
    id: '3',
    name: 'Red Onions',
    price: 30,
    image: 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh red onions with strong flavor',
    seller: { name: 'Veggie Ville', username: 'veggieville' }
  },
  {
    id: '4',
    name: 'Green Leafy Spinach',
    price: 20,
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh spinach leaves, rich in iron',
    seller: { name: 'Green Gardens', username: 'greengardens' }
  },
  {
    id: '5',
    name: 'Bell Peppers',
    price: 80,
    image: 'https://images.pexels.com/photos/1339862/pexels-photo-1339862.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Colorful bell peppers, sweet and crunchy',
    seller: { name: 'Color Crops', username: 'colorcrops' }
  },
  {
    id: '6',
    name: 'Fresh Carrots',
    price: 35,
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Orange carrots packed with beta-carotene',
    seller: { name: 'Root Realm', username: 'rootrealm' }
  }
];

export default function VegetablesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 relative">
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
              <span className="text-4xl mr-3">🥬</span>
              Vegetables
            </h1>
            <p className="mt-2 text-gray-600">Fresh and organic vegetables</p>
          </div>
        </div>

        <ProductGrid products={vegetableProducts} category="vegetables" />
      </div>

      {/* 🟢 Chat box floats in bottom right corner */}
      <div className="fixed bottom-5 right-5 z-50">
        <ChatBox />
      </div>
    </div>
  );
}
