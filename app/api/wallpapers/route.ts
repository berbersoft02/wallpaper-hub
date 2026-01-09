import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// GitHub repository info
const GITHUB_REPO = 'berbersoft02/wallpaper-hub';
const GITHUB_BRANCH = 'main';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public/wallpapers`;
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}/contents/public/wallpapers`;

// Check if we're in production (Netlify sets this)
const isProduction = process.env.NETLIFY === 'true' || process.env.NODE_ENV === 'production';

export async function GET() {
  try {
    // In production, fetch from GitHub API
    if (isProduction) {
      try {
        const response = await fetch(GITHUB_API_BASE, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'wallpaper-hub'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch from GitHub API');
        }
        
        const entries = await response.json();
        const characters: { name: string; wallpapers: string[] }[] = [];
        
        // Process each character directory
        for (const entry of entries) {
          if (entry.type === 'dir') {
            const characterName = entry.name;
            const dirResponse = await fetch(entry.url, {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'wallpaper-hub'
              }
            });
            
            if (dirResponse.ok) {
              const files = await dirResponse.json();
              const imageFiles = files
                .filter((file: any) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name))
                .map((file: any) => {
                  const encodedCharacter = encodeURIComponent(characterName);
                  const encodedFile = encodeURIComponent(file.name);
                  return `${GITHUB_RAW_BASE}/${encodedCharacter}/${encodedFile}`;
                })
                .sort();
              
              if (imageFiles.length > 0) {
                characters.push({
                  name: characterName,
                  wallpapers: imageFiles
                });
              }
            }
          }
        }
        
        characters.sort((a, b) => a.name.localeCompare(b.name));
        return NextResponse.json({ characters });
      } catch (error) {
        console.error('Error fetching from GitHub API:', error);
        // Fallback to empty array
        return NextResponse.json({ characters: [] });
      }
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
