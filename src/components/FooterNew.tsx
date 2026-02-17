import { motion } from "framer-motion";
import { Heart, Facebook, Linkedin, Mail, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useState } from "react";
import { toast } from "sonner";

const FooterNew = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mgolyzra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          subject: 'Newsletter Subscription',
          message: 'User subscribed to newsletter from BoostWhats footer'
        })
      });

      if (response.ok) {
        toast.success("Successfully subscribed to newsletter!");
        setEmail("");
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Downloads", href: "/downloads" },
      { name: "FAQ", href: "#faq" }
    ],
    company: [
      { name: "Submit Contact", href: "#submit-form" },
      { name: "Support", href: "mailto:boostwhats@gmail.com" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms of Service", href: "/legal/terms" },
      { name: "Cookie Policy", href: "/legal/cookies" },
      { name: "Acceptable Use", href: "/legal/acceptable-use" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1C2fgbhR6H/?mibextid=LQQJ4d", label: "Facebook", color: "hover:bg-blue-600 hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/boostwhats/", label: "LinkedIn", color: "hover:bg-blue-700 hover:text-white" },
    { icon: Mail, href: "mailto:boostwhats@gmail.com", label: "Email", color: "hover:bg-red-500 hover:text-white" }
  ];

  return (
    <footer className="relative overflow-hidden font-sans bg-muted dark:bg-gray-900 text-foreground transition-colors duration-300">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Image - Adapted for both themes */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-30 mix-blend-overlay" 
          style={{
            backgroundImage: 'url("https://res.cloudinary.com/dmxik1gea/image/upload/v1765119505/1189875_9059_1_g0tsxg.png")'
          }}
        />
        
        {/* Gradient Overlay: White fade for light mode, Dark fade for dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-muted/80 to-transparent dark:from-gray-950 dark:via-gray-900/90 dark:to-gray-900/80" />
        
        {/* Static Gradient Orbs */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[100px] opacity-40" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-accent/20 dark:bg-accent/10 rounded-full blur-[120px] opacity-30" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        
        {/* --- Main Content Grid --- */}
        <div className="pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* 1. Brand & Description (Span 4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                    <img 
                      src="/favicon.png" 
                      alt="BoostWhats" 
                      className="relative w-12 h-12 rounded-xl shadow-2xl dark:shadow-none" 
                    />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent tracking-tight">
                    BoostWhats
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed text-base max-w-sm">
                  Transform your WhatsApp status into a powerful reach tool. Join <span className="text-foreground font-semibold">1000+ users</span> growing exponentially through our shared contact pool.
                </p>

                {/* Theme Toggle & Socials Row */}
                <div className="flex items-center gap-6 mt-8">
                   <div className="p-1 rounded-full border border-border bg-card/50 backdrop-blur-sm shadow-sm dark:shadow-none">
                      <ThemeToggle />
                   </div>
                   <div className="h-6 w-px bg-border"></div>
                   <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                        <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className={`w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 shadow-sm dark:shadow-none ${social.color} hover:border-transparent hover:shadow-lg`}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        <social.icon className="w-4 h-4" />
                        </motion.a>
                    ))}
                   </div>
                </div>
              </motion.div>
            </div>

            {/* 2. Navigation Links (Span 5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
              {Object.entries(footerLinks).map(([category, links], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-5">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                          <a
                            href={link.href}
                            className="group flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                            {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            <span className="relative">
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full"></span>
                            </span>
                          </a>
                        ) : link.href.startsWith('#') ? (
                          <a
                            href={`/${link.href}`}
                            className="group flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                          >
                            <span className="relative">
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full"></span>
                            </span>
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="group flex items-center text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
                          >
                            <span className="relative">
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all group-hover:w-full"></span>
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* 3. Newsletter / CTA (Span 3 cols) */}
            <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="bg-card/60 backdrop-blur-md border border-border rounded-2xl p-6 shadow-xl dark:shadow-2xl">
                    <div className="flex items-center gap-2 mb-4">
                        
                        <h3 className="font-bold text-foreground">Stay Updated</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4">
                        Get the latest strategies to grow your audience.
                    </p>
                    
                    <div className="space-y-3">
                        <form onSubmit={handleNewsletterSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all text-sm shadow-sm dark:shadow-none"
                                required
                            />
                        </form>
                        <motion.div whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97, y: -1 }}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative overflow-hidden w-full flex items-center justify-center gap-2 font-bold py-3 px-4 rounded-xl border-0 transition-all duration-300"
                                style={{
                                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                                  boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                                }}
                            >
                                {/* Inner glow layer */}
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                                
                                {/* Animated gradient border */}
                                <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20">
                                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-primary to-secondary" />
                                </div>
                                
                                {/* Hover light sweep effect */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                
                                <span className="relative z-10 flex items-center gap-2">
                                    <span>{isSubmitting ? 'Subscribing...' : 'Subscribe'}</span>
                                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                                </span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>

        {/* --- Footer Bottom --- */}
        <div className="border-t border-border py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} BoostWhats. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
                <Link to="/legal/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy
                </Link>
                <Link to="/legal/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms
                </Link>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground bg-card/50 px-3 py-1 rounded-full border border-border shadow-sm dark:shadow-none">
                    <span>Made with</span>
                    <Heart className="w-3.5 h-3.5 text-destructive fill-current animate-pulse" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;