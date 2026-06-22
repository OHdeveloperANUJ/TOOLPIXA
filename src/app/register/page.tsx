'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Registration failed');
        setLoading(false);
        return;
      }

      // Auto login after successful registration
      const signInRes = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (signInRes?.error) {
        setError('Registered successfully, but auto-login failed.');
        setLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center pt-16 px-4 bg-background">
      <div className="max-w-md w-full mx-auto bg-surface-container border border-glass-border rounded-2xl p-8 shadow-2xl relative overflow-hidden">
        {/* Glow Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-32 bg-secondary/20 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="text-center mb-8 relative z-10">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-secondary/20 text-secondary">
            <UserPlus size={28} />
          </div>
          <h1 className="text-3xl font-headline-lg font-bold text-text-primary tracking-tight">Create Account</h1>
          <p className="text-text-secondary mt-2 font-body-md">Join ToolPixa to unlock features.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-container-high border border-glass-border rounded-xl focus:ring-2 focus:ring-secondary focus:outline-none text-text-primary transition-all"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-surface-container-high border border-glass-border rounded-xl focus:ring-2 focus:ring-secondary focus:outline-none text-text-primary transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-surface-container-high border border-glass-border rounded-xl focus:ring-2 focus:ring-secondary focus:outline-none text-text-primary transition-all"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-bold hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-70"
          >
            {loading ? <div className="w-5 h-5 border-2 border-on-secondary border-t-transparent rounded-full animate-spin"></div> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-text-secondary mt-6 text-sm relative z-10">
          Already have an account?{' '}
          <Link href="/login" className="text-secondary font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
