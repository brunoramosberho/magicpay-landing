import {notFound} from 'next/navigation';
import {supabaseAdmin} from '@/lib/supabase/server';
import {DeckShell} from '@/components/deck/deck-shell';
import {deckSlides} from '@/components/deck/slides';

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
  if (client.slug !== clientSlug) notFound();

  // The "background / Bruno bio" slide is skipped by default. Append `?bio=1`
  // to include it. Slide numbers auto-renumber based on the filtered array.
  const slides = bio === '1' ? deckSlides : deckSlides.filter((s) => s.id !== 'background');

  return (
    <DeckShell
      token={token}
      client={{
        slug: client.slug,
        name: client.name,
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
