"use client";
import { ShoppingCart, Flame, Leaf } from "lucide-react";
import Link from "next/link"; // <--- 1. Import the Link component

const PizzaCard = ({ pizza }) => {
  // Destructure 'id' so we can use it in the URL
  const { id, name, description, base_price, category, image_url } = pizza;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col h-full">
      {/* 2. Wrap the Image in a Link to /shop/[id] */}
      <Link
        href={`/customers/shop/${id}`}
        className="relative h-48 w-full bg-gray-100 overflow-hidden block"
      >
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">
            No Image
          </div>
        )}

        <div className="absolute top-3 right-3">
          {category === "Spicy" && (
            <span className="flex items-center gap-1 bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              <Flame size={12} /> Spicy
            </span>
          )}
          {category === "Veg" && (
            <span className="flex items-center gap-1 bg-green-100 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              <Leaf size={12} /> Veg
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          {/* 3. Wrap the Title in a Link as well */}
          <Link href={`/customers/shop/${id}`}>
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-orange-600 transition-colors cursor-pointer">
              {name}
            </h3>
          </Link>
          <span className="text-orange-600 font-bold text-lg">
            ${parseFloat(base_price).toFixed(2)}
          </span>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
          {description}
        </p>

        <button
          className="w-full bg-gray-900 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
          onClick={(e) => {
            e.stopPropagation(); // Prevents clicking the button from triggering the Link
            console.log(`Added ${name} to cart`);
          }}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default PizzaCard;
