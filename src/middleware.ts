import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  // Skip API routes, /deck (sales presentation), /docs, static files, and Next.js internals
  matcher: ['/', '/(es|en)/:path*', '/((?!api|deck|docs|_next|_vercel|.*\\..*).*)']
};
