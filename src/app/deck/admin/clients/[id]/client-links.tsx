'use client';

import {useEffect, useState} from 'react';
import type {PresentationLink, PresentationLinkVariant} from '@/lib/deck/types';

export function ClientLinks({
  clientId,
  clientSlug,
  initialLinks
}: {
  clientId: string;
  clientSlug: string;
  initialLinks: PresentationLink[];
}) {
  const [links, setLinks] = useState(initialLinks);
  const [creating, setCreating] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [variant, setVariant] = useState<PresentationLinkVariant>('full');

  async function createLink() {
    setCreating(true);
    const res = await fetch(`/api/deck/admin/clients/${clientId}/links`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        recipient_name: recipientName || undefined,
        recipient_email: recipientEmail || undefined,
        variant
      })
    });
    setCreating(false);
    const data = await res.json();
    if (res.ok) {
      setLinks([data.link, ...links]);
      setRecipientName('');
      setRecipientEmail('');
      setVariant('full');
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="Recipient name (optional)"
            className="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm"
          />
          <input
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            placeholder="Recipient email (optional)"
            className="bg-zinc-950 border border-zinc-800 rounded-md px-3 py-2 text-sm"
          />
          <button
            onClick={createLink}
            disabled={creating}
            className="bg-zinc-50 text-zinc-950 rounded-md px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            {creating ? 'Creating…' : 'Generate link'}
          </button>
        </div>
        <VariantPicker value={variant} onChange={setVariant} />
      </div>

      {links.length === 0 ? (
        <p className="text-sm text-zinc-500">No links yet.</p>
      ) : (
        <ul className="border border-zinc-900 rounded-md divide-y divide-zinc-900">
          {links.map((l) => (
            <LinkRow key={l.id} link={l} clientSlug={clientSlug} />
          ))}
        </ul>
      )}
    </div>
  );
}

function VariantPicker({
  value,
  onChange
}: {
  value: PresentationLinkVariant;
  onChange: (v: PresentationLinkVariant) => void;
}) {
  const options: Array<{
    value: PresentationLinkVariant;
    label: string;
    hint: string;
  }> = [
    {
      value: 'full',
      label: 'Full deck',
      hint: '18 slides · pitch completo para presentar en vivo'
    },
    {
      value: 'short',
      label: 'Short preview',
      hint: '6 slides · teaser para compartir antes de la reunión'
    }
  ];
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs uppercase tracking-wide text-zinc-400">
        Deck variant
      </span>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`text-left rounded-md border px-3 py-2 transition-colors ${
                active
                  ? 'border-zinc-50 bg-zinc-950'
                  : 'border-zinc-800 hover:border-zinc-700 bg-zinc-950/50'
              }`}
            >
              <div
                className={`text-sm font-medium ${
                  active ? 'text-zinc-50' : 'text-zinc-300'
                }`}
              >
                {opt.label}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">{opt.hint}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function LinkRow({link, clientSlug}: {link: PresentationLink; clientSlug: string}) {
  const [copied, setCopied] = useState<'main' | 'bio' | null>(null);
  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);
  const baseUrl = `${origin}/deck/${clientSlug}/${link.token}`;
  // Default deck route already hides the bio slide. Offer the explicit
  // ?bio=1 URL as a secondary option for warm intros where Bruno wants the
  // background slide included.
  const withBioUrl = `${baseUrl}?bio=1`;
  const isShort = link.variant === 'short';

  const copy = async (url: string, kind: 'main' | 'bio') => {
    await navigator.clipboard.writeText(url);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <li className="px-4 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm text-zinc-300 truncate flex items-center gap-2 flex-wrap">
          <span className="truncate">
            {link.recipient_name ?? 'Untitled link'}
            {link.recipient_email && (
              <span className="text-zinc-500"> · {link.recipient_email}</span>
            )}
          </span>
          <span
            className={`text-[10px] uppercase tracking-wide rounded px-1.5 py-0.5 ${
              isShort
                ? 'bg-amber-500/15 text-amber-300'
                : 'bg-zinc-800/70 text-zinc-400'
            }`}
            title={
              isShort
                ? '6-slide preview deck'
                : 'Full 18-slide deck'
            }
          >
            {isShort ? 'Short' : 'Full'}
          </span>
        </div>
        <div className="text-xs font-mono text-zinc-500 truncate">{baseUrl}</div>
      </div>
      <div className="shrink-0 flex gap-2">
        <button
          onClick={() => copy(baseUrl, 'main')}
          className="text-sm text-zinc-300 hover:text-zinc-50"
          title={isShort ? 'Short preview deck' : 'Full deck (no bio slide)'}
        >
          {copied === 'main' ? 'Copied!' : 'Copy'}
        </button>
        {!isShort && (
          <button
            onClick={() => copy(withBioUrl, 'bio')}
            className="text-sm text-zinc-500 hover:text-zinc-200"
            title="Include the Bruno bio slide"
          >
            {copied === 'bio' ? 'Copied!' : 'Copy (with bio)'}
          </button>
        )}
      </div>
    </li>
  );
}
