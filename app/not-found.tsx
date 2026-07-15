import Link from "next/link";
import { getAllCharacters, slugify } from "@/lib/utils";

export default function NotFound() {
  const popular = getAllCharacters().slice(0, 4);

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-4 bg-dark-bg text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-cyan/5 to-transparent pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-neon-pink/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-neon-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
        <h1 className="font-pixel text-8xl md:text-9xl text-neon-cyan drop-shadow-[0_0_24px_rgba(5,217,232,0.6)] animate-glow-cyan">
          404
        </h1>

        <h2 className="font-pixel text-2xl md:text-3xl text-white">
          Signal <span className="text-neon-pink">Lost</span>
        </h2>

        <p className="font-body text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
          The page you&apos;re looking for has drifted into the void. It may
          have been moved, renamed, or never existed in this archive.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
          <Link
            href="/"
            className="inline-block bg-neon-cyan hover:bg-neon-cyan/80 text-white font-pixel text-lg px-8 py-3 rounded-full shadow-[0_0_24px_rgba(5,217,232,0.5)] hover:shadow-[0_0_40px_rgba(5,217,232,0.8)] transition-all hover:scale-105"
          >
            ← Back to Home
          </Link>
          <Link
            href="/blog"
            className="inline-block border-2 border-neon-pink text-neon-pink hover:bg-neon-pink hover:text-white font-pixel text-lg px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            Read the Blog
          </Link>
        </div>

        <div className="pt-12">
          <p className="font-pixel text-xs text-gray-500 uppercase tracking-widest mb-4">
            Or explore popular characters
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {popular.map((char) => (
              <Link
                key={char.name}
                href={`/wallpapers/${slugify(char.name)}`}
                className="px-5 py-2 bg-card-bg/60 border border-gray-700 hover:border-neon-purple text-gray-300 hover:text-neon-purple font-pixel text-sm rounded-full transition-all hover:scale-105"
              >
                {char.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
