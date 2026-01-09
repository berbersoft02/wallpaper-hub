import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
    
    // Check if wallpapers directory exists
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
