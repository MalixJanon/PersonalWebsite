import { motion } from "framer-motion";

export default function JanonLogo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 400 80" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* J */}
      <motion.path 
        d="M20 20 H60 V60 H40 V40 H20 Z" 
        className="fill-foreground"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "circOut" }}
      />
      
      {/* A */}
      <motion.path 
        d="M80 60 L100 20 L120 60 M90 45 H110" 
        stroke="currentColor" 
        strokeWidth="12"
        strokeLinecap="square"
        className="text-foreground"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: "circOut" }}
      />
      
      {/* N */}
      <motion.path 
        d="M140 60 V20 L170 60 V20" 
        stroke="currentColor" 
        strokeWidth="12"
        strokeLinecap="square"
        className="text-foreground"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
      />
      
      {/* O */}
      <motion.rect 
        x="190" y="20" width="40" height="40" 
        stroke="currentColor" 
        strokeWidth="12"
        className="text-foreground"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "circOut" }}
      />
      
      {/* N */}
      <motion.path 
        d="M250 60 V20 L280 60 V20" 
        stroke="currentColor" 
        strokeWidth="12"
        strokeLinecap="square"
        className="text-foreground"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
      />
    </svg>
  );
}