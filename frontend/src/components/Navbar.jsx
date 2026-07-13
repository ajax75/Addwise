import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/#areas", label: "Areas We Serve" },
  { to: "/#contact", label: "Contact" }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-white/85 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "py-7 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" data-testid="navbar-logo" className="flex items-center gap-2.5">
            <img
              src={`${process.env.PUBLIC_URL}/assets/logo.png`}
              alt="Crystal Blue Water Solution"
              className="h-10 sm:h-11 w-auto object-contain"
            />
            <span className="flex flex-col leading-none">
              <span className="font-geist text-lg font-semibold tracking-tight text-[#0B0B0B]">
                Crystal <span className="font-light text-gray-500">Blue</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em] font-medium text-[#3BA7FF] mt-1">
                Water Solution
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.to} className="text-gray-600 hover:text-[#0B0B0B] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/#contact"
              data-testid="navbar-cta"
              className="text-xs bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] hover:text-white transition-luxury px-5 py-2.5 rounded-full font-medium"
            >
              Get Free Water Analysis
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="mobile-menu-toggle"
            className="md:hidden p-2 rounded-full border border-gray-100 bg-white shadow-sm flex items-center justify-center w-11 h-11 text-gray-800 hover:bg-gray-50 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          data-testid="mobile-menu-overlay"
          className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 flex flex-col justify-between pt-32 pb-12 px-8 animate-fade-in md:hidden"
        >
          <div className="flex flex-col gap-6 text-3xl font-geist font-light tracking-tight">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="hover:text-[#3BA7FF] transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            to="/#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full text-center bg-[#0B0B0B] text-white text-sm font-medium py-4 rounded-full hover:bg-[#3BA7FF] transition-all"
          >
            Get Free Water Analysis
          </Link>
        </div>
      )}
    </>
  );
}
