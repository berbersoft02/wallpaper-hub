import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeHtml,
  sanitizeDownloadFilename,
  validateCloudinaryDownloadUrl,
  validateRecommendationPayload,
} from '../lib/security';

describe('lib/security', () => {
  describe('validateCloudinaryDownloadUrl', () => {
    test('accepts valid HTTPS res.cloudinary.com asset URLs', () => {
      const parsed = validateCloudinaryDownloadUrl(
        'https://res.cloudinary.com/dg8hzm1fp/image/upload/wallpapers/Frieren/1.jpg'
      );
      assert.ok(parsed);
      assert.equal(parsed?.hostname, 'res.cloudinary.com');
    });

    test('rejects non-HTTPS, lookalike hosts, credentials, and malformed URLs', () => {
      assert.equal(validateCloudinaryDownloadUrl('http://res.cloudinary.com/a/b.jpg'), null);
      assert.equal(validateCloudinaryDownloadUrl('https://res.cloudinary.com.evil.com/a/b.jpg'), null);
      assert.equal(validateCloudinaryDownloadUrl('https://user:pass@res.cloudinary.com/a/b.jpg'), null);
      assert.equal(validateCloudinaryDownloadUrl('https://res.cloudinary.com/'), null);
      assert.equal(validateCloudinaryDownloadUrl('not-a-url'), null);
      assert.equal(validateCloudinaryDownloadUrl('   '), null);
    });
  });

  describe('sanitizeDownloadFilename', () => {
    test('strips CRLF, quotes, semicolons, and directory traversal segments', () => {
      const sanitized = sanitizeDownloadFilename('../../evil"\r\nX-Injected: true;name.jpg');
      assert.equal(sanitized, 'evilX-Injected_truename.jpg');
      assert.ok(!sanitized.includes('\r'));
      assert.ok(!sanitized.includes('\n'));
      assert.ok(!sanitized.includes('"'));
      assert.ok(!sanitized.includes(';'));
    });

    test('returns fallback when input is missing or strips to empty', () => {
      assert.equal(sanitizeDownloadFilename(null), 'wallpaper.jpg');
      assert.equal(sanitizeDownloadFilename(undefined), 'wallpaper.jpg');
      assert.equal(sanitizeDownloadFilename('....""'), 'wallpaper.jpg');
    });
  });

  describe('escapeHtml', () => {
    test('escapes HTML meta-characters safely', () => {
      assert.equal(
        escapeHtml('<script>alert("xss" & \'test\')</script>'),
        '&lt;script&gt;alert(&quot;xss&quot; &amp; &#39;test&#39;)&lt;/script&gt;'
      );
    });
  });

  describe('validateRecommendationPayload', () => {
    test('accepts and trims valid recommendation payloads', () => {
      const result = validateRecommendationPayload({
        name: '  Alya  ',
        email: ' alya@example.com ',
        message: ' Add more 4K wallpapers! ',
      });

      assert.equal(result.valid, true);
      if (result.valid) {
        assert.deepEqual(result.data, {
          name: 'Alya',
          email: 'alya@example.com',
          message: 'Add more 4K wallpapers!',
        });
      }
    });

    test('rejects missing fields, invalid emails, and oversized inputs', () => {
      assert.equal(validateRecommendationPayload(null).valid, false);
      assert.equal(
        validateRecommendationPayload({ name: '', email: 'a@b.com', message: 'hi' }).valid,
        false
      );
      assert.equal(
        validateRecommendationPayload({ name: 'A', email: 'not-an-email', message: 'hi' }).valid,
        false
      );
      assert.equal(
        validateRecommendationPayload({ name: 'A'.repeat(101), email: 'a@b.com', message: 'hi' }).valid,
        false
      );
      assert.equal(
        validateRecommendationPayload({ name: 'A', email: 'a@b.com', message: 'x'.repeat(2001) }).valid,
        false
      );
    });
  });
});
