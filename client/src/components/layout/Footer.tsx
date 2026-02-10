import { motion, useScroll, useTransform } from "framer-motion";
const janonLogo = new URL('../../../../attached_assets/janonlogo_1764302796958.webp', import.meta.url).href;

export function Footer() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.8, 1], [50, 0]);
  
  return (
    <motion.footer 
      className="border-t border-black/10 mt-20 md:mt-32 py-12 md:py-24 bg-background relative overflow-hidden"
      style={{ y }}
    >
      {/* Decorative grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-8 md:gap-12 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="space-y-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
             <div className="w-2 h-2 bg-primary" />
             <span className="font-mono text-[10px] sm:text-xs tracking-widest text-muted-foreground">SYSTEM_END_OF_LINE</span>
          </div>
          <div className="w-64 h-16 opacity-80 hover:opacity-100 transition-opacity duration-500">
             <div 
               className="w-full h-full bg-foreground"
               style={{
                 maskImage: `url(${janonLogo})`,
                 maskSize: 'contain',
                 maskRepeat: 'no-repeat',
                 maskPosition: 'left center',
                 WebkitMaskImage: `url(${janonLogo})`,
                 WebkitMaskSize: 'contain',
                 WebkitMaskRepeat: 'no-repeat',
                 WebkitMaskPosition: 'left center',
               }}
             />
          </div>
          <p className="font-mono text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed border-l-2 border-primary pl-4 mt-4">
            Designing the interface between humanity and the machine.
            <br />© 2025. ALL RIGHTS RESERVED.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-8 md:gap-12 text-[10px] sm:text-xs font-mono text-muted-foreground w-full md:w-auto">
          <div className="flex flex-col gap-3 md:gap-4">
             <span className="text-primary tracking-widest mb-1 md:mb-2 font-bold">SOCIAL</span>
             <a href="https://github.com/MalixJanon" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">GITHUB</a>
             <a href="https://www.linkedin.com/in/alexander-van-stralendorff-3a3b21204/" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">LINKEDIN</a>
             <a href="https://janonart.artstation.com/" className="hover:text-foreground transition-colors hover:translate-x-1 transform duration-300">ARTSTATION</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
