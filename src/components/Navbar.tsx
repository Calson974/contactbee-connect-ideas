import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoFull from "@/assets/logo-full.png";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'How It Works', href: '#how-it-works' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past 100vh (viewport height)
      const isScrolled = window.scrollY > window.innerHeight;
      setScrolled(window.scrollY > 10);
      setCompact(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm" : "bg-transparent",
      compact ? 'py-2' : 'py-4',
    )}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className={cn("flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-all duration-300", 
          compact ? 'h-12' : 'h-16'
        )}>
          {/* Logo */}
          <motion.div 
            className="flex items-center -ml-10 md:ml-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" className="flex items-center">
              <img 
                src={logoFull} 
                alt="ContactBee" 
                className={cn(
                  "transition-all duration-300",
                  scrolled ? "opacity-100" : "opacity-90",
                  compact ? 'h-6' : 'h-8'
                )} 
              />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={cn("hidden md:flex items-center transition-all duration-300", 
            compact ? 'space-x-3' : 'space-x-4'
          )}>
            {navItems.map((item) => (
              <motion.div 
                key={item.name}
                className="relative"
                onHoverStart={() => setActiveItem(item.name)}
                onHoverEnd={() => setActiveItem('')}
              >
                <a 
                  href={item.href}
                  className={cn(
                  "px-3 py-2 text-sm rounded-md transition-all duration-200",
                  activeItem === item.name 
                    ? "text-primary font-semibold" 
                    : "text-foreground/70 hover:text-foreground font-medium",
                  compact ? 'text-sm py-1.5' : 'text-base py-2'
                )}
                >
                  {item.name}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: activeItem === item.name ? 1 : 0, opacity: activeItem === item.name ? 1 : 0.7 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                </a>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
                <Button 
                  className={cn(
                    "flex-1 ml-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold",
                    theme === 'dark' ? "bg-accent/50 hover:bg-accent/40" : "bg-accent/20 hover:bg-accent/10"
                  )}
                  size="lg"
                  onClick={() => {
                    window.location.hash = 'submit-form';
                    // Force a reflow to ensure the browser processes the hash change
                    setTimeout(() => {
                      window.scrollBy(0, -80); // Adjust offset if needed
                    }, 0);
                  }}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-3 rounded-lg hover:bg-accent/10 transition-colors font-medium"
                    onClick={() => setIsMenuOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
                <motion.div 
                  className="pt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="flex items-center justify-between pt-2">
                    <ThemeToggle />
                    <Button 
                      className={cn(
                        "flex-1 ml-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold",
                        theme === 'dark' ? "bg-accent/50 hover:bg-accent/40" : "bg-accent/20 hover:bg-accent/10"
                      )}
                      size="lg"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setTimeout(() => {
                          window.location.hash = 'submit-form';
                          // Force a reflow to ensure the browser processes the hash change
                          setTimeout(() => {
                            window.scrollBy(0, -80); // Adjust offset if needed
                          }, 0);
                        }, 100); // Small delay to allow menu to close
                      }}
                    >
                      Get Started
                    </Button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
