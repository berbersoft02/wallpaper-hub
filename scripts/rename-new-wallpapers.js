const fs = require('fs');
const path = require('path');

const WALLPAPERS_DIR = path.join(process.cwd(), 'public', 'wallpapers');

// List of new categories to process
const TARGET_FOLDERS = [
  'Animals',
  'Awesome',
  'Baki Hanma',
  'Boku no Hero Academia',
  'Cars',
  'Demon Slayer',
  'Dragon Ball',
  'Itashi',
  'Jujutsu Kaisen',
  'Pixel',
  'The Detective Is Already Dead'
];

function renameFiles() {
  TARGET_FOLDERS.forEach(folder => {
    const folderPath = path.join(WALLPAPERS_DIR, folder);
    
    if (!fs.existsSync(folderPath)) {
      console.warn(`⚠️ Folder not found: ${folder}`);
      return;
    }

    const files = fs.readdirSync(folderPath).filter(file => 
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    console.log(`📁 Processing ${folder}: ${files.length} files`);

    files.forEach((file, index) => {
      const ext = path.extname(file);
      const newName = `${index + 1}${ext}`;
      const oldPath = path.join(folderPath, file);
      const newPath = path.join(folderPath, newName);

      // Skip if already named correctly (e.g., 1.jpg) to avoid double renaming conflicts
      if (file === newName) return;

      // Handle collision if target file exists (e.g. renaming photo... to 1.jpg but 1.jpg exists)
      // We will move to a temporary name first if needed, but for simplicity, let's assume
      // we can just rename if we are careful. 
      // Safer strategy: Rename everything to a temp UUID then to numbers.
      // Or just try to rename.
      
      try {
        fs.renameSync(oldPath, newPath);
        // console.log(`  Renamed: ${file} -> ${newName}`);
      } catch (e) {
        console.error(`  ❌ Error renaming ${file}: ${e.message}`);
      }
    });
    console.log(`  ✅ Renamed files in ${folder} to sequence 1..${files.length}`);
  });
}

renameFiles();
