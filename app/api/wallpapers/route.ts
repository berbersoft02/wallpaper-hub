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
      // Broaden search: Just get everything, we filter by folder later
      // Using 'folder:wallpapers/*' might miss items in root-level Asset Folders mapped to wallpapers
      // Let's rely on the fact that my audit found them with 'folder:wallpapers/Cars'
      // Maybe the issue was the folder string splitting?
      
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
  // 1. Try Cloudinary API (Auto-update mode)
  try {
    if (cloudName && apiKey && apiSecret) {
      const [images, videos] = await Promise.all([
        fetchAllResources('image'),
        fetchAllResources('video')
      ]);
      
      const resources = [...images, ...videos];
      const charactersMap = new Map();

      for (const resource of resources) {
        // Check ALL possible folder properties
        const folderPath = resource.folder || resource.asset_folder;
        
        let charName = '';

        if (folderPath) {
          const parts = folderPath.split('/');
          
          // Logic:
          // 1. If path is "wallpapers/Cars", take "Cars"
          // 2. If path is "Cars" (and we found it via search), take "Cars"
          // 3. If path is "wallpapers/Cars/BMW", take "Cars" (or BMW? usually top level char)
          
          // Check for 'wallpapers' prefix
          const wpIndex = parts.indexOf('wallpapers');
          if (wpIndex !== -1 && parts.length > wpIndex + 1) {
            charName = parts[wpIndex + 1];
          } else {
            // No 'wallpapers' prefix? Maybe it IS the category name (e.g. "Cars")
            // Take the last part? Or first?
            // If it's "Cars", take "Cars".
            charName = parts[parts.length - 1];
          }
        } 
        
        // Fallback: Check public_id if folder was missing/empty
        if (!charName && resource.public_id) {
           const parts = resource.public_id.split('/');
           if (parts.length > 1 && parts[0] === 'wallpapers') {
             charName = parts[1];
           }
        }

        // Final valid check
        if (!charName || charName === 'wallpapers') continue;
        
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
          source: 'cloudinary-live', 
          total: resources.length
        });
      }
    }
  } catch (error) {
    console.error('Cloudinary API failed, attempting fallback:', error);
  }

  // 2. Fallback to JSON
  const jsonData = await loadFromJSON();
  if (jsonData) {
    return NextResponse.json(jsonData);
  }

  return NextResponse.json({ 
    characters: [], 
    error: 'Failed to load wallpapers' 
  }, { status: 500 });
}
