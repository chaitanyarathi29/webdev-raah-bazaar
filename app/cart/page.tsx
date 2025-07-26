'use client';
import { useCart } from '@/contexts/CartContext';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛒 Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map((item, idx) => (
            <li key={idx} className="flex justify-between items-center border p-3 rounded-lg">
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">₹{item.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
