import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Award, Users, Target, Heart } from "lucide-react";

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

const team = [
  {
    name: "Andrew Pointers",
    role: "Principal & SMSF Specialist",
    bio: "Andrew has over 20 years of experience in SMSF administration and compliance. A registered SMSF auditor and CPA, he founded Pointers Consulting with a vision to deliver genuinely specialist SMSF advice to Australian families and business owners.",
    credentials: "CPA, Registered SMSF Auditor, Tax Agent",
  },
  {
    name: "Jessica Chen",
    role: "Senior Business Adviser",
    bio: "Jessica brings 15 years of business advisory experience, having worked with both Big 4 accounting firms and boutique advisory practices. She specialises in business structuring, tax planning, and succession planning for private businesses.",
    credentials: "CA, MBA, Registered Tax Agent",
  },
  {
    name: "Marcus Williams",
    role: "SMSF Administrator",
    bio: "Marcus manages the day-to-day administration of SMSF portfolios for over 200 client funds. His meticulous attention to detail and deep knowledge of SMSF legislation ensures our clients' funds remain compliant and efficiently administered.",
    credentials: "BBus (Accounting), ASIC RG 146",
  },
  {
    name: "Sarah O'Brien",
    role: "Financial Planner",
    bio: "Sarah is an authorised representative with extensive experience in personal financial planning, including retirement income strategies, superannuation optimisation, and estate planning coordination for high-net-worth families.",
    credentials: "CFP, B.Fin, ASIC AFS Licence",
  },
];

const values = [
  {
    icon: Award,
    title: "Genuine Expertise",
    description:
      "We are specialists, not generalists. SMSF and business advisory is all we do, which means our depth of knowledge in these areas is unmatched.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    description:
      "Every recommendation we make is in your best interest. We are bound by professional and legal obligations to act in your interest, and we take those obligations seriously.",
  },
  {
    icon: Target,
    title: "Proactive Advice",
    description:
      "We contact you when there are opportunities or risks you should know about. We don't wait for you to come to us — we get ahead of issues before they become problems.",
  },
  {
    icon: Heart,
    title: "Long-Term Partnerships",
    description:
      "We build relationships that last decades. Our clients grow with us, and we grow with our clients. We measure our success by theirs.",
  },
];

export default function About() {
  useEffect(() => {
    document.title = "About Us | Pointers Consulting — SMSF & Business Advisory";
  }, []);

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Header */}
      <section className="bg-[hsl(222,47%,11%)] py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-[hsl(43,100%,50%)] font-semibold text-sm uppercase tracking-wider">
                About Us
              </span>
              <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mt-3 mb-5">
                Australia's Trusted SMSF Specialists
              </h1>
              <p className="text-white/70 text-lg leading-relaxed">
                Pointers Consulting was founded on a simple premise: Australians deserve specialist SMSF and business advisory advice, not generic accounting services dressed up as specialist advice.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { num: "2006", label: "Year Founded" },
                { num: "600+", label: "SMSF Funds" },
                { num: "$420M+", label: "Assets Managed" },
                { num: "98%", label: "Client Retention" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 text-center"
                >
                  <div className="text-3xl font-bold text-[hsl(43,100%,50%)] font-serif">{s.num}</div>
                  <div className="text-white/50 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <AnimatedSection>
              <span className="text-[hsl(43,100%,45%)] font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)] mt-3 mb-6">
                Built on a Belief in Specialist Advice
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Pointers Consulting was established in Melbourne in 2006 by Andrew Pointers, a CPA and registered SMSF auditor who had spent the previous decade watching Australian families make costly mistakes with their super because their accountant "also handled SMSFs" as a sideline service.
                </p>
                <p>
                  Andrew's vision was straightforward: build a firm where SMSF and business advisory was the core offering, not an add-on. A firm where clients could trust that the people advising them genuinely knew their subject matter inside and out, and stayed current with the rapidly evolving regulatory landscape.
                </p>
                <p>
                  Today, Pointers Consulting manages over 600 SMSF funds with more than $420 million in total assets. Our team of licensed specialists, registered auditors, and business advisers serve clients across Australia, from first-time SMSF trustees to sophisticated investors with complex multi-entity structures.
                </p>
                <p>
                  Our commitment has never wavered: provide specialist advice, build long-term relationships, and genuinely help our clients achieve their financial goals. It's a simple formula, but it's why clients who joined us in 2006 are still with us today.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[hsl(43,100%,45%)] font-semibold text-sm uppercase tracking-wider">
              Our Values
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)] mt-3">
              What We Stand For
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value) => (
              <AnimatedSection key={value.title}>
                <div className="bg-white p-7 rounded-xl border border-gray-100 h-full">
                  <div className="w-11 h-11 bg-[hsl(222,47%,11%)] rounded-lg flex items-center justify-center mb-5">
                    <value.icon size={20} className="text-[hsl(43,100%,50%)]" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[hsl(222,47%,11%)] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[hsl(43,100%,45%)] font-semibold text-sm uppercase tracking-wider">
              Our People
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)] mt-3">
              Meet the Team
            </h2>
            <p className="text-gray-600 text-lg max-w-xl mx-auto mt-4">
              Our team of licensed specialists brings decades of experience in Australian superannuation, taxation, and business advisory.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <AnimatedSection key={member.name}>
                <div className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                  <div className="bg-[hsl(222,47%,11%)] p-6 flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[hsl(43,100%,50%)] flex items-center justify-center shrink-0">
                      <span className="font-serif font-bold text-xl text-[hsl(222,47%,11%)]">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-white text-lg">{member.name}</h3>
                      <p className="text-[hsl(43,100%,50%)] text-sm">{member.role}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <div className="text-xs text-[hsl(222,47%,11%)] font-semibold bg-gray-50 rounded px-3 py-2">
                      {member.credentials}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[hsl(43,100%,50%)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl font-bold text-[hsl(222,47%,11%)] mb-4">
              Ready to Work with Our Team?
            </h2>
            <p className="text-[hsl(222,47%,11%)/80%] text-lg mb-8">
              Book a free consultation to meet one of our advisers and discuss your needs.
            </p>
            <Link href="/contact">
              <button className="bg-[hsl(222,47%,11%)] text-white px-7 py-3.5 rounded font-semibold hover:bg-[hsl(222,47%,16%)] transition-colors inline-flex items-center gap-2">
                Book a Free Consultation
                <ArrowRight size={16} />
              </button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
