import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  sm: 578,
  md: 768,
  lg: 1000,
} as const;

export function useBreakpoint() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    let rafId: number;
    const handler = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setWidth(window.innerWidth));
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return {
    isMobile: width < BREAKPOINTS.sm,
    isTablet: width < BREAKPOINTS.md,
    isDesktop: width >= BREAKPOINTS.lg,
    width,
  };
}
