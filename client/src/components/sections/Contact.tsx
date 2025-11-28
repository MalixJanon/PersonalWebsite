import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Linkedin, Instagram, Github } from "lucide-react";
import { motion } from "framer-motion";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "TRANSMISSION_SENT",
      description: "We will establish communication shortly.",
    });
    form.reset();
  }

  return (
    <section id="contact" className="py-20 md:py-32 min-h-[80vh] flex flex-col justify-center relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 bg-background">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-12 md:mb-16 border-b-2 border-black/10 pb-4 sticky top-16 md:top-20 z-20 bg-background/90 backdrop-blur-sm py-4"
      >
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-foreground">
          LET'S WORK TOGETHER
        </h2>
        <span className="font-mono text-[10px] sm:text-xs text-primary tracking-widest hidden md:block font-bold">
          // INITIATE_CONTACT
        </span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <p className="text-base md:text-lg text-muted-foreground font-mono leading-relaxed font-medium">
            Ready to build the future? Whether it's a new product, a brand overhaul, or an experimental interface, let's discuss how we can collaborate.
          </p>
          
          <div className="tech-border p-8 bg-white/60 backdrop-blur-sm shadow-sm">
            <h3 className="font-display text-xl mb-4 text-primary font-bold">CONTACT_INFO</h3>
            <div className="space-y-4 font-mono text-sm text-muted-foreground font-bold">
              <div className="flex justify-between items-start border-b border-black/10 pb-2 hover:text-foreground transition-colors gap-4">
                <span className="shrink-0 text-foreground/70">EMAIL</span>
                <span className="text-foreground text-right break-all">janon@quadratasoft.com</span>
              </div>
              <div className="flex justify-between items-start border-b border-black/10 pb-2 hover:text-foreground transition-colors gap-4">
                <span className="shrink-0 text-foreground/70">LOCATION</span>
                <span className="text-foreground text-right">Austin, TX</span>
              </div>
              <div className="flex justify-between items-start border-b border-black/10 pb-2 hover:text-foreground transition-colors gap-4">
                <span className="shrink-0 text-foreground/70">AVAILABILITY</span>
                <span className="text-primary animate-pulse text-right">OPEN FOR FREELANCE WORK</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <a href="#" className="p-3 border border-black/10 hover:border-primary hover:text-primary transition-all duration-300 group bg-white/50">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform text-foreground group-hover:text-primary" />
              </a>
              <a href="#" className="p-3 border border-black/10 hover:border-primary hover:text-primary transition-all duration-300 group bg-white/50">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform text-foreground group-hover:text-primary" />
              </a>
              <a href="#" className="p-3 border border-black/10 hover:border-primary hover:text-primary transition-all duration-300 group bg-white/50">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform text-foreground group-hover:text-primary" />
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/60 backdrop-blur-sm p-8 tech-border relative overflow-hidden shadow-sm"
        >
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary" />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-widest text-primary font-bold">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ENTER_NAME" {...field} className="bg-white/50 border-black/10 font-mono focus:border-primary transition-colors text-foreground cursor-none font-bold placeholder:text-muted-foreground/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-widest text-primary font-bold">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ENTER_EMAIL" {...field} className="bg-white/50 border-black/10 font-mono focus:border-primary transition-colors text-foreground cursor-none font-bold placeholder:text-muted-foreground/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-mono text-xs uppercase tracking-widest text-primary font-bold">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="ENTER_TRANSMISSION..." {...field} className="bg-white/50 border-black/10 font-mono min-h-[120px] focus:border-primary transition-colors text-foreground cursor-none font-bold placeholder:text-muted-foreground/50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-mono tracking-widest rounded-none group relative overflow-hidden cursor-none font-bold shadow-md">
                <div className="absolute inset-0 bg-black/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="mr-2">SEND_TRANSMISSION</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}