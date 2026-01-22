import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

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

// Map folder names to clean display names if needed
const SPECIAL_CATEGORIES = [
  'Animals',
  'Awesome',
  'Cars',
  'Live Wallpapers',
  'Mixed',
  'Pixel'
];

export async function GET() {
  try {
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json({ 
        error: 'Cloudinary not configured' 
      }, { status: 500 });
    }

    // Search for all resources in wallpapers folder
    const result = await cloudinary.search
      .expression('folder:wallpapers/*')
      .sort_by('public_id', 'desc')
      .max_results(500) // Adjust if >500 images, might need pagination or multiple queries
      .execute();

    const resources = result.resources || [];
    
    // Group by folder
    const charactersMap = new Map();

    for (const resource of resources) {
      // public_id: wallpapers/FolderName/FileName
      // folder: wallpapers/FolderName
      
      const folderPath = resource.folder;
      if (!folderPath) continue;
      
      // Extract character name from folder path
      // e.g. "wallpapers/Akane Kurokawa" -> "Akane Kurokawa"
      const parts = folderPath.split('/');
      if (parts.length < 2) continue;
      
      const charName = parts[1]; // The character/category name
      
      if (!charactersMap.has(charName)) {
        charactersMap.set(charName, {
          name: charName,
          category: SPECIAL_CATEGORIES.includes(charName) ? 'Special' : 'Anime',
          wallpapers: []
        });
      }

      // Generate secure URL
      // Use resource.secure_url directly or construct it
      charactersMap.get(charName).wallpapers.push(resource.secure_url);
    }

    // Convert map to array
    const characters = Array.from(charactersMap.values()).sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({
      characters,
      source: 'cloudinary-dynamic',
      total: resources.length
    });

  } catch (error) {
    console.error('Error fetching from Cloudinary:', error);
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 });
  }
}
