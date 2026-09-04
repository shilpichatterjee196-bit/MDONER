import React, { useEffect, useState, useRef } from 'react';

/**
 * Smoothly animates numbers from 0 to target on initial mount.
 * Handles decimals, percentage suffixes, and prefixes.
 * Does not restart on unrelated state updates.
 */
export default function AnimatedCounter({ value, duration = 1100, className = '' }) {
  const [displayValue, setDisplayValue] = useState(0);
  const hasAnimatedRef = useRef(false);

  // Extract numeric and non-numeric parts
  const rawString = String(value ?? '0');
  const match = rawString.match(/^([^\d.]*)(\d+(?:\.\d+)?)(.*)$/);

  const prefix = match ? match[1] : '';
  const targetNumber = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : '';
  const decimalPlaces = match && match[2].includes('.') ? match[2].split('.')[1].length : 0;
  const hasLeadingZero = Boolean(match && match[2].length > 1 && match[2].startsWith('0') && !match[2].includes('.'));
  const padLength = match ? match[2].length : 0;

  useEffect(() => {
    // Check user preference for reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(targetNumber);
      return;
    }

    if (hasAnimatedRef.current) {
      setDisplayValue(targetNumber);
      return;
    }

    hasAnimatedRef.current = true;
    let startTime = null;
    let animationFrameId = null;

    const easeOutQuad = (t) => t * (2 - t);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const current = easedProgress * targetNumber;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(targetNumber);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [targetNumber, duration]);

  let formattedNumber = decimalPlaces > 0
    ? displayValue.toFixed(decimalPlaces)
    : Math.round(displayValue).toLocaleString();

  if (hasLeadingZero && decimalPlaces === 0) {
    formattedNumber = String(Math.round(displayValue)).padStart(padLength, '0');
  }

  return (
    <span className={`inline-block font-mono ${className}`}>
      {prefix}{formattedNumber}{suffix}
    </span>
  );
}
