import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, Phone, User, Book, Zap, DollarSign, Globe, GraduationCap, Heart, Shield, Star } from "lucide-react";

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const whyUs = [
  {
    icon: Phone,
    title: "Single point of contact",
    desc: "Talk directly to the owner — no layers, just continuity and communications throughout your engagement.",
  },
  {
    icon: Book,
    title: "Keeping it simple",
    desc: "Complex rules become simple options, clear info and actionable steps for confident decisions.",
  },
  {
    icon: Zap,
    title: "AI powered efficiency",
    desc: "Cutting edge tech streamlines admin, delivering faster insights and seamless digital workflows. Australia wide via video calls, e-signatures and secure sharing.",
  },
  {
    icon: DollarSign,
    title: "Value based pricing",
    desc: "Transparent fees tied to outcomes and value delivered, not hours billing that hides costs.",
  },
  {
    icon: Globe,
    title: "Melbourne locals + Australia-wide reach",
    desc: "Local Melbourne knowledge with Australia-wide service capability via video calls, e-signatures and secure digital workflows.",
  },
  {
    icon: GraduationCap,
    title: "Education focus",
    desc: "Awareness and proactive guidance build your financial literacy, helping you understand and control your super and tax strategy long-term.",
  },
];

const businessValues = [
  {
    icon: Heart,
    color: "#459443",
    title: "Empathy",
    subtitle: "Engage with understanding",
    desc: "We begin every relationship by actively listening to grasp your goals, challenges and priorities. This personalised approach builds trust and ensures solutions truly fit your life and aspirations.",
  },
  {
    icon: Shield,
    color: "#459443",
    title: "Courage",
    subtitle: "Reassess with Insight",
    desc: "We fearlessly examine your existing strategies, uncovering hidden opportunities and risks others might overlook. This rigorous analysis drives smarter decisions and inspires actionable paths forward.",
  },
  {
    icon: Star,
    color: "#459443",
    title: "Dedication",
    subtitle: "Solve with resolve",
    desc: "We partner through to successful execution, providing ongoing support and refinement. Your challenges become ours until they're fully resolved with measurable outcomes you can rely on.",
  },
];

const ersSteps = [
  {
    letter: "E",
    title: "Engage",
    items: [
      "Understand your goals & expectations",
      "Stakeholder discussions",
      "Identification of SMSF/tax issues",
    ],
  },
  {
    letter: "R",
    title: "Reassess",
    items: [
      "Do its compliance gaps review",
      "Evaluation of mitigation strategies",
      "Tax implementation validation",
    ],
  },
  {
    letter: "S",
    title: "Solve",
    items: [
      "Create tailored solutions",
      "Financial outcomes & savings",
      "Client feedback / lessons learnt",
    ],
  },
];

const partnerLogos = [
  { name: "JPATAX", src: `${BASE}/2026/01/jpatax-logo-2025.jpg`, sub: "Authorised Business Partner" },
  { name: "Tax Practitioners Board", src: `${BASE}/2026/01/tax-board-2025-logo.jpg`, sub: "Registered Tax Agent: 26122730" },
  { name: "CPA Australia", src: `${BASE}/2026/01/cpa-2025-logo.jpg`, sub: "Registered ASIC Agent" },
  { name: "SMSF Association", src: `${BASE}/2026/01/sms-assocation.jpg` },
  { name: "ASIC", src: `${BASE}/2026/01/asic-registerd-agent-logo-20205.jpg` },
];

export default function About() {
  useEffect(() => {
    document.title = "Who We Are | Pointers Consulting";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section
        className="relative pt-44 pb-14 bg-cover bg-top"
        style={{ backgroundImage: `url(${BASE}/2024/06/business-accountant.webp)` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Who We Are</h1>
          <p className="text-white/60 text-sm">
            <Link href="/"><span className="hover:text-white cursor-pointer transition-colors">Home</span></Link>
            {" > "}SMSF &amp; Taxation – Your Trusted Partner
          </p>
        </div>
      </section>

      {/* Who We Are — intro two-column */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-500 text-sm mb-1">Who We Are</p>
              <h2 className="text-2xl lg:text-3xl font-bold text-[#459443] mb-5 leading-snug">
                SMSF &amp; Taxation – Your Trusted Partner
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4 font-light">
                Clean, practical guidance for those who want more control over super, smarter tax outcomes, and a trusted accountant to reach out. Pointers Consulting is a Melbourne based specialist in SMSF and tax accounting, empowering professionals, business owners and families with clear decisions on super, investments and compliance. As a forward-thinking, technology-driven firm, we leverage AI tools and automation to streamline routine admin tasks, from data processing and compliance checks to report generation, freeing you to focus on strategic growth and confident decision making.
              </p>
              <p className="text-gray-700 text-sm leading-relaxed font-light">
                With years of top and business experience across Australia and overseas, complex situations receive deep technical analysis delivered in straightforward, jargon-free language.
              </p>
            </div>
            <div>
              <img
                src={`${BASE}/2026/01/sliders3.jpg`}
                alt="SMSF & Taxation Specialists"
                className="w-full h-72 object-cover rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-[#fafffa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-2">Why work with us ?</h2>
            <p className="text-gray-600 text-sm font-light">
              We stands out through client-centric practices that prioritise transparency, efficiency and empowerment.
            </p>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyUs.map((item) => (
              <motion.div
                key={item.title}
                variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
                className="border border-gray-200 rounded-lg p-7 bg-white hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-[#459443]/10 rounded-full flex items-center justify-center mb-4">
                  <item.icon size={18} className="text-[#459443]" />
                </div>
                <h3 className="font-bold text-[#1a2e1a] text-base mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Business Values — green bg */}
      <section className="py-16 bg-[#459443]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Our Business Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {businessValues.map((val) => (
              <div key={val.title} className="bg-white/10 border border-white/20 rounded-lg p-8 text-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <val.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{val.title}</h3>
                <p className="text-white/80 text-sm font-semibold mb-4">{val.subtitle}</p>
                <p className="text-white/70 text-sm leading-relaxed font-light">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Our E-R-S Approach */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#459443] mb-2">Discover Our E-R-S Approach</h2>
            <p className="text-gray-600 text-sm max-w-2xl mx-auto font-light">
              Pointers Consulting uses the E-R-S framework to deliver client results-driven SMSF, Tax and Business Advisory solutions. Engage &gt; Reassess &gt; Solve approach ensures your financial and compliance challenges are handled efficiently and effectively.
            </p>
          </div>

          {/* ERS Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {ersSteps.map((step, i) => (
              <div key={step.letter} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
                  <span className="font-bold text-[#1a2e1a] text-base">{step.title}</span>
                  <div className="w-7 h-7 bg-[#459443] rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">+</span>
                  </div>
                </div>
                <ul className="p-5 space-y-3">
                  {step.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-[#459443] mt-0.5 shrink-0" />
                      <span className="text-gray-700 text-sm font-light">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Lessons learnt callout */}
          <div className="border border-dashed border-gray-300 rounded-lg p-5 text-center text-gray-600 text-sm font-light mb-8">
            Lessons learnt from the solution delivery serve as a feedback mechanism for further improvisation.
          </div>

          {/* Why E-R-S works */}
          <div className="bg-[#1a2e1a] rounded-xl p-8 text-center">
            <h3 className="text-lg font-bold text-white mb-3">Why E-R-S works for you</h3>
            <p className="text-white/70 text-sm font-light mb-6 max-w-lg mx-auto">
              Proactive steps turn complexity into confidence — take back control over your SMSF, optimise tax and stay ATO ready, always.
            </p>
            <Link href="/contact">
              <button className="bg-[#459443] text-white px-7 py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors">
                Book a call to experience it
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Finance Partners */}
      <section className="py-14 bg-[#fafffa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-lg font-bold text-[#459443] mb-10">Our Finance Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="flex flex-col items-center gap-1">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-14 max-w-[130px] object-contain opacity-80 hover:opacity-100 transition-opacity"
                />
                {partner.sub && <p className="text-gray-500 text-[10px] text-center">{partner.sub}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
