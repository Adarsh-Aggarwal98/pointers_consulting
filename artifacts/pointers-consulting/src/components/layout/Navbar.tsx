import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[hsl(222,47%,11%)] shadow-lg"
          : "bg-[hsl(222,47%,11%)]"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer group">
              <div className="w-9 h-9 bg-[hsl(43,100%,50%)] rounded-sm flex items-center justify-center">
                <span className="text-[hsl(222,47%,11%)] font-bold text-lg font-serif leading-none">P</span>
              </div>
              <div>
                <div className="text-white font-semibold text-base leading-tight tracking-wide">
                  Pointers Consulting
                </div>
                <div className="text-[hsl(43,100%,50%)] text-[10px] uppercase tracking-widest leading-tight">
                  SMSF & Business Advisory
                </div>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    location === link.href
                      ? "text-[hsl(43,100%,50%)]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <button className="bg-[hsl(43,100%,50%)] text-[hsl(222,47%,11%)] px-5 py-2 rounded text-sm font-semibold hover:bg-[hsl(43,100%,45%)] transition-colors">
                Free Consultation
              </button>
            </Link>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[hsl(222,47%,8%)] border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`flex items-center justify-between py-3 px-3 rounded-md cursor-pointer transition-colors ${
                      location === link.href
                        ? "bg-[hsl(43,100%,50%)/10%] text-[hsl(43,100%,50%)]"
                        : "text-white/80 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="font-medium">{link.label}</span>
                    <ChevronRight size={16} />
                  </div>
                </Link>
              ))}
              <div className="pt-3">
                <Link href="/contact">
                  <button className="w-full bg-[hsl(43,100%,50%)] text-[hsl(222,47%,11%)] py-3 rounded font-semibold">
                    Free Consultation
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
