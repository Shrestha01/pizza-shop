import { CartProvider } from "./context/CartContext"; // Import it
import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import OfferBanner from "@/components/OfferBanner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          <OfferBanner />
          <main className="min-h-screen bg-gray-50">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
