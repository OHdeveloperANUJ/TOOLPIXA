'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { User, LogOut } from 'lucide-react';

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="h-10 w-24 bg-surface-2 animate-pulse rounded-lg"></div>;
  }

  if (session && session.user) {
    return (
      <div className="flex items-center gap-4">
        <Link 
          href="/profile" 
          className="flex items-center gap-2 text-sm font-medium text-on-background hover:text-primary transition-colors"
        >
          {session.user.image ? (
            <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-surface-3" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <User size={16} />
            </div>
          )}
          <span className="hidden sm:inline">{session.user.name?.split(' ')[0] || 'Profile'}</span>
        </Link>
        <button 
          onClick={() => signOut()}
          className="text-on-surface hover:text-red-400 transition-colors"
          title="Sign Out"
        >
          <LogOut size={18} />
        </button>
      </div>
    );
  }

  return (
    <Link
      href="/login"
      className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-lg font-medium text-sm hover:bg-primary-hover transition-colors"
    >
      <User size={16} />
      Sign In
    </Link>
  );
}
