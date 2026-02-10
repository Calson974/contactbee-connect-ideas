import { ReactNode, useEffect, useRef } from 'react';
import EnhancedNavbar from "./EnhancedNavbar";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const boostTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const textElement = boostTextRef.current;
      if (!textElement) return;
      
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollY = window.scrollY;
      
      // Calculate how far we've scrolled from the bottom of the page
      const scrollBottom = scrollY + windowHeight;
      const distanceFromBottom = documentHeight - scrollBottom;
      
      // Start revealing when we're 300px from the bottom
      const startRevealAt = 300;
      let revealProgress = 0;
      
      if (distanceFromBottom < startRevealAt) {
        // Calculate reveal progress (0 to 1)
        revealProgress = 1 - (distanceFromBottom / startRevealAt);
      }
      
      // Apply the reveal effect with higher opacity for better visibility
      textElement.style.opacity = `${revealProgress * 0.4}`; // Increased max opacity to 0.4
      
      // Move the text up as it's revealed (from 60px below to 0)
      const translateY = (1 - revealProgress) * 60;
      textElement.style.transform = `translateX(-50%) translateY(${translateY}px)`;
      
      console.log({
        scrollY,
        distanceFromBottom,
        revealProgress,
        opacity: revealProgress * 0.4,
        translateY
      });
    };
    
    // Initial check
    handleScroll();
    
    // Add scroll event listener with debounce
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden relative">
      <EnhancedNavbar />
      <main className="flex-1 relative z-10">
        {children}

        {/* Enhanced Large Text Overlay - Reveals on scroll up from footer */}
        <div
          ref={boostTextRef}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%) translateY(60px)',
            zIndex: 1, // Increased z-index slightly
            pointerEvents: 'none',
            userSelect: 'none',
            textAlign: 'center',
            opacity: 0,
            transition: 'opacity 0.8s ease-out, transform 1s cubic-bezier(0.16, 1, 0.3, 1)',
            willChange: 'opacity, transform',
            width: '100%',
            maxWidth: '1400px',
            padding: '0 20px',
            boxSizing: 'border-box',
            mixBlendMode: 'multiply',
            filter: 'blur(0.5px)'
          }}
        >
          <div
            style={{
              fontSize: 'clamp(4rem, 20vw, 18rem)',
              fontWeight: 900,
              lineHeight: 0.8,
              letterSpacing: '-0.02em',
              color: 'rgba(0, 0, 0, 0.06)',
              position: 'relative',
              display: 'inline-block',
              textShadow: 'none',
              whiteSpace: 'nowrap',
              fontFamily: 'var(--font-display), Georgia, serif',
              textTransform: 'uppercase',
              margin: '0 auto',
              maxWidth: '100%',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.04) 50%, rgba(16, 185, 129, 0.08) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            boostwhats
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to top, rgba(240, 253, 244, 0.9) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 1,
                opacity: 0.8
              }}
            />
          </div>
        </div>

        {/* Sophisticated Background Pattern */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-500/5 to-transparent dark:from-transparent dark:via-transparent dark:to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial opacity-10 dark:opacity-0"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial opacity-10 dark:opacity-0"></div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
