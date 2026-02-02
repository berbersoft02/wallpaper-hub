import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-dark-bg text-white font-body">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 py-20">
        <h1 className="font-pixel text-4xl md:text-6xl text-neon-cyan mb-12 text-center drop-shadow-[0_0_24px_rgba(5,217,232,0.8)]">
          ABOUT THE <span className="text-neon-pink">OCEAN</span>
        </h1>

        <div className="space-y-16">
          {/* Section 1: The Vision */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-pixel text-3xl text-neon-pink">The Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Only_dias Ocean was born out of a simple frustration: the lack of truly high-quality, curated anime wallpapers. While the internet is full of "wallpaper dump" sites, most are cluttered with low-resolution images, watermarks, and poor compositions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Our mission is to provide a premium, boutique experience for anime fans. Every single image on this site has been manually selected, upscaled to 4K resolution using professional AI tools, and color-graded to ensure it looks stunning on modern high-refresh-rate monitors and mobile screens.
              </p>
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-neon-cyan/30 shadow-[0_0_32px_rgba(5,217,232,0.2)]">
              <img src="https://res.cloudinary.com/dg8hzm1fp/image/upload/v1769685652/1_ytpmf9.webp" alt="Aesthetic Scenery" className="object-cover w-full h-full" />
            </div>
          </section>

          {/* Section 2: The Creator */}
          <section className="bg-card-bg p-8 md:p-12 rounded-3xl border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-pink/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="font-pixel text-3xl text-neon-cyan text-center">Meet the Editor</h2>
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <p className="text-gray-300 text-lg">
                  I'm a 23-year-old engineer with a deep passion for digital art and programming. By day, I solve complex engineering problems; by night, I dive into the world of anime editing and web development.
                </p>
                <p className="text-gray-300 text-lg">
                  I've always been fascinated by how color and light can change the mood of a scene. This fascination led me to start my TikTok channel, <strong>@noxzx_kb</strong>, where I share my editing process and speed-edits with over thousands of followers. Only_dias Ocean is the natural extension of that community—a place where you can finally download the art you see in my videos.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Information & Quality */}
          <section className="space-y-8">
            <h2 className="font-pixel text-3xl text-white text-center underline decoration-neon-pink underline-offset-8">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-dark-bg/50 border border-gray-800 rounded-xl hover:border-neon-cyan transition-colors group">
                <h3 className="font-pixel text-xl text-neon-cyan mb-3 group-hover:drop-shadow-[0_0_8px_rgba(5,217,232,0.5)]">1. Curating</h3>
                <p className="text-gray-400 text-sm">We hunt for the most iconic and visually striking frames from the latest anime episodes and classic films.</p>
              </div>
              <div className="p-6 bg-dark-bg/50 border border-gray-800 rounded-xl hover:border-neon-pink transition-colors group">
                <h3 className="font-pixel text-xl text-neon-pink mb-3 group-hover:drop-shadow-[0_0_8px_rgba(255,42,109,0.5)]">2. Enhancing</h3>
                <p className="text-gray-400 text-sm">Using Adobe Photoshop and Topaz AI, we upscale images to 4K, remove artifacts, and sharpen every detail.</p>
              </div>
              <div className="p-6 bg-dark-bg/50 border border-gray-800 rounded-xl hover:border-neon-purple transition-colors group">
                <h3 className="font-pixel text-xl text-neon-purple mb-3 group-hover:drop-shadow-[0_0_8px_rgba(211,0,197,0.5)]">3. Finalizing</h3>
                <p className="text-gray-400 text-sm">We apply a custom color grade to match our signature "Neon Ocean" aesthetic before uploading.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Informative Content */}
          <section className="bg-neon-cyan/5 border-2 border-dashed border-neon-cyan/20 p-8 rounded-2xl text-center">
            <h2 className="font-pixel text-2xl text-neon-cyan mb-4">Why inform the user?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              We believe a wallpaper site should be more than just a gallery. That's why we produce in-depth articles on our <a href="/blog" className="text-neon-pink underline">blog</a> about character design, color theory, and technical guides on how to make your own edits. We are here to inspire the next generation of anime creators.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
