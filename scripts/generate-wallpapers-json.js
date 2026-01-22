const fs = require('fs');
const path = require('path');

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'wallpapers');
const OUTPUT_FILE = path.join(process.cwd(), 'app', 'data', 'wallpapers.json');
// Use the raw GitHub URL structure
const BASE_URL = 'https://raw.githubusercontent.com/berbersoft02/wallpaper-hub/main/public/wallpapers';

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
    
    // Sort files numerically if possible, otherwise alphabetically
    files.sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      if (numA !== numB) return numA - numB;
      return a.localeCompare(b);
    });

    const wallpapers = files.map(file => {
      // Correctly encode folder and file names for URL
      // encodeURIComponent handles spaces, special chars, etc.
      const encodedFolder = encodeURIComponent(folder);
      const encodedFile = encodeURIComponent(file);
      return `${BASE_URL}/${encodedFolder}/${encodedFile}`;
    });

    return {
      name: folder, // Display name (can contain spaces)
      category: SPECIAL_CATEGORIES.includes(folder) ? 'Special' : 'Anime',
      wallpapers: wallpapers
    };
  });

  // Sort characters alphabetically
  characters.sort((a, b) => a.name.localeCompare(b.name));

  const data = { characters };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`Generated wallpapers.json with ${characters.length} categories/characters.`);
}

generate();