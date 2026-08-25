import { getCharacterBySlug, slugify } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { getCharacterDescription } from '@/lib/character-descriptions';
import { Metadata } from 'next';
import CharacterPageClient from './CharacterPageClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);
  
  if (!character) return { title: 'Character Not Found' };

  const name = character.name.replace(' ♡', '');
  const description = getCharacterDescription(name);

  return {
    title: `${name} 4K Wallpapers & PFP Collection`,
    description: `Download premium 4K upscaled wallpapers and profile pictures of ${name}. ${description.overview.substring(0, 120)}...`,
    keywords: [`${name} wallpaper`, `${name} 4K`, `${name} pfp`, `${name} profile picture`, 'anime wallpaper'],
    openGraph: {
      title: `${name} | High Quality 4K Anime Wallpapers`,
      description: `Explore our exclusive collection of ${name} 4K wallpapers and PFPs. Optimized for mobile and desktop.`,
      images: [
        {
          url: character.wallpapers[0],
          width: 1200,
          height: 630,
          alt: `${name} 4K Wallpaper Preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${name} 4K Wallpaper Collection`,
      description: `Premium 4K digital assets for ${name} fans.`,
      images: [character.wallpapers[0]],
    },
  };
}

export default async function CharacterWallpapersPage({ params }: Props) {
  const { slug } = await params;
  const character = getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  const name = character.name.replace(' ♡', '');

  // Structured Data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${name} 4K Wallpaper Collection`,
    description: `Premium 4K upscaled wallpapers of ${name} for desktop and mobile devices`,
    url: `https://saidahriken.site/wallpapers/${slug}`,
    author: {
      '@type': 'Person',
      name: 'GOHAN',
      url: 'https://saidahriken.site/about',
    },
    image: character.wallpapers.slice(0, 10).map((url, index) => ({
      '@type': 'ImageObject',
      contentUrl: url,
      name: `${name} 4K Wallpaper ${index + 1}`,
      encodingFormat: 'image/jpeg',
      width: '3840',
      height: '2160',
      license: 'https://saidahriken.site/terms',
      acquireLicensePage: 'https://saidahriken.site/terms',
      creditText: 'Only_Gohan Ocean',
      creator: {
        '@type': 'Person',
        name: 'GOHAN',
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CharacterPageClient character={character} slug={slug} />
    </>
  );
}
