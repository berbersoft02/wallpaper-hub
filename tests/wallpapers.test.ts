import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildDownloadHref,
  filterAndSearchWallpapers,
  getRelatedCharacters,
  isVideoAsset,
  transformCharacterCatalog,
  type CharacterData,
} from '../lib/wallpapers';

describe('lib/wallpapers', () => {
  describe('isVideoAsset', () => {
    test('detects mp4, webm, and mov URLs including query params', () => {
      assert.equal(isVideoAsset('https://res.cloudinary.com/demo/video/upload/clip.mp4'), true);
      assert.equal(isVideoAsset('https://res.cloudinary.com/demo/video/upload/clip.WEBM?v=1'), true);
      assert.equal(isVideoAsset('https://res.cloudinary.com/demo/video/upload/clip.mov'), true);
    });

    test('returns false for image URLs', () => {
      assert.equal(isVideoAsset('https://res.cloudinary.com/demo/image/upload/art.jpg'), false);
      assert.equal(isVideoAsset('https://res.cloudinary.com/demo/image/upload/art.webp'), false);
    });
  });

  describe('transformCharacterCatalog', () => {
    const sampleCatalog: CharacterData[] = [
      {
        name: 'Desktop',
        category: 'Special',
        wallpapers: [
          'https://res.cloudinary.com/demo/image/upload/d1.jpg',
          'https://res.cloudinary.com/demo/image/upload/d2.jpg',
        ],
      },
      {
        name: 'Anime Desktop',
        category: 'Special',
        wallpapers: [
          'https://res.cloudinary.com/demo/image/upload/d2.jpg',
          'https://res.cloudinary.com/demo/image/upload/d3.jpg',
        ],
      },
      {
        name: 'Zelda',
        category: 'Anime',
        tags: ['Fantasy'],
        wallpapers: ['https://res.cloudinary.com/demo/image/upload/z1.jpg'],
      },
      {
        name: 'Cyberpunk',
        category: 'Special',
        tags: ['Neon'],
        wallpapers: ['https://res.cloudinary.com/demo/image/upload/c1.jpg'],
      },
      {
        name: 'Frieren',
        category: 'Anime',
        tags: ['Mage'],
        wallpapers: [
          'https://res.cloudinary.com/demo/image/upload/f1.jpg',
          'https://res.cloudinary.com/demo/image/upload/f2.jpg',
        ],
      },
      {
        name: 'Violet Evergarden',
        category: 'Anime',
        tags: ['Drama'],
        wallpapers: ['https://res.cloudinary.com/demo/image/upload/v1.jpg'],
      },
    ];

    test('unifies and deduplicates desktop collections under Desktop Wallpapers', () => {
      const result = transformCharacterCatalog(sampleCatalog);
      const desktopItems = result.wallpapers.filter(
        (w) => w.character === 'Desktop Wallpapers'
      );

      assert.equal(desktopItems.length, 3);
      assert.deepEqual(
        desktopItems.map((w) => w.url),
        [
          'https://res.cloudinary.com/demo/image/upload/d1.jpg',
          'https://res.cloudinary.com/demo/image/upload/d2.jpg',
          'https://res.cloudinary.com/demo/image/upload/d3.jpg',
        ]
      );
      assert.ok(result.specialCollections.includes('Desktop Wallpapers'));
      assert.ok(result.specialCollections.includes('Cyberpunk'));
      assert.deepEqual(result.characters, ['Zelda']);
    });

    test('interleaves priority characters at the end so reversed latest drops surface them first', () => {
      const result = transformCharacterCatalog(sampleCatalog);
      const latest = [...result.wallpapers].reverse();

      // Priority index 0 items appear first after reversing
      assert.equal(latest[0].character, 'Frieren');
      assert.equal(latest[0].url, 'https://res.cloudinary.com/demo/image/upload/f1.jpg');
      assert.equal(latest[1].character, 'Violet Evergarden');
    });
  });

  describe('filterAndSearchWallpapers', () => {
    const sampleCatalog: CharacterData[] = [
      {
        name: 'Frieren',
        category: 'Anime',
        tags: ['Mage', 'Elf'],
        wallpapers: ['https://res.cloudinary.com/demo/image/upload/f1.jpg'],
      },
      {
        name: 'Cyberpunk',
        category: 'Special',
        tags: ['Neon', 'City'],
        wallpapers: ['https://res.cloudinary.com/demo/image/upload/c1.jpg'],
      },
    ];
    const { wallpapers } = transformCharacterCatalog(sampleCatalog);
    const favs = [wallpapers[0]];

    test('returns reversed catalog for All and exact favorites for Favorites', () => {
      const all = filterAndSearchWallpapers(wallpapers, favs, 'All', '');
      assert.equal(all.length, 2);
      assert.equal(all[0].id, wallpapers[1].id);

      const onlyFavs = filterAndSearchWallpapers(wallpapers, favs, 'Favorites', '');
      assert.equal(onlyFavs.length, 1);
      assert.equal(onlyFavs[0].id, favs[0].id);
    });

    test('filters by character name and matches search queries across tags and category', () => {
      const byChar = filterAndSearchWallpapers(wallpapers, favs, 'Cyberpunk', '');
      assert.equal(byChar.length, 1);
      assert.equal(byChar[0].character, 'Cyberpunk');

      const byTag = filterAndSearchWallpapers(wallpapers, favs, 'All', '  elf ');
      assert.equal(byTag.length, 1);
      assert.equal(byTag[0].character, 'Frieren');

      const byCategory = filterAndSearchWallpapers(wallpapers, favs, 'All', 'special');
      assert.equal(byCategory.length, 1);
      assert.equal(byCategory[0].character, 'Cyberpunk');
    });
  });

  describe('getRelatedCharacters', () => {
    const characters: CharacterData[] = [
      { name: 'Frieren', category: 'Anime', wallpapers: ['https://res.cloudinary.com/demo/image/upload/f1.jpg'] },
      { name: 'Video Only', category: 'Anime', wallpapers: ['https://res.cloudinary.com/demo/video/upload/v1.mp4'] },
      { name: 'Empty', category: 'Anime', wallpapers: [] },
      { name: 'Akane Kurokawa', category: 'Anime', wallpapers: ['https://res.cloudinary.com/demo/image/upload/a1.jpg'] },
      { name: 'Shiina Mahiru', category: 'Anime', wallpapers: ['https://res.cloudinary.com/demo/image/upload/s1.jpg'] },
      { name: 'Alya Kujou ♡', category: 'Anime', wallpapers: ['https://res.cloudinary.com/demo/image/upload/ak1.jpg'] },
    ];

    test('excludes current slug, empty collections, and video-first collections deterministically', () => {
      const firstRun = getRelatedCharacters(characters, 'frieren', 6);
      const secondRun = getRelatedCharacters(characters, 'frieren', 6);

      assert.deepEqual(firstRun, secondRun);
      assert.equal(firstRun.length, 3);
      assert.ok(firstRun.every((c) => c.name !== 'Frieren' && c.name !== 'Video Only' && c.name !== 'Empty'));
    });

    test('respects limit parameter', () => {
      const limited = getRelatedCharacters(characters, 'frieren', 2);
      assert.equal(limited.length, 2);
      assert.deepEqual(getRelatedCharacters(characters, 'frieren', 0), []);
    });
  });

  describe('buildDownloadHref', () => {
    test('builds safe encoded download URL for images and videos', () => {
      const img = buildDownloadHref(
        'https://res.cloudinary.com/dg8hzm1fp/image/upload/frieren.jpg',
        'Frieren - 4K Edit #1'
      );
      assert.equal(img.filename, 'frieren_4k_edit_1.jpg');
      assert.ok(img.href.startsWith('/api/download?url='));
      assert.ok(img.href.includes('filename=frieren_4k_edit_1.jpg'));

      const vid = buildDownloadHref(
        'https://res.cloudinary.com/dg8hzm1fp/video/upload/loop.mp4',
        'Live Loop'
      );
      assert.equal(vid.filename, 'live_loop.mp4');
    });

    test('supports custom fallback extension for PFPs', () => {
      const pfp = buildDownloadHref(
        'https://res.cloudinary.com/dg8hzm1fp/image/upload/avatar.png',
        'Alya PFP #2',
        'png'
      );
      assert.equal(pfp.filename, 'alya_pfp_2.png');
    });
  });
});
