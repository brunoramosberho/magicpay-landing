import {NextResponse} from 'next/server';
import {ADMIN_COOKIE_NAME} from '@/lib/deck/admin-auth';

export const runtime = 'nodejs';

// Clears the admin session cookie at every plausible path. We send multiple
// Set-Cookie headers because if a stale cookie was set with a different `path`
// attribute (e.g. `/deck` from an older code version), the standard `cookies().delete()`
// won't remove it — browsers only drop a cookie when expired with matching path.
const CLEAR_PATHS = ['/', '/deck', '/deck/admin', '/api', '/api/deck', '/api/deck/admin'];

export async function POST() {
  const res = NextResponse.json({ok: true});
  for (const path of CLEAR_PATHS) {
    res.cookies.set(ADMIN_COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path,
      maxAge: 0
    });
  }
  return res;
}
