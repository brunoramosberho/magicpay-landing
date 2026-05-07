import {redirect} from 'next/navigation';
import Link from 'next/link';
import {getCurrentSession} from '@/lib/deck/admin-auth';
import {supabaseAdmin} from '@/lib/supabase/server';
import {NewClientForm} from './new-client-form';
import {LogoutButton} from './logout-button';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const session = await getCurrentSession();
  if (!session) redirect('/deck/admin/login');

  const sb = supabaseAdmin();
  const {data: clients} = await sb
    .from('clients')
    .select('id, slug, name, brand_color, created_at, presentation_links(count), deck_sessions:presentation_links(deck_sessions(count))')
    .is('archived_at', null)
    .order('created_at', {ascending: false});

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-semibold">Deck Admin</h1>
          <p className="text-sm text-zinc-400 mt-1">Signed in as {session.email}</p>
        </div>
        <LogoutButton />
      </header>

      <section className="mb-12">
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-4">New client</h2>
        <NewClientForm />
      </section>

      <section>
        <h2 className="text-sm uppercase tracking-wide text-zinc-400 mb-4">
          Clients ({clients?.length ?? 0})
        </h2>
        {!clients || clients.length === 0 ? (
          <p className="text-sm text-zinc-500">No clients yet. Create one above.</p>
        ) : (
          <ul className="divide-y divide-zinc-900 border border-zinc-900 rounded-md">
            {clients.map((c) => {
              const linksCount = Array.isArray(c.presentation_links)
                ? (c.presentation_links[0] as {count: number} | undefined)?.count ?? 0
                : 0;
              return (
                <li key={c.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{background: c.brand_color ?? '#3f3f46'}}
                      aria-hidden
                    />
                    <div className="min-w-0">
                      <div className="font-medium truncate">{c.name}</div>
                      <div className="text-xs text-zinc-500 truncate">
                        /{c.slug} · {linksCount} link{linksCount === 1 ? '' : 's'}
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/deck/admin/clients/${c.id}`}
                    className="text-sm text-zinc-300 hover:text-zinc-50"
                  >
                    Manage →
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
