import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { CheckCircle, Phone, Mail } from "lucide-react";

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const sidebarServices = [
  { slug: "/services/smsf", title: "Self-Managed Superfund", children: [
    { slug: "/services/smsf/for-accountants", title: "For Accountants/ finance professionals" },
    { slug: "/services/smsf/for-individuals", title: "For Individuals" },
    { slug: "/services/smsf/fitforme", title: "SMSF FitForMe Checkup" },
  ]},
  { slug: "/services/taxation-accounting", title: "Taxation & Accounting" },
  { slug: "/services/business-advisory", title: "Business Advisory" },
  { slug: "/services/assurance-risk", title: "Assurance & Risk" },
  { slug: "/services/legal-compliance", title: "Legal — Setups, Registrations & Compliance" },
  { slug: "/services/ai-business-hub", title: "AI-Powered Business Support Hub" },
];

const subPageData: Record<string, {
  title: string;
  image: string;
  heroTitle: string;
  intro: string;
  sections: { heading: string; items: string[] }[];
  closing?: string;
}> = {
  "for-accountants": {
    title: "For Accountants/ finance professionals",
    heroTitle: "For Accountants/ finance professionals",
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
    intro:
      "Elevate your SMSF offering without carrying all the risk.\n\nWe are the experts in partnering with Australian accounting practices to deliver specialist SMSF services under your brand. White label SMSF administration, compliance reviews and technical support let you serve SMSF clients confidently while focusing on core advisory relationships.",
    sections: [
      {
        heading: "Why Us:",
        items: [
          "Revenue protection model: Retain your advisory fees and client relationships. We handle execution while you maintain the strategic oversight clients expect from their trusted accountant.",
          "Future-proof your practice: Stay ahead of ATO's SMSF audit program expansion: enhanced data matching, automated pre-lodgement risk scoring, climate risk investment disclosures. Our specialists track regulatory changes so you don't have to.",
          "ATO audit defence specialists: Our team handles ATO rectification requests, investment strategy reconstructions and SIS compliance matters — the deep technical issues where general practices struggle. When ATO questions arise, specialist responses protect your client relationships.",
          "Advanced compliance coverage: Issues like Section 84 exemptions, Part 31B product replacements, crypto collectables situations, in-specie/member market substitution — we manage sophisticated issues your team may not encounter regularly, ensuring bulletproof documentation.",
          "Scalable administration: Full-cycle SMSF accounting, annual returns, ECPI calculations and trustee coordination delivered through secure platforms. Your practice adds capacity during peak season without hiring additional specialist staff.",
          "Technical support on demand: Complex SMSF queries answered within 24 hours. Death benefit dependency determinations, transition to retirement segregation rules, trustee declaration updates — get specialist input without the full-time overhead.",
          "Consistent quality control: Every SMSF engagement follows our proven E-R-S framework (Engage — Reassess — Solve), delivering standardised excellence across your client base. No quality variation between team members.",
          "Grow SMSF services without growing headaches: Pointers Consulting becomes your virtual SMSF division, letting you confidently say 'yes' to every SMSF opportunity.",
        ],
      },
      {
        heading: "Key Questions to Consider:",
        items: [
          "ATO's 2025 SMSF audit program targeting your clients' investment strategy documentation?",
          "Are your SMSF clients' related party loans passing ATO arm's length tests?",
          "Client SMSFs at risk of ATO non-arm's-length income (NALI) reclassification?",
          "All SMSF minutes properly documented for contributions and pensions?",
          "Client SMSF bank accounts truly segregated per ATO audit standards?",
          "ECPI calculations compliant with ATO's proportionate method rules?",
          "SMSF annual returns lodged within ATO's 45-day audit cycle deadlines?....and much more.",
        ],
      },
    ],
    closing: "Reach out to discuss white-label partnership options for your practice today.",
  },
  "for-individuals": {
    title: "For Individuals",
    heroTitle: "For Individuals",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
    intro:
      "Is SMSF right for you? Get expert clarity before committing.\n\nPointers Consulting specialises in guiding Australian professionals, business owners and families through every stage of Self Managed Super Fund — from initial suitability assessment to setup, administration and ongoing ATO compliance. Unlike generic recommendation that treats SMSF as just another product, we start with your complete financial picture: current super balance, income streams, investment experience, family goals and risk tolerance.",
    sections: [
      {
        heading: "Why Us:",
        items: [
          "Risk-free decision making: Our SMSF FitForMe Checkup delivers instant clarity on whether self-managed super suits your situation, saving you from costly mistakes before you start. No obligation, just personalised insights. And it's free.",
          "Technical expertise you can trust: Years of handling complex SMSF matters means we spot compliance traps others miss — from investment strategy documentation to related-party transactions. Your fund stays ATO-ready from day one.",
          "Investment freedom with guardrails: Receive tailored guidance that balances your growth aspirations with strict sole purpose test requirements. Property, shares, crypto — we ensure every holding complies while maximising other tax returns.",
          "Ongoing peace of mind: Regular compliance health checks, contribution strategy reviews and exit planning ensure your SMSF evolves with your life stage. When ATO letters arrive, specialist representation minimises stress and penalties.",
          "The Pointers difference: SMSF managed by senior specialists, not juniors. Direct access to the principal for complex decisions with simple explanations of complex rules. Transparent value-based pricing that aligns with outcomes delivered.",
          "Secure your retirement control confidently: With Pointers Consulting, SMSF becomes a powerful wealth driver, not compliance nightmare. Book your SMSF strategy session today.",
        ],
      },
      {
        heading: "Questions to Ask Yourself:",
        items: [
          "Wondering if SMSF is right for you and delivers real value for your retirement goals?",
          "Is your SMSF truly 'audit-ready' before ATO penalties hit in 2025?",
          "Could better SMSF strategies unlock more investment growth?",
          "Facing potential ATO non-compliance — can your fund survive scrutiny?",
          "Ready for SMSF that builds financial freedom, not just compliance?",
        ],
      },
      {
        heading: "Individuals Questions:",
        items: [
          "ATO data-matching catching your unreported rental income this year?",
          "Claiming every tax offset your investment properties qualify for?",
          "Work-from-home deductions passing ATO record-keeping audits?",
          "Super contribution caps triggering unexpected ATO excess tax?",
          "Family tax benefits aligned with your 2025 circumstances?",
        ],
      },
    ],
    closing: "Need Consultation? Please call us now to find out more about our service or contact us to book an appointment.",
  },
  fitforme: {
    title: "SMSF FitForMe Checkup",
    heroTitle: "SMSF FitForMe Checkup",
    image: `${BASE}/2026/01/673-400x239.jpg`,
    intro:
      "Australia's first dual-assessment SMSF readiness tool.\n\nUnlock clarity before committing: our pioneering assessment reveals if SMSF aligns with your goals, risk tolerance and lifestyle — delivering honest, data-driven insights from Australia's SMSF specialists to empower your decision. Get your instant SMSF readiness score in minutes, completely free and with no obligation.",
    sections: [
      {
        heading: "What you get:",
        items: [
          "Instant SMSF readiness score — know within minutes if SMSF suits you.",
          "Dual assessment: both whether SMSF is right for you AND if you're right for SMSF.",
          "Personalised recommendations based on your financial profile.",
          "Identifies your key risks, opportunities and next steps.",
          "100% free — no obligation, no sales pressure.",
          "Backed by qualified SMSF specialists with 18+ years of experience.",
        ],
      },
      {
        heading: "Who is this for?",
        items: [
          "Individuals considering setting up an SMSF for the first time.",
          "Existing SMSF members unsure if they are getting value from their fund.",
          "Professionals wanting an unbiased second opinion on their SMSF strategy.",
          "Anyone who has been told 'you should have an SMSF' and wants clarity.",
        ],
      },
    ],
    closing: "Need Consultation? Please call us now to find out more about our service or contact us to book an appointment.",
  },
};

export default function SmsfSubPage() {
  const [, params] = useRoute("/services/smsf/:subslug");
  const subslug = params?.subslug ?? "";
  const data = subPageData[subslug];
  const currentPath = `/services/smsf/${subslug}`;

  useEffect(() => {
    document.title = data
      ? `${data.title} | Pointers Consulting`
      : "SMSF | Pointers Consulting";
    window.scrollTo(0, 0);
  }, [subslug, data]);

  if (!data) {
    return (
      <div className="pt-40 text-center py-20">
        <h2 className="text-2xl font-bold text-[#1a2e1a]">Page not found</h2>
        <Link href="/services/smsf">
          <button className="mt-6 bg-[#459443] text-white px-6 py-3 rounded font-semibold">
            Back to SMSF
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section
        className="relative pt-36 pb-14 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.heroTitle}</h1>
          <p className="text-white/60 text-sm">
            <Link href="/"><span className="hover:text-white cursor-pointer transition-colors">Home</span></Link>
            {" > "}{data.heroTitle}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-[#459443] px-5 py-3">
                  <h3 className="text-white font-bold text-base">Services</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {sidebarServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={s.slug}>
                        <div className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors text-gray-700">
                          <CheckCircle size={15} className="text-gray-300 shrink-0" />
                          <span className="text-sm font-medium">{s.title}</span>
                        </div>
                      </Link>
                      {"children" in s && s.children && (
                        <ul>
                          {s.children.map((child) => (
                            <li key={child.slug}>
                              <Link href={child.slug}>
                                <div className={`flex items-center gap-3 pl-10 pr-5 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors ${
                                  currentPath === child.slug ? "text-[#459443] font-semibold" : "text-gray-600"
                                }`}>
                                  <CheckCircle
                                    size={13}
                                    className={currentPath === child.slug ? "text-[#459443] shrink-0" : "text-gray-200 shrink-0"}
                                  />
                                  <span className="text-sm">{child.title}</span>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Appointment */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-[#459443] font-bold text-lg mb-2">Book an Appointment</h3>
                <p className="text-gray-600 text-sm mb-5 font-light">
                  Schedule a free 30 minutes consultation call with our professional
                </p>
                <Link href="/contact">
                  <button className="w-full bg-[#459443] text-white py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors">
                    Book Appointment
                  </button>
                </Link>
                <div className="mt-5 pt-5 border-t border-gray-100 space-y-3">
                  <a href="tel:+61426784982" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#459443] transition-colors">
                    <Phone size={15} className="text-[#459443]" />
                    +61 426 784 982
                  </a>
                  <a href="mailto:sam@pointersconsulting.com.au" className="flex items-center gap-3 text-sm text-gray-600 hover:text-[#459443] transition-colors">
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

              {data.intro.split("\n\n").map((para, i) => (
                <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4 font-light">{para}</p>
              ))}

              {data.sections.map((section, i) => (
                <div key={i} className="mb-7">
                  <h3 className="text-base font-bold text-[#1a2e1a] mb-4">{section.heading}</h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle size={15} className="text-[#459443] mt-0.5 shrink-0" />
                        <span className="text-gray-700 text-sm font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {data.closing && (
                <p className="text-[#459443] font-semibold text-sm mt-6">
                  {data.closing}
                </p>
              )}

              <Link href="/contact">
                <button className="mt-5 bg-[#459443] text-white px-7 py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors">
                  Book a Free Consultation
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#459443] text-sm font-semibold uppercase tracking-wider mb-1">Expertise adds value</p>
          <h2 className="text-xl font-bold text-[#1a2e1a] mb-6">Trusted by Individuals and business in Australia</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left max-w-2xl mx-auto mb-8">
            {["Accountants","Mortgage Brokers","Financial Advisors","Start ups","Investment Funds","Buyers Agents",
              "Real Estate Agents","Entrepreneurs","Construction","Medical Industries","Education","Real Estate",
              "IT Contractors","Restaurants & Cafes","Child Care Centres","Corporate Executives",
              "Fitness service providers","Beauty Saloons","Travel Agencies","Security Service","Hospitality"].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle size={13} className="text-[#459443] shrink-0" />
                <span className="text-gray-700 text-xs font-light">{t}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <button className="bg-[#459443] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors">
                ✉ Contact us
              </button>
            </Link>
            <a href="tel:+61426784982">
              <button className="bg-[#459443] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors">
                📞 0426 784 982
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
