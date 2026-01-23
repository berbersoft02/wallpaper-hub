import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

const SPECIAL_CATEGORIES = [
  'Animals', 'Awesome', 'Cars', 'Live Wallpapers', 'Mixed', 'Pixel'
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
    'hushino': 'Hushino',
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
    'Rin  Nanakura': 'Rin Nanakura',
    'Rias  Gremory': 'Rias Gremory',
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
  
  try {
    do {
      const expression = `resource_type:${resourceType} AND folder:wallpapers/*`;
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
  return list;
}

export async function GET() {
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({ error: 'Cloudinary config missing' }, { status: 500 });
  }

  const [images, videos] = await Promise.all([
    fetchAll('image'),
    fetchAll('video')
  ]);

  const all = [...images, ...videos];
  const charMap = new Map();

  for (const item of all) {
    const folder = item.folder || item.asset_folder || '';
    const parts = folder.split('/');
    let rawName = '';
    
    if (parts.length > 1 && parts[0] === 'wallpapers') {
      rawName = parts[1];
    } else if (parts.length === 1 && parts[0] !== 'wallpapers') {
      rawName = parts[0];
    } else if (item.public_id) {
       const pParts = item.public_id.split('/');
       if (pParts.length > 2 && pParts[0] === 'wallpapers') {
         rawName = pParts[1];
       }
    }

    if (!rawName) continue;

    const name = normalizeName(rawName);
    
    if (!charMap.has(name)) {
      charMap.set(name, {
        name,
        category: SPECIAL_CATEGORIES.includes(name) ? 'Special' : 'Anime',
        wallpapers: []
      });
    }
    
    const currentList = charMap.get(name).wallpapers;
    if (!currentList.includes(item.secure_url)) {
      currentList.push(item.secure_url);
    }
  }

  const characters = Array.from(charMap.values()).sort((a, b) => a.name.localeCompare(b.name));

  return NextResponse.json({
    characters,
    source: 'cloudinary-live-full',
    total: all.length
  });
}
