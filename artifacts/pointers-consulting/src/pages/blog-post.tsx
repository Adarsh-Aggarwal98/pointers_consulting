import { useEffect, useState } from "react";
import { applySEO } from "@/lib/seo";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight, BookOpen, ChevronRight } from "lucide-react";
import type { BlogPost, BlogSummary } from "@/data/blog-types";

/* ── Reading Progress bar ── */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px]" style={{ background: "rgba(26,46,26,0.08)" }}>
      <div
        className="h-full transition-none"
        style={{ width: `${progress}%`, background: "linear-gradient(90deg, #459443, #80d97e)" }}
      />
    </div>
  );
}

/* ── Key Takeaways box ── */
function KeyTakeaways({ content }: { content: string }) {
  const takeaways: string[] = [];

  const sectionRegex = /^##\s*(key takeaways?|summary|what this means|key points|conclusion|bottom line)/im;
  const match = content.match(sectionRegex);
  if (match && match.index !== undefined) {
    const start = match.index + match[0].length;
    const nextH2 = content.indexOf("\n## ", start);
    const chunk = nextH2 > -1 ? content.slice(start, nextH2) : content.slice(start);
    takeaways.push(...Array.from(chunk.matchAll(/^- (.+)$/gm)).map((m) => m[1]).slice(0, 5));
  }

  if (takeaways.length === 0) {
    takeaways.push(...Array.from(content.matchAll(/^- (.+)$/gm)).map((m) => m[1]).slice(0, 4));
  }

  if (takeaways.length === 0) return null;

  return (
    <div className="mb-8 rounded-xl overflow-hidden" style={{ border: "1.5px solid rgba(69,148,67,0.25)" }}>
      <div className="px-5 py-2.5 flex items-center gap-2" style={{ background: "#1a2e1a" }}>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: "#80d97e" }}>✦ Key Takeaways</span>
      </div>
      <div className="p-5" style={{ background: "rgba(69,148,67,0.04)" }}>
        <ul className="space-y-2.5">
          {takeaways.map((t, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white font-bold mt-0.5"
                style={{ background: "#459443", fontSize: "0.65rem", minWidth: "1.25rem" }}
              >
                {i + 1}
              </span>
              <span style={{ fontFamily: "'Lora', Georgia, serif", color: "#374151", lineHeight: 1.7, fontSize: "0.93rem" }}>
                {t}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Markdown → HTML renderer ── */
function renderContent(raw: string): string {
  const S = {
    h1: `font-family:'Playfair Display',Georgia,serif;font-size:1.9rem;font-weight:800;color:#1a2e1a;margin-top:3rem;margin-bottom:0.75rem;letter-spacing:-0.02em;line-height:1.2`,
    h2: `font-family:'Playfair Display',Georgia,serif;font-size:1.55rem;font-weight:700;color:#1a2e1a;margin-top:2.5rem;margin-bottom:0.75rem;padding-bottom:0.4rem;border-bottom:2px solid #459443;letter-spacing:-0.01em`,
    h3: `font-family:'Playfair Display',Georgia,serif;font-size:1.15rem;font-weight:700;color:#1a2e1a;margin-top:1.75rem;margin-bottom:0.5rem`,
    p:  `margin-bottom:1.2rem;font-family:'Lora',Georgia,serif;font-weight:400;line-height:1.85;color:#374151;font-size:1rem`,
    ul: `list-style:none;padding:0;margin:1.2rem 0 1.6rem 0`,
    ol: `list-style:none;padding:0;margin:1.2rem 0 1.6rem 0`,
    li: `display:flex;gap:0.65rem;align-items:flex-start;margin-bottom:0.5rem`,
    hr: `border:none;border-top:1px solid rgba(69,148,67,0.18);margin:2rem 0`,
  };

  function inline(t: string): string {
    return t
      .replace(/\*\*(.+?)\*\*/g, `<strong style="font-weight:700;color:#1a2e1a">$1</strong>`)
      .replace(/\*([^*]+?)\*/g, `<em style="font-style:italic">$1</em>`)
      .replace(/`([^`]+?)`/g, `<code style="background:rgba(0,0,0,0.07);padding:0.1em 0.35em;border-radius:0.25em;font-size:0.87em;font-family:monospace">$1</code>`)
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href="$2" style="color:#459443;text-decoration:underline;text-underline-offset:2px" target="_blank" rel="noopener">$1</a>`);
  }

  const lines = raw.split("\n");
  const out: string[] = [];
  let paraLines: string[] = [];
  let bqLines: string[] = [];
  let ulItems: string[] = [];
  let olItems: { n: number; text: string }[] = [];

  function flushPara() {
    if (!paraLines.length) return;
    const text = paraLines.join(" ").trim();
    if (text) out.push(`<p style="${S.p}">${inline(text)}</p>`);
    paraLines = [];
  }

  function flushBq() {
    if (!bqLines.length) return;
    const firstLower = bqLines[0].toLowerCase().replace(/\*\*/g, "");
    let borderColor = "#459443";
    let bg = "rgba(69,148,67,0.07)";
    let label = "";

    if (firstLower.startsWith("note:") || firstLower.startsWith("note —")) {
      label = `<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#459443;margin-bottom:0.4rem">📋 Note</div>`;
    } else if (firstLower.startsWith("important:") || firstLower.startsWith("important —")) {
      borderColor = "#B45309"; bg = "rgba(180,83,9,0.07)";
      label = `<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#B45309;margin-bottom:0.4rem">⚠️ Important</div>`;
    } else if (firstLower.startsWith("tip:") || firstLower.startsWith("tip —")) {
      borderColor = "#1D4ED8"; bg = "rgba(29,78,216,0.07)";
      label = `<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#1D4ED8;margin-bottom:0.4rem">💡 Tip</div>`;
    } else if (firstLower.startsWith("warning:") || firstLower.startsWith("warning —")) {
      borderColor = "#DC2626"; bg = "rgba(220,38,38,0.07)";
      label = `<div style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:#DC2626;margin-bottom:0.4rem">🚨 Warning</div>`;
    }

    const inner = bqLines
      .map((l) => `<p style="margin:0 0 0.35rem 0;font-family:'Lora',Georgia,serif;font-style:italic;color:#374151;font-size:0.97rem;line-height:1.75">${inline(l)}</p>`)
      .join("");
    out.push(`<blockquote style="margin:1.5rem 0;padding:1rem 1.25rem;border-left:3px solid ${borderColor};background:${bg};border-radius:0 0.4rem 0.4rem 0">${label}${inner}</blockquote>`);
    bqLines = [];
  }

  function flushUl() {
    if (!ulItems.length) return;
    const items = ulItems
      .map((t) => `<li style="${S.li}"><span style="color:#459443;margin-top:0.2rem;font-size:0.8rem;flex-shrink:0;line-height:1.85">✦</span><span style="font-family:'Lora',Georgia,serif;color:#374151;line-height:1.8;font-size:1rem">${inline(t)}</span></li>`)
      .join("");
    out.push(`<ul style="${S.ul}">${items}</ul>`);
    ulItems = [];
  }

  function flushOl() {
    if (!olItems.length) return;
    const items = olItems
      .map(({ n, text }) => `<li style="${S.li}"><span style="color:#459443;font-weight:700;font-size:0.85rem;flex-shrink:0;min-width:1.3rem;line-height:1.85">${n}.</span><span style="font-family:'Lora',Georgia,serif;color:#374151;line-height:1.8;font-size:1rem">${inline(text)}</span></li>`)
      .join("");
    out.push(`<ol style="${S.ol}">${items}</ol>`);
    olItems = [];
  }

  for (const line of lines) {
    // Blockquote
    if (line.startsWith("> ")) {
      flushPara(); flushUl(); flushOl();
      bqLines.push(line.slice(2));
      continue;
    }
    if (bqLines.length) { flushBq(); }

    // H1
    if (/^# (?!#)/.test(line)) {
      flushPara(); flushUl(); flushOl();
      const text = line.slice(2);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      out.push(`<h1 id="${id}" style="${S.h1}">${inline(text)}</h1>`);
      continue;
    }
    // H2
    if (/^## (?!#)/.test(line)) {
      flushPara(); flushUl(); flushOl();
      const text = line.slice(3);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      out.push(`<h2 id="${id}" style="${S.h2}">${inline(text)}</h2>`);
      continue;
    }
    // H3
    if (/^### (?!#)/.test(line)) {
      flushPara(); flushUl(); flushOl();
      const text = line.slice(4);
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      out.push(`<h3 id="${id}" style="${S.h3}">${inline(text)}</h3>`);
      continue;
    }

    // HR
    if (/^-{3,}$/.test(line.trim())) {
      flushPara(); flushUl(); flushOl();
      out.push(`<hr style="${S.hr}" />`);
      continue;
    }

    // Unordered list
    if (/^- /.test(line)) {
      flushPara(); flushOl();
      ulItems.push(line.slice(2));
      continue;
    }

    // Ordered list
    const olMatch = line.match(/^(\d+)\. (.+)/);
    if (olMatch) {
      flushPara(); flushUl();
      olItems.push({ n: parseInt(olMatch[1]), text: olMatch[2] });
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      flushPara(); flushUl(); flushOl();
      continue;
    }

    // Regular text
    paraLines.push(line.trim());
  }

  flushPara(); flushUl(); flushOl(); flushBq();
  return out.join("\n");
}

/* ── Extract TOC headings (H2 + H3 only, not H1 which is the title) ── */
function extractHeadings(content: string) {
  const results: { id: string; text: string; level: number; pos: number }[] = [];
  for (const m of content.matchAll(/^(#{2,3}) (.+)$/gm)) {
    const level = m[1].length;
    const text = m[2].trim();
    results.push({ id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-"), text, level, pos: m.index ?? 0 });
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
              headline: postData.post.title,
              description: postData.post.excerpt,
              datePublished: postData.post.date,
              author: {
                "@type": "Person",
                name: "Sharat Sharma",
                jobTitle: "CPA, Registered Tax Agent #26122730",
                url: "https://pointersconsulting.com.au/about/message-from-director",
              },
              publisher: {
                "@type": "Organization",
                name: "Pointers Consulting",
                url: "https://pointersconsulting.com.au",
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

  const related = allPosts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3);
  const headings = post ? extractHeadings(post.content) : [];
  const coverImg = post?.cover_image || post?.coverImage;

  function scrollToHeading(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 140;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20" style={{ background: "#F9F7F2" }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-7 h-7 rounded-full border-2 border-[#459443]/30 border-t-[#459443] animate-spin" />
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
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm text-white" style={{ background: "#459443" }}>
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

      {/* ── Hero ── */}
      <section className="relative overflow-hidden" style={{ background: "#1a2e1a" }}>
        {/* Cover image or dot grid */}
        {coverImg ? (
          <div className="absolute inset-0">
            <img src={coverImg} alt="" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,46,26,0.5), #1a2e1a)" }} />
          </div>
        ) : (
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(#459443 1px, transparent 1px), linear-gradient(90deg, #459443 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
            }}
          />
        )}

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <Link href="/blog">
              <div className="inline-flex items-center gap-2 text-xs font-semibold mb-6 cursor-pointer" style={{ color: "#80d97e" }}>
                <ArrowLeft size={13} /> Back to Insights
              </div>
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-sm"
                style={{ background: "rgba(69,148,67,0.2)", color: "#80d97e" }}
              >
                <Tag size={9} /> {post.category}
              </span>
            </div>

            <h1
              className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-6"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: "-0.025em", lineHeight: 1.2, maxWidth: "44rem" }}
            >
              {post.title}
            </h1>

            <div className="h-px w-16 mb-5" style={{ background: "#459443" }} />

            <div className="flex flex-wrap items-center gap-5" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem" }}>
              <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
              <span className="flex items-center gap-1.5"><BookOpen size={12} /> {headings.length} sections</span>
              {post.author && <span>By <span style={{ color: "#80d97e" }}>{post.author}</span></span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_260px] gap-10">

            {/* ── Article Body ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pull quote / Excerpt */}
              <blockquote className="mb-8 pl-5 py-1" style={{ borderLeft: "3px solid #459443" }}>
                <p
                  className="italic leading-relaxed"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.08rem", color: "#1a2e1a", lineHeight: 1.7 }}
                >
                  {post.excerpt}
                </p>
              </blockquote>

              {/* Key Takeaways */}
              <KeyTakeaways content={post.content} />

              {/* Body */}
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
              />

              {/* Disclaimer */}
              <div className="mt-10 p-5 rounded-xl" style={{ background: "white", border: "1px solid rgba(69,148,67,0.12)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#9CA3AF", fontFamily: "'Lora', serif" }}>
                  <strong style={{ color: "#6B7280" }}>Disclaimer:</strong> This article is for general information purposes only and does not constitute financial, legal or tax advice. Australian tax laws change frequently — please consult a qualified adviser before acting on any information contained in this article.
                </p>
              </div>

              {/* Author Bio */}
              <div className="mt-6 p-6 rounded-xl flex gap-4 items-start" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #1a2e1a, #459443)", fontSize: "1rem", fontFamily: "'Playfair Display', serif" }}
                >
                  SS
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm" style={{ color: "#1a2e1a" }}>Sharat Sharma (Sam)</p>
                  <p className="text-xs font-semibold mb-2" style={{ color: "#459443" }}>Founder & Director · CPA Australia</p>
                  <p className="text-xs leading-relaxed" style={{ color: "#6B7280", fontFamily: "'Lora', serif" }}>
                    Sam is a CPA-qualified accountant and Registered Tax Agent (#26122730) with over 20 years of experience across Australia, Asia, and the Middle East. He specialises in SMSF strategy, tax planning, and business advisory for Australian SMEs and investors.
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {["CPA Australia", "Tax Agent #26122730", "SMSF Specialist"].map((cred) => (
                      <span
                        key={cred}
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                        style={{ background: "rgba(69,148,67,0.1)", color: "#459443" }}
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                  <Link href="/about/message-from-director">
                    <span className="text-xs font-semibold mt-2.5 inline-flex items-center gap-1 cursor-pointer hover:underline" style={{ color: "#459443" }}>
                      View full profile <ChevronRight size={11} />
                    </span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ── Sidebar ── */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="sticky top-28 space-y-4">

                {/* CTA */}
                <div className="rounded-xl overflow-hidden" style={{ background: "#1a2e1a" }}>
                  <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #459443, #80d97e)" }} />
                  <div className="p-5">
                    <h3 className="font-bold text-white text-sm mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Need Expert Advice?
                    </h3>
                    <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)", fontFamily: "'Lora', serif" }}>
                      Speak with one of our SMSF or tax specialists. Free initial consultation.
                    </p>
                    <Link href="/contact">
                      <button className="w-full py-2.5 rounded-lg font-semibold text-sm text-white mb-2 hover:opacity-90 transition-opacity" style={{ background: "#459443" }}>
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
                  <div className="rounded-xl p-5" style={{ background: "white", border: "1px solid rgba(0,0,0,0.07)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={11} style={{ color: "#459443" }} />
                      <span className="text-[10px] font-bold uppercase tracking-[0.15em]" style={{ color: "#459443" }}>Contents</span>
                    </div>
                    <nav className="space-y-0.5">
                      {headings.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => scrollToHeading(h.id)}
                          className="flex items-start gap-1.5 py-1 text-xs leading-snug w-full text-left hover:text-[#459443] transition-colors"
                          style={{
                            color: "#6B7280",
                            paddingLeft: h.level === 3 ? "0.75rem" : "0",
                            fontFamily: "'Lora', serif",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          <span style={{ color: "rgba(69,148,67,0.5)", marginTop: "0.15rem", flexShrink: 0 }}>›</span>
                          {h.text}
                        </button>
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
                            <span className="text-[9px] font-bold uppercase tracking-wider" style={{ color: "#459443" }}>{r.category}</span>
                            <p
                              className="text-xs leading-snug mt-1 group-hover:text-[#459443] transition-colors"
                              style={{ color: "#374151", fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                            >
                              {r.title}
                            </p>
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
      <section className="py-14" style={{ background: "#1a2e1a" }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-bold text-white" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", letterSpacing: "-0.02em" }}>
              More Articles
            </h2>
            <Link href="/blog">
              <button className="text-sm font-semibold flex items-center gap-1.5 hover:gap-3 transition-all" style={{ color: "#80d97e" }}>
                View All <ArrowRight size={13} />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {allPosts.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <div
                  className="group rounded-xl overflow-hidden cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="h-[3px]" style={{ background: "#459443" }} />
                  <div className="p-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#80d97e" }}>{p.category}</span>
                    <h3
                      className="font-bold text-white mt-2 mb-3 leading-snug group-hover:text-[#80d97e] transition-colors"
                      style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem" }}
                    >
                      {p.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-semibold group-hover:gap-3 transition-all" style={{ color: "#459443" }}>
                      Read <ArrowRight size={11} />
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
