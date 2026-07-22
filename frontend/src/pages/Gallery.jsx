import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, X, Youtube, Instagram, ExternalLink, ArrowRight } from "lucide-react";
import { GALLERY, YOUTUBE_CHANNEL, coverImage, parseVideo } from "../data/gallery";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "youtube", label: "YouTube" },
  { id: "instagram", label: "Instagram" }
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);

  // Resolve each pasted link once; drop anything we can't parse rather than
  // rendering a dead tile.
  const items = useMemo(
    () =>
      GALLERY.map((item, index) => {
        const video = parseVideo(item.url);
        return video ? { ...item, ...video, key: `${video.platform}-${video.id}-${index}` } : null;
      }).filter(Boolean),
    []
  );

  const platforms = new Set(items.map((i) => i.platform));
  const visible = filter === "all" ? items : items.filter((i) => i.platform === filter);
  // Vertical clips (Shorts, reels) tile tighter and taller than landscape ones
  const allPortrait = items.length > 0 && items.every((i) => i.portrait);

  // Close the lightbox on Escape and freeze background scroll while it's open
  useEffect(() => {
    if (!active) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [active]);

  return (
    <section data-testid="gallery-page" className="pt-40 pb-24 md:pb-32 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
          <div className="ds-eyebrow mb-3">Gallery</div>
          <h1 className="ds-h2">Our Work in Motion</h1>
          <p className="ds-lead mt-3">
            Installations, site visits and system walkthroughs — straight from our YouTube channel.
          </p>
        </motion.div>

        {platforms.size > 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex items-center justify-center gap-2 mb-10"
            data-testid="gallery-filters"
          >
            {FILTERS.filter((f) => f.id === "all" || platforms.has(f.id)).map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                data-testid={`gallery-filter-${f.id}`}
                className={`text-xs font-medium tracking-wide px-4 py-2 rounded-full border transition-colors ${
                  filter === f.id
                    ? "bg-[#0B0B0B] text-white border-[#0B0B0B]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-[#3BA7FF] hover:text-[#0B0B0B]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
        )}

        {items.length === 0 ? (
          <p className="text-center text-gray-400 font-light py-16" data-testid="gallery-empty">
            Videos are on the way — check back soon.
          </p>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className={`grid gap-4 sm:gap-5 md:gap-6 items-start ${
              allPortrait ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
            data-testid="gallery-grid"
          >
            {visible.map((item) => (
              <VideoTile key={item.key} item={item} onOpen={() => setActive(item)} />
            ))}
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {YOUTUBE_CHANNEL && (
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="gallery-channel-link"
              className="inline-flex items-center gap-2 text-sm text-[#0B0B0B] font-semibold tracking-wide border-b-2 border-gray-200 hover:border-[#3BA7FF] transition-all py-1"
            >
              Watch more on YouTube
              <ArrowRight className="w-4 h-4" />
            </a>
          )}
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 text-sm text-[#0B0B0B] font-semibold tracking-wide border-b-2 border-gray-200 hover:border-[#3BA7FF] transition-all py-1"
          >
            Get a free water analysis
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>{active && <Lightbox item={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}

function VideoTile({ item, onOpen }) {
  const cover = item.platform === "youtube" ? item.thumbnail : coverImage(item.cover);
  const PlatformIcon = item.platform === "youtube" ? Youtube : Instagram;

  return (
    <motion.button
      variants={fadeUp}
      onClick={onOpen}
      data-testid={`gallery-tile-${item.platform}`}
      aria-label={`Play ${item.title || "video"}`}
      className={`group relative text-left rounded-2xl overflow-hidden bg-[#0B0B0B] focus:outline-none focus:ring-2 focus:ring-[#3BA7FF] focus:ring-offset-2 ${
        item.portrait ? "aspect-[9/16]" : "aspect-video"
      }`}
    >
      {cover ? (
        <img
          src={cover}
          alt={item.title || ""}
          loading="lazy"
          // Shorts stills occasionally 404 at the portrait size — fall back to the 16:9 one
          onError={(e) => {
            if (item.fallbackThumbnail && e.currentTarget.src !== item.fallbackThumbnail) {
              e.currentTarget.src = item.fallbackThumbnail;
            }
          }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        // No cover supplied — a branded panel still reads as a deliberate tile
        <div className="absolute inset-0 bg-gradient-to-br from-[#3BA7FF] via-[#1E7FD6] to-[#0B0B0B]" />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

      <span className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white">
        <PlatformIcon className="w-4 h-4" />
      </span>

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:bg-white">
          <Play className="w-5 h-5 ml-0.5 fill-current text-[#0B0B0B]" />
        </span>
      </span>

      <span className="absolute inset-x-0 bottom-0 p-4 sm:p-5 space-y-1">
        {item.title && (
          <span className="block font-geist text-sm sm:text-base font-semibold text-white leading-snug">
            {item.title}
          </span>
        )}
        {item.caption && (
          <span className="block text-[11px] sm:text-xs font-light text-white/70 tracking-wide">{item.caption}</span>
        )}
      </span>
    </motion.button>
  );
}

function Lightbox({ item, onClose }) {
  const isPortrait = item.portrait;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      data-testid="gallery-lightbox"
      className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={item.title || "Video"}
    >
      <button
        onClick={onClose}
        data-testid="gallery-lightbox-close"
        aria-label="Close video"
        className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#0B0B0B] transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="w-full flex flex-col items-center gap-4"
      >
        <div
          className={
            isPortrait
              ? "w-full max-w-[min(92vw,420px)] h-[min(78vh,740px)] rounded-2xl overflow-hidden bg-black"
              : "w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black"
          }
        >
          <iframe
            src={item.embedUrl}
            title={item.title || `${item.platform} video`}
            className="w-full h-full"
            frameBorder="0"
            scrolling="no"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        <a
          href={item.watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
        >
          Open on {item.platform === "youtube" ? "YouTube" : "Instagram"}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </motion.div>
    </motion.div>
  );
}
