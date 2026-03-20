const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function findAnna() {
  console.log('🔍 Searching Cloudinary for Anna Yanami...');
  try {
    const result = await cloudinary.search
      .expression('Anna OR Yanami OR Makeine')
      .max_results(50)
      .execute();

    console.log(`Found ${result.resources.length} resources.`);
    result.resources.forEach(r => {
      console.log(`- [${r.resource_type}] ${r.public_id} (Folder: ${r.folder})`);
    });
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

findAnna();
