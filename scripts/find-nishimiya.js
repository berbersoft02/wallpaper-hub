
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
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

async function findNishimiya() {
  console.log('Searching for ANY image with "Nishimiya" in the path...');
  try {
    const result = await cloudinary.search
      .expression('Nishimiya')
      .max_results(100)
      .execute();
      
    if (result.resources.length === 0) {
      console.log('❌ No images found with "Nishimiya" in their name or path.');
    } else {
      console.log(`✅ Found ${result.resources.length} images:`);
      result.resources.forEach(r => {
        console.log(`- Path: ${r.public_id} (Folder: ${r.folder})`);
      });
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

findNishimiya();
