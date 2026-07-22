import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Gallery from "./pages/Gallery";

/* Branded full-screen loader shown on initial load, then fades out.
   Defined inline in this tracked file so it survives the repo auto-revert. */
function Loader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0B0B]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      data-testid="app-loader"
    >
      <div className="relative flex items-center justify-center">
        {/* Soft glow behind the logo */}
        <div className="absolute w-32 h-32 rounded-full bg-[#3BA7FF]/20 blur-3xl" />
        <motion.img
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="Crystal Blue Water Solutions"
          className="relative w-20 sm:w-24 h-auto object-contain"
          animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="mt-6 flex flex-col items-center leading-none">
        <span className="font-geist text-lg font-semibold tracking-tight text-white">
          Crystal <span className="font-light text-white/60">Blue</span>
        </span>
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium text-[#3BA7FF] mt-1.5">
          Water Solutions
        </span>
      </div>

      {/* Bouncing dots */}
      <div className="mt-8 flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#3BA7FF]"
            animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* On every navigation, start the new page at the top — unless the URL carries a
   hash (e.g. /#contact), in which case scroll that section into view instead. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // The target section may not be mounted yet (e.g. jumping to /#contact from
      // another route), so retry across a few frames before giving up.
      const id = hash.replace("#", "");
      let tries = 0;
      let raf;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "auto", block: "start" });
        } else if (tries++ < 10) {
          raf = requestAnimationFrame(tryScroll);
        }
      };
      raf = requestAnimationFrame(tryScroll);
      return () => cancelAnimationFrame(raf);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  // Keep the loader up until the page has loaded, with a short minimum so it never just flashes
  useEffect(() => {
    const start = Date.now();
    const finish = () => {
      const wait = Math.max(0, 1100 - (Date.now() - start));
      window.setTimeout(() => setLoading(false), wait);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish);
      return () => window.removeEventListener("load", finish);
    }
  }, []);

  // Prevent background scroll while the loader is visible
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  // Lenis smooth scroll — skipped for users who prefer reduced motion
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop />
      <AnimatePresence>{loading && <Loader />}</AnimatePresence>
      <div id="top" className="bg-white text-[#0B0B0B] font-inter antialiased min-h-screen relative selection:bg-blue-100 selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
