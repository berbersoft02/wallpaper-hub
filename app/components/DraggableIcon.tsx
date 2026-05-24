"use client";

import Image from "next/image";
import { useState, useRef, useEffect, useCallback, memo } from "react";

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

const DraggableIcon = memo(function DraggableIcon({
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
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isThrowing, setIsThrowing] = useState(false);
  
  const dragRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: 0, y: 0 });
  const lastTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Initialize refs that need current time
  useEffect(() => {
    lastTimeRef.current = Date.now();
  }, []);

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

  // Helper to update DOM transform without React re-render
  const updateTransform = useCallback((x: number, y: number) => {
    if (dragRef.current) {
      dragRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, []);

  // Use a ref for the callback to allow self-referencing without lint errors
  const animateThrowRef = useRef<() => void>(() => {});

  const animateThrow = useCallback(() => {
    const friction = 0.95;
    const minVelocity = 0.5;

    const newVelX = velRef.current.x * friction;
    const newVelY = velRef.current.y * friction;
    
    velRef.current = { x: newVelX, y: newVelY };

    if (Math.abs(newVelX) < minVelocity && Math.abs(newVelY) < minVelocity) {
      setIsThrowing(false);
      velRef.current = { x: 0, y: 0 };
      return;
    }

    posRef.current = {
      x: posRef.current.x + newVelX,
      y: posRef.current.y + newVelY,
    };

    updateTransform(posRef.current.x, posRef.current.y);
    animationFrameRef.current = requestAnimationFrame(animateThrowRef.current);
  }, [updateTransform]);

  useEffect(() => {
    animateThrowRef.current = animateThrow;
  }, [animateThrow]);

  // Handle mouse down
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setIsThrowing(false);
    velRef.current = { x: 0, y: 0 };
    startPosRef.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    lastTimeRef.current = Date.now();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setIsThrowing(false);
    velRef.current = { x: 0, y: 0 };
    const touch = e.touches[0];
    startPosRef.current = {
      x: touch.clientX - posRef.current.x,
      y: touch.clientY - posRef.current.y,
    };
    lastPosRef.current = { x: touch.clientX, y: touch.clientY };
    lastTimeRef.current = Date.now();
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };


  // Run throw animation
  useEffect(() => {
    if (isThrowing) {
      animationFrameRef.current = requestAnimationFrame(animateThrow);
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
      if (!hasMoved) setHasMoved(true);
      
      const now = Date.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      
      const newX = e.clientX - startPosRef.current.x;
      const newY = e.clientY - startPosRef.current.y;
      
      // Calculate velocity
      velRef.current = {
        x: (e.clientX - lastPosRef.current.x) / dt * 16,
        y: (e.clientY - lastPosRef.current.y) / dt * 16
      };
      
      posRef.current = { x: newX, y: newY };
      updateTransform(newX, newY);
      
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      lastTimeRef.current = now;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault(); 
      if (!hasMoved) setHasMoved(true);
      
      const touch = e.touches[0];
      const now = Date.now();
      const dt = Math.max(now - lastTimeRef.current, 1);
      
      const newX = touch.clientX - startPosRef.current.x;
      const newY = touch.clientY - startPosRef.current.y;
      
      velRef.current = {
        x: (touch.clientX - lastPosRef.current.x) / dt * 16,
        y: (touch.clientY - lastPosRef.current.y) / dt * 16
      };
      
      posRef.current = { x: newX, y: newY };
      updateTransform(newX, newY);
      
      lastPosRef.current = { x: touch.clientX, y: touch.clientY };
      lastTimeRef.current = now;
    };

    const handleMouseUp = () => {
      if (isDragging) {
        setIsDragging(false);
        if (Math.abs(velRef.current.x) > 2 || Math.abs(velRef.current.y) > 2) {
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
  }, [isDragging, hasMoved, updateTransform]);

  // Calculate initial position style
  const positionStyle: React.CSSProperties = {
    top: initialTop,
    left: initialLeft,
    right: initialRight,
    bottom: initialBottom,
    transform: `translate(${posRef.current.x}px, ${posRef.current.y}px)`,
    cursor: isDragging ? "grabbing" : "grab",
    zIndex: isDragging || isThrowing ? 100 : 5,
    animation: hasMoved ? "none" : animation,
    touchAction: "none",
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
});

export default DraggableIcon;
