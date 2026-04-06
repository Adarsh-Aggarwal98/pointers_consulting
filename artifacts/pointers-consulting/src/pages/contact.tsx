import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

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

const services = [
  "SMSF Setup & Administration",
  "SMSF Compliance & Audit",
  "SMSF Investment Strategy",
  "Business Tax Planning",
  "Business Advisory",
  "Financial Planning",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    document.title = "Contact Us | Pointers Consulting — SMSF & Business Advisory";
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email is required";
    if (!form.service) e.service = "Please select a service";
    if (!form.message.trim() || form.message.trim().length < 20) e.message = "Please provide more detail (min 20 chars)";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Header */}
      <section className="bg-[hsl(222,47%,11%)] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-[hsl(43,100%,50%)] font-semibold text-sm uppercase tracking-wider">
              Get in Touch
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mt-3 mb-5">
              Contact Our Team
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              Whether you're ready to engage our services or simply want to understand your options, we're here to help. Your first consultation is always free.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <AnimatedSection>
                <h2 className="font-serif font-bold text-2xl text-[hsl(222,47%,11%)] mb-6">
                  Get in Touch
                </h2>
              </AnimatedSection>

              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "(03) 9800 1234",
                  sub: "Mon–Fri, 8:30am–5:30pm AEST",
                  href: "tel:+61398001234",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "info@pointersconsulting.com.au",
                  sub: "We respond within one business day",
                  href: "mailto:info@pointersconsulting.com.au",
                },
                {
                  icon: MapPin,
                  label: "Office",
                  value: "Suite 4, Level 2, 123 Collins Street",
                  sub: "Melbourne VIC 3000",
                  href: "#",
                },
                {
                  icon: Clock,
                  label: "Business Hours",
                  value: "Monday to Friday",
                  sub: "8:30am – 5:30pm AEST",
                  href: "",
                },
              ].map((item) => (
                <AnimatedSection key={item.label}>
                  <div className="flex gap-4 p-5 border border-gray-100 rounded-xl hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 bg-[hsl(222,47%,11%)] rounded-lg flex items-center justify-center shrink-0">
                      <item.icon size={17} className="text-[hsl(43,100%,50%)]" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium text-[hsl(222,47%,11%)] hover:text-[hsl(43,100%,45%)] transition-colors text-sm"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span className="font-medium text-[hsl(222,47%,11%)] text-sm">{item.value}</span>
                      )}
                      <div className="text-gray-500 text-xs mt-0.5">{item.sub}</div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}

              <AnimatedSection>
                <div className="bg-[hsl(222,47%,11%)] rounded-xl p-6">
                  <h3 className="font-serif font-bold text-white text-lg mb-2">
                    Free Initial Consultation
                  </h3>
                  <p className="text-white/60 text-sm mb-4">
                    Your first 30-minute consultation is completely free. We'll assess your situation and provide honest advice on how we can help.
                  </p>
                  <ul className="space-y-2">
                    {["No obligation", "Speak directly with a specialist", "Receive clear, actionable guidance"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-white/70 text-xs">
                        <CheckCircle size={13} className="text-[hsl(43,100%,50%)] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                {submitted ? (
                  <div className="text-center py-16 px-8 border border-gray-100 rounded-2xl">
                    <div className="w-16 h-16 bg-[hsl(43,100%,50%)/15%] rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={30} className="text-[hsl(43,100%,45%)]" />
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-[hsl(222,47%,11%)] mb-3">
                      Message Received
                    </h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. One of our advisers will be in touch within one business day to discuss your enquiry.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="border border-gray-100 rounded-2xl p-8 space-y-5"
                  >
                    <h2 className="font-serif font-bold text-2xl text-[hsl(222,47%,11%)] mb-2">
                      Send an Enquiry
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={form.name}
                          onChange={(e) => {
                            setForm({ ...form, name: e.target.value });
                            setErrors({ ...errors, name: "" });
                          }}
                          className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                            errors.name ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[hsl(222,47%,11%)]"
                          }`}
                          placeholder="John Smith"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => {
                            setForm({ ...form, email: e.target.value });
                            setErrors({ ...errors, email: "" });
                          }}
                          className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors ${
                            errors.email ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[hsl(222,47%,11%)]"
                          }`}
                          placeholder="john@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[hsl(222,47%,11%)] transition-colors"
                          placeholder="0412 345 678"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Service Enquiry <span className="text-red-500">*</span>
                        </label>
                        <select
                          value={form.service}
                          onChange={(e) => {
                            setForm({ ...form, service: e.target.value });
                            setErrors({ ...errors, service: "" });
                          }}
                          className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors bg-white ${
                            errors.service ? "border-red-400" : "border-gray-200 focus:border-[hsl(222,47%,11%)]"
                          }`}
                        >
                          <option value="">Select a service...</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                        {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={form.message}
                        onChange={(e) => {
                          setForm({ ...form, message: e.target.value });
                          setErrors({ ...errors, message: "" });
                        }}
                        rows={5}
                        className={`w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none ${
                          errors.message ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-[hsl(222,47%,11%)]"
                        }`}
                        placeholder="Tell us about your situation and what you'd like help with..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-500 text-xs">
                        By submitting this form, you consent to Pointers Consulting contacting you regarding your enquiry. Your information is handled in accordance with the Privacy Act 1988 (Cth).
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="bg-[hsl(222,47%,11%)] text-white px-7 py-3.5 rounded-lg font-semibold hover:bg-[hsl(222,47%,16%)] transition-colors inline-flex items-center gap-2 w-full justify-center sm:w-auto"
                    >
                      <Send size={15} />
                      Send Enquiry
                    </button>
                  </form>
                )}
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
