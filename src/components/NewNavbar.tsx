import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Zap, Sparkles, ArrowRight, MessageSquare, BarChart2, Users, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
import logoFull from "@/assets/logo-full.png";

const menuItems = [
  { name: 'Features', href: '#features', icon: <BarChart2 className="w-4 h-4 mr-2" /> },
  { name: 'Pricing', href: '#pricing', icon: <CreditCard className="w-4 h-4 mr-2" /> },
  { name: 'About', href: '#about', icon: <Users className="w-4 h-4 mr-2" /> },
  { name: 'Contact', href: '#contact', icon: <MessageSquare className="w-4 h-4 mr-2" /> },
];

const socialLinks = [
  { name: 'Twitter', href: '#', icon: '🐦' },
  { name: 'LinkedIn', href: '#', icon: '💼' },
  { name: 'GitHub', href: '#', icon: '💻' },
];

const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setActiveItem(href);
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav 
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled 
          ? "py-2 bg-background/95 backdrop-blur-md border-b border-border/10 shadow-xl" 
          : "py-4 bg-gradient-to-b from-background/95 to-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a 
              href="#home" 
              className="flex items-center space-x-3"
              onClick={(e) => handleNavClick(e, '#home')}
            >
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent p-1"
                whileHover={{ rotate: 10 }}
              >
                <div className="w-full h-full bg-background rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ContactBee
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1 border border-border/10 shadow-sm">
            {menuItems.map((item) => (
              <motion.div 
                key={item.name} 
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium flex items-center rounded-full transition-all",
                    activeItem === item.href 
                      ? "text-primary bg-primary/5" 
                      : "text-foreground/80 hover:text-foreground hover:bg-accent/5"
                  )}
                >
                  {item.icon}
                  {item.name}
                </a>
              </motion.div>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center space-x-2 mr-2">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
                  whileHover={{ y: -2, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-foreground/80">{social.icon}</span>
                </motion.a>
              ))}
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block"
            >
              <Button 
                className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-full px-5 h-10 text-sm"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span 
                  className="absolute inset-0 bg-white/10"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <ThemeToggle />

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden p-2 -mr-2 rounded-lg hover:bg-accent/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
            }}
            exit={{ 
              opacity: 0, 
              height: 0,
              transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
            }}
          >
            <div className="px-4 py-3 space-y-2">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-xl transition-colors",
                    activeItem === item.href
                      ? "bg-accent/10 text-primary"
                      : "text-foreground/90 hover:bg-accent/5"
                  )}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ 
                    x: 0, 
                    opacity: 1,
                    transition: { 
                      duration: 0.3,
                      delay: 0.05 * index,
                      ease: [0.4, 0, 0.2, 1]
                    }
                  }}
                >
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center mr-3">
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.name}</span>
                  <ChevronRight className="w-4 h-4 ml-auto text-foreground/40" />
                </motion.a>
              ))}
              
              <div className="pt-2 px-4">
                <motion.div 
                  className="grid grid-cols-3 gap-2 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.1 + (menuItems.length * 0.05),
                      duration: 0.3 
                    }
                  }}
                >
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-3 rounded-xl bg-accent/5 hover:bg-accent/10 transition-colors"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-xl mb-1">{social.icon}</span>
                      <span className="text-xs text-foreground/60">{social.name}</span>
                    </motion.a>
                  ))}
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { 
                      delay: 0.15 + (menuItems.length * 0.05),
                      duration: 0.3 
                    }
                  }}
                >
                  <Button 
                    className="group w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold rounded-xl h-12 text-base"
                  >
                    <span className="flex items-center">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default NewNavbar;
