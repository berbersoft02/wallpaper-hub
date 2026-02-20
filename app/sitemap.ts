import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/blog';
import { getAllCharacters, slugify } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://saidahriken.site'; // Updated domain name

  // Get all blog posts
  const posts = getAllPosts();
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Get all character wallpaper pages
  const characters = getAllCharacters();
  const wallpaperUrls = characters.map((char) => ({
    url: `${baseUrl}/wallpapers/${slugify(char.name)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/blog',
    '/guide',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticPages, ...blogUrls, ...wallpaperUrls];
}
