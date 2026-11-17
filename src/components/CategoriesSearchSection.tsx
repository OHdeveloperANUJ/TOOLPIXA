'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ToolCard from '@/components/ToolCard';
import SearchBar from '@/components/SearchBar';
import { toolsRegistry } from '@/data/toolsRegistry';

export default function CategoriesSearchSection() {
  const searchParams = useSearchParams();
  const query = (searchParams.get('q') || '').trim();

  const matchingTools = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return Object.values(toolsRegistry).filter(
      (tool) =>
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.id.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="max-w-3xl mx-auto">
      <SearchBar size="lg" placeholder="Search 115+ tools by name or category..." />

      {query && (
        <div className="mt-xl text-left">
          <p className="font-label-md text-xs uppercase tracking-wider text-primary mb-md">
            Showing {matchingTools.length} result{matchingTools.length === 1 ? '' : 's'} for &ldquo;{query}&rdquo;
          </p>
          {matchingTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {matchingTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="glass-card p-lg rounded-2xl border border-glass-border text-text-secondary text-sm">
              No calculators matched &ldquo;{query}&rdquo;. Browse all 8 categories below or try terms like EMI, SIP, Tax, CGPA, BMI, or PDF.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
