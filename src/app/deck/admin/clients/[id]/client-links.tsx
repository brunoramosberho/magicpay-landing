'use client';

import {useState} from 'react';
import type {PresentationLink} from '@/lib/deck/types';

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

  async function createLink() {
    setCreating(true);
    const res = await fetch(`/api/deck/admin/clients/${clientId}/links`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({
        recipient_name: recipientName || undefined,
        recipient_email: recipientEmail || undefined
      })
    });
    setCreating(false);
    const data = await res.json();
    if (res.ok) {
      setLinks([data.link, ...links]);
      setRecipientName('');
      setRecipientEmail('');
    }
  }

  return (
    <div className="space-y-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-md p-4">
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

function LinkRow({link, clientSlug}: {link: PresentationLink; clientSlug: string}) {
  const [copied, setCopied] = useState<'full' | 'nobio' | null>(null);
  const baseUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/deck/${clientSlug}/${link.token}`
      : `/deck/${clientSlug}/${link.token}`;
  const noBioUrl = `${baseUrl}?bio=0`;

  const copy = async (url: string, kind: 'full' | 'nobio') => {
    await navigator.clipboard.writeText(url);
    setCopied(kind);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <li className="px-4 py-3 flex items-center justify-between gap-3">
      <div className="min-w-0">
        <div className="text-sm text-zinc-300 truncate">
          {link.recipient_name ?? 'Untitled link'}
          {link.recipient_email && (
            <span className="text-zinc-500"> · {link.recipient_email}</span>
          )}
        </div>
        <div className="text-xs font-mono text-zinc-500 truncate">{baseUrl}</div>
      </div>
      <div className="shrink-0 flex gap-2">
        <button
          onClick={() => copy(baseUrl, 'full')}
          className="text-sm text-zinc-300 hover:text-zinc-50"
          title="Full deck (with bio slide)"
        >
          {copied === 'full' ? 'Copied!' : 'Copy'}
        </button>
        <button
          onClick={() => copy(noBioUrl, 'nobio')}
          className="text-sm text-zinc-500 hover:text-zinc-200"
          title="Skip bio slide"
        >
          {copied === 'nobio' ? 'Copied!' : 'Copy (no bio)'}
        </button>
      </div>
    </li>
  );
}
