
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

async function checkCloudinary() {
  console.log('Checking Cloudinary contents...');
  
  try {
    const result = await cloudinary.search
      .expression('folder:wallpapers/*')
      .max_results(500)
      .execute();
      
    console.log(`Found ${result.resources.length} resources.`);
    
    const folders = new Set();
    result.resources.forEach(r => {
      const parts = r.public_id.split('/');
      if (parts.length > 1) {
        folders.add(parts[1]);
      }
    });
    
    console.log('Folders found:', Array.from(folders));
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkCloudinary();
