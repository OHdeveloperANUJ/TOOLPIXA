'use client';

import React, { useState, useMemo } from 'react';
import ToolCard from '@/components/ToolCard';

interface CategoryToolsGridProps {
  initialTools: any[];
  category: string;
}

const CATEGORY_TABS: Record<string, string[]> = {
  finance: ['All', 'Loans', 'Tax', 'Investments', 'Savings', 'Retirement', 'Margin'],
  student: ['All', 'Grades', 'Time', 'Writing', 'Math', 'Estimator'],
  health: ['All', 'Fitness', 'Diet', 'Medical', 'Body'],
  converter: ['All', 'Unit', 'Data', 'Time', 'Text'],
  developer: ['All', 'Format', 'Encode', 'Generator', 'Convert'],
  image: ['All', 'Compress', 'Convert', 'Edit', 'Size'],
  video: ['All', 'Youtube', 'Download'],
  pdf: ['All', 'Compress', 'Merge', 'Convert', 'Edit']
};

export default function CategoryToolsGrid({ initialTools, category }: CategoryToolsGridProps) {
  const [activeTab, setActiveTab] = useState('All');
  
  const tabs = CATEGORY_TABS[category.toLowerCase()] || ['All', 'Popular', 'New'];

  const filteredTools = useMemo(() => {
    if (activeTab === 'All') return initialTools;
    
    return initialTools.filter(tool => {
      // Simple keyword matching for filtering
      const searchStr = `${tool.title} ${tool.id} ${tool.description}`.toLowerCase();
      const keyword = activeTab.toLowerCase();
      
      // Handle special mappings
      if (keyword === 'loans' && searchStr.includes('loan')) return true;
      if (keyword === 'tax' && (searchStr.includes('tax') || searchStr.includes('gst'))) return true;
      if (keyword === 'grades' && searchStr.includes('grade')) return true;
      if (keyword === 'edit' && (searchStr.includes('flip') || searchStr.includes('rotate') || searchStr.includes('split') || searchStr.includes('add'))) return true;
      if (keyword === 'size' && searchStr.includes('size')) return true;
      
      return searchStr.includes(keyword);
    });
  }, [initialTools, activeTab]);

  return (
    <>
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-margin py-md">
          <div className="flex items-center gap-sm overflow-x-auto hide-scrollbar whitespace-nowrap">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-lg py-2 rounded-full font-headline-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-primary-container text-on-primary-container border border-primary/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]'
                    : 'glass-card text-text-secondary hover:text-text-primary hover:border-primary/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-margin py-xxl min-h-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredTools.length > 0 ? (
            filteredTools.map((tool, index) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                className={`animate-fade-in-up ${index > 0 ? `animate-stagger-${Math.min(index, 5)}` : ''}`} 
              />
            ))
          ) : (
            <div className="col-span-full py-xxxl text-center animate-fade-in-up">
              <div className="inline-flex w-24 h-24 rounded-full bg-glass-surface border border-glass-border items-center justify-center mb-md shadow-lg">
                <span className="material-symbols-outlined text-text-secondary text-4xl">search_off</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-text-primary mb-xs">No Tools Found</h3>
              <p className="font-body-md text-text-secondary">We couldn't find any tools matching "{activeTab}" in this category.</p>
              <button 
                onClick={() => setActiveTab('All')}
                className="mt-4 px-6 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-all"
              >
                View All {category} Tools
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
