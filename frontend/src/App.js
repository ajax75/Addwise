import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Droplet,
  Sparkles,
  Shield,
  Cpu,
  Home as HomeIcon,
  Building,
  Settings,
  Wrench,
  Clock,
  ArrowRight,
  Check,
  Menu,
  X,
  Sliders,
  FileText,
  ChevronRight,
  MessageSquare,
  Info,
  Star,
  HardDrive
} from "lucide-react";

// Read backend URL from environment
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8001";
const API_URL = `${BACKEND_URL}/api`;

export default function App() {
  // Navigation & Scroll states
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Active Interactive Technology Stage state
  const [activeTechStage, setActiveTechStage] = useState(0);

  // Contact Form states
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactProperty, setContactProperty] = useState("Villa");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSelectedSolutions, setContactSelectedSolutions] = useState([]);
  const [isContactSubmitting, setIsContactSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState(false);

  // Calculator / Water Lab states
  const [calcSource, setCalcSource] = useState("Borewell");
  const [calcTds, setCalcTds] = useState(650);
  const [calcHardness, setCalcHardness] = useState(350);
  const [calcSymptoms, setCalcSymptoms] = useState(["Scaling", "Hairfall"]);
  const [isCalcLoading, setIsCalcLoading] = useState(false);
  const [calcResult, setCalcResult] = useState(null);

  // Admin Inquiries Tracker states
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [inquiries, setInquiries] = useState([]);
  const [isLoadingInquiries, setIsLoadingInquiries] = useState(false);

  // Monitor scroll for nav shrink
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch inquiries for admin dashboard
  const fetchInquiries = async () => {
    setIsLoadingInquiries(true);
    try {
      const response = await axios.get(`${API_URL}/inquiries`);
      setInquiries(response.data);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
    } finally {
      setIsLoadingInquiries(false);
    }
  };

  // Toggle Admin panel & Fetch
  const toggleAdminPanel = () => {
    const nextState = !isAdminOpen;
    setIsAdminOpen(nextState);
    if (nextState) {
      fetchInquiries();
    }
  };

  // Update inquiry status
  const updateInquiryStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/inquiries/${id}/status`, { status: newStatus });
      // Update local state
      setInquiries((prev) =>
        prev.map((item) => {
          const itemId = item.id || item._id;
          return itemId === id ? { ...item, status: newStatus } : item;
        })
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Submit Contact Form
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setIsContactSubmitting(true);
    try {
      await axios.post(`${API_URL}/inquiries`, {
        name: contactName,
        email: contactEmail,
        phone: contactPhone,
        property_type: contactProperty,
        message: contactMessage,
        selected_solutions: contactSelectedSolutions
      });
      setContactSuccess(true);
      // Reset form
      setContactName("");
      setContactEmail("");
      setContactPhone("");
      setContactMessage("");
      setContactSelectedSolutions([]);
    } catch (error) {
      console.error("Inquiry submission failed:", error);
      alert("Something went wrong. Please check connection and try again.");
    } finally {
      setIsContactSubmitting(false);
    }
  };

  // Handle solution checkbox toggle
  const toggleContactSolution = (solution) => {
    setContactSelectedSolutions((prev) =>
      prev.includes(solution)
        ? prev.filter((s) => s !== solution)
        : [...prev, solution]
    );
  };

  // Run Water Quality Analysis
  const runWaterAnalysis = async () => {
    setIsCalcLoading(true);
    try {
      const response = await axios.post(`${API_URL}/analyze-water`, {
        water_source: calcSource,
        tds_level: calcTds,
        hardness_level: calcHardness,
        symptoms: calcSymptoms
      });
      setCalcResult(response.data);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze water data. Please verify backend connectivity.");
    } finally {
      setIsCalcLoading(false);
    }
  };

  // Run analysis on load once for premium feel placeholder
  useEffect(() => {
    runWaterAnalysis();
  }, []);

  // Toggle symptoms in calculator
  const toggleCalcSymptom = (symptom) => {
    setCalcSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  // Water Solutions List
  const solutions = [
    {
      id: "whole-house",
      title: "Whole House Filtration Matrix",
      desc: "Comprehensive protection for your entire home. Delivers chemical, sediment, and micro-plastic-free water to every single outlet.",
      icon: Shield,
      features: ["Chlorine neutralization", "Sub-micron absolute filtering", "Dual sediment screens", "Carbon block cores"]
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
      features: ["Intelligent flow regeneration", "Premium resin matrices", "Scale defense shield", "Minimal salt usage"]
    },
    {
      id: "commercial",
      title: "Commercial Water Complexes",
      desc: "High-capacity systems tailored for premium hotels, modern hospitals, luxury offices, and industrial complexes.",
      icon: Building,
      features: ["Continuous high-flow", "Full-spectrum monitoring", "Ultrafiltration modules", "Redundant pumps"]
    }
  ];

  // Tech stages
  const techStages = [
    {
      title: "Water Intake & Silt Separation",
      step: "STAGE 01",
      subtitle: "Absolute particle capture",
      desc: "Water enters through an automated high-velocity vortex separator that removes heavy silt, sand, and visible particulate matter down to 50 microns without water loss.",
      metric: "Efficiency: 99.8% Sediment Removal",
      icon: HardDrive
    },
    {
      title: "Catalytic Carbon & Chemical Neutralizer",
      step: "STAGE 02",
      subtitle: "Molecular absorption",
      desc: "Utilizes ultra-porous catalytic coconut shell activated carbon to neutralize chlorine, chloramines, VOCs, pesticides, and unpleasant odors in milliseconds.",
      metric: "Adsorption surface: 1,200 m²/g",
      icon: Sparkles
    },
    {
      title: "Precision Smart Ion Softener",
      step: "STAGE 03",
      subtitle: "Mineral restructuring",
      desc: "Advanced ion-exchange resin matrix exchanges harsh calcium and magnesium minerals for soft sodium ions under real-time micro-processor management.",
      metric: "Hardness reduction: down to 5 PPM",
      icon: Droplet
    },
    {
      title: "Medical-Grade Ultrafiltration Guard",
      step: "STAGE 04",
      subtitle: "Sub-micron safety barrier",
      desc: "A protective multi-bore ultrafiltration hollow fiber membrane prevents 99.99% of bacteria, cysts, and viruses from entering your premium domestic plumbing.",
      metric: "Filtration absolute size: 0.01 micron",
      icon: Shield
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

  // Featured Products
  const products = [
    {
      id: "series-x",
      name: "Crystal Blue Series X-90",
      category: "Whole Villa Master Matrix",
      desc: "Our flagship intelligent water purifier. Merges dual-resin smart softeners with ultra-filtration membranes in a unified monolithic mirror-finish chassis.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=compress&cs=tinysrgb&w=800",
      specs: ["Flow Rate: 4,500 L/hour", "Cabinet Material: Marine Stainless 316", "Regeneration: Automated IoT Driven", "Footprint: Compact 0.4 m²"]
    },
    {
      id: "softener-s",
      name: "Softener Series S-300",
      category: "High-End Ion-Exchange Softener",
      desc: "Designed for luxury apartments and villas. Fits into tight utility rooms while delivering continuous soft, silky water that keeps hair soft and glass spot-free.",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=compress&cs=tinysrgb&w=800",
      specs: ["Flow Rate: 2,800 L/hour", "Active resin volume: 28 Liters", "Control: Precision flow micro-processor", "Salt tank: Self-contained, dry-well design"]
    }
  ];

  // Process Steps
  const processSteps = [
    { step: "01", title: "Water Chemistry Analysis", desc: "We pull a live sample and run a full lab analysis covering TDS, hardness, heavy metals, pH, and bacterial colonies." },
    { step: "02", title: "Bespoke System Modeling", desc: "Our water engineers architect a customized multi-stage filtration matrix matching your property footprint and exact water profile." },
    { step: "03", title: "Precision Commissioning", desc: "White-glove certified technicians install your custom filtration machinery, integrating seamlessly with your premium plumbing." },
    { step: "04", title: "Automated Maintenance & Support", desc: "Embedded IoT sensors monitor flow rates, cartridge life, and water quality 24/7, prompting automated proactive filter replacements." }
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
      quote: "In a premium resort, water quality is everything. The Series X-90 system has saved us thousands in maintaining high-end espresso machines, laundry linens, and central geysers.",
      author: "Marcus Van der Bilt",
      role: "Operations Director, Lumina Resorts",
      rating: 5
    }
  ];

  return (
    <div className="bg-white text-[#0B0B0B] font-inter antialiased min-h-screen relative selection:bg-blue-100 selection:text-black">
      
      {/* 1. Header/Navigation */}
      <nav
        data-testid="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-white/85 backdrop-blur-xl border-b border-gray-100 shadow-sm"
            : "py-7 bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            data-testid="navbar-logo"
            className="flex items-center gap-2 text-xl font-geist font-semibold tracking-tight text-[#0B0B0B]"
          >
            <div className="w-8 h-8 rounded-full bg-[#0B0B0B] flex items-center justify-center text-white">
              <Droplet className="w-4.5 h-4.5 text-[#3BA7FF] fill-current animate-pulse-glow" />
            </div>
            <span>CRYSTAL <span className="font-light text-gray-500">BLUE</span></span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#about" className="text-gray-600 hover:text-[#0B0B0B] transition-colors">About</a>
            <a href="#solutions" className="text-gray-600 hover:text-[#0B0B0B] transition-colors">Solutions</a>
            <a href="#lab" className="text-gray-600 hover:text-[#0B0B0B] transition-colors">Water Lab</a>
            <a href="#technology" className="text-gray-600 hover:text-[#0B0B0B] transition-colors">Science</a>
            <a href="#products" className="text-gray-600 hover:text-[#0B0B0B] transition-colors">Hardware</a>
            <a href="#process" className="text-gray-600 hover:text-[#0B0B0B] transition-colors">Process</a>
            <a href="#contact" className="text-gray-600 hover:text-[#0B0B0B] transition-colors">Consultation</a>
          </div>

          {/* Desktop Call to Action */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={toggleAdminPanel}
              data-testid="admin-dashboard-toggle"
              className="text-xs font-mono border border-gray-200 hover:border-[#0B0B0B] hover:bg-gray-50 px-4 py-2 rounded-full transition-all"
            >
              Inquiry Hub
            </button>
            <a
              href="#lab"
              className="text-xs bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] hover:text-white transition-luxury px-5 py-2.5 rounded-full font-medium"
            >
              Analyze Water
            </a>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          data-testid="mobile-menu-overlay"
          className="fixed inset-0 bg-white/95 backdrop-blur-2xl z-40 flex flex-col justify-between pt-32 pb-12 px-8 animate-fade-in md:hidden"
        >
          <div className="flex flex-col gap-6 text-3xl font-geist font-light tracking-tight">
            <a
              href="#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#3BA7FF] transition-colors py-2"
            >
              About
            </a>
            <a
              href="#solutions"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#3BA7FF] transition-colors py-2"
            >
              Solutions
            </a>
            <a
              href="#lab"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#3BA7FF] transition-colors py-2"
            >
              Water Lab
            </a>
            <a
              href="#technology"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#3BA7FF] transition-colors py-2"
            >
              Science
            </a>
            <a
              href="#products"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#3BA7FF] transition-colors py-2"
            >
              Hardware
            </a>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="hover:text-[#3BA7FF] transition-colors py-2"
            >
              Consultation
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                toggleAdminPanel();
              }}
              className="w-full text-center border border-gray-200 text-sm font-medium py-3 rounded-full hover:bg-gray-50 transition-all"
            >
              Access Inquiry Tracker
            </button>
            <a
              href="#lab"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center bg-[#0B0B0B] text-white text-sm font-medium py-4 rounded-full hover:bg-[#3BA7FF] transition-all"
            >
              Start Free Analysis
            </a>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-24 pb-16 bg-gradient-to-b from-[#F9FAFB] to-white">
        {/* Cinematic Water Background */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply select-none pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1528481711262-175bb7079126"
            alt="Fluid water surface"
            className="w-full h-full object-cover scale-105 filter blur-[2px] transition-transform duration-1000 animate-water-flow"
          />
        </div>
        {/* Subtle Light Leak Highlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-100/30 blur-[130px] z-0 animate-pulse-glow" />

        <div className="max-w-5xl mx-auto px-6 md:px-12 text-center relative z-10">
          <div className="inline-flex items-center gap-2 border border-blue-200 bg-blue-50/50 backdrop-blur-md px-4 py-2 rounded-full text-xs font-mono text-blue-600 tracking-wide uppercase mb-8">
            <Sparkles className="w-3.5 h-3.5" />
            The Apple of Water Purification
          </div>

          <h1
            data-testid="hero-heading"
            className="font-geist text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter leading-[1.05] text-[#0B0B0B] mb-8"
          >
            Engineered for <span className="font-semibold block sm:inline">Pure Water.</span>
            <br />
            Designed for <span className="italic block sm:inline">Modern Living.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-xl font-light text-gray-500 leading-relaxed mb-12">
            Intelligent high-flow water filtration systems custom-architected for luxury homes, high-end apartments, hotels, medical centers, and premium industries.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <a
              href="#solutions"
              data-testid="hero-cta-explore"
              className="w-full sm:w-auto bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury shadow-lg shadow-black/5 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Explore Solutions
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#contact"
              data-testid="hero-cta-consult"
              className="w-full sm:w-auto bg-white/80 backdrop-blur-md border border-gray-200 text-gray-800 hover:border-[#0B0B0B] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury active:scale-[0.98] flex items-center justify-center"
            >
              Book Lab Consultation
            </a>
          </div>

          {/* Key Quick Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-20 mt-8 border-t border-gray-100 max-w-4xl mx-auto text-left">
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
              <div className="text-xs uppercase tracking-wider text-gray-400 mt-1">Digital Lab Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. About / Storytelling Section */}
      <section id="about" data-testid="about-section" className="py-24 md:py-32 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-8">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">The Ethos</div>
              <h2 className="font-geist text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none text-[#0B0B0B] font-light">
                Why compromise on the element that is <span className="font-semibold text-blue-500 underline decoration-blue-200 underline-offset-8">70% of you?</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
                At Crystal Blue, we look at water filtration not as plumbing, but as essential modern technology. Traditional water solutions are ugly, high-maintenance metal cylinders. We craft ultra-premium water purification engines.
              </p>
              <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
                By fusing medical-grade ultrafiltration with custom-crafted ion exchange matrices and absolute sediment separation, we ensure your family drinks, bathes, and cooks with water identical to natural alpine springs.
              </p>
              
              <div className="pt-4 border-l-2 border-blue-500 pl-6 space-y-4">
                <p className="italic text-gray-700 font-light text-base sm:text-lg">
                  &ldquo;We designed Crystal Blue to feel completely invisible. No noise, no scaling, no chlorine taste—just pristine, clinical purity.&rdquo;
                </p>
                <div className="text-xs font-mono uppercase tracking-wider text-gray-400">
                  — Lead Architect, Engineering division
                </div>
              </div>
            </div>

            {/* Right Asymmetric Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-3xl filter blur-2xl -z-10" />
              <img
                src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGdsYXNzJTIwZHJvcCUyMGNsZWFufGVufDB8fHx8MTc4MTg3NDQ1N3ww&ixlib=rb-4.1.0&q=85"
                alt="Luxury glass of water"
                className="w-full rounded-2xl border border-gray-100 shadow-2xl object-cover h-[450px] sm:h-[550px]"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/75 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-lg">
                <div className="text-xs font-mono text-[#0B0B0B]">WATER INTELLIGENCE CORE</div>
                <div className="text-lg font-geist font-light mt-1">Real-time particle diagnostic & automatic ion regeneration.</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Interactive Water Quality Lab (High-Impact Recommendation Engine) */}
      <section id="lab" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Diagnostic Tool</div>
            <h2 className="font-geist text-3xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Water Intelligence Lab
            </h2>
            <p className="text-gray-500 font-light mt-3">
              Configure your domestic water inputs to instantly compile a chemical analysis report and see the engineered filtration matrix recommended for you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Input Configurator (8 Columns) */}
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-gray-200 space-y-6 shadow-sm">
              <h3 className="font-geist text-xl font-medium text-gray-800 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-[#3BA7FF]" />
                Input Diagnostics
              </h3>

              {/* Source Select */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-gray-500 block">
                  Water Source
                </label>
                <select
                  data-testid="water-calc-source-select"
                  value={calcSource}
                  onChange={(e) => setCalcSource(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-[#3BA7FF]"
                >
                  <option value="Borewell">Borewell / Ground Water</option>
                  <option value="Municipal">Municipal / Pipe Supply</option>
                  <option value="Tanker">Private Tanker Delivery</option>
                </select>
              </div>

              {/* TDS Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono uppercase text-gray-500">
                  <span>Total Dissolved Solids</span>
                  <span className="text-blue-500 font-semibold">{calcTds} PPM</span>
                </div>
                <input
                  type="range"
                  data-testid="water-calc-tds-slider"
                  min="50"
                  max="2000"
                  step="50"
                  value={calcTds}
                  onChange={(e) => setCalcTds(Number(e.target.value))}
                  className="w-full accent-[#3BA7FF]"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>50 PPM (Spring)</span>
                  <span>2000 PPM (Extreme)</span>
                </div>
              </div>

              {/* Hardness Slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono uppercase text-gray-500">
                  <span>Calcium Hardness</span>
                  <span className="text-blue-500 font-semibold">{calcHardness} PPM</span>
                </div>
                <input
                  type="range"
                  data-testid="water-calc-hardness-slider"
                  min="20"
                  max="600"
                  step="20"
                  value={calcHardness}
                  onChange={(e) => setCalcHardness(Number(e.target.value))}
                  className="w-full accent-[#3BA7FF]"
                />
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>20 PPM (Soft)</span>
                  <span>600 PPM (Severe scale)</span>
                </div>
              </div>

              {/* Symptoms checklist */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider font-mono text-gray-500 block">
                  Observed Side Effects
                </label>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  {["Scaling", "Odor", "Staining", "Hairfall", "Dry Skin"].map((sym) => (
                    <button
                      key={sym}
                      data-testid={`water-calc-symptom-${sym.toLowerCase().replace(/\s+/g, "-")}`}
                      onClick={() => toggleCalcSymptom(sym)}
                      className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-xs font-medium transition-all ${
                        calcSymptoms.includes(sym)
                          ? "border-blue-500 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded flex items-center justify-center text-white text-[9px] ${
                        calcSymptoms.includes(sym) ? "bg-blue-500" : "bg-gray-100"
                      }`}>
                        {calcSymptoms.includes(sym) && "✓"}
                      </div>
                      {sym}
                    </button>
                  ))}
                </div>
              </div>

              {/* Run Button */}
              <button
                onClick={runWaterAnalysis}
                data-testid="water-calc-submit-button"
                disabled={isCalcLoading}
                className="w-full bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] transition-luxury py-3.5 rounded-xl font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm"
              >
                {isCalcLoading ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin inline-block" />
                ) : (
                  <>
                    Run Real-Time Diagnosis
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Live Lab Output Report (7 Columns) */}
            <div className="lg:col-span-7 h-full">
              {calcResult ? (
                <div
                  data-testid="water-calc-result"
                  className="bg-white border border-gray-200 rounded-2xl p-8 space-y-6 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                    <div>
                      <div className="text-xs uppercase font-mono tracking-widest text-gray-400">Analysis Report</div>
                      <div className="text-lg font-geist font-medium text-[#0B0B0B] mt-0.5">Custom Chemical Profile</div>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase ${
                      calcResult.severity === "Critical"
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : calcResult.severity === "Moderate"
                        ? "bg-amber-50 text-orange-600 border border-orange-200"
                        : "bg-green-50 text-green-600 border border-green-200"
                    }`}>
                      {calcResult.severity} Severity
                    </div>
                  </div>

                  {/* Chemical Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">TDS Analysis</div>
                      <p className="text-xs text-gray-600 leading-relaxed font-light">{calcResult.tds_analysis}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl space-y-1">
                      <div className="text-[10px] font-mono text-gray-400 uppercase">Hardness Analysis</div>
                      <p className="text-xs text-gray-600 leading-relaxed font-light">{calcResult.hardness_analysis}</p>
                    </div>
                  </div>

                  {/* System Recommendation */}
                  <div className="border border-blue-100 bg-blue-50/20 p-5 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#3BA7FF] tracking-wider font-semibold">
                      <Sparkles className="w-4 h-4 fill-current animate-pulse-glow" />
                      Recommended Technology Core
                    </div>
                    <h4 className="text-xl font-geist font-semibold text-[#0B0B0B]">
                      {calcResult.recommended_system}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                      {calcResult.system_description}
                    </p>
                  </div>

                  {/* Multi-stage filtration visual */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      Custom Multi-Stage Core Process
                    </div>
                    <div className="space-y-2">
                      {calcResult.stages.map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-xs">
                          <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px] text-blue-600 font-mono font-semibold">
                            {idx + 1}
                          </div>
                          <span className="text-gray-700 font-light">{stage}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 items-center pt-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase mr-1">Removes:</span>
                    {calcResult.symptoms_addressed.map((s, idx) => (
                      <span key={idx} className="bg-gray-100 text-gray-600 text-[10px] px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-end">
                    <a
                      href="#contact"
                      onClick={() => {
                        setContactMessage(`Hi! I just ran my diagnostics in the Water Quality Lab. Water Source: ${calcSource}, TDS: ${calcTds} PPM, Hardness: ${calcHardness} PPM. I'd like a formal quote for the ${calcResult.recommended_system}.`);
                        setContactProperty(calcSource === "Municipal" ? "Apartment" : "Villa");
                      }}
                      className="inline-flex items-center gap-1.5 text-xs text-blue-500 font-semibold uppercase tracking-wider hover:text-blue-600"
                    >
                      Bespoke System Proposal
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ) : (
                <div className="h-full border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-12 text-center bg-white">
                  <FileText className="w-12 h-12 text-gray-300 mb-4 animate-bounce" />
                  <p className="text-sm text-gray-400">Adjust the sliders and click &ldquo;Run Real-Time Diagnosis&rdquo; to compile your profile.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* 5. Water Solutions Grid Section */}
      <section id="solutions" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">The Portfolio</div>
              <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
                Intelligent Filtration Solutions
              </h2>
              <p className="text-base sm:text-lg text-gray-500 font-light leading-relaxed">
                Whether hard water softeners for luxury apartments, high-flow pre-filters for luxury villas, or redundant systems for hospitals—every platform is custom-made.
              </p>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-sm text-[#0B0B0B] font-semibold tracking-wide border-b-2 border-gray-200 hover:border-[#3BA7FF] transition-all py-1 mt-6 md:mt-0"
            >
              Request Custom Catalog
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Solution Cards - Swiss design Archetype */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {solutions.map((sol) => {
              const IconComp = sol.icon;
              return (
                <div
                  key={sol.id}
                  data-testid={`solution-card-${sol.id}`}
                  className="bg-[#F9FAFB] border border-[#E5E7EB] hover:border-gray-300 rounded-2xl p-8 space-y-6 transition-luxury hover:-translate-y-2 hover:shadow-xl group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-full border border-gray-200 bg-white flex items-center justify-center text-[#0B0B0B] group-hover:text-[#3BA7FF] group-hover:border-blue-100 group-hover:bg-blue-50 transition-all duration-300">
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
                      <span key={idx} className="bg-white border border-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. Technology Section (Interactive Process Timeline) */}
      <section id="technology" className="py-24 md:py-32 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Science & Tech</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              The Filtration Science
            </h2>
            <p className="text-gray-500 font-light mt-3">
              We construct custom physical and chemical barriers that neutralize impurities at a molecular scale. Explore the multi-stage defense matrix below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left selector buttons (5 Columns) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {techStages.map((stage, idx) => {
                const ActiveIcon = stage.icon;
                return (
                  <button
                    key={idx}
                    data-testid={`tech-stage-${idx + 1}`}
                    onClick={() => setActiveTechStage(idx)}
                    className={`text-left p-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                      activeTechStage === idx
                        ? "border-[#3BA7FF] bg-blue-50/40 shadow-sm"
                        : "border-gray-100 hover:border-gray-200 bg-white"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm font-semibold transition-all ${
                      activeTechStage === idx
                        ? "bg-[#3BA7FF] text-white"
                        : "bg-gray-100 text-[#0B0B0B]"
                    }`}>
                      {idx + 1}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#3BA7FF] font-semibold uppercase">{stage.step}</div>
                      <h4 className="font-geist font-medium text-base text-[#0B0B0B]">{stage.title}</h4>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Stage presentation (7 Columns) */}
            <div className="lg:col-span-7 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 sm:p-12 space-y-6 relative overflow-hidden">
              <div className="absolute right-4 top-4 text-7xl font-geist font-black text-gray-100/70 select-none pointer-events-none">
                0{activeTechStage + 1}
              </div>

              <div className="w-14 h-14 rounded-full bg-[#0B0B0B] text-white flex items-center justify-center">
                {React.createElement(techStages[activeTechStage].icon, { className: "w-7 h-7 text-[#3BA7FF] fill-current animate-pulse-glow" })}
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-[#3BA7FF] font-semibold">
                  {techStages[activeTechStage].subtitle}
                </div>
                <h3 className="font-geist text-3xl font-light tracking-tight text-[#0B0B0B]">
                  {techStages[activeTechStage].title}
                </h3>
              </div>

              <p className="text-gray-500 font-light leading-relaxed text-base">
                {techStages[activeTechStage].desc}
              </p>

              <div className="bg-white border border-gray-100 px-5 py-3 rounded-xl inline-flex items-center gap-2.5">
                <Info className="w-4.5 h-4.5 text-[#3BA7FF]" />
                <span className="text-xs font-mono font-medium text-gray-600">
                  {techStages[activeTechStage].metric}
                </span>
              </div>
              
              <div className="pt-4 border-t border-gray-200/50 flex items-center justify-between text-xs text-gray-400">
                <span>Intelligent Particle Shield active</span>
                <span>Active Core Matrix V2.4</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. Industries Showcase (Asymmetric Bento Grid) */}
      <section id="industries" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Sectors We Serve</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Water for Elite Architecture
            </h2>
            <p className="text-gray-500 font-light mt-3">
              We design specialized physical filtration hardware serving sectors requiring zero mineral scale, chemical absolute purity, and ultra-high continuous flow.
            </p>
          </div>

          {/* Bento-style Grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, idx) => (
              <div
                key={idx}
                data-testid={`industry-item-${ind.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="relative h-[300px] rounded-2xl overflow-hidden group border border-gray-100 shadow-sm bg-white"
              >
                {/* Background image zoom on hover */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                  <img
                    src={ind.image}
                    alt={ind.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-blue-400 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full self-start mb-2">
                    {ind.tag}
                  </span>
                  <h3 className="font-geist text-2xl font-light tracking-tight">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-gray-300 font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                    Continuous ultrafiltration custom configurations.
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. Featured Products Hardware Section */}
      <section id="products" className="py-24 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Premium Hardware</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Engineered Appliance Lineup
            </h2>
            <p className="text-gray-500 font-light mt-3">
              Meticulously designed cabinetry containing surgical-grade medical filters, smart ion exchange beds, and IoT controllers. Made to complement premium interior aesthetics.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {products.map((prod, idx) => (
              <div
                key={prod.id}
                data-testid={`product-card-${prod.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  idx % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Product Image (7 Columns) */}
                <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-last" : ""}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100 bg-gray-50 h-[350px] sm:h-[450px]">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover scale-100 hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Product Text Details (5 Columns) */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="text-xs font-mono uppercase text-[#3BA7FF] tracking-wider">
                    {prod.category}
                  </div>
                  <h3 className="font-geist text-3xl sm:text-4xl font-light tracking-tighter text-[#0B0B0B]">
                    {prod.name}
                  </h3>
                  <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed">
                    {prod.desc}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">
                      System Specifications
                    </div>
                    {prod.specs.map((spec, specIdx) => (
                      <div key={specIdx} className="flex items-center gap-2 text-xs">
                        <Check className="w-4 h-4 text-[#3BA7FF] shrink-0" />
                        <span className="text-gray-700 font-light">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <a
                      href="#contact"
                      onClick={() => {
                        setContactMessage(`I am highly interested in the ${prod.name} system catalog. Please send complete blueprints and quotation.`);
                        toggleContactSolution(prod.name);
                      }}
                      className="bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-6 py-3 rounded-full text-xs font-medium tracking-wide transition-luxury shadow-md inline-flex items-center gap-2"
                    >
                      Configure This System
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 9. Process Timeline Section */}
      <section id="process" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Our Protocol</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              The Deployment Loop
            </h2>
            <p className="text-gray-500 font-light mt-3">
              We maintain absolute precision at every single gateway. Our professional flow guarantees custom molecular water profiles with zero friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            
            {/* Process card list */}
            {processSteps.map((step, idx) => (
              <div
                key={idx}
                data-testid={`process-step-${idx + 1}`}
                className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4 relative shadow-sm"
              >
                <div className="text-4xl font-geist font-semibold text-blue-100">
                  {step.step}
                </div>
                <h3 className="font-geist text-lg font-medium text-[#0B0B0B]">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. Testimonials Editorial Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
          <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500">Testimonials</div>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-current text-amber-400" />
            ))}
          </div>

          {/* Testimonial slider-style text with static layout representing top editorial experience */}
          <div className="space-y-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                data-testid="testimonial-card"
                className="border-b border-gray-100 pb-10 space-y-4"
              >
                <p className="font-geist text-xl sm:text-2xl italic leading-relaxed text-[#0B0B0B] font-light">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <div className="text-sm font-semibold text-[#0B0B0B]">{t.author}</div>
                  <div className="text-xs font-mono text-gray-400 uppercase mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Custom Contact Request & Booking Form */}
      <section id="contact" className="py-24 md:py-32 bg-[#F9FAFB] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs uppercase tracking-[0.2em] font-semibold text-blue-500 mb-3">Inquire</div>
            <h2 className="font-geist text-4xl sm:text-5xl font-light tracking-tight text-[#0B0B0B]">
              Secure Water Purity
            </h2>
            <p className="text-gray-500 font-light mt-3">
              Request a lab test or custom quotation. Fill out the fields below, and our engineering desk will schedule a direct consultation.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-12 shadow-sm relative">
            
            {contactSuccess ? (
              <div className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#3BA7FF] flex items-center justify-center mx-auto border border-blue-100">
                  <Check className="w-8 h-8 animate-pulse-glow" />
                </div>
                <h3 className="font-geist text-2xl sm:text-3xl font-light text-[#0B0B0B]">
                  Consultation Request Dispatched
                </h3>
                <p className="text-sm text-gray-500 font-light max-w-md mx-auto leading-relaxed">
                  Your inquiry has been stored securely in our MongoDB database. Our water analyst will call or email you within 3 hours.
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="text-xs font-semibold text-[#0B0B0B] uppercase tracking-wider hover:text-blue-500 underline"
                  >
                    Send Another Request
                  </button>
                  <button
                    onClick={toggleAdminPanel}
                    className="text-xs font-semibold text-blue-500 uppercase tracking-wider hover:text-blue-600 underline"
                  >
                    View Submissions List
                  </button>
                </div>
              </div>
            ) : (
              <form data-testid="contact-form" onSubmit={handleContactSubmit} className="space-y-8">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name */}
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

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Email Address *</label>
                    <input
                      type="email"
                      required
                      data-testid="contact-email-input"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g., alex@mercerarchitecture.com"
                      className="w-full bg-transparent border-b border-gray-200 hover:border-gray-400 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Phone Number</label>
                    <input
                      type="tel"
                      data-testid="contact-phone-input"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g., +1 (555) 019-2831"
                      className="w-full bg-transparent border-b border-gray-200 hover:border-gray-400 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Property Select */}
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Property Category</label>
                    <select
                      data-testid="contact-property-select"
                      value={contactProperty}
                      onChange={(e) => setContactProperty(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-200 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none text-gray-600 transition-colors"
                    >
                      <option value="Villa">Luxury Villa</option>
                      <option value="Apartment">Luxury Apartment</option>
                      <option value="Commercial">Commercial Complex</option>
                      <option value="Hotel">Boutique Hotel</option>
                      <option value="Hospital">Medical Facility</option>
                      <option value="Industry">Industrial Plant</option>
                    </select>
                  </div>
                </div>

                {/* Selected Solutions Checkboxes */}
                <div className="space-y-3">
                  <label className="text-xs uppercase font-mono tracking-wider text-gray-400 block">Solutions Needed</label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Whole Villa Matrix",
                      "Borewell Multi-stage",
                      "Scale Softeners",
                      "Commercial RO Complexes",
                      "Custom Blueprints"
                    ].map((solName) => (
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

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-mono tracking-wider text-gray-400">Message / Inquiry Details *</label>
                  <textarea
                    required
                    data-testid="contact-message-textarea"
                    rows="3"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="e.g., Requesting a chemical borewell sample kit and a full design proposal for a 5-bedroom luxury estate."
                    className="w-full bg-transparent border-b border-gray-200 hover:border-gray-400 focus:border-[#3BA7FF] pb-2 text-sm focus:outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    data-testid="contact-submit-button"
                    disabled={isContactSubmitting}
                    className="bg-[#0B0B0B] text-white hover:bg-[#3BA7FF] px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-luxury flex items-center gap-2"
                  >
                    {isContactSubmitting ? (
                      <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Dispatch Inquiry
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      </section>

      {/* 12. Footer Section */}
      <footer className="bg-white border-t border-gray-100 py-12 text-gray-500">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#0B0B0B] flex items-center justify-center text-white">
              <Droplet className="w-3 h-3 text-[#3BA7FF] fill-current" />
            </div>
            <span className="font-geist font-semibold text-[#0B0B0B]">CRYSTAL BLUE</span>
          </div>

          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} Crystal Blue Water Solution. All rights reserved. Commercially Licensed.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleAdminPanel}
              className="text-xs font-mono border border-gray-200 hover:border-[#0B0B0B] hover:text-[#0B0B0B] px-3.5 py-1.5 rounded-full transition-all"
            >
              Partner Inquiry Tracker
            </button>
            <a href="#" className="hover:text-[#0B0B0B] transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>

      {/* --- Elegant Inquiries Live Tracker Sidebar Drawer --- */}
      {isAdminOpen && (
        <div className="fixed inset-y-0 right-0 w-full sm:w-[500px] bg-white shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-slide-in">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
            <div>
              <div className="text-[10px] font-mono text-[#3BA7FF] uppercase tracking-widest font-semibold">Live Monitor</div>
              <h3 className="text-xl font-geist font-medium text-[#0B0B0B] mt-0.5">Partner Portal Inquiries</h3>
            </div>
            <button
              onClick={toggleAdminPanel}
              className="p-2 rounded-full hover:bg-gray-200 transition-all text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Submissions List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {isLoadingInquiries ? (
              <div className="h-full flex flex-col items-center justify-center py-20 text-gray-400">
                <span className="w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin mb-4" />
                <p className="text-xs">Synchronizing with MongoDB...</p>
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-20 text-gray-400 border border-dashed border-gray-200 rounded-xl p-8">
                <MessageSquare className="w-10 h-10 mx-auto text-gray-300 mb-3" />
                <p className="text-sm">No submissions found in MongoDB.</p>
                <p className="text-xs text-gray-400 mt-1">Fill out the consultation form to see it appear in real-time!</p>
              </div>
            ) : (
              inquiries.map((inq) => {
                const inqId = inq.id || inq._id;
                return (
                  <div
                    key={inqId}
                    data-testid={`inquiry-card-${inqId}`}
                    className="border border-gray-200 p-5 rounded-xl space-y-4 bg-gray-50/50 hover:bg-white transition-all shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-semibold text-[#0B0B0B] text-base">{inq.name}</div>
                        <div className="text-xs text-gray-400 font-mono mt-0.5">{inq.email} | {inq.phone || "No Phone"}</div>
                      </div>
                      
                      {/* Status Badge */}
                      <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                        inq.status === "Completed"
                          ? "bg-green-50 text-green-600 border-green-200"
                          : inq.status === "Scheduled"
                          ? "bg-blue-50 text-blue-600 border-blue-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}>
                        {inq.status}
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 font-light bg-white p-3 rounded-lg border border-gray-100">
                      <div className="text-[9px] font-mono text-gray-400 uppercase tracking-wider mb-1">Inquiry Details</div>
                      <p className="leading-relaxed">{inq.message}</p>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-gray-400 font-mono">
                      <div>Property: <span className="text-gray-700 font-semibold">{inq.property_type}</span></div>
                      <div>
                        {new Date(inq.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </div>
                    </div>

                    {/* Status Actions */}
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-3 text-xs">
                      <span className="text-gray-400 font-mono text-[9px] uppercase">Update Status:</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateInquiryStatus(inqId, "Scheduled")}
                          data-testid={`inquiry-schedule-button-${inqId}`}
                          className="px-2.5 py-1 rounded border border-blue-200 text-blue-600 hover:bg-blue-50 transition-all text-[10px] font-medium"
                        >
                          Schedule
                        </button>
                        <button
                          onClick={() => updateInquiryStatus(inqId, "Completed")}
                          data-testid={`inquiry-complete-button-${inqId}`}
                          className="px-2.5 py-1 rounded border border-green-200 text-green-600 hover:bg-green-50 transition-all text-[10px] font-medium"
                        >
                          Complete
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Footer details */}
          <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between text-xs text-gray-400 font-mono">
            <span>Server: Active</span>
            <span>Total: {inquiries.length} Submissions</span>
          </div>
        </div>
      )}

    </div>
  );
}
