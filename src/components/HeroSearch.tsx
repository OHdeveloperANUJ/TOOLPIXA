'use client';

import React from 'react';
import SearchBar from './SearchBar';

export default function HeroSearch() {
  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar size="lg" placeholder="Search 115+ calculators & tools..." />
    </div>
  );
}
