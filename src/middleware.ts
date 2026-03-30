import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// On définit une interface étendue pour inclure les propriétés de géolocalisation de Vercel
interface NextRequestWithGeo extends NextRequest {
  geo?: {
    country?: string;
    city?: string;
    region?: string;
  };
}

export function middleware(request: NextRequest) {
  // On cast la requête vers notre interface étendue
  const req = request as NextRequestWithGeo;
  const url = request.nextUrl;
  
  // On ne s'occupe pas des fichiers statiques
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.includes('/api/') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // 1. On vérifie si l'utilisateur a déjà un choix manuel (cookie)
  const cookieRegion = request.cookies.get('user-region')?.value;

  if (!cookieRegion) {
    // 2. Détection via les headers Vercel (maintenant TypeScript est content)
    const country = req.geo?.country || 'FR';
    
    let detectedRegion = 'EU';
    if (['US', 'CA', 'MX'].includes(country)) {
      detectedRegion = 'US';
    } else if (!['FR', 'DE', 'IT', 'ES', 'BE', 'NL', 'CH', 'AT'].includes(country)) {
      // Si hors zone EU historique ou Amérique du Nord -> WORLD
      detectedRegion = 'WORLD';
    }

    // 3. On fixe le cookie
    response.cookies.set('user-region', detectedRegion, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 jours
    });
  }

  return response;
}