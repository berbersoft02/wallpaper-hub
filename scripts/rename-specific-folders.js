const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function renameFilesInFolder(folder) {
  console.log(`\n📁 Processing folder: ${folder}`);
  let resources = [];
  let nextCursor = null;

  try {
    do {
      const result = await cloudinary.search
        .expression(`folder:"${folder}" AND resource_type:image`)
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();
      resources = [...resources, ...(result.resources || [])];
      nextCursor = result.next_cursor;
    } while (nextCursor);

    if (resources.length === 0) {
      console.log(`  Empty folder, skipping.`);
      return;
    }

    console.log(`  Found ${resources.length} images.`);
    
    // Sort to maintain some stability
    resources.sort((a, b) => a.public_id.localeCompare(b.public_id));

    // Phase 1: Temp rename
    const tempPrefix = `temp_${Date.now()}_`;
    for (let i = 0; i < resources.length; i++) {
      const item = resources[i];
      const oldId = item.public_id;
      const newId = `${folder}/${tempPrefix}${i + 1}`;
      
      try {
        await cloudinary.uploader.rename(oldId, newId, { overwrite: true });
        item.temp_id = newId;
      } catch (e) {
        console.error(`  ❌ Error temp renaming ${oldId}: ${e.message}`);
      }
    }

    // Phase 2: Standardize to 1, 2, 3...
    for (let i = 0; i < resources.length; i++) {
      const item = resources[i];
      if (!item.temp_id) continue;

      const finalId = `${folder}/${i + 1}`;
      try {
        await cloudinary.uploader.rename(item.temp_id, finalId, { overwrite: true });
        console.log(`  ✨ Renamed to: ${i + 1}`);
      } catch (e) {
        console.error(`  ❌ Error final renaming ${item.temp_id}: ${e.message}`);
      }
    }
  } catch (e) {
    console.error(`  ❌ Error processing folder ${folder}:`, e.message);
  }
}

async function start() {
  const folders = [
    'wallpapers/Demon Slayer',
    'wallpapers/Boku no Hero Academia',
    'wallpapers/Cars',
    'wallpapers/Naruto'
  ];
  
  for (const folder of folders) {
    await renameFilesInFolder(folder);
  }

  console.log('\n✅ Renaming complete for requested folders.');
}

start();
