export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg gap-6">
      <div className="font-pixel text-3xl text-neon-purple animate-pulse tracking-widest">
        LOADING WALLPAPERS<span className="text-neon-cyan">...</span>
      </div>
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-3 h-3 bg-neon-purple rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}
