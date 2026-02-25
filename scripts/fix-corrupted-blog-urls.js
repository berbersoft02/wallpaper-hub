const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'lib', 'blog.ts');

function fixCorruptedUrls() {
  console.log("🛠️ Fixing corrupted URLs in lib/blog.ts...");
  let content = fs.readFileSync(FILE_PATH, 'utf8');

  // Flexible regex to match the pattern wallpapers/Folder/AnyPrefix.Folder/File
  // even if Folder has %20 in one place and space in another.
  const urlRegex = /https:\/\/res\.cloudinary\.com\/dg8hzm1fp\/(image|video)\/upload\/wallpapers\/([^/]+)\/([^/]+)\/(\d+\.(?:jpg|png|webp|mp4|webm))/gi;

  const fixedContent = content.replace(urlRegex, (match, type, folder, middle, file) => {
    // If the middle part looks like a corrupted version of the folder (e.g., "1.Nakano Nino")
    // we should remove it.
    const cleanFolder = decodeURIComponent(folder);
    const cleanMiddle = decodeURIComponent(middle);
    
    if (cleanMiddle.includes(cleanFolder) || cleanMiddle.startsWith('1.')) {
       console.log(`  Fixed: ${match} -> .../wallpapers/${folder}/${file}`);
       return `https://res.cloudinary.com/dg8hzm1fp/${type}/upload/wallpapers/${folder}/${file}`;
    }
    return match;
  });

  fs.writeFileSync(FILE_PATH, fixedContent);
  console.log("✨ lib/blog.ts URLs cleaned up!");
}

fixCorruptedUrls();
