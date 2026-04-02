"use client";
import Link from "next/link";
import { useCart } from "../app/context/CartContext";
import { ShoppingCart, User, Pizza } from "lucide-react";

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Pizza
              className="text-orange-500 group-hover:rotate-12 transition-transform"
              size={32}
            />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              SliceDash
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link
              href="/customers/shop"
              className="hover:text-orange-500 transition-colors"
            >
              Menu
            </Link>
            <Link
              href="/orders"
              className="hover:text-orange-500 transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/dashboard"
              className="text-orange-600 font-semibold bg-orange-50 px-3 py-1 rounded-full"
            >
              Admin
            </Link>
          </div>

          {/* Icons & Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/customers/cart"
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 bg-orange-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white">
                {cartCount}
              </span>
            </Link>

            <Link
              href="/login"
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-all"
            >
              <User size={24} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
