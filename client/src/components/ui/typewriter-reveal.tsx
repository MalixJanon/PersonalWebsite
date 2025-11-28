import { useEffect, useState } from "react";

interface TypewriterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export const TypewriterReveal = ({ text, className, delay = 0, speed = 100 }: TypewriterRevealProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, speed]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="opacity-0 select-none pointer-events-none">{text}</span>
      <span className="absolute top-0 left-0">
        {displayedText}
        {!isComplete && (
          <span className="animate-pulse text-primary inline-block ml-1 w-3 h-[1em] align-middle bg-primary"></span>
        )}
      </span>
    </span>
  );
};
