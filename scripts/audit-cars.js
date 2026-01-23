const cloudinary = require('cloudinary').v2;

try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function listCars() {
  console.log('🔍 auditing "Cars" folder...');
  try {
    const result = await cloudinary.search
      .expression('folder:"wallpapers/Cars"') // Quotes for safety
      .max_results(100)
      .execute();

    console.log(`Found ${result.total_count} items in Cars.`);
    
    result.resources.forEach((r, i) => {
      console.log(`${i+1}. [${r.public_id}] -> ${r.secure_url}`);
    });

  } catch (e) {
    console.error(e);
  }
}

listCars();
