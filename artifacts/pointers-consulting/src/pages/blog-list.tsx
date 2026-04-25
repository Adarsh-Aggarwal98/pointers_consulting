import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, ArrowRight, Clock, Calendar } from "lucide-react";
import type { BlogSummary } from "@/data/blog-types";

const staticBlogs: BlogSummary[] = [
  {
    id: 1,
    slug: "is-smsf-right-for-you",
    title: "Is an SMSF Right for You? Key Questions to Ask Before You Start",
    excerpt: "Self-Managed Super Funds offer control and flexibility, but they're not for everyone. Here's what you need to consider before taking the plunge.",
    category: "SMSF",
    date: "April 2026",
    readTime: "5 min read",
    author: "Sam Pointers",
  },
  {
    id: 2,
    slug: "ato-smsf-audit-2026",
    title: "ATO's 2026 SMSF Audit Program: What Trustees Need to Know",
    excerpt: "The ATO is ramping up SMSF compliance checks in 2026. Find out what they're targeting and how to ensure your fund is audit-ready.",
    category: "SMSF",
    date: "March 2026",
    readTime: "6 min read",
    author: "Sam Pointers",
  },
  {
    id: 3,
    slug: "business-structure-tax-efficiency",
    title: "Choosing the Right Business Structure for Tax Efficiency",
    excerpt: "Company, trust or sole trader? The structure you choose today has major tax implications for tomorrow. We break down the options.",
    category: "Business Advisory",
    date: "March 2026",
    readTime: "7 min read",
    author: "Sam Pointers",
  },
  {
    id: 4,
    slug: "payday-super-what-employers-need-to-know",
    title: "Payday Super: What Employers Need to Know in 2026",
    excerpt: "From July 2026, super must be paid on payday. Here's what this means for your payroll processes and cash flow planning.",
    category: "Taxation",
    date: "February 2026",
    readTime: "4 min read",
    author: "Sam Pointers",
  },
  {
    id: 5,
    slug: "trust-distributions-ato-compliance",
    title: "Trust Distributions: Are You Compliant with ATO's Rules?",
    excerpt: "Incorrect trust distributions can trigger ATO audits and significant penalties. Learn how to structure distributions correctly.",
    category: "Taxation",
    date: "February 2026",
    readTime: "5 min read",
    author: "Sam Pointers",
  },
  {
    id: 6,
    slug: "smsf-investment-strategy-guide",
    title: "SMSF Investment Strategy: A Complete Guide for Trustees",
    excerpt: "Your SMSF must have a documented investment strategy that meets strict ATO requirements. Here's everything you need to include.",
    category: "SMSF",
    date: "January 2026",
    readTime: "8 min read",
    author: "Sam Pointers",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07 } },
};

export default function BlogList() {
  const [blogPosts] = useState<BlogSummary[]>(staticBlogs);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Growth Insights | Pointers Consulting";
    window.scrollTo(0, 0);
  }, []);

  const categories = ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))];

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="bg-[#1a2e1a] pt-44 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="text-[#459443] font-semibold text-sm uppercase tracking-wider">Insights & News</span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">Growth Insights</h1>
            <p className="text-white/70 text-xl max-w-2xl font-light">
              Expert insights on SMSFs, Australian tax law, business strategy and financial planning. Stay informed with our team's latest thinking.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-[#fafffa] border-b border-[#459443]/10 py-6 sticky top-[104px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#459443] w-64 bg-white"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    activeCategory === cat
                      ? "bg-[#459443] text-white"
                      : "bg-white border border-gray-200 text-gray-600 hover:border-[#459443] hover:text-[#459443]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg mb-2">No articles found</p>
              <p className="text-sm">Try adjusting your search or filter</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link href={`/blog/${featured.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group grid lg:grid-cols-2 gap-0 border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all mb-10 cursor-pointer"
                  >
                    <div className="bg-[#1a2e1a] p-10 lg:p-14 flex flex-col justify-between min-h-[280px]">
                      <div>
                        <span className="inline-block bg-[#459443]/20 text-[#459443] text-xs font-semibold px-3 py-1 rounded-full mb-5">
                          {featured.category}
                        </span>
                        <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug group-hover:text-[#459443] transition-colors">
                          {featured.title}
                        </h2>
                      </div>
                      <div className="flex items-center gap-4 text-white/50 text-xs mt-6">
                        <span className="flex items-center gap-1.5"><Calendar size={12} />{featured.date}</span>
                        <span className="flex items-center gap-1.5"><Clock size={12} />{featured.readTime}</span>
                      </div>
                    </div>
                    <div className="bg-white p-10 lg:p-14 flex flex-col justify-between">
                      <div>
                        <span className="text-[#459443] text-xs font-semibold uppercase tracking-wider mb-3 block">Featured Article</span>
                        <p className="text-gray-700 leading-relaxed font-light">{featured.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2 text-[#459443] font-semibold text-sm mt-6 group-hover:gap-3 transition-all">
                        Read Article <ArrowRight size={14} />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              )}

              {/* Rest */}
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {rest.map((post) => (
                  <motion.div key={post.slug} variants={fadeUp}>
                    <Link href={`/blog/${post.slug}`}>
                      <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all h-full flex flex-col cursor-pointer">
                        <div className="bg-[#1a2e1a] p-7">
                          <span className="inline-block bg-[#459443]/15 text-[#459443] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                            {post.category}
                          </span>
                          <h3 className="font-bold text-white text-lg leading-snug group-hover:text-[#459443] transition-colors">
                            {post.title}
                          </h3>
                        </div>
                        <div className="p-6 flex-1 flex flex-col bg-white">
                          <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-4 font-light">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Calendar size={11} />{post.date}</span>
                            <span className="flex items-center gap-1"><Clock size={11} />{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#459443] py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Stay Up to Date</h2>
          <p className="text-white/80 mb-6 font-light">Get our latest SMSF and tax insights delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded text-sm focus:outline-none"
            />
            <button className="bg-[#1a2e1a] text-white px-5 py-3 rounded font-semibold text-sm hover:bg-black/50 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
