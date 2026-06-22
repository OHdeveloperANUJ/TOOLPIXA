'use client';

import React from 'react';
import SearchBar from './SearchBar';

export default function HeroSearch() {
  return (
    <div className="max-w-2xl mx-auto">
      <SearchBar size="lg" placeholder="What can we calculate for you today?" />
    </div>
  );
}
