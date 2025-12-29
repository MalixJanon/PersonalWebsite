import { useEffect, useState, useRef } from 'react';

export interface PerformanceMetrics {
  fps: number;
  memoryUsage: number; // in MB
  renderTime: number; // in ms
  isPerformanceGood: boolean;
}

export function usePerformanceMonitoring(): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    isPerformanceGood: true,
  });

  const fpsRef = useRef(0);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    let frameId: number;

    const measurePerformance = () => {
      const now = Date.now();
      const frameTime = now - lastFrameTimeRef.current;
      lastFrameTimeRef.current = now;

      frameCountRef.current++;

      // Update FPS every second
      if (now - lastTimeRef.current >= 1000) {
        fpsRef.current = frameCountRef.current;
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      // Get memory usage if available
      const memoryUsage = (performance as any).memory
        ? Math.round((performance as any).memory.usedJSHeapSize / 1048576)
        : 0;

      // Determine if performance is good
      const isPerformanceGood = fpsRef.current >= 50 && frameTime < 33;

      setMetrics({
        fps: fpsRef.current,
        memoryUsage,
        renderTime: frameTime,
        isPerformanceGood,
      });

      frameId = requestAnimationFrame(measurePerformance);
    };

    frameId = requestAnimationFrame(measurePerformance);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  return metrics;
}
