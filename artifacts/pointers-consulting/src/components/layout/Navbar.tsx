import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const aboutDropdown = [
  { href: "/about", label: "Who We Are" },
  { href: "/about/message-from-director", label: "Message from Director" },
];

const servicesDropdown = [
  { href: "/services/smsf", label: "Self-Managed Super Fund (SMSF)", specialist: true },
  { href: "/services/business-advisory", label: "Business Advisory & Taxation" },
  { href: "/services/legal-compliance", label: "Legal — Setups & Registrations" },
  { href: "/services/assurance-risk", label: "Audit & Risk Assurance" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us", dropdown: aboutDropdown },
  { href: "/services", label: "Services", dropdown: servicesDropdown },
  { href: "/blog", label: "Growth Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  const isAboutActive = location === "/about" || location.startsWith("/about/");
  const isServicesActive = location === "/services" || location.startsWith("/services/");

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Marquee ticker bar */}
      <div className="bg-[#459443] overflow-hidden py-1.5">
        <div className="animate-marquee whitespace-nowrap text-white text-xs font-semibold tracking-wide">
          Think Big - Act Smart - Stay Compliant &nbsp;&nbsp;|&nbsp;&nbsp; Try our Free SMSF FitForMe Tool &nbsp;&nbsp;|&nbsp;&nbsp; Think Big - Act Smart - Stay Compliant &nbsp;&nbsp;|&nbsp;&nbsp; Try our Free SMSF FitForMe Tool &nbsp;&nbsp;|&nbsp;&nbsp; Think Big - Act Smart - Stay Compliant &nbsp;&nbsp;|&nbsp;&nbsp; Try our Free SMSF FitForMe Tool &nbsp;&nbsp;|&nbsp;&nbsp;
        </div>
      </div>

      {/* Top info bar */}
      <div className="bg-[#1a2e1a] text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-end gap-6">
          <a href="tel:+61426784982" className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors">
            <Phone size={11} />
            +61 426 784 982
          </a>
          <a href="mailto:sam@pointersconsulting.com.au" className="flex items-center gap-1.5 text-white hover:text-white/80 transition-colors">
            <Mail size={11} />
            sam@pointersconsulting.com.au
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 lg:h-22">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src="/images/Pointers-logo.png"
                  alt="Pointers Consulting"
                  className="h-16 lg:h-20 w-auto object-contain"
                  onError={(e) => {
                    const t = e.currentTarget;
                    t.style.display = "none";
                    const fallback = document.createElement("div");
                    fallback.className = "flex items-center gap-2";
                    fallback.innerHTML = `<div class="w-9 h-9 bg-[#459443] rounded flex items-center justify-center"><span class="text-white font-bold text-lg">P</span></div><div><div class="text-[#1a2e1a] font-bold text-base leading-tight">Pointers Consulting</div><div class="text-[#459443] text-[10px] uppercase tracking-widest">SMSF & Business Advisory</div></div>`;
                    t.parentNode?.appendChild(fallback);
                  }}
                />
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-7 lg:gap-5">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(link.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link href={link.href}>
                      <span
                        className={`flex items-center gap-1 text-base lg:text-lg font-semibold transition-colors cursor-pointer ${
                          (link.label === "About Us" && isAboutActive) || (link.label === "Services" && isServicesActive)
                            ? "text-[#459443]"
                            : "text-[#0a0a0a] hover:text-[#459443]"
                        }`}
                      >
                        {link.label}
                        <ChevronDown size={13} className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                      </span>
                    </Link>

                    <AnimatePresence>
                      {activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15 }}
                          className={`absolute top-full left-0 mt-1 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50 ${link.label === "Services" ? "w-80" : "w-56"}`}
                          onMouseEnter={() => handleMouseEnter(link.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {link.dropdown.map((item) => (
                            <Link key={item.href} href={item.href}>
                              <div
                                className={`px-4 py-3 text-base lg:text-lg cursor-pointer transition-colors hover:bg-[#459443]/5 hover:text-[#459443] flex items-center justify-between gap-2 ${
                                  location === item.href ? "text-[#459443] bg-[#459443]/5 font-semibold" : "text-[#0a0a0a]"
                                } ${"specialist" in item && (item as { specialist?: boolean }).specialist ? "border-b border-gray-100 font-medium" : ""}`}
                              >
                                <span>{item.label}</span>
                                {"specialist" in item && (item as { specialist?: boolean }).specialist && (
                                  <span className="text-[10px] font-bold bg-[#459443] text-white px-1.5 py-0.5 rounded uppercase tracking-wide shrink-0">
                                    Specialist
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={`text-base lg:text-lg font-semibold transition-colors cursor-pointer ${
                        location === link.href
                          ? "text-[#459443]"
                          : "text-[#0a0a0a] hover:text-[#459443]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              )}
              <Link href="/contact">
                <button className="bg-[#459443] text-white px-5 py-2 rounded text-base lg:text-lg font-semibold hover:bg-[#3a7f38] transition-colors">
                  Book Appointment
                </button>
              </Link>
              <a href="/crm/login">
                <button className="border border-[#459443] text-[#459443] px-5 py-2 rounded text-base lg:text-lg font-semibold hover:bg-[#459443] hover:text-white transition-colors">
                  Login
                </button>
              </a>
            </div>

            <button
              className="lg:hidden text-[#0a0a0a] p-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  <Link href={link.href}>
                    <div
                      className={`flex items-center justify-between py-3 px-3 rounded-md cursor-pointer transition-colors ${
                        location === link.href || (link.dropdown && isAboutActive)
                          ? "bg-[#459443]/10 text-[#459443]"
                          : "text-[#0a0a0a] hover:text-[#459443] hover:bg-gray-50"
                      }`}
                    >
                      <span className="font-medium">{link.label}</span>
                      <ChevronRight size={16} />
                    </div>
                  </Link>
                  {link.dropdown && (
                    <div className="ml-4 space-y-1">
                      {link.dropdown.map((sub) => (
                        <Link key={sub.href} href={sub.href}>
                          <div className={`py-2 px-3 rounded-md text-sm cursor-pointer transition-colors ${
                            location === sub.href ? "text-[#459443] font-semibold" : "text-[#0a0a0a] hover:text-[#459443]"
                          }`}>
                            {sub.label}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-3 space-y-2">
                <a href="tel:+61426784982" className="flex items-center gap-2 py-2 px-3 text-[#0a0a0a] text-sm">
                  <Phone size={14} className="text-[#459443]" />
                  +61 426 784 982
                </a>
                <Link href="/contact">
                  <button className="w-full bg-[#459443] text-white py-3 rounded font-semibold">
                    Book Appointment
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
