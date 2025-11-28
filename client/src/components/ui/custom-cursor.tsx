import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer');
      
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
      {/* Crosshair center */}
      <div className={cn(
        "relative w-8 h-8 transition-all duration-300 ease-out",
        isHovering ? "scale-100 rotate-45" : "scale-100"
      )}>
        {/* Horizontal line - fades out on hover */}
        <div className={cn(
          "absolute top-1/2 left-0 w-full h-[1px] bg-primary transition-opacity",
          isHovering ? "opacity-0" : "opacity-100"
        )} />
        {/* Vertical line - fades out on hover */}
        <div className={cn(
          "absolute left-1/2 top-0 h-full w-[1px] bg-primary transition-opacity",
          isHovering ? "opacity-0" : "opacity-100"
        )} />
        
        {/* Diamond Shape (Box rotated 45deg) */}
        <div className={cn(
          "absolute top-1/2 left-1/2 w-3 h-3 border border-primary -translate-x-1/2 -translate-y-1/2 transition-all duration-300",
          isHovering ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-45"
        )}>
             {/* Corner extensions (Only visible on hover) */}
             <div className={cn("absolute -top-1 -left-1 w-2 h-[1px] bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
             <div className={cn("absolute -top-1 -left-1 w-[1px] h-2 bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
             
             <div className={cn("absolute -top-1 -right-1 w-2 h-[1px] bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
             <div className={cn("absolute -top-1 -right-1 w-[1px] h-2 bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
             
             <div className={cn("absolute -bottom-1 -left-1 w-2 h-[1px] bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
             <div className={cn("absolute -bottom-1 -left-1 w-[1px] h-2 bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
             
             <div className={cn("absolute -bottom-1 -right-1 w-2 h-[1px] bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
             <div className={cn("absolute -bottom-1 -right-1 w-[1px] h-2 bg-primary transition-all duration-300", isHovering ? "opacity-100" : "opacity-0")} />
        </div>

        {/* Center dot */}
        <div className={cn(
            "absolute top-1/2 left-1/2 w-1 h-1 bg-primary -translate-x-1/2 -translate-y-1/2 rounded-full",
            isHovering ? "opacity-0" : "opacity-100"
        )} />
      </div>
      
      {/* Outer ring on hover */}
      <div className={cn(
        "absolute top-1/2 left-1/2 w-12 h-12 border border-primary/50 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
        isHovering ? "scale-100 opacity-100" : "scale-50 opacity-0"
      )} />
    </div>
  );
}
