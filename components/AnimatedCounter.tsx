'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      spring.set(value);
      setHasAnimated(true);
    }
  }, [isInView, value, spring, hasAnimated]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
};

interface ProgressRingProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  showValue?: boolean;
  animate?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = 120,
  strokeWidth = 8,
  color = 'url(#gradient)',
  bgColor = 'rgba(255,255,255,0.1)',
  showValue = true,
  animate = true,
  className = '',
  children,
}) => {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  const spring = useSpring(0, {
    duration: 1500,
    bounce: 0,
  });

  const strokeDashoffset = useTransform(
    spring,
    (val) => circumference - (val / 100) * circumference
  );

  useEffect(() => {
    if (isInView && animate) {
      spring.set(normalizedProgress);
    } else if (!animate) {
      spring.set(normalizedProgress);
    }
  }, [isInView, normalizedProgress, spring, animate]);

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        ref={ref}
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#EC4899" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />

        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          style={{ strokeDashoffset }}
          filter="url(#glow)"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showValue ? (
          <AnimatedCounter
            value={normalizedProgress}
            suffix="%"
            className="text-2xl font-bold text-white"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

interface AnimatedBarProps {
  progress: number;
  height?: number;
  animate?: boolean;
  className?: string;
  showGlow?: boolean;
}

export const AnimatedBar: React.FC<AnimatedBarProps> = ({
  progress,
  height = 8,
  animate = true,
  className = '',
  showGlow = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div
      ref={ref}
      className={`w-full overflow-hidden rounded-full bg-white/10 ${className}`}
      style={{ height }}
    >
      <motion.div
        className={`h-full rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 ${
          showGlow ? 'shadow-lg shadow-primary-500/30' : ''
        }`}
        initial={{ width: 0 }}
        animate={isInView || !animate ? { width: `${normalizedProgress}%` } : { width: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />
    </div>
  );
};
