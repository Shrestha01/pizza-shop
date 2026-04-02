"use client";
import { useCart } from "@/app/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const subtotal = cart.reduce(
    (acc, item) => acc + item.base_price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingBag className="mx-auto text-orange-600 mb-6" size={40} />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link
          href="/shop"
          className="bg-gray-900 text-white px-8 py-4 rounded-2xl"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-10">Your Order</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.size}`}
              className="flex items-center gap-4 bg-white p-4 rounded-3xl border"
            >
              <img
                src={item.image_url}
                alt={item.name}
                className="w-20 h-20 rounded-2xl object-cover"
              />
              <div className="flex-grow">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-gray-400 text-sm">Size: {item.size}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.size, -1)}
                    className="p-2 border rounded-lg"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold px-2">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.size, 1)}
                    className="p-2 border rounded-lg"
                  >
                    <Plus size={16} />
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-red-500 ml-4"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p className="font-black text-lg">
                ${(item.base_price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border h-fit">
          <h2 className="text-xl font-bold mb-6">Summary</h2>
          <div className="flex justify-between font-bold text-xl pb-4 border-b">
            <span>Total</span>
            <span className="text-orange-600">${subtotal.toFixed(2)}</span>
          </div>
          <Link href="/customers/checkout">
            <button className="w-full bg-gray-900 text-white py-4 rounded-2xl mt-6 font-bold">
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
