'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  return (
    <button
      onClick={async () => {
        setLoading(true);
        await fetch('/api/deck/admin/logout', {method: 'POST'});
        router.replace('/deck/admin/login');
        router.refresh();
      }}
      disabled={loading}
      className="text-sm text-zinc-400 hover:text-zinc-200 disabled:opacity-50"
    >
      {loading ? 'Signing out…' : 'Sign out'}
    </button>
  );
}
