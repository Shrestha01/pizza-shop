"use client";
import { X, Pizza, PackageCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { getOrderItems, updateOrderStatus } from "@/app/actions/order";

export default function OrderModal({ order, onClose, onUpdate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadItems() {
      const res = await getOrderItems(order.id);
      if (res.success) setItems(res.items);
      setLoading(false);
    }
    loadItems();
  }, [order.id]);

  const handleStatusChange = async (newStatus) => {
    const res = await updateOrderStatus(order.id, newStatus);
    if (res.success) {
      onUpdate(); // Refresh the list in the parent
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-xl font-black text-gray-900">
              Order #{order.id}
            </h2>
            <p className="text-sm text-gray-500">{order.customer_name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-10">
              <Pizza className="animate-spin text-orange-500" />
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100"
                >
                  <img
                    src={item.image_url}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-grow">
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">
                      {item.size} x {item.quantity}
                    </p>
                  </div>
                  <p className="font-black text-orange-600">
                    $
                    {parseFloat(item.price_at_purchase * item.quantity).toFixed(
                      2,
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t bg-gray-50 grid grid-cols-2 gap-4">
          <button
            onClick={() => handleStatusChange("Delivered")}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all"
          >
            <PackageCheck size={18} /> Mark Delivered
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
