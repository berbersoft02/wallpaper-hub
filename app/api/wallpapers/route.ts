import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// GitHub repository info
const GITHUB_REPO = 'berbersoft02/wallpaper-hub';
const GITHUB_BRANCH = 'main';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public/wallpapers`;

// In production, we don't read from filesystem to avoid including images in build
const isProduction = process.env.NODE_ENV === 'production' || process.env.NETLIFY === 'true';

export async function GET() {
  try {
    // In production, return empty array - images will be loaded from GitHub directly
    // The client-side code can fetch the list from GitHub API if needed
    if (isProduction) {
      // Return a basic structure - you can enhance this by fetching from GitHub API
      // For now, return empty and let the frontend handle it
      return NextResponse.json({ 
        characters: [],
        message: 'Wallpapers are served from GitHub Raw URLs. Use GitHub API to fetch the list.'
      });
    }

    // Development: read from local filesystem
    const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
    
    try {
      await fs.access(wallpapersDir);
    } catch {
      return NextResponse.json({ characters: [] });
    }

    const characters: { name: string; wallpapers: string[] }[] = [];
    const entries = await fs.readdir(wallpapersDir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const characterName = entry.name;
        const characterPath = path.join(wallpapersDir, characterName);
        const files = await fs.readdir(characterPath);
        
        // Filter only image files
        const imageFiles = files
          .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .map(file => `/wallpapers/${characterName}/${file}`)
          .sort();

        if (imageFiles.length > 0) {
          characters.push({
            name: characterName,
            wallpapers: imageFiles
          });
        }
      }
    }

    // Sort characters alphabetically
    characters.sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ characters });
  } catch (error) {
    console.error('Error reading wallpapers:', error);
    return NextResponse.json({ error: 'Failed to load wallpapers' }, { status: 500 });
  }
}
