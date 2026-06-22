'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Clock, Calculator, ArrowRight } from 'lucide-react';

interface HistoryItem {
  id: string;
  toolId: string;
  inputData: string;
  createdAt: string;
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    } else if (status === 'authenticated') {
      fetch('/api/history')
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setHistory(data.history);
          }
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [status, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!session) return null;

  return (
    <div className="pt-24 pb-20 px-4 max-w-4xl mx-auto">
      <div className="bg-glass-surface border border-glass-border rounded-2xl p-8 mb-8 backdrop-blur-xl shadow-2xl flex items-center gap-6">
        {session.user?.image ? (
          <img src={session.user.image} alt="Profile" className="w-20 h-20 rounded-full border-2 border-primary" />
        ) : (
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl font-bold">
            {session.user?.name?.charAt(0) || 'U'}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-headline-lg font-bold text-text-primary">{session.user?.name}</h1>
          <p className="text-text-secondary">{session.user?.email}</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Clock className="text-primary" />
        Saved Calculations
      </h2>

      {history.length === 0 ? (
        <div className="bg-surface-container border border-glass-border rounded-2xl p-12 text-center">
          <Calculator className="w-16 h-16 text-text-secondary mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-bold mb-2">No history yet</h3>
          <p className="text-text-secondary mb-6">Calculate something and hit "Save" to build your history.</p>
          <Link href="/categories" className="px-6 py-3 bg-primary text-on-primary rounded-xl font-medium inline-block hover:bg-primary-hover transition-colors">
            Explore Tools
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {history.map((item) => {
            let data = {};
            try { data = JSON.parse(item.inputData); } catch (e) {}
            
            return (
              <div key={item.id} className="bg-glass-surface border border-glass-border rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/50 transition-colors">
                <div>
                  <h3 className="font-bold text-lg mb-1 capitalize text-primary">
                    {item.toolId.replace(/-/g, ' ')}
                  </h3>
                  <p className="text-sm text-text-secondary mb-2">
                    {new Date(item.createdAt).toLocaleDateString(undefined, { 
                      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                    })}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {Object.entries(data).map(([key, val]) => (
                      <span key={key} className="px-2 py-1 bg-surface-container-high rounded-md text-xs font-mono text-text-secondary border border-glass-border">
                        {key}: {String(val)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href={`/tools/${item.toolId}?historyId=${item.id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg transition-colors font-medium text-sm whitespace-nowrap self-start md:self-auto"
                >
                  Reload 
                  <ArrowRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
