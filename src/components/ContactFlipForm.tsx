import { useState, useEffect, useRef } from 'react';
import { X, Send, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CountrySelect } from '@/components/ui/country-select';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

interface ContactFlipFormProps {
  onClose: () => void;
}

export function ContactFlipForm({ onClose }: ContactFlipFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    message: 'I\'d like to boost my contacts!'
  });
  
  const [showDoneCard, setShowDoneCard] = useState(false);
  const [countdown, setCountdown] = useState("");
  const scrollPositionRef = useRef<number>(0);

  // Set up countdown to 9 PM
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(21, 0, 0, 0); // 9 PM
      
      if (now > target) {
        // If it's past 9 PM, set target to 9 PM tomorrow
        target.setDate(target.getDate() + 1);
      }
      
      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      
      setCountdown(`${hours}h ${minutes}m`);
    };
    
    // Update immediately and then every minute
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showDoneCard) {
      // Store current scroll position immediately and protect it
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      scrollPositionRef.current = scrollY; // Store in React ref
      
      // Store in multiple places immediately
      const scrollPosition = scrollY.toString();
      document.body.setAttribute('data-scroll-y', scrollPosition);
      document.documentElement.setAttribute('data-scroll-y', scrollPosition);
      sessionStorage.setItem('modal-scroll-position', scrollPosition);
      localStorage.setItem('modal-scroll-position', scrollPosition);
      
      // Lock both html and body
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.scrollBehavior = 'auto';
      
      // Protect against any interference by re-storing the position
      const protectPosition = setInterval(() => {
        document.body.setAttribute('data-scroll-y', scrollPosition);
        document.documentElement.setAttribute('data-scroll-y', scrollPosition);
        sessionStorage.setItem('modal-scroll-position', scrollPosition);
        localStorage.setItem('modal-scroll-position', scrollPosition);
      }, 100);
      
      return () => {
        clearInterval(protectPosition);
      };
    } else {
      // Get scroll position from React ref first (most reliable)
      let storedScrollY = scrollPositionRef.current.toString();
      
      // Fallback to other storage methods
      if (storedScrollY === '0') {
        storedScrollY = document.body.getAttribute('data-scroll-y') || 
                        document.documentElement.getAttribute('data-scroll-y') || 
                        sessionStorage.getItem('modal-scroll-position') || 
                        localStorage.getItem('modal-scroll-position') || '0';
      }
      
      // Restore both html and body
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.scrollBehavior = '';
      
      // Clean up attributes
      document.body.removeAttribute('data-scroll-y');
      document.documentElement.removeAttribute('data-scroll-y');
      sessionStorage.removeItem('modal-scroll-position');
      localStorage.removeItem('modal-scroll-position');
      
      // Use the stored scroll position
      const scrollPosition = parseInt(storedScrollY);
      
      // Force scroll restoration with multiple methods
      const restoreScroll = () => {
        window.scrollTo(0, scrollPosition);
        document.documentElement.scrollTop = scrollPosition;
        document.body.scrollTop = scrollPosition;
      };
      
      // Apply immediately and multiple times to override any interference
      restoreScroll();
      requestAnimationFrame(restoreScroll);
      setTimeout(restoreScroll, 10);
      setTimeout(restoreScroll, 50);
      setTimeout(restoreScroll, 100);
      setTimeout(restoreScroll, 200);
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.scrollBehavior = '';
      document.body.removeAttribute('data-scroll-y');
      document.documentElement.removeAttribute('data-scroll-y');
      sessionStorage.removeItem('modal-scroll-position');
      localStorage.removeItem('modal-scroll-position');
    };
  }, [showDoneCard]);

  useEffect(() => {
    if (!showDoneCard) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowDoneCard(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showDoneCard]);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase.from("submissions").insert({
        plan_type: "free",
        name: formData.name.slice(0, 8), // Limit to 8 chars for free plan
        phone: formData.phone,
        country: formData.country,
        company: null,
        email: formData.email,
        job_title: null,
        website: null,
        custom_field_label: null,
        custom_field: null,
        address: null,
        notes: formData.message
      });

      if (error) throw error;

      // Show the done card
      setShowDoneCard(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        message: 'I\'d like to boost my contacts!'
      });
      
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  // Done Card Component
  const DoneCard = () => {
    if (typeof document === "undefined") return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[1000] pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        aria-describedby="success-description"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-md"
          onMouseDown={() => setShowDoneCard(false)}
        />

        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-black/10 dark:ring-white/10"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/20 via-accent/15 to-primary/20" />

            <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-70 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/25 via-accent/20 to-primary/25" />
            </div>

            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDoneCard(false);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-700 shadow-sm ring-1 ring-black/10 backdrop-blur hover:bg-white dark:bg-gray-900/60 dark:text-gray-200 dark:ring-white/10 z-10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative px-8 pb-8 pt-7">
              <div className="mx-auto -mt-8 mb-2 w-40 h-40">
                <DotLottieReact
                  src="https://lottie.host/b6ff1611-82ed-401c-9e35-dec5e7c34fc3/PXsxxuYKQx.lottie"
                  autoplay
                  loop={false}
                />
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-400/20">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Submission received</span>
                </div>

                <h3 id="success-title" className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                  You're all set
                </h3>

                <p id="success-description" className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Your contact will be included in today's vCard compilation.
                </p>

                <div className="mt-6 rounded-2xl border border-blue-200/60 bg-blue-50/80 px-4 py-4 text-left text-blue-800 shadow-sm dark:border-blue-400/20 dark:bg-blue-900/20 dark:text-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Download window</div>
                      <div className="mt-0.5 text-sm opacity-90">
                        Return at <span className="font-semibold">9:00 PM</span> to download the contact file.
                        {countdown && (
                          <span className="ml-1 font-semibold">(in {countdown})</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  <Button 
                    type="button" 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDoneCard(false);
                    }} 
                    className="h-12 rounded-xl font-bold"
                  >
                    Back to form
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDoneCard(false);
                    }} 
                    className="h-12 rounded-xl"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <>
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-start justify-center pt-24 pb-4 px-4">
        <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden border border-border/50 min-h-[80vh] max-h-[90vh] overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
            aria-label="Close form"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Boost Your Contacts</h3>
              <p className="text-muted-foreground">Fill in your details and we'll get back to you</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium leading-none">
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium leading-none">
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 123-4567"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="country" className="text-sm font-medium leading-none">
                  Country <span className="text-destructive">*</span>
                </label>
                <CountrySelect
                  value={formData.country}
                  onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
                  className="w-full"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium leading-none">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full"
                />
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97, y: -1 }}
              >
                <Button 
                  type="submit" 
                  className="group relative overflow-hidden w-full mt-6 font-bold text-lg rounded-full border-0 transition-all duration-300"
                  size="lg"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                    boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                  }}
                >
                  {/* Inner glow layer */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                  
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary" />
                  </div>
                  
                  {/* Hover light sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  
                  <span className="relative z-10 flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </span>
                </Button>
              </motion.div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showDoneCard && <DoneCard />}
      </AnimatePresence>
    </>
  );
}
