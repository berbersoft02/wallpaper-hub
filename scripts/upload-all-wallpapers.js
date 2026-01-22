/**
 * Script to upload ALL wallpapers from public/wallpapers to Cloudinary
 * 
 * Usage: node scripts/upload-all-wallpapers.js
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

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadAllImages() {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
  
  try {
    await fsPromises.access(wallpapersDir);
  } catch {
    console.error('❌ Wallpapers directory not found!');
    return;
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Cloudinary not configured! Check .env.local');
    return;
  }

  console.log('🚀 Starting bulk upload to Cloudinary...\n');

  const entries = await fsPromises.readdir(wallpapersDir, { withFileTypes: true });
  let totalUploaded = 0;
  let totalSkipped = 0;
  let totalFailed = 0;

  // Process all directories
  const folders = entries.filter(entry => entry.isDirectory());

  for (const folder of folders) {
    const characterName = folder.name;
    const characterPath = path.join(wallpapersDir, characterName);
    const files = await fsPromises.readdir(characterPath);
    
    // Filter image and video files
    const mediaFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i.test(file)
    );

    console.log(`📁 Processing: ${characterName} (${mediaFiles.length} files)`);

    for (const file of mediaFiles) {
      const filePath = path.join(characterPath, file);
      const isVideo = /\.(mp4|webm)$/i.test(file);
      
      try {
        // Sanitize folder name
        // Keep original casing or specific format if needed, but usually lowercase is safer for URLs
        // We will try to preserve the folder name as much as possible but make it URL safe
        const sanitizedFolderName = characterName
          //.replace(/[^\]w\s-]/g, '') 
          .trim();
        
        // Sanitize file name
        const sanitizedFileName = path.parse(file).name
          .replace(/[^\]w\s-]/g, '')
          .replace(/\s+/g, '-');
        
        // Upload to Cloudinary
        // We use 'overwrite: false' to avoid re-uploading existing files
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `wallpapers/${sanitizedFolderName}`,
          public_id: sanitizedFileName,
          overwrite: false, 
          resource_type: isVideo ? 'video' : 'image',
          use_filename: true,
          unique_filename: false
        });

        // Check if it was an existing file (result.existing = true usually, or we check if we got a new version)
        // Cloudinary response might not explicitly say "skipped", but if we set overwrite: false, 
        // it returns the existing resource.
        
        console.log(`  ✅ ${file} → Uploaded/Verified`);
        totalUploaded++;
      } catch (error) {
        console.error(`  ❌ Error uploading ${file}:`, error.message);
        totalFailed++;
      }
    }
  }

  console.log(`\n✨ Bulk upload complete!`);
  console.log(`   ✅ Processed: ${totalUploaded}`);
  console.log(`   ❌ Errors: ${totalFailed}`);
}

uploadAllImages().catch(console.error);
