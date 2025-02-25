import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const isAdminRoute = request.nextUrl.pathname.startsWith('/panel');
  
  // Si el usuario está autenticado y trata de acceder a la página principal
  if (token && request.nextUrl.pathname === '/') {
    // Si es el superusuario, redirigir al panel
    if (token.email === 'ventas@jacoagency.io') {
      return NextResponse.redirect(new URL('/panel', request.url));
    }
    // Si es un usuario normal, redirigir al dashboard
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Proteger la ruta del panel
  if (isAdminRoute) {
    if (!token || token.email !== 'ventas@jacoagency.io') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Si el usuario no está autenticado y trata de acceder al dashboard
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/dashboard/:path*', '/panel/:path*']
}; 