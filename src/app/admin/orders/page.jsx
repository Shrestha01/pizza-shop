"use client";
import { useState, useEffect } from "react";
import { Clock, CheckCircle2, RefreshCw } from "lucide-react";
import OrderModal from "@/components/admin/OrderModal";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      const data = await res.json();

      // DEBUG: This will show in your Browser Console (F12)
      console.log("Frontend received data:", data);

      setOrders(data.orders || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-black">Live Orders</h1>
        <button
          onClick={loadOrders}
          className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border hover:bg-gray-50 transition-colors text-black"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      <div className="bg-white rounded-[2rem] border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-black uppercase">
                Customer
              </th>
              <th className="px-6 py-4 text-xs font-bold text-black uppercase">
                Total
              </th>
              <th className="px-6 py-4 text-xs font-bold text-black uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y text-black">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="hover:bg-orange-50 cursor-pointer transition-colors"
                >
                  <td className="px-6 py-4">
                    <p className="font-bold text-black">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-black">{order.phone}</p>
                  </td>
                  <td className="px-6 py-4 text-black">
                    ${parseFloat(order.total_amount).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-orange-100 text-orange-700 border border-orange-200"
                      }`}
                    >
                      {/* Visual dot indicator */}
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-600"
                            : "bg-orange-600"
                        }`}
                      ></span>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-20 text-gray-400">
                  {loading ? "Loading..." : "No orders found in database."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onUpdate={loadOrders}
        />
      )}
    </div>
  );
}
