import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import wallpapersData from '@/app/data/wallpapers.json';

export const revalidate = 3600;

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  resource_type: string;
}

interface CloudinarySearchResponse {
  resources: CloudinaryResource[];
  next_cursor?: string;
}

export async function GET() {
  if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary credentials');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    // 1. Get ALL wallpapers
    let allResources: CloudinaryResource[] = [];
    let nextCursor: string | undefined = undefined;
    
    do {
      const result: CloudinarySearchResponse = await cloudinary.search
        .expression('folder:wallpapers/*')
        .sort_by('public_id', 'desc')
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();
      
      allResources = allResources.concat(result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);

    // 2. Process characters from wallpapers
    const charactersMap = new Map<string, string[]>();
    const characterCategories = new Map<string, string>();
    const characterTags = new Map<string, string[]>();

    allResources.forEach(resource => {
      const pathParts = resource.public_id.split('/');
      if (pathParts.length >= 2) {
        const charName = pathParts[1];
        if (!charactersMap.has(charName)) {
          charactersMap.set(charName, []);
        }
        charactersMap.get(charName)?.push(resource.secure_url);
      }
    });

    // Extract categories/tags from JSON to avoid complex mapping
    wallpapersData.characters.forEach(c => {
      characterCategories.set(c.name, c.category);
      characterTags.set(c.name, c.tags);
    });

    // Merge with JSON data
    const characters = Array.from(charactersMap.entries()).map(([name, wallpapers]) => {
      const jsonData = wallpapersData.characters.find(c => c.name === name);
      return {
        name,
        category: characterCategories.get(name) || jsonData?.category || 'Anime',
        tags: characterTags.get(name) || jsonData?.tags || [],
        wallpapers
      };
    });

    // 3. Get ALL PFPs
    let pfpsResources: CloudinaryResource[] = [];
    nextCursor = undefined;

    do {
      const result: CloudinarySearchResponse = await cloudinary.search
        .expression('folder:pfps/*')
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();
      
      pfpsResources = pfpsResources.concat(result.resources);
      nextCursor = result.next_cursor;
    } while (nextCursor);

    const pfpsMap = new Map<string, string[]>();
    pfpsResources.forEach(resource => {
      const pathParts = resource.public_id.split('/');
      if (pathParts.length >= 2) {
        const charName = pathParts[1];
        if (!pfpsMap.has(charName)) {
          pfpsMap.set(charName, []);
        }
        pfpsMap.get(charName)?.push(resource.secure_url);
      }
    });

    const pfps = Array.from(pfpsMap.entries()).map(([name, icons]) => ({
      name,
      icons
    }));

    // Combine for counts
    const all = [...allResources, ...pfpsResources];

    return NextResponse.json({
      characters,
      pfps,
      source: 'cloudinary-live-full',
      total: all.length,
      debug: {
        imagesFound: allResources.length,
        pfpsFound: pfpsResources.length
      }
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      }
    });

  } catch (error) {
    console.error('Cloudinary API error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
