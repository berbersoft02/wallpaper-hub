const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

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

async function uploadAllWallpapers() {
  const wallpapersDir = path.join(process.cwd(), 'public', 'wallpapers');
  const entries = await fsPromises.readdir(wallpapersDir, { withFileTypes: true });
  const characterFolders = entries.filter(entry => entry.isDirectory());

  for (const entry of characterFolders) {
    const characterName = entry.name;
    const characterPath = path.join(wallpapersDir, characterName);
    const files = await fsPromises.readdir(characterPath);
    const mediaFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp|mp4|webm)$/i.test(file));

    for (const file of mediaFiles) {
      const filePath = path.join(characterPath, file);
      const isVideo = /\.(mp4|webm)$/i.test(file);
      try {
        const sanitizedFolderName = characterName.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').toLowerCase();
        const sanitizedFileName = path.parse(file).name.replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
        
        const result = await cloudinary.uploader.upload(filePath, {
          folder: `wallpapers/${sanitizedFolderName}`,
          public_id: sanitizedFileName,
          overwrite: false,
          resource_type: isVideo ? 'video' : 'image',
        });
        if (result.existing) {
          // Skip logging existing files for brevity
        } else {
          console.log(`✅ Uploaded: ${characterName}/${file}`);
        }
      } catch (error) {}
    }
  }
}

uploadAllWallpapers().catch(console.error);
