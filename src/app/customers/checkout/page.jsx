"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Truck, MapPin, User, Phone } from "lucide-react";
import { createOrder } from "@/app/actions/order";
import { useSession } from "next-auth/react";

import { useEffect } from "react";
export default function CheckoutPage() {
  const { cart, cartCount, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession(); // Get login status

  // 1. Protection: If not logged in, send to login page
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  const subtotal = cart.reduce(
    (acc, item) => acc + item.base_price * item.quantity,
    0,
  );

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare data for the database
    const formData = new FormData(e.target);
    const orderData = {
      customer_name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      items: cart,
      total: subtotal,
    };

    console.log("Saving Order:", orderData);
    // In the next step, we will create the API to save this to Postgres

    const result = await createOrder(orderData);
    if (result.success) {
      alert("Pizza is on the way! Order #" + result.orderId);
      clearCart(); // Wipe the cart after success
      router.push("/customers/shop");
    } else {
      alert("Error: " + result.error);
    }

    setLoading(false);
  };

  if (cart.length === 0) {
    router.push("/customers/shop");
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black mb-10 text-gray-900">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left: Delivery Form */}
        <form onSubmit={handleCheckout} className="space-y-6">
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Truck size={20} className="text-orange-600" /> Delivery Details
            </h2>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase ml-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-3.5 text-gray-300"
                  size={20}
                />
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase ml-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-3.5 text-gray-300"
                  size={20}
                />
                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="0412 345 678"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-400 uppercase ml-1">
                Delivery Address
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-3.5 text-gray-300"
                  size={20}
                />
                <textarea
                  required
                  name="address"
                  rows="3"
                  placeholder="123 Pizza St, Foodville"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-orange-500"
                ></textarea>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-3 disabled:bg-gray-400"
          >
            {loading ? (
              "Processing..."
            ) : (
              <>
                <CreditCard size={20} /> Place Order - ${subtotal.toFixed(2)}
              </>
            )}
          </button>
        </form>

        {/* Right: Order Summary */}
        <div className="bg-gray-50 p-8 rounded-[2rem] h-fit border border-gray-100">
          <h2 className="text-xl font-bold mb-6">
            Order Summary ({cartCount} items)
          </h2>
          <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
            {cart.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={item.image_url}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-black">
                      {item.size} x {item.quantity}
                    </p>
                  </div>
                </div>
                <p className="font-bold text-sm text-orange-600">
                  ${(item.base_price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between items-center font-black text-2xl">
            <span>Total</span>
            <span className="text-orange-600">${subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
