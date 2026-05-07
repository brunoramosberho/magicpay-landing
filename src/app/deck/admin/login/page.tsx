import {redirect} from 'next/navigation';
import {getCurrentSession} from '@/lib/deck/admin-auth';
import {LoginForm} from './login-form';

export default async function LoginPage() {
  const session = await getCurrentSession();
  if (session) redirect('/deck/admin');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-1">Magic Pay — Deck Admin</h1>
        <p className="text-sm text-zinc-400 mb-8">Sign in to manage client presentations.</p>
        <LoginForm />
      </div>
    </div>
  );
}
