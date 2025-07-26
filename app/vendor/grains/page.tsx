'use client';

import { ProductGrid } from '@/components/vendor/product-grid';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Dummy data for grains
const grainsProducts = [
  {
    id: '1',
    name: 'Premium Basmati Rice',
    price: 120,
    image: 'https://images.pexels.com/photos/33783/rice-grains-white-long-grain-rice.jpg?auto=compress&cs=tinysrgb&w=800',
    description: 'High-quality aged basmati rice with excellent aroma',
    seller: { name: 'Raj Traders', username: 'rajtraders' }
  },
  {
    id: '2',
    name: 'Organic Wheat Flour',
    price: 45,
    image: 'https://images.pexels.com/photos/298022/pexels-photo-298022.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Stone-ground organic wheat flour, perfect for chapatis',
    seller: { name: 'Green Grains', username: 'greengrains' }
  },
  {
    id: '3',
    name: 'Red Kidney Beans',
    price: 180,
    image: 'https://images.pexels.com/photos/4916142/pexels-photo-4916142.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium quality rajma beans, rich in protein',
    seller: { name: 'Pulse Palace', username: 'pulsepalace' }
  },
  {
    id: '4',
    name: 'Yellow Split Lentils',
    price: 95,
    image: 'https://images.pexels.com/photos/8843971/pexels-photo-8843971.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Fresh yellow moong dal, easy to cook and digest',
    seller: { name: 'Dal Depot', username: 'daldepot' }
  },
  {
    id: '5',
    name: 'Brown Rice',
    price: 85,
    image: 'https://images.pexels.com/photos/4040702/pexels-photo-4040702.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Nutritious brown rice with natural fiber',
    seller: { name: 'Health Harvest', username: 'healthharvest' }
  },
  {
    id: '6',
    name: 'Chickpeas',
    price: 110,
    image: 'https://images.pexels.com/photos/4916251/pexels-photo-4916251.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium kabuli chana, perfect for curries',
    seller: { name: 'Legume Land', username: 'legumeland' }
  }
];

export default function GrainsPage() {
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
              <span className="text-4xl mr-3">🌾</span>
              Grains
            </h1>
            <p className="mt-2 text-gray-600">Premium quality grains, rice, and pulses</p>
          </div>
        </div>

        <ProductGrid products={grainsProducts} category="grains" />
      </div>
    </div>
  );
}