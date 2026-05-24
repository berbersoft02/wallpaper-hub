"use client";

import { useHome } from "./HomeClient";

interface RecommendButtonClientProps {
  className?: string;
  children: React.ReactNode;
}

export default function RecommendButtonClient({ className, children }: RecommendButtonClientProps) {
  const { onRecommendClick } = useHome();

  return (
    <button onClick={onRecommendClick} className={className}>
      {children}
    </button>
  );
}
