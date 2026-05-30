import {NextRequest, NextResponse} from 'next/server';
import {getCurrentSessionDetailed} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';

export const runtime = 'nodejs';

export async function PATCH(
  req: NextRequest,
  ctx: {params: Promise<{id: string}>}
) {
  const auth = await getCurrentSessionDetailed();
  if (!auth.ok)
    return NextResponse.json({error: 'Unauthorized', reason: auth.reason}, {status: 401});

  const {id} = await ctx.params;

  let body: Partial<{
    name: string;
    display_name: string | null;
    kind: string;
    brand_color: string | null;
    logo_url: string | null;
    app_icon_url: string | null;
    pricing_kickoff: number | null;
    pricing_monthly_fixed: number | null;
    pricing_per_active_user: number | null;
    currency: string;
    notes: string | null;
  }>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({error: 'Invalid JSON'}, {status: 400});
  }

  const update: Record<string, unknown> = {};
  if (body.name !== undefined) {
    const name = String(body.name).trim();
    if (!name) return NextResponse.json({error: 'Name cannot be empty'}, {status: 400});
    update.name = name;
  }
  if (body.display_name !== undefined)
    update.display_name = String(body.display_name).trim() || null;
  if (body.kind !== undefined) {
    const kind = String(body.kind).trim();
    if (kind !== 'client' && kind !== 'regulator')
      return NextResponse.json(
        {error: "kind must be 'client' or 'regulator'"},
        {status: 400}
      );
    update.kind = kind;
  }
  if (body.brand_color !== undefined) update.brand_color = body.brand_color || null;
  if (body.logo_url !== undefined) update.logo_url = body.logo_url || null;
  if (body.app_icon_url !== undefined) update.app_icon_url = body.app_icon_url || null;
  if (body.pricing_kickoff !== undefined) update.pricing_kickoff = body.pricing_kickoff;
  if (body.pricing_monthly_fixed !== undefined)
    update.pricing_monthly_fixed = body.pricing_monthly_fixed;
  if (body.pricing_per_active_user !== undefined)
    update.pricing_per_active_user = body.pricing_per_active_user;
  if (body.currency !== undefined) update.currency = body.currency;
  if (body.notes !== undefined) update.notes = body.notes;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({error: 'No fields to update'}, {status: 400});
  }

  const sb = supabaseAdmin();
  const {data, error} = await sb
    .from('clients')
    .update(update)
    .eq('id', id)
    .select('*')
    .single();

  if (error) return NextResponse.json({error: error.message}, {status: 500});
  return NextResponse.json({client: data});
}
