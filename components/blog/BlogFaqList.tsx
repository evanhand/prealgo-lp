'use client';

import React, { useState } from 'react';
import { FaqItem } from '../landing/FaqItem';

export function BlogFaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-2">
      {faqs.map((f, i) => (
        <FaqItem
          key={f.q}
          q={f.q}
          a={f.a}
          isOpen={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? null : i)}
        />
      ))}
    </div>
  );
}
