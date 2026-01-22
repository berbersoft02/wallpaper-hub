const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;

try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const OUTPUT_FILE = path.join(process.cwd(), 'app', 'data', 'wallpapers.json');

const SPECIAL_CATEGORIES = [
  'Animals', 'Awesome', 'Cars', 'Live Wallpapers', 'Mixed', 'Pixel'
];

const NAME_MAPPING = {
  'rin-nanakura': 'Rin Nanakura',
  'rin-shima': 'Rin Shima',
  'shikimori': 'Shikimori',
  'akane-kurokawa': 'Akane Kurokawa',
  'alya-kujou': 'Alya Kujou',
  'chinatsu': 'Chinatsu',
  'chisato-nishikigi': 'Chisato Nishikigi',
  'elaina': 'Elaina',
  'hina-chono': '♡ Hina Chono',
  'hushino': 'Hushino',
  'kaoruko-waguri': 'Kaoruko Waguri',
  'live-wallpapers': 'Live Wallpapers',
  'mai': 'Mai',
  'maria-kujou': 'Maria Kujou',
  'marin-kitagawa': 'Marin Kitagawa',
  'miku-nakano': 'Miku Nakano',
  'nakano-nino': 'Nakano Nino',
  'nishimiya-shouko': 'Nishimiya Shouko',
  'phoebe': 'Phoebe',
  'rias-gremory': 'Rias Gremory',
  'shiina-mahiru': 'Shiina Mahiru',
  'yuuko-hiragi': 'Yuuko Hiragi',
  'yuzuki-nanase': 'Yuzuki Nanase',
  'zero-two': 'Zero Two',
  'Rin  Nanakura': 'Rin Nanakura',
  'Rias  Gremory': 'Rias Gremory',
  'phoebe': 'Phoebe'
};

async function fetchResources(resourceType) {
  let allResources = [];
  let nextCursor = null;
  console.log(`🔄 Fetching ${resourceType}s from Cloudinary...`);

  try {
    do {
      const result = await cloudinary.search
        .expression(`folder:wallpapers/* AND resource_type:${resourceType}`)
        .max_results(500)
        .next_cursor(nextCursor)
        .execute();

      allResources = [...allResources, ...(result.resources || [])];
      nextCursor = result.next_cursor;
    } while (nextCursor);
    
    console.log(`✅ Found ${allResources.length} ${resourceType}s.`);
    return allResources;
  } catch (error) {
    console.error(`❌ Error fetching ${resourceType}s:`, error);
    return [];
  }
}

async function sync() {
  // Fetch both images and videos
  const images = await fetchResources('image');
  const videos = await fetchResources('video');
  const allResources = [...images, ...videos];

  const charactersMap = new Map();

  allResources.forEach(resource => {
    let rawName = '';
    const folder = resource.folder || resource.asset_folder;
    const publicId = resource.public_id; 

    if (folder) {
      const parts = folder.split('/');
      const wpIndex = parts.indexOf('wallpapers');
      if (wpIndex !== -1 && parts.length > wpIndex + 1) {
        rawName = parts[wpIndex + 1];
      } else if (wpIndex === -1 && parts.length > 0) {
         rawName = parts[0];
      }
    } 
    
    if (!rawName && publicId) {
      const parts = publicId.split('/');
      const wpIndex = parts.indexOf('wallpapers');
      if (wpIndex !== -1 && parts.length > wpIndex + 1) {
        rawName = parts[wpIndex + 1];
      }
    }

    if (!rawName || rawName === 'wallpapers') return;

    let cleanName = rawName.trim();
    if (NAME_MAPPING[cleanName]) {
      cleanName = NAME_MAPPING[cleanName];
    } else if (NAME_MAPPING[cleanName.toLowerCase()]) {
      cleanName = NAME_MAPPING[cleanName.toLowerCase()];
    } else {
      cleanName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
    }

    if (!charactersMap.has(cleanName)) {
      charactersMap.set(cleanName, {
        name: cleanName,
        category: SPECIAL_CATEGORIES.includes(cleanName) ? 'Special' : 'Anime',
        wallpapers: []
      });
    }

    const list = charactersMap.get(cleanName).wallpapers;
    if (!list.includes(resource.secure_url)) {
      list.push(resource.secure_url);
    }
  });

  const characters = Array.from(charactersMap.values())
    .map(char => ({
      ...char,
      wallpapers: char.wallpapers.sort()
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify({ characters }, null, 2));
  console.log(`✨ Successfully wrote ${characters.length} categories with ${allResources.length} total files.`);
}

sync();
