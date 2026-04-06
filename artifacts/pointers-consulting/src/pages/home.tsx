import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  FileText,
  Building2,
  BarChart3,
} from "lucide-react";
import { blogPosts } from "@/data/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const services = [
  {
    icon: Shield,
    title: "Self-Managed Superfund",
    description: "Your SMSF, expertly managed — compliant, strategic and future-focused. One-stop shop for administration, audit defence and planning.",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
    href: "/services",
  },
  {
    icon: FileText,
    title: "Taxation & Accounting",
    description: "Tax and accounting that optimises, not just complies. Precision returns, bookkeeping and advisory to minimise liability.",
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
    href: "/services",
  },
  {
    icon: Building2,
    title: "Business Advisory",
    description: "Strategic guidance that turns numbers into growth. Clear planning, structuring and governance advice for business owners.",
    image: `${BASE}/2026/01/57-400x239.jpg`,
    href: "/services",
  },
  {
    icon: BarChart3,
    title: "Assurance & Risk",
    description: "Strengthen your controls with independent, practical assurance. Value & Risk Based Internal audits and risk reviews.",
    image: `${BASE}/2021/10/audit-400x239.jpg`,
    href: "/services",
  },
  {
    icon: FileText,
    title: "Legal — Setups & Registrations",
    description: "Fast, compliant setups and registrations without the hassle. Company formation, ABN/TFN, ASIC lodgements and ongoing governance.",
    image: `${BASE}/2022/07/company-taxreturn-400x239.jpg`,
    href: "/services",
  },
  {
    icon: TrendingUp,
    title: "AI Business Support Hub",
    description: "Extra capacity and smarter systems, without the headcount. Virtual CFO support, specialist staffing or custom AI automation.",
    image: `${BASE}/2026/01/673-400x239.jpg`,
    href: "/services",
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
  useEffect(() => {
    document.title = "Pointers Consulting | SMSF & Business Advisory Specialists";
  }, []);

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-[#1a2e1a] pt-36 pb-0 overflow-hidden min-h-[580px]">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 right-0 w-[55%] h-full opacity-20 hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a] to-transparent z-10" />
            <img
              src={`${BASE}/2024/06/business-accountant.webp`}
              alt="Business Accountant"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #459443 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[#459443]/10 border border-[#459443]/30 rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#459443]" />
              <span className="text-[#459443] text-xs font-medium uppercase tracking-wider">
                Australia's SMSF Specialists
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Client Service That
              <br />
              <span style={{ color: "#459443" }}>Hits The Mark</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg lg:text-xl leading-relaxed mb-10 font-light"
            >
              We are on a mission to make SMSFs & Tax matters simple, fast, and stress-free. Our friendly and professional team is here to help — we speak your language and process most returns within 48 hours.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <button className="bg-[#459443] text-white px-7 py-3.5 rounded font-semibold text-base hover:bg-[#3a7f38] transition-colors flex items-center gap-2 justify-center">
                  Book Appointment
                  <ArrowRight size={17} />
                </button>
              </Link>
              <a href="tel:+61426784982">
                <button className="border border-white/20 text-white px-7 py-3.5 rounded font-semibold text-base hover:border-white/40 hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                  <Phone size={16} />
                  +61 426 784 982
                </button>
              </a>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-1" style={{ color: "#459443" }}>
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SMSF Promo Banner */}
      <section className="bg-[#fafffa] border-b border-[#459443]/20 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#1a2e1a] mb-2">
                Is SMSF Right for You?
              </h2>
              <p className="text-gray-600 font-light">
                Take the Free SMSF FitForMe Checkup — Australia's first of its kind, dual-assessment online tool. Get your instant SMSF readiness score in minutes.
              </p>
            </div>
            <Link href="/contact">
              <button className="bg-[#459443] text-white px-8 py-3.5 rounded font-semibold hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2 shrink-0">
                Start Now
                <ArrowRight size={16} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">
              Our Expertise
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3 mb-4">
              Services For All
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-light">
              Individuals & Business — Small, Medium or Large. From SMSF administration to AI-powered support, we cover everything you need.
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
              <motion.div
                key={service.title}
                variants={fadeUp}
              >
                <Link href={service.href}>
                  <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="overflow-hidden h-44 relative">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#1a2e1a]/40 group-hover:bg-[#1a2e1a]/20 transition-colors" />
                      <div className="absolute top-4 left-4">
                        <div className="w-9 h-9 bg-[#459443] rounded-lg flex items-center justify-center">
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
                        Learn More
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/services">
              <button className="bg-[#1a2e1a] text-white px-7 py-3.5 rounded font-semibold hover:bg-[#243d24] transition-colors inline-flex items-center gap-2">
                View All Services
                <ArrowRight size={16} />
              </button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 lg:py-28 bg-[#1a2e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
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
              {/* Business accountant photo */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={`${BASE}/2024/06/business-accountant.webp`}
                  alt="Professional Business Accountant"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1a2e1a] to-transparent p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#459443] rounded-full flex items-center justify-center">
                      <Users size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Free Initial Consultation</p>
                      <p className="text-white/60 text-xs">Speak to a specialist today</p>
                    </div>
                    <Link href="/contact">
                      <button className="ml-auto bg-[#459443] text-white text-xs px-4 py-2 rounded font-semibold hover:bg-[#3a7f38] transition-colors">
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
                  <div key={item.label} className="bg-white/5 border border-white/10 rounded-xl p-5 text-center hover:bg-white/8 transition-colors">
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
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">
              How It Works
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3 mb-2">
              Simple Steps, Maximum Results, Zero Stress
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { num: "01", icon: "📅", title: "Book Appointment", desc: "Select the service you need and schedule your free appointment at your preferred time." },
              { num: "02", icon: "📞", title: "Consult With Expert", desc: "Our professional connects with you, reviews details, and plans the best solution." },
              { num: "03", icon: "✅", title: "Relax & Get Results", desc: "Sit back while we complete the work and deliver results quickly and securely." },
            ].map((step) => (
              <AnimatedSection key={step.num}>
                <div className="bg-white rounded-xl p-8 border border-[#459443]/20 hover:shadow-lg transition-shadow text-center h-full">
                  <div className="w-14 h-14 bg-[#459443] rounded-full flex items-center justify-center mx-auto mb-5">
                    <span className="text-white font-bold text-lg">{step.num}</span>
                  </div>
                  <div className="text-3xl mb-3">{step.icon}</div>
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
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">
              Client Testimonials
            </span>
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
          <AnimatedSection className="text-center mb-10">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              Our Finance Partners
            </h2>
          </AnimatedSection>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-12 max-w-[140px] object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
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
              <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">
                Insights & News
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3">
                Latest from Our Blog
              </h2>
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
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4 font-light">
                        {post.excerpt}
                      </p>
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
