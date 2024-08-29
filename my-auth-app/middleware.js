import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('token');

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token || token.value === '') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
