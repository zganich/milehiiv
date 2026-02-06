import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// A/B Test Configuration
// Variant A (control): / - 50%
// Variant B (calculator): /b - 25%
// Variant C (fear/urgency): /c - 25%
const VARIANTS = [
  { path: '/', weight: 50 },
  { path: '/b', weight: 25 },
  { path: '/c', weight: 25 },
];

const COOKIE_NAME = 'mh_variant';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function selectVariant(): string {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const variant of VARIANTS) {
    cumulative += variant.weight;
    if (random < cumulative) {
      return variant.path;
    }
  }
  
  return '/'; // fallback to control
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only apply A/B testing to the root path
  // Skip if already on /b or /c (direct access or returning visitor)
  if (pathname !== '/') {
    return NextResponse.next();
  }
  
  // Check for existing variant cookie
  const existingVariant = request.cookies.get(COOKIE_NAME)?.value;
  
  if (existingVariant) {
    // User has a variant assigned - redirect if not on control
    if (existingVariant !== '/' && existingVariant !== pathname) {
      const url = request.nextUrl.clone();
      url.pathname = existingVariant;
      return NextResponse.redirect(url);
    }
    // Already on correct variant (control), continue
    return NextResponse.next();
  }
  
  // New visitor - assign a variant
  const selectedVariant = selectVariant();
  
  if (selectedVariant === '/') {
    // Control group - just set cookie and continue
    const response = NextResponse.next();
    response.cookies.set(COOKIE_NAME, selectedVariant, {
      maxAge: COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    });
    return response;
  }
  
  // Redirect to variant and set cookie
  const url = request.nextUrl.clone();
  url.pathname = selectedVariant;
  const response = NextResponse.redirect(url);
  response.cookies.set(COOKIE_NAME, selectedVariant, {
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  });
  
  return response;
}

export const config = {
  matcher: ['/', '/b', '/c'],
};
