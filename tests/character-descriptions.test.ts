import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getCharacterDescription, characterDescriptions } from '../lib/character-descriptions';

describe('lib/character-descriptions', () => {
  describe('getCharacterDescription', () => {
    test('returns exact description for registered characters', () => {
      const desc = getCharacterDescription('Frieren');
      assert.ok(desc.overview.includes('Frieren: Beyond Journey\'s End'));
      assert.ok(desc.personality);
      assert.ok(desc.role);
      assert.ok(desc.collectionDetails);
    });

    test('normalizes trailing heart characters in names', () => {
      const descWithHeart = getCharacterDescription('Akane Kurokawa ♡');
      const descNormal = getCharacterDescription('Akane Kurokawa');

      assert.equal(descWithHeart.overview, descNormal.overview);
      assert.equal(descWithHeart.role, descNormal.role);
    });

    test('provides a well-formed fallback object for unregistered characters', () => {
      const unknownName = 'Original Anime Character 2026';
      const desc = getCharacterDescription(unknownName);

      assert.ok(desc.overview.includes(unknownName));
      assert.ok(desc.personality.includes(unknownName));
      assert.ok(desc.role.includes(unknownName));
      assert.ok(desc.collectionDetails.includes(unknownName));
      assert.ok(desc.collectionDetails.includes('4K collection'));
    });

    test('all registered character descriptions conform to required schema', () => {
      Object.entries(characterDescriptions).forEach(([name, desc]) => {
        assert.ok(desc.overview, `${name} missing overview`);
        assert.ok(desc.personality, `${name} missing personality`);
        assert.ok(desc.role, `${name} missing role`);
        assert.ok(desc.collectionDetails, `${name} missing collectionDetails`);
      });
    });
  });
});
