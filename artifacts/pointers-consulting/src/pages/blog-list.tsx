import { useEffect, useState } from "react";
import { applySEO } from "@/lib/seo";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowRight, Clock, Calendar, TrendingUp } from "lucide-react";
import type { BlogSummary } from "@/data/blog-types";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const CATEGORY_COLORS: Record<string, string> = {
  SMSF: "#2D6A4F",
  Tax: "#1B4332",
  "Business Advisory": "#40916C",
  Compliance: "#52B788",
  Superannuation: "#74C69D",
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? "#459443";
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    applySEO({
      title: "SMSF & Tax Insights Blog | Pointers Consulting",
      description: "Expert articles on SMSF, superannuation, tax strategies, and business succession planning for Australian businesses and investors.",
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
      <section
        className="relative pt-44 pb-16 overflow-hidden"
        style={{ background: "#1a2e1a" }}
      >
        {/* subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#459443 1px, transparent 1px), linear-gradient(90deg, #459443 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* diagonal accent */}
        <div
          className="absolute -right-24 top-0 w-80 h-full opacity-10"
          style={{
            background: "linear-gradient(135deg, #459443 0%, transparent 60%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm"
                style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}
              >
                Insights & Analysis
              </span>
              <span className="text-white/20 text-xs">—</span>
              <span className="text-white/40 text-xs">{new Date().toLocaleDateString("en-AU", { year: "numeric", month: "long" })}</span>
            </div>

            <h1
              className="text-5xl lg:text-7xl font-bold text-white leading-none mb-5"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
            >
              Growth<br />
              <span style={{ color: "#80d97e", fontStyle: "italic" }}>Insights</span>
            </h1>

            <div className="flex items-center gap-4 mt-8">
              <div className="h-px flex-1 max-w-xs" style={{ background: "linear-gradient(90deg, #459443, transparent)" }} />
              <p className="text-white/60 text-sm max-w-lg font-light leading-relaxed" style={{ fontFamily: "'Lora', Georgia, serif" }}>
                Expert thinking on SMSFs, Australian tax law, business strategy and financial planning — from our desk to yours.
              </p>
            </div>

            <div className="flex items-center gap-6 mt-10 text-white/40 text-xs">
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
        style={{ background: "rgba(249,247,242,0.95)", backdropFilter: "blur(12px)", borderColor: "rgba(69,148,67,0.12)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
              <input
                type="text"
                placeholder="Search articles…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 text-sm focus:outline-none w-60 rounded-full transition-all"
                style={{
                  background: "white",
                  border: "1.5px solid #E5E7EB",
                  color: "#1C1C1C",
                  fontFamily: "'Lora', Georgia, serif",
                }}
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
                      ? { background: "#1a2e1a", color: "white", letterSpacing: "0.08em" }
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
      <section className="py-16">
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
              {/* Featured */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  className="mb-14"
                >
                  <Link href={`/blog/${featured.slug}`}>
                    <div className="group relative rounded-2xl overflow-hidden cursor-pointer" style={{ background: "#1a2e1a" }}>
                      {/* decorative top strip */}
                      <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #459443, #80d97e, #459443)" }} />

                      <div className="grid lg:grid-cols-5">
                        {/* Left: headline */}
                        <div className="lg:col-span-3 p-10 lg:p-14 flex flex-col justify-between min-h-[320px] relative">
                          <div
                            className="absolute bottom-0 right-0 w-40 h-40 opacity-5 rounded-full"
                            style={{ background: "#459443", transform: "translate(30%, 30%)" }}
                          />
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <span
                                className="text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm"
                                style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}
                              >
                                Featured
                              </span>
                              <span
                                className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-sm"
                                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
                              >
                                {featured.category}
                              </span>
                            </div>
                            <h2
                              className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight group-hover:text-[#80d97e] transition-colors duration-300"
                              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.02em" }}
                            >
                              {featured.title}
                            </h2>
                          </div>
                          <div className="flex items-center gap-5 mt-8" style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem" }}>
                            <span className="flex items-center gap-1.5"><Calendar size={11} />{featured.date}</span>
                            <span className="flex items-center gap-1.5"><Clock size={11} />{featured.readTime}</span>
                            {featured.author && <span>By {featured.author}</span>}
                          </div>
                        </div>

                        {/* Right: excerpt + CTA */}
                        <div
                          className="lg:col-span-2 p-10 lg:p-14 flex flex-col justify-between"
                          style={{ background: "rgba(255,255,255,0.04)", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
                        >
                          <p
                            className="leading-relaxed"
                            style={{ fontFamily: "'Lora', Georgia, serif", color: "rgba(255,255,255,0.6)", fontSize: "0.95rem", lineHeight: 1.8 }}
                          >
                            {featured.excerpt}
                          </p>
                          <div
                            className="flex items-center gap-2 font-semibold text-sm mt-8 group-hover:gap-4 transition-all duration-300"
                            style={{ color: "#80d97e" }}
                          >
                            Read Full Article <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Section label */}
              {rest.length > 0 && (
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "#459443" }}>All Articles</span>
                  <div className="h-px flex-1" style={{ background: "rgba(69,148,67,0.2)" }} />
                </div>
              )}

              {/* Grid */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {rest.map((post, i) => (
                  <motion.div key={post.slug} variants={fadeUp}>
                    <Link href={`/blog/${post.slug}`}>
                      <article
                        className="group h-full flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                      >
                        {/* Top color bar */}
                        <div
                          className="h-1 w-full shrink-0 transition-all duration-300 group-hover:h-1.5"
                          style={{ background: getCategoryColor(post.category) }}
                        />

                        <div className="p-7 flex flex-col flex-1">
                          {/* Category + read time */}
                          <div className="flex items-center justify-between mb-4">
                            <span
                              className="text-[10px] font-bold uppercase tracking-[0.12em]"
                              style={{ color: getCategoryColor(post.category) }}
                            >
                              {post.category}
                            </span>
                            <span className="flex items-center gap-1 text-[11px]" style={{ color: "#9CA3AF" }}>
                              <Clock size={10} /> {post.readTime}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className="font-bold leading-snug mb-3 flex-1 group-hover:text-[#459443] transition-colors duration-200"
                            style={{
                              fontFamily: "'Playfair Display', Georgia, serif",
                              fontSize: "1.15rem",
                              color: "#1a2e1a",
                              lineHeight: 1.4,
                            }}
                          >
                            {post.title}
                          </h3>

                          {/* Excerpt */}
                          <p
                            className="text-sm leading-relaxed mb-5 line-clamp-3"
                            style={{ color: "#6B7280", fontFamily: "'Lora', serif", fontWeight: 400 }}
                          >
                            {post.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-4" style={{ borderTop: "1px solid #F3F4F6" }}>
                            <span className="flex items-center gap-1.5 text-xs" style={{ color: "#9CA3AF" }}>
                              <Calendar size={11} /> {post.date}
                            </span>
                            <span
                              className="flex items-center gap-1 text-xs font-semibold group-hover:gap-2 transition-all"
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
      <section className="py-20 mt-4" style={{ background: "#1a2e1a" }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div
            className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-sm mb-6"
            style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}
          >
            Newsletter
          </div>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", letterSpacing: "-0.02em" }}
          >
            Stay Ahead of the Curve
          </h2>
          <p className="mb-8 font-light" style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Lora', serif", lineHeight: 1.8 }}>
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
          <p className="text-xs mt-4" style={{ color: "rgba(255,255,255,0.25)" }}>No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}
