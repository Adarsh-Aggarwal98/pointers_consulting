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
