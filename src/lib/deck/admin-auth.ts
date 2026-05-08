import {SignJWT, jwtVerify} from 'jose';
import {cookies} from 'next/headers';

const COOKIE_NAME = 'deck_admin_session';
const SESSION_TTL_HOURS = 24 * 7;

function secret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s) throw new Error('ADMIN_SESSION_SECRET is not set');
  return new TextEncoder().encode(s);
}

export function isEmailAllowed(email: string): boolean {
  const raw = (process.env.ADMIN_ALLOWED_EMAIL_DOMAINS ?? '').trim();
  if (!raw) return false;
  const domains = raw.split(',').map((d) => d.trim().toLowerCase()).filter(Boolean);
  const lower = email.trim().toLowerCase();
  return domains.some((d) => lower.endsWith('@' + d));
}

export function isPasswordCorrect(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (password.length !== expected.length) return false;
  let ok = 0;
  for (let i = 0; i < password.length; i++) {
    ok |= password.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return ok === 0;
}

export type AdminSession = {email: string};

export async function createSession(email: string): Promise<string> {
  return await new SignJWT({email})
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_HOURS}h`)
    .sign(secret());
}

export async function verifySession(token: string): Promise<AdminSession | null> {
  try {
    const {payload} = await jwtVerify(token, secret());
    if (typeof payload.email !== 'string') return null;
    if (!isEmailAllowed(payload.email)) return null;
    return {email: payload.email};
  } catch {
    return null;
  }
}

export type AuthFailure = 'no-cookie' | 'invalid-jwt' | 'email-not-allowed';

// Like getCurrentSession but returns a reason when it fails — for diagnostics.
export async function getCurrentSessionDetailed(): Promise<
  {ok: true; session: AdminSession} | {ok: false; reason: AuthFailure}
> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return {ok: false, reason: 'no-cookie'};
  try {
    const {payload} = await jwtVerify(token, secret());
    if (typeof payload.email !== 'string') return {ok: false, reason: 'invalid-jwt'};
    if (!isEmailAllowed(payload.email)) return {ok: false, reason: 'email-not-allowed'};
    return {ok: true, session: {email: payload.email}};
  } catch {
    return {ok: false, reason: 'invalid-jwt'};
  }
}

export async function setSessionCookie(token: string) {
  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_HOURS * 60 * 60
  });
}

export async function clearSessionCookie() {
  const jar = await cookies();
  // Explicit overwrite + maxAge: 0 to ensure the browser actually drops the cookie.
  // jar.delete() alone can fail to clear if the original `path` attribute doesn't match.
  jar.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });
  jar.delete(COOKIE_NAME);
}

export async function getCurrentSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
