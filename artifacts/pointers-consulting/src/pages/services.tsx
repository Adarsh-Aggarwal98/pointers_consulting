import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Shield,
  FileText,
  BarChart3,
  Building2,
  ArrowRight,
  CheckCircle,
  Users,
  Phone,
  Bot,
  Scale,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const services = [
  {
    icon: Shield,
    title: "Self-Managed Superfund (SMSF)",
    shortDesc: "Your SMSF, expertly managed — compliant, strategic and future-focused.",
    description:
      "One-stop shop for SMSF administration, audit defence and planning by specialists who simplify complexity, so you focus on growth.",
    features: [
      "SMSF establishment and trust deed preparation",
      "Annual accounts and member statements",
      "Tax return preparation and lodgement",
      "Independent audit coordination",
      "Investment strategy development",
      "Contribution and pension calculations",
      "ATO correspondence management",
      "SMSF wind-up and rollover assistance",
    ],
    accent: "#459443",
  },
  {
    icon: FileText,
    title: "Taxation & Accounting",
    shortDesc: "Tax and accounting that optimises, not just complies.",
    description:
      "Precision returns, bookkeeping and advisory to minimise liability, maximise deductions and keep your numbers clear and current.",
    features: [
      "Individual and business income tax returns",
      "BAS and GST preparation",
      "Payroll and PAYG management",
      "Negative gearing and investment property advice",
      "Capital gains tax planning",
      "International tax and double tax agreements",
      "ATO audit support and representation",
      "Bookkeeping and Xero/MYOB setup",
    ],
    accent: "#0ba7a9",
  },
  {
    icon: Building2,
    title: "Business Advisory",
    shortDesc: "Strategic guidance that turns numbers into growth.",
    description:
      "Clear planning, structuring and governance advice for business owners, startups and global clients — helping you balance risk, opportunity and execution.",
    features: [
      "Business structure and entity setup",
      "Strategic business planning",
      "Cash flow forecasting and budgeting",
      "Business valuations and due diligence",
      "Succession planning and exit strategies",
      "Management reporting and KPI frameworks",
      "CFO services for SMEs",
      "Growth strategy and capital raising support",
    ],
    accent: "#459443",
  },
  {
    icon: BarChart3,
    title: "Assurance & Risk",
    shortDesc: "Strengthen your controls with independent, practical assurance.",
    description:
      "Value & Risk Based Internal audits, risk reviews and compliance checks that protect value, uncover blind spots and build confidence for growth.",
    features: [
      "Internal audit engagements",
      "Risk assessment and management frameworks",
      "Compliance reviews and gap analysis",
      "Control environment testing",
      "Fraud risk assessments",
      "Regulatory compliance reviews",
      "Board and audit committee reporting",
      "Process improvement recommendations",
    ],
    accent: "#0ba7a9",
  },
  {
    icon: Scale,
    title: "Legal — Setups, Registrations & Compliance",
    shortDesc: "Fast, compliant setups and registrations without the hassle.",
    description:
      "Whether it's company formation, ABN/TFN, ASIC lodgements and ongoing governance — delivered by experts who handle the details onshore.",
    features: [
      "Company and trust establishment",
      "ABN, TFN and GST registration",
      "ASIC lodgements and compliance",
      "Corporate secretarial services",
      "Business name registrations",
      "Partnership and JV agreements",
      "Discretionary and unit trust deeds",
      "Ongoing governance and minutes",
    ],
    accent: "#459443",
  },
  {
    icon: Bot,
    title: "AI-Powered Business Support Hub",
    shortDesc: "Extra capacity and smarter systems, without the headcount.",
    description:
      "Virtual CFO support, specialist staffing or custom AI automation — freeing accountants and businesses to focus on clients and growth with seamless, secure delivery.",
    features: [
      "Virtual CFO and bookkeeping support",
      "AI-powered workflow automation",
      "Custom AI tool development",
      "Offshore staffing solutions",
      "Process documentation and SOPs",
      "Data analytics and reporting",
      "Technology stack optimisation",
      "Ongoing managed support packages",
    ],
    accent: "#0ba7a9",
  },
];

export default function Services() {
  useEffect(() => {
    document.title = "Services | Pointers Consulting";
  }, []);

  return (
    <div className="overflow-x-hidden">
      <section className="bg-[#1a2e1a] pt-36 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Our Services</h1>
            <p className="text-white/70 text-xl max-w-2xl font-light">
              Comprehensive SMSF, accounting, business advisory and legal services for individuals and businesses across Australia.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="grid lg:grid-cols-5">
                  <div
                    className="p-8 lg:p-10 flex flex-col justify-between lg:col-span-2"
                    style={{ backgroundColor: service.accent }}
                  >
                    <div>
                      <service.icon size={36} className="text-white mb-5 opacity-90" />
                      <h2 className="text-2xl font-bold text-white mb-3">{service.title}</h2>
                      <p className="text-white/85 text-base font-light mb-3">{service.shortDesc}</p>
                      <p className="text-white/70 text-sm leading-relaxed font-light">{service.description}</p>
                    </div>
                    <Link href="/contact">
                      <div className="mt-6 inline-flex items-center gap-2 text-white font-semibold text-sm bg-white/15 hover:bg-white/25 px-4 py-2.5 rounded transition-colors cursor-pointer">
                        Get Started <ArrowRight size={14} />
                      </div>
                    </Link>
                  </div>
                  <div className="p-8 lg:p-10 bg-white lg:col-span-3">
                    <h3 className="font-bold text-[#1a2e1a] mb-5 text-lg">What's Included</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle size={16} className="mt-0.5 shrink-0" style={{ color: service.accent }} />
                          <span className="text-gray-700 text-sm font-light">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#459443] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users size={36} className="text-white/80 mx-auto mb-5" />
          <h2 className="text-3xl font-bold text-white mb-4">Not sure which service you need?</h2>
          <p className="text-white/80 text-lg mb-8 font-light">
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
