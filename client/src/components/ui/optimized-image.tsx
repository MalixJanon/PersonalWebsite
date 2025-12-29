import { useState, useEffect, useRef, ImgHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholder?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  fadeInDuration?: number;
}

export function OptimizedImage({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E',
  width,
  height,
  loading = 'lazy',
  fadeInDuration = 300,
  className,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState<string>(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) return;

    // Use IntersectionObserver for lazy loading
    if (loading === 'lazy' && imgRef.current) {
      const observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = new Image();
              img.onload = () => {
                setImageSrc(src);
                setIsLoaded(true);
              };
              img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                setImageSrc(src); // Fallback to src anyway
              };
              img.src = src;
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '50px' } // Start loading 50px before image enters viewport
      );

      observer.observe(imgRef.current);
      return () => observer.disconnect();
    } else {
      // Eager loading
      const img = new Image();
      img.onload = () => {
        setImageSrc(src);
        setIsLoaded(true);
      };
      img.src = src;
    }
  }, [src, loading]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        'transition-opacity',
        isLoaded ? 'opacity-100' : 'opacity-0',
        className
      )}
      style={{
        ...props.style,
        transitionDuration: `${fadeInDuration}ms`,
      }}
      {...props}
    />
  );
}

export default OptimizedImage;
