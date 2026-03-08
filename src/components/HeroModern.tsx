import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Play, TrendingUp, Users, Zap, ArrowLeft, ChevronDown, X, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";
import { COUNTRY_DIAL_CODES } from "@/lib/country-dial-codes";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { createPortal } from 'react-dom';
import heroBackground from "@/assets/hero-background.jpg";

const ladyImage = 'https://res.cloudinary.com/dmxik1gea/image/upload/v1762512102/exited-lady-vectored_uyneb6.png';

const HeroModern = () => {
  const [showForm, setShowForm] = useState(false);
  const [planType, setPlanType] = useState("free");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [customFieldLabel, setCustomFieldLabel] = useState("");
  const [customFieldValue, setCustomFieldValue] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [showDoneCard, setShowDoneCard] = useState(false);
  const [countdown, setCountdown] = useState("");
  const scrollPositionRef = useRef<number>(0);

  // Load terms acceptance and country from localStorage on mount
  useEffect(() => {
    const savedTermsAcceptance = localStorage.getItem('termsAccepted');
    if (savedTermsAcceptance === 'true') {
      setHasAcceptedTerms(true);
    }
    
    const savedCountry = localStorage.getItem('selectedCountry');
    if (savedCountry) {
      setCountry(savedCountry);
      // Auto-fill dial code if phone is empty
      const dialCode = COUNTRY_DIAL_CODES[savedCountry];
      if (dialCode) {
        setPhone(dialCode + ' ');
      }
    }
  }, []);

  // Save terms acceptance to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('termsAccepted', hasAcceptedTerms.toString());
  }, [hasAcceptedTerms]);

  // Save country to localStorage when it changes
  useEffect(() => {
    if (country) {
      localStorage.setItem('selectedCountry', country);
    }
  }, [country]);

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

  const handleSubmit = async () => {
    // Check if user has accepted terms
    if (!hasAcceptedTerms) {
      toast.error("Please accept the Terms of Service to continue.");
      return;
    }
    
    // Validate required fields
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    
    if (!phone.trim()) {
      toast.error("Please enter your WhatsApp number");
      return;
    }
    
    if (!country.trim()) {
      toast.error("Please select your country");
      return;
    }

    // Validate phone format (basic check for international format)
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
      toast.error("Please enter a valid phone number (e.g., +237 6xx xx xx xx)");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("submissions").insert({
        plan_type: planType,
        name: planType === "free" ? name.slice(0, 8) : name,
        phone,
        country,
        company: company || null,
        email: email || null,
        job_title: jobTitle || null,
        website: website || null,
        custom_field_label: customFieldLabel || null,
        custom_field: customFieldValue || null,
        address: address || null,
        notes: notes || null
      });

      if (error) throw error;

      // Show the premium success modal instead of toast
      setShowDoneCard(true);

      setName("");
      // Don't clear country - keep it from localStorage for convenience
      const dialCode = COUNTRY_DIAL_CODES[country];
      setPhone(dialCode ? dialCode + ' ' : "");
      setCompany("");
      setEmail("");
      setJobTitle("");
      setWebsite("");
      setCustomFieldLabel("");
      setCustomFieldValue("");
      setAddress("");
      setNotes("");
      setShowOptional(false);
      setShowForm(false);
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error(`Failed to submit entry: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
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
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-border {
          0% {
            --angle: 0deg;
          }
          100% {
            --angle: 360deg;
          }
        }

        .glowing-border-container {
          position: relative;
          border-radius: 1rem;
        }

        .glowing-border-container::before,
        .glowing-border-container::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 1rem;
          background: conic-gradient(
            from var(--angle),
            transparent 0deg 105deg,
            rgb(20, 184, 166) 120deg,
            transparent 135deg 255deg,
            rgb(34, 197, 94) 270deg,
            transparent 285deg 360deg
          );
          animation: rotate-border 3s linear infinite;
          z-index: -1;
        }

        .glowing-border-container::after {
          inset: -15px;
          filter: blur(15px);
          opacity: 0.4;
        }

        .glowing-border-inner {
          position: relative;
          background: white;
          border-radius: 1rem;
          z-index: 1;
        }

        .dark .glowing-border-inner {
          background: rgb(31, 41, 55);
        }
      `}</style>
      <Helmet>
        <title>BoostWhats - Transform Your WhatsApp Status</title>
        <meta name="description" content="Join 1,000+ users growing their WhatsApp audience" />
      </Helmet>
      
      <section id="home" className="relative w-full min-h-screen overflow-hidden z-10">
        {/* Branded background image - fully visible, no overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_hsl(var(--primary)/0.08)_0%,_transparent_50%)] opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_hsl(var(--accent)/0.06)_0%,_transparent_50%)] opacity-60" />
          
          <div className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            }}
          />

          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl" />
        </div>

        <div className="relative z-10" style={{ perspective: "1500px" }}>
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="hero-content"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-36 lg:pt-40 pb-32 lg:pb-48"
              >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                  
                  {/* Left Content */}
                  <div className="space-y-8 lg:pr-8 relative z-20">
                    
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex"
                    >
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          1,000+ Growing Their Reach
                        </span>
                      </div>
                    </motion.div>

                    {/* Heading */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
                        <span className="block text-white">
                          Transform Your
                        </span>
                        <span className="block text-primary mt-1">
                          WhatsApp Status
                        </span>
                        <span className="block text-white mt-1">
                          Into a Powerhouse
                        </span>
                      </h1>
                    </motion.div>

                    {/* Subheading */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="space-y-5"
                    >
                      <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                        Join <strong className="text-primary">1,000+ users</strong> growing their audience by{' '}
                        <strong className="text-primary">hundreds of contacts</strong> through our shared contact pool.
                      </p>
                      
                      
                    </motion.div>

                    {/* CTA Buttons - Premium Design */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex gap-2 sm:gap-3 pt-6 flex-nowrap overflow-visible"
                    >
                      {/* Primary CTA - Premium 3D Button */}
                      <motion.button
                        whileHover={{ 
                          scale: 1.03, 
                          y: -3,
                          boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.4), 0 10px 20px -5px hsl(var(--primary) / 0.2)"
                        }}
                        whileTap={{ scale: 0.97, y: -1 }}
                        onClick={() => setShowForm(true)}
                        className="group relative overflow-hidden rounded-2xl px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base text-white transition-all duration-300 flex-shrink-0"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                          boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                        }}
                      >
                        {/* Inner glow layer */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 via-transparent to-black/10 pointer-events-none" />
                        
                        {/* Animated gradient border */}
                        <div className="absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20 pointer-events-none">
                          <div className="h-full w-full rounded-2xl bg-gradient-to-br from-primary to-secondary" />
                        </div>
                        
                        {/* Hover light sweep effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                        
                        {/* Content */}
                        <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                          <span className="tracking-wide text-xs sm:text-sm whitespace-nowrap">Start Growing</span>
                          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2.5} />
                        </span>
                      </motion.button>

                      {/* Secondary CTA - Glassmorphism Premium */}
                      <motion.button
                        whileHover={{ 
                          scale: 1.03, 
                          y: -3,
                          backgroundColor: "rgba(255, 255, 255, 0.15)"
                        }}
                        whileTap={{ scale: 0.97, y: -1 }}
                        onClick={() => {
                          document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="group relative overflow-hidden rounded-2xl px-6 sm:px-8 py-3 sm:py-4 font-semibold text-sm sm:text-base transition-all duration-300 border-2 backdrop-blur-md flex-shrink-0"
                        style={{
                          borderColor: "hsla(var(--primary), 0.4)",
                          background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
                        }}
                      >
                        {/* Inner gradient glow on hover */}
                        <div 
                          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{
                            background: "radial-gradient(ellipse at center, hsla(var(--primary), 0.25) 0%, transparent 70%)"
                          }}
                        />
                        
                        {/* Border glow effect */}
                        <div 
                          className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none"
                          style={{
                            background: "linear-gradient(135deg, hsla(var(--primary), 0.6), hsla(var(--secondary), 0.6))"
                          }}
                        />
                        
                        {/* Content */}
                        <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                          <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-all duration-300 group-hover:scale-110" fill="currentColor" strokeWidth={0} />
                          <span className="tracking-wide text-xs sm:text-sm whitespace-nowrap">How It Works</span>
                        </span>
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Right Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="relative -mb-16 sm:-mb-24 md:-mb-32 lg:-mb-48 xl:-mb-60 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-16 z-0"
                  >
                    <div className="relative w-full mx-auto">
                      <div className="relative z-10 w-full">
                        <img 
                          src={ladyImage}
                          alt="Professional woman excited about WhatsApp growth"
                          className="w-full h-auto scale-[1.15]"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                                              </div>
                      
                      <div className="absolute -inset-8 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl -z-10" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form-content"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 lg:pt-32 pb-32 lg:pb-48"
              >
                <div className="max-w-2xl mx-auto">
                  {/* Glowing border wrapper */}
                  <div className="glowing-border-container">
                    <div className="glowing-border-inner p-6 sm:p-8 lg:p-10">
                    
                    {/* Back Button */}
                    <Button
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                      className="mb-6 text-primary hover:bg-primary/5 -ml-2"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Hero
                    </Button>

                    {/* Form Header */}
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Join Today</span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Submit Your <span className="text-primary">Contact</span>
                      </h2>
                      <p className="text-muted-foreground">
                        Fill in your details to be compiled for download by yourself and others
                      </p>
                    </div>

                    {/* Plan Type Selector */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-3 block">
                        Choose Your use case
                      </Label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { value: "free", title: "Personal Use", desc: "Name limited to 8 characters" },
                          { value: "professional", title: "Professional Use", desc: "Full name & all features" }
                        ].map((plan) => (
                          <button
                            key={plan.value}
                            type="button"
                            onClick={() => setPlanType(plan.value)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              planType === plan.value
                                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                : 'border-border hover:border-muted-foreground/30'
                            }`}
                          >
                            <div className="font-semibold text-foreground text-sm">{plan.title}</div>
                            <div className="text-xs text-muted-foreground mt-0.5">{plan.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                      
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">
                          Full Name <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          maxLength={planType === "free" ? 8 : undefined}
                          placeholder={planType === "free" ? "Max 8 chars" : "Your full name"}
                          className="h-11 rounded-lg"
                        />
                        {planType === "free" && (
                          <p className="text-xs text-muted-foreground mt-1.5">
                            {name.length}/8 characters used
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="country" className="text-sm font-medium text-foreground mb-2 block">
                          Country <span className="text-destructive">*</span>
                        </Label>
                        <CountrySelect value={country} onChange={(val) => {
                          setCountry(val);
                          const dialCode = COUNTRY_DIAL_CODES[val];
                          if (dialCode) {
                            const currentDialCode = Object.values(COUNTRY_DIAL_CODES).find(code => phone.startsWith(code));
                            if (!phone || phone === currentDialCode || phone === '') {
                              setPhone(dialCode);
                            }
                          }
                        }} required />
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                          WhatsApp Number <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder={country ? `${COUNTRY_DIAL_CODES[country] || ''} xxx xx xx xx` : "+237 6xx xx xx xx"}
                          className="h-11 rounded-lg"
                        />
                      </div>

                      {/* Optional Fields */}
                      <Collapsible open={showOptional} onOpenChange={setShowOptional}>
                        <CollapsibleTrigger asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full h-11 flex items-center justify-between rounded-lg"
                          >
                            <span className="font-medium text-sm">Add Optional Information</span>
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${
                                showOptional ? 'rotate-180' : ''
                              }`}
                            />
                          </Button>
                        </CollapsibleTrigger>

                        <CollapsibleContent className="space-y-4 mt-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm mb-2 block">Company</Label>
                              <Input 
                                value={company} 
                                onChange={(e) => setCompany(e.target.value)} 
                                className="h-11 rounded-lg" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm mb-2 block">Email</Label>
                              <Input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="h-11 rounded-lg" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm mb-2 block">Job Title</Label>
                              <Input 
                                value={jobTitle} 
                                onChange={(e) => setJobTitle(e.target.value)} 
                                className="h-11 rounded-lg" 
                              />
                            </div>
                            <div>
                              <Label className="text-sm mb-2 block">Website</Label>
                              <Input 
                                value={website} 
                                onChange={(e) => setWebsite(e.target.value)} 
                                className="h-11 rounded-lg" 
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-sm mb-2 block">Address</Label>
                            <Textarea 
                              value={address} 
                              onChange={(e) => setAddress(e.target.value)} 
                              rows={3} 
                              className="rounded-lg resize-none" 
                            />
                          </div>
                          <div>
                            <Label className="text-sm mb-2 block">Notes</Label>
                            <Textarea 
                              value={notes} 
                              onChange={(e) => setNotes(e.target.value)} 
                              rows={3} 
                              className="rounded-lg resize-none" 
                            />
                          </div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Terms and Conditions Checkbox */}
                      <div className="space-y-3 p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            id="terms-hero"
                            checked={hasAcceptedTerms}
                            onCheckedChange={(checked) => setHasAcceptedTerms(checked as boolean)}
                            className="mt-1 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor="terms-hero" 
                              className="text-sm leading-relaxed cursor-pointer hover:text-primary transition-colors"
                            >
                              I have read and agree to the{" "}
                              <a 
                                href="/legal/terms" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Terms of Service
                              </a>{" "}
                              and{" "}
                              <a 
                                href="/legal/privacy" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Privacy Policy
                              </a>
                              . I understand that my contact information will be shared with other users.
                            </Label>
                            {hasAcceptedTerms && (
                              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-green-500" />
                                Your preference has been saved for future submissions
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <motion.div 
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97, y: -1 }}
                      >
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="group relative overflow-hidden w-full h-12 font-bold text-lg rounded-xl border-0 transition-all duration-300 mt-6"
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
                          
                          {isSubmitting ? (
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              Submitting...
                            </span>
                          ) : (
                            <span className="relative z-10 flex items-center justify-center gap-2">
                              <Zap className="w-5 h-5" />
                              Submit My Contact
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showDoneCard && <DoneCard />}
      </AnimatePresence>
    </>
  );
};

export default HeroModern;
