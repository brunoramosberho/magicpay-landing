'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

type Client = {
  id: string;
  name: string;
  display_name: string | null;
  kind: string | null;
  brand_color: string | null;
  logo_url: string | null;
  app_icon_url: string | null;
  pricing_kickoff: number | null;
  pricing_monthly_fixed: number | null;
  pricing_per_active_user: number | null;
  currency: string;
  notes: string | null;
};

export function ClientEdit({client}: {client: Client}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: client.name,
    display_name: client.display_name ?? '',
    kind: client.kind === 'regulator' ? 'regulator' : 'client',
    brand_color: client.brand_color ?? '#000000',
    logo_url: client.logo_url ?? '',
    app_icon_url: client.app_icon_url ?? '',
    pricing_kickoff: client.pricing_kickoff?.toString() ?? '',
    pricing_monthly_fixed: client.pricing_monthly_fixed?.toString() ?? '',
    pricing_per_active_user: client.pricing_per_active_user?.toString() ?? '',
    currency: client.currency,
    notes: client.notes ?? ''
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({...f, [k]: v}));
  }

  async function uploadLogo(file: File) {
    setError(null);
    setUploading(true);
    const fd = new FormData();
    fd.append('file', file);
    const res = await fetch(`/api/deck/admin/clients/${client.id}/logo`, {
      method: 'POST',
      body: fd
    });
    setUploading(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(formatError(data, 'Upload failed'));
      return;
    }
    setForm((f) => ({...f, logo_url: data.logo_url}));
    router.refresh();
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const res = await fetch(`/api/deck/admin/clients/${client.id}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: form.name,
        display_name: form.display_name || null,
        kind: form.kind,
        brand_color: form.brand_color,
        logo_url: form.logo_url || null,
        app_icon_url: form.app_icon_url || null,
        pricing_kickoff: form.pricing_kickoff ? Number(form.pricing_kickoff) : null,
        pricing_monthly_fixed: form.pricing_monthly_fixed
          ? Number(form.pricing_monthly_fixed)
          : null,
        pricing_per_active_user: form.pricing_per_active_user
          ? Number(form.pricing_per_active_user)
          : null,
        currency: form.currency,
        notes: form.notes || null
      })
    });
    setSaving(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(formatError(data, 'Save failed'));
      return;
    }
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-md px-4 py-2 text-sm"
      >
        Edit client
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-md p-5 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Name">
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
            className="input"
          />
        </Field>
        <Field label="Brand color">
          <input
            type="color"
            value={form.brand_color}
            onChange={(e) => set('brand_color', e.target.value)}
            className="input h-10 p-1"
          />
        </Field>
      </div>

      <fieldset className="border border-zinc-800 rounded-md p-4">
        <legend className="text-xs uppercase tracking-wide text-zinc-400 px-2">
          Audience
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Kind">
            <select
              value={form.kind}
              onChange={(e) => set('kind', e.target.value)}
              className="input"
            >
              <option value="client">client</option>
              <option value="regulator">regulator</option>
            </select>
          </Field>
          <Field label="Display name" hint="chrome label — falls back to Name">
            <input
              value={form.display_name}
              onChange={(e) => set('display_name', e.target.value)}
              className="input"
              placeholder="e.g. CNBV"
            />
          </Field>
        </div>
        <p className="text-xs text-zinc-500 mt-3">
          <strong className="text-zinc-300">regulator</strong> swaps the deck to the
          generic &ldquo;el banco&rdquo; copy, hides the bank logo/app icon inside the
          slides, and adds the keyboard-extension equivalence slide. Set{' '}
          <strong className="text-zinc-300">Name</strong> to{' '}
          <code className="text-zinc-400">el banco</code> and{' '}
          <strong className="text-zinc-300">Display name</strong> to the regulator
          (e.g. CNBV) shown in the header/footer.
        </p>
      </fieldset>

      <fieldset className="border border-zinc-800 rounded-md p-4">
        <legend className="text-xs uppercase tracking-wide text-zinc-400 px-2">Logo</legend>
        <div className="flex items-center gap-4 mb-3">
          {form.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.logo_url}
              alt="logo preview"
              className="h-10 w-10 rounded-md object-contain bg-zinc-950 border border-zinc-800 p-1"
            />
          ) : (
            <span className="h-10 w-10 rounded-md bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 text-xs">
              none
            </span>
          )}
          <label className="bg-zinc-50 text-zinc-950 rounded-md px-3 py-2 text-sm font-medium cursor-pointer hover:bg-zinc-200">
            {uploading ? 'Uploading…' : 'Upload file'}
            <input
              type="file"
              accept="image/png,image/jpeg,image/svg+xml,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadLogo(f);
                e.currentTarget.value = '';
              }}
            />
          </label>
          {form.logo_url && (
            <button
              type="button"
              onClick={() => set('logo_url', '')}
              className="text-zinc-400 hover:text-zinc-200 text-sm"
            >
              Remove
            </button>
          )}
        </div>
        <Field label="Or paste URL">
          <input
            value={form.logo_url}
            onChange={(e) => set('logo_url', e.target.value)}
            className="input"
            placeholder="https://… or /deck/logos/client.png"
          />
        </Field>
        <p className="text-xs text-zinc-500 mt-2">
          PNG, JPG, SVG or WebP · max 2 MB · upload goes to Supabase Storage (bucket{' '}
          <code className="text-zinc-400">client-logos</code>).
        </p>
      </fieldset>

      <fieldset className="border border-zinc-800 rounded-md p-4">
        <legend className="text-xs uppercase tracking-wide text-zinc-400 px-2">App icon</legend>
        <div className="flex items-center gap-4 mb-3">
          {form.app_icon_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={form.app_icon_url}
              alt="app icon preview"
              className="h-14 w-14 object-cover bg-zinc-950"
              style={{borderRadius: '28%'}}
            />
          ) : (
            <span
              className="h-14 w-14 bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600 text-xs"
              style={{borderRadius: '28%'}}
            >
              none
            </span>
          )}
          <div className="flex-1">
            <Field label="Image URL from App Store">
              <input
                value={form.app_icon_url}
                onChange={(e) => set('app_icon_url', e.target.value)}
                className="input"
                placeholder="https://is1-ssl.mzstatic.com/image/thumb/…/512x512bb.png"
              />
            </Field>
          </div>
        </div>
        <details className="text-xs text-zinc-500">
          <summary className="cursor-pointer text-zinc-400 hover:text-zinc-200 mb-2">
            How to get the App Store icon URL
          </summary>
          <ol className="list-decimal pl-5 space-y-1 mt-2">
            <li>
              Go to{' '}
              <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="text-zinc-300 underline">
                apps.apple.com
              </a>{' '}
              and find the bank&apos;s app.
            </li>
            <li>Right-click on the big app icon at the top of the page.</li>
            <li>
              Select <strong>Copy Image Address</strong> (Chrome/Safari/Firefox).
            </li>
            <li>
              Paste here. URL usually looks like{' '}
              <code className="text-zinc-400">
                https://is1-ssl.mzstatic.com/image/thumb/.../1024x1024bb.png
              </code>
              .
            </li>
          </ol>
        </details>
      </fieldset>

      <fieldset className="border border-zinc-800 rounded-md p-4">
        <legend className="text-xs uppercase tracking-wide text-zinc-400 px-2">Pricing</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Field label="Kick off">
            <input
              type="number"
              step="0.01"
              value={form.pricing_kickoff}
              onChange={(e) => set('pricing_kickoff', e.target.value)}
              className="input"
              placeholder="0"
            />
          </Field>
          <Field label="Monthly fixed">
            <input
              type="number"
              step="0.01"
              value={form.pricing_monthly_fixed}
              onChange={(e) => set('pricing_monthly_fixed', e.target.value)}
              className="input"
              placeholder="0"
            />
          </Field>
          <Field label="Per active user">
            <input
              type="number"
              step="0.01"
              value={form.pricing_per_active_user}
              onChange={(e) => set('pricing_per_active_user', e.target.value)}
              className="input"
              placeholder="0"
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Currency">
            <select
              value={form.currency}
              onChange={(e) => set('currency', e.target.value)}
              className="input"
            >
              <option value="MXN">MXN</option>
              <option value="USD">USD</option>
            </select>
          </Field>
        </div>
      </fieldset>

      <Field label="Notes">
        <textarea
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          className="input min-h-[80px]"
          placeholder="Internal notes (optional)"
        />
      </Field>

      {error && (
        <div className="text-sm text-red-400">
          <p>{error}</p>
          {error.startsWith('Unauthorized') && (
            <button
              type="button"
              onClick={async () => {
                await fetch('/api/deck/admin/logout', {method: 'POST'});
                router.replace('/deck/admin/login');
                router.refresh();
              }}
              className="mt-2 underline hover:text-red-300"
            >
              → Ir a login
            </button>
          )}
        </div>
      )}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-zinc-50 text-zinc-950 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-zinc-400 hover:text-zinc-200 px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </div>

      <style jsx>{`
        :global(.input) {
          width: 100%;
          background: rgb(9 9 11);
          border: 1px solid rgb(39 39 42);
          border-radius: 0.375rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          color: inherit;
        }
        :global(.input:focus) {
          outline: none;
          border-color: rgb(82 82 91);
        }
      `}</style>
    </form>
  );
}

function formatError(data: {error?: string; reason?: string}, fallback: string): string {
  if (!data.error) return fallback;
  if (data.reason === 'no-cookie')
    return 'Unauthorized — sesión no encontrada. Cierra esta página y vuelve a entrar a /deck/admin/login.';
  if (data.reason === 'invalid-jwt')
    return 'Unauthorized — sesión inválida (probablemente cambió ADMIN_SESSION_SECRET). Vuelve a entrar a /deck/admin/login.';
  if (data.reason === 'email-not-allowed')
    return 'Unauthorized — tu email no está en ADMIN_ALLOWED_EMAIL_DOMAINS.';
  return data.error;
}

function Field({label, hint, children}: {label: string; hint?: string; children: React.ReactNode}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
        {label}
        {hint && <span className="ml-2 text-zinc-600 normal-case tracking-normal">— {hint}</span>}
      </span>
      {children}
    </label>
  );
}
