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
      {/* Text Cursor Variant (I-Beam) */}
      <div className={cn(
        "absolute top-1/2 left-1/2 w-[2px] h-6 bg-primary -translate-x-1/2 -translate-y-1/2 transition-all duration-200",
        isText ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}>
        {/* Top and bottom bars of I-beam */}
        <div className="absolute top-0 left-1/2 w-2 h-[2px] bg-primary -translate-x-1/2" />
        <div className="absolute bottom-0 left-1/2 w-2 h-[2px] bg-primary -translate-x-1/2" />
      </div>

      {/* Standard & Hover Cursor */}
      <div className={cn(
        "relative transition-all duration-300 ease-out",
        isText ? "opacity-0" : "opacity-100",
        isHovering ? "scale-100" : "scale-100"
      )}>
        
        {/* Polished Crosshair Center */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "w-12 h-12" : "w-8 h-8"
        )}>
            {/* Center Dot */}
            <div className={cn(
                "absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                isHovering ? "bg-transparent border border-primary w-4 h-4" : ""
            )} />

            {/* Crosshair Lines (Disconnected) */}
            <div className={cn("absolute top-0 left-1/2 w-[1px] h-2 bg-primary -translate-x-1/2 transition-all duration-300", isHovering ? "h-3 top-0" : "h-2")} />
            <div className={cn("absolute bottom-0 left-1/2 w-[1px] h-2 bg-primary -translate-x-1/2 transition-all duration-300", isHovering ? "h-3 bottom-0" : "h-2")} />
            <div className={cn("absolute left-0 top-1/2 h-[1px] w-2 bg-primary -translate-y-1/2 transition-all duration-300", isHovering ? "w-3 left-0" : "w-2")} />
            <div className={cn("absolute right-0 top-1/2 h-[1px] w-2 bg-primary -translate-y-1/2 transition-all duration-300", isHovering ? "w-3 right-0" : "w-2")} />

            {/* Outer Corners (Visible on Hover) */}
            <div className={cn(
                "absolute inset-0 border border-primary/30 scale-0 transition-all duration-300 rotate-45",
                isHovering ? "scale-100 rotate-0" : ""
            )} />
        </div>
      </div>
    </div>
  );
}
