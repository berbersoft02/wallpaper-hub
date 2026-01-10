/**
 * Script pour uploader spécifiquement les images de Rin Shima
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

async function uploadRinShimaImages() {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
  const characterName = 'Rin Shima';
  const characterPath = path.join(wallpapersDir, characterName);
  
  try {
    await fsPromises.access(characterPath);
  } catch {
    console.error('❌ Dossier "Rin Shima" introuvable!');
    console.log('Assure-toi que le dossier existe dans: public/wallpapers/Rin Shima');
    return;
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Cloudinary non configuré!');
    console.log('Configure .env.local avec tes identifiants Cloudinary');
    return;
  }

  console.log(`🚀 Upload des images de ${characterName}...\n`);

  const files = await fsPromises.readdir(characterPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  console.log(`📁 ${imageFiles.length} images trouvées\n`);

  let totalUploaded = 0;
  let totalFailed = 0;

  // Sanitize folder name for Cloudinary
  const sanitizedFolderName = 'rin-shima'; // Use a simple, valid name

  for (const file of imageFiles) {
    const filePath = path.join(characterPath, file);
    
    try {
      // Sanitize file name
      const sanitizedFileName = path.parse(file).name
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/\(/g, '')
        .replace(/\)/g, '');
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `wallpapers/${sanitizedFolderName}`,
        public_id: sanitizedFileName,
        overwrite: true, // Overwrite if exists
        resource_type: 'image',
      });

      console.log(`  ✅ ${file} → ${result.secure_url}`);
      totalUploaded++;
    } catch (error) {
      console.error(`  ❌ Erreur pour ${file}:`, error.message);
      totalFailed++;
    }
  }

  console.log(`\n✨ Upload terminé!`);
  console.log(`   ✅ Réussis: ${totalUploaded}`);
  console.log(`   ❌ Échoués: ${totalFailed}`);
  
  if (totalUploaded > 0) {
    console.log(`\n🎉 ${totalUploaded} images de Rin Shima ont été uploadées sur Cloudinary!`);
    console.log('Redéploie ton site pour voir les nouvelles images.');
  }
}

uploadRinShimaImages().catch(console.error);
