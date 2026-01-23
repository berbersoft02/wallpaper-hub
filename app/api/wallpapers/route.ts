import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const revalidate = 0; // Explicitly disable cache

// Configure Cloudinary
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
  'Animals',
  'Awesome',
  'Cars',
  'Live Wallpapers',
  'Mixed',
  'Pixel'
];

// Helper to Title Case names (e.g. "akane kurokawa" -> "Akane Kurokawa")
function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

// Known mappings to fix specific messy folder names
const NAME_MAPPING: Record<string, string> = {
  'rin-nanakura': 'Rin Nanakura',
  'rin-shima': 'Rin Shima',
  'shikimori': 'Shikimori', // often lowercase
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
  'Rin  Nanakura': 'Rin Nanakura', // Fix double spaces
  'Rias  Gremory': 'Rias Gremory',
  'Give some recommendations in the comments . & Follow me for more !': 'Hina Chono' // Fix that weird subfolder
};

async function loadFromJSON() {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'wallpapers.json');
    if (!fs.existsSync(filePath)) return null;
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    return {
      characters: data.characters,
      source: 'json-fallback',
      total: data.characters.reduce((acc: number, char: any) => acc + char.wallpapers.length, 0)
    };
  } catch (e) {
    console.error('JSON fallback failed:', e);
    return null;
  }
}

async function fetchAllResources(resourceType: 'image' | 'video') {
  let allResources: any[] = [];
  let nextCursor = null;
  
  try {
    do {
      // Search broadly for anything in a wallpapers folder OR just loosely matches
      const result = await cloudinary.search
        .expression(`resource_type:${resourceType} AND folder:wallpapers/*`)
        .sort_by('public_id', 'desc')
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();
        
      if (result.resources) {
        allResources = [...allResources, ...result.resources];
      }
      nextCursor = result.next_cursor;
    } while (nextCursor);
    
    return allResources;
  } catch (error) {
    console.error(`Error fetching ${resourceType}s:`, error);
    return [];
  }
}

export async function GET() {
  try {
    if (cloudName && apiKey && apiSecret) {
      const [images, videos] = await Promise.all([
        fetchAllResources('image'),
        fetchAllResources('video')
      ]);
      
      const resources = [...images, ...videos];
      const charactersMap = new Map();

      for (const resource of resources) {
        const folderPath = resource.folder || resource.asset_folder;
        let charName = '';

        if (folderPath) {
          const parts = folderPath.split('/');
          
          // Logic: Extract the most relevant folder name
          // 1. If "wallpapers/Name", use Name
          // 2. If "Name", use Name
          // 3. Ignore "wallpapers" root
          
          const wpIndex = parts.indexOf('wallpapers');
          if (wpIndex !== -1 && parts.length > wpIndex + 1) {
            charName = parts[wpIndex + 1];
          } else if (wpIndex === -1 && parts.length > 0) {
            charName = parts[parts.length - 1];
          }
        } 
        
        // Fallback to public_id parsing
        if ((!charName || charName === 'wallpapers') && resource.public_id) {
           const parts = resource.public_id.split('/');
           if (parts.length > 1 && parts[0] === 'wallpapers') {
             charName = parts[1];
           }
        }

        if (!charName || charName === 'wallpapers') continue;

        // Clean up the name
        let cleanName = charName.trim();
        
        // Fix weird subfolders like the "Give some recommendations..." one for Hina Chono
        if (cleanName.includes('Give some recommendations')) {
            cleanName = 'Hina Chono';
        }

        // Apply mapping
        if (NAME_MAPPING[cleanName]) {
          cleanName = NAME_MAPPING[cleanName];
        } else {
          // Normalize case: "cars" -> "Cars"
          // Don't mess with names that are already Title Cased correctly
          if (cleanName === cleanName.toLowerCase()) {
             cleanName = toTitleCase(cleanName);
          }
        }
        
        if (!charactersMap.has(cleanName)) {
          charactersMap.set(cleanName, {
            name: cleanName,
            category: SPECIAL_CATEGORIES.includes(cleanName) ? 'Special' : 'Anime',
            wallpapers: []
          });
        }
        
        // Avoid duplicates
        const list = charactersMap.get(cleanName).wallpapers;
        if (!list.includes(resource.secure_url)) {
          list.push(resource.secure_url);
        }
      }

      const characters = Array.from(charactersMap.values())
        .map(char => ({
          ...char,
          wallpapers: char.wallpapers.sort()
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
      
      if (characters.length > 0) {
        return NextResponse.json({
          characters,
          source: 'cloudinary-live',
          total: resources.length
        });
      }
    }
  } catch (error) {
    console.error('Cloudinary API failed, attempting fallback:', error);
  }

  const jsonData = await loadFromJSON();
  if (jsonData) {
    return NextResponse.json(jsonData);
  }

  return NextResponse.json({ 
    characters: [], 
    error: 'Failed to load wallpapers from any source' 
  }, { status: 500 });
}