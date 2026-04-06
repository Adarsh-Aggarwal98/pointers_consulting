import { Link } from "wouter";
import { Phone, Mail, MapPin, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[hsl(222,47%,8%)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 bg-[hsl(43,100%,50%)] rounded-sm flex items-center justify-center">
                <span className="text-[hsl(222,47%,11%)] font-bold text-lg font-serif leading-none">P</span>
              </div>
              <div>
                <div className="text-white font-semibold text-base leading-tight">
                  Pointers Consulting
                </div>
                <div className="text-[hsl(43,100%,50%)] text-[10px] uppercase tracking-widest leading-tight">
                  SMSF & Business Advisory
                </div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              Specialist SMSF and business advisory services for Australians building lasting financial security. Expert guidance, trusted results.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[hsl(43,100%,50%)] hover:text-[hsl(222,47%,11%)] text-white/60 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[hsl(43,100%,50%)] hover:text-[hsl(222,47%,11%)] text-white/60 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {[
                "SMSF Setup & Administration",
                "SMSF Compliance & Audit",
                "SMSF Investment Strategy",
                "Business Tax Planning",
                "Business Advisory",
                "Financial Planning",
              ].map((service) => (
                <li key={service}>
                  <Link href="/services">
                    <span className="text-white/60 hover:text-[hsl(43,100%,50%)] text-sm transition-colors cursor-pointer">
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-white/60 hover:text-[hsl(43,100%,50%)] text-sm transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[hsl(43,100%,50%)] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  Suite 4, Level 2<br />
                  123 Collins Street<br />
                  Melbourne VIC 3000
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[hsl(43,100%,50%)] shrink-0" />
                <a
                  href="tel:+61398001234"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  (03) 9800 1234
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[hsl(43,100%,50%)] shrink-0" />
                <a
                  href="mailto:info@pointersconsulting.com.au"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  info@pointersconsulting.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-white/40 text-xs">
              <p>&copy; {new Date().getFullYear()} Pointers Consulting Pty Ltd. All rights reserved.</p>
              <p className="mt-1">ABN: 12 345 678 901 | AFSL: 123456 | Registered Tax Agent: 12345678</p>
            </div>
            <p className="text-white/30 text-xs max-w-sm text-right">
              General information only. This website does not constitute financial advice. Please consult a qualified adviser before acting on any information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
