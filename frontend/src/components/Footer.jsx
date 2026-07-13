import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle, Facebook, Instagram } from "lucide-react";
import { CONTACT } from "../data/contact";

export default function Footer() {
  const whatsappHref = `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

  return (
    <footer className="bg-white border-t border-gray-100 pt-14 pb-8 text-gray-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/assets/logo.png" alt="Crystal Blue Water Solution" className="h-9 w-auto object-contain" />
              <span className="flex flex-col leading-none">
                <span className="font-geist text-base font-semibold tracking-tight text-[#0B0B0B]">
                  Crystal <span className="font-light text-gray-500">Blue</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.22em] font-medium text-[#3BA7FF] mt-0.5">
                  Water Solution
                </span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              Clean, safe, and reliable water treatment solutions for homes, businesses, and industries across Kannur
              and North Kerala.
            </p>
            <div className="flex items-center gap-3">
              {CONTACT.social?.facebook && (
                <a
                  href={CONTACT.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Crystal Blue on Facebook"
                  className="w-9 h-9 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center text-[#3BA7FF] hover:bg-[#3BA7FF] hover:text-white hover:border-[#3BA7FF] transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {CONTACT.social?.instagram && (
                <a
                  href={CONTACT.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Crystal Blue on Instagram"
                  className="w-9 h-9 rounded-full border border-blue-100 bg-blue-50 flex items-center justify-center text-[#3BA7FF] hover:bg-[#3BA7FF] hover:text-white hover:border-[#3BA7FF] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">Get in Touch</div>
            <div className="flex flex-col gap-2.5 text-sm">
              {CONTACT.phones.map((p) => (
                <a
                  key={p.href}
                  href={`tel:${p.href}`}
                  className="inline-flex items-center gap-2.5 hover:text-[#0B0B0B] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#3BA7FF] shrink-0" />
                  {p.display}
                </a>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2.5 hover:text-[#0B0B0B] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-[#3BA7FF] shrink-0" />
                {CONTACT.email}
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-3 md:text-right">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">Explore</div>
            <div className="flex flex-col gap-2 text-sm md:items-end">
              <Link to="/about" className="hover:text-[#0B0B0B] transition-colors">About</Link>
              <Link to="/products" className="hover:text-[#0B0B0B] transition-colors">Products</Link>
              <Link to="/#areas" className="hover:text-[#0B0B0B] transition-colors">Areas We Serve</Link>
              <Link to="/#contact" className="hover:text-[#0B0B0B] transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6 text-xs text-gray-400 text-center">
          © {new Date().getFullYear()} Crystal Blue Water Solution. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
