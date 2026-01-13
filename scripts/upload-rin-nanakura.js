/**
 * Script to upload Rin Nanakura wallpapers to Cloudinary
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Load environment variables
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadCharacter() {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
  const characterFolderName = 'Rin  Nanakura'; // Note the double space
  const folderPath = path.join(wallpapersDir, characterFolderName);
  
  try {
    await fsPromises.access(folderPath);
  } catch {
    console.error(`❌ Folder "${characterFolderName}" not found!`);
    return;
  }

  console.log(`🚀 Starting upload for ${characterFolderName}...\n`);

  const files = await fsPromises.readdir(folderPath);
  
  // Filter files (images only for this character presumably, but supporting video just in case)
  const mediaFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i.test(file)
  );

  console.log(`📁 Processing: ${characterFolderName} (${mediaFiles.length} files)`);

  for (const file of mediaFiles) {
    const filePath = path.join(folderPath, file);
    
    try {
      // We want the folder in Cloudinary to probably be single spaced or just "Rin Nanakura"
      // or "rin-nanakura" depending on convention.
      // The API maps names. "Rin Nanakura" is not in the map yet.
      // If I upload to "wallpapers/Rin Nanakura", the API will read it as "Rin Nanakura".
      // Let's stick to the folder name but maybe single space for sanity in URL?
      // Actually, let's normalize it to "Rin Nanakura" (single space) for Cloudinary.
      
      const cloudFolder = `wallpapers/Rin Nanakura`;
      
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: 'auto',
        folder: cloudFolder,
        use_filename: true,
        unique_filename: false,
        overwrite: true 
      });

      console.log(`  ✅ ${file} → ${result.secure_url}`);
    } catch (error) {
      console.error(`  ❌ Error uploading ${file}:`, error.message);
    }
  }

  console.log(`\n✨ Upload process complete!`);
}

uploadCharacter().catch(console.error);
