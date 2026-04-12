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

export type InsertBlog = z.infer<typeof insertBlogSchema>;
export type Blog = typeof blogsTable.$inferSelect;
export type BlogSummary = Omit<Blog, "content">;
