import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const subCards = [
  {
    slug: "for-accountants",
    title: "For Accountants/ finance professionals",
    description:
      "Scale your practice: focus on core expertise while we handle complex SMSF management for your clients. Your relationships stay yours — seamless white-label support keeps you in control.",
    image: `${BASE}/2021/10/legaldoc-400x239.jpg`,
  },
  {
    slug: "for-individuals",
    title: "For Individuals",
    description:
      "Your one-stop SMSF solution: rely on our experts to simplify every requirement — from strategic planning to compliant administration and reporting, safeguarding your retirement with precision and peace of mind.",
    image: `${BASE}/2021/10/smsf-400x239.jpg`,
  },
  {
    slug: "fitforme",
    title: "SMSF FitForMe Checkup",
    description:
      "Unlock clarity before committing: our pioneering assessment reveals if SMSF aligns with your goals, risk tolerance and lifestyle — delivering honest, data-driven insights from Australia's SMSF specialists to empower your decision.",
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
        className="relative pt-36 pb-14 bg-cover bg-center"
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

      {/* 3 Sub-Cards Section */}
      <section className="py-14 bg-[#459443]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Self-Managed Superfund</h2>
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
                className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 text-center flex flex-col items-center">
                  <h3 className="text-base font-bold text-[#1a2e1a] mb-3 leading-snug">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-5 font-light">{card.description}</p>
                  <Link href={`/services/smsf/${card.slug}`}>
                    <button className="bg-[#1a2e1a] text-white px-6 py-2.5 rounded font-semibold text-sm hover:bg-[#459443] transition-colors">
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
            <p className="text-gray-600 text-sm text-center leading-relaxed mb-8 font-light">
              We assist our clients with comprehensive business support, providing tailored advice and consultations to meet their unique needs.
              With extensive experience working with both individuals and businesses, we ensure that our clients receive personalized guidance
              and strategies that drive growth and success.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {clientTypes.map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-[#459443] shrink-0" />
                  <span className="text-gray-700 text-sm font-light">{type}</span>
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
