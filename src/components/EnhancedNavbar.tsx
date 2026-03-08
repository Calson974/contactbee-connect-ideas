import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const menuItems = [
  { name: "Downloads", href: "/downloads" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Legal", href: "/legal" },
];

const EnhancedNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const { theme } = useTheme();
  const location = useLocation();

  // Set active item based on current route
  useEffect(() => {
    const path = location.pathname;
    const hash = location.hash;
    
    // Check if current path matches a menu item
    const matchedRoute = menuItems.find(item => 
      item.href.startsWith('/') && path.startsWith(item.href)
    );
    
    if (matchedRoute) {
      setActiveItem(matchedRoute.href);
    } else if (path === '/' && hash) {
      // Only highlight if the hash matches a menu item
      const matchedHash = menuItems.find(item => item.href === hash);
      setActiveItem(matchedHash ? hash : "");
    } else {
      setActiveItem("");
    }
  }, [location.pathname, location.hash]);

  // --- LOGIC PRESERVED EXACTLY AS IS ---
  useEffect(() => {
    const shouldScrollToForm = sessionStorage.getItem('scrollToForm') === 'true';
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      // Hide navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
      
      // Only track hash sections when on home page
      if (window.location.pathname === '/') {
        const sections = menuItems
          .map(item => item.href)
          .filter(href => href.startsWith('#'));
        
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
      }
    };

    if (shouldScrollToForm) {
      const scrollToForm = () => {
        const form = document.querySelector('#submit-form');
        if (form) {
          form.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveItem('#submit-form');
          window.history.pushState(null, '', '#submit-form');
          sessionStorage.removeItem('scrollToForm');
        } else {
          setTimeout(scrollToForm, 100);
        }
      };
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
    if (href.startsWith('/')) {
      window.location.href = href;
      return;
    }
    if (href.startsWith('#')) {
      if (window.location.pathname !== '/') {
        window.location.href = `/${href}`;
        return;
      }
      const scrollToElement = () => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveItem(href);
          window.history.pushState(null, '', href);
          return true;
        }
        return false;
      };
      const scrolled = scrollToElement();
      if (!scrolled) {
        const checkAndScroll = () => {
          const success = scrollToElement();
          if (!success) {
            setTimeout(checkAndScroll, 100);
          }
        };
        setTimeout(checkAndScroll, 100);
      }
    }
    setIsMenuOpen(false);
  };
  // --- END LOGIC ---

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <div 
          className={cn(
            "pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-500",
            // Premium Glassmorphism
            "bg-white/80 dark:bg-gray-950/70 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60",
            "border border-white/40 dark:border-white/10",
            "ring-1 ring-black/5 dark:ring-white/5",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]",
            scrolled ? "py-2.5 px-4 max-w-4xl" : "py-4 px-6"
          )}
        >
          <div className="flex items-center justify-between">
            
            {/* Logo Section */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="#home"
                className="flex items-center space-x-3 group"
                onClick={(e) => handleNavClick(e, "#home")}
              >
                {/* Logo Container - No Filters applied to img */}
                <div className="relative w-9 h-9 flex items-center justify-center bg-white/50 dark:bg-white/10 rounded-xl border border-gray-200/50 dark:border-white/10 shadow-sm">
                  <img 
                    src="/favicon.png" 
                    alt="Logo" 
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <span className="hidden sm:block text-lg font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white">
                  BoostWhats
                </span>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center p-1">
              {menuItems.map((item) => {
                const isActive = activeItem === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 z-10",
                      isActive 
                        ? "text-blue-600 dark:text-blue-300" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 bg-blue-50/80 dark:bg-blue-900/30 rounded-full -z-10 border border-blue-100 dark:border-blue-500/30 shadow-[0_0_20px_0_rgba(59,130,246,0.1)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    {item.name}
                  </a>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97, y: -1 }}
                className="hidden md:block"
              >
                <Button 
                  className="group relative overflow-hidden rounded-full px-8 h-14 font-bold text-sm border-0 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                    boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                  }}
                  onClick={(e) => handleNavClick(e, "#submit-form")}
                >
                  {/* Inner glow layer */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                  
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary" />
                  </div>
                  
                  {/* Hover light sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  
                  {/* Content */}
                  <span className="relative z-10 flex items-center gap-2">
                    Submit Contact
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2.5} />
                  </span>
                </Button>
              </motion.div>

              {/* Mobile Toggle */}
              <motion.button
                className="md:hidden p-2.5 rounded-full bg-gray-100/50 dark:bg-gray-800/50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors backdrop-blur-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu - The "WhatsApp" Theme */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-gray-900/40 dark:bg-black/70 backdrop-blur-sm z-40"
            />
            {/* Menu Card */}
            <motion.div
              className="fixed top-24 left-4 right-4 z-50 overflow-hidden"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            >
              {/* CHANGED: Background is specifically WhatsApp Teal (#075E54) for visibility */}
              <div className="bg-[#075E54] rounded-3xl shadow-2xl shadow-black/20 border border-white/10 p-4 space-y-2">
                
                <div className="px-2 py-2 mb-2 border-b border-white/10">
                   <p className="text-xs font-semibold text-teal-100 uppercase tracking-wider opacity-70"></p>
                </div>

                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-medium transition-all group",
                      activeItem === item.href
                        ? "bg-white/20 text-white" 
                        : "hover:bg-white/10 text-white/90"
                    )}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <span className="flex items-center gap-3">
                      {activeItem === item.href ? (
                        <Sparkles className="w-4 h-4 text-white" />
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-300 group-hover:bg-white transition-colors" />
                      )}
                      {item.name}
                    </span>
                    <ArrowRight className={cn(
                        "w-4 h-4 transition-transform text-white",
                        activeItem === item.href ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                    )}/>
                  </motion.button>
                ))}
                
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="pt-2"
                >
                  <Button 
                    // CHANGED: Button is now Vibrant WhatsApp Green (#25D366) with White Text
                    className="w-full justify-center rounded-2xl bg-[#25D366] text-white hover:bg-[#20bd5a] h-12 shadow-lg border border-white/10"
                    onClick={(e) => handleNavClick(e, "#submit-form")}
                  >
                    Submit Contact <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedNavbar;