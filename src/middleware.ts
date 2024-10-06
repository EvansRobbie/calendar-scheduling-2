import { NextRequest, NextResponse } from 'next/server';


import { apiAuthPrefix, authRoutes, publicRoutes } from '@/lib/routes';
import { auth } from './lib/auth';

// Middleware function

export function getCallbackUrl(req: NextRequest) {
  return `/login?callbackUrl=${encodeURIComponent(
    `${req.nextUrl.protocol}//${req.nextUrl.host}${req.nextUrl.pathname}`
  )}`;
}

export async function middleware(req: NextRequest) {
  try {
    const session = await auth()
    const isLoggedIn = !!session?.user
    const callbackUrl = getCallbackUrl(req);
    const { nextUrl } = req;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some((route) =>
      typeof route === 'string'
        ? route === nextUrl.pathname
        : route.test(nextUrl.pathname)
    );
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL('/', nextUrl));
      }
      return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(new URL(callbackUrl, nextUrl));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL('/error', req.url));
  }
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};