import { query } from "@/lib/db_temp";
import PizzaCard from "@/components/pizza/PizzaCard";
import { db } from "@/lib/db";

export default async function ShopPage() {
  //1. Fetch all available pizzas from your database
  const result = await query(
    "SELECT * FROM pizzas WHERE is_available = TRUE ORDER BY id ASC",
  );
  const pizzas = result.rows;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
          Our Pizza Menu
        </h1>
        <p className="text-lg text-gray-600">
          Freshly made, stone-baked pizzas delivered to your door.
        </p>
      </div>

      {/* The Menu Grid */}
      {pizzas.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {pizzas.map((pizza) => (
            // Pass each pizza from the database into your PizzaCard component
            <PizzaCard key={pizza.id} pizza={pizza} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium italic">
            The oven is warming up... check back soon for our delicious menu!
          </p>
        </div>
      )}
    </div>
  );
}
