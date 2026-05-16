export interface BlogSummary {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  coverImage?: string;
  cover_image?: string;
}

export interface BlogPost extends BlogSummary {
  content: string;
}
