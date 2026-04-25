import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const services = [
  "Self-Managed Superfund (SMSF)",
  "Business Advisory & Taxation",
  "Legal Aid – Setups & Registrations",
  "Audit & Risk Assurance",
  "Other / General Enquiry",
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

  useEffect(() => {
    document.title = "Contact Us | Pointers Consulting";
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="bg-[#1a2e1a] pt-44 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Contact Us</h1>
            <p className="text-white text-sm max-w-2xl font-normal">
              Book an appointment or send us a message. Our team will be in touch within one business day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-[#fafffa]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="bg-[#1a2e1a] rounded-xl p-7">
                <h2 className="font-bold text-white text-xl mb-6">Contact Details</h2>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#459443]/20 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-[#459443]" />
                    </div>
                    <div>
                      <p className="text-white text-xs uppercase tracking-wider mb-1">Office</p>
                      <p className="text-white text-sm font-normal leading-relaxed">
                        Tower 4, Level 17<br />
                        727 Collins Street<br />
                        Docklands, VIC 3008
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#459443]/20 rounded-lg flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-[#459443]" />
                    </div>
                    <div>
                      <p className="text-white text-xs uppercase tracking-wider mb-1">Phone</p>
                      <a href="tel:+61426784982" className="text-white text-sm hover:text-[#459443] transition-colors">
                        +61 426 784 982
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#459443]/20 rounded-lg flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-[#459443]" />
                    </div>
                    <div>
                      <p className="text-white text-xs uppercase tracking-wider mb-1">Email</p>
                      <a href="mailto:sam@pointersconsulting.com.au" className="text-white text-sm hover:text-[#459443] transition-colors break-all">
                        sam@pointersconsulting.com.au
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 bg-[#459443]/20 rounded-lg flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-[#459443]" />
                    </div>
                    <div>
                      <p className="text-white text-xs uppercase tracking-wider mb-1">Hours</p>
                      <p className="text-white text-sm font-normal">Mon to Fri: 9:00am – 5:00pm</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-7 border border-[#459443]/20">
                <h3 className="font-bold text-[#1a2e1a] mb-4">Why Choose Us</h3>
                <ul className="space-y-3">
                  {[
                    "Free, no-pressure first 15 min chat",
                    "SMSF, Tax & business Experts – our exclusivity",
                    "Transparent fixed fee pricing upfront, no hidden extras",
                    "24–48 hour response time",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle size={15} className="text-[#459443] shrink-0" />
                      <span className="text-[#0a0a0a] text-sm font-normal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <div className="bg-white rounded-xl border border-[#459443]/30 p-14 text-center">
                  <div className="w-16 h-16 bg-[#459443] rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={30} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-[#1a2e1a] mb-3">Message Sent!</h2>
                  <p className="text-[#0a0a0a] mb-2 font-normal">Thank you for contacting Pointers Consulting.</p>
                  <p className="text-[#0a0a0a] text-sm font-normal">
                    We'll be in touch within one business day. If urgent, call us at{" "}
                    <a href="tel:+61426784982" className="text-[#459443] font-semibold">+61 426 784 982</a>.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-[#459443] font-semibold text-sm hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm">
                  <h2 className="font-bold text-[#1a2e1a] text-2xl mb-2">Send Us a Message</h2>
                  <p className="text-[#0a0a0a] text-sm mb-8 font-normal">
                    Fill in the form below and we'll get back to you as soon as possible.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                          Full Name <span className="text-[#459443]">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#459443] focus:ring-1 focus:ring-[#459443]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                          Email Address <span className="text-[#459443]">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#459443] focus:ring-1 focus:ring-[#459443]/20 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+61 4xx xxx xxx"
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#459443] focus:ring-1 focus:ring-[#459443]/20 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">Service Required</label>
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#459443] focus:ring-1 focus:ring-[#459443]/20 transition-colors bg-white text-[#0a0a0a]"
                        >
                          <option value="">Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                        Message <span className="text-[#459443]">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us about your situation and how we can help…"
                        className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#459443] focus:ring-1 focus:ring-[#459443]/20 transition-colors resize-none"
                      />
                    </div>

                    <p className="text-[#0a0a0a] text-xs font-normal">
                      By submitting this form, you agree to be contacted by our team. We will never share your personal information.
                    </p>

                    <button
                      type="submit"
                      className="w-full bg-[#459443] text-white py-3.5 rounded-lg font-semibold hover:bg-[#3a7f38] transition-colors flex items-center justify-center gap-2"
                    >
                      <Send size={16} />
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
