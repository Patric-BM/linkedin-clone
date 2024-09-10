import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const token = request.cookies.get('authToken');

  // Redirecionar para login se não estiver autenticado e tentar acessar a página protegida (raiz)
  if (!token && url.pathname === '/') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Redirecionar para a página inicial se já estiver autenticado e tentar acessar a página de login
  if (token && url.pathname === '/login') {
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  // Permitir acesso a outras rotas não protegidas
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login'],
};
