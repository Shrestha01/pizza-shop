import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative h-[80vh] w-full overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: "url('/images/hero-pizza.jpg')" }}
      ></div>

      {/* Gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/40 to-transparent"></div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-2xl">
          <span className="inline-block bg-orange-600 text-white text-xs font-black uppercase tracking-[0.3em] px-4 py-1.5 rounded-full mb-6 animate-fade-in">
            Authentic Wood-Fired
          </span>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6">
            Happiness is a{" "}
            <span className="text-orange-500 underline decoration-wavy decoration-orange-500/30">
              Warm Box
            </span>{" "}
            of Pizza.
          </h1>

          <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-lg">
            Experience the perfect crunch of our 48-hour fermented sourdough
            crust, topped with the freshest local ingredients.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/customers/shop"
              className="group bg-orange-600 hover:bg-orange-500 text-white px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-orange-900/20 active:scale-95"
            >
              <ShoppingBag size={22} />
              Order Now
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              href="/orders"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all"
            >
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom decorative fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
    </div>
  );
};

export default Hero;
