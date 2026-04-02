"use client";
import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ pizza }) {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart(pizza)}
      className="bg-orange-600 hover:bg-orange-700 text-white p-4 rounded-xl w-full flex justify-center gap-2"
    >
      <ShoppingCart size={20} /> Add to Order
    </button>
  );
}
