import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';
import path from 'path';

// Helper function to load wallpapers from local files
async function loadLocalFiles() {
  try {
    // In Next.js, public folder is served from project root
    // Try multiple possible paths
    const possiblePaths = [
      path.join(process.cwd(), 'public', 'wallpapers'),
      path.join(process.cwd(), 'wallpaper-hub', 'public', 'wallpapers'),
      path.resolve('./public/wallpapers'),
    ];
    
    let wallpapersDir = '';
    for (const testPath of possiblePaths) {
      try {
        await fs.access(testPath);
        wallpapersDir = testPath;
        console.log('Found wallpapers directory at:', wallpapersDir);
        break;
      } catch {
        // Try next path
      }
    }
    
    if (!wallpapersDir) {
      console.error('Wallpapers directory not found in any of:', possiblePaths);
      return NextResponse.json({ 
        characters: [], 
        error: 'Wallpapers directory not found',
        details: `Tried: ${possiblePaths.join(', ')}`
      });
    }
    
    const characters: { name: string; wallpapers: string[] }[] = [];
    const entries = await fs.readdir(wallpapersDir, { withFileTypes: true });

    console.log(`Found ${entries.length} entries in wallpapers directory`);

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const characterName = entry.name;
        const characterPath = path.join(wallpapersDir, characterName);
        
        try {
          const files = await fs.readdir(characterPath);
          
          const imageFiles = files
            .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map(file => `/wallpapers/${encodeURIComponent(characterName)}/${encodeURIComponent(file)}`)
            .sort();

          if (imageFiles.length > 0) {
            characters.push({
              name: characterName,
              wallpapers: imageFiles
            });
            console.log(`Added ${characterName}: ${imageFiles.length} images`);
          }
        } catch (dirError) {
          console.error(`Error reading directory ${characterName}:`, dirError);
        }
      }
    }

    characters.sort((a, b) => a.name.localeCompare(b.name));
    console.log(`Total characters loaded: ${characters.length}`);
    return NextResponse.json({ characters, source: 'local' });
  } catch (error) {
    console.error('Error loading local files:', error);
    return NextResponse.json({ 
      characters: [], 
      error: 'Failed to load local files',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// Configure Cloudinary - Next.js automatically loads .env.local
// Make sure .env.local is in the project root (not in public/)
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

export async function GET() {
  try {
    // Debug: Log environment variables (only in development)
    if (process.env.NODE_ENV === 'development') {
      console.log('Cloudinary Config Check:', {
        hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
        hasApiKey: !!process.env.CLOUDINARY_API_KEY,
        hasApiSecret: !!process.env.CLOUDINARY_API_SECRET,
      });
    }
    
    // Check if Cloudinary is configured
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      // Fallback to local files if Cloudinary is not configured (for local dev)
      if (process.env.NODE_ENV === 'development') {
        console.log('Using local files (Cloudinary not configured - local dev)');
        return loadLocalFiles();
      } else {
        // On production (Netlify), return error if Cloudinary is not configured
        return NextResponse.json({ 
          characters: [], 
          error: 'Cloudinary not configured',
          message: 'Please configure Cloudinary environment variables on Netlify. See CONFIGURER_NETLIFY_MAINTENANT.md'
        });
      }
    }

    try {
      // List all resources in the 'wallpapers' folder
      console.log('Searching Cloudinary for wallpapers...');
      console.log('Cloudinary config:', {
        cloud_name: cloudName,
        has_api_key: !!apiKey,
        has_api_secret: !!apiSecret
      });
      
      // Try different search expressions
      let result;
      try {
        // First try: search in wallpapers folder
        result = await cloudinary.search
          .expression('folder:wallpapers/*')
          .max_results(500)
          .execute();
        console.log(`Search 'folder:wallpapers/*' returned ${result.resources?.length || 0} resources`);
      } catch (searchError: any) {
        console.error('First search failed:', searchError);
        // Try alternative: search all resources with wallpapers in path
        try {
          result = await cloudinary.search
            .expression('resource_type:image AND folder:wallpapers')
            .max_results(500)
            .execute();
          console.log(`Alternative search returned ${result.resources?.length || 0} resources`);
        } catch (altError: any) {
          console.error('Alternative search also failed:', altError);
          throw searchError; // Throw original error
        }
      }
      
      if (!result || !result.resources) {
        console.error('Cloudinary search returned invalid result:', result);
        throw new Error('Invalid search result from Cloudinary');
      }
      
      console.log(`Cloudinary search returned ${result.resources.length} resources`);

      // Organize by character (folder name)
      const charactersMap = new Map<string, string[]>();
      
      // Map sanitized folder names to original character names
      // Note: Cloudinary folder names might have spaces or special characters
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
        // Also handle folder names with spaces (as they appear in Cloudinary)
        'hina chono': '♡ Hina Chono',
        'akane kurokawa': 'Akane Kurokawa',
        'alya kujou': 'Alya Kujou',
        'maria kujou': 'Maria kujou',
        'marin kitagawa': 'Marin kitagawa',
        'nakano nino': 'Nakano Nino',
        'yuzuki nanase': 'Yuzuki Nanase',
        'zero two': 'Zero Two',
      };

      if (result.resources && result.resources.length > 0) {
        console.log('Sample resource:', {
          public_id: result.resources[0]?.public_id,
          folder: result.resources[0]?.folder,
          resource_type: result.resources[0]?.resource_type
        });
        
        result.resources.forEach((resource: any) => {
          // Extract folder name (character name) from the path
          // Path format: "wallpapers/character-name/image.jpg" or "wallpapers/character name/image.jpg"
          const pathParts = resource.folder?.split('/') || [];
          
          if (pathParts.length >= 2) {
            // Get the folder name from Cloudinary (might have spaces or special chars)
            const folderName = pathParts[1];
            
            // Try to map the folder name to the original character name
            // First try exact match, then try lowercase with spaces/dashes normalized
            const normalizedFolderName = folderName.toLowerCase().replace(/\s+/g, '-');
            const characterName = nameMapping[folderName] || 
                                  nameMapping[normalizedFolderName] ||
                                  folderName; // Use folder name as-is if no mapping found
            
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
          } else {
            console.warn('Unexpected resource folder structure:', {
              folder: resource.folder,
              public_id: resource.public_id
            });
          }
        });
        
        console.log(`Processed ${result.resources.length} resources into ${charactersMap.size} characters`);
        console.log('Character names found:', Array.from(charactersMap.keys()));
      } else {
        console.warn('Cloudinary search returned no resources');
        console.log('Trying alternative methods...');
        
        // Try method 1: List all resources and filter
        try {
          const allResources = await cloudinary.search
            .expression('resource_type:image')
            .max_results(1000)
            .execute();
          
          const wallpapersResources = allResources.resources?.filter((r: any) => 
            r.folder?.startsWith('wallpapers/')
          ) || [];
          
          console.log(`Found ${wallpapersResources.length} resources in wallpapers folder via alternative method`);
          
          if (wallpapersResources.length > 0) {
            // Process these resources
            wallpapersResources.forEach((resource: any) => {
              const pathParts = resource.folder?.split('/') || [];
              if (pathParts.length >= 2) {
                const folderName = pathParts[1];
                const normalizedFolderName = folderName.toLowerCase().replace(/\s+/g, '-');
                const characterName = nameMapping[folderName] || 
                                      nameMapping[normalizedFolderName] ||
                                      folderName;
                
                if (!charactersMap.has(characterName)) {
                  charactersMap.set(characterName, []);
                }
                
                const imageUrl = cloudinary.url(resource.public_id, {
                  secure: true,
                  format: 'auto',
                  quality: 'auto',
                });
                
                charactersMap.get(characterName)!.push(imageUrl);
              }
            });
            
            const characters = Array.from(charactersMap.entries())
              .map(([name, wallpapers]) => ({
                name,
                wallpapers: wallpapers.sort(),
              }))
              .sort((a, b) => a.name.localeCompare(b.name));
            
            if (characters.length > 0) {
              console.log(`Successfully loaded ${characters.length} characters via alternative method`);
              return NextResponse.json({ characters, source: 'cloudinary' });
            }
          }
        } catch (altError: any) {
          console.error('Alternative method also failed:', altError);
        }
        
        // Try method 2: List sub-folders
        try {
          const foldersResult = await cloudinary.api.sub_folders('wallpapers');
          console.log('Sub-folders in wallpapers:', foldersResult);
        } catch (folderError) {
          console.error('Failed to list sub-folders:', folderError);
        }
      }

      // Convert map to array format
      const characters = Array.from(charactersMap.entries())
        .map(([name, wallpapers]) => ({
          name,
          wallpapers: wallpapers.sort(),
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      if (characters.length === 0) {
        console.warn('Cloudinary search returned no results');
        return NextResponse.json({ 
          characters: [], 
          error: 'No wallpapers found in Cloudinary',
          message: 'Please verify that images are uploaded to Cloudinary in the wallpapers/ folder'
        });
      }

      console.log(`Successfully loaded ${characters.length} characters from Cloudinary`);
      return NextResponse.json({ characters, source: 'cloudinary' });
    } catch (cloudinaryError: any) {
      console.error('Cloudinary error:', cloudinaryError);
      
      // Fallback to local files if Cloudinary fails
      try {
        const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
        await fs.access(wallpapersDir);
        
        const characters: { name: string; wallpapers: string[] }[] = [];
        const entries = await fs.readdir(wallpapersDir, { withFileTypes: true });

        for (const entry of entries) {
          if (entry.isDirectory()) {
            const characterName = entry.name;
            const characterPath = path.join(wallpapersDir, characterName);
            const files = await fs.readdir(characterPath);
            
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

        characters.sort((a, b) => a.name.localeCompare(b.name));
        
        console.log('Using local files as fallback');
        return NextResponse.json({ 
          characters,
          source: 'local',
          cloudinaryError: cloudinaryError.message 
        });
      } catch (localError) {
        console.error('Local files also failed:', localError);
        return NextResponse.json({ 
          characters: [], 
          error: 'Failed to load from Cloudinary and local files',
          details: cloudinaryError.message 
        });
      }
    }
  } catch (error) {
    console.error('Error loading wallpapers:', error);
    return NextResponse.json({ 
      error: 'Failed to load wallpapers' 
    }, { status: 500 });
  }
}
