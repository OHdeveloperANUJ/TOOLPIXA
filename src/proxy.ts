import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const host = (request.headers.get('host') || '').toLowerCase();

  // Prevent Vercel preview/staging domains from competing with www.toolpixa.space in Google Search
  if (host.endsWith('.vercel.app')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  // Enforce canonical www host on apex domain requests
  if (host === 'toolpixa.space') {
    const url = request.nextUrl.clone();
    url.host = 'www.toolpixa.space';
    url.protocol = 'https';
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)',
  ],
};
