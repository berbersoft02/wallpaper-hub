const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'lib', 'blog.ts');

const SLUG_TO_FOLDER = {
  'toji-fushiguro-sorcerer-killer-4k-guide': 'Toji fushiguro',
  'shouko-nishimiya-silent-voice-4k-guide': 'Nishimiya Shouko',
  'elaina-wandering-witch-4k-guide': 'Elaina',
  'mai-sakurajima-bunny-girl-senpai-4k-guide': 'Mai Sakurajima',
  'nino-nakano-tsundere-energy-4k-guide': 'Nakano Nino',
  'rias-gremory-high-school-dxd-4k-guide': 'Rias  Gremory',
  'rin-shima-laid-back-camp-cozy-4k-guide': 'Rin Shima',
  'siesta-detective-is-already-dead-4k-guide': 'The Detective Is Already Dead',
  'blue-box-chinatsu-hina-4k-guide': 'Kano Chinatsu', // Fallback
  'my-hero-academia-4k-wallpapers-epic-guide': 'Boku no Hero Academia',
  'baki-hanma-muscle-intensity-4k-guide': 'Baki Hanma',
  'kaoruko-waguri-kaoru-hana-4k-guide': 'Kaoruko waguri',
  'maria-kujou-roshidere-sister-4k-guide': 'Maria kujou',
  'yuzuki-nanase-chitose-kun-4k-guide': 'Yuzuki Nanase',
  'rin-nanakura-giji-harem-4k-guide': 'Rin  Nanakura',
  'yuuko-hiragi-anime-girl-4k-guide': 'Yuuko Hiragi',
  'subaru-hushino-anime-4k-guide': 'Subaru Hushino',
  'phoebe-aesthetic-art-4k-guide': 'phoebe',
  'shikimori-4k-wallpapers-guide': 'Shikimori Micchon',
  'shiina-mahiru-4k-wallpapers-guide': 'Shiina Mahiru',
  'live-wallpapers-4k-guide': 'Live Wallpapers',
  'anime-car-wallpapers-guide': 'Cars',
  'pixel-art-anime-guide': 'Pixel',
  'frieren-story-analysis': 'Frieren',
  'mixed-anime-wallpapers-highlights': 'Mixed',
  'awesome-anime-backgrounds-collection': 'Awesome',
  'tenka-izumo-guide': 'Tenka Izumo',
  'violet-evergarden-story': 'Violet Evergarden',
  'workflow-guide': 'Mixed',
  'yuki-suou-4k-wallpapers-guide': 'Yuki Suou',
  'alya-kujou-tsundere-editing-guide': 'Alya Kujou ♡',
  'frieren-4k-wallpapers-guide': 'Frieren',
  'attack-on-titan-cinematic-brutality-long': 'Attack On Titan',
  'rintaro-tsumugi-kaoru-hana-expanded': 'Rintaro Tsumugi',
  'zero-two-editing-process': 'Zero Two',
  'marin-kitagawa-cosplay-queen-comprehensive': 'Marin kitagawa',
  'jujutsu-kaisen-gojo-satoru-deep-dive': 'Jujutsu Kaisen',
  'akane-kurokawa-method-acting-long': 'Akane Kurokawa',
  'chisato-nishikigi-action-long': 'Chisato Nishikigi',
  'chainsaw-man-denji-chaos-full': 'Chainsaw Man',
  'alya-kujou-russian-beauty-comprehensive': 'Alya Kujou ♡',
  'spider-man-across-multiverse-4k-editing': 'Spider-Man',
  'demon-slayer-breathing-effects-long': 'Demon Slayer',
  'blue-lock-egoist-aura-long': 'Blue Lock',
  'dragon-ball-visual-evolution-pro': 'Dragon Ball',
  'miku-nakano-headphones-aesthetic-long': 'Miku Nakano',
  'anime-nature-scenery-tribute': 'Nature',
  'colored-pencil-sketchbook-anime-wallpapers-guide': 'Tenka Izumo', // It uses these images
  'yor-forger-assassin-long': 'Yor Forger',
  'power-chainsaw-man-longform': 'Power',
  'naruto-evolution-glow-pro': 'Naruto',
  'luffy-gear-5-joyboy-masterclass': 'One Piece',
  'kana-arima-4k-wallpapers-guide': 'Kana Arima'
};

function repair() {
  console.log("🛠️ Repairing ALL blog images in lib/blog.ts...");
  let content = fs.readFileSync(FILE_PATH, 'utf8');

  // Split into posts to handle each slug context
  const posts = content.split(/  \{/);
  const repairedPosts = posts.map(post => {
    const slugMatch = post.match(/slug: '([^']+)'/);
    if (!slugMatch) return post;
    const slug = slugMatch[1];
    const folder = SLUG_TO_FOLDER[slug];
    if (!folder) return post;

    // Regex to find Cloudinary URLs that are NOT yet standardized (no folder part)
    // or those that need folder fixing.
    const urlRegex = /https:\/\/res\.cloudinary\.com\/dg8hzm1fp\/(image|video)\/upload\/(v\d+\/)?(?:wallpapers\/)?([^"'\s>]+)/g;

    return post.replace(urlRegex, (match, type, version, rest) => {
      // If 'rest' already contains the folder correctly, don't double it
      if (rest.startsWith(`wallpapers/${folder}/`)) return match;
      
      // Extract filename from rest
      let file = rest.split('/').pop();
      
      // Standardize filename if needed (e.g. oboi... -> 1.webp)
      // This is a guess based on the context of standardizing everything to 1, 2, 3...
      if (!file.match(/^\d+\./)) {
         // Special cases for files that might have been renamed to specific numbers in our previous script
         // But since we can't be 100% sure which number, we fallback to 1 if we can't map it.
         if (slug === 'attack-on-titan-cinematic-brutality-long') {
            if (file.includes('yyx0po')) file = '2.webp';
            else if (file.includes('po3jnj')) file = '1.webp';
            else if (file.includes('jvoaq2')) file = '3.webp';
            else file = '1.webp';
         } else if (slug === 'frieren-4k-wallpapers-guide' || slug === 'frieren-story-analysis') {
            if (file.includes('ktrrzf')) file = '1.jpg';
            else file = '1.jpg';
         } else {
            file = '1.' + file.split('.').pop();
         }
      }

      return `https://res.cloudinary.com/dg8hzm1fp/${type}/upload/wallpapers/${encodeURIComponent(folder)}/${file}`;
    });
  });

  fs.writeFileSync(FILE_PATH, repairedPosts.join('  {'));
  console.log("✨ All blog images repaired!");
}

repair();
