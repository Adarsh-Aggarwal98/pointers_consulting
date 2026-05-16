import { useEffect, useState } from "react";
import { applySEO } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  Search, ArrowRight, Clock, Calendar, TrendingUp,
  Home, FileText, BarChart2, Shield, Landmark, Lightbulb,
} from "lucide-react";
import type { BlogSummary } from "@/data/blog-types";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

type CatMeta = { color: string; bg: string; icon: React.ReactNode };

const CATEGORY_META: Record<string, CatMeta> = {
  SMSF: {
    color: "#2D6A4F",
    bg: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
    icon: <Home size={110} strokeWidth={0.8} />,
  },
  Tax: {
    color: "#1B4332",
    bg: "linear-gradient(135deg, #0D1B0D 0%, #1B4332 100%)",
    icon: <FileText size={110} strokeWidth={0.8} />,
  },
  "Business Advisory": {
    color: "#40916C",
    bg: "linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)",
    icon: <BarChart2 size={110} strokeWidth={0.8} />,
  },
  Compliance: {
    color: "#1B4332",
    bg: "linear-gradient(135deg, #1B4332 0%, #40916C 100%)",
    icon: <Shield size={110} strokeWidth={0.8} />,
  },
  Superannuation: {
    color: "#2D6A4F",
    bg: "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)",
    icon: <Landmark size={110} strokeWidth={0.8} />,
  },
};
const DEFAULT_META: CatMeta = {
  color: "#459443",
  bg: "linear-gradient(135deg, #1a2e1a 0%, #459443 100%)",
  icon: <Lightbulb size={110} strokeWidth={0.8} />,
};

function getCategoryMeta(cat: string): CatMeta {
  return CATEGORY_META[cat] ?? DEFAULT_META;
}

function CardGraphic({ category, coverImage }: { category: string; coverImage?: string }) {
  const meta = getCategoryMeta(category);
  const patternId = `dots-${category.replace(/\s+/g, "")}`;

  if (coverImage) {
    return (
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img src={coverImage} alt={category} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,46,26,0.85) 0%, transparent 60%)" }} />
        <div className="absolute bottom-4 left-4">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 px-2.5 py-1 rounded-sm" style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}>
            {category}
          </span>
        </div>
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #80d97e, #459443)" }} />
      </div>
    );
  }

  return (
    <div className="relative h-44 overflow-hidden flex-shrink-0" style={{ background: meta.bg }}>
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={patternId} x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="2.5" cy="2.5" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, transparent 50%, rgba(255,255,255,0.06) 100%)" }} />
      <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-white/[0.09] pointer-events-none">
        {meta.icon}
      </div>
      <div className="absolute bottom-4 left-4">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/90 px-2.5 py-1 rounded-sm" style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(6px)" }}>
          {category}
        </span>
      </div>
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "linear-gradient(90deg, #80d97e, #459443)" }} />
    </div>
  );
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    applySEO({
      title: "SMSF & Tax Insights Blog | Pointers Consulting",
      description:
        "Expert articles on SMSF, superannuation, tax strategies, and business succession planning for Australian businesses and investors.",
      canonical: "/blog",
    });
    window.scrollTo(0, 0);
    fetch("/api/blogs")
      .then((r) => r.json())
      .then((data) => { if (data.success) setPosts(data.posts); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  const filtered = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      (post.excerpt ?? "").toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="overflow-x-hidden" style={{ background: "#F9F7F2" }}>

      {/* ── Hero ── */}
      <section className="relative pt-44 pb-16 overflow-hidden" style={{ background: "#1a2e1a" }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#459443 1px, transparent 1px), linear-gradient(90deg, #459443 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-[0.03]" style={{ background: "radial-gradient(circle at 80% 50%, #459443, transparent 60%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm mb-6" style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}>
              Insights & Analysis
            </span>
            <h1
              className="text-5xl lg:text-7xl font-bold text-white leading-none mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Growth<br />
              <span style={{ color: "#80d97e", fontStyle: "italic" }}>Insights</span>
            </h1>
            <p
              className="text-white/50 text-sm max-w-md font-light leading-relaxed mt-5"
              style={{ fontFamily: "'Lora', Georgia, serif" }}
            >
              Expert thinking on SMSFs, Australian tax law, business strategy and financial planning — from our desk to yours.
            </p>
            <div className="flex items-center gap-5 mt-8 text-white/30 text-xs">
              <span className="flex items-center gap-1.5"><TrendingUp size={12} /> {posts.length} Articles</span>
              <span>·</span>
              <span>{categories.length - 1} Topics</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Search & Filter ── */}
      <div
        className="sticky top-[104px] z-30 border-b"
        style={{ background: "rgba(249,247,242,0.96)", backdropFilter: "blur(12px)", borderColor: "rgba(69,148,67,0.12)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm focus:outline-none w-56 rounded-full transition-all"
                style={{ background: "white", border: "1.5px solid #E5E7EB", color: "#1C1C1C", fontFamily: "'Lora', Georgia, serif" }}
                onFocus={(e) => (e.target.style.borderColor = "#459443")}
                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full transition-all"
                  style={
                    activeCategory === cat
                      ? { background: "#1a2e1a", color: "white" }
                      : { background: "transparent", color: "#6B7280", border: "1.5px solid #E5E7EB" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Articles ── */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex flex-col items-center py-28 gap-4">
              <div className="w-8 h-8 rounded-full border-2 border-[#459443]/30 border-t-[#459443] animate-spin" />
              <p className="text-sm" style={{ color: "#9CA3AF", fontFamily: "'Lora', serif" }}>Loading articles…</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-28">
              <p className="text-3xl mb-3" style={{ fontFamily: "'Playfair Display', serif", color: "#1a2e1a" }}>Nothing found</p>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>Try adjusting your search or filter</p>
            </div>
          ) : (
            <>
              {/* ── Featured Post ── */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-12"
                >
                  <Link href={`/blog/${featured.slug}`}>
                    <div
                      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl"
                      style={{ background: "#1a2e1a" }}
                    >
                      <div className="h-[3px] w-full" style={{ background: "linear-gradient(90deg, #459443, #80d97e, #459443)" }} />
                      <div className="grid lg:grid-cols-5">
                        {/* Left text */}
                        <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-between min-h-[260px]">
                          <div>
                            <div className="flex items-center gap-2.5 mb-6">
                              <span className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm" style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}>
                                Featured
                              </span>
                              <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.45)" }}>
                                {featured.category}
                              </span>
                            </div>
                            <h2
                              className="text-3xl lg:text-4xl font-bold text-white leading-tight group-hover:text-[#80d97e] transition-colors duration-300"
                              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
                            >
                              {featured.title}
                            </h2>
                          </div>
                          <div className="flex items-center gap-5 mt-8" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
                            <span className="flex items-center gap-1.5"><Calendar size={11} /> {featured.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={11} /> {featured.readTime}</span>
                          </div>
                        </div>
                        {/* Right excerpt + cta */}
                        <div
                          className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-between"
                          style={{ background: "rgba(255,255,255,0.04)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          <p
                            className="leading-relaxed line-clamp-5"
                            style={{ fontFamily: "'Lora', Georgia, serif", color: "rgba(255,255,255,0.55)", fontSize: "0.93rem", lineHeight: 1.85 }}
                          >
                            {featured.excerpt}
                          </p>
                          <div className="flex items-center gap-2 font-semibold text-sm mt-8 group-hover:gap-4 transition-all duration-300" style={{ color: "#80d97e" }}>
                            Read Full Article <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* ── Section label ── */}
              {rest.length > 0 && (
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#459443" }}>All Articles</span>
                  <div className="h-px flex-1" style={{ background: "rgba(69,148,67,0.18)" }} />
                </div>
              )}

              {/* ── Card Grid ── */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {rest.map((post) => (
                  <motion.div key={post.slug} variants={fadeUp}>
                    <Link href={`/blog/${post.slug}`}>
                      <article
                        className="group h-full flex flex-col rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                        style={{ background: "white", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
                      >
                        {/* Visual card header */}
                        <CardGraphic category={post.category} coverImage={post.cover_image || post.coverImage} />

                        <div className="p-6 flex flex-col flex-1">
                          {/* Title */}
                          <h3
                            className="font-bold leading-snug mb-4 flex-1 group-hover:text-[#459443] transition-colors duration-200"
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontSize: "1.08rem",
                              color: "#1a2e1a",
                              lineHeight: 1.45,
                            }}
                          >
                            {post.title}
                          </h3>

                          {/* Footer */}
                          <div
                            className="flex items-center justify-between pt-4 mt-auto"
                            style={{ borderTop: "1px solid #F3F4F6" }}
                          >
                            <div className="flex items-center gap-3 text-xs" style={{ color: "#9CA3AF" }}>
                              <span className="flex items-center gap-1"><Calendar size={10} /> {post.date}</span>
                              <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                            </div>
                            <span
                              className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2.5 transition-all"
                              style={{ color: "#459443" }}
                            >
                              Read <ArrowRight size={11} />
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* ── Newsletter ── */}
      <section className="py-20" style={{ background: "#1a2e1a" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm mb-6" style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}>
            Newsletter
          </span>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", letterSpacing: "-0.02em" }}
          >
            Stay Ahead of the Curve
          </h2>
          <p className="mb-8 font-light" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Lora', serif", lineHeight: 1.8 }}>
            Get our latest SMSF and tax insights delivered directly to your inbox. No noise, just clarity.
          </p>
          <div className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 text-sm rounded-lg focus:outline-none"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "white", fontFamily: "'Lora', serif" }}
            />
            <button
              className="px-5 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all hover:opacity-90"
              style={{ background: "#459443", color: "white" }}
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.2)" }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
