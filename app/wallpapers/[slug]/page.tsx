import { getCharacterBySlug, getAllCharacters, slugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import Image from 'next/image';
import { Metadata } from 'next';
import Link from 'next/link';
import { Download, Heart } from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  
  if (!character) return { title: 'Character Not Found' };

  const name = character.name.replace(' ♡', '');
  return {
    title: `Best ${name} 4K Wallpapers - Download High Quality Anime Backgrounds`,
    description: `Download premium 4K upscaled wallpapers of ${name} from ${character.category}. High resolution, color-graded, and optimized for mobile and desktop screens.`,
    keywords: `${name}, ${character.tags?.join(', ')}, Anime Wallpaper, 4K, HD, Download`,
    openGraph: {
      title: `${name} 4K Wallpapers | Only_dias Ocean`,
      description: `Exclusive collection of ${name} wallpapers in 4K resolution.`,
      images: [character.wallpapers[0]],
    }
  };
}

export async function generateStaticParams() {
  const characters = getAllCharacters();
  return characters.map((char) => ({
    slug: slugify(char.name),
  }));
}

export default async function CharacterWallpapersPage({ params }: Props) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const name = character.name.replace(' ♡', '');

  // JSON-LD for Google Image Gallery indexing
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    'name': `${name} 4K Wallpapers Collection`,
    'description': `A curated collection of high-resolution 4K wallpapers featuring ${name}.`,
    'image': character.wallpapers.map(url => ({
      '@type': 'ImageObject',
      'contentUrl': url,
      'name': `${name} Wallpaper`,
      'author': 'Only_dias'
    }))
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-20">
        <header className="mb-12 text-center">
          <Link 
            href="/#gallery"
            className="inline-block mb-8 font-pixel text-neon-cyan hover:text-neon-pink transition-colors"
          >
            ← Back to Gallery
          </Link>
          
          <h1 className="font-pixel text-4xl md:text-6xl text-white mb-6 drop-shadow-[0_0_20px_rgba(5,217,232,0.5)]">
            {character.name} <span className="text-neon-pink">WALLPAPERS</span>
          </h1>
          
          <div className="flex justify-center flex-wrap gap-2 mb-8">
            {character.tags?.map(tag => (
              <span key={tag} className="font-pixel text-sm bg-gray-800 text-neon-cyan px-3 py-1 rounded-full border border-neon-cyan/30">
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-gray-400 max-w-2xl mx-auto font-body text-lg">
            Experience the best {name} wallpapers in stunning 4K resolution. Every image is meticulously upscaled and color-graded to provide the highest quality for your setup.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {character.wallpapers.map((url, index) => (
            <div 
              key={index}
              className="group relative bg-card-bg border-2 border-gray-800 hover:border-neon-pink transition-all duration-500 rounded-lg overflow-hidden shadow-lg hover:shadow-[0_0_40px_rgba(255,42,109,0.3)]"
            >
              <div className="aspect-[9/16] relative overflow-hidden">
                <Image 
                  src={url}
                  alt={`${name} 4K Wallpaper - ${index + 1} | Only_dias Ocean`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a 
                    href={url}
                    download={`${slug}-${index + 1}.jpg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 bg-neon-cyan text-dark-bg rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_rgba(5,217,232,0.5)]"
                  >
                    <Download size={24} />
                  </a>
                  <button className="p-4 bg-white/10 backdrop-blur-md text-white rounded-full hover:scale-110 transition-transform">
                    <Heart size={24} />
                  </button>
                </div>
              </div>
              <div className="p-4 bg-dark-bg/90 backdrop-blur-sm border-t border-gray-800">
                <h3 className="font-pixel text-sm text-gray-300">{name} - 4K Edit #{index + 1}</h3>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-20 p-8 bg-card-bg rounded-2xl border border-gray-800 text-center">
          <h2 className="font-pixel text-2xl text-neon-pink mb-4">Want to learn how we edit these?</h2>
          <p className="text-gray-400 mb-8 font-body">Check out our professional workflow guide and character stories on the blog.</p>
          <Link 
            href="/blog"
            className="inline-block px-10 py-4 bg-neon-cyan text-dark-bg font-pixel rounded-lg hover:bg-white transition-all shadow-[0_0_20px_rgba(5,217,232,0.4)]"
          >
            GO TO BLOG
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
