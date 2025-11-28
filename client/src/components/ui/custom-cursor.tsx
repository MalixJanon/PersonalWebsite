import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isRedHover, setIsRedHover] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });
      
      const target = e.target as HTMLElement;
      
      // Check for text inputs
      const isTextInput = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable ||
        // Also check for text elements that aren't interactive but contain text
        // EXCLUDING headings and display text as per request
        (target.childNodes.length === 1 && 
         target.childNodes[0].nodeType === Node.TEXT_NODE && 
         target.textContent && target.textContent.trim().length > 0 &&
         !target.closest('button') && !target.closest('a') &&
         !target.closest('h1') && !target.closest('h2') && !target.closest('h3') && 
         !target.closest('h4') && !target.closest('h5') && !target.closest('h6') &&
         !target.classList.contains('font-display'));
      
      setIsText(isTextInput);

      // Check for clickable elements (if not text input/area)
      const isClickable = !target.matches('input, textarea') && (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      );
      
      setIsHovering(!!isClickable);

      // Check if hovering over a red element (Primary Color)
      // Primary is roughly 0 80% 60% (HSL) -> #FF3333 -> RGB(255, 51, 51)
      // We check computed style for background color
      // Optimize: check if target changed or just do it (modern browsers are fast)
      
      // Helper to check if color is "reddish"
      const isReddish = (color: string) => {
        if (!color) return false;
        // Parse rgb(r, g, b) or rgba(r, g, b, a)
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
        if (match) {
          const r = parseInt(match[1]);
          const g = parseInt(match[2]);
          const b = parseInt(match[3]);
          // High Red, Low Green/Blue
          return r > 200 && g < 100 && b < 100;
        }
        return false;
      };

      // Check target and closest parent with background
      let current: HTMLElement | null = target;
      let foundRed = false;
      
      // Check up to 3 levels up
      for (let i = 0; i < 4 && current; i++) {
        const style = window.getComputedStyle(current);
        if (isReddish(style.backgroundColor) || isReddish(style.color) || current.classList.contains('bg-primary')) {
           foundRed = true;
           break;
        }
        
        // Special check for the send transmission button
        // Button might have children like span/div, but button itself has bg-primary
        if (current.tagName === 'BUTTON' && (current.classList.contains('bg-primary') || current.querySelector('.bg-primary'))) {
           foundRed = true;
           break;
        }
        current = current.parentElement;
      }
      setIsRedHover(foundRed);
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      className={cn(
        "fixed pointer-events-none z-[9999]",
        isRedHover ? "mix-blend-difference" : ""
      )}
      style={{ 
        left: position.x, 
        top: position.y,
        transform: 'translate(-50%, -50%)'
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
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 animate-[spin_8s_linear_infinite]">
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
