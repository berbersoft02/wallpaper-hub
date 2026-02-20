import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | Only_dias Ocean`,
    description: post.excerpt,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    }
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-20">
        <Link 
          href="/blog"
          className="inline-block mb-8 font-pixel text-neon-cyan hover:text-neon-pink transition-colors"
        >
          ← Back to Blog
        </Link>

        <article>
          <header className="mb-12 text-center">
            <div className="flex justify-center gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="font-pixel text-sm bg-gray-800 text-neon-pink px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-pixel text-3xl md:text-5xl text-white mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex justify-center items-center gap-4 text-gray-400 font-mono text-sm">
              <span>{post.date}</span>
              <span>•</span>
              <span>By {post.author}</span>
            </div>
          </header>

          <div 
            className="prose prose-invert prose-lg max-w-none prose-headings:font-pixel prose-headings:text-neon-cyan prose-a:text-neon-pink prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        <div className="mt-20 pt-10 border-t border-gray-800">
          <h3 className="font-pixel text-2xl text-white mb-6">Read Next</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getAllPosts()
              .filter(p => p.slug !== post.slug)
              .slice(0, 2)
              .map(p => (
                <Link 
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="block p-6 bg-card-bg border border-gray-800 rounded-lg hover:border-neon-cyan transition-colors"
                >
                  <h4 className="font-pixel text-lg text-white mb-2">{p.title}</h4>
                  <p className="text-sm text-gray-400 line-clamp-2">{p.excerpt}</p>
                </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
