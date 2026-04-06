import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  Shield,
  FileText,
  TrendingUp,
  BarChart3,
  Building2,
  PiggyBank,
  CheckCircle,
  ArrowRight,
  Phone,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const smsfServices = [
  {
    icon: Shield,
    title: "SMSF Setup & Establishment",
    features: [
      "Trust deed preparation and execution",
      "ATO registration and ABN application",
      "Bank account and investment account setup",
      "Corporate trustee establishment (if required)",
      "Member rollover coordination",
      "Initial investment strategy documentation",
    ],
    description:
      "Setting up an SMSF correctly from the start is critical. We handle every aspect of the establishment process, ensuring your fund is structured optimally for your retirement goals and compliant with superannuation legislation from day one.",
  },
  {
    icon: FileText,
    title: "SMSF Compliance & Audit",
    features: [
      "Annual financial statement preparation",
      "Independent audit by registered SMSF auditors",
      "ATO annual return lodgement",
      "Compliance health checks and reviews",
      "ATO correspondence management",
      "Rectification of compliance issues",
    ],
    description:
      "SMSF compliance is non-negotiable. Our team of registered SMSF auditors and compliance specialists ensure your fund meets all annual obligations, keeping you fully compliant with the ATO and protected from penalties.",
  },
  {
    icon: TrendingUp,
    title: "SMSF Investment Strategy",
    features: [
      "Tailored investment strategy documentation",
      "Asset allocation advice and review",
      "Direct property acquisition guidance",
      "Limited recourse borrowing arrangement (LRBA) setup",
      "Listed and unlisted investment structuring",
      "Pension phase transition planning",
    ],
    description:
      "A well-crafted investment strategy is the cornerstone of a successful SMSF. We work with you to develop and document a strategy that reflects your risk tolerance, retirement timeline, and the full range of assets available to SMSFs.",
  },
];

const businessServices = [
  {
    icon: BarChart3,
    title: "Business Tax Planning & Compliance",
    features: [
      "Proactive year-round tax planning",
      "Corporate tax return preparation",
      "GST compliance and BAS lodgement",
      "Fringe Benefits Tax (FBT) management",
      "R&D tax incentive applications",
      "ATO audit support and representation",
    ],
    description:
      "Tax is one of the largest costs your business faces. Our proactive approach to tax planning — not just compliance — can generate significant savings while keeping you completely compliant with the ATO's requirements.",
  },
  {
    icon: Building2,
    title: "Business Advisory & Consulting",
    features: [
      "Business structuring and restructuring",
      "Succession planning and exit strategies",
      "Business acquisition due diligence",
      "Cash flow forecasting and budgeting",
      "KPI development and performance monitoring",
      "Strategic planning facilitation",
    ],
    description:
      "Beyond compliance, we work as strategic partners to help your business grow, become more profitable, and ultimately succeed on your terms. Our advisers have real-world experience running and advising Australian businesses.",
  },
  {
    icon: PiggyBank,
    title: "Financial Planning & Superannuation",
    features: [
      "Personal superannuation strategy",
      "Retirement income planning",
      "Insurance needs analysis",
      "Estate planning coordination",
      "Centrelink and aged care planning",
      "Investment portfolio reviews",
    ],
    description:
      "Retirement planning is a long game that requires a comprehensive, integrated approach. We bring together superannuation, investment, insurance, and estate planning into a coherent strategy that works toward your specific retirement vision.",
  },
];

export default function Services() {
  useEffect(() => {
    document.title = "Services | Pointers Consulting — SMSF & Business Advisory";
  }, []);

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Header */}
      <section className="bg-[hsl(222,47%,11%)] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-[hsl(43,100%,50%)] font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mt-3 mb-5">
              Our Services
            </h1>
            <p className="text-white/70 text-xl leading-relaxed">
              Specialist SMSF administration and business advisory services, delivered by experienced Australian professionals who understand the complexity of your financial world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* SMSF Services */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[hsl(222,47%,11%)/8%] rounded-full px-4 py-1.5 mb-4">
              <Shield size={14} className="text-[hsl(222,47%,11%)]" />
              <span className="text-[hsl(222,47%,11%)] text-xs font-semibold uppercase tracking-wider">
                SMSF Services
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)]">
              Self-Managed Super Fund Services
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {smsfServices.map((service, i) => (
              <AnimatedSection key={service.title}>
                <div className="grid lg:grid-cols-2 gap-8 p-8 border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[hsl(222,47%,11%)] rounded-lg flex items-center justify-center">
                        <service.icon size={18} className="text-[hsl(43,100%,50%)]" />
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[hsl(222,47%,11%)]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle size={15} className="text-[hsl(43,100%,45%)] mt-0.5 shrink-0" />
                          <span className="text-gray-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-20 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <div className="inline-flex items-center gap-2 bg-[hsl(222,47%,11%)/8%] rounded-full px-4 py-1.5 mb-4">
              <Building2 size={14} className="text-[hsl(222,47%,11%)]" />
              <span className="text-[hsl(222,47%,11%)] text-xs font-semibold uppercase tracking-wider">
                Business Services
              </span>
            </div>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)]">
              Business Advisory & Tax Services
            </h2>
          </AnimatedSection>

          <div className="space-y-8">
            {businessServices.map((service, i) => (
              <AnimatedSection key={service.title}>
                <div className="grid lg:grid-cols-2 gap-8 p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-md transition-shadow">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-[hsl(222,47%,11%)] rounded-lg flex items-center justify-center">
                        <service.icon size={18} className="text-[hsl(43,100%,50%)]" />
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[hsl(222,47%,11%)]">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                  <div>
                    <ul className="space-y-3">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <CheckCircle size={15} className="text-[hsl(43,100%,45%)] mt-0.5 shrink-0" />
                          <span className="text-gray-700 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[hsl(222,47%,11%)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold text-white mb-4">
              Not Sure Which Service Is Right for You?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Book a free 30-minute consultation and we'll help you identify exactly what support you need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-[hsl(43,100%,50%)] text-[hsl(222,47%,11%)] px-7 py-3.5 rounded font-semibold hover:bg-[hsl(43,100%,45%)] transition-colors inline-flex items-center gap-2">
                  Book a Free Consultation
                  <ArrowRight size={16} />
                </button>
              </Link>
              <a href="tel:+61398001234">
                <button className="border border-white/20 text-white px-7 py-3.5 rounded font-semibold hover:border-white/40 hover:bg-white/5 transition-colors inline-flex items-center gap-2">
                  <Phone size={15} />
                  (03) 9800 1234
                </button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
