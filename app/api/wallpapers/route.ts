import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'wallpapers.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json({
      characters: data.characters,
      source: 'json',
      total: data.characters.reduce((acc: number, char: any) => acc + char.wallpapers.length, 0)
    });
  } catch (error) {
    console.error('Error reading wallpapers data:', error);
    return NextResponse.json({ characters: [], error: 'Failed to load data' }, { status: 500 });
  }
}