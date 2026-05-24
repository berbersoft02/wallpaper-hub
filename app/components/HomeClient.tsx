"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import RecommendationModal from "./RecommendationModal";

interface HomeContextType {
  onRecommendClick: () => void;
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

export function useHome() {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHome must be used within a HomeClient provider");
  }
  return context;
}

interface HomeClientProps {
  children: ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onRecommendClick = () => {
    setIsModalOpen(true);
  };

  return (
    <HomeContext.Provider value={{ onRecommendClick }}>
      {children}
      <RecommendationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </HomeContext.Provider>
  );
}
