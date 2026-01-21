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
    slug: 'how-i-make-viral-anime-edits',
    title: 'How I Make My Viral Anime Edits for TikTok',
    excerpt: 'A behind-the-scenes look at my editing workflow using Adobe Photoshop and Canva to create the content you see on @noxzx_kb.',
    date: '2026-01-22',
    author: 'Only_dias',
    tags: ['Tutorial', 'TikTok', 'Editing', 'Photoshop'],
    content: `
      <h2>My Editing Secret Sauce</h2>
      <p>Ever wondered how I create the smooth anime edits and static artwork you see on my TikTok channel? It's not just about slapping a filter on an image. It's about composition, color grading, and finding the perfect scene.</p>

      <h2>The Tools I Use</h2>
      <p>My workflow relies heavily on two main tools:</p>
      <ul>
        <li><strong>Adobe Photoshop:</strong> This is where the magic happens for high-quality upscaling, background removal, and complex color adjustments. I use it to clean up raw anime screenshots and turn them into 4K masterpieces.</li>
        <li><strong>Canva:</strong> Believe it or not, Canva is amazing for quick layouts and adding typography. When I'm making PFP sets or promotional thumbnails for the site, Canva speeds up my workflow significantly.</li>
      </ul>

      <h2>From Screenshot to Wallpaper</h2>
      <p>I start by hunting for high-quality RAW anime episodes. Once I find a frame I like, I take a screenshot and bring it into Photoshop. I use AI upscaling to get it to 4K resolution, then I manually fix any artifacts. Finally, I add my signature neon glow effects that you all know and love.</p>

      <h2>Want to Learn More?</h2>
      <p>Follow me on TikTok <a href="https://www.tiktok.com/@noxzx_kb" target="_blank">@noxzx_kb</a> for quick tutorials and speed edits!</p>
    `
  },
  {
    slug: 'best-matching-pfps-made-with-canva',
    title: 'Creating the Best Matching Anime PFPs',
    excerpt: 'How I design unique matching profile pictures for couples and besties using Canva and Photoshop.',
    date: '2026-01-20',
    author: 'Only_dias',
    tags: ['PFPs', 'Icons', 'Design', 'Canva'],
    content: `
      <h2>Why Matching PFPs?</h2>
      <p>Matching profile pictures (PFPs) are the ultimate way to show your bond with your duo, whether it's your gaming partner or your significant other. On my channel, the "Matching Icons" videos are some of the most requested content.</p>

      <h2>The Design Process</h2>
      <p>Creating a good matching set isn't just about cutting an image in half. I look for scenes where characters are interacting—looking at each other, holding hands, or fighting back-to-back.</p>
      
      <h3>Step-by-Step:</h3>
      <ol>
        <li><strong>Selection:</strong> I find a wide shot containing two characters.</li>
        <li><strong>Crop & Center:</strong> using Photoshop, I crop the image into two perfect squares (1:1 ratio).</li>
        <li><strong>Color Matching:</strong> I use Canva to ensure the color grading matches perfectly between both icons so they look cohesive on your discord or TikTok profiles.</li>
        <li><strong>Enhancement:</strong> I sharpen the eyes and boost the saturation to make them pop on small mobile screens.</li>
      </ol>

      <h2>Download My Collection</h2>
      <p>You don't need to make them yourself! I've uploaded my best creations to the <a href="/icons">Icons & PFPs</a> section of this site. Go check them out!</p>
    `
  },
  {
    slug: 'exclusive-4k-wallpapers-drop',
    title: 'Exclusive 4K Wallpapers: Behind the Scenes',
    excerpt: 'The story behind the latest "Only_dias" wallpaper drop and how I choose the characters for my next project.',
    date: '2026-01-18',
    author: 'Only_dias',
    tags: ['Wallpapers', '4K', 'Update', 'Anime'],
    content: `
      <h2>Quality Over Quantity</h2>
      <p>My goal with <strong>Only_dias Ocean</strong> is to provide the highest quality anime wallpapers on the internet. I'm tired of seeing blurry, pixelated JPEGs. That's why every single image on this site is manually curated and upscaled.</p>

      <h2>Requesting Characters</h2>
      <p>I read all your comments on TikTok! The latest addition of <em>Rias Gremory</em> and <em>Zero Two</em> came directly from your suggestions. I look for characters that have a strong aesthetic and fit the "Neon/Dark" vibe of the website.</p>

      <h2>What's Next?</h2>
      <p>I'm currently working on a new "Live Wallpapers" collection featuring animated loops made in After Effects. Stay tuned to the channel for the release announcement!</p>
    `
  }
];

export function getAllPosts(): BlogPost[] {
  return blogPosts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}