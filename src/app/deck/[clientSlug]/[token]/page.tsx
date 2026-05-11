import {notFound} from 'next/navigation';
import {supabaseAdmin} from '@/lib/supabase/server';
import {DeckShell} from '@/components/deck/deck-shell';
import {deckSlides} from '@/components/deck/slides';

export const dynamic = 'force-dynamic';

type Params = {clientSlug: string; token: string};
type Search = {bio?: string};

export default async function DeckPage({
  params,
  searchParams
}: {
  params: Promise<Params>;
  searchParams: Promise<Search>;
}) {
  const {clientSlug, token} = await params;
  const {bio} = await searchParams;
  // Slide 2 (Bruno bio / "background") is skipped by default. Append `?bio=1`
  // (or `bio=true`) to include it. Anything else — including `?bio=0` — keeps
  // the slide hidden. Slide numbers auto-renumber based on the filtered array.
  const includeBio = bio === '1' || bio === 'true';
  const sb = supabaseAdmin();

  const {data: link} = await sb
    .from('presentation_links')
    .select('id, token, revoked_at, expires_at, client:clients(*)')
    .eq('token', token)
    .maybeSingle();

  if (!link || !link.client) notFound();
  if (link.revoked_at) notFound();
  if (link.expires_at && new Date(link.expires_at) < new Date()) notFound();

  const client = Array.isArray(link.client) ? link.client[0] : link.client;
  // Edge case: empty join returns []; link.client[0] is undefined.
  if (!client || client.slug !== clientSlug) notFound();

  const slides = includeBio
    ? deckSlides
    : deckSlides.filter((_, i) => i !== 1);
  // Slide files use 'use client', so the SlideDef objects arrive on the server
  // as client references — `s.id` reads as undefined here. We therefore filter
  // by index (background is at position 1) instead of by id.

  return (
    <DeckShell
      token={token}
      client={{
        slug: client.slug,
        name: client.name,
        display_name: client.display_name ?? null,
        kind: client.kind === 'regulator' ? 'regulator' : 'client',
        brand_color: client.brand_color ?? null,
        logo_url: client.logo_url ?? null,
        app_icon_url: client.app_icon_url ?? null,
        currency: client.currency,
        pricing_kickoff: client.pricing_kickoff ?? null,
        pricing_monthly_fixed: client.pricing_monthly_fixed ?? null,
        pricing_per_active_user: client.pricing_per_active_user ?? null
      }}
      slides={slides}
    />
  );
}
