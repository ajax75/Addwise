import React from "react";
import { Link } from "react-router-dom";
import { Droplet } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#0B0B0B] flex items-center justify-center text-white">
            <Droplet className="w-3 h-3 text-[#3BA7FF] fill-current" />
          </div>
          <span className="font-geist font-semibold text-[#0B0B0B]">CRYSTAL BLUE</span>
        </div>

        <div className="flex items-center gap-6 text-xs">
          <Link to="/about" className="hover:text-[#0B0B0B] transition-colors">About</Link>
          <Link to="/products" className="hover:text-[#0B0B0B] transition-colors">Products</Link>
          <Link to="/#areas" className="hover:text-[#0B0B0B] transition-colors">Areas We Serve</Link>
          <Link to="/#contact" className="hover:text-[#0B0B0B] transition-colors">Contact</Link>
        </div>

        <div className="text-xs text-gray-400">
          © {new Date().getFullYear()} Crystal Blue Water Solution. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
