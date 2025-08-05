import { NextResponse } from 'next/server';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('auth_token')?.value || null;
  const isAuthenticated = Boolean(token);

  const publicRoutes = ['/api', '/_next'];
  const guestRoutes = ['/login', '/register'];
  const protectedRoutes = ['/'];

  // public route that should always be accessible
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // if user is authenticated but trying to access guest-only routes
  if (isAuthenticated && guestRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // if user is not authenticated and trying to access protected routes
  if (!isAuthenticated && protectedRoutes.includes(pathname)) {
    // don't redirect if we're already going to login
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};