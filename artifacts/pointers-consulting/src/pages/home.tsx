import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Users,
  CheckCircle,
  Star,
  Phone,
  FileText,
  Building2,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  LineChart,
  UserCheck,
} from "lucide-react";
import { blogPosts } from "@/data/blog";

const BASE = "/images";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const stagger: Variants = {
  visible: { transition: { staggerChildren: 0.09 } },
};

const springCard: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 22 },
  },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

// Animated counter hook
function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);
  return count;
}

const slides = [
  {
    image: `${BASE}/banner1-2025.jpg`,
    badge: "Australia's SMSF Specialists",
    title: "Is SMSF Right for Me?",
    subtitle:
      "Try our Free SMSF FitForMe Checkup — Australia's first dual assessment online SMSF Tool. Get your instant SMSF readiness score in minutes.",
    prominentSubtitle: true,
    cta: "Start Free Checkup",
    ctaHref: "/smsf/",
    ctaSecondary: "Book Appointment",
    ctaSecondaryHref: "/contact",
  },
  {
    image: `${BASE}/sliders3.jpg`,
    badge: "SMSF & Tax Specialists",
    title: "Think Big, Act Smart, Stay Compliant",
    subtitle:
      "We are on a mission to make SMSFs & Tax Matters simple, effective and stress free. We hear you, understand what the real problem is and then act. Service that hits the mark.",
    cta: "Book Appointment",
    ctaHref: "/contact",
    ctaSecondary: "+61 426 784 982",
    ctaSecondaryHref: "tel:+61426784982",
  },
];

const specialistServices = [
  {
    icon: Shield,
    title: "Self-Managed Superfund (SMSF)",
    description:
      "SMSFs are not just another tax job. They are highly regulated structures with their own legislation, rules and obligations, and serve as a long-term investment vessel for retirement. We help individual trustees and Accountants navigate the complexity with clarity and confidence.",
    image: `${BASE}/smsf-400x239.jpg`,
    href: "/services/smsf",
    tags: ["B2B – For Accountants", "B2C – For Trustees"],
    highlight: true,
  },
  {
    icon: Building2,
    title: "Business Advisory & Taxation",
    description:
      "Business success depends on far more than lodging tax returns on time. We bring strategy, structure, governance and tax compliance together in a simple, actionable way for business owners and high net-worth individuals.",
    image: `${BASE}/57-400x239.jpg`,
    href: "/services/business-advisory",
    tags: [],
    highlight: false,
  },
  {
    icon: UserCheck,
    title: "Self-Employed Professionals",
    description:
      "Specialist tax, structure and advisory for Medical Practitioners, Lawyers, Tradies, Mortgage Brokers and all sole business proprietors. We understand the unique challenges of running your own practice.",
    image: `${BASE}/legaldoc-400x239.jpg`,
    href: "/services/business-advisory",
    tags: ["Medical", "Legal", "Trades", "Brokers"],
    highlight: false,
  },
  {
    icon: LineChart,
    title: "Investors",
    description:
      "Strategic tax planning and advisory for Real Estate, Share and Crypto investors. We ensure every holding complies while maximising after-tax returns — balancing your growth aspirations with strict compliance requirements.",
    image: `${BASE}/audit-400x239.jpg`,
    href: "/services/business-advisory",
    tags: ["Real Estate", "Shares", "Crypto"],
    highlight: false,
  },
];

const otherServices = [
  {
    icon: FileText,
    title: "Legal Aid – Setups, Registrations & Compliance",
    description:
      "Fast-track legal aid for Australian business registrations, entity formation and ongoing compliance. From sole traders to multinationals, we handle the paperwork so you launch confidently and stay compliant.",
    image: `${BASE}/company-taxreturn-400x239.jpg`,
    href: "/services/legal-compliance",
  },
  {
    icon: BarChart3,
    title: "Audit & Risk Assurance",
    description:
      "Strategic risk and assurance solutions through our proven E-R-S philosophy. We help Australian businesses strengthen internal controls, mitigate threats and build stakeholder confidence — turning risk management from cost centre to competitive advantage.",
    image: `${BASE}/audit-400x239.jpg`,
    href: "/services/assurance-risk",
  },
];

const partnerLogos = [
  { name: "CPA Australia", src: "/logos/cpa-2025-logo.jpg" },
  { name: "ASIC Registered Agent", src: "/logos/asic-registerd-agent-logo-20205.jpg" },
  { name: "SMSF Association", src: "/logos/sms-assocation.jpg" },
  { name: "Xero Partner", src: "/logos/xero-logo-20205.jpg" },
  { name: "JPATAX", src: "/logos/jpatax-logo-2025.jpg" },
  { name: "Tax Practitioners Board", src: "/logos/tax-board-2025-logo.jpg" },
];

const stats = [
  { value: 45, suffix: "%", label: "Time Saved for Accountants", desc: "On SMSF compliance and admin by using our virtual SMSF support." },
  { value: 95, suffix: "%", label: "New Work from Referrals", desc: "Trusted by accountants and business owners who recommend us to their networks." },
  { value: null, display: "24–48 hr", label: "Response Time", desc: "Typical turnaround for complex SMSF technical queries." },
  { value: 19, suffix: "+", label: "Years' Experience", desc: "Handling business advisory and SMSF compliance in Australia." },
];

const testimonials = [
  {
    name: "Achut",
    role: "SMSF Trustee",
    text: "We have had an excellent experience with Pointers Consulting. Very professional, and easy to deal with. Great advice and excellent service. Highly recommended!",
  },
  {
    name: "Sarah & David L.",
    role: "Business Owners, Sydney",
    text: "We've been working with Pointers for our business tax and SMSF for six years. Their integrated approach has saved us significantly in tax each year while building our retirement wealth.",
  },
  {
    name: "Robert K.",
    role: "Property Investor, Brisbane",
    text: "The team guided us through purchasing a commercial property in our SMSF. The process was complex, but their expertise made it seamless. Outstanding service.",
  },
];

const whyUs = [
  "SMSF specialists with deep regulatory expertise",
  "Integrated approach covering super, tax, and business advisory",
  "Transparent fixed fees with no hidden costs",
  "Proactive communication — we contact you, not the other way around",
  "Direct access to your dedicated Specialist, not a call centre",
  "Dedicated years of experience in Australian Financial Services & Consulting industry",
];

function StatCounter({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCounter(stat.value ?? 0, inView);
  return (
    <div ref={ref} className="text-center px-4 py-2 border-r border-white/10 last:border-r-0">
      <div className="text-3xl lg:text-4xl font-bold mb-1 text-[#459443] tabular-nums">
        {stat.display ? stat.display : `${stat.value !== null ? count : ""}${stat.suffix ?? ""}`}
      </div>
      <div className="text-white font-semibold text-sm mb-1.5">{stat.label}</div>
      <div className="text-white text-xs leading-relaxed max-w-[180px] mx-auto">{stat.desc}</div>
    </div>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    document.title = "Pointers Consulting | SMSF & Business Advisory Specialists";
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const recentPosts = blogPosts.slice(0, 3);
  const slide = slides[current];

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero Slider ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "calc(100vh - 0px)", minHeight: 580, maxHeight: 820 }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current + "-bg"}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              backgroundImage: `url(${slides[current].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center 160px",
            }}
          />
        </AnimatePresence>
        {/* Layered overlay for depth */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.42) 0%, rgba(0,0,0,0.22) 55%, rgba(0,0,0,0.08) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,46,26,0.4) 0%, transparent 35%)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full pt-44 pb-16">
          <div className="w-full px-6 sm:px-8 lg:px-12 flex-1 flex items-center">
            <div className="max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current + "-content"}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.span
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                    className="inline-flex items-center gap-2 bg-[#459443] border border-[#459443] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5"
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    {slide.badge}
                  </motion.span>

                  <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-[1.1] mb-5 tracking-tight">
                    {slide.title}
                  </h1>

                  <p className={`text-white leading-relaxed mb-9 max-w-xl ${"prominentSubtitle" in slide && slide.prominentSubtitle ? "text-base font-semibold" : "text-sm font-normal"}`}>
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={slide.ctaHref}>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-[#459443] text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-[#3a7f38] transition-colors flex items-center gap-2.5 justify-center shadow-lg shadow-[#459443]/30"
                      >
                        {slide.cta}
                        <ArrowRight size={17} />
                      </motion.button>
                    </Link>
                    {slide.ctaSecondaryHref.startsWith("tel:") ? (
                      <a href={slide.ctaSecondaryHref}>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-sm hover:border-white/50 hover:bg-white/8 backdrop-blur-sm transition-all inline-flex items-center gap-2 justify-center"
                        >
                          <Phone size={16} />
                          {slide.ctaSecondary}
                        </motion.button>
                      </a>
                    ) : (
                      <Link href={slide.ctaSecondaryHref}>
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          className="border border-white/30 text-white px-7 py-4 rounded-xl font-semibold text-sm hover:border-white/50 hover:bg-white/8 backdrop-blur-sm transition-all inline-flex items-center gap-2 justify-center"
                        >
                          {slide.ctaSecondary}
                        </motion.button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="w-full px-6 sm:px-8 lg:px-12 flex items-center justify-between">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-400 ${
                    i === current ? "bg-[#459443] w-8 h-2.5" : "bg-white/35 w-2.5 h-2.5 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/12 hover:border-white/50 backdrop-blur-sm transition-colors"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-[#459443] flex items-center justify-center text-white hover:bg-[#3a7f38] transition-colors shadow-md shadow-[#459443]/30"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="bg-[#1a2e1a] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <StatCounter key={stat.label} stat={stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Icons Row ── */}
      <section className="bg-[#fafffa] border-b border-[#459443]/15 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                img: `${BASE}/experienve.svg`,
                title: "Core Expertise",
                desc: "SMSF Structuring, Tax optimization and compliance strategies for Business & Individuals",
              },
              {
                img: `${BASE}/trust.svg`,
                title: "Proven Track Record",
                desc: "Years of delivering proactive SMSF, Taxation & Business Advisory Solutions to Australian Clients.",
              },
              {
                img: `${BASE}/service.svg`,
                title: "Tailored Client Support",
                desc: "Personalized consultations to ensure alignment with your own business, super, investment and financial needs.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-[#459443]/10 hover:border-[#459443]/35 hover:shadow-md transition-all duration-300 group"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-12 h-12 object-contain shrink-0 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div>
                  <h3 className="font-bold text-[#1a2e1a] text-sm mb-1">{item.title}</h3>
                  <p className="text-[#0a0a0a] text-sm font-normal leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="py-10 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-8">
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">
              SMSF SPECIALISTS & BUSINESS CATALYSTS
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3 mb-4">
              Businesses (SMEs) & High Net-worth Individuals
            </h2>
            <p className="text-[#0a0a0a] text-lg max-w-2xl mx-auto font-normal">
              SMSF & Business Consulting is what we do best. We also cover Taxation and Business Advisory – all under one roof.
            </p>
          </AnimatedSection>

          {/* Specialist Services */}
          <AnimatedSection className="mb-5">
            <div className="flex items-center gap-3 mb-7">
              <div className="h-0.5 w-8 bg-[#459443]" />
              <span className="text-[#459443] font-bold text-sm uppercase tracking-widest">Specialist Services</span>
              <div className="h-0.5 flex-1 bg-[#459443]/20" />
            </div>
          </AnimatedSection>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12"
          >
            {specialistServices.map((service) => (
              <motion.div key={service.title} variants={springCard}>
                <Link href={service.href}>
                  <div className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#459443]/20 transition-all duration-400 cursor-pointer h-full flex flex-col">
                    <div className="overflow-hidden h-44 relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600"
                      />
                      <div className="absolute inset-0 bg-[#1a2e1a]/30 group-hover:bg-[#1a2e1a]/15 transition-colors duration-300" />
                      <div className="absolute top-3 left-3">
                        <div className="w-9 h-9 bg-[#459443] rounded-xl flex items-center justify-center shadow-lg shadow-[#459443]/30">
                          <service.icon size={17} className="text-white" />
                        </div>
                      </div>
                      {service.highlight && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-[#459443] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                            Specialist
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-[17px] text-[#1a2e1a] mb-2 group-hover:text-[#459443] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      {service.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {service.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold bg-[#459443]/10 text-[#459443] px-2 py-0.5 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-[#0a0a0a] text-sm leading-relaxed font-normal flex-1">{service.description}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-[#459443] font-semibold text-sm">
                        <span className="group-hover:mr-1 transition-all">Learn More</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Other Services */}
          <AnimatedSection className="mb-5">
            <div className="flex items-center gap-3 mb-7">
              <div className="h-0.5 w-8 bg-[#1a2e1a]" />
              <span className="text-[#1a2e1a] font-bold text-sm uppercase tracking-widest">Other Services</span>
              <div className="h-0.5 flex-1 bg-gray-200" />
            </div>
          </AnimatedSection>
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {otherServices.map((service) => (
              <motion.div key={service.title} variants={springCard}>
                <Link href={service.href}>
                  <div className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#459443]/20 transition-all duration-400 cursor-pointer h-full flex flex-col">
                    <div className="overflow-hidden h-44 relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-107 transition-transform duration-600"
                      />
                      <div className="absolute inset-0 bg-[#1a2e1a]/30 group-hover:bg-[#1a2e1a]/15 transition-colors duration-300" />
                      <div className="absolute top-3 left-3">
                        <div className="w-9 h-9 bg-[#1a2e1a] rounded-xl flex items-center justify-center shadow-md">
                          <service.icon size={17} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-[17px] text-[#1a2e1a] mb-2 group-hover:text-[#459443] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[#0a0a0a] text-sm leading-relaxed font-normal flex-1">{service.description}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-[#459443] font-semibold text-sm">
                        <span className="group-hover:mr-1 transition-all">Learn More</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SMSF FitForMe — Redesigned Prominent Section ── */}
      <section className="relative py-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #0a180a 0%, #1a2e1a 50%, #0f1f0f 100%)" }}>
        {/* Background geometric rings — depth layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-[#459443]/12" />
          <div className="absolute -bottom-16 -right-16 w-[500px] h-[500px] rounded-full border border-[#459443]/8" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#459443]/5" />
          {/* Radial glow */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.06]" style={{ background: "radial-gradient(circle, #459443 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="inline-flex items-center gap-2.5 bg-[#459443]/15 border border-[#459443]/30 text-[#459443] text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
              <span className="w-2 h-2 bg-[#459443] rounded-full animate-pulse" />
              Free Tool — Australia's First of Its Kind
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-4"
          >
            <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
              SMSF <span className="text-[#459443]">FitForMe</span> Checkup
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white text-lg text-center mb-16 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Australia's first dual-assessment SMSF readiness tool. Know if SMSF is right for you — and if you're right for SMSF. No financial advice, no sign-up required.
          </motion.p>

          {/* Three stat cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14"
          >
            {[
              { num: "25", label: "Yes / No Questions", sub: "Simple, fast, structured" },
              { num: "2-in-1", label: "Dual Assessment", sub: "Are you right for SMSF + Is SMSF right for you?" },
              { num: "~10", label: "Minutes to Complete", sub: "Instant tailored results" },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={springCard}
                className="bg-white/5 backdrop-blur-sm border border-white/8 rounded-2xl p-8 text-center hover:border-[#459443]/40 hover:bg-white/8 transition-all duration-300 group"
              >
                <div className="text-5xl font-bold text-[#459443] mb-2 tracking-tight">{item.num}</div>
                <div className="text-white font-semibold text-sm mb-1">{item.label}</div>
                <div className="text-white/45 text-sm leading-relaxed">{item.sub}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom two-column */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <AnimatedSection>
              <h3 className="text-2xl font-bold text-white mb-5">
                Two Questions This Tool Answers:
              </h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Is SMSF Right for Me?",
                  "Am I Right for SMSF?",
                  "Where do I start?",
                  "No financial advice — just personalised insights",
                  "Completely free, no obligation, no sign-up",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white text-[15px] leading-relaxed">
                    <CheckCircle size={16} className="text-[#459443] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/smsf/">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(69,148,67,0.35)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#459443] text-white px-9 py-4 rounded-xl font-semibold text-sm hover:bg-[#3a7f38] transition-all inline-flex items-center gap-3 group shadow-lg shadow-[#459443]/25"
                >
                  Start Free Checkup
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </a>
            </AnimatedSection>

            <AnimatedSection>
              <div className="bg-white/6 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:border-[#459443]/25 transition-all duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-[#459443] rounded-2xl flex items-center justify-center shadow-xl shadow-[#459443]/30 shrink-0">
                    <Shield size={30} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl leading-tight">SMSF Readiness Score</div>
                    <div className="text-white text-sm mt-0.5">Australia's only dual-assessment tool</div>
                  </div>
                </div>
                <p className="text-white text-sm leading-relaxed mb-6 font-normal">
                  By simply answering 25 Yes/No questions, this tool provides an instant tailored summary of your SMSF readiness — so you know exactly where you stand before making any commitment.
                </p>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    "Instant results",
                    "Free to use",
                    "No sign-up needed",
                    "Tailored insights",
                    "No financial advice",
                    "100% private",
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2.5 text-white text-sm border border-white/5">
                      <CheckCircle size={12} className="text-[#459443] shrink-0" />
                      {feat}
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3 mb-6 leading-tight">
                Our Expertise You Can Count On
              </h2>
              <p className="text-[#0a0a0a] text-lg leading-relaxed mb-8 font-normal">
                We are on a mission to make SMSFs & Tax matters simple, fast, and stress-free. Our friendly and professional team speaks your language and works around your schedule.
              </p>
              <ul className="space-y-4">
                {whyUs.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle size={17} className="text-[#459443] mt-0.5 shrink-0" />
                    <span className="text-[#0a0a0a] text-sm leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#459443] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2"
                  >
                    Contact Us <ArrowRight size={15} />
                  </motion.button>
                </Link>
                <a href="tel:+61426784982">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="border border-[#459443]/40 text-[#459443] px-6 py-3 rounded-xl font-semibold hover:bg-[#459443]/10 transition-colors inline-flex items-center gap-2"
                  >
                    <Phone size={14} /> +61 426 784 982
                  </motion.button>
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`${BASE}/business-accountant.webp`}
                  alt="Professional Business Accountant"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a2e1a] via-[#1a2e1a]/60 to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#459443] rounded-full flex items-center justify-center shrink-0">
                      <Users size={18} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">Free Initial Consultation</p>
                      <p className="text-white text-xs">Speak to a specialist today — no obligation</p>
                    </div>
                    <Link href="/contact">
                      <button className="bg-[#459443] text-white text-xs px-4 py-2 rounded-lg font-semibold hover:bg-[#3a7f38] transition-colors shrink-0">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[
                  { icon: Shield, label: "ATO Registered", sub: "SMSF Auditors" },
                  { icon: Star, label: "5-Star Reviews", sub: "From Our Clients" },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center hover:border-[#459443]/30 transition-colors">
                    <item.icon size={24} className="text-[#459443] mx-auto mb-2" />
                    <div className="text-[#1a2e1a] font-bold">{item.label}</div>
                    <div className="text-[#0a0a0a] text-xs mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-20 lg:py-28 bg-[#fafffa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3 mb-2">
              Simple Steps, Maximum Results, Zero Stress
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", emoji: "📅", title: "Book Appointment", desc: "Select the service you need and schedule your free appointment at your preferred time." },
              { num: "02", emoji: "📞", title: "Consult With Expert", desc: "Our professional connects with you, reviews details, and plans the best solution." },
              { num: "03", emoji: "✅", title: "Relax & Get Results", desc: "Sit back while we complete the work and deliver results quickly and securely." },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl p-8 border border-[#459443]/15 hover:shadow-xl hover:border-[#459443]/30 transition-all duration-300 text-center h-full"
              >
                <div className="w-14 h-14 bg-[#459443] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#459443]/25">
                  <span className="text-white font-bold text-lg">{step.num}</span>
                </div>
                <div className="text-3xl mb-3">{step.emoji}</div>
                <h3 className="font-bold text-xl text-[#1a2e1a] mb-3">{step.title}</h3>
                <p className="text-[#0a0a0a] text-sm leading-relaxed font-normal">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Client Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3">
              What Our Clients Say About Us
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3 }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 h-full flex flex-col hover:shadow-md hover:border-[#459443]/15 transition-all duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-[#459443] text-[#459443]" />
                  ))}
                </div>
                <p className="text-[#0a0a0a] text-sm leading-relaxed flex-1 mb-5 italic font-normal">
                  "{t.text}"
                </p>
                <div className="border-t border-gray-100 pt-4">
                  <div className="font-semibold text-[#1a2e1a] text-sm">{t.name}</div>
                  <div className="text-[#0a0a0a] text-xs mt-0.5">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Finance Partners ── */}
      <section className="py-14 bg-[#fafffa] border-y border-[#459443]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-center text-sm font-semibold text-[#0a0a0a] uppercase tracking-wider mb-10">
              Our Finance Partners
            </h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {partnerLogos.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.08 }}
                className="flex items-center justify-center"
              >
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-20 max-w-[200px] object-contain transition-all duration-400"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Blog Preview ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <AnimatedSection>
              <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Insights & News</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3">Latest from Our Growth Insights</h2>
            </AnimatedSection>
            <AnimatedSection>
              <Link href="/blog">
                <button className="hidden md:flex items-center gap-2 text-[#459443] font-semibold hover:text-[#3a7f38] transition-colors text-sm">
                  All Articles <ArrowRight size={15} />
                </button>
              </Link>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col hover:border-[#459443]/15">
                    <div className="bg-[#1a2e1a] p-7 flex-1">
                      <span className="inline-block bg-[#459443]/15 text-[#459443] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {post.category}
                      </span>
                      <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#459443] transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-[#0a0a0a] text-sm leading-relaxed line-clamp-2 mb-4 font-normal">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[#0a0a0a]">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="bg-[#459443] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-white text-sm mb-8 font-normal">
              Speak with one of our SMSF and business advisory specialists. Your first consultation is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-[#459443] px-7 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2"
                >
                  Book Appointment <ArrowRight size={16} />
                </motion.button>
              </Link>
              <a href="tel:+61426784982">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="border-2 border-white text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2"
                >
                  <Phone size={16} /> +61 426 784 982
                </motion.button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
