import Image from "next/image";

interface AnimatedBackgroundProps {
  images?: number[];
}

export default function AnimatedBackground({ images: propImages }: AnimatedBackgroundProps) {
  // Use provided images or fallback to a subset of 20
  const images = propImages || Array.from({ length: 20 }, (_, i) => i + 1);
  
  // Animation types to cycle through - reduced from 8 to 4 for better GPU performance
  const animations = [
    'float-random-1',
    'float-random-2',
    'float-random-3',
    'float-random-4'
  ];
  
  // Durations for each animation
  const durations = [15, 18, 20, 16];
  
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/60 via-dark-bg/40 to-dark-bg/60 z-10"></div>
      
      {/* All anime images scattered across the screen */}
      {images.map((num, index) => {
        const animIndex = index % animations.length;
        const delay = (index * 0.3) % 3; // Stagger delays
        const top = (index * 15.5) % 100; // Distribute vertically - adjusted for 20 icons
        const left = (index * 21.3) % 100; // Distribute horizontally - adjusted for 20 icons
        const size = 12 + (index % 4) * 2; // Vary sizes (12-18px)
        const opacity = 0.4 + (index % 10) * 0.01; // Vary opacity (0.4-0.5)
        
        return (
          <div
            key={`${num}-${index}`}
            className="absolute transition-opacity duration-500 z-5 will-change-transform"
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
              alt=""
              width={64}
              height={64}
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
              sizes="(max-width: 768px) 36px, 64px"
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
