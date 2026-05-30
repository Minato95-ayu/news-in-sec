import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['/create', '/history', '/settings', '/templates'];
const authRoutes = ['/login', '/register'];

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  
  // Get hostname of request (e.g. demo.news-in-sec.com, tech-news.com, localhost:3001)
  const hostname = request.headers
    .get('host')!
    .replace('.localhost:3001', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

  // Define our main app domain
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3001';

  // Check if we are on a custom domain (or subdomain) that is not the root domain
  if (hostname !== rootDomain && hostname !== `www.${rootDomain}`) {
    // Rewrite the request to our dynamic multi-tenant route: /_sites/[domain]/...
    // e.g. tech-news.com/about -> /_sites/tech-news.com/about
    return NextResponse.rewrite(new URL(`/_sites/${hostname}${url.pathname}`, request.url));
  }

  // Regular protected routes logic can go here
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
