import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

export type PostCategory = 'guide' | 'comparison' | 'study' | 'blog';

export interface PostMeta {
  title: string;
  description: string;
  category: PostCategory;
  date: string;
  updatedDate?: string;
  tags: string[];
  ogImage?: string;
  faqs?: { q: string; a: string }[];
  slug: string;
  readingTime: string;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));
}

export function getPostMeta(slug: string): PostMeta {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);

  return {
    title: data.title,
    description: data.description,
    category: data.category ?? 'blog',
    date: data.date,
    updatedDate: data.updatedDate,
    tags: data.tags ?? [],
    ogImage: data.ogImage,
    faqs: data.faqs,
    slug,
    readingTime: rt.text,
  };
}

export function getAllPosts(): PostMeta[] {
  return getAllSlugs()
    .map(getPostMeta)
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getPostsByCategory(category: PostCategory): PostMeta[] {
  return getAllPosts().filter((p) => p.category === category);
}
