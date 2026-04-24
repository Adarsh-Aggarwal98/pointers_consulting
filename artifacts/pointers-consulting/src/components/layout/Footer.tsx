import { Link } from "wouter";
import { Phone, Mail, MapPin, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1a2e1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="lg:col-span-1">
            <div className="mb-5">
              <img
                src="https://pointersconsulting.com.au/wp-content/uploads/2026/01/banner-logo-Scoreapp-1769407742.png"
                alt="Pointers Consulting"
                className="h-12 w-auto object-contain"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.style.display = "none";
                  const fallback = document.createElement("div");
                  fallback.innerHTML = `<div class="text-white font-bold text-xl">Pointers Consulting</div><div class="text-[#459443] text-xs uppercase tracking-widest mt-0.5">SMSF & Business Advisory</div>`;
                  t.parentNode?.appendChild(fallback);
                }}
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-3">
              Authorised Representative of JPATAX
            </p>
            <p className="text-white/50 text-xs mb-5">Tax Agent # 26122730</p>
            <p className="text-white/60 text-sm leading-relaxed mb-5">
              A boutique advisory firm specialising in SMSF, tax and business advisory, backed by an AI powered support hub.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#459443] text-white/60 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#459443] text-white/60 hover:text-white flex items-center justify-center transition-colors"
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
                "Self-Managed Superfund (SMSF)",
                "Business Advisory & Taxation",
                "Legal Aid – Setups & Registrations",
                "Audit & Risk Assurance",
              ].map((service) => (
                <li key={service}>
                  <Link href="/services">
                    <span className="text-white/60 hover:text-[#459443] text-sm transition-colors cursor-pointer">
                      {service}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Links
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Services", href: "/services" },
                { label: "Blog", href: "/blog" },
                { label: "Contact Us", href: "/contact" },
                { label: "Book Appointment", href: "/contact" },
              ].map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href}>
                    <span className="text-white/60 hover:text-[#459443] text-sm transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contacts
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={15} className="text-[#459443] mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm">
                  Tower 4, Level 17<br />
                  727 Collins Street<br />
                  Docklands VIC 3008
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={15} className="text-[#459443] shrink-0" />
                <a
                  href="tel:+61426784982"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  +61 426 784 982
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={15} className="text-[#459443] shrink-0" />
                <a
                  href="mailto:sam@pointersconsulting.com.au"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  sam@pointersconsulting.com.au
                </a>
              </li>
              <li className="text-white/50 text-xs">
                Mon to Fri 9:00am to 5:00pm
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-white/40 text-xs">
              &copy; {new Date().getFullYear()} Pointers Consulting — SMSF & Taxation Specialists. All rights reserved.
            </p>
            <p className="text-white/30 text-xs">
              General information only. Not financial advice. Seek professional guidance before acting.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
