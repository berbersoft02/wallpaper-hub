export interface CharacterDescription {
  overview: string;
  personality: string;
  role: string;
  collectionDetails: string;
}

export const characterDescriptions: Record<string, CharacterDescription> = {
  "Akane Kurokawa": {
    overview: "Akane Kurokawa is a standout character from the hit series 'Oshi no Ko', known for her incredible talent as a method actress. Her journey from a shy girl to a powerful performer has captured the hearts of fans worldwide.",
    personality: "Initially portrayed as diligent and somewhat reserved, Akane's personality is defined by her extreme focus and analytical mind. She possesses the unique ability to completely inhabit a role, often researching her characters to the point of obsession.",
    role: "In the story, she serves as a major professional rival and complex love interest, representing the intense pressure and dedication required in the modern entertainment industry.",
    collectionDetails: "Our Akane Kurokawa 4K wallpaper collection highlights her many 'faces'—from her soft, natural look to her intense, star-eyed stage presence. Each image is AI-upscaled to ensure every detail of her iconic blue-toned hair and expressive eyes is crystal clear."
  },
  "Alya Kujou": {
    overview: "Alya Kujou, the titular 'Russian Girl' from 'Alya Sometimes Hides Her Feelings in Russian', is a perfect blend of elegance, intelligence, and hidden vulnerability.",
    personality: "Known as the 'Alisa' of her school, she maintains a facade of a perfect, stoic student. However, she frequently mutters her true feelings in Russian, thinking no one understands her—creating a charming 'tsundere' dynamic.",
    role: "As the female protagonist, her character arc revolves around her academic excellence and her growing, often complicated bond with Masachika Kuze.",
    collectionDetails: "This collection features Alisa in high-resolution 4K, focusing on her silver hair and striking blue eyes. The wallpapers capture her various moods, from her confident school council persona to her more private, emotive moments."
  },
  "Frieren": {
    overview: "Frieren, from 'Frieren: Beyond Journey's End', is an elven mage who offers a unique perspective on time, mortality, and the meaning of friendship after a long adventure.",
    personality: "Having lived for over a thousand years, Frieren often appears detached or indifferent to the short lives of humans. However, her journey is one of gradual realization as she learns to appreciate the fleeting moments she once took for granted.",
    role: "The protagonist of a 'post-adventure' story, she explores the world again to better understand the humans she once traveled with, making her one of the most philosophical characters in modern anime.",
    collectionDetails: "Our Frieren 4K wallpapers emphasize the 'Melancholic Beauty' of the series. Expect stunning landscapes, magical particle effects, and high-detail character art that captures the serene yet powerful essence of the legendary mage."
  },
  "Chisato Nishikigi": {
    overview: "Chisato Nishikigi is the energetic heart of 'Lycoris Recoil', a world-class agent who prefers peace and cafe work over the violent life of a Lycoris.",
    personality: "Outgoing, optimistic, and seemingly carefree, Chisato is a pacifist at heart. Despite her superhuman reflexes and combat abilities, she refuses to take lives, using non-lethal ammunition and a bright smile to solve problems.",
    role: "As the strongest Lycoris, she acts as a mentor and best friend to Takina Inoue, showing her that there is more to life than just following orders.",
    collectionDetails: "The Chisato 4K gallery is filled with vibrant reds and action-packed poses. Each wallpaper is optimized for OLED screens, making the bright colors of her uniform and the dynamic action scenes pop with incredible contrast."
  }
};

export function getCharacterDescription(name: string): CharacterDescription {
  // Normalize the name for lookup
  const normalizedName = name.replace(/ ♡$/, "");
  
  if (characterDescriptions[normalizedName]) {
    return characterDescriptions[normalizedName];
  }
  
  // Generic fallback for characters not yet detailed
  return {
    overview: `${name} is a fan-favorite character featured in our premium anime wallpaper collection. This gallery captures the essence of ${name} through various artistic lenses and high-resolution captures.`,
    personality: `${name}'s character is beloved for their unique traits and memorable moments within their respective series, contributing to the rich tapestry of modern anime culture.`,
    role: `As a key figure in their story, ${name} plays a vital role that resonates with fans, driving the emotional and narrative weight of the series.`,
    collectionDetails: `Our ${name} 4K collection features AI-enhanced imagery designed for high-end displays. We focus on color accuracy and detail preservation to provide the best possible visual experience for your desktop or mobile device.`
  };
}
