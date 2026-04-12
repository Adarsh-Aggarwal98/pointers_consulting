# Blog SQLite Backend + Docker Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace hardcoded blog data with a SQLite-backed REST API and containerize the full app (frontend + backend) in a single Docker image.

**Architecture:** Express API server stores blogs in SQLite via Drizzle ORM. Frontend fetches blogs from `/api/blogs` instead of the static TypeScript file. In production (Docker), Express serves the React build as static files. In dev, Vite proxies `/api` requests to the API server.

**Tech Stack:** better-sqlite3, drizzle-orm/better-sqlite3, Express 5, Vite proxy, Docker multi-stage build

---

## File Map

| Action | Path |
|--------|------|
| Modify | `lib/db/package.json` — swap pg → better-sqlite3 |
| Modify | `lib/db/drizzle.config.ts` — switch dialect to sqlite |
| Modify | `lib/db/src/index.ts` — use better-sqlite3 driver |
| Create | `lib/db/src/schema/blogs.ts` — blog table + Zod schemas |
| Modify | `lib/db/src/schema/index.ts` — export blogs |
| Modify | `lib/api-spec/openapi.yaml` — add blog endpoints |
| Create | `artifacts/api-server/src/routes/blogs.ts` — GET /blogs, GET /blogs/:slug |
| Modify | `artifacts/api-server/src/routes/index.ts` — mount blog router |
| Create | `artifacts/api-server/src/lib/seed.ts` — seed existing 5 posts |
| Modify | `artifacts/api-server/src/index.ts` — run seed + serve static in prod |
| Modify | `artifacts/pointers-consulting/vite.config.ts` — add /api proxy |
| Modify | `artifacts/pointers-consulting/src/pages/blog-list.tsx` — fetch from API |
| Modify | `artifacts/pointers-consulting/src/pages/blog-post.tsx` — fetch from API |
| Create | `Dockerfile` — multi-stage build |
| Create | `docker-compose.yml` — one-command local run |

---

## Task 1: Switch lib/db to SQLite

**Files:**
- Modify: `lib/db/package.json`
- Modify: `lib/db/drizzle.config.ts`
- Modify: `lib/db/src/index.ts`

- [ ] **Step 1: Install better-sqlite3, remove pg**

In `lib/db/package.json`, replace the dependencies block:

```json
{
  "name": "@workspace/db",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "exports": {
    ".": "./src/index.ts",
    "./schema": "./src/schema/index.ts"
  },
  "scripts": {
    "push": "drizzle-kit push --config ./drizzle.config.ts",
    "push-force": "drizzle-kit push --force --config ./drizzle.config.ts"
  },
  "dependencies": {
    "better-sqlite3": "^11.9.1",
    "drizzle-orm": "catalog:",
    "drizzle-zod": "^0.8.3",
    "zod": "catalog:"
  },
  "devDependencies": {
    "@types/better-sqlite3": "^7.6.13",
    "@types/node": "catalog:",
    "drizzle-kit": "^0.31.9"
  }
}
```

- [ ] **Step 2: Update drizzle.config.ts for SQLite**

Replace `lib/db/drizzle.config.ts`:

```typescript
import { defineConfig } from "drizzle-kit";
import path from "path";

const DB_PATH = process.env.DATABASE_PATH ?? "./data/blog.db";

export default defineConfig({
  schema: path.join(__dirname, "./src/schema/index.ts"),
  dialect: "sqlite",
  dbCredentials: {
    url: DB_PATH,
  },
});
```

- [ ] **Step 3: Update lib/db/src/index.ts to use better-sqlite3**

Replace `lib/db/src/index.ts`:

```typescript
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

const DB_PATH = process.env.DATABASE_PATH ?? "./data/blog.db";

const sqlite = new Database(DB_PATH);

// Enable WAL mode for better concurrent read performance
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });

export * from "./schema";
```

- [ ] **Step 4: Install dependencies**

Run from the monorepo root:
```bash
cd C:/Users/aggar/Desktop/Pointers-Consulting/Pointers-Consulting
pnpm install
```

Expected: pnpm resolves better-sqlite3, removes pg references.

- [ ] **Step 5: Commit**

```bash
git add lib/db/package.json lib/db/drizzle.config.ts lib/db/src/index.ts
git commit -m "feat: switch db package from postgresql to sqlite (better-sqlite3)"
```

---

## Task 2: Add Blog Schema

**Files:**
- Create: `lib/db/src/schema/blogs.ts`
- Modify: `lib/db/src/schema/index.ts`

- [ ] **Step 1: Create blog table schema**

Create `lib/db/src/schema/blogs.ts`:

```typescript
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const blogsTable = sqliteTable("blogs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  category: text("category").notNull(),
  date: text("date").notNull(),
  readTime: text("read_time").notNull(),
  author: text("author").notNull(),
  content: text("content").notNull(),
});

export const insertBlogSchema = createInsertSchema(blogsTable).omit({ id: true });
export const selectBlogSchema = createSelectSchema(blogsTable);
export const blogSummarySchema = selectBlogSchema.omit({ content: true });

export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogsTable.$inferSelect;
export type BlogSummary = Omit<Blog, "content">;
```

- [ ] **Step 2: Export from schema index**

Replace `lib/db/src/schema/index.ts`:

```typescript
export * from "./blogs";
```

- [ ] **Step 3: Commit**

```bash
git add lib/db/src/schema/blogs.ts lib/db/src/schema/index.ts
git commit -m "feat: add blogs table schema with drizzle-zod types"
```

---

## Task 3: Update OpenAPI Spec + Regenerate Client

**Files:**
- Modify: `lib/api-spec/openapi.yaml`
- (auto-generated) `lib/api-client-react/src/generated/api.ts`
- (auto-generated) `lib/api-zod/src/generated/`

- [ ] **Step 1: Add blog endpoints to openapi.yaml**

Replace `lib/api-spec/openapi.yaml`:

```yaml
openapi: 3.1.0
info:
  title: Api
  version: 0.1.0
  description: API specification
servers:
  - url: /api
    description: Base API path
tags:
  - name: health
    description: Health operations
  - name: blogs
    description: Blog operations
paths:
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      summary: Health check
      description: Returns server health status
      responses:
        "200":
          description: Healthy
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"
  /blogs:
    get:
      operationId: listBlogs
      tags: [blogs]
      summary: List all blog posts
      description: Returns all blog posts without content (summary only)
      responses:
        "200":
          description: List of blog summaries
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/BlogSummary"
  /blogs/{slug}:
    get:
      operationId: getBlogBySlug
      tags: [blogs]
      summary: Get a single blog post
      parameters:
        - name: slug
          in: path
          required: true
          schema:
            type: string
      responses:
        "200":
          description: Full blog post
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/BlogPost"
        "404":
          description: Not found
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/NotFound"
components:
  schemas:
    HealthStatus:
      type: object
      properties:
        status:
          type: string
      required:
        - status
    BlogSummary:
      type: object
      properties:
        id:
          type: integer
        slug:
          type: string
        title:
          type: string
        excerpt:
          type: string
        category:
          type: string
        date:
          type: string
        readTime:
          type: string
        author:
          type: string
      required:
        - id
        - slug
        - title
        - excerpt
        - category
        - date
        - readTime
        - author
    BlogPost:
      allOf:
        - $ref: "#/components/schemas/BlogSummary"
        - type: object
          properties:
            content:
              type: string
          required:
            - content
    NotFound:
      type: object
      properties:
        message:
          type: string
      required:
        - message
```

- [ ] **Step 2: Run codegen**

```bash
pnpm --filter @workspace/api-spec run codegen
```

Expected: `lib/api-client-react/src/generated/api.ts` and `lib/api-zod/src/generated/` updated with `useListBlogs`, `useGetBlogBySlug` hooks and matching Zod schemas.

- [ ] **Step 3: Rebuild lib packages**

```bash
pnpm run typecheck:libs
```

Expected: No TypeScript errors.

- [ ] **Step 4: Commit**

```bash
git add lib/api-spec/openapi.yaml lib/api-client-react/src lib/api-zod/src
git commit -m "feat: add blog endpoints to OpenAPI spec and regenerate client"
```

---

## Task 4: Blog API Routes

**Files:**
- Create: `artifacts/api-server/src/routes/blogs.ts`
- Modify: `artifacts/api-server/src/routes/index.ts`

- [ ] **Step 1: Create blog router**

Create `artifacts/api-server/src/routes/blogs.ts`:

```typescript
import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, blogsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/blogs", async (_req, res) => {
  const blogs = await db
    .select({
      id: blogsTable.id,
      slug: blogsTable.slug,
      title: blogsTable.title,
      excerpt: blogsTable.excerpt,
      category: blogsTable.category,
      date: blogsTable.date,
      readTime: blogsTable.readTime,
      author: blogsTable.author,
    })
    .from(blogsTable)
    .orderBy(desc(blogsTable.id));

  res.json(blogs);
});

router.get("/blogs/:slug", async (req, res) => {
  const { slug } = req.params;
  const [blog] = await db
    .select()
    .from(blogsTable)
    .where(eq(blogsTable.slug, slug));

  if (!blog) {
    res.status(404).json({ message: "Blog post not found" });
    return;
  }

  res.json(blog);
});

export default router;
```

- [ ] **Step 2: Mount blog router in routes/index.ts**

Replace `artifacts/api-server/src/routes/index.ts`:

```typescript
import { Router, type IRouter } from "express";
import healthRouter from "./health";
import blogsRouter from "./blogs";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogsRouter);

export default router;
```

- [ ] **Step 3: Commit**

```bash
git add artifacts/api-server/src/routes/blogs.ts artifacts/api-server/src/routes/index.ts
git commit -m "feat: add GET /api/blogs and GET /api/blogs/:slug routes"
```

---

## Task 5: Seed Existing Blog Posts

**Files:**
- Create: `artifacts/api-server/src/lib/seed.ts`
- Modify: `artifacts/api-server/src/index.ts`

- [ ] **Step 1: Create seed module**

Create `artifacts/api-server/src/lib/seed.ts`:

```typescript
import { db, blogsTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { logger } from "./logger";

const SEED_POSTS = [
  {
    slug: "understanding-smsf-is-it-right-for-you",
    title: "Understanding SMSF: Is a Self-Managed Super Fund Right for You?",
    excerpt:
      "Self-managed super funds offer Australians unparalleled control over their retirement savings. But with great control comes great responsibility. Here's what you need to know before making the switch.",
    category: "SMSF",
    date: "March 28, 2025",
    readTime: "6 min read",
    author: "Pointers Consulting",
    content: `Self-managed super funds (SMSFs) have become increasingly popular among Australians seeking greater control over their retirement savings. With over 600,000 SMSFs managing more than $900 billion in assets, it's clear that many Australians see value in this approach. But is an SMSF right for you?

**What is an SMSF?**

An SMSF is a private superannuation fund that you manage yourself. Unlike industry or retail super funds, with an SMSF you are both a trustee and a member. This means you make all the investment decisions and are responsible for ensuring the fund complies with superannuation laws.

**The key advantages**

The primary appeal of an SMSF lies in investment flexibility. Unlike public-offer funds, an SMSF can invest in a broader range of assets including direct property, unlisted shares, collectibles, and business real property. This can be particularly attractive for business owners who may wish to hold their business premises within their super fund.

Additionally, SMSFs can offer tax planning opportunities. With the right strategy, you can manage the timing of investment income and capital gains to minimise tax, particularly as you approach retirement.

Estate planning is another area where SMSFs shine. You have far more flexibility in how your super benefits are distributed to your beneficiaries, including the ability to create binding death benefit nominations and pension strategies that can provide ongoing income to dependants.

**The responsibilities you must accept**

Running an SMSF is not a passive endeavour. As a trustee, you are legally responsible for the fund's compliance with superannuation legislation. The Australian Taxation Office (ATO) has extensive powers to penalise non-compliant funds, and penalties can be significant.

You must prepare annual financial statements, arrange an independent audit, lodge an annual return with the ATO, and ensure investments align with your fund's investment strategy. The time commitment is real — most SMSF trustees spend several hours per month managing their fund.

**Is it worth it financially?**

The economics of an SMSF typically start to make sense when your combined member balance reaches $200,000 or more. Below this threshold, the fixed costs of running the fund — auditing, accounting, and administration — tend to represent a disproportionate percentage of the fund's assets.

**Getting the right advice**

Before establishing an SMSF, you should seek advice from a licensed SMSF specialist. The decision should be based on your individual circumstances, including your retirement goals, investment knowledge, and the time you're willing to commit to fund administration.

At Pointers Consulting, we help clients navigate every aspect of SMSF establishment and ongoing management. If you're considering an SMSF, reach out to our team for a comprehensive assessment of whether this structure suits your situation.`,
  },
  {
    slug: "top-tax-strategies-australian-small-business-2025",
    title: "Top Tax Strategies for Australian Small Business Owners in 2025",
    excerpt:
      "With the end of the financial year approaching, now is the time to review your tax position. These proven strategies can help Australian small business owners legally minimise their tax obligations.",
    category: "Tax",
    date: "March 15, 2025",
    readTime: "7 min read",
    author: "Pointers Consulting",
    content: `For Australian small business owners, effective tax planning is not just about the end of the financial year — it's a year-round discipline. The strategies you implement now can significantly reduce your tax liability while keeping you on the right side of the ATO.

**Instant Asset Write-Off**

The instant asset write-off scheme remains one of the most powerful tools available to small businesses. Eligible businesses can immediately deduct the business portion of an asset's cost in the year the asset is first used or installed ready for use. Understanding which assets qualify and timing your purchases strategically can make a significant difference to your taxable income.

**Division 7A Loan Strategies**

If your business operates through a company structure, Division 7A rules govern loans and payments made to shareholders or associates. Getting this wrong can result in deemed dividends that are fully assessable. Proper planning around Division 7A, including the use of complying loan agreements, is essential for any private company.

**Pre-Paying Expenses**

Businesses can prepay certain expenses up to 12 months in advance and claim an immediate deduction. This strategy can be particularly effective in years where you've had higher than usual income. Common candidates include professional indemnity insurance, subscriptions, and lease payments.

**Superannuation Contributions**

Contributing to superannuation for yourself and your employees is both a genuine business expense and a meaningful way to build long-term wealth. For business owners who are also employees of their company, maximising concessional contributions (currently up to $30,000 per annum for most individuals) while they remain tax-deductible is a high-priority strategy.

**Trust Distribution Planning**

If your business operates through a family trust, careful planning around income distributions can significantly reduce the overall family tax burden. Distributing income to lower-income family members (where legitimate and appropriate) can utilise their lower marginal tax rates.

**Small Business Tax Concessions**

Businesses with an aggregated turnover under $10 million qualify for a range of small business tax concessions. These include the small business income tax offset for sole traders, concessions on capital gains tax, and simplified depreciation rules.

The tax landscape changes frequently, and strategies that were optimal last year may not be ideal this year. Working with a qualified tax adviser who understands your business structure and goals is essential to staying ahead. Contact Pointers Consulting to discuss a tailored tax strategy for your business.`,
  },
  {
    slug: "smsf-compliance-checklist",
    title: "SMSF Compliance Checklist: What Every Trustee Needs to Know",
    excerpt:
      "Compliance is the foundation of a successful SMSF. Missing a key obligation can result in significant penalties. This comprehensive checklist helps trustees stay on top of their responsibilities.",
    category: "SMSF",
    date: "February 20, 2025",
    readTime: "8 min read",
    author: "Pointers Consulting",
    content: `Running an SMSF comes with substantial compliance obligations. The Australian Tax Office actively monitors SMSF trustees, and the consequences of non-compliance can include fund disqualification, significant financial penalties, and in serious cases, criminal prosecution.

**Annual Obligations**

Every SMSF must have its financial statements prepared each financial year. These include a balance sheet, operating statement, and member statements. An independent approved SMSF auditor must then audit these financial statements.

**Investment Strategy**

Your fund must have a documented investment strategy that considers liquidity, the ability to discharge liabilities, insurance for members, and the composition of investments with regard to risk, return, and diversification.

**Sole Purpose Test**

Every investment made by your SMSF must satisfy the sole purpose test — the fund must be maintained solely to provide retirement benefits to members.

**In-House Asset Rules**

Investments in related parties or entities are generally limited to 5% of the fund's total asset value.

**Contribution Caps**

Members must not exceed their concessional ($30,000) and non-concessional ($120,000) contribution caps.

Given the complexity of SMSF compliance, most trustees benefit from working with a specialist SMSF administrator and adviser. Pointers Consulting provides comprehensive SMSF compliance services.`,
  },
  {
    slug: "maximise-super-contributions-2024-25",
    title: "How to Maximise Your Super Contributions in the 2024-25 Financial Year",
    excerpt:
      "Superannuation contribution rules have been updated for 2024-25. Understanding the current caps, carry-forward provisions, and co-contribution rules can significantly boost your retirement savings.",
    category: "Superannuation",
    date: "February 5, 2025",
    readTime: "5 min read",
    author: "Pointers Consulting",
    content: `The 2024-25 financial year brings updated superannuation contribution caps and rules that present significant opportunities for Australians looking to accelerate their retirement savings.

**Concessional Contributions**

Concessional contributions are before-tax contributions taxed at 15% within the super fund. For 2024-25, the cap is $30,000. For those with a total super balance under $500,000, unused cap amounts from the prior five years can be carried forward.

**Non-Concessional Contributions**

Non-concessional contributions are after-tax contributions. The cap for 2024-25 is $120,000 per year. Individuals under age 75 may bring forward up to three years' worth, allowing a maximum of $360,000 in a single year.

**Government Co-Contributions**

For lower-income earners who make after-tax contributions, the government may provide a co-contribution of up to $500.

**Spouse Contributions**

If your spouse earns less than $37,000 per year, you may claim an 18% tax offset on up to $3,000 of contributions made to their super account.

If you're unsure how to optimise your super contributions, Pointers Consulting can provide personalised advice.`,
  },
  {
    slug: "business-succession-planning",
    title: "Business Succession Planning: Protecting Your Legacy",
    excerpt:
      "Every business owner will eventually exit their business, whether through sale, retirement, or unexpected illness. Having a comprehensive succession plan protects your life's work and ensures your legacy endures.",
    category: "Business Advisory",
    date: "January 22, 2025",
    readTime: "7 min read",
    author: "Pointers Consulting",
    content: `Business succession planning is one of the most important — and most frequently neglected — aspects of running a business. Research consistently shows that fewer than 30% of family businesses successfully transition to the next generation.

**Why Succession Planning Matters**

Whether you intend to sell your business to a third party, pass it to a family member, or hand it over to key employees, the preparation required is substantial. Starting early — ideally five to ten years before your intended exit — gives you time to make the business as attractive and transferable as possible.

**Valuing Your Business**

The foundation of any succession plan is a realistic understanding of what your business is worth. Many business owners are surprised to discover that their business is worth significantly less than they expected, particularly if heavily dependent on their personal relationships.

**Structuring for Succession**

The small business CGT concessions can reduce or eliminate capital gains tax on the sale of a business, but accessing these concessions requires careful planning.

**Key Person Risk**

Life insurance and TPD insurance held within super can provide the funds necessary to buy out an incapacitated owner's interest and allow the business to continue.

Pointers Consulting works with business owners at every stage of their succession journey. Contact us to begin the conversation.`,
  },
];

export async function seedBlogs(): Promise<void> {
  const existing = await db.$count(blogsTable);

  if (existing > 0) {
    logger.info({ count: existing }, "Blogs already seeded, skipping");
    return;
  }

  await db.insert(blogsTable).values(SEED_POSTS);
  logger.info({ count: SEED_POSTS.length }, "Seeded blog posts");
}
```

- [ ] **Step 2: Call seed from server startup**

In `artifacts/api-server/src/index.ts`, add seed call and optional static file serving:

```typescript
import path from "path";
import { existsSync } from "fs";
import app from "./app";
import { logger } from "./lib/logger";
import { seedBlogs } from "./lib/seed";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// In production (Docker), serve the React build as static files
const staticDir = path.resolve(process.cwd(), "public");
if (existsSync(staticDir)) {
  const { default: sirv } = await import("sirv");
  app.use(sirv(staticDir, { single: true }));
  logger.info({ staticDir }, "Serving static files");
}

// Seed DB on first run
await seedBlogs();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});
```

- [ ] **Step 3: Add sirv dependency to api-server**

In `artifacts/api-server/package.json`, add to dependencies:
```json
"sirv": "^3.0.1"
```

Then add to devDependencies:
```json
"@types/sirv": "^3.0.0"
```

Run:
```bash
pnpm install
```

- [ ] **Step 4: Commit**

```bash
git add artifacts/api-server/src/lib/seed.ts artifacts/api-server/src/index.ts artifacts/api-server/package.json
git commit -m "feat: seed 5 blog posts on startup, serve static files in production"
```

---

## Task 6: Add Vite Dev Proxy

**Files:**
- Modify: `artifacts/pointers-consulting/vite.config.ts`

- [ ] **Step 1: Add proxy to vite.config.ts server block**

In `artifacts/pointers-consulting/vite.config.ts`, add `proxy` inside the `server` block:

```typescript
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      "/api": {
        target: `http://localhost:${process.env.API_PORT ?? "3001"}`,
        changeOrigin: true,
      },
    },
  },
```

The API server needs a different port than the frontend in dev. Set `API_PORT=3001` when running the API server locally.

- [ ] **Step 2: Commit**

```bash
git add artifacts/pointers-consulting/vite.config.ts
git commit -m "feat: proxy /api requests to api server in vite dev"
```

---

## Task 7: Update Frontend to Fetch from API

**Files:**
- Modify: `artifacts/pointers-consulting/src/pages/blog-list.tsx`
- Modify: `artifacts/pointers-consulting/src/pages/blog-post.tsx`

- [ ] **Step 1: Update blog-list.tsx to use useListBlogs hook**

Replace the import and data source in `artifacts/pointers-consulting/src/pages/blog-list.tsx`. Replace:
```typescript
import { blogPosts } from "@/data/blog";
```

With:
```typescript
import { useListBlogs } from "@workspace/api-client-react";
```

Replace the `categories` constant and the `BlogList` component body to use the hook:

```typescript
export default function BlogList() {
  const { data: blogPosts = [], isLoading } = useListBlogs();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    document.title = "Blog | Pointers Consulting";
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-gray-500">Loading articles...</div>
      </div>
    );
  }
  // ... rest of JSX unchanged
```

- [ ] **Step 2: Update blog-post.tsx to use useGetBlogBySlug hook**

In `artifacts/pointers-consulting/src/pages/blog-post.tsx`, replace imports:
```typescript
import { blogPosts, getBlogPost } from "@/data/blog";
```

With:
```typescript
import { useGetBlogBySlug, useListBlogs } from "@workspace/api-client-react";
```

Replace the component body top:
```typescript
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useGetBlogBySlug(slug ?? "");
  const { data: allPosts = [] } = useListBlogs();
  const related = allPosts.filter((p) => p.slug !== slug && p.category === post?.category).slice(0, 3);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Pointers Consulting`;
    }
    window.scrollTo(0, 0);
  }, [slug, post]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!post) {
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
  // ... rest of JSX unchanged
```

Also update the "More Articles" section at the bottom to use `allPosts` instead of `blogPosts`:
```typescript
{allPosts.filter((p) => p.slug !== slug).slice(0, 3).map((p) => (
```

- [ ] **Step 3: Commit**

```bash
git add artifacts/pointers-consulting/src/pages/blog-list.tsx artifacts/pointers-consulting/src/pages/blog-post.tsx
git commit -m "feat: fetch blogs from API instead of hardcoded data"
```

---

## Task 8: Dockerfile + docker-compose

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `.dockerignore`

- [ ] **Step 1: Create .dockerignore**

Create `.dockerignore`:
```
node_modules
**/node_modules
**/dist
**/.env
.git
docs
```

- [ ] **Step 2: Create Dockerfile**

Create `Dockerfile` at the monorepo root:

```dockerfile
# ---- deps ----
FROM node:24-alpine AS deps
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy manifests only (cache layer)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY lib/db/package.json lib/db/
COPY lib/api-zod/package.json lib/api-zod/
COPY lib/api-client-react/package.json lib/api-client-react/
COPY lib/api-spec/package.json lib/api-spec/
COPY artifacts/api-server/package.json artifacts/api-server/
COPY artifacts/pointers-consulting/package.json artifacts/pointers-consulting/
COPY tsconfig.base.json tsconfig.json ./

RUN pnpm install --frozen-lockfile

# ---- build-frontend ----
FROM deps AS build-frontend
COPY . .
ENV PORT=3000
ENV BASE_PATH=/
RUN pnpm --filter @workspace/pointers-consulting run build

# ---- build-api ----
FROM deps AS build-api
COPY . .
RUN pnpm --filter @workspace/api-server run build

# ---- runner ----
FROM node:24-alpine AS runner
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy compiled API bundle
COPY --from=build-api /app/artifacts/api-server/dist ./dist

# Copy React static files (served by Express via sirv)
COPY --from=build-frontend /app/artifacts/pointers-consulting/dist/public ./public

# Copy native module (better-sqlite3 is externalized by esbuild)
COPY --from=deps /app/node_modules/better-sqlite3 ./node_modules/better-sqlite3

# Pino worker files (externalized by esbuild-plugin-pino)
COPY --from=deps /app/node_modules/pino ./node_modules/pino
COPY --from=deps /app/node_modules/pino-pretty ./node_modules/pino-pretty
COPY --from=deps /app/node_modules/thread-stream ./node_modules/thread-stream

RUN mkdir -p /data

ENV PORT=3000
ENV DATABASE_PATH=/data/blog.db
ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "--enable-source-maps", "./dist/index.mjs"]
```

- [ ] **Step 3: Create docker-compose.yml**

Create `docker-compose.yml`:

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - blog-data:/data
    environment:
      PORT: "3000"
      DATABASE_PATH: /data/blog.db
      NODE_ENV: production

volumes:
  blog-data:
```

- [ ] **Step 4: Build and test Docker image**

```bash
docker compose build
docker compose up
```

Open `http://localhost:3000` — should see the website.
Open `http://localhost:3000/blog` — should see 5 blog posts loaded from SQLite.

- [ ] **Step 5: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "feat: multi-stage Dockerfile + docker-compose for production deployment"
```

---

## Dev Workflow (After Implementation)

**Terminal 1 — API server (port 3001):**
```bash
cd Pointers-Consulting
PORT=3001 DATABASE_PATH=./data/blog.db pnpm --filter @workspace/api-server run dev
```

**Terminal 2 — Frontend (port 3000, proxies /api to 3001):**
```bash
PORT=3000 BASE_PATH=/ API_PORT=3001 pnpm --filter @workspace/pointers-consulting run dev
```

**Docker (production):**
```bash
docker compose up --build
```
