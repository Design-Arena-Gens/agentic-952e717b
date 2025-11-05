"use client";

import React from 'react';
import { format } from 'date-fns';

export type InstagramPostProps = {
  title: string;
  summary: string;
  date: Date;
  location: string;
  source: string;
  link: string;
};

export function InstagramPost({ title, summary, date, location, source, link }: InstagramPostProps) {
  const displayDate = format(date, 'd MMM yyyy');
  const emojis = ['???', '???', '??'];

  return (
    <div className="square-canvas relative text-white">
      {/* Background visuals: stylized skyline */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-black" />
      <div className="absolute inset-0 opacity-15">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="ylw" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFC107" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFC107" stopOpacity="0.05" />
            </linearGradient>
          </defs>
          <rect x="0" y="220" width="1200" height="200" fill="url(#ylw)" />
          <g fill="#FFC107">
            <rect x="40" y="180" width="60" height="120" />
            <rect x="120" y="150" width="50" height="150" />
            <rect x="190" y="200" width="70" height="100" />
            <rect x="280" y="130" width="60" height="170" />
            <rect x="360" y="170" width="50" height="130" />
            <rect x="430" y="140" width="80" height="160" />
            <rect x="530" y="190" width="65" height="110" />
            <rect x="610" y="160" width="55" height="140" />
            <rect x="680" y="200" width="70" height="100" />
            <rect x="770" y="150" width="60" height="150" />
            <rect x="850" y="175" width="55" height="125" />
            <rect x="920" y="130" width="65" height="170" />
            <rect x="1000" y="190" width="70" height="110" />
            <rect x="1090" y="170" width="50" height="130" />
          </g>
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-8">
        <span className="badge px-3 py-1 rounded-md">Mumbai News</span>
        <span className="text-sm text-white/80">{emojis.join(' ')}</span>
      </div>

      {/* Headline */}
      <div className="relative z-10 px-8">
        <h1 className="hi-contrast text-4xl md:text-6xl font-black tracking-tight leading-tight">
          {title}
        </h1>
      </div>

      {/* Meta */}
      <div className="relative z-10 px-8 mt-4 text-white/80 font-medium">
        <span className="inline-flex items-center gap-2 text-sm md:text-base">
          <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)]" />
          {location} ? {displayDate}
        </span>
      </div>

      {/* Summary */}
      <div className="relative z-10 px-8 mt-6 max-w-3xl text-lg md:text-2xl leading-relaxed">
        {summary}
      </div>

      {/* Footer */}
      <div className="relative z-10 px-8 mt-6 flex flex-wrap gap-3 text-xs md:text-sm text-black">
        {['#MumbaiNews', '#MumbaiUpdates', '#MumbaiCity', '#BreakingNews', '#LocalMumbai'].map((tag) => (
          <span key={tag} className="badge px-2 py-1 rounded">{tag}</span>
        ))}
      </div>

      {/* Source */}
      <div className="relative z-10 px-8 mt-6 text-xs text-white/60">
        Source: <a href={link} className="underline hover:text-white" target="_blank" rel="noreferrer">{source}</a>
      </div>
    </div>
  );
}
