import { NextResponse } from 'next/server';
import wallpapersData from '@/app/data/wallpapers.json';

export async function GET() {
  try {
    return NextResponse.json(wallpapersData);
  } catch (error) {
    console.error('Error serving wallpapers data:', error);
    return NextResponse.json({ error: 'Failed to load wallpapers' }, { status: 500 });
  }
}
