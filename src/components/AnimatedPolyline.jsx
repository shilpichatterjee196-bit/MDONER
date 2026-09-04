import React, { useState, useEffect, useRef } from 'react';
import { Polyline } from 'react-leaflet';

/**
 * AnimatedPolyline
 * Progressively renders a Leaflet polyline from origin to destination.
 * Uses requestAnimationFrame with easeOutQuad for silky smooth, non-distracting rendering.
 * Strictly respects prefers-reduced-motion.
 */
function interpolatePoints(coords, totalSteps = 60) {
  if (!coords || coords.length < 2) return coords || [];

  const segments = coords.length - 1;
  const stepsPerSegment = Math.max(2, Math.floor(totalSteps / segments));
  const result = [];

  for (let i = 0; i < segments; i++) {
    const p1 = coords[i];
    const p2 = coords[i + 1];

    for (let step = 0; step < stepsPerSegment; step++) {
      const t = step / stepsPerSegment;
      result.push([
        p1[0] + (p2[0] - p1[0]) * t,
        p1[1] + (p2[1] - p1[1]) * t
      ]);
    }
  }
  result.push(coords[coords.length - 1]);
  return result;
}

export default function AnimatedPolyline({
  positions = [],
  pathOptions = {},
  duration = 1200,
  animated = true,
  children
}) {
  const [visiblePositions, setVisiblePositions] = useState(() => {
    if (!animated) return positions;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return positions;
    }
    return positions.length >= 2 ? positions.slice(0, 2) : positions;
  });

  const animRef = useRef(null);

  useEffect(() => {
    if (!animated || !positions || positions.length < 2) {
      setVisiblePositions(positions);
      return;
    }

    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisiblePositions(positions);
      return;
    }

    const allPoints = interpolatePoints(positions, 50);
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      // Ease out quad: f(t) = t * (2 - t)
      const progress = rawProgress * (2 - rawProgress);

      const targetCount = Math.max(2, Math.floor(allPoints.length * progress));
      setVisiblePositions(allPoints.slice(0, targetCount));

      if (rawProgress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      if (animRef.current) {
        cancelAnimationFrame(animRef.current);
      }
    };
  }, [positions, duration, animated]);

  if (!visiblePositions || visiblePositions.length < 2) return null;

  return (
    <Polyline positions={visiblePositions} pathOptions={pathOptions}>
      {children}
    </Polyline>
  );
}
