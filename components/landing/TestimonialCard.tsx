'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="flex flex-col rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
    >
      <div className="mb-3 flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="mb-4 flex-grow text-sm leading-relaxed text-white/70">"{quote}"</p>
      <div>
        <p className="text-sm font-medium text-white">{author}</p>
        <p className="text-xs text-white/40">{role}</p>
      </div>
    </motion.div>
  );
};
