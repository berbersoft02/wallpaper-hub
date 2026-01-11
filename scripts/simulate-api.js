const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Load environment variables
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  const envPath = path.join(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=');
        if (key && valueParts.length > 0) {
          process.env[key.trim()] = valueParts.join('=').trim();
        }
      }
    });
  }
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function simulateApi() {
  console.log('Simulating API logic...');
  
  try {
    // Search for everything to inspect raw data
    console.log('Searching for ALL images to inspect metadata...');
    let result = await cloudinary.search
      .expression('resource_type:image')
      .max_results(500)
      .execute();
      
    // Check if one of the known IDs is present
    const knownId = '9_cogajs'; // One of the IDs from the check script
    const found = result.resources.find(r => r.public_id === knownId);
    
    if (found) {
        console.log('✅ FOUND THE MISSING IMAGE IN GENERAL SEARCH!');
        console.log('Metadata:', found);
    } else {
        console.log('❌ THE IMAGE IS NOT IN THE GENERAL SEARCH RESULTS!');
    }

    console.log(`Search returned ${result.resources.length} resources.`);

    const charactersMap = new Map();
    
    // Copy exact mapping from route.ts
    const nameMapping = {
        'shiina-mahiru': '𝑆ℎ𝑖𝑖𝑛𝑎 𝑀𝑎ℎ𝑖𝑟𝑢',
        'akane-kurokawa': 'Akane Kurokawa',
        'alya-kujou': 'Alya Kujou',
        'chinatsu': 'Chinatsu',
        'elaina': 'Elaina',
        'hushino': 'Hushino',
        'kaoruko-waguri': 'Kaoruko waguri',
        'mai': 'Mai',
        'maria-kujou': 'Maria kujou',
        'marin-kitagawa': 'Marin kitagawa',
        'nakano-nino': 'Nakano Nino',
        'rin-shima': 'Rin Shima',
        'shikimori': 'shikimori',
        'yuzuki-nanase': 'Yuzuki Nanase',
        'zero-two': 'Zero Two',
        'hina-chono': '♡ Hina Chono',
        'nishimiya-shouko': 'Nishimiya Shouko',
        'hina chono': '♡ Hina Chono',
        'nishimiya shouko': 'Nishimiya Shouko',
        'akane kurokawa': 'Akane Kurokawa',
        'alya kujou': 'Alya Kujou',
        'maria kujou': 'Maria kujou',
        'marin kitagawa': 'Marin kitagawa',
        'nakano nino': 'Nakano Nino',
        'rin shima': 'Rin Shima',
        'yuzuki nanase': 'Yuzuki Nanase',
        'zero two': 'Zero Two',
    };

    result.resources.forEach((resource) => {
      const folderField = resource.folder || '';
      const publicId = resource.public_id || '';
      const pathParts = publicId.split('/');
      
      let folderName = '';
      
      if (folderField) {
        const parts = folderField.split('/');
        // Logic from route.ts
        if (parts[0] === 'wallpapers' && parts.length >= 2) {
          folderName = parts[1];
        }
      } 
      
      if (!folderName && pathParts.length >= 2 && pathParts[0] === 'wallpapers') {
        folderName = pathParts[1];
      }
      
      if (folderName) {
        const normalizedFolderName = folderName.toLowerCase().replace(/\s+/g, '-');
        const characterName = nameMapping[folderName] || 
                              nameMapping[normalizedFolderName] ||
                              folderName;
        
        if (!charactersMap.has(characterName)) {
          charactersMap.set(characterName, []);
        }
        
        // Count it
        charactersMap.get(characterName).push(resource.public_id);
      } else {
        // Log skipped ones if they look like they might be relevant
        if (resource.folder && resource.folder.includes('Nishimiya')) {
             console.log('⚠️ SKIPPED RELEVANT RESOURCE:', {
                public_id: resource.public_id,
                folder: resource.folder,
                folderNameExtracted: folderName
             });
        }
      }
    });

    console.log('\n--- Characters Found ---');
    const sortedChars = Array.from(charactersMap.keys()).sort();
    sortedChars.forEach(char => {
        console.log(`${char}: ${charactersMap.get(char).length} images`);
    });

    if (!charactersMap.has('Nishimiya Shouko')) {
        console.log('\n❌ Nishimiya Shouko NOT found in processed list.');
    } else {
        console.log('\n✅ Nishimiya Shouko FOUND!');
    }

  } catch (error) {
    console.error('Error:', error);
  }
}

simulateApi();
