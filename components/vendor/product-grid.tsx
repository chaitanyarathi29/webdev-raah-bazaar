'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MessageCircle, ShoppingCart, Search, MoreVertical } from 'lucide-react';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import socket from '@/utils/socketClient';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  seller: {
    name: string;
    username: string;
  };
}

interface ProductGridProps {
  products: Product[];
  category: string;
}

export function ProductGrid({ products, category }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const { addToCart } = useCart();
  const [chatProduct, setChatProduct] = useState<Product | null>(null);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    const sorted = [...filteredProducts].sort((a, b) => {
      switch (value) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    setFilteredProducts(sorted);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={sortBy} onValueChange={handleSort}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name (A-Z)</SelectItem>
            <SelectItem value="price-low">Price (Low to High)</SelectItem>
            <SelectItem value="price-high">Price (High to Low)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="p-0">
              <div className="relative h-48 w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-lg mb-2">{product.name}</CardTitle>
              <p className="text-gray-600 text-sm mb-3">{product.description}</p>
              <p className="text-sm text-gray-500 mb-3">
                Seller: {product.seller.name} (@{product.seller.username})
              </p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ₹{product.price}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setChatProduct(product)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>  

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria.</p>
        </div>
      )}

      {/* ChatBox Modal */}
      {chatProduct && (
        <ChatBox
          product={chatProduct}
          onClose={() => setChatProduct(null)}
        />
      )}
    </div>
  );
}

// ChatBox is a self-contained chat UI.
// Place this at the bottom of the same file, or import from a separate module!
function ChatBox({ product, onClose }: { product: Product; onClose: () => void }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Receive messages
  useEffect(() => {
    const handleMessage = (msg: string) => {
      setMessages((prev) => [...prev, { id: crypto.randomUUID(), text: msg }]);
    };
    socket.on('chat-message', handleMessage);
    return () => {
      socket.off('chat-message', handleMessage);
    };
  }, []);

  // Scroll to bottom on message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (input.trim()) {
      socket.emit('chat-message', input.trim());
      setInput('');
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-md bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col h-[440px]">
      {/* Header with seller, dropdown, close */}
      <div className="flex justify-between items-center p-3 border-b rounded-t-lg">
        <span className="font-semibold text-base flex-1 truncate">
          Chat with {product.seller.name} (@{product.seller.username})
        </span>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={clearChat}>
                Clear Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close chat"
            className="text-gray-500 hover:text-red-600 text-2xl font-bold leading-none"
          >
            &times;
          </Button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.length === 0 && (
          <p className="text-gray-400 italic text-center">No messages yet</p>
        )}
        {messages.map((msg) => (
          <div key={msg.id} className="bg-gray-100 px-4 py-2 rounded max-w-[80%] break-words">
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/* Input */}
      <form
        onSubmit={e => { e.preventDefault(); sendMessage(); }}
        className="flex p-3 border-t gap-2"
      >
        <Input
          type="text"
          placeholder={`Message @${product.seller.username}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
          autoFocus
          className="flex-1"
        />
        <Button type="submit" disabled={!input.trim()}>
          Send
        </Button>
      </form>
    </div>
  );
}
