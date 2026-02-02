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
    slug: 'frieren-beyond-journeys-end-wallpaper-collection',
    title: 'The Magic of Frieren: New 4K Wallpaper Collection and Visual Analysis',
    excerpt: 'A deep dive into the visual language of Sousou no Frieren and a behind-the-scenes look at how we upscaled this breathtaking collection to 4K.',
    date: '2026-01-31',
    author: 'Only_dias',
    tags: ['Frieren', 'Anime', '4K', 'Fantasy'],
    content: `
      <h2>The Elf Who Lived a Thousand Years</h2>
      <p>I still remember the first time I watched episode 1 of <em>Frieren: Beyond Journey's End</em>. I expected a typical fantasy adventure about defeating a demon king, but what I got was a masterclass in melancholy and visual storytelling. The way Madhouse animates the passage of time—the rustling of leaves, the slow drifting of clouds, and the changing seasons—is something I knew I had to capture in wallpaper form.</p>
      
      <div class="my-8 relative w-full aspect-video rounded-lg overflow-hidden border-2 border-neon-cyan/50 shadow-[0_0_20px_rgba(5,217,232,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769685124/7_kfj78g.webp" alt="Frieren Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>The Technical Challenge: Softness vs. Clarity</h2>
      <p>The biggest challenge with editing Frieren frames is the show's inherent softness. Unlike <em>Jujutsu Kaisen</em> or <em>Demon Slayer</em>, which use sharp, high-contrast outlines, Frieren uses a diffusion filter that gives everything a dreamlike, painterly glow. This is beautiful on TV, but when you upscale it to a 4K desktop monitor, it can look "muddy" or out of focus.</p>
      
      <p>To solve this, my workflow involved a multi-step process. First, I use a specialized AI model called <strong>Real-ESRGAN</strong> to handle the initial 4x upscale. This model is great because it preserves the "painterly" textures of the background while sharpening the lines of the characters. However, even AI isn't perfect. I then bring the 4K image into Adobe Photoshop for manual retouching.</p>

      <p>In Photoshop, I use a <strong>"High Pass" filter</strong> technique. I duplicate the base layer, apply High Pass with a radius of exactly 1.2 pixels, and set the blending mode to "Overlay." This specifically brings out the micro-details in Frieren's white hair and the texture of her staff. To prevent the background from becoming too sharp and losing its watercolor feel, I use a layer mask to paint out the High Pass effect everywhere except on the characters themselves.</p>

      <h2>The Art of the Blue Moon Weed</h2>
      <p>One of the most requested scenes was Frieren in the field of Blue Moon Weed flowers. This scene is a masterclass in lighting. The flowers give off a cold, ethereal blue light that reflects off Frieren's hair and clothes. To make this work as a wallpaper, I spent nearly two hours on <strong>Color Grading</strong>.</p>
      
      <p>I used "Selective Color" adjustment layers to target the Cyans and Blues. By removing the yellow from the blues, I was able to make the glow feel "colder" and more magical. I also added a "Radial Gradient" map in the center of the flowers set to "Color Dodge" at 10% opacity to simulate the actual light emission. This level of detail is what makes a wallpaper feel like a premium piece of art rather than a simple screenshot.</p>

      <p>Check out the new <strong>Frieren</strong> category in the gallery now and let me know on TikTok which scene I should upscale next!</p>
    `
  },
  {
    slug: 'attack-on-titan-final-season-visuals',
    title: 'Attack on Titan: The Final Season\'s Cinematic Brutality',
    excerpt: 'MAPPA took over the reigns for the final season and brought a darker, more cinematic look to the series. Here is how I edit Eren and Mikasa to match.',
    date: '2026-01-31',
    author: 'Only_dias',
    tags: ['Attack on Titan', 'Eren Yeager', 'MAPPA', 'Cinematic'],
    content: `
      <h2>A Gritty New Era</h2>
      <p>When WIT Studio handed the keys to MAPPA for the final season of <em>Attack on Titan</em>, the visual language of the show changed overnight. We went from the vibrant, high-saturation colors of the early seasons to a desaturated, gritty, and almost rotoscoped feel. As a wallpaper creator, this was a massive opportunity to experiment with <strong>Cinematic Grime</strong>.</p>
      
      <div class="my-8 relative w-full aspect-video rounded-lg overflow-hidden border-2 border-orange-900/50 shadow-[0_0_20px_rgba(69,10,10,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769173647/oboi.4k_threadsmate.com_1769173491_yyx0po.webp" alt="Attack on Titan Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Lighting the Rumbling</h2>
      <p>The Final Season is heavy on atmospheric effects. There is smoke, ash, and fire in almost every frame. To capture this in a 4K wallpaper, I avoid making the image "clean." Instead, I lean into the texture. I add a subtle <strong>Grain Layer</strong> in Photoshop to match MAPPA's digital film look. It prevents the flat colors from looking banding on low-quality screens and adds a "weight" to the image.</p>
      
      <p>For Eren's "Freedom" scene, I focused heavily on the sky. I used a <strong>Gradient Map</strong> to shift the bright highlights from pure white to a sickly, pale yellow, which emphasizes the apocalyptic nature of the scene. I also masked out Eren's silhouette and applied a slight <strong>Outer Glow</strong> with a dark red hue to simulate the heat of the Titans below him. This level of environmental storytelling is what I aim for in every drop.</p>

      <h2>The Scouting Legion's New Gear</h2>
      <p>Mikasa and the Scouts got a major design overhaul with their black anti-personnel gear. Black is notoriously hard to edit because it can easily lose all detail and become a "black hole" on your screen. I use <strong>Levels adjustments</strong> to specifically lift the midtones of the suits, bringing out the metallic sheen of the ODM gear and the leather straps. This ensures that even on a dark wallpaper, you can see every piece of equipment they are carrying.</p>
    `
  },
  {
    slug: 'rintaro-tsumugi-kaoru-hana',
    title: 'Rintaro Tsumugi: The Gentle Giant Aesthetic',
    excerpt: 'Kaoru Hana wa Rin to Saku has some of the most wholesome and beautiful art in modern manga. Here is how I edit Rintaro.',
    date: '2026-01-30',
    author: 'Only_dias',
    tags: ['Kaoru Hana', 'Rintaro', 'Romance', 'Wholesome'],
    content: `
      <h2>The Fragrance of a Flower</h2>
      <p>If you haven't read <em>Kaoru Hana wa Rin to Saku</em> (The Fragrant Flower Blooms with Dignity), you are missing out on some of the most expressive and beautiful character art in the manga world. Rintaro Tsumugi, with his dyed hair and "scary" face, is actually the most wholesome protagonist I've ever edited. The mangaka, Mikami Saka, has a way of drawing eyes that convey a world of emotion with just a few ink lines.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-purple-400/50 shadow-[0_0_20px_rgba(192,132,252,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769184762/1_giyu6z.jpg" alt="Rintaro Tsumugi Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Turning Manga into Digital Art</h2>
      <p>Since the source material is manga, my initial "RAW" is usually black and white. For this collection, I wanted to create something that felt like a <strong>Limited Edition Cover</strong>. I started by using the <strong>Pen Tool</strong> to meticulously isolate Rintaro from the background. This is the most time-consuming part, but it allows for complete control over the colors.</p>
      
      <p>I lean into a <strong>Pastel Purple and Soft Gold</strong> color palette for Rintaro. These colors represent the two schools in the story and the contrast between Rintaro's "tough" exterior and his soft heart. I use a <strong>Gradient Map</strong> set to deep navy for shadows and warm cream for highlights. This "Tea-Stained" look makes the digital wallpaper feel like a physical, high-quality manga page. I also add a subtle "Canvas" texture overlay to give it a physical weight. It’s a very different vibe from my usual neon-heavy edits, but it fits the gentle soul of the series perfectly.</p>

      <p>Rintaro's wallpapers are perfect for when you want a "cool" look that still feels warm and inviting. Check out the full collection in the gallery!</p>
    `
  },
  {
    slug: 'how-i-make-viral-anime-edits',
    title: 'How I Make My Viral Anime Edits: The Complete 2026 Guide',
    excerpt: 'An exhaustive look at my editing workflow using Adobe Photoshop, After Effects, and Canva to create the content you see on @noxzx_kb.',
    date: '2026-01-22',
    author: 'Only_dias',
    tags: ['Tutorial', 'TikTok', 'Editing', 'Photoshop'],
    content: `
      <h2>The Secret Sauce of a Viral Edit</h2>
      <p>Ever wondered how I create those smooth anime edits and high-fidelity static artwork you see on my TikTok channel? It's a question I get hundreds of times every week. People think it's just about slapping a filter on an image, but the reality is much more technical. It's about a combination of <strong>composition</strong>, <strong>AI-assisted upscaling</strong>, and <strong>manual color grading</strong>.</p>

      <h2>Phase 1: Sourcing the "Raw" Material</h2>
      <p>The biggest mistake new editors make is starting with a low-quality source. If you download a clip from YouTube or another TikTok, it's already been compressed multiple times. When you try to add effects, the image will break into "pixels" or "blocks."</p>
      
      <p>I always start by hunting for <strong>Blu-ray RAWs</strong>. These are original, uncompressed files directly from the Japanese releases. They don't have subtitles, and the bitrate is high enough that we can push the colors to the extreme without losing quality. I use a tool called <em>VLC Media Player</em> to take high-quality frame captures at the exact millisecond I want.</p>

      <h2>Phase 2: The AI Upscaling Revolution</h2>
      <p>Screens are getting bigger and sharper. A standard 1080p frame from an anime will look slightly blurry on a 4K monitor. That's why every wallpaper on "Only_dias Ocean" goes through an <strong>AI Upscaling pipeline</strong>.</p>
      
      <p>I use a tool called <strong>Topaz Photo AI</strong>. I set it to the "Anime" model, which is specifically trained to recognize line art and flat colors. This tool removes the "noise" (those little static-looking dots) and fills in the gaps to create a crisp 3840x2160 image. This is the difference between a "good" wallpaper and a "pro" wallpaper.</p>

      <h2>Phase 3: Deep Color Grading in Photoshop</h2>
      <p>Once the image is 4K, it's time for the artistic part. I bring the file into Adobe Photoshop. My goal isn't just to make the anime look "better," it's to give it the <strong>Only_dias signature look</strong>: Deep blacks, vibrant cyans, and neon glows.</p>

      <h3>The "Curve" Strategy</h3>
      <p>I always start with a <strong>Curves Adjustment Layer</strong>. I create an "S-Curve" by slightly dropping the shadows and raising the highlights. This adds "depth" to the image. For characters like Gojo or Sukuna, I "crush" the blacks (moving the bottom left point to the right) to make the image feel more intense and moody.</p>

      <h3>Glow and Lighting</h3>
      <p>To make eyes or magic effects glow, I use this specific technique:</p>
      <ol>
        <li>Create a new empty layer.</li>
        <li>Set the blending mode to <strong>"Linear Dodge (Add)"</strong>.</li>
        <li>Use a soft brush (0% hardness) with a very low opacity (10-20%).</li>
        <li>Gently tap the areas you want to glow.</li>
      </ol>
      <p>This adds a realistic "Bloom" that makes it look like the light is actually coming from inside your screen.</p>

      <h2>Phase 4: Finalizing in Canva</h2>
      <p>Wait, Canva? Yes! While Photoshop is for the heavy lifting, I use Canva for the finishing touches, especially when I'm making <strong>Matching PFPs</strong> or social media thumbnails. Canva's typography engine is much faster for quickly testing out different font styles. It allows me to create consistent branding for my TikTok channel while maintaining the 4K quality I developed in Photoshop.</p>

      <h2>Conclusion: Practice makes Perfect</h2>
      <p>My first edits were terrible. They were oversaturated, blurry, and messy. But by understanding the relationship between source quality and post-processing, I was able to build a channel and a community. This website is my way of giving back to you guys. Every download helps me continue making these tutorials and collections.</p>

      <p>Want to see a specific tutorial? Head over to my <a href="/contact">Contact Page</a> or send me a message on TikTok!</p>
    `
  },
  {
    slug: 'zero-two-aesthetic-icons',
    title: 'Why Zero Two is Still the Queen of Aesthetics',
    excerpt: 'Years later, Zero Two remains the undefeated champion of anime wallpapers. Here is a deep dive into my editing process for the pink-haired icon.',
    date: '2026-01-30',
    author: 'Only_dias',
    tags: ['Zero Two', 'Darling in the Franxx', 'Waifu', 'Pink'],
    content: `
      <h2>The Character Design That Defined a Generation</h2>
      <p>It’s honestly wild to think that <em>Darling in the Franxx</em> aired years ago, yet Zero Two is still the most requested character on my TikTok. Why? Because her design is aesthetically perfect. The pastel pink hair, the sharp red horns, and the white military uniform create a color palette that just works.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-neon-pink/50 shadow-[0_0_20px_rgba(255,42,109,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1767958378/wallpapers/Zero%20Two/3%20%282%29.jpg" alt="Zero Two Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>My "Vaporwave" Editing Workflow</h2>
      <p>When I open a Zero Two file in Photoshop, I immediately reach for the "Vaporwave" aesthetic. Her pink hair naturally lends itself to cyan and purple accents.</p>
      <p>For the wallpaper featured above, I actually cut her out of the original scene completely. I placed her against a custom-made glitch texture. To marry the two images together, I used a "Gradient Map" adjustment layer set to Pink/Blue at 20% opacity. This tints the shadows blue and the highlights pink, making her feel like she belongs in that digital space.</p>
      
      <p>I also add a tiny bit of <strong>Chromatic Aberration</strong> (shifting the Red and Blue channels by 2 pixels) to the edges of her silhouette. It gives the image a retro, CRT monitor feel that fits the "Darling" vibe perfectly.</p>
    `
  },
  {
    slug: 'marin-kitagawa-cosplay-queen',
    title: 'Marin Kitagawa: Capturing the Ultimate Gyaru Energy',
    excerpt: 'Marin brings a unique vibrant energy to any screen. Here is how I color grade her wallpapers to match her sunny personality.',
    date: '2026-01-29',
    author: 'Only_dias',
    tags: ['Marin Kitagawa', 'My Dress-Up Darling', 'Gyaru', 'Vibrant'],
    content: `
      <h2>More Than Just a Pretty Face</h2>
      <p>Marin Kitagawa hit the anime community like a truck. It wasn't just the fan service; it was her genuine passion and expressive animation. CloverWorks went absolutely unmatched with the detail in her eyes and hair.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-yellow-400/50 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1767958120/wallpapers/Marin%20kitagawa/5.jpg" alt="Marin Kitagawa Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>The "Golden Hour" Color Grade</h2>
      <p>Most of my edits are dark and moody, but for Marin, that feels wrong. She radiates positivity. My color grading strategy for her revolves around <strong>Warmth</strong>.</p>
      <p>I start by boosting the Vibrance slider to +30. Then, I go into the "Selective Color" tool and tweak the Yellows. I push the Magenta slider in the Yellows to make her blonde hair look rich and golden rather than washed-out lemon yellow.</p>
      <p>Finally, I add a subtle lens flare overlay in the top corner set to "Screen" mode. It mimics the look of a camera lens catching the sun, emphasizing her role as a cosplayer always in front of the camera.</p>
    `
  },
  {
    slug: 'jujutsu-kaisen-gojo-satoru',
    title: 'The Honored One: A Deep Dive into Editing Gojo Satoru',
    excerpt: 'He is the strongest, and his eyes are the hardest to animate—and to edit. Breaking down my JJK collection.',
    date: '2026-01-28',
    author: 'Only_dias',
    tags: ['JJK', 'Gojo Satoru', 'Eyes', 'Blue'],
    content: `
      <h2>Those Six Eyes</h2>
      <p>Let's be honest: Gojo Satoru's eyes are probably the most expensive thing MAPPA has ever animated. The detail in the iris—the crystalline structure, the glowing blue—is iconic. As an editor, my number one job is: <strong>Don't ruin the eyes.</strong></p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769542266/9_ysxuup.jpg" alt="Gojo Satoru Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>The "Infinite" Edit Technique</h2>
      <p>For Gojo wallpapers, I focus purely on <strong>Contrast</strong>. His Limitless technique is essentially a void, so I crush the blacks in the background until they are true #000000. This looks incredible on AMOLED phones.</p>
      <p>To make his technique "glow," I use a brush set to 0% hardness with a bright electric blue color. I paint over his finger or eyes on a new layer and set the blending mode to <strong>Linear Dodge (Add)</strong>. This creates that intense, over-exposed light effect that makes it look like real energy is coming off the screen.</p>
    `
  },
  {
    slug: 'akane-kurokawa-acting-genius',
    title: 'Akane Kurokawa: The Method Actor\'s Gaze',
    excerpt: 'Akane is a character defined by her intensity. Here is how I edit her to reflect her "Star Eyes" moments.',
    date: '2026-01-27',
    author: 'Only_dias',
    tags: ['Oshi no Ko', 'Akane', 'Blue', 'Acting'],
    content: `
      <h2>The Shift in Demeanor</h2>
      <p>One of the most chilling scenes in <em>Oshi no Ko</em> is when Akane perfectly mimics Ai. The animation shifts, the sound drops out, and her eyes change. That specific moment is what I tried to capture in this collection.</p>
      
      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1767957585/wallpapers/Akane%20Kurokawa/6.jpg" alt="Akane Kurokawa Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Color Theory: The Intellectual Blue</h2>
      <p>While Ruby is red and Ai is purple, Akane represents a deep, intellectual blue. When editing her, I use "Cool" temperature filters (moving the slider towards Blue/Cyan) to emphasize her calm and analytical nature.</p>
      <p>For the "Star Eyes" effect specifically, I use a trick: I duplicate the eye layer, set it to "Overlay", and apply a Gaussian Blur. This creates a soft halo around the star pattern in her iris without losing the sharp edges of the star itself. It's a small detail, but it makes the eyes piercing.</p>
    `
  },
  {
    slug: 'chisato-nishikigi-lycoris-recoil',
    title: 'Chisato Nishikigi: The Art of Lethal Elegance',
    excerpt: 'Chisato\'s red uniform against urban backgrounds creates a stunning visual contrast. Breaking down my Lycoris Recoil edits.',
    date: '2026-01-26',
    author: 'Only_dias',
    tags: ['Lycoris Recoil', 'Chisato', 'Action', 'Red'],
    content: `
      <h2>The Strongest Lycoris</h2>
      <p>Chisato is such a fun character because she's a paradox: a bubbly, kind-hearted girl who is also the most skilled gunman in Japan. Visually, this is represented by her bright red uniform contrasting with the grey, tactical environments she fights in.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769040229/wallpapers/Chisato%20Nishikigi/1.jpg" alt="Chisato Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Capturing Kinetic Energy</h2>
      <p>The animation in <em>Lycoris Recoil</em> (courtesy of A-1 Pictures) is incredibly fluid, especially how Chisato dodges bullets. A static wallpaper can't move, so how do you convey speed?</p>
      <p>I use <strong>Motion Blur</strong>. I duplicate the character, apply a directional blur in the direction she's moving, and lower the opacity to about 15%. This creates a "ghosting" effect that makes it look like she just snapped into that pose. Combined with her signature red ribbon flowing in the wind, it makes for a very dynamic lock screen.</p>
    `
  },
  {
    slug: 'chainsaw-man-denji-chaos',
    title: 'Chainsaw Man: Embracing the Gritty Film Look',
    excerpt: 'MAPPA gave Chainsaw Man a cinematic feel. Here is how I enhance that grit and gore for high-resolution displays.',
    date: '2026-01-25',
    author: 'Only_dias',
    tags: ['Chainsaw Man', 'Denji', 'Dark', 'Action'],
    content: `
      <h2>Raw, Dirty, and Beautiful</h2>
      <p>Chainsaw Man is unlike any other Shonen. It's gritty, dirty, and loud. MAPPA approached the adaptation with a distinct "cinema" style—framing shots like movies and adding a subtle film grain over everything.</p>

      <div class="my-8 relative w-full aspect-video rounded-lg overflow-hidden border-2 border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769187347/oboi.4k_threadsmate.com_1769174793_hyn2wc.webp" alt="Chainsaw Man Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>The Orange Glow Technique</h2>
      <p>The color of this show is undoubtedly <strong>Orange</strong>—from Pochita to the blood. My editing process for CSM involves a technique called "Split Toning."</p>
      <p>I push the Highlights towards Orange/Teal and the Shadows towards a dark, muddy Green. This replicates the color grading used in many gritty thriller movies. I also <em>add</em> noise. Yes, usually I remove noise, but for Chainsaw Man, adding a monochromatic noise layer at 3% opacity ties the whole image together and stops it from looking "too clean" or plastic.</p>
    `
  },
  {
    slug: 'alya-kujou-russian-beauty',
    title: 'Alya Kujou: The Silver-Haired Standard',
    excerpt: 'Roshidere\'s Alya is arguably the most beautiful character design of the year. Here is how I edit her to look even more pristine.',
    date: '2026-01-24',
    author: 'Only_dias',
    tags: ['Roshidere', 'Alya', 'Romance', 'School'],
    content: `
      <h2>Elegance Personified</h2>
      <p>Alya sometimes hides her feelings in Russian, but her beauty needs no translation. Doga Kobo did an amazing job adapting the light novel art style, giving her hair a shimmering, almost translucent quality.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1767957600/wallpapers/Alya%20Kujou/10.jpg" alt="Alya Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Editing for Softness</h2>
      <p>Unlike the gritty action edits, editing Alya requires a delicate touch. If you sharpen her too much, you lose that "angelic" vibe. My focus here is on <strong>lighting</strong>.</p>
      <p>I use a "Soft Light" brush with a pale cyan color to paint highlights on her hair and eyes. This mimics the "Bloom" effect seen in modern video games. I also brighten the whites of her uniform to make them pop against the background, ensuring she always looks like the brightest thing on the screen.</p>
    `
  },
  {
    slug: 'spider-man-across-the-spider-verse',
    title: 'Spider-Man: Across the Digital Art Style',
    excerpt: 'The Spider-Verse movies changed animation forever. Here is how I upscale these images without destroying the comic book texture.',
    date: '2026-01-23',
    author: 'Only_dias',
    tags: ['Spider-Man', 'Marvel', 'Art Style', 'Comic'],
    content: `
      <h2>A Living Comic Book</h2>
      <p>The Spider-Verse movies are a visual overload in the best way possible. The mix of 2D and 3D, the Ben-Day dots, the chromatic aberration, and the frame-rate shifts (animating on twos) make every single frame a potential wallpaper.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769187889/oboi.4k_threadsmate.com_1769187847_lntqv1.webp" alt="Spider-Man Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>The Upscaling Nightmare</h2>
      <p>Here's the problem: AI upscalers hate Ben-Day dots. They try to smooth them out, which ruins the Spider-Verse look. To fix this, I use a very specific workflow.</p>
      <p>I upscale the image, but I also keep the original low-res version. I put the original on top and set it to "Luminosity" blending mode. This brings back the original dot texture and ink lines while keeping the sharp edges of the upscaled version underneath. It’s a tedious process, but it’s the only way to get a 4K Spider-Man wallpaper that actually looks like the movie.</p>
    `
  },
  {
    slug: 'demon-slayer-breathing-styles',
    title: 'Demon Slayer: The Art of Breathing Styles',
    excerpt: 'Ufotable\'s particle effects are legendary. Breaking down how I enhance the Water and Sun breathing effects.',
    date: '2026-01-22',
    author: 'Only_dias',
    tags: ['Demon Slayer', 'Tanjiro', 'Effects', 'Animation'],
    content: `
      <h2>Ufotable's Mastery</h2>
      <p>Demon Slayer is famous for its "Ukiyoe" style effects. The water dragons and fire trails are visually distinct from the 3D environments, creating a unique composite look. When Tanjiro swings his sword, it's not just a blur; it's a painting.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-blue-400/50 shadow-[0_0_20px_rgba(96,165,250,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769542652/1_qtxlyv.jpg" alt="Demon Slayer Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Enhancing the Elements</h2>
      <p>My goal with Demon Slayer wallpapers is to make the breathing styles look <strong>hot</strong> or <strong>wet</strong>. For Sun Breathing, I boost the saturation of the oranges and add a subtle "Outer Glow" layer style to the flames.</p>
      <p>For Water Breathing (like the wallpaper above), I actually increase the contrast significantly. This makes the white foam of the waves stand out sharply against the dark blue water, making the Ukiyoe art style pop even more. It looks incredibly crisp on high-PPI mobile displays.</p>
    `
  },
  {
    slug: 'makima-chainsaw-man-control',
    title: 'Makima: The Art of Control',
    excerpt: 'Makima is terrifying and mesmerizing. Here is how I edit the Control Devil to capture her unsettling presence.',
    date: '2026-01-17',
    author: 'Only_dias',
    tags: ['Chainsaw Man', 'Makima', 'Horror', 'Eyes'],
    content: `
      <h2>The Look That Pierces Through You</h2>
      <p>Makima is one of the most effectively designed antagonists in recent memory. It’s all in the eyes—those golden rings that seem to look right through the screen. When I edit Makima, my entire goal is to make the viewer feel... observed.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-red-800/50 shadow-[0_0_20px_rgba(153,27,27,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769187347/oboi.4k_threadsmate.com_1769174793_hyn2wc.webp" alt="Makima Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Desaturation and Red</h2>
      <p>My color palette for Makima is extremely strict: Black, White, and Deep Red. I usually desaturate the entire background to grayscale, leaving only Makima’s hair and tie in color. This "Selective Color" technique is a classic, but it works so well here because it isolates her as the only "living" thing in the frame.</p>
      <p>I also add a subtle "film scratch" overlay. Unlike the grainy noise I use for Denji, Makima gets clean, sharp scratches, representing the calculated, precise nature of her control.</p>
    `
  },
  {
    slug: 'luffy-gear-5-joyboy',
    title: 'Luffy Gear 5: The Drums of Liberation',
    excerpt: 'Editing the most cartoony transformation in anime history. How to handle the pure white aesthetic.',
    date: '2026-01-13',
    author: 'Only_dias',
    tags: ['One Piece', 'Luffy', 'Gear 5', 'White'],
    content: `
      <h2>Animation Freedom</h2>
      <p>Gear 5 broke the internet. It also broke the rules of anime art styles. The looney-tunes squashing and stretching, the pure white color palette, and the purple aura are totally unique.</p>

      <div class="my-8 relative w-full aspect-video rounded-lg overflow-hidden border-2 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769187204/oboi.4k_threadsmate.com_1769187172_d71lwl.webp" alt="Luffy Gear 5 Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>The White Balance Challenge</h2>
      <p>When a character is all white, they can easily look flat. I use "Gradient Overlays" to add subtle color variation to his white form. I map the shadows to a very light purple and the highlights to a pale yellow.</p>
      <p>This adds dimension to his clouds and hair without changing the iconic white look. For the background, I usually go dark and stormy to create maximum contrast with his bright form.</p>
    `
  },
  {
    slug: 'mikasa-ackerman-titan-slayer',
    title: 'Mikasa Ackerman: Strength and Loyalty',
    excerpt: 'The scarf, the blades, the stare. Capturing the intensity of Attack on Titan\'s best soldier.',
    date: '2026-01-12',
    author: 'Only_dias',
    tags: ['Attack on Titan', 'Mikasa', 'Scarf', 'Dark'],
    content: `
      <h2>The Last Stand</h2>
      <p>Mikasa is iconic. Her red scarf is the only splash of color in the drab, brown/grey military uniform of the Scouts. That scarf is the centerpiece of almost every Mikasa edit I make.</p>

      <div class="my-8 relative w-full aspect-[9/16] max-w-sm mx-auto rounded-lg overflow-hidden border-2 border-red-700/50 shadow-[0_0_20px_rgba(185,28,28,0.3)]">
        <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769173649/oboi.4k_threadsmate.com_1769173489_po3jnj.webp" alt="Mikasa Wallpaper" class="object-cover w-full h-full" />
      </div>

      <h2>Grime and Texture</h2>
      <p>Attack on Titan is a dirty world. Characters are covered in dust, blood, and steam. I don't airbrush Mikasa's face to be perfect porcelain. I enhance the grime.</p>
      <p>I use a "Sharpen" filter on her ODM gear to make the metal look cold and hard, and I add a smoke texture overlay to simulate the steam from the titan kills. It makes the wallpaper feel like a freeze-frame from a battle.</p>
    `
  }
];

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}