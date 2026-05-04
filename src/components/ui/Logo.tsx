import React from 'react';

export function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="logo-grad-primary" x1="10" y1="10" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="0.6" stopColor="#6366F1" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="logo-grad-green" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#059669" />
        </linearGradient>
      </defs>
      
      <g transform="translate(10, 10)">
        {/* Main top-left hex */}
        <path d="M30 0 L56 15 L56 45 L30 60 L4 45 L4 15 Z" fill="url(#logo-grad-primary)"/>
        
        {/* Main bottom-right hex */}
        <path d="M70 40 L96 55 L96 85 L70 100 L44 85 L44 55 Z" fill="url(#logo-grad-primary)"/>
        
        {/* Blue inner bridge connecting the shapes */}
        <path d="M44 38 L56 45 L56 62 L44 55 Z" fill="#3B82F6" />

        {/* Inner dark hexagonal cutouts */}
        <path d="M30 14 L42 21 L42 35 L30 42 L18 35 L18 21 Z" fill="#0F172A" />
        <path d="M70 54 L82 61 L82 75 L70 82 L58 75 L58 61 Z" fill="#0F172A" />

        {/* Inner green Hexagons */}
        <path d="M30 19 L37 23 L37 31 L30 35 L23 31 L23 23 Z" fill="url(#logo-grad-green)" />
        <path d="M70 59 L77 63 L77 71 L70 75 L63 71 L63 63 Z" fill="url(#logo-grad-green)" />

        {/* Blue inner bridge between dark hexes */}
        <path d="M38 33 L52 41 L48 48 L34 40 Z" fill="#3B82F6" />

        {/* Top Right Arrows */}
        <path d="M68 15 L80 8 L92 15 L92 23 L80 16 L68 23 Z" fill="url(#logo-grad-green)" />
        <path d="M68 25 L80 18 L92 25 L92 33 L80 26 L68 33 Z" fill="#8B5CF6" />

        {/* Bottom Left Arrows */}
        <path d="M8 67 L20 60 L32 67 L32 75 L20 68 L8 75 Z" fill="url(#logo-grad-green)" />
        <path d="M8 77 L20 70 L32 77 L32 85 L20 78 L8 85 Z" fill="#1E293B" />
      </g>
    </svg>
  );
}

