import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Users, Shield, Building2, FileText, BarChart3, Calculator, CheckCircle } from "lucide-react";

const springCard = {
  hidden: { opacity: 0, y: 36, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 22 },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.09 } },
};

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const specialistServices = [
  {
    icon: Shield,
    title: "Self-Managed Super Fund (SMSF)",
    description:
      "SMSFs are not just another tax job. They are highly regulated structures with their own legislation, rules and obligations, and at the same time, SMSF serves the purpose of a long-term investment vessel for one's retirement. SMSF compliance is complex because trustees must manage both taxation requirements and superannuation law, and the penalties for getting it wrong can be significant. This is where we come in as Specialists — helping individual trustees and Accountants navigate the complexity with clarity and confidence.",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
    href: "/services/smsf",
    tags: ["B2B – For Accountants", "B2C – For Individual Trustees"],
    highlight: true,
  },
  {
    icon: Building2,
    title: "Business Advisory & Taxation",
    description:
      "\"Business\" is quite a broad term, and \"Tax\" is just a sub-set of this broader framework. For most businesses, success depends on far more than lodging tax returns on time. We bring clear strategy, the right structure, strong governance, operational clarity and tax compliance together in a simple, actionable way for business owners and high net-worth individuals.",
    image: `${BASE}/2026/01/57-400x239.jpg`,
    href: "/services/business-advisory",
    tags: [],
    subList: [
      "Business — SME, Corporates, Family Offices",
      "Self-Employed Professionals (Medical, Lawyers, Tradies, Mortgage Brokers)",
      "Investors — Real Estate, Shares, Cryptos",
    ],
    highlight: false,
  },
];

const otherServices = [
  {
    icon: FileText,
    title: "Legal Aid – Setups, Registrations & Compliance",
    description:
      "We provide fast-track legal aid for Australian business registrations, entity formation and ongoing compliance — plus specialist guidance for international businesses establishing Australian presence. From sole traders to multinationals, we handle the paperwork so you launch confidently and stay compliant.",
    image: `${BASE}/2022/07/company-taxreturn-400x239.jpg`,
    href: "/services/legal-compliance",
  },
  {
    icon: BarChart3,
    title: "Audit & Risk Assurance",
    description:
      "We deliver strategic risk and assurance solutions through our proven E-R-S philosophy (Engage → Reassess → Solve). We help Australian businesses strengthen internal controls, mitigate threats and build stakeholder confidence — turning risk management from cost centre to competitive advantage.",
    image: `${BASE}/2021/10/audit-400x239.jpg`,
    href: "/services/assurance-risk",
  },
];

const partners = [
  { name: "CPA Australia", src: `${BASE}/2026/01/cpa-2025-logo.jpg` },
  { name: "ASIC Registered Agent", src: `${BASE}/2026/01/asic-registerd-agent-logo-20205.jpg` },
  { name: "SMSF Association", src: `${BASE}/2026/01/sms-assocation.jpg` },
  { name: "Xero Partner", src: `${BASE}/2026/01/xero-logo-20205.jpg` },
  { name: "JPATAX", src: `${BASE}/2026/01/jpatax-logo-2025.jpg` },
  { name: "Tax Practitioners Board", src: `${BASE}/2026/01/tax-board-2025-logo.jpg` },
];

export default function Services() {
  useEffect(() => {
    document.title = "SMSF & Financial Services | Pointers Consulting — SMSF Specialists";
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Page Header */}
      <section
        className="relative pt-44 pb-16 bg-cover bg-top"
        style={{ backgroundImage: `url(${BASE}/2021/10/smsf-400x239.jpg)` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block bg-[#459443] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
              Australia's SMSF Specialists
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight">Our Services</h1>
            <p className="text-white text-sm mb-3 max-w-xl font-normal leading-relaxed">
              SMSF administration and compliance is our core speciality. We also provide tax, business advisory, legal and assurance — all under one roof.
            </p>
            <p className="text-white text-sm">
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
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">SMSF Specialists & More</span>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mt-2 mb-2">Services For Individuals & Business</h2>
            <p className="text-[#0a0a0a] text-sm max-w-2xl mx-auto leading-relaxed">
              We are Australia's trusted SMSF specialists. Beyond super, we cover tax, business advisory, legal and assurance — everything you need, from one expert team.
            </p>
          </div>

          {/* Specialist Services — Row Layout */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-0.5 w-8 bg-[#459443]" />
            <span className="text-[#459443] font-bold text-sm uppercase tracking-widest">Specialist Services</span>
            <div className="h-0.5 flex-1 bg-[#459443]/20" />
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12"
          >
            {specialistServices.map((service) => (
              <motion.div
                key={service.title}
                variants={springCard}
                className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#459443]/25 transition-all duration-300 flex flex-col"
              >
                <Link href={service.href} className="flex flex-col h-full">
                  {/* Image */}
                  <div className="relative h-44 shrink-0 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-[#1a2e1a]/35 group-hover:bg-[#1a2e1a]/15 transition-colors" />
                    <div className="absolute top-3 left-3">
                      <div className="w-9 h-9 bg-[#459443] rounded-xl flex items-center justify-center shadow-lg shadow-[#459443]/30">
                        <service.icon size={17} className="text-white" />
                      </div>
                    </div>
                    {service.highlight && (
                      <div className="absolute bottom-3 left-3">
                        <span className="bg-[#459443] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Specialist
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 px-6 py-5 flex flex-col">
                    <h3 className="text-[17px] font-bold text-[#1a2e1a] group-hover:text-[#459443] transition-colors leading-snug mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[#0a0a0a] text-sm leading-relaxed font-normal flex-1">{service.description}</p>
                    {"subList" in service && service.subList && service.subList.length > 0 && (
                      <ul className="mt-2.5 space-y-1">
                        {service.subList.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-[#459443] shrink-0" />
                            <span className="text-[#0a0a0a] text-xs font-normal">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[#459443] font-semibold text-sm mt-4 group-hover:gap-3 transition-all">
                      Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Other Services — Row Layout */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-0.5 w-8 bg-[#1a2e1a]" />
            <span className="text-[#1a2e1a] font-bold text-sm uppercase tracking-widest">Other Services</span>
            <div className="h-0.5 flex-1 bg-gray-200" />
          </div>
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {otherServices.map((service) => (
              <motion.div
                key={service.title}
                variants={springCard}
                className="group border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:border-[#459443]/25 transition-all duration-300"
              >
                <Link href={service.href}>
                  <div className="flex flex-col sm:flex-row items-stretch cursor-pointer">
                    <div className="relative sm:w-52 h-36 sm:h-auto shrink-0 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#1a2e1a]/35 group-hover:bg-[#1a2e1a]/15 transition-colors" />
                      <div className="absolute top-3 left-3">
                        <div className="w-9 h-9 bg-[#1a2e1a] rounded-xl flex items-center justify-center shadow-md">
                          <service.icon size={17} className="text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 px-6 py-5 flex flex-col justify-center">
                      <h3 className="text-[17px] font-bold text-[#1a2e1a] mb-2 group-hover:text-[#459443] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-[#0a0a0a] text-sm leading-relaxed font-normal line-clamp-3">{service.description}</p>
                    </div>
                    <div className="px-6 py-5 flex items-center justify-end sm:justify-center shrink-0">
                      <span className="inline-flex items-center gap-1.5 text-[#459443] font-semibold text-sm whitespace-nowrap group-hover:gap-3 transition-all">
                        Learn More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Finance Partners */}
      <section className="py-14 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-[#0a0a0a] uppercase tracking-widest text-center mb-10">Our Finance Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.08 }}
                className="flex items-center justify-center"
              >
                <img
                  src={p.src}
                  alt={p.name}
                  className="h-20 max-w-[200px] object-contain transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#459443] py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users size={36} className="text-white mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">Not sure which service you need?</h2>
          <p className="text-white text-lg mb-7 font-normal">
            Talk to our team for free and we'll help determine the best approach for your situation.
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
        </div>
      </section>
    </div>
  );
}
