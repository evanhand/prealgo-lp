'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

export function FaqItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        isOpen ? 'border-primary-500/30 bg-primary-500/[0.04]' : 'border-white/[0.08] bg-white/[0.02]'
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="text-base font-semibold text-white">{q}</span>
        <ChevronDown
          className={`h-4 w-4 flex-shrink-0 text-white/45 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div
            className={`px-5 pb-5 text-sm text-white/65 leading-relaxed transition-opacity duration-200 ${
              isOpen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {a}
          </div>
        </div>
      </div>
    </div>
  );
}
