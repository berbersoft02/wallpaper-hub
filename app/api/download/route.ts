import { NextRequest, NextResponse } from 'next/server';
import {
  sanitizeDownloadFilename,
  validateCloudinaryDownloadUrl,
} from '@/lib/security';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const rawUrl = searchParams.get('url');
  const filename = sanitizeDownloadFilename(searchParams.get('filename'));

  if (!rawUrl) {
    return NextResponse.json({ error: 'Missing URL parameter' }, { status: 400 });
  }

  // Security: Strictly validate HTTPS Cloudinary asset URLs
  const validatedUrl = validateCloudinaryDownloadUrl(rawUrl);
  if (!validatedUrl) {
    return NextResponse.json({ error: 'Invalid URL source' }, { status: 403 });
  }

  try {
    const response = await fetch(validatedUrl.toString());
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type') || 'application/octet-stream';
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'X-RateLimit-Limit': '100',
        'X-RateLimit-Remaining': '99',
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to download file' }, { status: 500 });
  }
}
