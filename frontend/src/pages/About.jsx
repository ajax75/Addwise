import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  Building,
  Gem,
  ShieldCheck,
  Sparkles,
  Leaf,
  HeartHandshake,
  BadgeCheck,
  Wrench,
  Settings2,
  LifeBuoy,
  ArrowRight
} from "lucide-react";

export default function About() {
  const coreValues = [
    { title: "Quality", desc: "Premium components and rigorous testing behind every system we deploy.", icon: Gem },
    { title: "Integrity", desc: "Transparent recommendations based on your actual water profile, not upselling.", icon: ShieldCheck },
    { title: "Innovation", desc: "Continuously refining our filtration engineering with the latest technology.", icon: Sparkles },
    { title: "Sustainability", desc: "Low-waste, energy-conscious systems that respect the environment.", icon: Leaf },
    { title: "Customer Commitment", desc: "Long-term relationships built on responsive, dependable service.", icon: HeartHandshake },
    { title: "Reliability", desc: "Systems engineered to perform consistently, year after year.", icon: BadgeCheck }
  ];

  const trustHighlights = [
    { title: "Professional Installation", icon: Wrench },
    { title: "Customized Solutions", icon: Settings2 },
    { title: "Premium Components", icon: ShieldCheck },
    { title: "Reliable Support", icon: LifeBuoy }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } }
  };

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32 pb-20 bg-gradient-to-b from-[#F9FAFB] to-white">
        <motion.div
          className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-4">
            Our Story
          </motion.div>
          <motion.h1
            variants={fadeUp}
            data-testid="about-hero-heading"
            className="font-geist text-5xl sm:text-6xl lg:text-7xl font-light tracking-tighter leading-[1.05] text-[#0B0B0B] mb-6"
          >
            About Crystal Blue Water Solution
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-base sm:text-xl font-light text-gray-500 leading-relaxed">
            Engineering clean, safe, and reliable water for homes and businesses across Kannur and Kerala.
          </motion.p>
        </motion.div>
      </section>

      {/* Company Story */}
      <section data-testid="about-story-section" className="py-24 md:py-32 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-8"
            >
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">The Ethos</div>
              <h2 className="font-geist text-4xl sm:text-5xl tracking-tighter leading-none text-[#0B0B0B] font-light">
                Why compromise on the element that is <span className="font-semibold text-blue-500 underline decoration-blue-200 underline-offset-8">70% of you?</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
                Crystal Blue Water Solution is committed to providing clean and safe water through reliable filtration technology. We look at water treatment not as plumbing, but as essential modern infrastructure — for the home and for the business.
              </p>
              <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
                By fusing medical-grade ultrafiltration with custom-engineered ion exchange matrices and precise sediment separation, we ensure every customer drinks, bathes, and operates with water that meets the highest standard of purity.
              </p>

              <div className="pt-4 border-l-2 border-blue-500 pl-6 space-y-4">
                <p className="italic text-gray-700 font-light text-base sm:text-lg">
                  &ldquo;We designed Crystal Blue to feel completely invisible. No noise, no scaling, no chlorine taste—just pristine, reliable purity.&rdquo;
                </p>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                  — Lead Architect, Engineering division
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-6 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-3xl filter blur-2xl -z-10" />
              <img
                src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGdsYXNzJTIwZHJvcCUyMGNsZWFufGVufDB8fHx8MTc4MTg3NDQ1N3ww&ixlib=rb-4.1.0&q=85"
                alt="Clean glass of water"
                className="w-full rounded-2xl border border-gray-100 shadow-2xl object-cover h-[450px] sm:h-[550px]"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/75 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
                <div className="text-xs font-mono text-[#0B0B0B]">WATER INTELLIGENCE CORE</div>
                <div className="text-lg font-geist font-light mt-1">Real-time particle diagnostic & automatic ion regeneration.</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section data-testid="about-vision-section" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Our Vision</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Built for Homes. Built for Business.
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full border border-gray-200 bg-[#F9FAFB] flex items-center justify-center text-[#0B0B0B]">
                <HomeIcon className="w-6 h-6 text-[#3BA7FF]" />
              </div>
              <h3 className="font-geist text-xl font-medium text-[#0B0B0B]">For Homes</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Deliver clean, healthy, and safe water for every family.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white border border-gray-100 rounded-2xl p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full border border-gray-200 bg-[#F9FAFB] flex items-center justify-center text-[#0B0B0B]">
                <Building className="w-6 h-6 text-[#3BA7FF]" />
              </div>
              <h3 className="font-geist text-xl font-medium text-[#0B0B0B]">For Businesses</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Provide scalable and efficient water treatment systems that support operational excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section data-testid="about-mission-section" className="py-24 md:py-32 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-3xl mx-auto px-6 md:px-12 text-center space-y-6"
        >
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">Our Mission</div>
          <h2 className="font-geist text-3xl sm:text-4xl font-light tracking-tight text-[#0B0B0B] leading-snug">
            Deliver innovative, sustainable, and customized water treatment solutions while maintaining the highest standards of quality and customer satisfaction.
          </h2>
        </motion.div>
      </section>

      {/* Core Values */}
      <section data-testid="about-values-section" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">What We Stand For</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Core Values
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {coreValues.map((value, idx) => {
              const IconComp = value.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  data-testid={`core-value-${idx}`}
                  className="bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-2xl p-8 space-y-4 transition-luxury hover:-translate-y-2 hover:shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-[#F9FAFB] flex items-center justify-center text-[#0B0B0B] group-hover:text-[#3BA7FF] group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-geist text-xl font-medium tracking-tight text-[#0B0B0B]">{value.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Customers Trust Us */}
      <section data-testid="about-trust-section" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Track Record</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Why Customers Trust Us
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {trustHighlights.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div key={idx} variants={fadeUp} data-testid={`trust-highlight-${idx}`} className="bg-[#F9FAFB] border border-gray-100 rounded-2xl p-6 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center mx-auto text-[#0B0B0B]">
                    <IconComp className="w-5 h-5 text-[#3BA7FF]" />
                  </div>
                  <h4 className="font-geist text-sm sm:text-base font-medium text-[#0B0B0B]">{item.title}</h4>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex justify-center"
          >
            <Link
              to="/#contact"
              data-testid="about-cta-analysis"
              className="inline-flex items-center gap-2 bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury"
            >
              Get Free Water Analysis
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
