const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'lib', 'blog.ts');

function fixBlueBoxAndOthers() {
  console.log("🛠️ Fixing Blue Box and other specific posts...");
  let content = fs.readFileSync(FILE_PATH, 'utf8');

  // Split into posts
  const posts = content.split(/  \{/);
  
  const processedPosts = posts.map(post => {
    const slugMatch = post.match(/slug: '([^']+)'/);
    if (!slugMatch) return post;

    // Tracker for this post
    const folderTrackers = {};

    // 1. First, correct the folders based on ALT for all images in this post
    let fixedPost = post.replace(/<img[^>]+>/gi, (imgTag) => {
      let t = imgTag;
      if (imgTag.includes('Hina Chono') || imgTag.includes('Hina Gymnastics')) {
        t = t.replace(/wallpapers\/[^/]+\//, 'wallpapers/Hina Chono/');
      } else if (imgTag.includes('Chinatsu')) {
        t = t.replace(/wallpapers\/[^/]+\//, 'wallpapers/Kano Chinatsu/');
      } else if (imgTag.includes('Bakugo') || imgTag.includes('Deku') || imgTag.includes('MHA')) {
        t = t.replace(/wallpapers\/[^/]+\//, 'wallpapers/Boku no Hero Academia/');
      } else if (imgTag.includes('Zenitsu') || imgTag.includes('Tanjiro') || imgTag.includes('Nezuko')) {
        t = t.replace(/wallpapers\/[^/]+\//, 'wallpapers/Demon Slayer/');
      }
      return t;
    });

    // 2. Then, diversify the numbers
    const urlRegex = /https:\/\/res\.cloudinary\.com\/dg8hzm1fp\/(image|video)\/upload\/wallpapers\/([^/]+)\/(\d+)\.([a-z0-9]+)/gi;
    fixedPost = fixedPost.replace(urlRegex, (match, type, folder, num, ext) => {
      const f = folder.trim();
      folderTrackers[f] = (folderTrackers[f] || 0) + 1;
      return `https://res.cloudinary.com/dg8hzm1fp/${type}/upload/wallpapers/${folder}/${folderTrackers[f]}.${ext}`;
    });

    return fixedPost;
  });

  fs.writeFileSync(FILE_PATH, processedPosts.join('  {'));
  console.log("✨ Specific posts fixed and all diversified!");
}

fixBlueBoxAndOthers();
