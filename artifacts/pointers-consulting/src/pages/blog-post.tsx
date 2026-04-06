import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import { blogPosts, getBlogPost } from "@/data/blog";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const post = getBlogPost(params.slug || "");

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Pointers Consulting`;
    }
    window.scrollTo(0, 0);
  }, [post]);

  if (!post) {
    return (
      <div className="pt-36 pb-20 text-center">
        <h1 className="font-serif text-3xl font-bold text-[hsl(222,47%,11%)] mb-4">
          Article Not Found
        </h1>
        <Link href="/blog">
          <button className="text-[hsl(222,47%,11%)] font-semibold inline-flex items-center gap-2 hover:text-[hsl(43,100%,45%)] transition-colors">
            <ArrowLeft size={15} />
            Back to Blog
          </button>
        </Link>
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="pt-20 overflow-x-hidden">
      {/* Header */}
      <section className="bg-[hsl(222,47%,11%)] py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/blog">
              <button className="text-white/60 hover:text-white text-sm inline-flex items-center gap-2 mb-8 transition-colors">
                <ArrowLeft size={14} />
                Back to Blog
              </button>
            </Link>

            <div className="flex flex-wrap gap-3 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-[hsl(43,100%,50%)/15%] text-[hsl(43,100%,50%)] text-xs font-semibold px-3 py-1 rounded-full">
                <Tag size={11} />
                {post.category}
              </span>
            </div>

            <h1 className="font-serif text-3xl lg:text-4xl font-bold text-white mb-5 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {post.readTime}
              </span>
              <span>By {post.author}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="prose prose-lg max-w-none"
              >
                <p className="text-gray-700 text-lg leading-relaxed font-medium mb-6">
                  {post.excerpt}
                </p>
                {paragraphs.map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return (
                      <h2
                        key={i}
                        className="font-serif font-bold text-xl text-[hsl(222,47%,11%)] mt-8 mb-3"
                      >
                        {para.replace(/\*\*/g, "")}
                      </h2>
                    );
                  }
                  const parts = para.split(/(\*\*[^*]+\*\*)/g);
                  return (
                    <p key={i} className="text-gray-700 leading-relaxed mb-4">
                      {parts.map((part, j) => {
                        if (part.startsWith("**") && part.endsWith("**")) {
                          return (
                            <strong key={j} className="font-semibold text-[hsl(222,47%,11%)]">
                              {part.replace(/\*\*/g, "")}
                            </strong>
                          );
                        }
                        return part;
                      })}
                    </p>
                  );
                })}
              </motion.div>

              {/* Disclaimer */}
              <div className="mt-10 bg-gray-50 border border-gray-200 rounded-xl p-5">
                <p className="text-gray-500 text-xs leading-relaxed">
                  <strong className="text-gray-600">Disclaimer:</strong> This article is intended for general information purposes only and does not constitute financial, legal, or taxation advice. You should seek advice from a qualified professional before acting on any information contained in this article.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-6">
                <div className="bg-[hsl(222,47%,11%)] rounded-xl p-6 text-center">
                  <h3 className="font-serif font-bold text-white text-lg mb-2">
                    Get Expert Advice
                  </h3>
                  <p className="text-white/60 text-xs mb-5">
                    Speak to an SMSF or business adviser about your specific situation.
                  </p>
                  <Link href="/contact">
                    <button className="bg-[hsl(43,100%,50%)] text-[hsl(222,47%,11%)] px-4 py-2.5 rounded font-semibold text-sm w-full hover:bg-[hsl(43,100%,45%)] transition-colors">
                      Book Free Consultation
                    </button>
                  </Link>
                </div>

                {otherPosts.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-[hsl(222,47%,11%)] text-sm mb-3 uppercase tracking-wider">
                      More Articles
                    </h3>
                    <div className="space-y-3">
                      {otherPosts.map((p) => (
                        <Link key={p.slug} href={`/blog/${p.slug}`}>
                          <div className="group flex gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                            <div className="w-8 h-8 rounded bg-[hsl(222,47%,11%)] flex items-center justify-center shrink-0 mt-0.5">
                              <span className="text-[hsl(43,100%,50%)] text-xs font-bold">
                                {p.category.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-[hsl(222,47%,11%)] group-hover:text-[hsl(43,100%,45%)] leading-snug transition-colors line-clamp-2">
                                {p.title}
                              </div>
                              <div className="text-gray-400 text-xs mt-1">{p.readTime}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Posts */}
      <section className="py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif font-bold text-2xl text-[hsl(222,47%,11%)]">
              More Articles
            </h2>
            <Link href="/blog">
              <button className="text-[hsl(222,47%,11%)] font-semibold text-sm inline-flex items-center gap-1.5 hover:text-[hsl(43,100%,45%)] transition-colors">
                All Articles
                <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherPosts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer">
                  <div className="bg-[hsl(222,47%,11%)] p-6">
                    <span className="inline-block bg-[hsl(43,100%,50%)/15%] text-[hsl(43,100%,50%)] text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {p.category}
                    </span>
                    <h3 className="font-serif font-bold text-white text-base leading-snug group-hover:text-[hsl(43,100%,50%)] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{p.excerpt}</p>
                    <span className="text-gray-400 text-xs">{p.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
