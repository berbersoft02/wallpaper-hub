/**
 * Script pour nettoyer l'ancien dossier Cloudinary 'Chisato Nishikigi'
 * et ne garder que 'chisato-nishikigi'
 */

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
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

async function cleanupChisato() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ Cloudinary non configuré!');
    return;
  }

  const oldFolder = 'wallpapers/Chisato Nishikigi';
  
  console.log(`🔍 Vérification et nettoyage du dossier: ${oldFolder}`);

  try {
    // 1. Delete all resources in the folder
    console.log('   Suppression des images...');
    await cloudinary.api.delete_resources_by_prefix(oldFolder);
    
    // 2. Delete the folder itself
    console.log('   Suppression du dossier vide...');
    await cloudinary.api.delete_folder(oldFolder);
    
    console.log(`✅ Dossier '${oldFolder}' supprimé avec succès.`);
    console.log('   Les images sont maintenant servies uniquement depuis wallpapers/chisato-nishikigi');
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    if (error.error && error.error.message) {
        console.error('   Détail:', error.error.message);
    }
  }
}

cleanupChisato();
