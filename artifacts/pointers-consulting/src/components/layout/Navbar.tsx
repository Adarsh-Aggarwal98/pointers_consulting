import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, ChevronRight, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const aboutDropdown = [
  { href: "/about", label: "Who We Are" },
  { href: "/about/message-from-director", label: "Message from Director" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us", dropdown: aboutDropdown },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Top info bar */}
      <div className="bg-[#459443] text-white text-xs hidden lg:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-end gap-6">
          <a href="tel:+61426784982" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Phone size={11} />
            +61 426 784 982
          </a>
          <a href="mailto:sam@pointersconsulting.com.au" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
            <Mail size={11} />
            sam@pointersconsulting.com.au
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`bg-white transition-all duration-300 ${scrolled ? "shadow-md" : "shadow-sm"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img
                  src="https://pointersconsulting.com.au/wp-content/uploads/2026/01/Pointers-logo.png"
                  alt="Pointers Consulting"
                  className="h-10 lg:h-12 w-auto object-contain"
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

            <div className="hidden lg:flex items-center gap-7">
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
                        className={`flex items-center gap-1 text-sm font-medium transition-colors cursor-pointer ${
                          isAboutActive ? "text-[#459443]" : "text-gray-700 hover:text-[#459443]"
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
                          className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-100 rounded-lg shadow-lg overflow-hidden z-50"
                          onMouseEnter={() => handleMouseEnter(link.label)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {link.dropdown.map((item) => (
                            <Link key={item.href} href={item.href}>
                              <div
                                className={`px-4 py-3 text-sm cursor-pointer transition-colors hover:bg-[#459443]/5 hover:text-[#459443] ${
                                  location === item.href ? "text-[#459443] bg-[#459443]/5 font-semibold" : "text-gray-700"
                                }`}
                              >
                                {item.label}
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
                      className={`text-sm font-medium transition-colors cursor-pointer ${
                        location === link.href
                          ? "text-[#459443]"
                          : "text-gray-700 hover:text-[#459443]"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              )}
              <Link href="/contact">
                <button className="bg-[#459443] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-[#3a7f38] transition-colors">
                  Book Appointment
                </button>
              </Link>
            </div>

            <button
              className="lg:hidden text-gray-700 p-2"
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
                          : "text-gray-700 hover:text-[#459443] hover:bg-gray-50"
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
                            location === sub.href ? "text-[#459443] font-semibold" : "text-gray-600 hover:text-[#459443]"
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
                <a href="tel:+61426784982" className="flex items-center gap-2 py-2 px-3 text-gray-600 text-sm">
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
