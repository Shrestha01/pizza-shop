import { CartProvider } from "./context/CartContext";
import { SessionProvider } from "next-auth/react"; // 1. Import SessionProvider
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import OfferBanner from "@/components/OfferBanner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* 2. Wrap everything in SessionProvider */}
        <SessionProvider>
          <CartProvider>
            <Navbar />
            <OfferBanner />
            <main className="min-h-screen bg-gray-50">{children}</main>
            <Footer />
          </CartProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
