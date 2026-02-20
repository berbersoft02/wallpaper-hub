export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
}

import wallpapersData from '@/app/data/wallpapers.json';

export function getAllCharacters() {
  return wallpapersData.characters;
}

export function getCharacterBySlug(slug: string) {
  return wallpapersData.characters.find(
    (char) => slugify(char.name) === slug
  );
}
