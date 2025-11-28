import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isText, setIsText] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      
      // Check for text inputs
      const isTextInput = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.isContentEditable;
      
      setIsText(isTextInput);

      // Check for clickable elements (if not text)
      const isClickable = !isTextInput && (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      );
      
      setIsHovering(!!isClickable);
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div 
      className="fixed pointer-events-none z-[9999] mix-blend-difference"
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

      {/* Standard & Hover Cursor (Technical Precision Theme) */}
      <div className={cn(
        "relative transition-all duration-200 ease-out",
        isText ? "opacity-0" : "opacity-100"
      )}>
        
        {/* Center Dot */}
        <div className={cn(
          "absolute top-1/2 left-1/2 w-1.5 h-1.5 bg-primary -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "scale-0" : "scale-100"
        )} />

        {/* Outer Square Frame */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-primary transition-all duration-300",
          isHovering ? "w-12 h-12 opacity-100 rotate-45" : "w-4 h-4 opacity-50 rotate-0"
        )} />

        {/* Technical Crosshair Lines */}
        <div className={cn(
          "absolute top-1/2 left-1/2 w-8 h-[1px] bg-primary -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "w-16 opacity-100" : "w-0 opacity-0"
        )} />
        <div className={cn(
          "absolute top-1/2 left-1/2 h-8 w-[1px] bg-primary -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "h-16 opacity-100" : "h-0 opacity-0"
        )} />

        {/* Corner Accents on Hover */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "w-8 h-8 opacity-100" : "w-0 h-0 opacity-0"
        )}>
             <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
             <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />
        </div>
      </div>
    </div>
  );
}
