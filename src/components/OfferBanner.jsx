import { Tag, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const OfferBanner = () => {
  return (
    <div className="bg-orange-600 overflow-hidden py-4 border-y border-orange-500 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: The Deal */}
        <div className="flex items-center gap-4 text-white">
          <div className="bg-white/20 p-2 rounded-lg animate-pulse">
            <Tag size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-black uppercase tracking-tighter text-xl flex items-center gap-2">
              Friday Feast Special{" "}
              <Sparkles size={18} className="text-yellow-300 fill-yellow-300" />
            </h3>
            <p className="text-orange-100 text-xs font-bold uppercase tracking-widest">
              Buy 2 Large Pizzas, Get 1 Margherita{" "}
              <span className="underline decoration-wavy">FREE</span>!
            </p>
          </div>
        </div>

        {/* Right Side: Action */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-2 text-orange-200 text-[10px] font-black uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
            Limited Time Only
          </div>

          <Link
            href="/shop"
            className="bg-slate-950 text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-white hover:text-orange-600 transition-all active:scale-95 group"
          >
            Claim Offer
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;
