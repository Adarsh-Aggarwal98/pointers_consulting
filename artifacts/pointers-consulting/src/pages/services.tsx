import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Users } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const services = [
  {
    title: "Self-Managed Superfund",
    description:
      "Your SMSF, expertly managed — compliant, strategic and future-focused. One-stop shop for SMSF administration, audit defence and planning by specialists who simplify complexity, so you focus on growth.",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
    href: "/services/smsf",
  },
  {
    title: "Taxation & Accounting",
    description:
      "Tax and accounting that optimises, not just complies. Precision returns, bookkeeping and advisory to minimise liability, maximise deductions and keep your numbers clear and current.",
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
    href: "/services/taxation-accounting",
  },
  {
    title: "Business Advisory",
    description:
      "Strategic guidance that turns numbers into growth. Clear planning, structuring and governance advice for business owners, startups and global clients — helping you balance risk, opportunity and execution with confidence.",
    image: `${BASE}/2026/01/57-400x239.jpg`,
    href: "/services/business-advisory",
  },
  {
    title: "Assurance & Risk",
    description:
      "Strengthen your controls with independent, practical assurance. Value & Risk Based Internal audits, risk reviews and compliance checks that protect value, uncover blind spots and build confidence for growth.",
    image: `${BASE}/2021/10/audit-400x239.jpg`,
    href: "/services/assurance-risk",
  },
  {
    title: "Legal — Setups, Registrations & Compliance",
    description:
      "Fast, compliant setups and registrations without the hassle. Whether it's company formation, ABN/TFN, ASIC lodgements and ongoing governance — delivered by experts who handle the details onshore.",
    image: `${BASE}/2022/07/company-taxreturn-400x239.jpg`,
    href: "/services/legal-compliance",
  },
  {
    title: "AI-Powered Business Support Hub",
    description:
      "Extra capacity and smarter systems, without the headcount. Virtual CFO support, specialist staffing or custom AI automation — freeing accountants and businesses to focus on clients and growth with seamless, secure delivery.",
    image: `${BASE}/2026/01/673-400x239.jpg`,
    href: "/services/ai-business-hub",
  },
];

const LOGO_BASE = "https://pointersconsulting.com.au/wp-content/uploads";
const partners = [
  { src: `${LOGO_BASE}/2025/12/jpatax-logo.png`, alt: "JPATAX", label: "Authorised Representative of" },
  { src: `${LOGO_BASE}/2025/12/tax-board.png`, alt: "Tax Practitioners Board", label: "Registered Tax Agent: 26122730" },
  { src: `${LOGO_BASE}/2025/12/cpa-australia.png`, alt: "CPA Australia", label: "" },
  { src: `${LOGO_BASE}/2025/12/asic.png`, alt: "ASIC", label: "Registered ASIC Agent" },
  { src: `${LOGO_BASE}/2025/12/smsf-association.png`, alt: "SMSF Association", label: "" },
];

export default function Services() {
  useEffect(() => {
    document.title = "Services | Pointers Consulting";
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Page Header */}
      <section
        className="relative pt-36 pb-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE}/2021/10/legaldoc-400x239.jpg)` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">Our Services</h1>
            <p className="text-white/60 text-sm">
              <Link href="/">
                <span className="hover:text-white transition-colors cursor-pointer">Home</span>
              </Link>
              {" > "}Our Services
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-2">Services For All</h2>
            <p className="text-gray-500 text-sm">Individuals &amp; Business (Small, Medium Or Large)</p>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 text-center flex flex-col items-center">
                  <h3 className="text-lg font-bold text-[#1a2e1a] mb-3 leading-snug">{service.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">{service.description}</p>
                  <Link href={service.href}>
                    <button className="bg-[#1a2e1a] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#459443] transition-colors">
                      Learn More
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Finance Partners */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#459443] text-center mb-10">Our Finance Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {partners.map((p) => (
              <div key={p.alt} className="flex flex-col items-center gap-2">
                <img
                  src={p.src}
                  alt={p.alt}
                  className="h-16 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
                />
                {p.label && <p className="text-xs text-gray-500 text-center uppercase tracking-wide">{p.label}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#459443] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users size={36} className="text-white/80 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">Not sure which service you need?</h2>
          <p className="text-white/80 text-lg mb-7 font-light">
            Talk to our team for free and we'll help determine the best approach for your situation.
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
        </div>
      </section>
    </div>
  );
}
