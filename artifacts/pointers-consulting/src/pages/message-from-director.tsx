import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";

const BASE = "/images";

const partnerLogos = [
  { name: "JPATAX", src: "/logos/jpatax-logo-2025.jpg", sub: "Authorised Business Partner" },
  { name: "Tax Practitioners Board", src: "/logos/tax-board-2025-logo.jpg", sub: "Registered Tax Agent: 26122730" },
  { name: "CPA Australia", src: "/logos/cpa-2025-logo.jpg", sub: "Registered ASIC Agent" },
  { name: "SMSF Association", src: "/logos/sms-assocation.jpg" },
  { name: "ASIC", src: "/logos/asic-registerd-agent-logo-20205.jpg" },
];

const paragraphs = [
  "Navigating money and compliance shouldn't feel complex or overwhelming, and I am committed to making it simpler and clearer for you. I believe relationships are never transactions; they are ongoing connections built on trust, clarity and follow through.",
  "At Pointers Consulting, my vision was to build a firm where clients feel understood, supported and informed at every step — not just processed through a system. With nearly 20 years across Asia, the Middle East and APAC, I specialise in SMSF, taxation, accounting and business advisory, focusing only on areas where we add real depth and value.",
  "We thrive to turn complicated rules into practical decisions that help you move forward, supported by a task-focused team aligned in values, discipline and client focus. Our E-R-S approach — Engage, Reassess, Solve — keeps everything structured yet personal. I engage by listening to your goals, reassess your position to uncover risks and opportunities, then solve with clear, action-oriented strategies.",
  "Innovation is central to how we work; tools like our SMSF FitForMe Check, and of the first of its kind in Australia, are designed to give you honest, evidence-based insight before you commit. I have personally designed our business model, so you engage with me directly, with AI-enabled systems and my core team handling routine admin, so more time goes into thinking, not ticking boxes.",
  "Our value-based pricing reflects outcomes, not hours, reinforcing a partnership mindset. So if you're seeking focused expertise in SMSF, taxation, or business advisory services from someone who treats your situation like their own, I'd welcome a conversation and a discovery call to explore how we can engage, reassess, and solve together!",
];

export default function MessageFromDirector() {
  useEffect(() => {
    document.title = "Message from Director | Pointers Consulting";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section
        className="relative pt-44 pb-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE}/sliders3.jpg)` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Message from Director</h1>
          <p className="text-white/60 text-sm">
            <Link href="/"><span className="hover:text-white cursor-pointer transition-colors">Home</span></Link>
            {" > "}Message from Director
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Director Photo — left column */}
            <div className="lg:col-span-2 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-56 h-64 rounded-lg overflow-hidden border-4 border-[#459443]/30 shadow-lg bg-gray-100">
                  <img
                    src={`${BASE}/director-sharat.png`}
                    alt="Sharat Sharma (Sam) — Founder & Director"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.src = `${BASE}/banner1-2026.jpg`;
                    }}
                  />
                </div>
                {/* Green circle accent */}
                <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full border-4 border-[#459443] bg-white flex items-center justify-center shadow">
                  <div className="w-8 h-8 rounded-full bg-[#459443] flex items-center justify-center">
                    <span className="text-white text-xs font-bold">CPA</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-5 bg-[#f5faf5] border border-[#459443]/20 rounded-lg px-6 py-4 w-full max-w-xs">
                <p className="font-bold text-[#1a2e1a] text-base">Sharat Sharma (Sam)</p>
                <p className="text-[#459443] text-sm font-medium">Founder &amp; Director</p>
              </div>
            </div>

            {/* Message Content — right column */}
            <div className="lg:col-span-3">
              <p className="text-gray-500 text-sm mb-1">A Word from Our Leader</p>
              <h2 className="text-2xl font-bold text-[#459443] mb-6">Message from Director</h2>

              <div className="space-y-4">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-gray-700 text-sm leading-relaxed font-light">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-8">
                <Link href="/contact">
                  <button className="bg-[#459443] text-white px-6 py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2">
                    ✉ Contact Us
                  </button>
                </Link>
              </div>
            </div>
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
