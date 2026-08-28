import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowRight, Check, Droplet, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import { systemTypes } from "../data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

/* Gap between one section photo advancing and the next one advancing — same
   staggered rotation the Home page product tiles use. With 4 sections in the
   rotation each one changes every TILE_ROTATE_MS x 4. */
const TILE_ROTATE_MS = 2200;

/* Full-page detail view (replaces the gallery grid) — image gallery + brief description + info. */
function SystemDetailView({ sys, onBack }) {
  const [index, setIndex] = useState(0);
  const gallery = sys.gallery && sys.gallery.length ? sys.gallery : [sys.image];
  const go = (dir) => setIndex((i) => (i + dir + gallery.length) % gallery.length);

  // Restart the gallery at the first image whenever the system changes
  useEffect(() => {
    setIndex(0);
  }, [sys.id]);

  // Auto-advance the gallery; the timer resets whenever the visible image changes
  // (so manual navigation gives a fresh interval). Skipped when there's one image.
  useEffect(() => {
    if (gallery.length <= 1) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % gallery.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [index, gallery.length]);

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
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={gallery[index]}
                alt={`${sys.title} — image ${index + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full object-contain"
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
        <div className="space-y-8">
          <div>
            <div className="ds-eyebrow mb-2">Overview</div>
            <h1 className="font-geist text-3xl sm:text-4xl font-light tracking-tight text-[#0B0B0B] mb-3">{sys.title}</h1>
            <p className="ds-body">{sys.intro}</p>
          </div>

          {sys.features && (
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-3">Features</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {sys.features.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600 font-light">
                    <Check className="w-4 h-4 text-[#3BA7FF] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {sys.products && (
            <div>
              <div className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-4">
                {sys.products.length > 1 ? `Products in this range (${sys.products.length})` : "Product"}
              </div>
              <div className="space-y-3">
                {sys.products.map((prod, i) => (
                  <div
                    key={prod.name}
                    className="border border-gray-200 rounded-xl p-5 bg-[#F9FAFB] hover:border-[#3BA7FF]/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 w-7 h-7 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[11px] font-mono text-[#3BA7FF]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <h3 className="font-geist text-base font-semibold text-[#0B0B0B] leading-snug">{prod.name}</h3>
                        {prod.tagline && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-[#3BA7FF] mt-1">
                            <Droplet className="w-3.5 h-3.5 fill-current shrink-0" />
                            {prod.tagline}
                          </div>
                        )}
                        <p className="text-sm text-gray-600 font-light leading-relaxed mt-2">{prod.description}</p>
                        {prod.tech && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {prod.tech.map((t) => (
                              <span
                                key={t}
                                className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-700 bg-white border border-gray-200 px-2.5 py-1 rounded-full"
                              >
                                <Layers className="w-3 h-3 text-[#3BA7FF]" />
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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

          {/* Jumps to the Home contact form and leaves the system name behind so the
              message field arrives prefilled (picked up in Home's pendingInquiry effect). */}
          <Link
            to="/#contact"
            data-testid={`system-enquire-${sys.id}`}
            className="btn-primary"
            onClick={() =>
              sessionStorage.setItem(
                "pendingInquiry",
                `I'd like to enquire about the ${sys.title} system.`
              )
            }
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

  /* Section photos cycle through their own folder gallery, one section at a
     time: section 1 changes, then section 2, and back around. Sections with a
     single photo are skipped so they never sit idle in the rotation. */
  const [tileFrames, setTileFrames] = useState(() => systemTypes.map(() => 0));

  useEffect(() => {
    if (activeId) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rotatable = systemTypes
      .map((sys, i) => ((sys.gallery?.length || 0) > 1 ? i : -1))
      .filter((i) => i !== -1);
    if (!rotatable.length) return;

    let turn = 0;
    const id = setInterval(() => {
      const tile = rotatable[turn % rotatable.length];
      turn += 1;
      setTileFrames((prev) => {
        const next = [...prev];
        next[tile] = (next[tile] + 1) % systemTypes[tile].gallery.length;
        return next;
      });
    }, TILE_ROTATE_MS);

    return () => clearInterval(id);
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

            {/* Editorial listing — image and copy alternate sides down the page */}
            <div className="divide-y divide-gray-100">
              {systemTypes.map((sys, index) => {
                const imageRight = index % 2 === 0;
                const items = sys.products || [];
                const highlights = items.slice(0, 4);
                const remaining = items.length - highlights.length;
                const open = () => navigate(`/products#${sys.id}`);

                return (
                  <motion.article
                    key={sys.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={fadeUp}
                    className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-16 py-14 md:py-20 first:pt-0"
                  >
                    {/* Photo */}
                    <button
                      onClick={open}
                      tabIndex={-1}
                      aria-hidden="true"
                      className={`group relative lg:col-span-7 overflow-hidden rounded-2xl border border-gray-200 bg-[#F9FAFB] ${
                        imageRight ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="aspect-[4/3] sm:aspect-[16/10]">
                        {(sys.gallery?.length ? sys.gallery : [sys.image]).map((src, frame) => (
                          <img
                            key={frame}
                            src={src}
                            alt=""
                            className={`absolute inset-0 w-full h-full object-cover transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.04] ${
                              frame === tileFrames[index] ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="absolute top-5 left-5 inline-flex items-center rounded-full bg-white/85 backdrop-blur-md border border-white/60 px-3 py-1.5 text-[11px] font-mono uppercase tracking-widest text-[#0B0B0B]">
                        {sys.badge}
                      </span>
                    </button>

                    {/* Copy */}
                    <div className={`lg:col-span-5 ${imageRight ? "lg:order-1" : "lg:order-2"}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-mono tracking-widest text-gray-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-6 bg-gray-200" />
                        <span className="ds-eyebrow">{sys.category}</span>
                      </div>

                      <h2 className="ds-h3">{sys.title}</h2>
                      <p className="ds-body mt-4">{sys.summary}</p>

                      {highlights.length > 0 && (
                        <ul className="mt-6 space-y-2.5">
                          {highlights.map((prod) => (
                            <li key={prod.name} className="flex items-start gap-2.5 text-sm font-light text-gray-600">
                              <Check className="w-4 h-4 text-[#3BA7FF] shrink-0 mt-1" />
                              {prod.name}
                            </li>
                          ))}
                          {remaining > 0 && (
                            <li className="ds-small pl-[26px]">+{remaining} more in this range</li>
                          )}
                        </ul>
                      )}

                      <button
                        onClick={open}
                        data-testid={`system-tile-${sys.id}`}
                        className="group inline-flex items-center gap-2 mt-8 pb-1 text-sm font-semibold tracking-wide text-[#0B0B0B] border-b-2 border-gray-200 hover:border-[#3BA7FF] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3BA7FF] focus-visible:ring-offset-4 rounded-sm"
                      >
                        View gallery &amp; details
                        <ArrowRight className="w-4 h-4 text-[#3BA7FF] transition-transform duration-300 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
