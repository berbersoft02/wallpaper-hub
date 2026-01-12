
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

async function testSearch() {
  console.log('🔍 Testing Cloudinary Search...');

  try {
    // 1. Search for Images
    console.log('\n--- Searching for Images (folder:wallpapers/* AND resource_type:image) ---');
    const imageResult = await cloudinary.search
      .expression('folder:wallpapers/* AND resource_type:image')
      .max_results(10)
      .execute();
    
    console.log(`Found ${imageResult.resources.length} images.`);
    if (imageResult.resources.length > 0) {
        const r = imageResult.resources[0];
        console.log('Sample Image:', { public_id: r.public_id, folder: r.folder });
    }

    // 2. Search for Videos
    console.log('\n--- Searching for Videos (folder:wallpapers/* AND resource_type:video) ---');
    const videoResult = await cloudinary.search
      .expression('folder:wallpapers/* AND resource_type:video')
      .max_results(10)
      .execute();
      
    console.log(`Found ${videoResult.resources.length} videos.`);
    videoResult.resources.forEach(r => {
        console.log('Video found:', { public_id: r.public_id, folder: r.folder, format: r.format });
    });

    // 3. Test Alternative Search if 2 fails
    if (videoResult.resources.length === 0) {
        console.log('\n--- Trying Alternative Video Search (resource_type:video AND folder:wallpapers) ---');
        const altResult = await cloudinary.search
            .expression('resource_type:video AND folder:wallpapers')
            .execute();
        console.log(`Found ${altResult.resources.length} videos with alternative search.`);
    }

  } catch (error) {
    console.error('❌ Error during search:', error);
  }
}

testSearch();
