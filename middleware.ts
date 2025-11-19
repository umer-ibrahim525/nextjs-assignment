import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Check if user is trying to access admin routes
    if (path.startsWith('/dashboard/admin') || path.startsWith('/admin')) {
      if (token?.role !== 'admin') {
        // Redirect non-admin users to dashboard
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    // Allow access if all checks pass
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Return true if user has a valid token
        return !!token;
      },
    },
    pages: {
      signIn: '/login',
    },
  }
);

// Protect these routes with authentication
// Note: /shop routes are NOT included here, making them public
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/products/:path*',
    '/admin/:path*',
    '/api/admin/:path*',
  ],
};
