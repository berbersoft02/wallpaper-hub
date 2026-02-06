export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  coverImage?: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'complete-workflow-guide',
    title: 'Complete 4K Anime Wallpaper Creation Workflow: From Frame to Screen',
    excerpt: 'My exact 5-step process behind every Only_dias Ocean wallpaper—featuring Violet Evergarden, Alya Kujou, Yuki Suou, and Frieren collections with technical breakdowns.',
    date: '2026-02-05',
    author: 'Only_dias',
    tags: ['Workflow', '4K', 'Editing', 'Tutorial'],
    content: `
      <p class="text-xl text-gray-300 mb-8"><strong>My exact 5-step process behind every Only_dias Ocean wallpaper—featuring Violet Evergarden, Alya Kujou, Yuki Suou, and Frieren collections with technical breakdowns.</strong></p>

      <hr class="border-gray-800 my-8" />

      <h2 class="text-neon-pink drop-shadow-[0_0_8px_rgba(255,42,109,0.5)]">The Problem With 99% of Anime Wallpapers</h2>
      <p>Most anime wallpapers fail because they're just <strong>lazy screenshots</strong>:</p>
      <ul class="list-disc pl-6 space-y-2 mb-6">
        <li>Blurry compression artifacts from streaming sites</li>
        <li>Subtitles and watermarks blocking the composition</li>
        <li>Wrong aspect ratios that crop faces behind icons</li>
        <li>Generic color grading that kills character personality</li>
        <li>No optimization for modern 4K/OLED screens</li>
      </ul>
      <p>My wallpapers solve all these issues through a <strong>professional 5-step pipeline</strong> that transforms raw frames into screen-ready art.</p>

      <hr class="border-gray-800 my-8" />

      <h2 class="text-neon-cyan drop-shadow-[0_0_8px_rgba(5,217,232,0.5)]">Step 1: Surgical Frame Selection (15 Golden Rules)</h2>
      <h3 class="text-white mt-6 mb-4">Composition Rules (Desktop First)</h3>
      <pre class="bg-black/50 p-4 rounded-lg my-4 text-xs font-mono text-cyan-400 border border-cyan-900/30">
1. Rule of Thirds - Character offset, never dead center
2. Icon Clearance - 20% empty space (left side priority)
3. Taskbar Safe - Bottom 10% clear of details
4. Notification Zone - Top 15% readable text area</pre>

      <h3 class="text-white mt-6 mb-4">Technical Requirements</h3>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-gray-300">
        <li>Native 1080p+ source material only</li>
        <li>No motion blur on faces/hair</li>
        <li>Strong key lighting (defines silhouette)</li>
        <li>Flat color areas (no heavy gradients pre-upscale)</li>
        <li>Emotional peak moments (not mid-action)</li>
      </ul>

      <hr class="border-gray-800 my-8" />

      <h2 class="text-neon-purple drop-shadow-[0_0_8px_rgba(211,0,197,0.5)]">Step 2: Artifact Extermination (30-45 Minutes)</h2>
      <p class="font-bold text-gray-200 mt-4">PHASE 1: Subtitle Annihilation</p>
      <ul class="list-disc pl-6 space-y-1 mb-4 text-gray-400">
        <li>Clone Stamp Tool (80% opacity, soft brush)</li>
        <li>Content-Aware Fill (Selection → Edit → Fill)</li>
        <li>Manual reconstruction (hair strands, background)</li>
      </ul>
      <p class="font-bold text-gray-200 mt-4">PHASE 2: Compression Cleanup</p>
      <ul class="list-disc pl-6 space-y-1 mb-4 text-gray-400">
        <li>Surface Blur (Radius 1-2px, selective application)</li>
        <li>Reduce Noise (Strength 5-10%, Preserve Details)</li>
        <li>Manual line repair (Pen Tool + 2px brush)</li>
      </ul>

      <hr class="border-gray-800 my-8" />

      <h2 class="text-neon-cyan drop-shadow-[0_0_8px_rgba(5,217,232,0.5)]">Step 3: Intelligent 4K Upscaling Pipeline</h2>
      <div class="bg-dark-bg/50 border border-gray-800 p-6 rounded-xl my-6">
        <p class="font-mono text-neon-pink mb-4 uppercase tracking-widest text-sm">Toolchain:</p>
        <ol class="list-decimal pl-6 space-y-2 text-gray-300">
          <li>Real-ESRGAN (Anime_6B model) → 2x upscale</li>
          <li>Waifu2x (Noise 1, upscale 2x) → Final pass</li>
          <li>Photoshop: Smart Sharpen + Manual cleanup</li>
        </ol>
      </div>

      <hr class="border-gray-800 my-8" />

      <h2 class="text-neon-pink drop-shadow-[0_0_8px_rgba(255,42,109,0.5)]">Step 4: Personality-Driven Color Grading</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
        <div class="p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 class="text-white font-bold mb-2">Violet Evergarden</h4>
          <p class="text-xs text-gray-400 leading-relaxed">
            Curves: S-curve (soft shoulder)<br/>
            Color Balance: Cyan shadows, warm highlights<br/>
            Selective Color: Blue uniform +20% sat<br/>
            Bloom: Gaussian Blur 2px on highlights
          </p>
        </div>
        <div class="p-4 bg-white/5 rounded-lg border border-white/10">
          <h4 class="text-white font-bold mb-2">Alya Kujou</h4>
          <p class="text-xs text-gray-400 leading-relaxed">
            Split Tone: Cool shadows (198°), Warm highlights (42°)<br/>
            Eye Enhancement: +40% sat, +20% brightness<br/>
            Hair: Silver desaturation + cool blue tint<br/>
            Background: Gaussian Blur (15px)
          </p>
        </div>
      </div>

      <hr class="border-gray-800 my-8" />

      <h2 class="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Step 5: Multi-Platform Export Matrix</h2>
      <div class="overflow-x-auto my-6">
        <table class="w-full border-collapse border border-gray-800 text-sm font-mono text-gray-300">
          <thead>
            <tr class="bg-gray-900 text-neon-cyan">
              <th class="border border-gray-800 p-3 text-left">Device</th>
              <th class="border border-gray-800 p-3 text-left">Resolution</th>
              <th class="border border-gray-800 p-3 text-left">Format</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-800 p-3 text-white">Desktop 16:9</td>
              <td class="border border-gray-800 p-3">3840×2160</td>
              <td class="border border-gray-800 p-3">PNG</td>
            </tr>
            <tr>
              <td class="border border-gray-800 p-3 text-white">Ultrawide 21:9</td>
              <td class="border border-gray-800 p-3">5120×1440</td>
              <td class="border border-gray-800 p-3">PNG</td>
            </tr>
            <tr>
              <td class="border border-gray-800 p-3 text-white">Mobile Portrait</td>
              <td class="border border-gray-800 p-3">1170×2532</td>
              <td class="border border-gray-800 p-3">JPG (95%)</td>
            </tr>
          </tbody>
        </table>
      </div>
    `
  },
  {
    slug: 'yuki-suou-4k-wallpapers-guide',
    title: 'Yuki Suou: My 4K Wallpapers Collection + Genki Girl Editing Guide',
    excerpt: 'Exclusive Yuki Suou 4K wallpapers collection. Detailed editing workflow, genki color grading, PC/mobile setup tips, and gallery with 2 styles (kawaii + cool).',
    date: '2026-02-04',
    author: 'Only_dias',
    tags: ['Yuki Suou', 'Roshidere', 'Genki', 'Editing'],
    content: `
      <h2>Introduction: Yuki Suou, the Ultimate Genki Energy Wallpaper</h2>
      <p>Yuki Suou from <em>Alya Sometimes Hides Her Feelings in Russian</em> (Roshidere) is the perfect <strong>genki girl</strong> archetype: infectious smile, overflowing energy, perfect black hair for light effects.</p>
      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1770123307/3_gtiwdc.jpg" alt="Yuki Suou Kawaii" class="object-cover w-full h-full" />
      </div>
      <p>My workflow focuses on capturing her high energy through vibrant saturation and soft cheek glows.</p>
    `
  },
  {
    slug: 'alya-kujou-tsundere-editing-guide',
    title: 'Alya Kujou: My 4K Wallpapers Collection + Tsundere Editing Guide',
    excerpt: 'Discover my exclusive collection of Alya Kujou wallpapers in 4K. Detailed editing process, tsundere color grading, setup tips, and full gallery.',
    date: '2026-02-04',
    author: 'Only_dias',
    tags: ['Alya Kujou', 'Roshidere', 'Tsundere', 'Editing'],
    content: `
      <h2>Introduction: Why Alya Kujou is Wallpaper Gold</h2>
      <p>Alya, with her silver hair, cold gazes, and hidden smiles, has that mix of Russian coldness and Japanese sweetness that explodes on a 4K screen.</p>
      <div class="my-8 relative w-full aspect-video rounded-lg overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1767957600/wallpapers/Alya%20Kujou/10.jpg" alt="Alya Kujou 4K" class="object-cover w-full h-full" />
      </div>
    `
  },
  {
    slug: 'frieren-4k-wallpapers-guide',
    title: 'The Magic of Frieren: My 4K Wallpaper Collection + Editing Breakdown',
    excerpt: 'Explore my exclusive collection of Frieren 4K wallpapers. Detailed editing process, setup tips, and why this series is a game-changer for anime backgrounds.',
    date: '2026-01-31',
    author: 'Only_dias',
    tags: ['Frieren', 'Anime', '4K', 'Fantasy', 'Editing'],
    content: `
      <h2>The Melancholic Beauty of Frieren</h2>
      <p><em>Frieren: Beyond Journey’s End</em> is a masterclass in melancholic beauty. The cool color palettes and vast landscapes make it perfect for minimalist setups.</p>
      <div class="my-8 relative w-full aspect-video rounded-lg overflow-hidden border-2 border-neon-cyan/50 shadow-[0_0_20px_rgba(5,217,232,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769982784/1_ktrrzf.jpg" alt="Frieren 4K" class="object-cover w-full h-full" />
      </div>
    `
  },
  {
    slug: 'attack-on-titan-cinematic-brutality-long',
    title: 'Attack on Titan: The Final Season\'s Cinematic Brutality',
    excerpt: 'MAPPA brought a darker, more cinematic look to the series. Here is how I edit Eren and Mikasa to match.',
    date: '2026-01-31',
    author: 'Only_dias',
    tags: ['Attack on Titan', 'Eren Yeager', 'MAPPA', 'Cinematic'],
    content: `
      <h2>The Gritty Era of MAPPA</h2>
      <p>The Final Season feels less like an anime and more like a high-budget war film. I preserve this through added grain and crushed blacks for OLED screens.</p>
      <div class="my-8 relative w-full aspect-video rounded-lg overflow-hidden border-2 border-orange-900/50 shadow-[0_0_20px_rgba(69,10,10,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769173647/oboi.4k_threadsmate.com_1769173491_yyx0po.webp" alt="AOT 4K" class="object-cover w-full h-full" />
      </div>
    `
  },
  {
    slug: 'rintaro-tsumugi-kaoru-hana-expanded',
    title: 'Rintaro Tsumugi: The Gentle Giant Aesthetic',
    excerpt: 'Kaoru Hana wa Rin to Saku has beautiful art. Here is how I edit Rintaro.',
    date: '2026-01-30',
    author: 'Only_dias',
    tags: ['Kaoru Hana', 'Rintaro', 'Romance', 'Wholesome'],
    content: `
      <h2>The Wholesome Protagonist</h2>
      <p>Rintaro's journey of self-acceptance is heartwarming. I use pastel purples and soft golds to reflect his personality.</p>
      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-purple-400/50 shadow-[0_0_20px_rgba(192,132,252,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769184762/1_giyu6z.jpg" alt="Rintaro 4K" class="object-cover w-full h-full" />
      </div>
    `
  },
  {
    slug: 'how-i-make-viral-anime-edits-pro-masterclass',
    title: 'How I Make My Viral Anime Edits: 2026 Masterclass',
    excerpt: 'An exhaustive look at my editing workflow using Adobe Photoshop and After Effects.',
    date: '2026-01-22',
    author: 'Only_dias',
    tags: ['Tutorial', 'TikTok', 'Editing', 'Photoshop'],
    content: `
      <h2>Phase 1: Sourcing Blu-ray RAWs</h2>
      <p>Quality starts at the source. I never use compressed streaming clips. I hunt for Blu-ray RAWs for the highest bitrate foundation.</p>
    `
  },
  {
    slug: 'zero-two-editing-process',
    title: 'Zero Two: Queen of Aesthetics',
    excerpt: 'Deep dive into my editing process for the pink-haired icon.',
    date: '2026-01-30',
    author: 'Only_dias',
    tags: ['Zero Two', 'Darling in the Franxx', 'Waifu', 'Pink'],
    content: `
      <h2>Vaporwave Workflow</h2>
      <p>Zero Two's design is perfect for cyan and purple accents. I use chromatic aberration to give it that retro-future CRT buzz.</p>
      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-neon-pink/50 shadow-[0_0_20px_rgba(255,42,109,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1767958378/wallpapers/Zero%20Two/3%20%282%29.jpg" alt="Zero Two 4K" class="object-cover w-full h-full" />
      </div>
    `
  },
  {
    slug: 'marin-kitagawa-cosplay-queen-comprehensive',
    title: 'Marin Kitagawa: Capturing Gyaru Energy',
    excerpt: 'Color grading Marin to match her sunny personality.',
    date: '2026-01-29',
    author: 'Only_dias',
    tags: ['Marin Kitagawa', 'My Dress-Up Darling', 'Gyaru', 'Vibrant'],
    content: `
      <h2>Golden Hour Grade</h2>
      <p>Marin radiates positivity. I use high-key lighting and warm saturation to make the wallpaper feel like a nostalgic summer afternoon.</p>
    `
  },
  {
    slug: 'jujutsu-kaisen-gojo-satoru-deep-dive',
    title: 'The Honored One: Gojo Satoru 4K Deep Dive',
    excerpt: 'His eyes are the hardest to edit. Breaking down my JJK collection.',
    date: '2026-01-28',
    author: 'Only_dias',
    tags: ['JJK', 'Gojo Satoru', 'Eyes', 'Blue'],
    content: `
      <h2>The Six Eyes</h2>
      <p>The electric blue crystalline structure of his eyes must remain the sharpest point. I use "Linear Dodge (Add)" for that intense cursed energy bloom.</p>
    `
  },
  {
    slug: 'akane-kurokawa-method-acting-long',
    title: 'Akane Kurokawa: Method Acting & Star Eyes',
    excerpt: 'Akane is defined by her intensity. Here is how I edit her transformation.',
    date: '2026-01-27',
    author: 'Only_dias',
    tags: ['Oshi no Ko', 'Akane', 'Blue', 'Acting'],
    content: `
      <h2>The Psychological Gaze</h2>
      <p>I use cool temperatures and desaturated backgrounds to isolate Akane's analytical blue eyes during her performance.</p>
    `
  }
];

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
