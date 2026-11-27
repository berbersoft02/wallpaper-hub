import { slugify } from './utils';

export interface WallpaperItem {
  id: string;
  url: string;
  character: string;
  title: string;
  category: string;
  tags?: string[];
}

export interface CharacterData {
  name: string;
  category: string;
  wallpapers: string[];
  tags?: string[];
}

export interface CatalogTransformResult {
  wallpapers: WallpaperItem[];
  characters: string[];
  specialCollections: string[];
}

export const PRIORITY_CHARACTER_NAMES = [
  'Frieren',
  'Violet Evergarden',
  'Shiina Mahiru',
  'Alya Kujou ♡',
  'Shikimori Micchon',
  'Mixed',
] as const;

const VIDEO_EXT_REGEX = /\.(mp4|webm|mov)(\?.*)?$/i;

/**
 * Returns true when the given asset URL points to a supported video format.
 */
export function isVideoAsset(url: string): boolean {
  return VIDEO_EXT_REGEX.test(url);
}

/**
 * Transforms raw character catalog entries into a flattened wallpaper list
 * with unified Desktop Wallpapers, sorted category collections, and reverse-interleaved
 * priority character drops.
 */
export function transformCharacterCatalog(
  charactersData: CharacterData[]
): CatalogTransformResult {
  const allWallpapers: WallpaperItem[] = [];
  const animeNames: string[] = [];
  const specialNames: string[] = [];

  const prioritySet = new Set<string>(PRIORITY_CHARACTER_NAMES);
  const priorityChars = charactersData.filter((c) => prioritySet.has(c.name));
  const otherChars = charactersData.filter((c) => !prioritySet.has(c.name));

  const desktopWallpapers: string[] = [];
  const desktopSeen = new Set<string>();
  charactersData.forEach((char) => {
    if (char.name.toLowerCase().includes('desktop') || char.name === 'Desktop') {
      char.wallpapers.forEach((url) => {
        if (!desktopSeen.has(url)) {
          desktopSeen.add(url);
          desktopWallpapers.push(url);
        }
      });
    }
  });

  if (desktopWallpapers.length > 0) {
    specialNames.push('Desktop Wallpapers');
    desktopWallpapers.forEach((url, i) => {
      allWallpapers.push({
        id: `desktop-unified-${i}`,
        url,
        character: 'Desktop Wallpapers',
        title: `PC Wallpaper - ${i + 1}`,
        category: 'Special',
        tags: ['4K', 'Desktop', 'PC', 'Horizontal'],
      });
    });
  }

  otherChars.forEach((char) => {
    if (!char.name.toLowerCase().includes('desktop')) {
      if (char.category === 'Special') {
        specialNames.push(char.name);
      } else {
        animeNames.push(char.name);
      }

      char.wallpapers.forEach((url, i) => {
        allWallpapers.push({
          id: `${char.name}-${i}`,
          url,
          character: char.name,
          title: `${char.name} - ${i + 1}`,
          category: char.category || 'Anime',
          tags: char.tags || [],
        });
      });
    }
  });

  const priorityDataList = PRIORITY_CHARACTER_NAMES.map((name) =>
    priorityChars.find((c) => c.name === name)
  ).filter((c): c is CharacterData => Boolean(c));

  const maxLength = Math.max(...priorityDataList.map((c) => c.wallpapers.length), 0);

  for (let i = maxLength - 1; i >= 0; i--) {
    for (let j = priorityDataList.length - 1; j >= 0; j--) {
      const char = priorityDataList[j];
      if (char.wallpapers[i]) {
        allWallpapers.push({
          id: `${char.name}-${i}`,
          url: char.wallpapers[i],
          character: char.name,
          title: `${char.name} - ${i + 1}`,
          category: char.category || 'Anime',
          tags: char.tags || [],
        });
      }
    }
  }

  return {
    wallpapers: allWallpapers,
    characters: Array.from(new Set(animeNames)).sort(),
    specialCollections: Array.from(new Set(specialNames)).sort(),
  };
}

/**
 * Filters and searches wallpapers by active collection tab, favorites, and search query.
 */
export function filterAndSearchWallpapers(
  wallpapers: WallpaperItem[],
  favorites: WallpaperItem[],
  filter: string,
  searchQuery: string
): WallpaperItem[] {
  let filtered: WallpaperItem[];

  if (filter === 'All') {
    filtered = [...wallpapers].reverse();
  } else if (filter === 'Favorites') {
    filtered = favorites;
  } else {
    filtered = wallpapers.filter((w) => w.character === filter).reverse();
  }

  const trimmedQuery = searchQuery.trim().toLowerCase();
  if (trimmedQuery !== '') {
    filtered = filtered.filter(
      (w) =>
        w.character.toLowerCase().includes(trimmedQuery) ||
        w.title.toLowerCase().includes(trimmedQuery) ||
        w.category.toLowerCase().includes(trimmedQuery) ||
        w.tags?.some((t) => t.toLowerCase().includes(trimmedQuery))
    );
  }

  return filtered;
}

function deterministicHash(input: string): number {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/**
 * Deterministically selects related characters with image previews,
 * avoiding impure Math.random() calls during React rendering.
 */
export function getRelatedCharacters(
  characters: CharacterData[],
  currentSlug: string,
  limit = 6
): CharacterData[] {
  if (limit <= 0) return [];

  return characters
    .filter((c) => slugify(c.name) !== currentSlug)
    .filter((c) => c.wallpapers.length > 0 && !isVideoAsset(c.wallpapers[0]))
    .map((c) => ({
      char: c,
      score: deterministicHash(`${currentSlug}:${c.name}`),
    }))
    .sort((a, b) => a.score - b.score || a.char.name.localeCompare(b.char.name))
    .slice(0, limit)
    .map((entry) => entry.char);
}

/**
 * Builds a sanitized /api/download URL and normalized download filename.
 */
export function buildDownloadHref(
  url: string,
  title: string,
  fallbackExt = 'jpg'
): { href: string; filename: string } {
  const ext = isVideoAsset(url) ? 'mp4' : fallbackExt;
  const safeBase =
    title
      .replace(/[^a-z0-9]/gi, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .toLowerCase() || 'wallpaper';
  const filename = `${safeBase}.${ext}`;

  return {
    filename,
    href: `/api/download?url=${encodeURIComponent(url)}&filename=${encodeURIComponent(filename)}`,
  };
}
