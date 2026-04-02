import Link from "next/link";
import { Pizza, MapPin, Phone, Mail, Clock } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2 text-white group">
            <Pizza
              className="text-orange-600 group-hover:rotate-12 transition-transform"
              size={32}
            />
            <span className="font-black text-2xl tracking-tighter uppercase">
              SliceDash
            </span>
          </Link>
          <p className="text-sm leading-relaxed">
            Crafting the perfect sourdough pizza since 2024. Fresh ingredients,
            stone-baked tradition, and delivered hot to your doorstep.
          </p>
          {/* Social Icons using react-icons/fa */}
          <div className="flex gap-5">
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <FaInstagram size={22} />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <FaFacebook size={22} />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <FaTwitter size={22} />
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">
              <FaYoutube size={22} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Explore
          </h4>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              <Link
                href="/shop"
                className="hover:text-orange-500 transition-colors"
              >
                Full Menu
              </Link>
            </li>
            <li>
              <Link
                href="/shop"
                className="hover:text-orange-500 transition-colors"
              >
                Best Sellers
              </Link>
            </li>
            <li>
              <Link
                href="/checkout"
                className="hover:text-orange-500 transition-colors"
              >
                Checkout
              </Link>
            </li>
            <li>
              <Link
                href="/admin/orders"
                className="hover:text-orange-500 transition-colors text-slate-600"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Get in Touch
          </h4>
          <ul className="space-y-5 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-orange-600 shrink-0" />
              <span>
                123 Pizza Street, <br />
                Foodville, FL 30210
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-orange-600 shrink-0" />
              <span>+1 (555) 000-PIZZA</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-orange-600 shrink-0" />
              <span>hello@slicedash.com</span>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Kitchen Hours
          </h4>
          <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <Clock size={12} /> Mon - Thu
              </span>
              <span className="text-white font-bold">11am - 10pm</span>
            </div>
            <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
              <span className="flex items-center gap-2">
                <Clock size={12} /> Fri - Sat
              </span>
              <span className="text-orange-500 font-bold">11am - 12am</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="flex items-center gap-2">
                <Clock size={12} /> Sunday
              </span>
              <span className="text-white font-bold">12pm - 9pm</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
        <p>© 2024 SLICEDASH PIZZA. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
