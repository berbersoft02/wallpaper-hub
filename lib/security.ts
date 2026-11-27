const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface RecommendationPayload {
  name: string;
  email: string;
  message: string;
}

export type RecommendationValidationResult =
  | { valid: true; data: RecommendationPayload }
  | { valid: false; error: string };

/**
 * Validates that a download URL is strictly an HTTPS Cloudinary asset URL
 * without embedded credentials or lookalike hostnames.
 */
export function validateCloudinaryDownloadUrl(rawUrl: string): URL | null {
  if (!rawUrl || !rawUrl.trim()) {
    return null;
  }

  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'https:') {
    return null;
  }

  if (parsed.hostname.toLowerCase() !== 'res.cloudinary.com') {
    return null;
  }

  if (parsed.username !== '' || parsed.password !== '') {
    return null;
  }

  if (!parsed.pathname || parsed.pathname === '/') {
    return null;
  }

  return parsed;
}

/**
 * Sanitizes a user-supplied filename for safe use in a Content-Disposition header.
 */
export function sanitizeDownloadFilename(
  rawFilename: string | null | undefined,
  fallback = 'wallpaper.jpg'
): string {
  if (!rawFilename) {
    return fallback;
  }

  // Strip directory paths and control/header-breaking characters.
  const baseSegment = rawFilename.split(/[/\\]/).pop() ?? '';
  const cleaned = baseSegment
    .replace(/[\x00-\x1f\x7f]/g, '')
    .replace(/["';`<>:|?*]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .replace(/^\.+/, '')
    .slice(0, 120);

  return cleaned || fallback;
}

/**
 * Escapes HTML special characters to prevent markup injection in email templates.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Validates and normalizes recommendation form submissions.
 */
export function validateRecommendationPayload(
  body: unknown
): RecommendationValidationResult {
  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return { valid: false, error: 'Invalid request body' };
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === 'string' ? record.name.trim() : '';
  const email = typeof record.email === 'string' ? record.email.trim() : '';
  const message = typeof record.message === 'string' ? record.message.trim() : '';

  if (!name || !email || !message) {
    return { valid: false, error: 'All fields are required' };
  }

  if (name.length > 100) {
    return { valid: false, error: 'Name must be 100 characters or fewer' };
  }

  if (email.length > 254 || !EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Please provide a valid email address' };
  }

  if (message.length > 2000) {
    return { valid: false, error: 'Message must be 2000 characters or fewer' };
  }

  return {
    valid: true,
    data: { name, email, message },
  };
}
