import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export async function GET() {
  try {
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      // Fallback to local files if Cloudinary is not configured
      return NextResponse.json({ characters: [], message: 'Cloudinary not configured' });
    }

    try {
      // List all resources in the 'wallpapers' folder
      const result = await cloudinary.search
        .expression('folder:wallpapers/*')
        .max_results(500)
        .execute();

      // Organize by character (folder name)
      const charactersMap = new Map<string, string[]>();
      
      // Map sanitized folder names to original character names
      const nameMapping: Record<string, string> = {
        'shiina-mahiru': '𝑆ℎ𝑖𝑖𝑛𝑎 𝑀𝑎ℎ𝑖𝑟𝑢',
        'akane-kurokawa': 'Akane Kurokawa',
        'alya-kujou': 'Alya Kujou',
        'chinatsu': 'Chinatsu',
        'elaina': 'Elaina',
        'hushino': 'Hushino',
        'kaoruko-waguri': 'Kaoruko waguri',
        'mai': 'Mai',
        'maria-kujou': 'Maria kujou',
        'marin-kitagawa': 'Marin kitagawa',
        'nakano-nino': 'Nakano Nino',
        'shikimori': 'shikimori',
        'yuzuki-nanase': 'Yuzuki Nanase',
        'zero-two': 'Zero Two',
        'hina-chono': '♡ Hina Chono',
      };

      if (result.resources && result.resources.length > 0) {
        result.resources.forEach((resource: any) => {
          // Extract folder name (character name) from the path
          // Path format: "wallpapers/character-name/image.jpg"
          const pathParts = resource.folder?.split('/') || [];
          if (pathParts.length >= 2) {
            // Get the sanitized folder name from Cloudinary
            const sanitizedFolderName = pathParts[1];
            
            // Map sanitized name back to original name, or format it nicely
            const characterName = nameMapping[sanitizedFolderName] || 
              sanitizedFolderName
                .replace(/-/g, ' ')
                .split(' ')
                .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
            
            if (!charactersMap.has(characterName)) {
              charactersMap.set(characterName, []);
            }
            
            // Get the optimized URL
            const imageUrl = cloudinary.url(resource.public_id, {
              secure: true,
              format: 'auto',
              quality: 'auto',
            });
            
            charactersMap.get(characterName)!.push(imageUrl);
          }
        });
      }

      // Convert map to array format
      const characters = Array.from(charactersMap.entries())
        .map(([name, wallpapers]) => ({
          name,
          wallpapers: wallpapers.sort(),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      return NextResponse.json({ characters });
    } catch (cloudinaryError: any) {
      console.error('Cloudinary error:', cloudinaryError);
      // Fallback to empty result
      return NextResponse.json({ 
        characters: [], 
        error: 'Failed to load from Cloudinary',
        details: cloudinaryError.message 
      });
    }
  } catch (error) {
    console.error('Error loading wallpapers:', error);
    return NextResponse.json({ 
      error: 'Failed to load wallpapers' 
    }, { status: 500 });
  }
}
