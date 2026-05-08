'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';

export function NewClientForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdLink, setCreatedLink] = useState<{slug: string; token: string} | null>(null);

  const [form, setForm] = useState({
    name: '',
    slug: '',
    brand_color: '#000000',
    logo_url: '',
    app_icon_url: '',
    pricing_kickoff: '',
    pricing_monthly_fixed: '',
    pricing_per_active_user: '',
    currency: 'MXN',
    recipient_name: '',
    recipient_email: ''
  });

  function set<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({...f, [k]: v}));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch('/api/deck/admin/clients', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        name: form.name,
        slug: form.slug || undefined,
        brand_color: form.brand_color,
        logo_url: form.logo_url || undefined,
        app_icon_url: form.app_icon_url || undefined,
        pricing_kickoff: form.pricing_kickoff ? Number(form.pricing_kickoff) : null,
        pricing_monthly_fixed: form.pricing_monthly_fixed
          ? Number(form.pricing_monthly_fixed)
          : null,
        pricing_per_active_user: form.pricing_per_active_user
          ? Number(form.pricing_per_active_user)
          : null,
        currency: form.currency,
        recipient_name: form.recipient_name || undefined,
        recipient_email: form.recipient_email || undefined,
        create_initial_link: true
      })
    });
    setLoading(false);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error ?? 'Failed to create client');
      return;
    }
    setCreatedLink({slug: data.client.slug, token: data.link.token});
    router.refresh();
  }

  if (createdLink) {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/deck/${createdLink.slug}/${createdLink.token}`;
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-md p-5">
        <p className="text-sm text-zinc-300 mb-2">Client created. Share this URL:</p>
        <div className="flex gap-2">
          <input
            readOnly
            value={url}
            onFocus={(e) => e.currentTarget.select()}
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm font-mono"
          />
          <button
            onClick={() => navigator.clipboard.writeText(url)}
            className="bg-zinc-50 text-zinc-950 rounded-md px-3 py-2 text-sm font-medium"
          >
            Copy
          </button>
        </div>
        <button
          onClick={() => {
            setCreatedLink(null);
            setOpen(false);
            setForm({
              name: '',
              slug: '',
              brand_color: '#000000',
              logo_url: '',
              app_icon_url: '',
              pricing_kickoff: '',
              pricing_monthly_fixed: '',
              pricing_per_active_user: '',
              currency: 'MXN',
              recipient_name: '',
              recipient_email: ''
            });
          }}
          className="mt-4 text-sm text-zinc-400 hover:text-zinc-200"
        >
          Done
        </button>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-md px-4 py-2 text-sm"
      >
        + Add client
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-zinc-900 border border-zinc-800 rounded-md p-5 space-y-4"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Client name" required>
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
            className="input"
            placeholder="Nubank México"
          />
        </Field>
        <Field label="Slug" hint="auto-derived from name if empty">
          <input
            value={form.slug}
            onChange={(e) => set('slug', e.target.value)}
            className="input"
            placeholder="nubank"
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
        <Field label="Logo URL" hint="optional — upload after creating client for full file support">
          <input
            value={form.logo_url}
            onChange={(e) => set('logo_url', e.target.value)}
            className="input"
            placeholder="https://… or /deck/logos/client.png"
          />
        </Field>
        <Field label="App icon URL" hint="from apps.apple.com — see edit page for instructions">
          <input
            value={form.app_icon_url}
            onChange={(e) => set('app_icon_url', e.target.value)}
            className="input"
            placeholder="https://is1-ssl.mzstatic.com/image/thumb/…"
          />
        </Field>
      </div>

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
      </fieldset>

      <fieldset className="border border-zinc-800 rounded-md p-4">
        <legend className="text-xs uppercase tracking-wide text-zinc-400 px-2">
          First share link (optional)
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Recipient name">
            <input
              value={form.recipient_name}
              onChange={(e) => set('recipient_name', e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Recipient email">
            <input
              type="email"
              value={form.recipient_email}
              onChange={(e) => set('recipient_email', e.target.value)}
              className="input"
            />
          </Field>
        </div>
      </fieldset>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex gap-2 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-zinc-50 text-zinc-950 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Creating…' : 'Create client'}
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

function Field({
  label,
  hint,
  required,
  children
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wide text-zinc-400 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
        {hint && <span className="ml-2 text-zinc-600 normal-case tracking-normal">— {hint}</span>}
      </span>
      {children}
    </label>
  );
}
