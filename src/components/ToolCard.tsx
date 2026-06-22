import React from 'react';
import TiltCard from './TiltCard';
import { ToolMetadata } from '@/data/toolsRegistry';

interface ToolCardProps {
  tool: ToolMetadata;
  className?: string;
}

export default function ToolCard({ tool, className = '' }: ToolCardProps) {
  return (
    <TiltCard href={`/tools/${tool.id}`} className={`group p-lg ${className}`}>
      <div className="flex items-start justify-between mb-md">
        <span className="material-symbols-outlined text-primary text-2xl group-hover:scale-110 transition-transform">
          {tool.icon || 'calculate'}
        </span>
        <span className="material-symbols-outlined text-text-secondary text-sm opacity-0 group-hover:opacity-100 transition-opacity">open_in_new</span>
      </div>
      <h4 className="font-headline-md text-headline-md text-[18px] text-text-primary mb-xs group-hover:text-primary transition-colors">
        {tool.title}
      </h4>
      <p className="font-label-md text-label-md text-text-secondary line-clamp-2">
        {tool.description}
      </p>
    </TiltCard>
  );
}
