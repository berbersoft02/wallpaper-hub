import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { getAllPosts, getPostBySlug, getPostByCharacterName } from '../lib/blog';

describe('lib/blog', () => {
  describe('getAllPosts', () => {
    test('returns all blog posts as an array with valid schema', () => {
      const posts = getAllPosts();
      assert.ok(Array.isArray(posts));
      assert.ok(posts.length > 0);

      posts.forEach((post) => {
        assert.ok(post.slug, 'post must have a slug');
        assert.ok(post.title, 'post must have a title');
        assert.ok(post.excerpt, 'post must have an excerpt');
        assert.ok(post.content, 'post must have content');
        assert.ok(post.date, 'post must have a date');
        assert.ok(Array.isArray(post.tags), 'post must have tags array');
      });
    });

    test('ensures all post slugs are unique', () => {
      const posts = getAllPosts();
      const slugs = posts.map(p => p.slug);
      const uniqueSlugs = new Set(slugs);
      assert.equal(slugs.length, uniqueSlugs.size, 'Duplicate blog post slugs detected');
    });
  });

  describe('getPostBySlug', () => {
    test('returns matching post for a known valid slug', () => {
      const targetSlug = 'eren-and-mikasa-attack-on-titan-tragedy-4k';
      const post = getPostBySlug(targetSlug);
      assert.ok(post, 'Expected to find post for target slug');
      assert.equal(post?.slug, targetSlug);
      assert.ok(post?.title.includes('Eren and Mikasa'));
    });

    test('returns undefined for an unknown slug', () => {
      const post = getPostBySlug('non-existent-blog-slug-999');
      assert.equal(post, undefined);
    });
  });

  describe('getPostByCharacterName', () => {
    test('finds post by mapped character name', () => {
      const post = getPostByCharacterName('Alya Kujou');
      assert.ok(post, 'Expected to find blog post for Alya Kujou');
      assert.equal(post?.slug, 'alya-kujou-tsundere-editing-guide');
    });

    test('handles case-insensitive and trimmed character names', () => {
      const post = getPostByCharacterName('  alya KUJOU  ');
      assert.ok(post);
      assert.equal(post?.slug, 'alya-kujou-tsundere-editing-guide');
    });

    test('finds post via tag fallback search', () => {
      const post = getPostByCharacterName('Eren Jaeger');
      assert.ok(post, 'Expected to find post matching Eren Jaeger tag or title');
      assert.ok(post?.tags.some(t => t.toLowerCase().includes('eren jaeger')));
    });

    test('returns undefined for unmentioned characters', () => {
      const post = getPostByCharacterName('Unknown Persona 404');
      assert.equal(post, undefined);
    });
  });
});
