import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Zap, Sparkles, ArrowRight, MessageSquare, BarChart2, Users, Download, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";
// Removed logoFull import as we're using favicon.png from public folder
import { Link } from "react-router-dom";

const menuItems = [
  { name: 'Features', href: '#features', icon: <BarChart2 className="w-4 h-4 mr-2" />, isHash: true },
  { name: 'Downloads', href: '/downloads', icon: <Download className="w-4 h-4 mr-2" />, isHash: false },
  { name: 'Admin', href: '/admin', icon: <Shield className="w-4 h-4 mr-2" />, isHash: false },
];


const NewNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      {
        rootMargin: '-80px 0px 0px 0px', // Trigger when hero is 80px from top of viewport
        threshold: 0.1
      }
    );

    const heroElement = document.getElementById('home');
    if (heroElement) {
      observer.observe(heroElement);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (heroElement) {
        observer.unobserve(heroElement);
      }
    };
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
        heroInView
          ? "bg-[#06e777]/95 backdrop-blur-md"
          : scrolled
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
              <img 
                src="/favicon.png" 
                alt="BoostWhats" 
                className={cn(
                  "h-8 w-8 mr-2",
                  heroInView ? "opacity-90" : "opacity-100"
                )} 
              />
              <span className={cn(
                "text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-white"
              )}>
                BoostWhats
              </span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className={cn(
            "hidden lg:flex items-center space-x-1 rounded-full px-2 py-1 shadow-sm",
            heroInView ? "bg-white/20 backdrop-blur-sm border border-white/20" : "bg-background/80 backdrop-blur-sm border border-border/10"
          )}>
            {menuItems.map((item) => (
              <motion.div
                key={item.name}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.isHash ? (
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium flex items-center rounded-full transition-all",
                      activeItem === item.href
                        ? heroInView ? "text-white bg-white/20" : "text-primary bg-primary/5"
                        : heroInView
                          ? "text-white/80 hover:text-white hover:bg-white/10"
                          : "text-foreground/80 hover:text-foreground hover:bg-accent/5"
                    )}
                  >
                    <span className={cn(
                      heroInView ? "text-white/80" : "text-foreground/60"
                    )}>{item.icon}</span>
                    <span className={cn(
                      heroInView ? "text-white" : "text-foreground"
                    )}>{item.name}</span>
                  </a>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium flex items-center rounded-full transition-all",
                      heroInView
                        ? "text-white/80 hover:text-white hover:bg-white/10"
                        : "text-foreground/80 hover:text-foreground hover:bg-accent/5"
                    )}
                  >
                    <span className={cn(
                      heroInView ? "text-white/80" : "text-foreground/60"
                    )}>{item.icon}</span>
                    <span className={cn(
                      heroInView ? "text-white" : "text-foreground"
                    )}>{item.name}</span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:block"
            >
              <Button
                className={cn(
                  "group relative overflow-hidden font-semibold rounded-full px-5 h-10 text-sm transition-all duration-200",
                  heroInView
                    ? "bg-white/90 hover:bg-white text-[#06e777] border border-white/20"
                    : "bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary/80 hover:to-accent/80 dark:from-primary dark:to-accent dark:hover:from-primary/90 dark:hover:to-accent/90 text-white"
                )}
                onClick={(e) => handleNavClick(e, '#submit-form')}
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.span
                  className={cn(
                    "absolute inset-0",
                    heroInView ? "bg-[#06e777]/10" : "bg-white/10"
                  )}
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            <div className={cn(
              heroInView ? "bg-white/20 border-white/20" : ""
            )}>
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <motion.button
              className={cn(
                "lg:hidden p-2 -mr-2 rounded-lg hover:bg-accent/10 transition-colors",
                heroInView ? "hover:bg-white/10" : ""
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className={cn(
                  "w-6 h-6",
                  heroInView ? "text-white" : "text-foreground"
                )} />
              ) : (
                <Menu className={cn(
                  "w-6 h-6",
                  heroInView ? "text-white" : "text-foreground"
                )} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={cn(
              "lg:hidden border-t",
              heroInView ? "bg-[#06e777]/95 backdrop-blur-lg border-white/20" : "bg-background/95 backdrop-blur-lg border-border/10"
            )}
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
              <>
                {menuItems.map((item, index) => (
                  item.isHash ? (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-xl transition-colors",
                        activeItem === item.href
                          ? heroInView ? "bg-white/20 text-white" : "bg-accent/10 text-primary"
                          : heroInView
                            ? "text-white/90 hover:bg-white/10"
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
                      <div className={cn(
                        "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
                        heroInView ? "bg-white/20" : "bg-accent/10"
                      )}>
                        <span className={cn(
                          heroInView ? "text-white/80" : "text-foreground/60"
                        )}>{item.icon}</span>
                      </div>
                      <span className="font-medium">{item.name}</span>
                      <ChevronRight className={cn(
                        "w-4 h-4 ml-auto",
                        heroInView ? "text-white/40" : "text-foreground/40"
                      )} />
                    </motion.a>
                  ) : (
                    <motion.div
                      key={item.name}
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
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl transition-colors",
                          heroInView
                            ? "text-white/90 hover:bg-white/10"
                            : "text-foreground/90 hover:bg-accent/5"
                        )}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
                          heroInView ? "bg-white/20" : "bg-accent/10"
                        )}>
                          <span className={cn(
                            heroInView ? "text-white/80" : "text-foreground/60"
                          )}>{item.icon}</span>
                        </div>
                        <span className="font-medium">{item.name}</span>
                        <ChevronRight className={cn(
                          "w-4 h-4 ml-auto",
                          heroInView ? "text-white/40" : "text-foreground/40"
                        )} />
                      </Link>
                    </motion.div>
                  )
                ))}
              </>

              <div className="pt-2 px-4">
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
                    className={cn(
                      "group w-full font-semibold rounded-xl h-12 text-base transition-all duration-200",
                      heroInView
                        ? "bg-white/90 hover:bg-white text-[#06e777] border border-white/20"
                        : "bg-gradient-to-r from-primary/90 to-accent/90 hover:from-primary/80 hover:to-accent/80 dark:from-primary dark:to-accent dark:hover:from-primary/90 dark:hover:to-accent/90 text-white"
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      const formSection = document.getElementById('submit-form');
                      if (formSection) {
                        // Wait for the menu to close before scrolling
                        setTimeout(() => {
                          formSection.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                      }
                    }}
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
