import {NextRequest, NextResponse} from 'next/server';
import {getCurrentSession} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';
import {generateToken} from '@/lib/deck/tokens';

export const runtime = 'nodejs';

export async function POST(
  req: NextRequest,
  ctx: {params: Promise<{id: string}>}
) {
  const session = await getCurrentSession();
  if (!session) return NextResponse.json({error: 'Unauthorized'}, {status: 401});

  const {id} = await ctx.params;

  let body: {recipient_name?: string; recipient_email?: string; notes?: string};
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  const sb = supabaseAdmin();
  const token = generateToken();
  const {data, error} = await sb
    .from('presentation_links')
    .insert({
      client_id: id,
      token,
      recipient_name: body.recipient_name ?? null,
      recipient_email: body.recipient_email ?? null,
      notes: body.notes ?? null,
      created_by: session.email
    })
    .select('*')
    .single();

  if (error) return NextResponse.json({error: error.message}, {status: 500});
  return NextResponse.json({link: data});
}
