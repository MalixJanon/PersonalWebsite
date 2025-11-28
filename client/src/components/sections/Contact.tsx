import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Send, Linkedin, Instagram, Github } from "lucide-react";

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
    <section id="contact" className="py-32 min-h-[80vh] flex flex-col justify-center relative max-w-7xl mx-auto px-6 md:px-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="flex items-end justify-between mb-16 border-b border-white/10 pb-4 sticky top-20 z-20 bg-background/80 backdrop-blur-sm py-4">
        <h2 className="text-4xl md:text-6xl font-display font-bold">
          LET'S WORK TOGETHER
        </h2>
        <span className="font-mono text-xs text-primary tracking-widest hidden md:block">
          // INITIATE_CONTACT
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="text-lg text-muted-foreground font-mono leading-relaxed">
            Ready to build the future? Whether it's a new product, a brand overhaul, or an experimental interface, let's discuss how we can collaborate.
          </p>
          
          <div className="tech-border p-8 bg-card/30 backdrop-blur-sm">
            <h3 className="font-display text-xl mb-4 text-primary">CONTACT_INFO</h3>
            <div className="space-y-4 font-mono text-sm text-muted-foreground">
              <div className="flex justify-between items-start border-b border-white/5 pb-2 hover:text-foreground transition-colors gap-4">
                <span className="shrink-0">EMAIL</span>
                <span className="text-foreground text-right break-all">janon@quadratasoft.com</span>
              </div>
              <div className="flex justify-between items-start border-b border-white/5 pb-2 hover:text-foreground transition-colors gap-4">
                <span className="shrink-0">LOCATION</span>
                <span className="text-foreground text-right">Austin, TX</span>
              </div>
              <div className="flex justify-between items-start border-b border-white/5 pb-2 hover:text-foreground transition-colors gap-4">
                <span className="shrink-0">AVAILABILITY</span>
                <span className="text-primary animate-pulse text-right">OPEN FOR FREELANCE WORK</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 mt-8">
              <a href="#" className="p-3 border border-white/10 hover:border-primary hover:text-primary transition-all duration-300 group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 border border-white/10 hover:border-primary hover:text-primary transition-all duration-300 group">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-3 border border-white/10 hover:border-primary hover:text-primary transition-all duration-300 group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-card/30 backdrop-blur-sm p-8 tech-border relative overflow-hidden">
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
                    <FormLabel className="font-mono text-xs uppercase tracking-widest text-primary">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="ENTER_NAME" {...field} className="bg-black/20 border-white/10 font-mono focus:border-primary/50 transition-colors text-foreground cursor-none" />
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
                    <FormLabel className="font-mono text-xs uppercase tracking-widest text-primary">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="ENTER_EMAIL" {...field} className="bg-black/20 border-white/10 font-mono focus:border-primary/50 transition-colors text-foreground cursor-none" />
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
                    <FormLabel className="font-mono text-xs uppercase tracking-widest text-primary">Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="ENTER_TRANSMISSION..." {...field} className="bg-black/20 border-white/10 font-mono min-h-[120px] focus:border-primary/50 transition-colors text-foreground cursor-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-mono tracking-widest rounded-none group relative overflow-hidden cursor-none">
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="mr-2">SEND_TRANSMISSION</span>
                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
