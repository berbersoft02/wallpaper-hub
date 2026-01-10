"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface DraggableIconProps {
  src: string;
  alt: string;
  initialTop: string;
  initialLeft?: string;
  initialRight?: string;
  initialBottom?: string;
  size: "sm" | "md" | "lg";
  animation: string;
  effect?: string;
  ringColor?: string;
  shadowColor?: string;
}

export default function DraggableIcon({
  src,
  alt,
  initialTop,
  initialLeft,
  initialRight,
  initialBottom,
  size,
  animation,
  effect = "",
  ringColor = "ring-neon-cyan/50",
  shadowColor = "shadow-[0_0_20px_rgba(5,217,232,0.5)]",
}: DraggableIconProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });

  const sizeClasses = {
    sm: "w-12 h-12 md:w-16 md:h-16",
    md: "w-14 h-14 md:w-18 md:h-18",
    lg: "w-16 h-16 md:w-20 md:h-20",
  };

  const imageSizes = {
    sm: 64,
    md: 72,
    lg: 80,
  };

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startPosRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    const touch = e.touches[0];
    startPosRef.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
  };

  // Handle mouse/touch move and up
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setHasMoved(true);
      setPosition({
        x: e.clientX - startPosRef.current.x,
        y: e.clientY - startPosRef.current.y,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      setHasMoved(true);
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - startPosRef.current.x,
        y: touch.clientY - startPosRef.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging]);

  // Calculate initial position style
  const positionStyle: React.CSSProperties = {
    top: initialTop,
    left: initialLeft,
    right: initialRight,
    bottom: initialBottom,
    transform: `translate(${position.x}px, ${position.y}px)`,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging ? 100 : 5,
    // Pause animation when dragging or after moved
    animation: hasMoved ? "none" : animation,
  };

  return (
    <div
      ref={dragRef}
      className={`absolute ${sizeClasses[size]} transition-all duration-100 select-none ${effect}`}
      style={positionStyle}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        width={imageSizes[size]}
        height={imageSizes[size]}
        className={`w-full h-full object-cover rounded-full ${shadowColor} ring-2 ${ringColor} transition-all duration-300 ${
          isDragging 
            ? "scale-125 ring-4 ring-neon-pink shadow-[0_0_40px_rgba(255,42,109,0.8)]" 
            : isHovered 
              ? "scale-110 ring-4" 
              : ""
        }`}
        unoptimized
        draggable={false}
      />
      
      {/* Drag indicator */}
      {isHovered && !isDragging && !hasMoved && (
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-pixel text-neon-cyan whitespace-nowrap animate-pulse">
          Drag me!
        </div>
      )}
    </div>
  );
}
