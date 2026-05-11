import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["FinancialService", "ProfessionalService"],
  "name": "Pointers Consulting",
  "description": "SMSF, tax, and business advisory specialists for Australian businesses, investors, and professionals. Authorised Representative of JPATAX.",
  "url": "https://pointersconsulting.com.au",
  "telephone": "+61426784982",
  "email": "sam@pointersconsulting.com.au",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Level 17, Tower 4, 727 Collins Street",
    "addressLocality": "Docklands",
    "addressRegion": "VIC",
    "postalCode": "3008",
    "addressCountry": "AU"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "09:00",
    "closes": "17:00"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "founder": {
    "@type": "Person",
    "name": "Sharat Sharma",
    "alternateName": "Sam",
    "jobTitle": "Founder & Director",
    "hasCredential": [
      "CPA Australia",
      "Registered Tax Agent #26122730",
      "SMSF Association Member",
      "ASIC Registered Agent"
    ]
  },
  "sameAs": [
    "https://www.linkedin.com/company/pointers-consulting",
    "https://www.facebook.com/pointersconsulting"
  ]
};

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    let el = document.querySelector('script[data-seo="org"]') as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.setAttribute("data-seo", "org");
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(ORG_SCHEMA);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
