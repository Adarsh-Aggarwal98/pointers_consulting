import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Zap } from "lucide-react";

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const subCards = [
  {
    slug: "for-accountants",
    title: "B2B Model – For Accountants",
    description:
      "Elevate your SMSF offering without the risk. We are experts in partnering with Australian Accountants to deliver specialist SMSF services. Enjoy white-label administration, compliance reviews and technical support — serve your SMSF clients confidently while focusing on your core advisory relationships.",
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
  },
  {
    slug: "for-individuals",
    title: "B2C Model – For Individual Trustees",
    description:
      "Is SMSF right for me? Get expert clarity before committing. Pointers Consulting specialises in SMSF space and guides individuals, professionals and families through every stage — from initial suitability assessment to setup, administration and ongoing ATO compliance.",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
  },
  {
    slug: "fitforme",
    title: "SMSF FitForMe Checkup",
    description:
      "By simply answering 25 Yes/No questions, this tool provides an instant tailored summary of your SMSF readiness in minutes. Our tool neither gives financial advice nor any recommendation — just personalised insights. And it's free!",
    image: `${BASE}/2026/01/673-400x239.jpg`,
  },
];

const clientTypes = [
  "Accountants", "Real Estate Agents", "IT Contractors", "Fitness service providers",
  "Mortgage Brokers", "Entrepreneurs", "Restaurants & Cafes", "Beauty Saloons",
  "Financial Advisors", "Construction", "Medical Industries", "Travel Agencies",
  "Start ups", "Child Care Centres", "Security Service",
  "Investment Funds", "Education", "Corporate Executives", "Hospitality",
  "Buyers Agents", "Real Estate",
];

export default function SmsfPage() {
  useEffect(() => {
    document.title = "Self-Managed Superfund | Pointers Consulting";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner */}
      <section
        className="relative pt-44 pb-14 bg-cover bg-center"
        style={{ backgroundImage: `url(${BASE}/2021/10/smsf-400x239.jpg)` }}
      >
        <div className="absolute inset-0 bg-[#1a2e1a]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">Self-Managed Superfund</h1>
          <p className="text-white/60 text-sm">
            <Link href="/"><span className="hover:text-white cursor-pointer transition-colors">Home</span></Link>
            {" > "}Self-Managed Superfund
          </p>
        </div>
      </section>

      {/* FitForMe Spotlight */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-block bg-[#459443]/10 text-[#459443] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                OUR SPECIAL OFFERING
              </span>
              <h2 className="text-3xl font-bold text-[#1a2e1a] mb-4 leading-snug">
                Not sure if SMSF is right for you?
              </h2>
              <p className="text-[#0a0a0a] text-sm leading-relaxed mb-6 font-normal">
                Our specialization is well demonstrated by our free online SMSF self-assessment tool – <strong className="text-[#1a2e1a]">SMSF FitForMe Checkup</strong> – which will precisely help you in answering following key questions:
              </p>
              <div className="flex flex-col gap-3 mb-6">
                {["Is SMSF Right for me?", "Where do I start?"].map((q) => (
                  <div key={q} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#459443] flex items-center justify-center shrink-0">
                      <CheckCircle size={13} className="text-white" />
                    </div>
                    <span className="text-[#1a2e1a] font-semibold text-sm">{q}</span>
                  </div>
                ))}
              </div>
              <p className="text-[#0a0a0a] text-xs leading-relaxed mb-8 border-l-2 border-[#459443]/30 pl-3">
                Note: The SMSF FitForMe Checkup assessment provides general information only, not a personal financial advice or a recommendation to establish an SMSF.
              </p>
              <Link href="/services/smsf/fitforme">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-[#459443] text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-[#3a7f38] transition-colors shadow-lg shadow-[#459443]/25"
                >
                  <Zap size={15} /> Start Now — It's Free <ArrowRight size={14} />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right: FitForMe Card */}
            <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="relative bg-[#1a2e1a] rounded-2xl p-8 overflow-hidden">
                {/* Decorative rings */}
                <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-[#459443]/20" />
                <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full border border-[#459443]/30" />

                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-[#459443] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-6">
                    <Zap size={11} /> FREE TOOL
                  </div>
                  <h3 className="text-white text-xl font-bold mb-2">SMSF FitForMe Checkup</h3>
                  <p className="text-white/60 text-sm font-normal mb-7 leading-relaxed">
                    Australia's first dual-assessment SMSF readiness tool — delivering honest, data-driven insights in minutes.
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-7">
                    {[
                      { value: "25", label: "Yes/No Questions" },
                      { value: "~10", label: "Minutes to complete" },
                      { value: "100%", label: "Free, No obligation" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center">
                        <p className="text-[#459443] text-xl font-bold">{stat.value}</p>
                        <p className="text-white/60 text-[10px] leading-tight mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    {[
                      "Instant SMSF readiness score",
                      "Personalised recommendations",
                      "No financial advice – just clarity with awareness",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2.5">
                        <CheckCircle size={13} className="text-[#459443] shrink-0" />
                        <span className="text-white/70 text-xs">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3 Sub-Cards Section */}
      <section className="py-14 bg-[#459443]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Our SMSF Services</h2>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {subCards.map((card) => (
              <motion.div
                key={card.slug}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition-shadow"
              >
                <div className="h-44 overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col">
                  <h3 className="text-sm font-bold text-[#1a2e1a] mb-2 leading-snug">{card.title}</h3>
                  <p className="text-[#0a0a0a] text-sm leading-relaxed mb-5 font-normal flex-1">{card.description}</p>
                  <Link href={`/services/smsf/${card.slug}`}>
                    <button className="w-full bg-[#1a2e1a] text-white py-2.5 rounded-lg font-semibold text-sm hover:bg-[#459443] transition-colors">
                      Learn More
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trusted Section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <p className="text-[#459443] text-sm font-semibold uppercase tracking-wider mb-1">Expertise adds value</p>
            <h2 className="text-2xl font-bold text-[#1a2e1a]">Trusted by individuals and business in Australia</h2>
          </div>
          <div className="border border-gray-200 rounded-xl p-8">
            <p className="text-[#0a0a0a] text-sm text-center leading-relaxed mb-8 font-normal">
              We assist our clients with comprehensive business support, providing tailored advice and consultations to meet their unique needs.
              With extensive experience working with both individuals and businesses, we ensure that our clients receive personalized guidance
              and strategies that drive growth and success.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {clientTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#459443] shrink-0" />
                  <span className="text-[#0a0a0a] text-sm font-normal">{type}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/contact">
                <button className="bg-[#459443] text-white px-6 py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2">
                  ✉ Contact us
                </button>
              </Link>
              <a href="tel:+61426784982">
                <button className="bg-[#459443] text-white px-6 py-3 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2">
                  📞 0426 784 982
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
