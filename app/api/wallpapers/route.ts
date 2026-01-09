import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// In production, use the static JSON file generated at build time
// In development, read from filesystem
const isProduction = process.env.NETLIFY === 'true' || process.env.NODE_ENV === 'production';

export async function GET() {
  try {
    if (isProduction) {
      // In production, read from the static JSON file
      const wallpapersFile = path.join(process.cwd(), 'app', 'data', 'wallpapers.json');
      try {
        const fileContent = await fs.readFile(wallpapersFile, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
      } catch (error) {
        console.error('Error reading wallpapers.json:', error);
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
