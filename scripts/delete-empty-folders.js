const cloudinary = require('cloudinary').v2;

try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function deleteEmptyFolders() {
  console.log('🗑️ Deleting empty folders...');
  try {
    const rootFolders = await cloudinary.api.root_folders();
    if (rootFolders.folders) {
      for (const folder of rootFolders.folders) {
        if (folder.name === 'wallpapers') {
           const subFolders = await cloudinary.api.sub_folders('wallpapers');
           // Check deeper? Cloudinary auto-deletes truly empty folders usually.
           // But if we have "wallpapers/wallpapers", let's check.
           
           for (const sub of subFolders.folders) {
             if (sub.name === 'wallpapers') {
               console.log('Found wallpapers/wallpapers! Checking contents...');
               // Check if it has resources
               const resources = await cloudinary.search
                 .expression('folder:wallpapers/wallpapers/*')
                 .execute();
                 
               if (resources.total_count === 0) {
                 console.log('Deleting empty wallpapers/wallpapers...');
                 await cloudinary.api.delete_folder('wallpapers/wallpapers');
               } else {
                 console.log(`Folder wallpapers/wallpapers has ${resources.total_count} items. Need to move them first.`);
               }
             }
           }
        }
      }
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

deleteEmptyFolders();
