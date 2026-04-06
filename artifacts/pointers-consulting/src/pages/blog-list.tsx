import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { motion, useInView } from "framer-motion";
import { Search, ArrowRight, Clock, Calendar } from "lucide-react";
import { blogPosts } from "@/data/blog";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function AnimatedSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className={className}>
      {children}
    </motion.div>
  );
}

const categories = ["All", "SMSF", "Tax", "Superannuation", "Business Advisory"];

export default function BlogList() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Blog | Pointers Consulting — SMSF & Tax Insights";
  }, []);

  const filtered = blogPosts.filter((post) => {
    const matchesSearch =
      search === "" ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Header */}
      <section className="bg-[hsl(222,47%,11%)] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <span className="text-[hsl(43,100%,50%)] font-semibold text-sm uppercase tracking-wider">
              Knowledge Centre
            </span>
            <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mt-3 mb-5">
              Insights & Articles
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Expert commentary on SMSF regulations, tax strategies, superannuation, and business advisory — written by our team of Australian financial specialists.
            </p>

            <div className="relative max-w-md">
              <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-lg pl-11 pr-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-[hsl(43,100%,50%)/60%] transition-colors"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[hsl(222,47%,11%)] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No articles found matching your search.
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featured && (
                <AnimatedSection className="mb-12">
                  <Link href={`/blog/${featured.slug}`}>
                    <div className="group grid lg:grid-cols-2 gap-0 border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                      <div className="bg-[hsl(222,47%,11%)] p-10 flex flex-col justify-center">
                        <span className="inline-block bg-[hsl(43,100%,50%)/15%] text-[hsl(43,100%,50%)] text-xs font-semibold px-3 py-1 rounded-full mb-5">
                          {featured.category}
                        </span>
                        <h2 className="font-serif font-bold text-2xl lg:text-3xl text-white leading-snug group-hover:text-[hsl(43,100%,50%)] transition-colors mb-4">
                          {featured.title}
                        </h2>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                          {featured.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-white/40 text-xs mb-6">
                          <span className="flex items-center gap-1.5">
                            <Calendar size={12} />
                            {featured.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {featured.readTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[hsl(43,100%,50%)] font-semibold text-sm group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight size={15} />
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-[hsl(222,47%,16%)] to-[hsl(222,47%,8%)] p-10 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-[hsl(43,100%,50%)/20%] font-serif font-bold text-8xl leading-none select-none mb-4">
                            {featured.category.charAt(0)}
                          </div>
                          <div className="text-white/30 text-sm">Featured Article</div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              )}

              {/* Rest of Posts */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <AnimatedSection key={post.slug}>
                      <Link href={`/blog/${post.slug}`}>
                        <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer h-full flex flex-col">
                          <div className="bg-[hsl(222,47%,11%)] p-7 flex-1">
                            <span className="inline-block bg-[hsl(43,100%,50%)/15%] text-[hsl(43,100%,50%)] text-xs font-semibold px-3 py-1 rounded-full mb-4">
                              {post.category}
                            </span>
                            <h3 className="font-serif font-bold text-white text-lg leading-snug group-hover:text-[hsl(43,100%,50%)] transition-colors">
                              {post.title}
                            </h3>
                          </div>
                          <div className="p-5 bg-white">
                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                              {post.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} />
                                {post.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={11} />
                                {post.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="font-serif text-2xl font-bold text-[hsl(222,47%,11%)] mb-3">
              Stay Ahead of SMSF & Tax Changes
            </h2>
            <p className="text-gray-600 text-sm mb-6">
              Subscribe to our monthly newsletter for regulatory updates, tax tips, and strategic insights delivered to your inbox.
            </p>
            <form className="flex gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[hsl(222,47%,11%)] transition-colors"
              />
              <button
                type="submit"
                className="bg-[hsl(222,47%,11%)] text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-[hsl(222,47%,16%)] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
