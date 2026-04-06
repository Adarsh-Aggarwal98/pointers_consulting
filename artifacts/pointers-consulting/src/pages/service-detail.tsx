import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const allServices = [
  { slug: "smsf", title: "Self-Managed Superfund" },
  { slug: "taxation-accounting", title: "Taxation & Accounting" },
  { slug: "business-advisory", title: "Business Advisory" },
  { slug: "assurance-risk", title: "Assurance & Risk" },
  { slug: "legal-compliance", title: "Legal — Setups, Registrations & Compliance" },
  { slug: "ai-business-hub", title: "AI-Powered Business Support Hub" },
];

const serviceData: Record<string, {
  title: string;
  image: string;
  intro: string;
  sections: { heading?: string; items?: string[]; body?: string }[];
}> = {
  smsf: {
    title: "Self-Managed Superfund",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
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
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
    intro:
      "Tax and accounting that optimises, not just complies. We provide precision returns, bookkeeping and advisory to minimise liability, maximise deductions and keep your numbers clear and current.",
    sections: [
      {
        heading: "Some examples of our services include:",
        items: [
          "Individual and business income tax returns",
          "BAS and GST preparation and lodgement",
          "Payroll and PAYG management",
          "Negative gearing and investment property advice",
          "Capital gains tax planning",
          "International tax and double tax agreements",
          "ATO audit support and representation",
          "Bookkeeping and Xero/MYOB setup",
          "Fringe benefits tax (FBT) compliance",
          "Tax minimisation strategies",
        ],
      },
    ],
  },
  "business-advisory": {
    title: "Business Advisory",
    image: `${BASE}/2026/01/57-400x239.jpg`,
    intro:
      "Business decisions shouldn't be driven by guesswork or last minute reactions. As such, we focus on giving business owners, founders and globally mobile individuals a clear view of where they are now, what is realistically possible next and how to move there in a measured, confident way. We blend technical depth in Strategy, Taxation, Accounting (and SMSF if need be) along with our practical commercial experience so advice stays grounded, actionable and aligned with your longer term goals, not just the next deadline.",
    sections: [
      {
        heading: "Some examples of our services include:",
        items: [
          "Strategic planning for business owners and start-ups, including business model validation, pricing, margin and cash-flow planning.",
          "Choice of structure and re-structuring advice (company, trust, SMSF, JV) to balance asset protection, tax efficiency and future exit options.",
          "Governance and board-style guidance for growing private businesses, including risk oversight, reporting frameworks and decision disciplines.",
          "Succession, sale-readiness and transition planning for founders and family businesses, from readiness reviews to roadmap design.",
          "Cross-border structuring and advisory for high-wealth individuals and UAE-based entrepreneurs with Australian interests, covering residency, investment and business ownership considerations at a high level.",
          "Management reporting frameworks, KPI dashboards and board packs.",
          "CFO services for SMEs — part-time or project-based.",
          "Growth strategy and capital raising support.",
        ],
      },
    ],
  },
  "assurance-risk": {
    title: "Assurance & Risk",
    image: `${BASE}/2021/10/audit-400x239.jpg`,
    intro:
      "Pointers Consulting delivers strategic risk and assurance through our proven E-R-S philosophy (Engage → Reassess → Solve). We help Australian and UAE businesses strengthen controls, mitigate threats and build stakeholder confidence — turning risk management from cost centre to competitive advantage.",
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
          "Internal Audit Advisory — Risk based audit planning and advisory targeting financial reporting, IT security, strategic, operational and/or process gaps. Issues found early, fixed efficiently.",
          "Risk Management Frameworks — Enterprise risk heat maps and mitigation strategies aligned to Australian governance and UAE business realities.",
          "Internal Control Optimisation — Revenue, inventory, expense controls tested and strengthened per global standards.",
          "Compliance Health Checks — Pre-emptive ATO/ASIC/UAE free zone reviews fixing gaps before audits strike.",
          "Risk Assurance experience that works. Every engagement follows Engage → Reassess → Solve for certainty, not just compliance. Book your E-R-S risk management discovery session today.",
        ],
      },
    ],
  },
  "legal-compliance": {
    title: "Legal — Setups, Registrations & Compliance",
    image: `${BASE}/2022/07/company-taxreturn-400x239.jpg`,
    intro:
      "Pointers Consulting provides fast-track legal aid for Australian business registrations, entity formation and ongoing compliance — plus specialist guidance for international businesses establishing Australian presence. From sole traders to multinationals, we handle the paperwork so you launch confidently and stay compliant.",
    sections: [
      {
        heading: "Domestic Australian Services:",
        items: [
          "Business Structure Setup — Sole trader, company, trust formation with tax optimisation",
          "ABN/TFN Registrations — Instant applications across all entity types",
          "ASIC Company Lodgements — Pty Ltd formation, director appointments, annual reviews",
          "GST & BAS Registration — Seamless tax system integration from day one",
          "Business name registrations and IP considerations",
          "Partnership and JV agreements",
          "Discretionary and unit trust deeds",
          "Ongoing governance and minutes",
        ],
      },
      {
        heading: "International Business Entry:",
        items: [
          "Australian Subsidiary Formation — UAE/India companies establishing Pty Ltd entities",
          "Cross-Border Tax Structuring — Transfer pricing, permanent establishment planning",
          "Market Entry Compliance — TFN withholding, FBT setup, local director requirements",
          "Corporate secretarial services for overseas-owned entities",
        ],
      },
    ],
  },
  "ai-business-hub": {
    title: "AI-Powered Business Support Hub",
    image: `${BASE}/2026/01/673-400x239.jpg`,
    intro:
      "Whether you are an Accountant or any business owner, your time should be spent on strategy and judgment, not juggling staff gaps or clunky systems. We've created the AI-Powered Business Support Hub specifically for firms and businesses that want extra capacity or smarter processes without adding permanent headcount.",
    sections: [
      {
        heading: "What you gain from this service:",
        items: [
          "Extra qualified capacity without hiring: virtual CFO and back-office support that plugs straight into your existing systems.",
          "Custom AI solutions that streamline all required tasks, cut error risk and make you free to focus on your core expertise and client relationships.",
          "Implementation support from a team that 'speaks accounting' as well as tech, so changes are realistic and adopted, not shelved.",
          "Assurance that your data is handled securely on secured infrastructure, even when you're servicing clients anywhere in the world.",
          "AI-powered workflow automation and custom tool development.",
          "Offshore staffing solutions and process documentation.",
          "Data analytics, reporting and technology stack optimisation.",
          "Ongoing managed support packages.",
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
        className="relative pt-36 pb-14 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">{data.title}</h1>
          <p className="text-white/60 text-sm">
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
                  <h3 className="text-white font-bold text-base">Services</h3>
                </div>
                <ul className="divide-y divide-gray-100">
                  {allServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`}>
                        <div className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors hover:bg-gray-50 ${
                          s.slug === slug ? "text-[#459443] font-semibold" : "text-gray-700"
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
              <p className="text-gray-700 text-sm leading-relaxed mb-8 font-light">{data.intro}</p>

              {data.sections.map((section, i) => (
                <div key={i} className="mb-8">
                  {section.heading && (
                    <h3 className="text-base font-bold text-[#1a2e1a] mb-4">{section.heading}</h3>
                  )}
                  {section.body && (
                    <p className="text-gray-700 text-sm leading-relaxed mb-4 font-light">{section.body}</p>
                  )}
                  {section.items && (
                    <ul className="space-y-2.5">
                      {section.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle size={16} className="text-[#459443] mt-0.5 shrink-0" />
                          <span className="text-gray-700 text-sm font-light">{item}</span>
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
