import {NextRequest, NextResponse} from 'next/server';
import {
  createSession,
  isEmailAllowed,
  isPasswordCorrect,
  setSessionCookie
} from '@/lib/deck/admin-auth';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  let body: {email?: string; password?: string};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400});
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const password = body.password ?? '';

  if (!email || !password) {
    return NextResponse.json({error: 'Email and password required'}, {status: 400});
  }

  if (!isEmailAllowed(email) || !isPasswordCorrect(password)) {
    await new Promise((r) => setTimeout(r, 400));
    return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
  }

  const token = await createSession(email);
  await setSessionCookie(token);
  return NextResponse.json({ok: true, email});
}
