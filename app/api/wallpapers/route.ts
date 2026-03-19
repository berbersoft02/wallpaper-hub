import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import wallpapersData from '@/app/data/wallpapers.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

const tagMap: Record<string, string[]> = {};

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  folder?: string;
  asset_folder?: string;
  resource_type: string;
}

if (wallpapersData.characters) {
  wallpapersData.characters.forEach((char: { name: string; tags?: string[] }) => {
    if (char.tags) {
      tagMap[char.name] = char.tags;
    }
  });
}

const SPECIAL_CATEGORIES = [
  'Desktop Wallpapers',
  'Mixed',
  'Awesome',
  'Aesthetic Scenery',
  'Nature',
  'Animals',
  'Cars',
  'Sketchbook'
];

function getCharacterNameFromFolder(name: string): string {
  const clean = name.trim();
  if (clean.includes('Give some recommendations')) return 'Hina Chono';
  if (clean.includes('Hina Chono')) return 'Hina Chono';
  if (clean.includes('Kano Chinatsu')) return 'Kano Chinatsu';
  if (clean.includes('Shiina Mahiru')) return 'Shiina Mahiru';
  if (clean.includes('Nishimiya Shouko')) return 'Nishimiya Shouko';
  if (clean.includes('Alya Kujou')) return 'Alya Kujou ♡';
  if (clean.includes('Yuki Suou')) return 'Yuki Suou';
  if (clean.includes('Violet Evergarden')) return 'Violet Evergarden';
  if (clean.includes('Frieren')) return 'Frieren';
  if (clean.includes('Shikimori Micchon')) return 'Shikimori Micchon';
  if (clean.includes('Toji fushiguro')) return 'Toji Fushiguro';
  return clean;
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
  secure: true
});

async function fetchAll(resourceType: 'image' | 'video') {
  const list: CloudinaryResource[] = [];
  let nextCursor: string | undefined = undefined;
  let pages = 0;
  
  try {
    do {
      pages++;
      // Search specifically in wallpapers folder to avoid root assets
      const expression = `folder:wallpapers/* AND resource_type:${resourceType}`;
      const search = cloudinary.search
        .expression(expression)
        .sort_by('public_id', 'desc')
        .max_results(500);

      if (nextCursor) {
        search.next_cursor(nextCursor);
      }

      const result = await search.execute();
      
      if (result.resources) list.push(...result.resources);
      
      nextCursor = (result.next_cursor as string | null) || undefined;
      
    } while (nextCursor);
  } catch (e) {
    console.error(`Error fetching ${resourceType}:`, e);
  }
  return { list, pages };
}

export async function GET() {
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Cloudinary config missing' }, { status: 500 });
  }

  const [imagesData, videosData] = await Promise.all([
    fetchAll('image'),
    fetchAll('video')
  ]);

  const images = imagesData.list;
  const videos = videosData.list;

  const all = [...images, ...videos];
  const charMap = new Map();

  for (const item of all) {
    const folder = item.folder || item.asset_folder || '';
    const publicId = item.public_id || '';
    let rawName = '';
    
    if (folder) {
      const parts = folder.split('/');
      const wpIndex = parts.indexOf('wallpapers');
      if (wpIndex !== -1 && parts.length > wpIndex + 1) {
        rawName = parts[wpIndex + 1];
      } else if (wpIndex !== -1 && parts.length === wpIndex + 1) {
        rawName = 'Mixed';
      } else if (wpIndex === -1 && parts.length > 0) {
        rawName = parts[0];
      }
    }

    if (!rawName && publicId) {
      const parts = publicId.split('/');
      const wpIndex = parts.indexOf('wallpapers');
      if (wpIndex !== -1 && parts.length > wpIndex + 1) {
        rawName = parts[wpIndex + 1];
      } else if (wpIndex !== -1 && parts.length === wpIndex + 1) {
        rawName = 'Mixed';
      }
    }

    if (!rawName) continue;

    const name = getCharacterNameFromFolder(rawName);
    
    if (!charMap.has(name)) {
      charMap.set(name, {
        name,
        category: SPECIAL_CATEGORIES.includes(name) ? 'Special' : 'Anime',
        tags: tagMap[name] || [],
        wallpapers: []
      });
    }
    
    const currentList = charMap.get(name).wallpapers;
    if (!currentList.includes(item.secure_url)) {
      currentList.push(item.secure_url);
    }
  }

  const characters = Array.from(charMap.values());

  return NextResponse.json({
    characters,
    source: 'cloudinary-live-full',
    total: all.length,
    debug: {
      imagesFound: images.length,
      videosFound: videos.length,
      imagePages: imagesData.pages,
      videoPages: videosData.pages
    }
  });
}
