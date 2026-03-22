"use client";

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button'; // Assuming you have a Button component from shadcn/ui
import { cn } from '@/lib/utils'; // Assuming you have a utility for class names

// --- TYPES ---
interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  subtitle?: string;
  images: { src: string; alt: string; }[];
}

// --- HERO SECTION COMPONENT ---
export const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ title, subtitle, images, className, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(Math.floor(images.length / 2));

    const handleNext = React.useCallback(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, [images.length]);

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };
    
    React.useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 4000);
        return () => clearInterval(timer);
    }, [handleNext]);

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full flex flex-col items-center justify-center overflow-x-hidden bg-transparent text-white p-4',
          className
        )}
        {...props}
      >
        {/* Content */}
        <div className="z-10 flex w-full flex-col items-center text-center space-y-8 md:space-y-12">
          {/* Header Section */}
          {(title || subtitle) && (
            <div className="space-y-4">
              {title && <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter max-w-4xl">
                {title}
              </h1>}
              {subtitle && <p className="max-w-2xl mx-auto text-gray-400 md:text-xl">
                {subtitle}
              </p>}
            </div>
          )}

          {/* Main Showcase Section */}
          <div className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center">
            {/* Carousel Wrapper */}
            <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
              {images.map((image, index) => {
                const offset = index - currentIndex;
                const total = images.length;
                let pos = (offset + total) % total;
                if (pos > Math.floor(total / 2)) {
                  pos = pos - total;
                }

                const isCenter = pos === 0;
                const isAdjacent = Math.abs(pos) === 1;
                const isFar = Math.abs(pos) === 2;

                return (
                  <div
                    key={index}
                    className={cn(
                      'absolute w-48 h-80 md:w-64 md:h-[400px] transition-all duration-500 ease-in-out',
                      'flex items-center justify-center rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(5,217,232,0.3)]'
                    )}
                    style={{
                      transform: `
                        translateX(${(pos) * 55}%) 
                        scale(${isCenter ? 1 : isAdjacent ? 0.8 : isFar ? 0.6 : 0.4})
                        rotateY(${(pos) * -20}deg)
                        translateZ(${Math.abs(pos) * -100}px)
                      `,
                      zIndex: 10 - Math.abs(pos),
                      opacity: Math.abs(pos) > 2 ? 0 : isCenter ? 1 : isAdjacent ? 0.6 : 0.3,
                      filter: isCenter ? 'blur(0px)' : `blur(${Math.abs(pos) * 2}px)`,
                      visibility: Math.abs(pos) > 2 ? 'hidden' : 'visible',
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="object-cover w-full h-full border-2 border-neon-cyan/50"
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-2 sm:left-12 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 z-20 bg-dark-bg/80 border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-dark-bg transition-colors shadow-[0_0_15px_rgba(5,217,232,0.5)]"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 z-20 bg-dark-bg/80 border-neon-pink/50 text-neon-pink hover:bg-neon-pink hover:text-dark-bg transition-colors shadow-[0_0_15px_rgba(255,42,109,0.5)]"
              onClick={handleNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

HeroSection.displayName = 'HeroSection';
