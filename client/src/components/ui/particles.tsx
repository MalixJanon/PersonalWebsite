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
        y: y ?? canvas.height + Math.random() * 100,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -Math.random() * 1 - 0.2, // Upward movement
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.2,
        life: 0,
        maxLife: Math.random() * 200 + 100,
        depth,
      };
    };

    const initParticles = () => {
      const particleCount = Math.floor(window.innerWidth / 15);
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(createParticle(Math.random() * canvas.width, Math.random() * canvas.height));
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

      particles.forEach((p, index) => {
        // Update position with parallax
        // We don't actually change p.x/p.y based on mouse, we render with offset
        // But to keep them moving, we update p.x/p.y based on velocity
        
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Mouse repulsion (add turbulence)
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 200) {
            p.x -= (dx / dist) * 0.5;
            p.y -= (dy / dist) * 0.5;
        }

        // Reset if dead or out of bounds
        if (p.life > p.maxLife || p.y < -50) {
          particles[index] = createParticle();
        }

        // Draw
        // Parallax shift: closer particles (higher depth) move more
        const drawX = p.x + (offsetX * p.depth);
        const drawY = p.y + (offsetY * p.depth);

        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        
        // Ember glow
        const gradient = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, p.size * 2);
        gradient.addColorStop(0, `rgba(255, 160, 50, ${p.alpha})`); // Bright orange center
        gradient.addColorStop(0.4, `rgba(255, 69, 0, ${p.alpha * 0.5})`); // Red-orange mid
        gradient.addColorStop(1, `rgba(255, 69, 0, 0)`); // Fade out
        
        ctx.fillStyle = gradient;
        ctx.fill();
      });

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
