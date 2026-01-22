const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'wallpapers');
const OUTPUT_FILE = path.join(process.cwd(), 'app', 'data', 'wallpapers.json');

// Cloudinary Configuration
const CLOUD_NAME = 'dg8hzm1fp';
const BASE_URL_IMAGE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/wallpapers`;
const BASE_URL_VIDEO = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/wallpapers`;

const SPECIAL_CATEGORIES = [
  'Animals',
  'Awesome',
  'Cars',
  'Live Wallpapers',
  'Mixed',
  'Pixel'
];

function getFiles(dir) {
  try {
    return fs.readdirSync(dir).filter(file => {
      return !file.startsWith('.') && (
        file.endsWith('.jpg') || 
        file.endsWith('.jpeg') || 
        file.endsWith('.png') || 
        file.endsWith('.webp') || 
        file.endsWith('.mp4') ||
        file.endsWith('.webm')
      );
    });
  } catch (e) {
    return [];
  }
}

function generate() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`Directory not found: ${PUBLIC_DIR}`);
    return;
  }

  const folders = fs.readdirSync(PUBLIC_DIR, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const characters = folders.map(folder => {
    const folderPath = path.join(PUBLIC_DIR, folder);
    const files = getFiles(folderPath);
    
    // Sort files numerically if possible
    files.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

    const wallpapers = files.map(file => {
      // Determine resource type
      const isVideo = file.endsWith('.mp4') || file.endsWith('.webm');
      const baseUrl = isVideo ? BASE_URL_VIDEO : BASE_URL_IMAGE;

      // Cloudinary usually strips file extensions for public_ids, BUT
      // the upload script used: `public_id: sanitizedFileName` (without extension?)
      // Let's check the upload script: `path.parse(file).name`.
      // So on Cloudinary, the file is "1" not "1.jpg".
      // AND `use_filename: true, unique_filename: false`.
      // Wait, if I used `path.parse(file).name`, the public_id is just the name.
      // But Cloudinary URLs often need the extension for delivery unless it's a transformation.
      // Let's assume standard format: `.../folder/filename.jpg` (Cloudinary adds extension to URL automatically if public_id doesn't have it, or you request it).
      
      // Sanitization in upload script: 
      // characterName.trim()
      // fileName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      
      const sanitizedFolder = folder.trim(); // The upload script didn't aggressive sanitize folders, just trim.
      // Wait, upload script in step 32: `const sanitizedFolderName = characterName.trim();`
      // `const sanitizedFileName = path.parse(file).name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');`
      
      // So "Animals" -> "Animals"
      // "1.jpg" -> "1"
      
      // Cloudinary URL construction:
      // BASE / folder / public_id . extension
      
      const nameWithoutExt = path.parse(file).name;
      const sanitizedFile = nameWithoutExt.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      // URL encode the folder part (spaces in URLs)
      // Cloudinary handles spaces in folders usually, but URL encoding is safe.
      const encodedFolder = encodeURIComponent(sanitizedFolder);
      
      // Re-add extension for the URL request
      const ext = path.extname(file);
      
      return `${baseUrl}/${encodedFolder}/${sanitizedFile}${ext}`;
    });

    return {
      name: folder, 
      category: SPECIAL_CATEGORIES.includes(folder) ? 'Special' : 'Anime',
      wallpapers: wallpapers
    };
  });

  characters.sort((a, b) => a.name.localeCompare(b.name));

  const data = { characters };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`Generated wallpapers.json with ${characters.length} categories/characters (Cloudinary URLs).`);
}

generate();
