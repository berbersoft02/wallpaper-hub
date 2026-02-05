import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import wallpapersData from '@/app/data/wallpapers.json';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

// Create a map of tags from the JSON file
const tagMap: Record<string, string[]> = {};
if (wallpapersData.characters) {
  wallpapersData.characters.forEach((char: any) => {
    if (char.tags) {
      tagMap[char.name] = char.tags;
    }
  });
}

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

const SPECIAL_CATEGORIES = [
  'Animals', 'Awesome', 'Cars', 'Live Wallpapers', 'Mixed', 'Pixel', 'Nature', 'Spider-Man'
];

function normalizeName(name: string) {
  const map: Record<string, string> = {
    'rin-nanakura': 'Rin Nanakura',
    'rin-shima': 'Rin Shima',
    'shikimori': 'Shikimori',
    'akane-kurokawa': 'Akane Kurokawa',
    'alya-kujou': 'Alya Kujou',
    'chinatsu': 'Chinatsu',
    'chisato-nishikigi': 'Chisato Nishikigi',
    'elaina': 'Elaina',
    'hina-chono': 'Hina Chono',
    'hushino': 'Subaru Hoshina',
    'Subaru Hoshino': 'Subaru Hoshina',
    'kaoruko-waguri': 'Kaoruko Waguri',
    'live-wallpapers': 'Live Wallpapers',
    'mai': 'Mai',
    'maria-kujou': 'Maria Kujou',
    'marin-kitagawa': 'Marin Kitagawa',
    'miku-nakano': 'Miku Nakano',
    'nakano-nino': 'Nakano Nino',
    'nishimiya-shouko': 'Nishimiya Shouko',
    'phoebe': 'Phoebe',
    'rias-gremory': 'Rias Gremory',
    'shiina-mahiru': 'Shiina Mahiru',
    'yuuko-hiragi': 'Yuuko Hiragi',
    'yuzuki-nanase': 'Yuzuki Nanase',
    'zero-two': 'Zero Two',
    'bachira-meguru': 'Bachira Meguru',
    'spider-man': 'Spider-Man',
    'Rin  Nanakura': 'Rin Nanakura',
    'Rias  Gremory': 'Rias Gremory',
    'boku-no-hero-academia': 'Boku No Hero Academia',
    'Boku no Hero Academia': 'Boku No Hero Academia',
    'violet-evergarden': 'Violet Evergarden',
    'isagi-yoichi': 'Isagi Yoichi',
    'ISAGI YOICHI': 'Isagi Yoichi',
  };
  
  let clean = name.trim();
  if (clean.includes('Give some recommendations')) return 'Hina Chono';
  
  // Apply map
  if (map[clean]) return map[clean];
  if (map[clean.toLowerCase()]) return map[clean.toLowerCase()];
  
  // Title Case
  return clean.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

async function fetchAll(resourceType: 'image' | 'video') {
  let list: any[] = [];
  let nextCursor: string | undefined = undefined;
  let pages = 0;
  
  try {
    do {
      pages++;
      const expression = `resource_type:${resourceType}`;
      const search = cloudinary.search
        .expression(expression)
        .sort_by('public_id', 'desc')
        .max_results(500);

      if (nextCursor) {
        search.next_cursor(nextCursor);
      }

      const result = await search.execute();
      
      if (result.resources) list.push(...result.resources);
      
      // Explicitly handle null/undefined from API response
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
      }
    }

    if (!rawName || rawName === 'wallpapers' || publicId.startsWith('samples/')) continue;

    const name = normalizeName(rawName);
    
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

  const characters = Array.from(charMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  // Move "Frieren" to the end of the array so it shows up first when the gallery reverses the list
  const frierenIndex = characters.findIndex(c => c.name === "Frieren");
  if (frierenIndex !== -1) {
    const [frieren] = characters.splice(frierenIndex, 1);
    characters.push(frieren);
  }

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
