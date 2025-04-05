export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  slug: string;
  categories: string[];
  tags: string[];
  author?: string;
  content?: string;
}