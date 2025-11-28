import { useEffect, useRef } from 'react';

interface ParticlesProps {
  className?: string;
}

export default function Particles({ className }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: { 
      x: number; 
      y: number; 
      vx: number; 
      vy: number; 
      size: number;
      alpha: number;
      targetAlpha: number;
      life: number;
      maxLife: number;
      depth: number; // For parallax
    }[] = [];
    
    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    // Target mouse position for smooth interpolation
    let targetMouseX = 0;
    let targetMouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticle = (x?: number, y?: number) => {
      const depth = Math.random() * 2 + 0.5; // 0.5 to 2.5
      return {
        x: x ?? Math.random() * canvas.width,
        y: y ?? Math.random() * canvas.height, // Spawn anywhere vertically
        vx: (Math.random() - 0.5) * 0.3, // Omnidirectional X
        vy: (Math.random() - 0.5) * 0.3, // Omnidirectional Y
        size: Math.random() * 1.5 + 0.5, // Smaller dust-like size
        alpha: 0, // Start invisible and fade in
        targetAlpha: Math.random() * 0.4 + 0.2, // Subtler opacity
        life: 0,
        maxLife: Math.random() * 400 + 300, // Longer life
        depth,
      };
    };

    const initParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 8); // Denser dust
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        // Initial random spread
        const p = createParticle(Math.random() * canvas.width, Math.random() * canvas.height);
        p.alpha = p.targetAlpha; // Start visible for initial set
        particles.push(p);
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth mouse movement for parallax
      targetMouseX += (mouseX - targetMouseX) * 0.05;
      targetMouseY += (mouseY - targetMouseY) * 0.05;

      // Parallax offset from center
      const offsetX = (targetMouseX - canvas.width / 2) * 0.05;
      const offsetY = (targetMouseY - canvas.height / 2) * 0.05;

      // Spawning new particles to maintain density
      if (particles.length < Math.floor(window.innerWidth / 8)) {
         if (Math.random() > 0.5) {
             particles.push(createParticle());
         }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Update position
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Fade in/out
        if (p.life < 50) {
            p.alpha += (p.targetAlpha - p.alpha) * 0.05;
        }
        if (p.life > p.maxLife - 50) {
            p.alpha *= 0.95;
        }

        // Gentle Mouse interaction (turbulence) - reduced for dust
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 150) {
            p.x -= (dx / dist) * 0.2;
            p.y -= (dy / dist) * 0.2;
        }

        // Remove if dead or out of bounds
        if (p.life > p.maxLife || p.y < -50 || p.y > canvas.height + 50 || p.x < -50 || p.x > canvas.width + 50) {
          particles.splice(i, 1);
          continue;
        }

        // Draw
        const drawX = p.x + (offsetX * p.depth);
        const drawY = p.y + (offsetY * p.depth);

        // Dust Glow Effect
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size * 3); 
        gradient.addColorStop(0, `rgba(255, 140, 50, ${p.alpha})`); 
        gradient.addColorStop(1, `rgba(0, 0, 0, 0)`);
        
        ctx.globalCompositeOperation = 'screen'; 
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = `rgba(255, 220, 180, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ pointerEvents: 'none' }}
    />
  );
}
