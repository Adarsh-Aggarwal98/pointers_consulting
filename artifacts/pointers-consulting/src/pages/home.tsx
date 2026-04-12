import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  Phone,
  FileText,
  Building2,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { blogPosts } from "@/data/blog";

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const slides = [
  {
    image: `${BASE}/2025/12/banner1.jpg`,
    badge: "Australia's SMSF Specialists",
    title: "Is SMSF Right for You + Are You Right for SMSF?",
    subtitle:
      "Take the Free SMSF FitForMe Checkup. Australia's first of its kind, dual-assessment online tool. Get your instant SMSF readiness score in minutes.",
    cta: "Start Now",
    ctaHref: "/contact",
  },
  {
    image: `${BASE}/2026/01/sliders3.jpg`,
    badge: "SMSF & Tax Specialists",
    title: "Client Service That Hits The Mark",
    subtitle:
      "We are on a mission to make SMSFs & Tax matters simple, fast, and stress-free. We speak your language and process most returns within 48 hours.",
    cta: "Book Appointment",
    ctaHref: "/contact",
  },
];

const services = [
  {
    icon: Shield,
    title: "Self-Managed Superfund",
    description: "Your SMSF, expertly managed — compliant, strategic and future-focused. One-stop shop for administration, audit defence and planning.",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
  },
  {
    icon: FileText,
    title: "Taxation & Accounting",
    description: "Tax and accounting that optimises, not just complies. Precision returns, bookkeeping and advisory to minimise liability.",
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
  },
  {
    icon: Building2,
    title: "Business Advisory",
    description: "Strategic guidance that turns numbers into growth. Clear planning, structuring and governance advice for business owners.",
    image: `${BASE}/2026/01/57-400x239.jpg`,
  },
  {
    icon: BarChart3,
    title: "Assurance & Risk",
    description: "Strengthen your controls with independent, practical assurance. Value & Risk Based Internal audits and risk reviews.",
    image: `${BASE}/2021/10/audit-400x239.jpg`,
  },
  {
    icon: FileText,
    title: "Legal — Setups & Registrations",
    description: "Fast, compliant setups and registrations without the hassle. Company formation, ABN/TFN, ASIC lodgements and ongoing governance.",
    image: `${BASE}/2022/07/company-taxreturn-400x239.jpg`,
  },
  {
    icon: TrendingUp,
    title: "AI Business Support Hub",
    description: "Extra capacity and smarter systems, without the headcount. Virtual CFO support, specialist staffing or custom AI automation.",
    image: `${BASE}/2026/01/673-400x239.jpg`,
  },
];

const partnerLogos = [
  { name: "CPA Australia", src: `${BASE}/2026/01/cpa-2025-logo.jpg` },
  { name: "ASIC Registered Agent", src: `${BASE}/2026/01/asic-registerd-agent-logo-20205.jpg` },
  { name: "SMSF Association", src: `${BASE}/2026/01/sms-assocation.jpg` },
  { name: "Xero Partner", src: `${BASE}/2026/01/xero-logo-20205.jpg` },
  { name: "JPATAX", src: `${BASE}/2026/01/jpatax-logo-2025.jpg` },
  { name: "Tax Practitioners Board", src: `${BASE}/2026/01/tax-board-2025-logo.jpg` },
];

const stats = [
  { value: "600+", label: "SMSF Funds Managed" },
  { value: "$420M+", label: "Assets Under Management" },
  { value: "18+", label: "Years of Experience" },
  { value: "98%", label: "Client Retention Rate" },
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
  "Licensed SMSF specialists with deep regulatory expertise",
  "Integrated approach covering super, tax, and business advisory",
  "Transparent fixed fees with no hidden costs",
  "Proactive communication — we contact you, not the other way around",
  "Direct access to your dedicated adviser, not a call centre",
  "Years of combined experience in Australian financial services",
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    document.title = "Pointers Consulting | SMSF & Business Advisory Specialists";
  }, []);

  // Auto-advance slider
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
      {/* Hero Slider */}
      <section className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 0px)", minHeight: 560, maxHeight: 780 }}>
        {/* Background images per slide */}
        <AnimatePresence initial={false}>
          <motion.div
            key={current + "-bg"}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              backgroundImage: `url(${slides[current].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center 108px",
            }}
          />
        </AnimatePresence>
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.45)" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full pt-36 pb-16">
          <div className="w-full px-4 sm:px-6 lg:px-8 flex-1 flex items-center">
            <div className="max-w-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current + "-content"}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
                    {slide.title}
                  </h1>

                  <p className="text-white/75 text-lg leading-relaxed mb-8 font-light">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link href={slide.ctaHref}>
                      <button className="bg-[#459443] text-white px-8 py-3.5 rounded font-semibold text-base hover:bg-[#3a7f38] transition-colors flex items-center gap-2 justify-center">
                        {slide.cta}
                        <ArrowRight size={17} />
                      </button>
                    </Link>
                    <a href="tel:+61426784982">
                      <button className="border border-white/30 text-white px-7 py-3.5 rounded font-semibold text-base hover:border-white/50 hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                        <Phone size={16} />
                        +61 426 784 982
                      </button>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Slider Controls */}
          <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? "bg-[#459443] w-7 h-2.5" : "bg-white/40 w-2.5 h-2.5"
                  }`}
                />
              ))}
            </div>
            {/* Arrows */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/50 transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 rounded-full bg-[#459443] flex items-center justify-center text-white hover:bg-[#3a7f38] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#1a2e1a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-1 text-[#459443]">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Icons Row (matching original site) */}
      <section className="bg-[#fafffa] border-b border-[#459443]/15 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: `${BASE}/2025/12/experienve.svg`,
                title: "Core Expertise",
                desc: "SMSF Structuring, Tax optimization and compliance strategies for Business & Individuals",
              },
              {
                img: `${BASE}/2025/12/trust.svg`,
                title: "Proven Track Record",
                desc: "Years of delivering proactive SMSF, Taxation & Business Advisory Solutions to Australian & Overseas clients",
              },
              {
                img: `${BASE}/2025/12/service.svg`,
                title: "Tailored Client Support",
                desc: "Personalised advice and consultations aligned with your super, investment and business needs.",
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-4 p-5 bg-white rounded-xl border border-[#459443]/10 hover:border-[#459443]/30 hover:shadow-sm transition-all">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-12 h-12 object-contain shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <div>
                  <h3 className="font-bold text-[#1a2e1a] text-base mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">
              SMSF Specialists & Financial Services
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3 mb-4">
              Individuals & Business (Small, Medium Or Large)
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              SMSF is what we do best. We also cover tax, business advisory, legal and AI-powered support — all under one roof.
            </p>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div key={service.title} variants={fadeUp}>
                <Link href="/services">
                  <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="overflow-hidden h-44 relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#1a2e1a]/30 group-hover:bg-[#1a2e1a]/10 transition-colors" />
                      <div className="absolute top-3 left-3">
                        <div className="w-9 h-9 bg-[#459443] rounded-lg flex items-center justify-center shadow-md">
                          <service.icon size={17} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-bold text-lg text-[#1a2e1a] mb-2 group-hover:text-[#459443] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed font-light flex-1">{service.description}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-[#459443] font-semibold text-sm group-hover:gap-3 transition-all">
                        Learn More <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Us with actual photo */}
      <section className="py-20 lg:py-28 bg-[#1a2e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3 mb-6">
                Our Expertise You Can Count On
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8 font-light">
                We are on a mission to make SMSFs & Tax matters simple, fast, and stress-free. Our friendly and professional team speaks your language and works around your schedule.
              </p>
              <ul className="space-y-4">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-[#459443] mt-0.5 shrink-0" />
                    <span className="text-white/80 text-sm font-light">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex gap-4">
                <Link href="/contact">
                  <button className="bg-[#459443] text-white px-6 py-3 rounded font-semibold hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2">
                    Contact Us <ArrowRight size={15} />
                  </button>
                </Link>
                <a href="tel:+61426784982">
                  <button className="border border-[#459443]/40 text-[#459443] px-6 py-3 rounded font-semibold hover:bg-[#459443]/10 transition-colors inline-flex items-center gap-2">
                    <Phone size={14} /> +61 426 784 982
                  </button>
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`${BASE}/2024/06/business-accountant.webp`}
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
                      <p className="text-white/60 text-xs">Speak to a specialist today — no obligation</p>
                    </div>
                    <Link href="/contact">
                      <button className="bg-[#459443] text-white text-xs px-4 py-2 rounded font-semibold hover:bg-[#3a7f38] transition-colors shrink-0">
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
                  <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                    <item.icon size={24} className="text-[#459443] mx-auto mb-2" />
                    <div className="text-white font-bold">{item.label}</div>
                    <div className="text-white/50 text-xs mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* How It Works */}
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
            ].map((step) => (
              <AnimatedSection key={step.num}>
                <div className="bg-white rounded-xl p-8 border border-[#459443]/20 hover:shadow-lg transition-shadow text-center h-full">
                  <div className="w-14 h-14 bg-[#459443] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.num}</span>
                  </div>
                  <div className="text-3xl mb-3">{step.emoji}</div>
                  <h3 className="font-bold text-xl text-[#1a2e1a] mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Client Testimonials</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3">
              What Our Clients Say About Us
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <AnimatedSection key={t.name}>
                <div className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[#459443] text-[#459443]" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5 italic font-light">
                    "{t.text}"
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-[#1a2e1a] text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Partners */}
      <section className="py-14 bg-[#fafffa] border-y border-[#459443]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-10">
              Our Finance Partners
            </h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-12 max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-65 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <AnimatedSection>
              <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Insights & News</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3">Latest from Our Blog</h2>
            </AnimatedSection>
            <AnimatedSection>
              <Link href="/blog">
                <button className="hidden md:flex items-center gap-2 text-[#459443] font-semibold hover:text-[#3a7f38] transition-colors">
                  All Articles <ArrowRight size={15} />
                </button>
              </Link>
            </AnimatedSection>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <AnimatedSection key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="bg-[#1a2e1a] p-7 flex-1">
                      <span className="inline-block bg-[#459443]/15 text-[#459443] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {post.category}
                      </span>
                      <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#459443] transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <div className="p-5">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 font-light">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#459443] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-white/80 text-lg mb-8 font-light">
              Speak with one of our SMSF and business advisory specialists. Your first consultation is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white text-[#459443] px-7 py-3.5 rounded font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                  Book Appointment <ArrowRight size={16} />
                </button>
              </Link>
              <a href="tel:+61426784982">
                <button className="border-2 border-white text-white px-7 py-3.5 rounded font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
                  <Phone size={16} /> +61 426 784 982
                </button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
