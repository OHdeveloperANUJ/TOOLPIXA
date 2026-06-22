'use client';

import React, { useState } from 'react';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

export default function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div className="space-y-sm">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="glass-card rounded-xl overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center p-md text-left hover:bg-glass-surface" 
            >
              <span className="font-body-lg text-body-lg text-text-primary font-medium">{faq.question}</span>
              <span className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 px-md text-text-secondary font-body-md text-body-md ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="pb-md">
                {faq.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
