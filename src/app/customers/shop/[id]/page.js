import { query } from "@/lib/db";
import { ChevronLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";
import AddToCartButton from "@/components/pizza/AddToCartButton";

export default async function PizzaDetailPage({ params }) {
  // 1. Get the ID from the URL
  const resolvedParams = await params;
  const id = resolvedParams.id;
  console.log("Searching for Pizza ID:", id); // Check your VS Code terminal

  // 2. Fetch the specific pizza
  const result = await query("SELECT * FROM pizzas WHERE id = $1", [id]);
  const pizza = result.rows[0]; // Get the first item from the array

  // 3. If no pizza is found, don't show a blank page—show a message!
  if (!pizza) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-gray-800">Pizza not found!</h1>
        <Link href="/shop" className="text-orange-600 underline mt-4 block">
          Return to Menu
        </Link>
      </div>
    );
  }

  // 4. If pizza exists, show the UI
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/customers/shop"
        className="flex items-center gap-2 text-gray-500 hover:text-orange-600 mb-8 transition-colors"
      >
        <ChevronLeft size={20} /> Back to Menu
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="bg-gray-100 rounded-3xl overflow-hidden aspect-square flex items-center justify-center">
          {pizza.image_url ? (
            <img
              src={pizza.image_url}
              alt={pizza.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 font-bold uppercase tracking-widest">
              No Image
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div>
          <span className="text-orange-600 font-bold text-sm uppercase">
            {pizza.category}
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">
            {pizza.name}
          </h1>
          <p className="text-2xl font-bold text-gray-900 mt-4">
            ${parseFloat(pizza.base_price).toFixed(2)}
          </p>
          <p className="text-gray-600 mt-6 leading-relaxed">
            {pizza.description}
          </p>

          <button className="w-full mt-10 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3">
            <ShoppingCart size={20} /> Add to Order
          </button>
          <AddToCartButton pizza={pizza} />
        </div>
      </div>
    </div>
  );
}
