import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useDeviceCapabilities } from '@/hooks/use-device-capabilities';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isRedHover, setIsRedHover] = useState(false);
  const stateRef = useRef({ isHovering: false, isText: false, isRedHover: false });
  const lastTargetRef = useRef<HTMLElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const device = useDeviceCapabilities();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      positionRef.current.x = e.clientX;
      positionRef.current.y = e.clientY;
      if (lastTargetRef.current === e.target) return;
      lastTargetRef.current = e.target as HTMLElement;
      const target = e.target as HTMLElement;
      const isTextInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;
      const isClickable = !isTextInput && (target.tagName === 'A' || target.tagName === 'BUTTON' || target.classList.contains('cursor-pointer') || !!target.closest('a') || !!target.closest('button'));
      let foundRed = target.classList.contains('bg-primary') || target.classList.contains('text-primary');
      if (!foundRed && (isClickable || target.tagName === 'BUTTON')) {
        let current: HTMLElement | null = target;
        for (let i = 0; i < 2 && current; i++) {
          if (current.classList.contains('bg-primary') || current.classList.contains('text-primary')) {
            foundRed = true;
            break;
          }
          current = current.parentElement;
        }
      }
      if (stateRef.current.isText !== isTextInput || stateRef.current.isHovering !== isClickable || stateRef.current.isRedHover !== foundRed) {
        stateRef.current = { isText: isTextInput, isHovering: isClickable, isRedHover: foundRed };
        setIsText(isTextInput);
        setIsHovering(isClickable);
        setIsRedHover(foundRed);
      }
    };

    const render = () => {
      if (rootRef.current) {
        const { x, y } = positionRef.current;
        rootRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', updatePosition);
    rafRef.current = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const spinAllowed = !device.isLowPowerDevice && !prefersReducedMotion;

  return (
    <div 
      ref={rootRef}
      className={cn(
        "fixed pointer-events-none z-[9999] left-0 top-0",
        isRedHover ? "mix-blend-difference" : ""
      )}
      style={{
        willChange: 'transform'
      }}
    >
      {/* Text Cursor Variant (Technical I-Beam) */}
      <div className={cn(
        "absolute top-1/2 left-1/2 transition-all duration-200",
        isText ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}>
        <div className="w-[2px] h-6 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-4 h-[2px] bg-primary absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3" />
        <div className="w-4 h-[2px] bg-primary absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3" />
      </div>

      {/* Standard Arrowhead Cursor (Default) */}
      <div className={cn(
        "absolute top-0 left-0 transition-all duration-300 ease-out",
        (isText || isHovering) ? "opacity-0 scale-0" : "opacity-100 scale-100"
      )}>
        {/* Simplified Triangle Shape pointing Top-Left - Opaque */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary -translate-x-[2px] -translate-y-[2px]">
          <path d="M2 2L9 20L12 12L20 9L2 2Z" fill="currentColor" fillOpacity="1" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="2" cy="2" r="1" fill="currentColor" />
        </svg>
      </div>

      {/* Hover Cursor (Stylized Crosshair) */}
      <div className={cn(
        "relative transition-all duration-200 ease-out",
        isHovering ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}>
        
        {/* Center Diamond */}
        <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-primary -translate-x-1/2 -translate-y-1/2 rotate-45 transition-transform duration-500 animate-pulse" />

        {/* Rotating Outer Ring Segments */}
        <div className={cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12", spinAllowed ? "animate-[spin_8s_linear_infinite]" : "") }>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-primary" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-2 bg-primary" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 w-2 bg-primary" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 h-1 w-2 bg-primary" />
        </div>

        {/* Corner Brackets Expanding */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 transition-all duration-300">
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary" />
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />
        </div>
      </div>
    </div>
  );
}
