import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const menuItems = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#submit-form" },
];

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("#home");
  const navRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Handle scroll effect and form navigation
  useEffect(() => {
    // Check if we need to scroll to the form after navigation
    const shouldScrollToForm = sessionStorage.getItem('scrollToForm') === 'true';
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = menuItems.map(item => item.href);
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveItem(section);
            break;
          }
        }
      }
    };

    // Handle form scroll after navigation
    if (shouldScrollToForm) {
      const scrollToForm = () => {
        const form = document.querySelector('#submit-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveItem('#submit-form');
          window.history.pushState(null, '', '#submit-form');
          sessionStorage.removeItem('scrollToForm');
        } else {
          // If form isn't loaded yet, try again shortly
          setTimeout(scrollToForm, 100);
        }
      };
      
      // Small delay to ensure the page has loaded
      const timer = setTimeout(scrollToForm, 100);
      return () => clearTimeout(timer);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    // If we're not on the home page and clicking on #submit-form
    if (href === '#submit-form' && window.location.pathname !== '/') {
      // Store the hash in sessionStorage to trigger scroll after navigation
      sessionStorage.setItem('scrollToForm', 'true');
      // Navigate to home
      window.location.href = '/';
      return;
    }
    
    const scrollToElement = () => {
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        setActiveItem(href);
        window.history.pushState(null, '', href);
        return true;
      }
      return false;
    };

    // Try to scroll immediately
    const scrolled = scrollToElement();
    
    // If element not found and it's the form, try again after a delay
    if (!scrolled && href === '#submit-form') {
      const checkAndScroll = () => {
        const success = scrollToElement();
        if (!success) {
          setTimeout(checkAndScroll, 100); // Keep trying every 100ms until found
        }
      };
      setTimeout(checkAndScroll, 100);
    }
    
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      ref={navRef}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
          : "bg-transparent"
      )}
      initial={{ x: '-100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        duration: 0.5
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <a
              href="#home"
              className="flex items-center space-x-2 group"
              onClick={(e) => handleNavClick(e, "#home")}
            >
              <img 
                src="/favicon.png" 
                alt="BoostWhats Logo" 
                className="w-8 h-8 object-contain"
              />
              <span className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                BoostWhats
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <div 
                key={item.name}
                className="relative px-2 py-1"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium transition-colors duration-200",
                    activeItem === item.href
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  )}
                >
                  {item.name}
                  {(activeItem === item.href || isHovered === index) && (
                    <motion.span 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"
                      layoutId="nav-underline"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              </div>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block"
            >
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg px-4 py-2 text-sm"
                onClick={(e) => handleNavClick(e, "#submit-form")}
              >
                Submit Contact
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 -mr-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-gray-900 dark:text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: { duration: 0.15, ease: "easeInOut" },
            }}
          >
            <div className="px-4 py-3 space-y-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                    activeItem === item.href
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      duration: 0.2,
                      delay: 0.05 * index,
                    },
                  }}
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.div
                className="pt-2 px-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 0.1 + menuItems.length * 0.05,
                    duration: 0.2,
                  },
                }}
              >
                <Button 
                  className="w-full justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg py-3 text-sm"
                  onClick={(e) => handleNavClick(e, "#submit-form")}
                >
                  Submit Contact
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default EnhancedNavbar;
