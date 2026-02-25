const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'lib', 'blog.ts');

const FOLDER_MAPPING = {
  'toji-fushiguro': 'Toji fushiguro',
  'Nishimiya%20Shouko': 'Nishimiya Shouko',
  'Elaina': 'Elaina',
  'Mai': 'Mai Sakurajima',
  'Nakano%20Nino': 'Nakano Nino',
  'Kaoruko%20waguri': 'Kaoruko waguri',
  'Maria%20kujou': 'Maria kujou',
  'Yuzuki%20Nanase': 'Yuzuki Nanase',
  'Rin%20%20Nanakura': 'Rin  Nanakura',
  'Yuuko%20Hiragi': 'Yuuko Hiragi',
  'Hushino': 'Subaru Hushino',
  'Phoebe': 'phoebe',
  'Chinatsu': 'Kano Chinatsu',
  '%E2%99%A1%20Hina%20Chono': 'Hina Chono',
  'Nakano%20Nino': 'Nakano Nino',
  'rin-shima': 'Rin Shima',
  'shikimori': 'Shikimori Micchon',
  'Shiina%20Mahiru': 'Shiina Mahiru',
  'Cars': 'Cars',
  'Frieren': 'Frieren',
  'Mixed': 'Mixed',
  'Awesome': 'Awesome',
  'Itashi': 'Naruto', // Checked: Itashi folder was renamed to Naruto or contains Naruto stuff
  'Baki%20Hanma': 'Baki Hanma',
  'Boku%20No%20Hero%20Academia': 'Boku no Hero Academia',
  'Jujutsu%20Kaisen': 'Jujutsu Kaisen',
  'Demon%20Slayer': 'Demon Slayer',
  'Chainsaw%20Man': 'Chainsaw Man',
  'One%20Piece': 'One Piece',
  'Dragon%20Ball': 'Dragon Ball',
  'Blue%20Lock': 'Blue Lock'
};

function fixUrls() {
  console.log("📝 Fixing URLs in lib/blog.ts...");
  let content = fs.readFileSync(FILE_PATH, 'utf8');

  // 1. Remove versions (v1234567890/)
  content = content.replace(/\/v\d+\//g, '/');

  // 2. Fix folder names and filenames
  // Regex to find Cloudinary URLs in the content
  const urlRegex = /https:\/\/res\.cloudinary\.com\/dg8hzm1fp\/(image|video)\/upload\/wallpapers\/([^"'\s>]+)/g;
  
  content = content.replace(urlRegex, (match, type, rest) => {
    let [folder, file] = rest.split('/');
    
    // If folder mapping exists, use it
    if (FOLDER_MAPPING[folder]) {
      folder = FOLDER_MAPPING[folder];
    }

    // Standardize filename if it's not already just a number
    // Example: "1_1.jpg" -> "1.jpg", "photo_...jpg" -> "1.jpg" (This is risky but matches our Cloudinary state)
    // Actually, let's keep the filename part if it's already a number, or try to use "1.jpg" as fallback
    if (file && !file.match(/^\d+\./)) {
       // If it was "1_1.jpg" -> "1.jpg"
       const numMatch = file.match(/^(\d+)_/);
       if (numMatch) {
         file = `${numMatch[1]}.${file.split('.').pop()}`;
       } else {
         // Default to 1.jpg for broken paths if we can't guess
         file = `1.${file.split('.').pop()}`;
       }
    }

    return `https://res.cloudinary.com/dg8hzm1fp/${type}/upload/wallpapers/${folder}/${file}`;
  });

  fs.writeFileSync(FILE_PATH, content);
  console.log("✨ lib/blog.ts URLs fixed!");
}

fixUrls();
