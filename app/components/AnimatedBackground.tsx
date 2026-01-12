import Image from "next/image";

export default function AnimatedBackground() {
  const images = Array.from({ length: 60 }, (_, i) => i + 1);
  
  // Animation types to cycle through
  const animations = [
    'float-random-1',
    'float-random-2',
    'float-random-3',
    'float-random-4',
    'float-random-5',
    'float-random-6',
    'float-random-7',
    'float-random-8'
  ];
  
  // Durations for each animation
  const durations = [15, 18, 20, 16, 19, 17, 21, 14];
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-dark-bg/40 to-dark-bg/60 z-10"></div>
      
      {/* All anime images scattered across the screen */}
      {images.map((num, index) => {
        const animIndex = index % animations.length;
        const delay = (index * 0.3) % 3; // Stagger delays
        const top = (index * 7.5) % 100; // Distribute vertically
        const left = (index * 11.3) % 100; // Distribute horizontally
        const size = 12 + (index % 4) * 2; // Vary sizes (12-18px) - smaller range
        const mdSize = size + 4; // Desktop size
        const opacity = 0.4 + (index % 15) * 0.01; // Vary opacity (0.4-0.55)
        
        return (
          <div
            key={num}
            className="absolute transition-opacity duration-500 z-5"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size * 3}px`,
              height: `${size * 3}px`,
              opacity: opacity,
              animation: `${animations[animIndex]} ${durations[animIndex]}s ease-in-out ${delay}s infinite`
            }}
          >
            <Image
              src={`/${num}.png`}
              alt={`Anime character ${num}`}
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-full"
              unoptimized
            />
          </div>
        );
      })}
      
      {/* Neon Glow Effects */}
      <div className="absolute top-1/3 right-1/3 w-32 h-32 md:w-48 md:h-48 opacity-20 blur-2xl animate-pulse">
        <div className="w-full h-full bg-neon-pink rounded-full"></div>
      </div>
      <div className="absolute bottom-1/3 left-1/4 w-28 h-28 md:w-40 md:h-40 opacity-18 blur-xl" style={{ animation: 'pulse 2s ease-in-out 1.5s infinite' }}>
        <div className="w-full h-full bg-neon-cyan rounded-full"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-8 z-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(5, 217, 232, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(5, 217, 232, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      ></div>
    </div>
  );
}
