import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  // Static export for Netlify hosting. Routes are pre-rendered at build time.
  ...(process.env.NODE_ENV === 'production' && { output: 'export' as const }),
  images: {
    unoptimized: true,
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-frontmatter', 'remark-mdx-frontmatter'],
  },
});

export default withMDX(nextConfig);
