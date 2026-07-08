import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { products, productFilters } from "../data/products";

export default function Products() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const initialCategory = searchParams.get("category");
  const [productFilter, setProductFilter] = useState(
    initialCategory && productFilters.includes(initialCategory) ? initialCategory : "All"
  );

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [location]);

  const filteredProducts = productFilter === "All" ? products : products.filter((p) => p.category === productFilter);

  const handleEnquire = (prod) => {
    sessionStorage.setItem(
      "pendingInquiry",
      `I'm interested in the ${prod.name} (${prod.category}). Please share pricing and availability.`
    );
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="pt-40 pb-24 md:pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Product Catalog</div>
          <h1 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
            The Purifier Lineup
          </h1>
          <p className="text-gray-500 font-light mt-3">
            From compact under-counter RO units to whole-house and industrial systems—choose the engineered purifier built for your water.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {productFilters.map((cat) => (
            <button
              key={cat}
              onClick={() => setProductFilter(cat)}
              data-testid={`product-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide border transition-luxury ${
                productFilter === cat
                  ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((prod) => (
              <motion.div
                key={prod.id}
                layout
                id={prod.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                data-testid={`product-card-${prod.id}`}
                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col transition-luxury hover:-translate-y-2 hover:shadow-xl group scroll-mt-32"
              >
                <div className="relative h-56 overflow-hidden bg-gray-50">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-white bg-[#0B0B0B]/70 backdrop-blur-md px-3 py-1 rounded-full">
                    {prod.badge}
                  </span>
                </div>

                <div className="p-7 flex flex-col flex-1">
                  <div className="text-xs font-mono uppercase text-[#3BA7FF] tracking-wider mb-2">
                    {prod.category}
                  </div>
                  <h3 className="font-geist text-2xl font-medium tracking-tight text-[#0B0B0B] mb-3">
                    {prod.name}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-5">
                    {prod.desc}
                  </p>

                  <div className="space-y-2 mb-6">
                    {prod.specs.map((spec, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <Check className="w-4 h-4 text-[#3BA7FF] shrink-0" />
                        <span className="text-gray-700 font-light">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to="/#contact"
                    data-testid={`product-enquire-${prod.id}`}
                    onClick={() => handleEnquire(prod)}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-6 py-3 rounded-full text-xs font-medium tracking-wide transition-luxury"
                  >
                    Enquire Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
