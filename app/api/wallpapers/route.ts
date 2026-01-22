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

export async function GET() {
  // 1. Try Cloudinary API
  try {
    if (cloudName && apiKey && apiSecret) {
      const result = await cloudinary.search
        .expression('folder:wallpapers/*')
        .sort_by('public_id', 'desc')
        .max_results(500)
        .execute();

      const resources = result.resources || [];
      const charactersMap = new Map();

      for (const resource of resources) {
        const folderPath = resource.folder;
        if (!folderPath) continue;
        
        const parts = folderPath.split('/');
        if (parts.length < 2) continue;
        
        const charName = parts[1];
        
        if (!charactersMap.has(charName)) {
          charactersMap.set(charName, {
            name: charName,
            category: SPECIAL_CATEGORIES.includes(charName) ? 'Special' : 'Anime',
            wallpapers: []
          });
        }
        charactersMap.get(charName).wallpapers.push(resource.secure_url);
      }

      const characters = Array.from(charactersMap.values()).sort((a, b) => a.name.localeCompare(b.name));
      
      // If Cloudinary returns empty (e.g. search issue), try JSON
      if (characters.length > 0) {
        return NextResponse.json({
          characters,
          source: 'cloudinary-dynamic',
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

  // 3. Absolute failure
  return NextResponse.json({ 
    characters: [], 
    error: 'Failed to load wallpapers from any source' 
  }, { status: 500 });
}