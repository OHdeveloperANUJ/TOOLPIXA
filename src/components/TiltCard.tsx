'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
interface TiltCardProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
}

export default function TiltCard({ children, href, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const moveHandler = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      // Remove transition for instant tracking while moving
      card.style.transition = 'none';
      card.style.transform = `perspective(1000px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    const leaveHandler = () => {
      // Add spring-physics transition for settling back
      card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
    };

    // Clean up inline style when transition ends
    const transitionEndHandler = (e: TransitionEvent) => {
      if (e.propertyName === 'transform' && card.style.transform.includes('scale(1)')) {
        card.style.transition = '';
      }
    };

    card.addEventListener('mousemove', moveHandler);
    card.addEventListener('mouseleave', leaveHandler);
    card.addEventListener('transitionend', transitionEndHandler);
    
    return () => {
      card.removeEventListener('mousemove', moveHandler);
      card.removeEventListener('mouseleave', leaveHandler);
      card.removeEventListener('transitionend', transitionEndHandler);
    };
  }, []);

  const Component = href ? Link : 'div';
  
  return (
    // @ts-expect-error - Polymorphic component typing
    <Component href={href} ref={cardRef} className={`glass-card block relative overflow-hidden ${className}`}>
      {children}
    </Component>
  );
}
