import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { cn, slugify, getAllCharacters, getCharacterBySlug } from '../lib/utils';

describe('lib/utils', () => {
  describe('cn', () => {
    test('merges simple class names', () => {
      assert.equal(cn('px-2', 'py-1'), 'px-2 py-1');
    });

    test('resolves conflicting tailwind classes cleanly', () => {
      assert.equal(cn('p-4', 'p-8'), 'p-8');
      assert.equal(cn('text-red-500', 'text-blue-500'), 'text-blue-500');
    });

    test('ignores falsy, null, and undefined values', () => {
      assert.equal(cn('btn', false && 'hidden', null, undefined, 'active'), 'btn active');
    });
  });

  describe('slugify', () => {
    test('converts standard text to lowercase hyphenated slug', () => {
      assert.equal(slugify('Eren Jaeger'), 'eren-jaeger');
      assert.equal(slugify('Alya Kujou'), 'alya-kujou');
    });

    test('removes punctuation, special symbols and collapses whitespace', () => {
      assert.equal(slugify('Frieren: Beyond Journey\'s End!'), 'frieren-beyond-journeys-end');
      assert.equal(slugify('  Attack   on   Titan  '), 'attack-on-titan');
    });

    test('collapses multiple hyphens', () => {
      assert.equal(slugify('Anime---Wallpaper--Collection'), 'anime-wallpaper-collection');
    });

    test('handles single word strings and empty strings gracefully', () => {
      assert.equal(slugify('Wallpaper'), 'wallpaper');
      assert.equal(slugify(''), '');
    });
  });

  describe('getAllCharacters & getCharacterBySlug', () => {
    test('getAllCharacters returns a valid non-empty list of characters', () => {
      const characters = getAllCharacters();
      assert.ok(Array.isArray(characters));
      assert.ok(characters.length > 0);

      const firstChar = characters[0];
      assert.ok(firstChar.name, 'character must have a name');
      assert.ok(Array.isArray(firstChar.wallpapers), 'character must have wallpapers array');
    });

    test('getCharacterBySlug finds an existing character by slug', () => {
      const characters = getAllCharacters();
      const targetChar = characters[0];
      const targetSlug = slugify(targetChar.name);

      const found = getCharacterBySlug(targetSlug);
      assert.ok(found, `Expected to find character for slug: ${targetSlug}`);
      assert.equal(found?.name, targetChar.name);
    });

    test('getCharacterBySlug returns undefined for non-existent slugs', () => {
      const found = getCharacterBySlug('non-existent-character-xyz-12345');
      assert.equal(found, undefined);
    });
  });
});
