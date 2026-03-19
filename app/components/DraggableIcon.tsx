"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";

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
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  
  const dragRef = useRef<HTMLDivElement>(null);
  const startPosRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(Date.now());
  const animationFrameRef = useRef<number | null>(null);

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
    e.stopPropagation();
    setIsDragging(true);
    setIsThrowing(false);
    setVelocity({ x: 0, y: 0 });
    startPosRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = Date.now();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault(); // Prevent page scroll
    e.stopPropagation();
    setIsDragging(true);
    setIsThrowing(false);
    setVelocity({ x: 0, y: 0 });
    const touch = e.touches[0];
    startPosRef.current = {
      x: touch.clientX - position.x,
      y: touch.clientY - position.y,
    };
    lastPosRef.current = { x: touch.clientX, y: touch.clientY };
    lastTimeRef.current = Date.now();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Prevent body scroll while dragging
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  };

  // Throw animation with physics
  const animateThrow = useCallback(() => {
    const friction = 0.95;
    const minVelocity = 0.5;

    setVelocity((prevVel) => {
      const newVelX = prevVel.x * friction;
      const newVelY = prevVel.y * friction;

      // Stop animation when velocity is very low
      if (Math.abs(newVelX) < minVelocity && Math.abs(newVelY) < minVelocity) {
        setIsThrowing(false);
        return { x: 0, y: 0 };
      }

      setPosition((prevPos) => ({
        x: prevPos.x + newVelX,
        y: prevPos.y + newVelY,
      }));

      return { x: newVelX, y: newVelY };
    });
  }, []);

  // Run throw animation
  useEffect(() => {
    if (isThrowing) {
      const animate = () => {
        animateThrow();
        animationFrameRef.current = requestAnimationFrame(animate);
      };
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isThrowing, animateThrow]);

  // Handle mouse/touch move and up
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setHasMoved(true);
      
      const now = Date.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      
      const newX = e.clientX - startPosRef.current.x;
      const newY = e.clientY - startPosRef.current.y;
      
      // Calculate velocity
      const vx = (e.clientX - lastPosRef.current.x) / dt * 16;
      const vy = (e.clientY - lastPosRef.current.y) / dt * 16;
      
      setVelocity({ x: vx, y: vy });
      setPosition({ x: newX, y: newY });
      
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault(); // Prevent page scroll while dragging
      setHasMoved(true);
      
      const touch = e.touches[0];
      const now = Date.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      
      const newX = touch.clientX - startPosRef.current.x;
      const newY = touch.clientY - startPosRef.current.y;
      
      // Calculate velocity
      const vx = (touch.clientX - lastPosRef.current.x) / dt * 16;
      const vy = (touch.clientY - lastPosRef.current.y) / dt * 16;
      
      setVelocity({ x: vx, y: vy });
      setPosition({ x: newX, y: newY });
      
      lastPosRef.current = { x: touch.clientX, y: touch.clientY };
      lastTimeRef.current = now;
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        // Restore body scroll
        document.body.style.overflow = '';
        document.body.style.touchAction = '';
        // Start throw animation if there's enough velocity
        if (Math.abs(velocity.x) > 2 || Math.abs(velocity.y) > 2) {
          setIsThrowing(true);
        }
      }
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, velocity]);

  // Calculate initial position style
  const positionStyle: React.CSSProperties = {
    top: initialTop,
    left: initialLeft,
    right: initialRight,
    bottom: initialBottom,
    transform: `translate(${position.x}px, ${position.y}px)`,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging || isThrowing ? 100 : 5,
    animation: hasMoved ? "none" : animation,
    touchAction: "none", // Prevent browser touch gestures
  };

  return (
    <div
      ref={dragRef}
      className={`absolute ${sizeClasses[size]} select-none rounded-full overflow-hidden ${effect}`}
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
        className={`w-full h-full object-cover rounded-full ${shadowColor} ring-2 ${ringColor} transition-transform duration-150 ${
          isDragging 
            ? "scale-125 ring-4 ring-neon-pink shadow-[0_0_40px_rgba(255,42,109,0.8)]" 
            : isThrowing
              ? "scale-110 ring-3 ring-neon-cyan shadow-[0_0_30px_rgba(5,217,232,0.7)]"
              : isHovered 
                ? "scale-110 ring-4" 
                : ""
        }`}
        unoptimized
        draggable={false}
      />
      
      {/* Drag indicator */}
      {isHovered && !isDragging && !hasMoved && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-pixel text-neon-cyan whitespace-nowrap animate-pulse bg-black/50 px-2 py-1 rounded">
          Drag & Throw!
        </div>
      )}
    </div>
  );
}

