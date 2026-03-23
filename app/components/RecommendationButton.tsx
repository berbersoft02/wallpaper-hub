"use client";

interface RecommendationButtonProps {
  onClick?: () => void;
}

export default function RecommendationButton({ onClick }: RecommendationButtonProps) {
  return (
    <button
      onClick={onClick}
      className="inline-block bg-neon-purple hover:bg-neon-purple/80 text-white font-pixel text-xl px-10 py-4 rounded-full shadow-[0_0_32px_rgba(211,0,197,0.6)] hover:shadow-[0_0_48px_rgba(211,0,197,0.9)] transition-all hover:scale-110 border-2 border-neon-purple/50"
    >
      Send Recommendation
    </button>
  );
}
