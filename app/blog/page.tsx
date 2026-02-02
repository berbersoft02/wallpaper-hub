import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="font-pixel text-4xl md:text-6xl text-neon-cyan mb-4 drop-shadow-[0_0_24px_rgba(5,217,232,0.8)]">
            Only_dias <span className="text-neon-pink">Blog ({posts.length})</span>
          </h1>
          <p className="font-body text-gray-400 text-xl max-w-2xl mx-auto">
            Tutorials, trends, and updates from the world of anime art and customization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article 
              key={post.slug}
              className="bg-card-bg border-2 border-gray-800 rounded-lg overflow-hidden hover:border-neon-cyan transition-all hover:shadow-[0_0_24px_rgba(5,217,232,0.3)] group"
            >
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs font-pixel bg-gray-800 text-neon-pink px-2 py-1 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="font-pixel text-2xl mb-3 group-hover:text-neon-cyan transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="font-body text-gray-400 mb-6 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex justify-between items-center text-sm text-gray-500 font-mono border-t border-gray-800 pt-4">
                  <span>{post.date}</span>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-neon-cyan hover:text-white transition-colors"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
