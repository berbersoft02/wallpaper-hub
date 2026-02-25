const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'lib', 'blog.ts');

function diversifyWallpapers() {
  console.log("🎨 Diversifying wallpapers in blog posts...");
  let content = fs.readFileSync(FILE_PATH, 'utf8');

  // Regex to split into posts
  const posts = content.split(/  \{/);
  
  const processedPosts = posts.map(post => {
    if (!post.includes('slug:')) return post;

    // Tracker for this specific post to ensure unique numbers per folder
    const folderTrackers = {};

    // Regex to find Cloudinary URLs
    const urlRegex = /https:\/\/res\.cloudinary\.com\/dg8hzm1fp\/(image|video)\/upload\/wallpapers\/([^"'\s>]+)\/(\d+)\.([a-z0-9]+)/g;

    return post.replace(urlRegex, (match, type, folder, num, ext) => {
      if (!folderTrackers[folder]) {
        folderTrackers[folder] = 1;
      } else {
        folderTrackers[folder]++;
      }

      const newNum = folderTrackers[folder];
      // We assume there are enough wallpapers (most have at least 6-10)
      // If we exceed 10, we might want to loop or check real counts, but 1..5 is usually safe.
      return `https://res.cloudinary.com/dg8hzm1fp/${type}/upload/wallpapers/${folder}/${newNum}.${ext}`;
    });
  });

  fs.writeFileSync(FILE_PATH, processedPosts.join('  {'));
  console.log("✨ All blog posts now use unique sequential wallpapers!");
}

diversifyWallpapers();
