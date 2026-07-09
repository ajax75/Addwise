import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { Settings2, Cpu, LifeBuoy, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const featureCards = [
  {
    title: "Customized Solutions",
    desc: "Every system is designed according to water quality, source, and customer requirements.",
    icon: Settings2
  },
  {
    title: "Advanced Technology",
    desc: "Modern filtration technologies including RO, UV, UF, Iron Removal, Water Softening, and Whole House Filtration.",
    icon: Cpu
  },
  {
    title: "Trusted Support",
    desc: "Professional installation, reliable maintenance, expert guidance, and long-term customer service.",
    icon: LifeBuoy
  }
];

const stats = [
  { value: 100, suffix: "%", label: "Customized Solutions" },
  { text: "Residential & Industrial", label: "Expertise" },
  { text: "Premium", label: "Quality Components" },
  { text: "Reliable", label: "After-Sales Support" }
];

/* Count-up that animates once the stat scrolls into view */
function CountUp({ end, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * end));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function About() {
  return (
    <>
      {/* Main About — two-column */}
      <section data-testid="about-intro-section" className="pt-40 pb-20 md:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — water-themed image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative order-1"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#3BA7FF]/15 to-transparent rounded-[2rem] blur-2xl -z-10" />
              <img
                src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?crop=entropy&cs=srgb&fm=jpg&w=1100&q=85"
                alt="Clean, pure water"
                className="w-full h-[360px] sm:h-[480px] object-cover rounded-3xl border border-gray-100 shadow-xl shadow-blue-500/5"
              />
              <div className="absolute bottom-5 left-5 right-5 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-lg">
                <div className="ds-eyebrow">Purity, Engineered</div>
                <div className="font-geist text-lg font-light text-[#0B0B0B] mt-1">
                  Custom water treatment for homes, businesses & industries.
                </div>
              </div>
            </motion.div>

            {/* Right — content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
              className="order-2 space-y-5"
            >
              <motion.div variants={fadeUp} className="ds-eyebrow">About Us</motion.div>
              <motion.h1 variants={fadeUp} data-testid="about-hero-heading" className="ds-h2">
                About Crystal Blue Water Solution
              </motion.h1>
              <motion.p variants={fadeUp} className="ds-lead">
                Delivering Safe, Pure, and Reliable Water Solutions for Homes, Businesses, and Industries.
              </motion.p>

              <motion.p variants={fadeUp} className="ds-body">
                At Crystal Blue Water Solution, we believe clean water is essential for healthy living and successful
                businesses. We specialize in advanced water purification and treatment systems designed to provide
                safe, high-quality water for residential, commercial, and industrial applications.
              </motion.p>
              <motion.p variants={fadeUp} className="ds-body">
                Every solution is customized based on the customer's water source and usage requirements, ensuring
                maximum efficiency, long-term reliability, and superior performance. From domestic drinking water
                purifiers to complete whole-house filtration systems and industrial water treatment plants, we deliver
                solutions that combine innovation, quality, and sustainability.
              </motion.p>
              <motion.p variants={fadeUp} className="ds-body">
                Our experienced team is committed to providing professional consultation, expert installation,
                dependable maintenance, and ongoing support, making us a trusted partner for all your water treatment
                needs.
              </motion.p>

              <motion.div variants={fadeUp} className="pt-2">
                <Link to="/#contact" data-testid="about-cta-analysis" className="btn-primary">
                  Get Free Water Analysis
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section data-testid="about-features-section" className="pb-24 md:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
          >
            {featureCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={card.title}
                  variants={fadeUp}
                  data-testid={`about-feature-${idx}`}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-8 space-y-4 shadow-sm transition-luxury hover:-translate-y-2 hover:shadow-xl hover:border-blue-100 group"
                >
                  <div className="w-14 h-14 rounded-2xl border border-gray-200 bg-[#F9FAFB] flex items-center justify-center text-[#0B0B0B] group-hover:text-[#3BA7FF] group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300">
                    <IconComp className="w-7 h-7" />
                  </div>
                  <h3 className="ds-h3 text-2xl">{card.title}</h3>
                  <p className="ds-body">{card.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section data-testid="about-stats-section" className="py-20 md:py-28 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={fadeUp} data-testid={`about-stat-${idx}`} className="space-y-2">
                <div className="font-geist text-3xl sm:text-4xl font-light text-[#0B0B0B]">
                  {stat.value != null ? <CountUp end={stat.value} suffix={stat.suffix} /> : stat.text}
                </div>
                <div className="text-xs sm:text-sm uppercase tracking-wider text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
