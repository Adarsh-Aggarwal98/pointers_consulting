import { useEffect, useState, useRef } from "react";
import { applySEO } from "@/lib/seo";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import type { BlogPost, BlogSummary } from "@/data/blog-types";

/* ── Reading Progress ── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5" style={{ background: "rgba(26,46,26,0.08)" }}>
      <div
        className="h-full transition-none"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg, #459443, #80d97e)" }}
      />
    </div>
  );
}

/* ── Render article markdown ── */
function renderContent(raw: string): string {
  const S = {
    h1: `font-family:'Playfair Display',Georgia,serif;font-size:2rem;font-weight:800;color:#1a2e1a;margin-top:3.5rem;margin-bottom:1rem;letter-spacing:-0.02em;line-height:1.2`,
    h2: `font-family:'Playfair Display',Georgia,serif;font-size:1.65rem;font-weight:700;color:#1a2e1a;margin-top:3rem;margin-bottom:1rem;padding-bottom:0.5rem;border-bottom:2px solid #459443;letter-spacing:-0.01em`,
    h3: `font-family:'Playfair Display',Georgia,serif;font-size:1.2rem;font-weight:700;color:#1a2e1a;margin-top:2rem;margin-bottom:0.75rem`,
    p:  `margin-bottom:1.4rem;font-family:'Lora',Georgia,serif;font-weight:400;line-height:1.9;color:#374151;font-size:1.05rem`,
    bq: `margin:2rem 0;padding:1.25rem 1.5rem;border-left:4px solid #459443;background:rgba(69,148,67,0.07);border-radius:0 0.5rem 0.5rem 0`,
    ul: `list-style:none;padding:0;margin:1.5rem 0 2rem 0`,
    ol: `list-style:none;padding:0;margin:1.5rem 0 2rem 0`,
    li: `display:flex;gap:0.75rem;align-items:flex-start;margin-bottom:0.6rem`,
    hr: `border:none;border-top:1px solid rgba(69,148,67,0.2);margin:2.5rem 0`,
  };

  function inline(t: string): string {
    return t
      .replace(/\*\*(.+?)\*\*/g, `<strong style="font-weight:600;color:#1a2e1a">$1</strong>`)
      .replace(/\*([^*]+?)\*/g, `<em>$1</em>`)
      .replace(/`([^`]+?)`/g, `<code style="background:rgba(0,0,0,0.07);padding:0.1em 0.35em;border-radius:0.25em;font-size:0.88em;font-family:monospace">$1</code>`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color:#459443;text-decoration:underline;text-underline-offset:2px" target="_blank" rel="noopener">$1</a>`);
  }

  const lines = raw.split('\n');
  const out: string[] = [];
  let paraLines: string[] = [];
  let bqLines: string[] = [];
  let ulItems: string[] = [];
  let olItems: { n: number; text: string }[] = [];

  function flushPara() {
    if (!paraLines.length) return;
    out.push(`<p style="${S.p}">${inline(paraLines.join(' '))}</p>`);
    paraLines = [];
  }
  function flushBq() {
    if (!bqLines.length) return;
    const inner = bqLines
      .map(l => `<p style="margin:0 0 0.4rem 0;font-family:'Playfair Display',Georgia,serif;font-style:italic;color:#1a2e1a;font-size:1.05rem;line-height:1.75">${inline(l)}</p>`)
      .join('');
    out.push(`<blockquote style="${S.bq}">${inner}</blockquote>`);
    bqLines = [];
  }
  function flushUl() {
    if (!ulItems.length) return;
    const items = ulItems.map(t =>
      `<li style="${S.li}"><span style="color:#459443;margin-top:0.2rem;font-size:0.85rem;flex-shrink:0">✦</span><span style="font-family:'Lora',Georgia,serif;color:#374151;line-height:1.8">${inline(t)}</span></li>`
    ).join('');
    out.push(`<ul style="${S.ul}">${items}</ul>`);
    ulItems = [];
  }
  function flushOl() {
    if (!olItems.length) return;
    const items = olItems.map(({ n, text }) =>
      `<li style="${S.li}"><span style="color:#459443;font-weight:700;font-size:0.9rem;flex-shrink:0;min-width:1.4rem">${n}.</span><span style="font-family:'Lora',Georgia,serif;color:#374151;line-height:1.8">${inline(text)}</span></li>`
    ).join('');
    out.push(`<ol style="${S.ol}">${items}</ol>`);
    olItems = [];
  }

  for (const line of lines) {
    // blockquote continuation
    if (line.startsWith('> ')) {
      flushPara(); flushUl(); flushOl();
      bqLines.push(line.slice(2));
      continue;
    }
    if (bqLines.length && line.trim() === '') { flushBq(); continue; }
    if (bqLines.length) { flushBq(); }

    // headings
    if (/^# (?!#)/.test(line)) {
      flushPara(); flushUl(); flushOl();
      const text = line.slice(2);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      out.push(`<h1 id="${id}" style="${S.h1}">${inline(text)}</h1>`);
      continue;
    }
    if (/^## (?!#)/.test(line)) {
      flushPara(); flushUl(); flushOl();
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      out.push(`<h2 id="${id}" style="${S.h2}">${inline(text)}</h2>`);
      continue;
    }
    if (/^### (?!#)/.test(line)) {
      flushPara(); flushUl(); flushOl();
      const text = line.slice(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      out.push(`<h3 id="${id}" style="${S.h3}">${inline(text)}</h3>`);
      continue;
    }

    // horizontal rule
    if (/^---+$/.test(line.trim())) {
      flushPara(); flushUl(); flushOl(); flushBq();
      out.push(`<hr style="${S.hr}" />`);
      continue;
    }

    // unordered list
    if (/^- /.test(line)) {
      flushPara(); flushOl();
      ulItems.push(line.slice(2));
      continue;
    }

    // ordered list (1. 2. etc)
    const olMatch = line.match(/^(\d+)\. (.+)/);
    if (olMatch) {
      flushPara(); flushUl();
      olItems.push({ n: parseInt(olMatch[1]), text: olMatch[2] });
      continue;
    }

    // empty line = paragraph break
    if (line.trim() === '') {
      flushPara(); flushUl(); flushOl();
      continue;
    }

    // regular text — accumulate into paragraph
    paraLines.push(line.trim());
  }

  flushPara(); flushUl(); flushOl(); flushBq();
  return out.join('\n');
}

/* ── Extract TOC headings ── */
function extractHeadings(content: string): { id: string; text: string; level: number; pos: number }[] {
  const results: { id: string; text: string; level: number; pos: number }[] = [];
  for (const m of content.matchAll(/^(#{1,3}) (.+)$/gm)) {
    const level = m[1].length;
    const text = m[2].trim();
    results.push({
      id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      text,
      level,
      pos: m.index ?? 0,
    });
  }
  return results.sort((a, b) => a.pos - b.pos);
}

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
          applySEO({
            title: `${postData.post.title} | Pointers Consulting`,
            description: postData.post.excerpt,
            canonical: `/blog/${postData.post.slug}`,
            ogType: "article",
            schema: {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": postData.post.title,
              "description": postData.post.excerpt,
              "datePublished": postData.post.date,
              "author": {
                "@type": "Person",
                "name": "Sharat Sharma",
                "jobTitle": "CPA, Registered Tax Agent #26122730",
                "url": "https://pointersconsulting.com.au/about/message-from-director",
              },
              "publisher": {
                "@type": "Organization",
                "name": "Pointers Consulting",
                "url": "https://pointersconsulting.com.au",
              },
            },
          });
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

  const headings = post ? extractHeadings(post.content) : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: "#F9F7F2" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#459443]/30 border-t-[#459443] animate-spin" />
          <p className="text-sm" style={{ color: "#9CA3AF", fontFamily: "'Lora', serif" }}>Loading article…</p>
        </div>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: "#F9F7F2" }}>
        <div className="text-center">
          <p className="text-5xl mb-4" style={{ fontFamily: "'Playfair Display', serif", color: "#1a2e1a" }}>404</p>
          <h1 className="text-xl font-bold mb-6" style={{ color: "#1a2e1a" }}>Article not found</h1>
          <Link href="/blog">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90"
              style={{ background: "#459443" }}
            >
              <ArrowLeft size={15} /> Back to Blog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden" style={{ background: "#F9F7F2" }}>
      <ReadingProgress />

      {/* ── Article Header ── */}
      <section className="relative pt-44 pb-14 overflow-hidden" style={{ background: "#1a2e1a" }}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(#459443 1px, transparent 1px), linear-gradient(90deg, #459443 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
            <Link href="/blog">
              <div className="inline-flex items-center gap-2 text-sm font-semibold mb-8 cursor-pointer transition-colors" style={{ color: "#80d97e" }}>
                <ArrowLeft size={14} /> Back to Insights
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm"
                style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}
              >
                <Tag size={10} /> {post.category}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-8"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.025em", lineHeight: 1.2 }}
            >
              {post.title}
            </h1>

            <div className="h-px w-24 mb-6" style={{ background: "#459443" }} />

            <div className="flex flex-wrap items-center gap-6" style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>
              <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
              <span className="flex items-center gap-1.5"><BookOpen size={13} /> {headings.length} sections</span>
              {post.author && <span>By <span style={{ color: "#80d97e" }}>{post.author}</span></span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-12">

            {/* ── Article Body ── */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pull Quote / Excerpt */}
              <blockquote
                className="mb-10 pl-6 py-1"
                style={{ borderLeft: "3px solid #459443" }}
              >
                <p
                  className="italic leading-relaxed"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "1.15rem",
                    color: "#1a2e1a",
                    lineHeight: 1.75,
                  }}
                >
                  {post.excerpt}
                </p>
              </blockquote>

              {/* Body */}
              <div
                className="article-body"
                style={{ color: "#374151" }}
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
              />

              {/* Disclaimer */}
              <div
                className="mt-12 p-6 rounded-xl"
                style={{ background: "white", border: "1px solid rgba(69,148,67,0.15)" }}
              >
                <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF", fontFamily: "'Lora', serif" }}>
                  <strong style={{ color: "#6B7280" }}>Disclaimer:</strong> This article is for general information purposes only and does not constitute financial, legal or tax advice. Australian tax laws change frequently — please consult a qualified adviser before acting on any information contained in this article.
                </p>
              </div>

              {/* Author Bio */}
              <div
                className="mt-8 p-7 rounded-xl flex gap-5 items-start"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #1a2e1a, #459443)", fontSize: "1.1rem", fontFamily: "'Playfair Display', serif" }}
                >
                  SS
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "#1a2e1a" }}>Sharat Sharma (Sam)</p>
                  <p className="text-xs font-semibold mb-3" style={{ color: "#459443" }}>Founder & Director · CPA Australia</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "'Lora', serif" }}>
                    Sam is a CPA-qualified accountant and Registered Tax Agent (#26122730) with over 20 years of experience across Australia, Asia, and the Middle East. He specialises in SMSF strategy, tax planning, and business advisory for Australian SMEs and investors.
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {["CPA Australia", "Tax Agent #26122730", "SMSF Association", "ASIC Registered Agent"].map((cred) => (
                      <span
                        key={cred}
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide"
                        style={{ background: "rgba(69,148,67,0.1)", color: "#459443" }}
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                  <Link href="/about/message-from-director">
                    <span className="text-xs font-semibold mt-3 inline-flex items-center gap-1 cursor-pointer hover:underline" style={{ color: "#459443" }}>
                      View full profile <ChevronRight size={11} />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sticky top-28 space-y-5">

                {/* CTA */}
                <div className="rounded-xl overflow-hidden" style={{ background: "#1a2e1a" }}>
                  <div className="h-1" style={{ background: "linear-gradient(90deg, #459443, #80d97e)" }} />
                  <div className="p-6">
                    <h3 className="font-bold text-white text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Need Expert Advice?
                    </h3>
                    <p className="text-xs mb-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Lora', serif" }}>
                      Speak with one of our SMSF or tax specialists. Free initial consultation.
                    </p>
                    <Link href="/contact">
                      <button
                        className="w-full py-2.5 rounded-lg font-semibold text-sm text-white transition-opacity hover:opacity-90 mb-2"
                        style={{ background: "#459443" }}
                      >
                        Book Appointment
                      </button>
                    </Link>
                    <a href="tel:+61426784982" className="block text-center text-xs hover:underline" style={{ color: "#80d97e" }}>
                      +61 426 784 982
                    </a>
                  </div>
                </div>

                {/* Table of Contents */}
                {headings.length > 0 && (
                  <div
                    className="rounded-xl p-5"
                    style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <BookOpen size={12} style={{ color: "#459443" }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#459443" }}>
                        Contents
                      </span>
                    </div>
                    <nav className="space-y-1">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className="flex items-start gap-2 py-1 text-xs leading-snug transition-colors hover:text-[#459443] group"
                          style={{
                            color: "#6B7280",
                            paddingLeft: h.level === 3 ? "0.75rem" : "0",
                            fontFamily: "'Lora', serif",
                          }}
                        >
                          <span style={{ color: "rgba(69,148,67,0.4)", marginTop: "0.2rem", flexShrink: 0 }}>›</span>
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Related Articles */}
                {related.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#9CA3AF" }}>Related</span>
                      <div className="h-px flex-1" style={{ background: "#E5E7EB" }} />
                    </div>
                    <div className="space-y-2">
                      {related.map((r) => (
                        <Link key={r.slug} href={`/blog/${r.slug}`}>
                          <div
                            className="p-4 rounded-xl cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-sm group"
                            style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}
                          >
                            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#459443" }}>
                              {r.category}
                            </span>
                            <p
                              className="text-xs leading-snug mt-1 group-hover:text-[#459443] transition-colors"
                              style={{ color: "#374151", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                            >
                              {r.title}
                            </p>
                            <span className="text-[10px] mt-2 block" style={{ color: "#9CA3AF" }}>{r.readTime}</span>
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

      {/* ── More Articles ── */}
      <section className="py-16" style={{ background: "#1a2e1a" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="font-bold text-white"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.75rem", letterSpacing: "-0.02em" }}
            >
              More Articles
            </h2>
            <Link href="/blog">
              <button
                className="text-sm font-semibold flex items-center gap-1.5 transition-colors hover:gap-2.5"
                style={{ color: "#80d97e" }}
              >
                View All <ArrowRight size={13} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allPosts.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <div
                  className="group rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="h-0.5" style={{ background: "#459443" }} />
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#80d97e" }}>{p.category}</span>
                    <h3
                      className="font-bold text-white mt-2 mb-3 leading-snug group-hover:text-[#80d97e] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}
                    >
                      {p.title}
                    </h3>
                    <p className="text-xs line-clamp-2 mb-4" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Lora', serif" }}>
                      {p.excerpt}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: "#459443" }}>
                      Read <ArrowRight size={12} />
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
