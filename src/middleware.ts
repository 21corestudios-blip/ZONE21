import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Region = 'EU' | 'US';

interface NextRequestWithGeo extends NextRequest {
  geo?: {
    country?: string;
    city?: string;
    region?: string;
  };
}

const REGION_COOKIE_NAME = 'user-region';
const REGION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const US_REGION_COUNTRIES = new Set(['US', 'CA', 'MX']);

function isValidRegion(value: string | undefined): value is Region {
  return value === 'EU' || value === 'US';
}

function detectRegionFromCountry(country?: string): Region {
  if (!country) {
    return 'EU';
  }

  return US_REGION_COUNTRIES.has(country.toUpperCase()) ? 'US' : 'EU';
}

function shouldBypassMiddleware(pathname: string): boolean {
  return (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  );
}

export function middleware(request: NextRequest) {
  const req = request as NextRequestWithGeo;
  const { pathname } = request.nextUrl;

  if (shouldBypassMiddleware(pathname)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();
  const cookieRegion = request.cookies.get(REGION_COOKIE_NAME)?.value;

  if (isValidRegion(cookieRegion)) {
    return response;
  }

  const detectedRegion = detectRegionFromCountry(req.geo?.country);

  response.cookies.set(REGION_COOKIE_NAME, detectedRegion, {
    path: '/',
    maxAge: REGION_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });

  return response;
}