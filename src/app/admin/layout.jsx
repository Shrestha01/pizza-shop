import Link from "next/link";
import { LayoutDashboard, Pizza, ClipboardList, LogOut } from "lucide-react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-10">
          <Pizza className="text-orange-500" />
          <span className="font-bold text-xl uppercase tracking-widest">
            Admin
          </span>
        </div>

        <nav className="space-y-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl transition-colors"
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-3 p-3 bg-orange-600 rounded-xl"
          >
            <ClipboardList size={20} /> Live Orders
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded-xl pt-10 text-gray-400"
          >
            <LogOut size={20} /> Exit Admin
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
