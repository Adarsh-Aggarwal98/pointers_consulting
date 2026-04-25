import { useEffect, useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import type { BlogPost, BlogSummary } from "@/data/blog-types";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setIsLoading(true);
    setNotFound(false);

    Promise.all([
      fetch(`/api/blogs/${slug}`).then((r) => r.json()),
      fetch("/api/blogs").then((r) => r.json()),
    ])
      .then(([postData, listData]) => {
        if (postData.success && postData.post) {
          setPost(postData.post);
          document.title = `${postData.post.title} | Pointers Consulting`;
        } else {
          setNotFound(true);
        }
        if (listData.success) setAllPosts(listData.posts);
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [slug]);

  const related = allPosts
    .filter((p) => p.slug !== slug && p.category === post?.category)
    .slice(0, 3);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-gray-500 text-sm">Loading...</div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1a2e1a] mb-4">Article Not Found</h1>
          <Link href="/blog">
            <button className="bg-[#459443] text-white px-6 py-3 rounded font-semibold hover:bg-[#3a7f38] transition-colors inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* Header */}
      <section className="bg-[#1a2e1a] pt-44 pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Link href="/blog">
              <div className="inline-flex items-center gap-2 text-[#459443] text-sm font-semibold mb-6 cursor-pointer hover:text-[#3a7f38] transition-colors">
                <ArrowLeft size={15} /> Back to Blog
              </div>
            </Link>

            <div className="flex items-center gap-3 mb-5">
              <span className="bg-[#459443]/20 text-[#459443] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Tag size={11} /> {post.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-snug mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-white/50 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} /> {post.readTime}
              </span>
              {post.author && (
                <span className="text-white/50">By {post.author}</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Article */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <p className="text-gray-700 text-lg leading-relaxed mb-8 font-light border-l-4 border-[#459443] pl-5 italic">
                {post.excerpt}
              </p>

              <div
                className="prose prose-lg max-w-none prose-headings:text-[#1a2e1a] prose-headings:font-bold prose-a:text-[#459443] prose-strong:text-[#1a2e1a]"
                style={{ fontWeight: 300, lineHeight: 1.8, color: "#374151" }}
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.6rem;font-weight:700;color:#1a2e1a;margin-top:2.5rem;margin-bottom:1rem;border-bottom:2px solid #459443;padding-bottom:0.5rem">$1</h2>')
                    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.25rem;font-weight:700;color:#1a2e1a;margin-top:2rem;margin-bottom:0.75rem">$1</h3>')
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/^\- (.+)$/gm, '<li style="margin-bottom:0.5rem;padding-left:0.25rem">$1</li>')
                    .replace(/(<li.*<\/li>\n?)+/g, '<ul style="list-style:none;padding:0;margin:1rem 0 1.5rem 0">$&</ul>')
                    .replace(/<li/g, '<li style="display:flex;gap:0.5rem;align-items:flex-start;margin-bottom:0.5rem"><span style="color:#459443;margin-top:0.2rem">✓</span><span')
                    .replace(/<\/li>/g, "</span></li>")
                    .replace(/\n\n/g, "</p><p style='margin-bottom:1.2rem;font-weight:300;line-height:1.8'>")
                    .replace(/^(?!<[h|u|l])(.+)$/gm, (match) => {
                      if (match.trim() && !match.startsWith("<")) {
                        return `<p style="margin-bottom:1.2rem;font-weight:300;line-height:1.8">${match}</p>`;
                      }
                      return match;
                    }),
                }}
              />

              <div className="mt-10 p-6 bg-[#fafffa] border border-[#459443]/20 rounded-xl">
                <p className="text-xs text-gray-500 font-light leading-relaxed">
                  <strong className="text-gray-700">Disclaimer:</strong> This article is for general information purposes only and does not constitute financial, legal or tax advice. Australian tax laws change frequently — please consult a qualified adviser before acting on any information contained in this article.
                </p>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-28 space-y-6">
                <div className="bg-[#1a2e1a] rounded-xl p-6">
                  <h3 className="font-bold text-white text-base mb-3">Need Expert Advice?</h3>
                  <p className="text-white/60 text-sm font-light mb-5">
                    Speak with one of our SMSF or tax specialists. Free initial consultation.
                  </p>
                  <Link href="/contact">
                    <button className="w-full bg-[#459443] text-white py-2.5 rounded font-semibold text-sm hover:bg-[#3a7f38] transition-colors">
                      Book Appointment
                    </button>
                  </Link>
                  <a href="tel:+61426784982" className="block mt-2 text-center text-[#459443] text-xs hover:underline">
                    +61 426 784 982
                  </a>
                </div>

                {related.length > 0 && (
                  <div>
                    <h3 className="font-bold text-[#1a2e1a] text-sm mb-4 uppercase tracking-wider">Related Articles</h3>
                    <div className="space-y-3">
                      {related.map((r) => (
                        <Link key={r.slug} href={`/blog/${r.slug}`}>
                          <div className="border border-gray-100 rounded-lg p-4 hover:border-[#459443]/40 transition-colors cursor-pointer group">
                            <span className="text-[10px] text-[#459443] font-semibold uppercase tracking-wide">{r.category}</span>
                            <p className="text-gray-800 text-sm font-medium mt-1 leading-snug group-hover:text-[#459443] transition-colors">
                              {r.title}
                            </p>
                            <span className="text-gray-400 text-xs">{r.readTime}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="bg-[#fafffa] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-[#1a2e1a]">More Articles</h2>
            <Link href="/blog">
              <button className="text-[#459443] font-semibold text-sm flex items-center gap-1 hover:text-[#3a7f38] transition-colors">
                View All <ArrowRight size={14} />
              </button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allPosts.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <div className="group border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all cursor-pointer bg-white">
                  <div className="bg-[#1a2e1a] p-6">
                    <span className="text-[#459443] text-xs font-semibold">{p.category}</span>
                    <h3 className="font-bold text-white mt-2 leading-snug group-hover:text-[#459443] transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <div className="p-5">
                    <p className="text-gray-600 text-sm line-clamp-2 font-light">{p.excerpt}</p>
                    <div className="flex items-center gap-1 text-[#459443] font-semibold text-sm mt-3 group-hover:gap-2 transition-all">
                      Read <ArrowRight size={13} />
                    </div>
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
