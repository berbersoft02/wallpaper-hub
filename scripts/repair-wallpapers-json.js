const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'app', 'data', 'wallpapers.json');

// Reverse mapping from JSON name to Cloudinary folder (if different)
const REVERSE_MAPPING = {
  'Alya Kujou ♡': 'Alya Kujou ♡',
  'Hina Chono': 'Hina Chono',
  'Subaru Hushino': 'Subaru Hushina', // Check if this was correct
  'Boku No Hero Academia': 'Boku no Hero Academia',
  'ISAGI YOICHI': 'iSAGI YOICHI',
  'Itashi': 'Itashi',
  'Mixed': 'Mixed',
  'Rias Gremory': 'Rias  Gremory', // Note the double space
  'Rin Nanakura': 'Rin  Nanakura', // Note the double space
};

async function repair() {
  console.log("🛠️ Repairing wallpapers.json...");
  if (!fs.existsSync(FILE_PATH)) {
    console.error("❌ File not found!");
    return;
  }

  const data = JSON.parse(fs.readFileSync(FILE_PATH, 'utf8'));

  data.characters.forEach(char => {
    console.log(`Processing ${char.name}...`);
    
    // Determine folder name
    let folder = REVERSE_MAPPING[char.name] || char.name;
    const baseUrl = "https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers";

    char.wallpapers = char.wallpapers.map((url, index) => {
      // Keep extension
      const ext = url.split('.').pop().toLowerCase();
      // Handle videos
      const resourceType = ext.match(/(mp4|webm|mov)/) ? 'video' : 'image';
      const actualBase = `https://res.cloudinary.com/dg8hzm1fp/${resourceType}/upload/wallpapers`;
      
      return `${actualBase}/${encodeURIComponent(folder)}/${index + 1}.${ext}`;
    });
  });

  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  console.log("✨ Repair complete! All URLs are now standardized and versionless.");
}

repair();
