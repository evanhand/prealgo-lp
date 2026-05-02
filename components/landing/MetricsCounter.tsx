'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface CounterProps {
  end: number;
  duration: number;
  label: string;
  description: string;
  suffix?: string;
  icon: React.ReactNode;
  delay?: number;
  isVisible: boolean;
  accentColor: string;
}

const Counter: React.FC<CounterProps> = ({
  end,
  duration,
  label,
  description,
  suffix = '',
  icon,
  delay = 0,
  isVisible,
  accentColor,
}) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const delayTimeout = setTimeout(() => {
      let startTime: number | null = null;
      let animationFrame: number | null = null;

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        // Ease-out cubic for a satisfying deceleration
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(eased * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(step);
        } else {
          setCount(end);
        }
      };

      animationFrame = requestAnimationFrame(step);

      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [isVisible, end, duration, delay]);

  // Format the number with commas
  const formattedCount = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: 'easeOut' }}
      className="relative group"
    >
      {/* Glass card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20">
        {/* Subtle gradient accent at top of card */}
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${accentColor} opacity-60 group-hover:opacity-100 transition-opacity duration-300`}
        />

        {/* Icon */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
          {icon}
        </div>

        {/* Counter number */}
        <div className="text-4xl sm:text-5xl font-bold text-white min-h-[56px] tracking-tight">
          {formattedCount}
          {suffix}
        </div>

        {/* Label */}
        <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-white/50">
          {label}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-white/40">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const MetricsCounter: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once triggered, no need to keep observing
          observer.unobserve(node);
        }
      },
      {
        threshold: 0.2,
      }
    );

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, []);

  return (
    <section ref={sectionRef} className="bg-neutral-900 py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight pb-2 bg-gradient-to-r from-white via-primary-200 to-secondary-200 bg-clip-text text-transparent mb-4">
            Real Results from Real Creators
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed">
            Creators who use PreAlgo before posting see measurable improvements
            across every metric.
          </p>
        </motion.div>

        {/* Counter cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Counter
            end={15000}
            duration={2000}
            label="Videos Analyzed"
            description="Videos analyzed to train our AI"
            suffix="+"
            icon={<BarChart2 className="h-6 w-6 text-primary-400" />}
            delay={0}
            isVisible={isVisible}
            accentColor="from-primary-500 to-primary-400"
          />
          <Counter
            end={45}
            duration={2000}
            label="Retention Lift"
            description="Average retention improvement"
            suffix="%"
            icon={<TrendingUp className="h-6 w-6 text-secondary-400" />}
            delay={200}
            isVisible={isVisible}
            accentColor="from-secondary-500 to-secondary-400"
          />
          <Counter
            end={1000}
            duration={2000}
            label="Active Creators"
            description="Creators optimizing with PreAlgo"
            suffix="+"
            icon={<Users className="h-6 w-6 text-accent-400" />}
            delay={400}
            isVisible={isVisible}
            accentColor="from-accent-500 to-accent-400"
          />
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="text-center mt-12"
        >
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-primary-300 transition-colors duration-200"
          >
            Join them
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
