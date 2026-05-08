import {NextRequest, NextResponse} from 'next/server';
import {getCurrentSessionDetailed} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';

export const runtime = 'nodejs';

const BUCKET = 'client-logos';
const MAX_BYTES = 2 * 1024 * 1024;
const ALLOWED_EXT = ['png', 'jpg', 'jpeg', 'svg', 'webp'];

async function ensureBucket(sb: ReturnType<typeof supabaseAdmin>) {
  const {data: buckets, error} = await sb.storage.listBuckets();
  if (error) return;
  if (buckets?.some((b) => b.name === BUCKET)) return;
  await sb.storage.createBucket(BUCKET, {public: true});
}

export async function POST(
  req: NextRequest,
  ctx: {params: Promise<{id: string}>}
) {
  const auth = await getCurrentSessionDetailed();
  if (!auth.ok)
    return NextResponse.json({error: 'Unauthorized', reason: auth.reason}, {status: 401});

  const {id} = await ctx.params;

  const formData = await req.formData().catch(() => null);
  const file = formData?.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({error: 'No file provided'}, {status: 400});
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({error: 'File must be ≤ 2 MB'}, {status: 400});
  }
  const ext = (file.name.split('.').pop() ?? '').toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return NextResponse.json(
      {error: `Extension must be one of: ${ALLOWED_EXT.join(', ')}`},
      {status: 400}
    );
  }

  const sb = supabaseAdmin();
  const {data: client, error: clientErr} = await sb
    .from('clients')
    .select('id, slug')
    .eq('id', id)
    .maybeSingle();
  if (clientErr) return NextResponse.json({error: clientErr.message}, {status: 500});
  if (!client) return NextResponse.json({error: 'Client not found'}, {status: 404});

  await ensureBucket(sb);

  const path = `${client.slug}-${Date.now()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const {error: uploadError} = await sb.storage.from(BUCKET).upload(path, buffer, {
    contentType: file.type || `image/${ext === 'svg' ? 'svg+xml' : ext}`,
    upsert: true,
    cacheControl: '31536000'
  });
  if (uploadError) return NextResponse.json({error: uploadError.message}, {status: 500});

  const {data: urlData} = sb.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = urlData.publicUrl;

  const {data: updated, error: updateError} = await sb
    .from('clients')
    .update({logo_url: publicUrl})
    .eq('id', id)
    .select('*')
    .single();
  if (updateError) return NextResponse.json({error: updateError.message}, {status: 500});

  return NextResponse.json({client: updated, logo_url: publicUrl});
}
