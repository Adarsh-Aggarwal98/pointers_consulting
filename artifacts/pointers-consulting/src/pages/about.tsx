import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Target, CheckCircle, Phone, Star } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const BASE = "https://pointersconsulting.com.au/wp-content/uploads";

const values = [
  {
    icon: Target,
    title: "Client-First",
    desc: "Every decision we make is guided by what's best for our clients. We measure our success by yours.",
  },
  {
    icon: Award,
    title: "Professional Excellence",
    desc: "We hold ourselves to the highest professional standards, maintaining current knowledge of Australian tax and super laws.",
  },
  {
    icon: Users,
    title: "Long-Term Relationships",
    desc: "We invest in understanding your full financial picture, building relationships that deliver compounding value over time.",
  },
  {
    icon: Star,
    title: "Proactive Guidance",
    desc: "We don't wait for you to call us with problems. We identify opportunities and issues before they become urgent.",
  },
];

const team = [
  {
    name: "Sam Patel",
    role: "Founder & Principal Adviser",
    bio: "With over 18 years of experience in Australian tax and SMSF, Sam founded Pointers Consulting with a mission to make high-quality financial advice accessible to all Australians. Registered Tax Agent #26122730.",
    quals: ["CPA Australia", "Registered SMSF Auditor", "Tax Agent #26122730"],
  },
  {
    name: "Advisory Team",
    role: "SMSF & Tax Specialists",
    bio: "Our team of qualified advisers combines deep technical expertise with genuine care for client outcomes. We speak your language — whether that's the ATO's legislation or your business's growth goals.",
    quals: ["CPA/CA Qualified", "SMSF Specialists", "Business Advisers"],
  },
];

const partnerLogos = [
  { name: "CPA Australia", src: `${BASE}/2026/01/cpa-2025-logo.jpg` },
  { name: "ASIC Registered Agent", src: `${BASE}/2026/01/asic-registerd-agent-logo-20205.jpg` },
  { name: "SMSF Association", src: `${BASE}/2026/01/sms-assocation.jpg` },
  { name: "Xero Partner", src: `${BASE}/2026/01/xero-logo-20205.jpg` },
  { name: "JPATAX", src: `${BASE}/2026/01/jpatax-logo-2025.jpg` },
  { name: "Tax Practitioners Board", src: `${BASE}/2026/01/tax-board-2025-logo.jpg` },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us | Pointers Consulting";
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-[#1a2e1a] pt-36 pb-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden hidden lg:block">
          <div className="absolute right-0 top-0 w-[45%] h-full opacity-25">
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a2e1a] to-transparent z-10" />
            <img
              src={`${BASE}/2024/06/business-accountant.webp`}
              alt="Professional Team"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">About Us</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              Who We Are
            </h1>
            <p className="text-white/70 text-xl max-w-xl font-light">
              A boutique advisory firm specialising in SMSF, tax and business advisory — backed by an AI powered support hub delivering smarter, faster service to Australians.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#fafffa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Our Mission</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3 mb-6">
                Making SMSF & Tax Simple, Fast, and Stress-Free
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-5 font-light">
                Whether it's your first tax return or your fifteenth, our friendly and professional team is here to help. We work around your schedule, speak your language, and process most returns within 48 hours.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 font-light">
                Founded with the belief that Australians deserve proactive, personalised financial advice — not just reactive compliance. We're an Authorised Representative of JPATAX, Registered Tax Agent #26122730.
              </p>
              <ul className="space-y-3">
                {[
                  "Boutique advisory — direct access to senior advisers",
                  "CPA Australia and SMSF Association members",
                  "ASIC registered agent for corporate compliance",
                  "Xero Certified Partners for accounting services",
                  "Tax Agent #26122730 — Authorised Representative of JPATAX",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#459443] mt-0.5 shrink-0" />
                    <span className="text-gray-700 text-sm font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl mb-5">
                <img
                  src={`${BASE}/2024/06/business-accountant.webp`}
                  alt="Professional Business Accountant"
                  className="w-full h-72 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e1a]/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4">
                    <p className="text-white font-semibold text-sm">Sam Patel, CPA</p>
                    <p className="text-white/70 text-xs">Founder & Principal Adviser | Tax Agent #26122730</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#1a2e1a] rounded-xl p-7 text-white">
                <h3 className="text-xl font-bold mb-6">By the Numbers</h3>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "600+", label: "SMSF Funds Managed" },
                    { value: "$420M+", label: "Assets Under Management" },
                    { value: "18+", label: "Years Experience" },
                    { value: "98%", label: "Client Retention" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-3xl font-bold text-[#459443] mb-1">{stat.value}</div>
                      <div className="text-white/60 text-xs">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Our Values</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a2e1a] mt-3">
              What Guides Everything We Do
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                className="p-7 border border-gray-100 rounded-xl hover:border-[#459443]/30 hover:shadow-md transition-all text-center"
              >
                <div className="w-12 h-12 bg-[#459443] rounded-full flex items-center justify-center mx-auto mb-5">
                  <value.icon size={22} className="text-white" />
                </div>
                <h3 className="font-bold text-[#1a2e1a] text-lg mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed font-light">{value.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#1a2e1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mt-3">
              The People Behind Your Advice
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl p-8"
              >
                <div className="w-16 h-16 bg-[#459443] rounded-full flex items-center justify-center mb-5">
                  <Users size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-white text-xl mb-1">{member.name}</h3>
                <p className="text-[#459443] text-sm font-semibold mb-4">{member.role}</p>
                <p className="text-white/70 text-sm leading-relaxed font-light mb-5">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.quals.map((q) => (
                    <span key={q} className="bg-[#459443]/15 text-[#459443] text-xs px-3 py-1 rounded-full">
                      {q}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Partners — actual logos */}
      <section className="py-16 bg-[#fafffa] border-b border-[#459443]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-10">
            Our Finance Partners
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {partnerLogos.map((partner) => (
              <div key={partner.name} className="flex items-center justify-center">
                <img
                  src={partner.src}
                  alt={partner.name}
                  className="h-14 max-w-[150px] object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#459443] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Let's Work Together</h2>
          <p className="text-white/80 text-lg mb-8 font-light">
            Experience the Pointers difference. Book a free consultation with our team today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="bg-white text-[#459443] px-7 py-3.5 rounded font-semibold hover:bg-gray-50 transition-colors inline-flex items-center gap-2">
                Contact Us <ArrowRight size={16} />
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
