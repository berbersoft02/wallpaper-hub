export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark-bg gap-6">
      <div className="font-pixel text-4xl text-neon-cyan animate-pulse tracking-widest">
        LOADING<span className="text-neon-pink">...</span>
      </div>
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="block w-3 h-3 bg-neon-cyan rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="font-body text-gray-500 text-sm tracking-widest uppercase">
        Only_Gohan Ocean
      </p>
    </div>
  );
}
