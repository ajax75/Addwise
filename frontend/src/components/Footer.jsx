import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
        <div className="flex items-center gap-2.5">
          <img
            src="/assets/logo.png"
            alt="Crystal Blue Water Solution"
            className="h-9 w-auto object-contain"
          />
          <span className="flex flex-col leading-none">
            <span className="font-geist text-base font-semibold tracking-tight text-[#0B0B0B]">
              Crystal <span className="font-light text-gray-500">Blue</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.22em] font-medium text-[#3BA7FF] mt-0.5">
              Water Solution
            </span>
          </span>
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
