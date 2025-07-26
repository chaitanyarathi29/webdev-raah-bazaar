import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Role-based route protection
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    if (pathname.startsWith('/vendor') && token?.role !== 'vendor') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    if (pathname.startsWith('/seller') && token?.role !== 'seller') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        
        // Public routes
        if (pathname.startsWith('/auth') || pathname === '/') {
          return true;
        }
        
        // Protected routes require authentication
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin/:path*', '/vendor/:path*', '/seller/:path*', '/api/protected/:path*'],
};