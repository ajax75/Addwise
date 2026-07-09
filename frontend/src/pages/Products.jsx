import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Check, AlertTriangle, Droplet, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { systemTypes } from "../data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

/* Full-page detail view (replaces the gallery grid) — image gallery + brief description + info. */
function SystemDetailView({ sys, onBack }) {
  const [index, setIndex] = useState(0);
  const gallery = sys.gallery && sys.gallery.length ? sys.gallery : [sys.image];
  const go = (dir) => setIndex((i) => (i + dir + gallery.length) % gallery.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <button
        onClick={onBack}
        data-testid="system-back"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#0B0B0B] transition-colors mb-8"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to all systems
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14">
        {/* Image gallery */}
        <div className="lg:sticky lg:top-28 self-start space-y-3">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={gallery[index]}
                alt={`${sys.title} — image ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-[#0B0B0B] transition-luxury"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white hover:text-[#0B0B0B] transition-luxury"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {gallery.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setIndex(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    i === index ? "border-[#3BA7FF]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-7">
          <div>
            <div className="ds-eyebrow mb-2">Overview</div>
            <h1 className="font-geist text-3xl sm:text-4xl font-light tracking-tight text-[#0B0B0B] mb-3">{sys.title}</h1>
            <p className="ds-body">{sys.intro}</p>
          </div>

          {sys.bestFor && (
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">Best For</div>
              <div className="flex flex-wrap gap-2">
                {sys.bestFor.map((item) => (
                  <span key={item} className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(sys.purpose || sys.description) && (
            <p className="text-sm text-gray-600 font-light leading-relaxed">{sys.purpose || sys.description}</p>
          )}

          {sys.howItWorks && (
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">How It Works</div>
              <div className="space-y-3">
                {sys.howItWorks.map((step) => (
                  <div key={step.name} className="flex gap-3">
                    <Droplet className="w-4 h-4 text-[#3BA7FF] fill-current shrink-0 mt-0.5" />
                    <p className="text-sm text-gray-600 font-light leading-relaxed">
                      <span className="font-semibold text-[#0B0B0B]">{step.name}:</span> {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sys.removes && (
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">Removes</div>
              <div className="flex flex-wrap gap-2">
                {sys.removes.map((item) => (
                  <span key={item} className="text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 px-3 py-1.5 rounded-full">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(sys.advantages || sys.benefits || sys.limitations) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(sys.advantages || sys.benefits) && (
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">
                    {sys.advantages ? "Advantages" : "Benefits"}
                  </div>
                  <ul className="space-y-2">
                    {(sys.advantages || sys.benefits).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 font-light">
                        <Check className="w-4 h-4 text-[#3BA7FF] shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {sys.limitations && (
                <div>
                  <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">Limitations</div>
                  <ul className="space-y-2">
                    {sys.limitations.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600 font-light">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {sys.combos && (
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">Common Combinations</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sys.combos.map((combo) => (
                  <div key={combo.name} className="border border-gray-200 rounded-xl p-4 bg-[#F9FAFB]">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Layers className="w-4 h-4 text-[#3BA7FF] shrink-0" />
                      <span className="font-geist text-sm font-semibold text-[#0B0B0B]">{combo.name}</span>
                    </div>
                    <div className="text-xs font-mono text-[#3BA7FF] leading-relaxed mb-1.5">{combo.tech}</div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{combo.note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sys.idealFor && (
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
              <Check className="w-4 h-4 text-[#3BA7FF] shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700 font-light">
                <span className="font-semibold text-[#0B0B0B]">Ideal for:</span> {sys.idealFor}
              </p>
            </div>
          )}

          <Link
            to="/#contact"
            data-testid={`system-enquire-${sys.id}`}
            className="btn-primary"
          >
            Enquire About This System
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const location = useLocation();
  const navigate = useNavigate();

  // The selected system is derived from the URL hash (/products#uv-uf) so Back / sharing work
  const activeId = location.hash ? location.hash.replace("#", "") : null;
  const active = systemTypes.find((s) => s.id === activeId) || null;

  // When switching to a detail view, start at the top of the page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [activeId]);

  return (
    <section className="pt-40 pb-24 md:pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {active ? (
          <SystemDetailView sys={active} onBack={() => navigate("/products")} />
        ) : (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-center max-w-2xl mx-auto mb-14"
            >
              <div className="ds-eyebrow mb-3">Our Systems</div>
              <h1 className="ds-h2">Water Purification Systems</h1>
              <p className="ds-lead mt-3">
                Every water source is different. Select a system to open its gallery and a brief guide to what it's
                best for, how it works, and its trade-offs.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {systemTypes.map((sys, index) => (
                <motion.button
                  key={sys.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={fadeUp}
                  onClick={() => navigate(`/products#${sys.id}`)}
                  data-testid={`system-tile-${sys.id}`}
                  className="group relative text-left rounded-2xl overflow-hidden aspect-[4/3] focus:outline-none focus:ring-2 focus:ring-[#3BA7FF] focus:ring-offset-2"
                >
                  <img
                    src={sys.image}
                    alt={sys.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10 group-hover:from-black/85 transition-colors" />
                  <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-geist text-lg font-medium text-white leading-tight">{sys.title}</h3>
                      <p className="text-xs text-white/70 font-light mt-1 line-clamp-2">{sys.summary}</p>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#3BA7FF] mt-3 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        View gallery & details
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
