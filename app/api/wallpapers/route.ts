import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

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

// Function to fetch all resources with pagination
async function fetchAllResources(resourceType: 'image' | 'video') {
  let allResources: any[] = [];
  let nextCursor = null;
  
  try {
    do {
      const result = await cloudinary.search
        .expression(`folder:wallpapers/* AND resource_type:${resourceType}`)
        .sort_by('public_id', 'desc')
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();
        
      if (result.resources) {
        allResources = [...allResources, ...result.resources];
      }
      nextCursor = result.next_cursor;
    } while (nextCursor); // Keep fetching until no more results
    
    return allResources;
  } catch (error) {
    console.error(`Error fetching ${resourceType}s:`, error);
    return [];
  }
}

export async function GET() {
  // 1. Try Cloudinary API (Auto-update mode)
  try {
    if (cloudName && apiKey && apiSecret) {
      // Fetch images AND videos in parallel
      const [images, videos] = await Promise.all([
        fetchAllResources('image'),
        fetchAllResources('video')
      ]);
      
      const resources = [...images, ...videos];
      const charactersMap = new Map();

      for (const resource of resources) {
        const folderPath = resource.folder;
        if (!folderPath) continue;
        
        const parts = folderPath.split('/');
        // Handle "wallpapers/Category" structure
        if (parts.length < 2) continue; 
        
        const charName = parts[1]; // e.g. "Cars"
        
        if (!charactersMap.has(charName)) {
          charactersMap.set(charName, {
            name: charName,
            category: SPECIAL_CATEGORIES.includes(charName) ? 'Special' : 'Anime',
            wallpapers: []
          });
        }
        charactersMap.get(charName).wallpapers.push(resource.secure_url);
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
          source: 'cloudinary-live', // Indicates live data
          total: resources.length
        });
      }
    }
  } catch (error) {
    console.error('Cloudinary API failed, attempting fallback:', error);
  }

  // 2. Fallback to JSON (Manual update mode)
  const jsonData = await loadFromJSON();
  if (jsonData) {
    return NextResponse.json(jsonData);
  }

  return NextResponse.json({ 
    characters: [], 
    error: 'Failed to load wallpapers from any source' 
  }, { status: 500 });
}
