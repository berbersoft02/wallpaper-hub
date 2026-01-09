// Script to generate a static list of wallpapers
// Run this before building: node scripts/generate-wallpapers-list.js

const fs = require('fs');
const path = require('path');

const GITHUB_REPO = 'berbersoft02/wallpaper-hub';
const GITHUB_BRANCH = 'main';
const GITHUB_RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public/wallpapers`;

const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
const outputFile = path.join(process.cwd(), 'app', 'data', 'wallpapers.json');

try {
  // Check if wallpapers directory exists
  if (!fs.existsSync(wallpapersDir)) {
    console.log('Wallpapers directory not found, creating empty list');
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, JSON.stringify({ characters: [] }, null, 2));
    process.exit(0);
  }

  const characters = [];
  const entries = fs.readdirSync(wallpapersDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const characterName = entry.name;
      const characterPath = path.join(wallpapersDir, characterName);
      const files = fs.readdirSync(characterPath);
      
      // Filter only image files and use GitHub Raw URLs
      const imageFiles = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => {
          const encodedCharacter = encodeURIComponent(characterName);
          const encodedFile = encodeURIComponent(file);
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

  // Sort characters alphabetically
  characters.sort((a, b) => a.name.localeCompare(b.name));

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  
  // Write the JSON file
  fs.writeFileSync(outputFile, JSON.stringify({ characters }, null, 2));
  
  console.log(`✅ Generated wallpapers list with ${characters.length} characters`);
  console.log(`   Total wallpapers: ${characters.reduce((sum, char) => sum + char.wallpapers.length, 0)}`);
} catch (error) {
  console.error('Error generating wallpapers list:', error);
  process.exit(1);
}
