/**
 * Script to upload Mixed and Live Wallpapers to Cloudinary
 * 
 * Usage: node scripts/upload-new-sections.js
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Load environment variables
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // Fallback: read .env.local manually
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

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadNewSections() {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
  
  // Folders to process
  const targetFolders = ['Mixed', 'Live Wallpapers'];

  // Check Cloudinary config
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Cloudinary not configured! Check .env.local');
    return;
  }

  console.log('🚀 Starting upload for Mixed and Live Wallpapers...\n');

  for (const folderName of targetFolders) {
    const folderPath = path.join(wallpapersDir, folderName);
    
    try {
      await fsPromises.access(folderPath);
    } catch {
      console.log(`⚠️ Folder ${folderName} does not exist locally. Skipping.`);
      continue;
    }

    const files = await fsPromises.readdir(folderPath);
    
    // Filter files (images and videos)
    const mediaFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i.test(file)
    );

    console.log(`📁 Processing: ${folderName} (${mediaFiles.length} files)`);

    if (mediaFiles.length === 0) {
      console.log(`   (No files found to upload in ${folderName})`);
    }

    for (const file of mediaFiles) {
      const filePath = path.join(folderPath, file);
      const isVideo = /\.(mp4|webm)$/i.test(file);
      
      try {
        // Keep folder name exactly as is for these special sections
        // Cloudinary folder: wallpapers/Mixed or wallpapers/Live Wallpapers
        const cloudFolder = `wallpapers/${folderName}`;
        
        const result = await cloudinary.uploader.upload(filePath, {
          folder: cloudFolder,
          resource_type: isVideo ? 'video' : 'image',
          use_filename: true,
          unique_filename: false,
          overwrite: true 
        });

        console.log(`  ✅ ${file} → ${result.secure_url}`);
      } catch (error) {
        console.error(`  ❌ Error uploading ${file}:`, error.message);
      }
    }
  }

  console.log(`\n✨ Upload process complete!`);
}

uploadNewSections().catch(console.error);
