/**
 * Script pour uploader les images mises à jour de Chisato Nishikigi
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

async function uploadChisatoImages() {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
  const characterName = 'Chisato Nishikigi';
  const characterPath = path.join(wallpapersDir, characterName);
  
  try {
    await fsPromises.access(characterPath);
  } catch {
    console.error('❌ Dossier introuvable!');
    return;
  }

  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Cloudinary non configuré!');
    return;
  }

  console.log(`🚀 Upload des images de ${characterName}...
`);

  const files = await fsPromises.readdir(characterPath);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  console.log(`📁 ${imageFiles.length} images trouvées
`);

  let totalUploaded = 0;
  let totalFailed = 0;

  // Sanitize folder name for Cloudinary
  // Keeping consistency with existing naming if possible, but the route mapping handles 'chisato-nishikigi'
  const sanitizedFolderName = 'chisato-nishikigi';

  for (const file of imageFiles) {
    const filePath = path.join(characterPath, file);
    
    try {
      // Sanitize file name - being careful with parentheses
      const sanitizedFileName = path.parse(file).name
        .replace(/[^w\w -]/g, '') // Remove special chars (including parens for safety, though keeping them might be desired if we want exact match with local) 
        .replace(/\s+/g, '-')
        .replace(/\(/g, '')
        .replace(/\)/g, '');
      
      // OR, to better match the local filenames like "1(1)", maybe we should keep the unique identifier part
      // But Cloudinary public_ids are cleaner without parens.
      // Let's stick to a safe sanitization. If "1(1).jpg" becomes "11", it might conflict with "11.jpg".
      // Let's verify how "1(1)" is typically handled.
      // A safer approach:
       const saferSanitizedFileName = file.replace(/\.[^/.]+$/, "") // remove extension
                                         .replace(/\s+/g, '-')
                                         .replace(/\(/g, '-')
                                         .replace(/\)/g, '')
                                         .replace(/--/g, '-');

      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filePath, {
        folder: `wallpapers/${sanitizedFolderName}`,
        public_id: saferSanitizedFileName,
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

  console.log(`
✨ Upload terminé!`);
  console.log(`   ✅ Réussis: ${totalUploaded}`);
  console.log(`   ❌ Échoués: ${totalFailed}`);
}

uploadChisatoImages().catch(console.error);
