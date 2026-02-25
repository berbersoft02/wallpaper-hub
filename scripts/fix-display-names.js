const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function updateDisplayNames() {
  console.log("🔄 Updating Display Names (Titles) on Cloudinary to match numbered IDs...");
  try {
    const res = await cloudinary.api.resources({ 
      type: 'upload', 
      prefix: 'wallpapers/', 
      max_results: 1000 
    });

    for (const resource of res.resources) {
      const publicId = resource.public_id;
      // Get the filename without folder (e.g., "1" from "wallpapers/Naruto/1")
      const parts = publicId.split('/');
      const fileName = parts[parts.length - 1];

      // Only update if it's one of our numbered files
      if (/^\d+$/.test(fileName)) {
        await cloudinary.api.update(publicId, {
          display_name: fileName
        });
        console.log(`✅ Updated Title: ${publicId} -> ${fileName}`);
      }
    }
    console.log("✨ All display names updated.");
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

updateDisplayNames();
