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
  { slug: "/services/business-advisory", title: "Business Advisory" },
  { slug: "/services/assurance-risk", title: "Audit & Risk Assurance" },
  { slug: "/services/legal-compliance", title: "Legal Aid – Setups, Registrations & Compliance" },
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
    title: "B2B Model – For Accountants",
    heroTitle: "B2B Model – For Accountants",
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
    intro:
      "Elevate your SMSF offering without the risk.\n\nWe are experts in partnering with Australian Accountants to deliver specialist SMSF services. Enjoy white-label administration, compliance reviews and technical support and serve your SMSF clients confidently while focusing on your core advisory relationships.",
    sections: [
      {
        heading: "Why Work with Us?",
        items: [
          "Grow your SMSF services without growing headache: We become your virtual SMSF division so you confidently say yes to every potential opportunity.",
          "Revenue protection model: Retain your clients (and fees) while we handle end to end SMSF admin & compliance on a fixed fee model.",
          "Technical support on-demand: Get complex SMSF queries answered within 24 hours without full-time specialist overhead.",
          "Future-proof your practice: Stay ahead of ATO SMSF audit expansions as our specialists track all regulatory changes.",
        ],
      },
    ],
    closing: "Reach out to discuss white-label service options for your practice today.",
  },
  "for-individuals": {
    title: "B2C Model – For Individual Trustees",
    heroTitle: "B2C Model – For Individual Trustees",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
    intro:
      "Is SMSF right for me? Get expert clarity before committing.\n\nSMSF is quite different to Taxation owing to many reasons — a financial product, highly regulated and hence complex. And that's exactly where we come in! Pointers Consulting specialises in SMSF space and guides individuals, professionals and families through every stage of Self-Managed Super Fund — from initial suitability assessment to setup, administration and ongoing ATO compliance.",
    sections: [
      {
        heading: "Why Us:",
        items: [
          "The \"Pointers\" Difference: Our expertise can be judged simply by using our SMSF FitForMe Checkup tool that delivers instant clarity on whether SMSF suits your situation or not, saving you from costly mistakes before you start. No obligation, no financial advice — just personalised insights for you. And it's free!",
          "Technical expertise you can trust: Years of handling complex SMSF matters means we spot compliance traps others miss — from investment strategy documentation to related-party transactions. Your fund stays ATO-ready from day one.",
          "Investment freedom with guardrails: Receive tailored guidance that balances your growth aspirations with strict sole purpose test requirements. Property, shares, crypto — we ensure every holding complies while maximising after-tax returns.",
          "Ongoing peace of mind: Regular compliance health checks, contribution strategy reviews and exit planning ensure your SMSF evolves with your life stage.",
          "Value based Fee: No hidden costs, no surprises! Transparent value-based pricing (fixed fee model) that aligns with outcomes delivered.",
        ],
      },
      {
        heading: "Key Questions to Ask Yourself:",
        items: [
          "Wondering if SMSF is right for you and delivers real value for your retirement goals?",
          "Is your SMSF truly audit-ready before ATO penalties hit in 2026?",
          "Could better SMSF compliance strategies unlock more investment growth?",
          "Facing potential ATO non-compliance — can your fund survive scrutiny?",
          "Ready for SMSF that builds financial freedom, and not just compliance?",
        ],
      },
    ],
    closing: "You are welcome to contact anytime or book an appointment to find out more about our SMSF services!",
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
        className="relative pt-44 pb-14 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.heroTitle}</h1>
          <p className="text-white text-sm">
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
                  <h3 className="text-white font-bold text-sm">Services</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {sidebarServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={s.slug}>
                        <div className="flex items-center gap-3 px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors text-[#0a0a0a]">
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
                                  currentPath === child.slug ? "text-[#459443] font-semibold" : "text-[#0a0a0a]"
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

              {data.intro.split("\n\n").map((para, i) => (
                <p key={i} className="text-[#0a0a0a] text-sm leading-relaxed mb-4 font-normal">{para}</p>
              ))}

              {data.sections.map((section, i) => (
                <div key={i} className="mb-7">
                  <h3 className="text-sm font-bold text-[#1a2e1a] mb-4">{section.heading}</h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <CheckCircle size={15} className="text-[#459443] mt-0.5 shrink-0" />
                        <span className="text-[#0a0a0a] text-sm font-normal">{item}</span>
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
                <span className="text-[#0a0a0a] text-xs font-normal">{t}</span>
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
