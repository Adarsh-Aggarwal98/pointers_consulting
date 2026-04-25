import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";

const BASE = "/images";

const allServices = [
  { slug: "smsf", title: "Self-Managed Superfund (SMSF)" },
  { slug: "business-advisory", title: "Business Advisory & Taxation" },
  { slug: "legal-compliance", title: "Legal Aid – Setups, Registrations & Compliance" },
  { slug: "assurance-risk", title: "Audit & Risk Assurance" },
];

const serviceData: Record<string, {
  title: string;
  image: string;
  intro: string;
  sections: { heading?: string; items?: string[]; body?: string }[];
}> = {
  smsf: {
    title: "Self-Managed Superfund",
    image: `${BASE}/smsf-400x239.jpg`,
    intro:
      "Your SMSF, expertly managed — compliant, strategic and future-focused. We are a one-stop shop for SMSF administration, audit defence and planning by specialists who simplify complexity, so you focus on growth.",
    sections: [
      {
        heading: "For Accountants & Finance Professionals",
        body: "Scale your practice: focus on core expertise while we handle complex SMSF management for your clients. Your relationships stay yours — seamless white-label support keeps you in control.",
        items: [
          "White-label SMSF administration services",
          "Compliance management and ATO lodgements",
          "Audit coordination and reporting",
          "Scalable capacity for growing practices",
        ],
      },
      {
        heading: "For Individuals",
        body: "Your one-stop SMSF solution: rely on our experts to simplify every requirement — from strategic planning to compliant administration and reporting, safeguarding your retirement with precision and peace of mind.",
        items: [
          "SMSF establishment and trust deed preparation",
          "Annual accounts and member statements",
          "Tax return preparation and lodgement",
          "Independent audit coordination",
          "Investment strategy development",
          "Contribution and pension calculations",
          "ATO correspondence management",
          "SMSF wind-up and rollover assistance",
        ],
      },
      {
        heading: "SMSF FitForMe Checkup",
        body: "Unlock clarity before committing: our pioneering assessment reveals if SMSF aligns with your goals, risk tolerance and lifestyle — delivering honest, data-driven insights from Australia's SMSF specialists to empower your decision.",
        items: [
          "Australia's first dual-assessment SMSF readiness tool",
          "Instant readiness score in minutes",
          "Personalised recommendations",
          "No obligation — fully free",
        ],
      },
    ],
  },
  "taxation-accounting": {
    title: "Taxation & Accounting",
    image: `${BASE}/legaldoc-400x239.jpg`,
    intro:
      "Forget generic tax preparation — get the big picture of your structure and finances. We dig into your complete financial picture and endeavour to bring you a competitive edge for long-term growth. We transform complex tax laws and rules into clear strategies that protect your wealth and uncover legitimate opportunities. With deep tax & SMSF expertise, we approach every tax return as a planning opportunity — ensuring ATO compliance while maximising your after-tax income for investments, family security or business growth.",
    sections: [
      {
        heading: "Few examples of simple yet thought-provoking tips:",
        items: [
          "Is my business structure supporting my growth expectations and is it tax efficient?",
          "Are all legitimate expenses and deductions being claimed?",
          "Have lodgements been timely done and are accurate as per ATO expectations?",
          "Is my property (or investment) portfolio working for me and for my retirement?",
          "Are there any BAS errors creating cashflow killers?",
          "Are my Trust distributions compliant or inviting ATO audits?",
          "Is my business ready for implementing 'pay day super' requirements?",
        ],
      },
      {
        heading: "Services offered:",
        items: [
          "Tax returns – Preparation & Lodgement",
          "Property & Investment Tax Planning",
          "Business Model & Cash Flow Planning",
          "Payroll Services",
          "Bookkeeping & Accounting",
          "BAS and GST preparation and lodgement",
          "Capital gains tax planning",
          "ATO audit support and representation",
          "Tax minimisation strategies",
          "International tax and double tax agreements",
          "Fringe benefits tax (FBT) compliance",
        ],
      },
    ],
  },
  "business-advisory": {
    title: "Business Advisory & Taxation",
    image: `${BASE}/57-400x239.jpg`,
    intro:
      "Business is quite a broad term, and Tax is just a sub-set of this broader framework. For most businesses and enterprises (irrespective of size), success depends on far more than lodging tax returns on time. They need clear strategy, the right structure, strong governance, operational clarity and the financial breathing space to grow. Our business advisory work is about bringing these elements together in a simple, actionable way for business owners and high net-worth individuals, along with tax compliance.",
    sections: [
      {
        heading: "Business Advisory",
        body: "Business decisions shouldn't be driven by guesswork or last-minute reactions. We focus on giving business owners, founders and self-employed individuals a clear view of where they are now, what is realistically possible next and how to move there in a measured, confident way.",
        items: [
          "Strategic planning, structuring and advisory for sole proprietors, business owners, self-employed individuals, entrepreneurs, investors and high net-worth individuals.",
          "Choice of right business structure and restructuring advice (company, trust, SMSF, JV) to balance asset protection, tax efficiency and future exit options.",
          "Business model validation, governance and structure planning, and high-level maturity assessment of operational and financial frameworks.",
          "Governance and board-style guidance for growing private businesses, including risk oversight, reporting frameworks and decision disciplines.",
          "Succession, sale-readiness and transition planning for founders and family businesses, from readiness reviews to roadmap design.",
        ],
      },
      {
        heading: "Taxation",
        body: "Forget generic tax preparation — get the big picture of your structure and finances. We dig into your complete financial picture and endeavour to bring you a competitive edge for long term growth. We transform complex tax laws and rules into clear strategies that protect your wealth and uncover legitimate opportunities.",
        items: [
          "Tax returns – Preparation & Lodgement",
          "Property & Investment Tax Planning",
          "Business Model & Cash Flow Planning",
          "Payroll Services",
          "Bookkeeping & Accounting",
          "BAS and GST preparation and lodgement",
          "Capital gains tax planning",
          "ATO audit support and representation",
          "Tax minimisation strategies",
        ],
      },
    ],
  },
  "assurance-risk": {
    title: "Audit & Risk Assurance",
    image: `${BASE}/audit-400x239.jpg`,
    intro:
      "We deliver strategic risk and assurance solutions through our proven E-R-S philosophy (Engage → Reassess → Solve). We help Australian businesses strengthen internal controls, mitigate threats and build stakeholder confidence — turning risk management from cost centre to competitive advantage.",
    sections: [
      {
        heading: "E-R-S in Action:",
        items: [
          "ENGAGE — Deep stakeholder workshops identify your real risks",
          "REASSESS — Rigorous control walkthroughs / control testing uncovers hidden vulnerabilities.",
          "SOLVE — Practical remediation plans with measurable outcomes.",
        ],
      },
      {
        heading: "Specialist services delivered through E-R-S:",
        items: [
          "Corporate Governance Advisory — ASX principles, director duties, board committee effectiveness — compliant and practical.",
          "Internal Audit & Advisory — Risk based audit planning and advisory targeting financial reporting, IT security, strategic, operational and/or process gaps. Issues found early, fixed efficiently.",
          "Risk Management Frameworks — Enterprise risk heat maps and mitigation strategies aligned to Australian governance standards.",
          "Internal Control Optimisation — Revenue, inventory, expense controls tested and strengthened per global standards.",
          "Compliance Health Checks — Pre-emptive ATO/ASIC reviews fixing gaps before audits strike.",
        ],
      },
    ],
  },
  "legal-compliance": {
    title: "Legal Aid – Setups, Registrations & Compliance",
    image: `${BASE}/company-taxreturn-400x239.jpg`,
    intro:
      "We provide fast-track legal aid for Australian business registrations, entity formation and ongoing compliance — plus specialist guidance for international businesses establishing Australian presence. From sole traders to multinationals, we handle the paperwork, so you launch confidently and stay compliant.",
    sections: [
      {
        heading: "Services include:",
        items: [
          "Business Structure Setup — Sole trader, company, trust formation with tax optimisation",
          "ABN/TFN/GST Registrations — Instant applications across all entity types",
          "ASIC Company Lodgements — Pty Ltd formation, director appointments, annual reviews etc.",
          "Legal Documentation — Business sale & purchase Agreements, Partnership Agreements, Joint Venture Agreements and much more.",
        ],
      },
    ],
  },
};

export default function ServiceDetail() {
  const [, params] = useRoute("/services/:slug");
  const slug = params?.slug ?? "";
  const data = serviceData[slug];

  useEffect(() => {
    document.title = data
      ? `${data.title} | Pointers Consulting`
      : "Service | Pointers Consulting";
    window.scrollTo(0, 0);
  }, [slug, data]);

  if (!data) {
    return (
      <div className="pt-40 text-center py-20">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Service not found</h2>
        <Link href="/services">
          <button className="mt-6 bg-[#459443] text-white px-6 py-3 rounded font-semibold">
            Back to Services
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section
        className="relative pt-44 pb-14 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.title}</h1>
          <p className="text-white text-sm">
            <Link href="/"><span className="hover:text-white cursor-pointer transition-colors">Home</span></Link>
            {" > "}
            <Link href="/services"><span className="hover:text-white cursor-pointer transition-colors">Services</span></Link>
            {" > "}{data.title}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Left Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Services Nav */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-[#459443] px-5 py-3">
                  <h3 className="text-white font-bold text-sm">Services</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {allServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`}>
                        <div className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors hover:bg-gray-50 ${
                          s.slug === slug ? "text-[#459443] font-semibold" : "text-[#0a0a0a]"
                        }`}>
                          <CheckCircle
                            size={16}
                            className={s.slug === slug ? "text-[#459443]" : "text-gray-300"}
                          />
                          <span className="text-sm">{s.title}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Appointment Widget */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-[#459443] font-bold text-lg mb-2">Book an Appointment</h3>
                <p className="text-[#0a0a0a] text-sm mb-5 font-normal">
                  Schedule a free 30 minutes consultation call with our professional
                </p>
                <Link href="/contact">
                  <button className="w-full bg-[#459443] text-white py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors">
                    Book Appointment
                  </button>
                </Link>
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                  <a href="tel:+61426784982" className="flex items-center gap-3 text-sm text-[#0a0a0a] hover:text-[#459443] transition-colors">
                    <Phone size={15} className="text-[#459443]" />
                    +61 426 784 982
                  </a>
                  <a href="mailto:sam@pointersconsulting.com.au" className="flex items-center gap-3 text-sm text-[#0a0a0a] hover:text-[#459443] transition-colors">
                    <Mail size={15} className="text-[#459443]" />
                    sam@pointersconsulting.com.au
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-64 object-cover rounded-lg mb-7"
              />

              <h2 className="text-2xl font-bold text-[#1a2e1a] mb-4">{data.title}</h2>
              <p className="text-[#0a0a0a] text-sm leading-relaxed mb-8 font-normal">{data.intro}</p>

              {data.sections.map((section, i) => (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h3 className="text-sm font-bold text-[#1a2e1a] mb-4">{section.heading}</h3>
                  )}
                  {section.body && (
                    <p className="text-[#0a0a0a] text-sm leading-relaxed mb-4 font-normal">{section.body}</p>
                  )}
                  {section.items && (
                    <ul className="space-y-2.5">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-[#459443] mt-0.5 shrink-0" />
                          <span className="text-[#0a0a0a] text-sm font-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <p className="text-[#459443] font-semibold text-sm mt-6">
                Need Consultation?{" "}
                <Link href="/contact">
                  <span className="underline cursor-pointer hover:text-[#3a7f38] transition-colors">
                    Please call us now to find out more about our services.
                  </span>
                </Link>
              </p>

              <Link href="/contact">
                <button className="mt-6 bg-[#459443] text-white px-7 py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2">
                  Book a Free Consultation <ArrowRight size={15} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
