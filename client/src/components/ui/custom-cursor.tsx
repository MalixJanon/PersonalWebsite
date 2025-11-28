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
      {/* Text Cursor Variant (Stylized I-Beam) */}
      <div className={cn(
        "absolute top-1/2 left-1/2 transition-all duration-300",
        isText ? "opacity-100 scale-100" : "opacity-0 scale-0"
      )}>
        <div className="w-[1px] h-8 bg-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="w-3 h-[1px] bg-primary absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4" />
        <div className="w-3 h-[1px] bg-primary absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4" />
      </div>

      {/* Standard & Hover Cursor (New Design) */}
      <div className={cn(
        "relative transition-all duration-300 ease-out",
        isText ? "opacity-0" : "opacity-100",
        isHovering ? "scale-100" : "scale-100"
      )}>
        
        {/* Rotating Tech Ring */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 transition-all duration-500",
          isHovering ? "w-16 h-16 border-dashed animate-[spin_4s_linear_infinite]" : "w-0 h-0 opacity-0"
        )} />

        {/* Main Crosshair Structure */}
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "w-8 h-8" : "w-6 h-6"
        )}>
            {/* Central Target Dot */}
            <div className={cn(
                "absolute top-1/2 left-1/2 w-1 h-1 bg-primary -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                isHovering ? "scale-0" : "scale-100"
            )} />

            {/* Corner Brackets */}
            <div className={cn(
                "absolute top-0 left-0 w-2 h-2 border-t border-l border-primary transition-all duration-300",
                isHovering ? "translate-x-[-4px] translate-y-[-4px]" : "translate-x-0 translate-y-0"
            )} />
            <div className={cn(
                "absolute top-0 right-0 w-2 h-2 border-t border-r border-primary transition-all duration-300",
                isHovering ? "translate-x-[4px] translate-y-[-4px]" : "translate-x-0 translate-y-0"
            )} />
            <div className={cn(
                "absolute bottom-0 left-0 w-2 h-2 border-b border-l border-primary transition-all duration-300",
                isHovering ? "translate-x-[-4px] translate-y-[4px]" : "translate-x-0 translate-y-0"
            )} />
            <div className={cn(
                "absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary transition-all duration-300",
                isHovering ? "translate-x-[4px] translate-y-[4px]" : "translate-x-0 translate-y-0"
            )} />

            {/* Cross lines appearing on hover */}
            <div className={cn(
                "absolute top-1/2 left-1/2 w-full h-[1px] bg-primary/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                isHovering ? "opacity-100 scale-x-150" : "opacity-0 scale-x-0"
            )} />
            <div className={cn(
                "absolute top-1/2 left-1/2 h-full w-[1px] bg-primary/50 -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
                isHovering ? "opacity-100 scale-y-150" : "opacity-0 scale-y-0"
            )} />
        </div>
      </div>
    </div>
  );
}
