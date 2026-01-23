const cloudinary = require('cloudinary').v2;

try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function cleanup() {
  console.log('🧹 Starting Cloudinary Cleanup...');
  
  let nextCursor = null;
  let movedCount = 0;

  try {
    do {
      const result = await cloudinary.search
        .expression('folder:wallpapers/*')
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();

      for (const resource of result.resources) {
        const folder = resource.folder;
        if (!folder) continue;

        // Detect messy folders
        // 1. Double nested: "wallpapers/wallpapers/..."
        // 2. Weird subfolders: "wallpapers/Hina Chono/Give some recommendations..."
        
        let newFolder = '';
        
        if (folder.startsWith('wallpapers/wallpapers/')) {
          // Fix double nesting
          const subPath = folder.replace('wallpapers/wallpapers/', '');
          newFolder = `wallpapers/${subPath}`;
        } else if (folder.includes('Give some recommendations')) {
          // Fix Hina Chono mess
          newFolder = 'wallpapers/Hina Chono';
        } else if (folder === 'wallpapers') {
           // Root level wallpapers file? Move to Mixed? Or leave it?
           // Usually implies no category. Let's skip for now.
        }

        if (newFolder && newFolder !== folder) {
          const oldPublicId = resource.public_id;
          const fileName = resource.filename; // or extract from public_id
          // Construct new public ID: newFolder + / + fileName
          // Careful: public_id includes folder structure.
          
          // We need just the filename part.
          const namePart = resource.public_id.split('/').pop();
          const newPublicId = `${newFolder}/${namePart}`;

          console.log(`  Renaming: ${oldPublicId} -> ${newPublicId}`);
          
          try {
            await cloudinary.uploader.rename(oldPublicId, newPublicId, {
              overwrite: true
            });
            movedCount++;
          } catch (err) {
            console.error(`  ❌ Failed to rename ${oldPublicId}:`, err.message);
          }
        }
      }
      
      nextCursor = result.next_cursor;
    } while (nextCursor);

    console.log(`✨ Cleanup complete. Moved ${movedCount} files.`);

  } catch (e) {
    console.error('Error during cleanup:', e);
  }
}

cleanup();
