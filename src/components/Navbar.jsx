"use client";
import Link from "next/link";
import { useCart } from "../app/context/CartContext";
import { ShoppingCart, User, Pizza, LogOut } from "lucide-react";
import { useSession, signOut } from "next-auth/react"; // 1. Add these imports

const Navbar = () => {
  const { cartCount } = useCart();
  const { data: session, status } = useSession(); // 2. Get session data

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

            {/* 3. Only show Admin link if user is an admin */}
            {session?.user?.role === "admin" && (
              <Link
                href="/admin/orders"
                className="text-orange-600 font-semibold bg-orange-50 px-3 py-1 rounded-full"
              >
                Admin
              </Link>
            )}
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

            {/* 4. Conditional Login/Logout Button */}
            {status === "authenticated" ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard"
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <User size={24} />
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
                  title="Sign Out"
                >
                  <LogOut size={22} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-orange-600 transition-all"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
