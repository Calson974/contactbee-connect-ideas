import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Check, Rocket, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Hero.module.css';
import { Helmet } from 'react-helmet-async';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";

// Particle animation component for enhanced visual effects
const ParticleField = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, size: number, delay: number}>>([]);

  useEffect(() => {
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-white/10 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating elements component
const FloatingElements = () => {
  const elements = [
    { icon: '', delay: 0, duration: 4 },
    { icon: '', delay: 1, duration: 5 },
    { icon: '', delay: 2, duration: 6 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${20 + index * 30}%`,
            top: `${30 + index * 20}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, 0],
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut",
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};

// Form component for the flip side
interface ContactFormProps {
  onBack: (e?: React.MouseEvent | React.TouchEvent) => void;
}

const ContactForm = ({ onBack }: ContactFormProps) => {
  const [planType, setPlanType] = useState("free");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Optional fields
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [customField, setCustomField] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        custom_field: customField || null,
        address: address || null,
        notes: notes || null,
      });

      if (error) throw error;

      toast.success("Entry submitted successfully! Your contact will be included in today's vCard file.");
      
      // Reset form
      setName("");
      setPhone("");
      setCountry("");
      setCompany("");
      setEmail("");
      setWebsite("");
      setCustomField("");
      setAddress("");
      setNotes("");
      setShowOptional(false);
            onBack(); // Go back to hero after successful submission
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-card rounded-2xl border border-border/50 shadow-xl flex flex-col relative z-30 max-h-[80vh] sm:max-h-[70vh] md:max-h-[65vh]">
      <div className="p-6 pb-4 border-b border-border/50">
        <div className="flex items-center mb-2">
          <button 
            onClick={(e) => onBack(e as React.MouseEvent)}
            className="mr-4 p-1 rounded-full hover:bg-accent/50 transition-colors"
            aria-label="Back to hero"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl">Submit Your Entry</h2>
        </div>
        <p className="text-muted-foreground">Start growing your WhatsApp audience today</p>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col noScrollbar">
        <form 
          id="contact-form"
          onSubmit={handleSubmit} 
          className="flex-1 overflow-y-auto px-6 py-3 space-y-4 noScrollbar"
        >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-semibold">
            Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="text-base"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-semibold">
            WhatsApp Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+237 6xx xx xx xx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="text-base"
          />
          <p className="text-sm text-muted-foreground">
            Include country code (e.g., +237 for Cameroon)
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="country" className="text-base font-semibold">
              Country
            </Label>
            <CountrySelect
              value={country}
              onChange={setCountry}
              required
            />
          </div>
        </div>

        <Collapsible open={showOptional} onOpenChange={setShowOptional}>
          <CollapsibleTrigger asChild>
            <Button 
              type="button"
              variant="outline"
              className="w-full flex items-center justify-between"
            >
              <span>Add Optional Information</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showOptional ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-base">
                Company
              </Label>
              <Input
                id="company"
                placeholder="Your company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-base">
                Job Title
              </Label>
              <Input
                id="jobTitle"
                placeholder="Your job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-base">
                Website
              </Label>
              <Input
                id="website"
                placeholder="https://"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customField" className="text-base">
                Custom Field
              </Label>
              <Input
                id="customField"
                placeholder="Any additional information"
                value={customField}
                onChange={(e) => setCustomField(e.target.value)}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-base">
                Address
              </Label>
              <Textarea
                id="address"
                placeholder="Your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-base"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base">
                Notes
              </Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="text-base"
                rows={3}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Submit button moved to bottom of form container */}
        <div className="p-3 border-t border-border/50 bg-card/80 backdrop-blur-sm mt-auto">
          <Button 
            type="submit" 
            form="contact-form"
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Entry'}
          </Button>
        </div>
      </form>
    </div>
    </div>
  );
};

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedButton, setFocusedButton] = useState<string | null>(null);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const elementsY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Optimize flip animation with better performance
  const handleFlip = useCallback((e: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    // Prevent double-tap zoom on mobile
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Add haptic feedback for supported devices
    if (navigator.vibrate && 'ontouchstart' in window) {
      navigator.vibrate(50);
    }

    // Force a reflow to ensure the animation works smoothly
    const element = document.querySelector(`.${styles.flipContainer}`) as HTMLElement;
    if (element) {
      element.style.transition = 'none';
      // Trigger reflow
      void element.offsetHeight;
      element.style.transition = 'transform 0.6s ease-in-out';
    }

    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  // Keyboard navigation for the flip animation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedButton === 'cta-button') {
          handleFlip(e as any);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedButton, handleFlip]);

  return (
    <React.Fragment>
      <style jsx global>{`
        /* Global styles are now in index.css */
      `}</style>
      <section 
        ref={containerRef} 
        id="home" 
        className="relative h-[90vh] xs:h-[92vh] sm:h-[95vh] md:h-[96vh] lg:h-[97vh] w-full flex items-center justify-center overflow-hidden rounded-b-[50px] xs:rounded-b-[60px] sm:rounded-b-[70px] md:rounded-b-[50px] lg:rounded-b-[90px]"
        style={{
          backgroundImage: "url('/img/greenbackground.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          position: 'relative'
        }}
      
        role="main"
        aria-label="Hero section with WhatsApp status growth information"
        tabIndex={-1}
      >
        <div className="absolute inset-0 bg-black/40" />
        {/* Enhanced animated background elements with parallax */}
        <motion.div className="absolute inset-0 overflow-hidden" style={{ y: backgroundY }}>
          <motion.div 
            className="absolute -top-20 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 left-20 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <motion.div 
            className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-white/3 rounded-full mix-blend-overlay filter blur-2xl"
            animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
        </motion.div>

        {/* Particle field for enhanced visual effects */}
        <ParticleField />

        {/* Floating elements */}
        <FloatingElements />

        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 pt-12 xs:pt-16 sm:pt-20 lg:pt-24 pb-4 xs:pb-6 sm:pb-8 lg:pb-12 relative z-10 h-full flex items-center min-h-[80vh] xs:min-h-[85vh] sm:min-h-[90vh] md:min-h-[92vh] lg:min-h-[95vh]">
          <div className="max-w-7xl mx-auto w-full">
            <motion.div
              className={`${styles.flipContainer} ${isFlipped ? styles.flipped : ''}`}
              style={{
                minHeight: isFlipped ? '120vh' : 'auto',
                touchAction: 'manipulation',
                position: 'relative',
                zIndex: isFlipped ? 40 : 'auto',
              }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              {/* Front side - Hero Content */}
              <motion.div 
                className={styles.flipFront}
                animate={{ opacity: isFlipped ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut", delay: isFlipped ? 0 : 0.1 }}
                style={{ pointerEvents: isFlipped ? 'none' : 'auto' }}
              >
                {/* Main content area with sophisticated layout */}
                <motion.div className="relative" style={{ y: elementsY }}>
                  {/* Background decorative elements */}
                  <motion.div className="absolute inset-0 -z-10">
                    <motion.div 
                      className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div 
                      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl"
                      animate={{ scale: [1.1, 1, 1.1] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    />
                  </motion.div>

                  {/* Hero Content Grid */}
                  <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 items-center h-full min-h-[60vh] xs:min-h-[65vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-[80vh] relative">
                    {/* Content Section - Left Side */}
                    <motion.div
                      className="col-span-1 text-left text-white space-y-3 xs:space-y-4 sm:space-y-5 px-2 xs:px-3 sm:px-4 pb-4 xs:pb-6 sm:pb-8 mr-2 xs:mr-4 sm:mr-6"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >

                      {/* Main heading with enhanced typography */}
                      <motion.h1
  className="leading-tight mb-4 xs:mb-5 sm:mb-6 md:mb-8 text-white whitespace-nowrap"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
>
  <motion.span
    className="block text-white mb-2 xs:mb-3 text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl whitespace-nowrap"
  >
    Tired of the same
  </motion.span>
  <motion.span
    className="relative inline-block group whitespace-nowrap"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <motion.span
      className="relative z-10 text-white text-xl xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl whitespace-nowrap"
    >
      50 Status views?
    </motion.span>
  </motion.span>
</motion.h1>


                      {/* Enhanced subheading */}
                      <motion.p
                        className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-100 max-w-full mb-4 xs:mb-6 sm:mb-8 leading-relaxed font-normal px-2 xs:px-0 whitespace-nowrap"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                      >
                        Tap into a shared contact pool and watch your <motion.span
                          className="text-white font-normal"
                        > elevate your WhatsApp audience scale automatically.</motion.span>
                        
                      </motion.p>

                      {/* Enhanced CTA section */}
                      <motion.div
                        className="flex flex-row gap-2 xs:gap-3 sm:gap-4 items-center justify-start mb-4 xs:mb-6 sm:mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            size="lg"
                            onClick={handleFlip}
                            onFocus={() => setFocusedButton('cta-button')}
                            onBlur={() => setFocusedButton(null)}
                            onTouchStart={(e) => {
                              e.currentTarget.classList.add('active:scale-95');
                              // Add haptic feedback for mobile
                              if (navigator.vibrate) navigator.vibrate(50);
                            }}
                            onTouchEnd={(e) => e.currentTarget.classList.remove('active:scale-95')}
                            className="relative overflow-hidden group bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#1a5632] font-normal text-xs xs:text-sm sm:text-base px-2 xs:px-4 sm:px-6 md:px-8 py-2 xs:py-3 sm:py-4 md:py-5 rounded-full hover:shadow-white/30 hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation w-auto min-w-[100px] xs:min-w-[120px] sm:min-w-[140px]"
                            style={{
                              WebkitTapHighlightColor: 'transparent',
                              WebkitTouchCallout: 'none',
                              WebkitUserSelect: 'none',
                              KhtmlUserSelect: 'none',
                              MozUserSelect: 'none',
                              msUserSelect: 'none',
                              userSelect: 'none',
                              minHeight: '44px', // Minimum touch target size
                            }}
                            aria-label="Open contact form to boost your WhatsApp status views"
                            aria-describedby="cta-description"
                          >
                            <motion.span
                              className="relative z-10 flex items-center justify-center"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                            >
                              Let's Goo
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                              >
                                <Rocket className="ml-2 sm:ml-2 md:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                              </motion.div>
                            </motion.span>
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                            />
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            onFocus={() => setFocusedButton('secondary-button')}
                            onBlur={() => setFocusedButton(null)}
                            className="group font-normal text-xs xs:text-sm sm:text-base px-2 xs:px-4 sm:px-6 md:px-8 py-2 xs:py-3 sm:py-4 md:py-5 rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white hover:text-white transition-all duration-300 w-auto min-w-[100px] xs:min-w-[120px] sm:min-w-[140px]"
                            style={{
                              minHeight: '44px', // Minimum touch target size
                            }}
                            aria-label="Learn how the WhatsApp growth platform works"
                          >
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 10 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Play className="mr-1 xs:mr-2 sm:mr-2 md:mr-3 w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-125 transition-transform" />
                            </motion.div>
                            How it works
                          </Button>
                        </motion.div>
                      </motion.div>

                      {/* Hidden description for screen readers */}
                      <div id="cta-description" className="sr-only">
                        Click or press Enter to open the contact form and start growing your WhatsApp audience
                      </div>
                    </motion.div>

                    {/* Image Section - Right Side */}
                    <motion.div
                      className="col-span-1 relative h-full flex items-end justify-center pt-4"
                      initial={{ opacity: 0, x: 30, scale: 0.9 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="relative w-full h-full flex items-center justify-end">
  <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg h-[90vh] flex items-end justify-end z-40">
    <motion.img
      src="/img/excited-lady.png"
      alt="Professional woman with WhatsApp growth platform"
      className="w-full h-auto max-h-full object-contain"
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
      }}
    />
  </div>
</div>

                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Back side - Contact Form */}
              <motion.div
                className={styles.flipBack}
                animate={{ opacity: isFlipped ? 1 : 0 }}
                transition={{ duration: 0.4, ease: "easeInOut", delay: isFlipped ? 0.4 : 0 }}
                style={{
                  position: 'absolute',
                  top: 120,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  zIndex: isFlipped ? 10 : -1,
                  pointerEvents: isFlipped ? 'auto' : 'none'
                }}
              >
                <div className="w-full h-full pt-6 xs:pt-8 sm:pt-12 md:pt-16 min-h-[70vh] xs:min-h-[85vh] sm:min-h-[100vh] md:min-h-[140vh]">
                  <ContactForm onBack={handleFlip} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Hero;
