import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  Phone,
  Calendar,
  FileText,
  Building2,
  PiggyBank,
  BarChart3,
} from "lucide-react";
import { blogPosts } from "@/data/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const services = [
  {
    icon: Shield,
    title: "SMSF Administration",
    description:
      "End-to-end SMSF setup, administration, and compliance management. We handle the complexity so you can focus on growing your wealth.",
  },
  {
    icon: FileText,
    title: "SMSF Compliance & Audit",
    description:
      "Annual compliance reviews and independent audits carried out by registered SMSF auditors, ensuring your fund meets all ATO requirements.",
  },
  {
    icon: TrendingUp,
    title: "SMSF Investment Strategy",
    description:
      "Tailored investment strategies that align with your retirement goals, risk tolerance, and current superannuation legislation.",
  },
  {
    icon: BarChart3,
    title: "Business Tax Planning",
    description:
      "Proactive tax strategies that legally minimise your business tax obligations while keeping you fully compliant with the ATO.",
  },
  {
    icon: Building2,
    title: "Business Advisory",
    description:
      "Strategic business advice from experienced consultants who understand the Australian business environment inside and out.",
  },
  {
    icon: PiggyBank,
    title: "Financial Planning",
    description:
      "Comprehensive financial planning that integrates super, investments, insurance, and estate planning into a cohesive strategy.",
  },
];

const stats = [
  { value: "600+", label: "SMSF Funds Managed" },
  { value: "$420M+", label: "Assets Under Management" },
  { value: "18+", label: "Years of Experience" },
  { value: "98%", label: "Client Retention Rate" },
];

const testimonials = [
  {
    name: "Michael T.",
    role: "SMSF Trustee, Melbourne",
    text: "Pointers Consulting transformed how I manage my super. The team's knowledge of SMSF regulations is exceptional, and they're always proactive about keeping my fund compliant.",
  },
  {
    name: "Sarah & David L.",
    role: "Business Owners, Sydney",
    text: "We've been working with Pointers for our business tax and SMSF for six years. Their integrated approach has saved us significantly in tax each year while building our retirement wealth.",
  },
  {
    name: "Robert K.",
    role: "Property Investor, Brisbane",
    text: "The team guided us through purchasing a commercial property in our SMSF. The process was complex, but their expertise made it seamless. Outstanding service.",
  },
];

const whyUs = [
  "Licensed SMSF specialists with deep regulatory expertise",
  "Integrated approach covering super, tax, and business advisory",
  "Transparent fixed fees with no hidden costs",
  "Proactive communication — we contact you, not the other way around",
  "Direct access to your dedicated adviser, not a call centre",
  "25+ years of combined experience in Australian financial services",
];

export default function Home() {
  useEffect(() => {
    document.title = "Pointers Consulting | SMSF & Business Advisory Specialists";
  }, []);

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-[hsl(222,47%,11%)] pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[hsl(43,100%,50%)/5%] blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[hsl(43,100%,50%)/3%] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(43,100%,50%) 1px, transparent 0)`,
              backgroundSize: "48px 48px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-[hsl(43,100%,50%)/10%] border border-[hsl(43,100%,50%)/30%] rounded-full px-4 py-1.5 mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(43,100%,50%)]" />
              <span className="text-[hsl(43,100%,50%)] text-xs font-medium uppercase tracking-wider">
                Australia's SMSF Specialists
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Expert SMSF & Business
              <br />
              <span className="text-[hsl(43,100%,50%)]">Advisory Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-lg lg:text-xl leading-relaxed mb-10 max-w-2xl"
            >
              We help Australians take control of their retirement savings and grow their businesses with specialist SMSF administration, tax planning, and strategic business consulting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <button className="bg-[hsl(43,100%,50%)] text-[hsl(222,47%,11%)] px-7 py-3.5 rounded font-semibold text-base hover:bg-[hsl(43,100%,45%)] transition-colors flex items-center gap-2 justify-center">
                  Book a Free Consultation
                  <ArrowRight size={17} />
                </button>
              </Link>
              <Link href="/services">
                <button className="border border-white/20 text-white px-7 py-3.5 rounded font-semibold text-base hover:border-white/40 hover:bg-white/5 transition-colors">
                  Our Services
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/10"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-[hsl(43,100%,50%)] font-serif mb-1">
                  {stat.value}
                </div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[hsl(43,100%,45%)] font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)] mt-3 mb-4">
              Comprehensive Financial & Business Services
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From SMSF setup and administration to business tax planning and advisory, we offer a fully integrated suite of services for Australian individuals and businesses.
            </p>
          </AnimatedSection>

          <motion.div
            ref={useRef(null)}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={fadeUp}
                className="group p-7 border border-gray-100 rounded-xl hover:border-[hsl(43,100%,50%)/40%] hover:shadow-lg transition-all duration-300"
              >
                <div className="w-11 h-11 bg-[hsl(222,47%,11%)] rounded-lg flex items-center justify-center mb-5 group-hover:bg-[hsl(43,100%,50%)] transition-colors">
                  <service.icon size={20} className="text-[hsl(43,100%,50%)] group-hover:text-[hsl(222,47%,11%)]" />
                </div>
                <h3 className="font-serif font-bold text-lg text-[hsl(222,47%,11%)] mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                <Link href="/services">
                  <div className="mt-5 flex items-center gap-1.5 text-[hsl(222,47%,11%)] font-medium text-sm group-hover:text-[hsl(43,100%,45%)] transition-colors cursor-pointer">
                    Learn more
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection className="text-center mt-10">
            <Link href="/services">
              <button className="bg-[hsl(222,47%,11%)] text-white px-7 py-3.5 rounded font-semibold hover:bg-[hsl(222,47%,16%)] transition-colors inline-flex items-center gap-2">
                View All Services
                <ArrowRight size={16} />
              </button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 lg:py-28 bg-[hsl(222,47%,11%)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <span className="text-[hsl(43,100%,50%)] font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-white mt-3 mb-6">
                The Pointers Consulting Difference
              </h2>
              <p className="text-white/70 text-lg leading-relaxed mb-8">
                We're not a generalist accounting firm that handles super on the side. SMSF and business advisory is all we do, and that specialisation shows in the depth of our expertise and the quality of our advice.
              </p>
              <ul className="space-y-4">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="text-[hsl(43,100%,50%)] mt-0.5 shrink-0"
                    />
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/about">
                  <button className="border border-[hsl(43,100%,50%)/40%] text-[hsl(43,100%,50%)] px-6 py-3 rounded font-semibold hover:bg-[hsl(43,100%,50%)/10%] transition-colors inline-flex items-center gap-2">
                    About Our Team
                    <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Shield, label: "ATO Registered", sub: "SMSF Auditors" },
                  { icon: Users, label: "600+ Funds", sub: "Under Management" },
                  { icon: TrendingUp, label: "18+ Years", sub: "Industry Experience" },
                  { icon: Star, label: "5-Star Reviews", sub: "Google & Word of Mouth" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:bg-white/8 transition-colors"
                  >
                    <item.icon
                      size={28}
                      className="text-[hsl(43,100%,50%)] mx-auto mb-3"
                    />
                    <div className="text-white font-bold text-lg font-serif">
                      {item.label}
                    </div>
                    <div className="text-white/50 text-xs mt-1">{item.sub}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4 bg-[hsl(43,100%,50%)/10%] border border-[hsl(43,100%,50%)/20%] rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar size={20} className="text-[hsl(43,100%,50%)]" />
                  <span className="text-white font-semibold">Free Initial Consultation</span>
                </div>
                <p className="text-white/70 text-sm mb-4">
                  Talk to a specialist at no cost. We'll assess your situation and let you know exactly how we can help.
                </p>
                <Link href="/contact">
                  <button className="bg-[hsl(43,100%,50%)] text-[hsl(222,47%,11%)] px-5 py-2.5 rounded font-semibold text-sm w-full hover:bg-[hsl(43,100%,45%)] transition-colors flex items-center justify-center gap-2">
                    <Phone size={14} />
                    Book Your Consultation
                  </button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <span className="text-[hsl(43,100%,45%)] font-semibold text-sm uppercase tracking-wider">
              Client Stories
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)] mt-3">
              Trusted by Hundreds of Australians
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name}>
                <div className="bg-white rounded-xl p-7 shadow-sm border border-gray-100 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-[hsl(43,100%,50%)] text-[hsl(43,100%,50%)]" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-5 italic">
                    "{t.text}"
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <div className="font-semibold text-[hsl(222,47%,11%)] text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs mt-0.5">{t.role}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <AnimatedSection>
              <span className="text-[hsl(43,100%,45%)] font-semibold text-sm uppercase tracking-wider">
                Insights & News
              </span>
              <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)] mt-3">
                Latest from Our Blog
              </h2>
            </AnimatedSection>
            <AnimatedSection>
              <Link href="/blog">
                <button className="hidden md:flex items-center gap-2 text-[hsl(222,47%,11%)] font-semibold hover:text-[hsl(43,100%,45%)] transition-colors">
                  All Articles
                  <ArrowRight size={15} />
                </button>
              </Link>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <AnimatedSection key={post.slug}>
                <Link href={`/blog/${post.slug}`}>
                  <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                    <div className="bg-[hsl(222,47%,11%)] p-7 flex-1">
                      <span className="inline-block bg-[hsl(43,100%,50%)/15%] text-[hsl(43,100%,50%)] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                        {post.category}
                      </span>
                      <h3 className="font-serif font-bold text-white text-lg leading-snug group-hover:text-[hsl(43,100%,50%)] transition-colors">
                        {post.title}
                      </h3>
                    </div>
                    <div className="p-5 bg-white">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-10 md:hidden">
            <Link href="/blog">
              <button className="border border-[hsl(222,47%,11%)] text-[hsl(222,47%,11%)] px-6 py-3 rounded font-semibold inline-flex items-center gap-2">
                View All Articles
                <ArrowRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[hsl(43,100%,50%)] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[hsl(222,47%,11%)] mb-4">
              Ready to Take Control of Your Financial Future?
            </h2>
            <p className="text-[hsl(222,47%,11%)/80%] text-lg mb-8">
              Speak with one of our SMSF and business advisory specialists. Your first consultation is completely free.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-[hsl(222,47%,11%)] text-white px-7 py-3.5 rounded font-semibold hover:bg-[hsl(222,47%,16%)] transition-colors inline-flex items-center gap-2">
                  Book a Free Consultation
                  <ArrowRight size={16} />
                </button>
              </Link>
              <a href="tel:+61398001234">
                <button className="border-2 border-[hsl(222,47%,11%)] text-[hsl(222,47%,11%)] px-7 py-3.5 rounded font-semibold hover:bg-[hsl(222,47%,11%)/10%] transition-colors inline-flex items-center gap-2">
                  <Phone size={16} />
                  (03) 9800 1234
                </button>
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
