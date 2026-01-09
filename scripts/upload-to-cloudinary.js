/**
 * Script pour uploader les images locales vers Cloudinary
 * 
 * Usage: node scripts/upload-to-cloudinary.js
 * 
 * Prérequis:
 * 1. Installer cloudinary: npm install cloudinary
 * 2. Configurer .env.local avec tes identifiants Cloudinary
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

// Load environment variables
// Read .env.local manually if dotenv is not available
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

async function uploadImages() {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
  
  try {
    // Check if wallpapers directory exists
    await fsPromises.access(wallpapersDir);
  } catch {
    console.error('❌ Dossier wallpapers introuvable!');
    return;
  }

  // Check Cloudinary config
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Cloudinary non configuré! Configure .env.local');
    return;
  }

  console.log('🚀 Début de l\'upload vers Cloudinary...\n');

  const entries = await fsPromises.readdir(wallpapersDir, { withFileTypes: true });
  let totalUploaded = 0;
  let totalFailed = 0;

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const characterName = entry.name;
      const characterPath = path.join(wallpapersDir, characterName);
      const files = await fsPromises.readdir(characterPath);
      
      // Filter only image files
      const imageFiles = files.filter(file => 
        /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
      );

      console.log(`📁 Personnage: ${characterName} (${imageFiles.length} images)`);

      for (const file of imageFiles) {
        const filePath = path.join(characterPath, file);
        
        try {
          // Sanitize folder name for Cloudinary (remove special characters)
          // Cloudinary doesn't accept certain special characters in folder names
          const sanitizedFolderName = characterName
            .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .toLowerCase();
          
          // Sanitize file name for public_id
          const sanitizedFileName = path.parse(file).name
            .replace(/[^\w\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-'); // Replace spaces with hyphens
          
          // Upload to Cloudinary
          // Folder structure: wallpapers/character-name/image.jpg
          const result = await cloudinary.uploader.upload(filePath, {
            folder: `wallpapers/${sanitizedFolderName}`,
            public_id: sanitizedFileName,
            overwrite: false, // Don't overwrite if exists
            resource_type: 'image',
          });

          console.log(`  ✅ ${file} → ${result.secure_url}`);
          totalUploaded++;
        } catch (error) {
          console.error(`  ❌ Erreur pour ${file}:`, error.message);
          totalFailed++;
        }
      }
    }
  }

  console.log(`\n✨ Upload terminé!`);
  console.log(`   ✅ Réussis: ${totalUploaded}`);
  console.log(`   ❌ Échoués: ${totalFailed}`);
}

uploadImages().catch(console.error);
