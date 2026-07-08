import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  Droplet,
  Sparkles,
  Shield,
  Cpu,
  Building,
  ArrowRight,
  Check,
  Star,
  Factory,
  Layers,
  Recycle,
  Gauge,
  Settings2,
  ShieldCheck,
  Wrench,
  LifeBuoy,
  Leaf,
  TrendingUp,
  Tag,
  MapPin,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { products } from "../data/products";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  // Contact form (frontend-only)
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactProperty, setContactProperty] = useState("Villa");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSelectedSolutions, setContactSelectedSolutions] = useState([]);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Scroll to in-page section when arriving via a hash link (e.g. from Navbar/Footer or /about)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
      return () => clearTimeout(t);
    }
  }, [location]);

  // Pick up a prefilled inquiry message left by the Products page's "Enquire Now" button
  useEffect(() => {
    const pending = sessionStorage.getItem("pendingInquiry");
    if (pending) {
      setContactMessage(pending);
      sessionStorage.removeItem("pendingInquiry");
    }
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setIsContactSubmitting(true);
    setTimeout(() => {
      setContactSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
      setContactSelectedSolutions([]);
      setIsContactSubmitting(false);
    }, 700);
  };

  const toggleContactSolution = (solution) => {
    setContactSelectedSolutions((prev) =>
      prev.includes(solution)
        ? prev.filter((s) => s !== solution)
        : [...prev, solution]
    );
  };

  const goToProducts = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  const scrollCarousel = (direction) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  // Trust indicators shown under the hero CTAs
  const trustIndicators = [
    "Residential Solutions",
    "Commercial Water Treatment",
    "Industrial Plants",
    "Professional Installation",
    "Reliable Service Support"
  ];

  // Solutions Overview — five core offerings, each linking deeper into the page
  const solutionsOverview = [
    {
      id: "domestic",
      title: "Domestic Water Purifiers",
      desc: "Compact RO, UV, and UF purifiers engineered for kitchens and everyday drinking water in modern homes.",
      icon: Droplet,
      image: "https://images.unsplash.com/photo-1659346435902-9bd10146b5d9?auto=compress&cs=tinysrgb&w=800",
      action: () => goToProducts("Home Purifiers")
    },
    {
      id: "whole-house",
      title: "Whole House Water Filtration",
      desc: "Point-of-entry systems that deliver chemical, sediment, and micro-plastic-free water to every outlet in the property.",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1614966700929-84a11654eb8c?auto=compress&cs=tinysrgb&w=800",
      action: () => goToProducts("Whole House Systems")
    },
    {
      id: "commercial",
      title: "Commercial Water Treatment",
      desc: "High-capacity systems tailored for hotels, hospitals, offices, and other commercial complexes.",
      icon: Building,
      image: "https://images.unsplash.com/photo-1748256086767-8974ee677f77?auto=compress&cs=tinysrgb&w=800",
      action: () => goToProducts("Commercial Systems")
    },
    {
      id: "industrial",
      title: "Industrial Water Treatment Plants",
      desc: "Modular RO, softening, and recycling plants built for manufacturing and processing facilities at scale.",
      icon: Factory,
      image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=compress&cs=tinysrgb&w=800",
      action: () => {
        const el = document.getElementById("industrial");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
    {
      id: "borewell",
      title: "Borewell Water Treatment",
      desc: "Engineered specifically for iron, odor, turbidity, and heavy contamination common in groundwater sources.",
      icon: Cpu,
      image: "https://images.unsplash.com/photo-1748347568194-c8cd8edd27da?auto=compress&cs=tinysrgb&w=800",
      action: () => goToProducts("Iron Removal Systems")
    }
  ];

  // Why Choose Crystal Blue
  const whyChooseUs = [
    { title: "Customized Water Solutions", desc: "Every system is designed around your exact water profile.", icon: Settings2 },
    { title: "Advanced Purification Technology", desc: "Multi-stage RO, UV, and UF engineering built in.", icon: Cpu },
    { title: "Premium Quality Components", desc: "Marine-grade materials chosen for longevity.", icon: ShieldCheck },
    { title: "Expert Installation", desc: "Certified technicians handle every deployment.", icon: Wrench },
    { title: "Reliable After-Sales Support", desc: "Ongoing maintenance and rapid response service.", icon: LifeBuoy },
    { title: "Eco-Friendly Systems", desc: "Low-waste designs that conserve water and energy.", icon: Leaf },
    { title: "Long-Term Performance", desc: "Engineered for consistent output, year after year.", icon: TrendingUp },
    { title: "Affordable Pricing", desc: "Transparent quotes with no hidden costs.", icon: Tag }
  ];

  // Water Solutions List (detailed feature chips, shown lower on the page)
  const solutions = [
    {
      id: "whole-house",
      title: "Whole House Filtration Matrix",
      desc: "Comprehensive protection for your entire home. Delivers chemical, sediment, and micro-plastic-free water to every single outlet.",
      icon: Shield,
      features: ["Chlorine neutralization", "Sub-micron filtering", "Dual sediment screens", "Carbon block cores"]
    },
    {
      id: "borewell",
      title: "Borewell Treatment Module",
      desc: "Engineered specifically to solve heavy contamination, iron, odor, and turbidity issues common in deep well and groundwater sources.",
      icon: Cpu,
      features: ["Catalytic iron reduction", "High-capacity filtration", "Odor removal matrix", "Silt & sand trap"]
    },
    {
      id: "water-softener",
      title: "Dual-Core Smart Softeners",
      desc: "Smart regeneration systems that prevent luxury bathroom scaling, soothe sensitive dry skin, and eliminate hair fall.",
      icon: Droplet,
      features: ["Smart flow regeneration", "Premium resin matrices", "Scale defense shield", "Minimal salt usage"]
    },
    {
      id: "commercial",
      title: "Commercial Water Complexes",
      desc: "High-capacity systems tailored for premium hotels, modern hospitals, luxury offices, and industrial complexes.",
      icon: Building,
      features: ["Continuous high-flow", "Full-spectrum monitoring", "Ultrafiltration modules", "Redundant pumps"]
    }
  ];

  // Industries list
  const industries = [
    { name: "Luxury Villas", image: "https://images.pexels.com/photos/29334668/pexels-photo-29334668.png?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940", tag: "Residential" },
    { name: "High-End Apartments", image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=compress&cs=tinysrgb&w=800", tag: "Residential" },
    { name: "Premium Hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=compress&cs=tinysrgb&w=800", tag: "Hospitality" },
    { name: "Surgical Hospitals", image: "https://images.unsplash.com/photo-1586773860418-d3b3de97e663?auto=compress&cs=tinysrgb&w=800", tag: "Healthcare" },
    { name: "Industrial Plants", image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=compress&cs=tinysrgb&w=800", tag: "Manufacturing" },
    { name: "Corporate Headquarters", image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=compress&cs=tinysrgb&w=800", tag: "Commercial" }
  ];

  // Industrial Water Treatment — core capabilities
  const industrialCapabilities = [
    {
      id: "ro-systems",
      title: "High-Capacity RO Systems",
      desc: "Commercial reverse osmosis plants built for food & beverage processing, pharmaceuticals, and manufacturing. Multi-stage membrane arrays, automated pressure management, and high-efficiency pumps handle heavy daily throughput.",
      icon: Layers
    },
    {
      id: "media-filtration",
      title: "Media Filtration & Softening Plants",
      desc: "Large-scale sand filters, activated carbon filters, and water softening plants remove sediment, chlorine, organic compounds, and hardness — essential pre-treatment that prevents scale and corrosion in boilers, cooling towers, and high-pressure machinery.",
      icon: Settings2
    },
    {
      id: "iron-manganese",
      title: "Iron & Manganese Removal Plants",
      desc: "Engineered for facilities relying on deep-well water, using high-capacity oxidation and specialized media to prevent staining and damage to industrial pipelines and process equipment.",
      icon: Gauge
    },
    {
      id: "zld-recycle",
      title: "Zero Liquid Discharge (ZLD) & Recycle Systems",
      desc: "Advanced water recovery systems treat process water for reuse within the facility, lowering utility costs and minimizing environmental footprint — sustainability as a core requirement, not an afterthought.",
      icon: Recycle
    }
  ];

  // Why partner with Crystal Blue on industrial deployments
  const industrialWhy = [
    {
      title: "Modular Scalability",
      desc: "Built on a modular architecture, so your treatment capacity can grow alongside your business without a total infrastructure overhaul.",
      icon: Factory
    },
    {
      title: "Smart-Automated Operations",
      desc: "Integrated PLC/SCADA control panels give real-time monitoring of water quality, flow rates, and filter health — alerting your team before issues cause downtime.",
      icon: Cpu
    },
    {
      title: "Built for Durability",
      desc: "Surgical-grade stainless steel and heavy-duty components built to withstand the rigors of 24/7 industrial environments.",
      icon: ShieldCheck
    },
    {
      title: "Comprehensive Lifecycle Support",
      desc: "From initial water quality analysis through installation, commissioning, and ongoing preventative maintenance contracts, we're your long-term partner in water management.",
      icon: Check
    }
  ];

  // Process Steps
  const processSteps = [
    { step: "01", title: "Water Chemistry Analysis", desc: "We pull a live sample and run a full lab analysis covering TDS, hardness, heavy metals, pH, and bacterial colonies." },
    { step: "02", title: "Bespoke System Modeling", desc: "Our water engineers architect a customized multi-stage filtration matrix matching your property footprint and exact water profile." },
    { step: "03", title: "Precision Commissioning", desc: "White-glove certified technicians install your custom filtration machinery, integrating seamlessly with your premium plumbing." },
    { step: "04", title: "Automated Maintenance & Support", desc: "Embedded IoT sensors monitor flow rates, cartridge life, and water quality 24/7, prompting proactive filter replacements." }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "Crystal Blue water is a revelation. Our luxury villa's custom marble bathrooms have absolutely zero scale buildup, and our hair feels incredibly soft. It's the Apple of water purification.",
      author: "Elena Rostova",
      role: "Luxury Villa Owner, Beverly Hills",
      rating: 5
    },
    {
      quote: "In a premium resort, water quality is everything. The CommercialTower system has saved us thousands in maintaining high-end espresso machines, laundry linens, and central geysers.",
      author: "Marcus Van der Bilt",
      role: "Operations Director, Lumina Resorts",
      rating: 5
    },
    {
      quote: "Our borewell water was practically undrinkable before Crystal Blue's Borewell Pro. Installation was seamless and the after-sales team has been responsive every time we've called.",
      author: "Anjali Menon",
      role: "Homeowner, Kannur",
      rating: 5
    }
  ];

  // Areas served across North Kerala
  const areasServed = ["Kannur", "Taliparamba", "Payyanur", "Thalassery", "Mattannur", "Koothuparamba", "Iritty", "Panoor"];

  // Scroll-reveal animation variants (used with whileInView across sections)
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
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-gradient-to-b from-[#F9FAFB] to-white">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1528481711262-175bb7079126"
            alt="Fluid water surface"
            className="w-full h-full object-cover scale-105 filter blur-[2px] transition-transform duration-1000 animate-water-flow"
          />
        </div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-100/30 blur-[130px] z-0 animate-pulse-glow" />

        <motion.div
          className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50/50 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono text-blue-600 tracking-wide uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            The Apple of Water Purification
          </motion.div>

          <motion.h1
            variants={fadeUp}
            data-testid="hero-heading"
            className="font-geist text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.05] text-[#0B0B0B] mb-8"
          >
            Pure Water. <span className="font-semibold block sm:inline">Better Living.</span>
            <br />
            Trusted Solutions for <span className="italic block sm:inline">Every Home & Business.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="max-w-2xl mx-auto text-base sm:text-xl font-light text-gray-500 leading-relaxed mb-12">
            Crystal Blue Water Solution provides premium residential, commercial, and industrial water filtration systems across Kannur and Kerala — customized water treatment for clean, safe, and reliable water.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="#contact"
              data-testid="hero-cta-analysis"
              className="w-full sm:w-auto bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury shadow-lg shadow-black/5 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Get Free Water Analysis
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#solutions"
              data-testid="hero-cta-solutions"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 hover:border-[#0B0B0B] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury active:scale-[0.98] flex items-center justify-center"
            >
              Explore Solutions
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mt-12 text-xs uppercase tracking-wider text-gray-400">
            {trustIndicators.map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#3BA7FF]" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 mt-8 border-t border-gray-100 max-w-4xl mx-auto text-left">
            <div>
              <div className="text-3xl font-geist font-light text-[#0B0B0B]">0.01μ</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Filtration Precision</div>
            </div>
            <div>
              <div className="text-3xl font-geist font-light text-[#0B0B0B]">99.9%</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Contaminant Removal</div>
            </div>
            <div>
              <div className="text-3xl font-geist font-light text-[#0B0B0B]">IoT</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Smart Active Shield</div>
            </div>
            <div>
              <div className="text-3xl font-geist font-light text-[#0B0B0B]">24/7</div>
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Support</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Solutions Overview */}
      <section id="solutions" data-testid="solutions-section" className="py-24 md:py-32 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Our Solutions</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Water Treatment for Every Need
            </h2>
            <p className="text-gray-500 font-light mt-3">
              From a single kitchen tap to an entire industrial plant, every Crystal Blue system is engineered around your water.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {solutionsOverview.map((sol) => {
              const IconComp = sol.icon;
              return (
                <motion.div
                  key={sol.id}
                  variants={fadeUp}
                  data-testid={`solution-overview-${sol.id}`}
                  className="bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-2xl overflow-hidden transition-luxury hover:-translate-y-2 hover:shadow-xl group flex flex-col"
                >
                  <div className="relative h-44 overflow-hidden bg-gray-50">
                    <img
                      src={sol.image}
                      alt={sol.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#0B0B0B] shadow-sm">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-1 space-y-4">
                    <h3 className="font-geist text-xl font-medium tracking-tight text-[#0B0B0B]">{sol.title}</h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed flex-1">{sol.desc}</p>
                    <button
                      onClick={sol.action}
                      data-testid={`solution-learn-more-${sol.id}`}
                      className="inline-flex items-center gap-2 text-sm text-[#0B0B0B] font-semibold tracking-wide border-b-2 border-gray-200 group-hover:border-[#3BA7FF] transition-all py-1 self-start"
                    >
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Crystal Blue */}
      <section className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Why Crystal Blue</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Why Choose Crystal Blue
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseUs.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  data-testid={`why-choose-${idx}`}
                  className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-full border border-gray-200 bg-[#F9FAFB] flex items-center justify-center mx-auto text-[#0B0B0B]">
                    <IconComp className="w-5 h-5 text-[#3BA7FF]" />
                  </div>
                  <h4 className="font-geist text-sm sm:text-base font-medium text-[#0B0B0B]">{item.title}</h4>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Detailed Water Solutions Grid Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-16"
          >
            <div className="max-w-2xl space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">The Portfolio</div>
              <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
                Intelligent Filtration Solutions
              </h2>
              <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
                Whether hard water softeners for apartments, high-flow pre-filters for villas, or redundant systems for hospitals—every platform is custom-made.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm text-[#0B0B0B] font-semibold tracking-wide border-b-2 border-gray-200 hover:border-[#3BA7FF] transition-all py-1 mt-6 md:mt-0"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {solutions.map((sol) => {
              const IconComp = sol.icon;
              return (
                <motion.div
                  key={sol.id}
                  variants={fadeUp}
                  data-testid={`solution-card-${sol.id}`}
                  className="bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-2xl p-8 space-y-6 transition-luxury hover:-translate-y-2 hover:shadow-xl group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full border border-gray-200 bg-[#F9FAFB] flex items-center justify-center text-[#0B0B0B] group-hover:text-[#3BA7FF] group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-geist text-2xl font-medium tracking-tight text-[#0B0B0B]">
                      {sol.title}
                    </h3>
                    <p className="text-gray-500 text-sm font-light leading-relaxed">
                      {sol.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                    {sol.features.map((feat, idx) => (
                      <span key={idx} className="bg-[#F9FAFB] border border-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {feat}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Product Carousel — full gallery lives on the dedicated Products page */}
      <section id="products" data-testid="products-section" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col md:flex-row md:items-end justify-between mb-14"
          >
            <div className="max-w-2xl space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">Product Catalog</div>
              <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
                The Purifier Lineup
              </h2>
              <p className="text-gray-500 font-light mt-1">
                From compact under-counter RO units to whole-house and industrial systems—choose the engineered purifier built for your water.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 mt-6 md:mt-0">
              <button
                onClick={() => scrollCarousel(-1)}
                aria-label="Scroll products left"
                className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-[#0B0B0B] hover:text-[#0B0B0B] transition-luxury"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollCarousel(1)}
                aria-label="Scroll products right"
                className="w-11 h-11 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-600 hover:border-[#0B0B0B] hover:text-[#0B0B0B] transition-luxury"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            ref={carouselRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 pb-4"
          >
            {products.map((prod) => (
              <motion.div
                key={prod.id}
                variants={fadeUp}
                data-testid={`product-card-${prod.id}`}
                className="snap-start shrink-0 w-[85%] sm:w-[60%] lg:w-[31%] bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden flex flex-col transition-luxury hover:-translate-y-2 hover:shadow-xl group"
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
                  <p className="text-gray-500 text-sm font-light leading-relaxed mb-6 flex-1">
                    {prod.desc}
                  </p>

                  <Link
                    to={`/products#${prod.id}`}
                    data-testid={`product-view-${prod.id}`}
                    className="mt-auto inline-flex items-center justify-center gap-2 bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-6 py-3 rounded-full text-xs font-medium tracking-wide transition-luxury"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="flex justify-center mt-4">
            <Link
              to="/products"
              data-testid="view-all-products"
              className="inline-flex items-center gap-2 text-sm text-[#0B0B0B] font-semibold tracking-wide border-b-2 border-gray-200 hover:border-[#3BA7FF] transition-all py-1"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industrial Water Treatment Plants */}
      <section id="industrial" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Industrial Division</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Powering Operational Excellence
            </h2>
            <p className="text-gray-500 font-light mt-3">
              We engineer industrial water treatment plants for high-capacity, high-performance, long-term reliability. Every plant is built around the specific water chemistry of the facility, whether raw borewell water, municipal supply, or process wastewater requiring recycling.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 mb-20"
          >
            {industrialCapabilities.map((cap) => {
              const IconComp = cap.icon;
              return (
                <motion.div
                  key={cap.id}
                  variants={fadeUp}
                  data-testid={`industrial-capability-${cap.id}`}
                  className="bg-white border border-[#E5E7EB] hover:border-gray-300 rounded-2xl p-8 space-y-4 transition-luxury hover:-translate-y-2 hover:shadow-xl group"
                >
                  <div className="w-12 h-12 rounded-full border border-gray-200 bg-[#F9FAFB] flex items-center justify-center text-[#0B0B0B] group-hover:text-[#3BA7FF] group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-geist text-xl font-medium tracking-tight text-[#0B0B0B]">{cap.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{cap.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <h3 className="font-geist text-2xl sm:text-3xl font-light tracking-tight text-[#0B0B0B]">
              Why Partner with Crystal Blue?
            </h3>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industrialWhy.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div key={idx} variants={fadeUp} data-testid={`industrial-why-${idx}`} className="bg-white border border-gray-100 rounded-2xl p-6 text-center space-y-3 shadow-sm">
                  <div className="w-10 h-10 rounded-full border border-gray-200 bg-[#F9FAFB] flex items-center justify-center mx-auto text-[#0B0B0B]">
                    <IconComp className="w-5 h-5 text-[#3BA7FF]" />
                  </div>
                  <h4 className="font-geist text-base font-medium text-[#0B0B0B]">{item.title}</h4>
                  <p className="text-gray-500 text-xs font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="flex justify-center mt-16">
            <a
              href="#contact"
              data-testid="industrial-cta-consult"
              onClick={() => setContactProperty("Industry")}
              className="inline-flex items-center gap-2 bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury"
            >
              Request an Industrial Water Assessment
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Industries Showcase */}
      <section className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Sectors We Serve</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Water for Every Setting
            </h2>
            <p className="text-gray-500 font-light mt-3">
              We design specialized filtration hardware serving sectors requiring zero mineral scale, chemical absolute purity, and ultra-high continuous flow.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {industries.map((ind, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                data-testid={`industry-item-${ind.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative h-[300px] rounded-2xl overflow-hidden group border border-gray-100 shadow-sm bg-white"
              >
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                  <img src={ind.image} alt={ind.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full self-start mb-2">
                    {ind.tag}
                  </span>
                  <h3 className="font-geist text-2xl font-light tracking-tight">{ind.name}</h3>
                  <p className="text-xs text-gray-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                    Continuous ultrafiltration custom configurations.
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Timeline Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Our Protocol</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              The Deployment Loop
            </h2>
            <p className="text-gray-500 font-light mt-3">
              We maintain absolute precision at every single gateway. Our professional flow guarantees custom molecular water profiles with zero friction.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative"
          >
            {processSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                data-testid={`process-step-${idx + 1}`}
                className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 relative shadow-sm"
              >
                <div className="text-4xl font-geist font-semibold text-blue-100">{step.step}</div>
                <h3 className="font-geist text-lg font-medium text-[#0B0B0B]">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials — minimal card slider */}
      <section className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-6 md:px-12 text-center mb-14"
        >
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">Testimonials</div>
          <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B] mt-3">
            Trusted by Homes & Businesses
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-6 px-6 md:px-12 pb-4"
        >
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              data-testid="testimonial-card"
              className="snap-center shrink-0 w-full sm:w-[85%] lg:w-[32%] bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-5"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                ))}
              </div>
              <p className="font-geist text-lg italic leading-relaxed text-[#0B0B0B] font-light">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <div className="text-sm font-semibold text-[#0B0B0B]">{t.author}</div>
                <div className="text-xs font-mono text-gray-400 uppercase mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Areas We Serve */}
      <section id="areas" data-testid="areas-section" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="lg:col-span-5 space-y-6"
            >
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">Coverage</div>
              <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
                Areas We Serve
              </h2>
              <p className="text-gray-500 font-light leading-relaxed">
                Crystal Blue Water Solution proudly serves residential, commercial, and industrial customers across Kannur and North Kerala, with dedicated installation and support teams based locally.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {areasServed.map((area) => (
                  <span
                    key={area}
                    data-testid={`area-chip-${area.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 bg-[#F9FAFB] border border-gray-100 text-gray-700 text-sm px-4 py-2 rounded-full"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#3BA7FF]" />
                    {area}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="lg:col-span-7"
            >
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-[380px] sm:h-[440px]">
                <iframe
                  title="Crystal Blue Water Solution — Service Area Map"
                  src="https://maps.google.com/maps?q=Kannur,Kerala,India&z=9&output=embed"
                  className="w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Request Form */}
      <section id="contact" data-testid="contact-section" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Inquire</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Get a Free Water Analysis
            </h2>
            <p className="text-gray-500 font-light mt-3">
              Tell us about your property and water needs. Our engineering desk will get back with a tailored recommendation.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-sm relative"
          >
            {contactSuccess ? (
              <div className="text-center py-12 space-y-6" data-testid="contact-success">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#3BA7FF] flex items-center justify-center mx-auto border border-blue-100">
                  <Check className="w-8 h-8 animate-pulse-glow" />
                </div>
                <h3 className="font-geist text-2xl sm:text-3xl font-light text-[#0B0B0B]">
                  Thank You — Request Received
                </h3>
                <p className="text-sm text-gray-500 font-light max-w-md mx-auto leading-relaxed">
                  Your consultation request has been captured. Our water analyst will reach out to you shortly.
                </p>
                <button
                  onClick={() => setContactSuccess(false)}
                  data-testid="contact-reset-button"
                  className="text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider hover:text-blue-500 underline"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form data-testid="contact-form" onSubmit={handleContactSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Full Name *</label>
                    <input
                      type="text"
                      required
                      data-testid="contact-name-input"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g., Alexander Mercer"
                      className="w-full bg-transparent border-b border-gray-200 hover:border-gray-400 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      data-testid="contact-email-input"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g., alex@example.com"
                      className="w-full bg-transparent border-b border-gray-200 hover:border-gray-400 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Phone Number</label>
                    <input
                      type="tel"
                      data-testid="contact-phone-input"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g., +91 98765 43210"
                      className="w-full bg-transparent border-b border-gray-200 hover:border-gray-400 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Property Category</label>
                    <select
                      data-testid="contact-property-select"
                      value={contactProperty}
                      onChange={(e) => setContactProperty(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-200 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none text-gray-600 transition-colors"
                    >
                      <option value="Villa">Villa / House</option>
                      <option value="Apartment">Apartment</option>
                      <option value="Commercial">Commercial Complex</option>
                      <option value="Hotel">Hotel</option>
                      <option value="Hospital">Medical Facility</option>
                      <option value="Industry">Industrial Plant</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs uppercase font-mono tracking-wider text-gray-400 block">Solutions Needed</label>
                  <div className="flex flex-wrap gap-2">
                    {["Whole House Filtration", "Borewell Treatment", "Water Softener", "Commercial System", "Custom Design"].map((solName) => (
                      <button
                        type="button"
                        key={solName}
                        data-testid={`contact-solution-checkbox-${solName.toLowerCase().replace(/\s+/g, "-")}`}
                        onClick={() => toggleContactSolution(solName)}
                        className={`px-3 py-1.5 border rounded-full text-xs font-medium transition-all ${
                          contactSelectedSolutions.includes(solName)
                            ? "border-blue-500 bg-blue-50 text-blue-600"
                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        {solName} {contactSelectedSolutions.includes(solName) && "✓"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Message / Inquiry Details *</label>
                  <textarea
                    required
                    data-testid="contact-message-textarea"
                    rows="3"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="e.g., Requesting a recommendation and quote for a 3-bedroom home."
                    className="w-full bg-transparent border-b border-gray-200 hover:border-gray-400 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    data-testid="contact-submit-button"
                    disabled={isContactSubmitting}
                    className="bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury flex items-center gap-2 disabled:opacity-50"
                  >
                    {isContactSubmitting ? (
                      <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Send Request
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
