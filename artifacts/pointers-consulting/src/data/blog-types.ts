export interface BlogSummary {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export interface BlogPost extends BlogSummary {
  content: string;
}
