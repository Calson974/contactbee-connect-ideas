import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './Hero.module.css';
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

// Form component for the flip side
interface ContactFormProps {
  onBack: (e?: React.MouseEvent | React.TouchEvent) => void;
}
const ContactForm = ({
  onBack
}: ContactFormProps) => {
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
  const [customFieldLabel, setCustomFieldLabel] = useState("");
  const [customFieldValue, setCustomFieldValue] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from("submissions").insert({
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
      toast.success("Entry submitted successfully! Your contact will be included in today's vCard file.");

      // Reset form
      setName("");
      setPhone("");
      setCountry("");
      setCompany("");
      setEmail("");
      setWebsite("");
      setCustomFieldLabel("");
      setCustomFieldValue("");
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
  return <div className="w-full max-w-md mx-auto bg-card/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex flex-col relative z-30 max-h-[80vh] sm:max-h-[70vh] md:max-h-[65vh] overflow-hidden">
      {/* Chat icon positioned inside the form container on the right */}
      <div className="absolute top-15 right-2 w-16 h-16 z-10">
        <img src="/img/svg/oc-chatting.svg" alt="Chatting illustration" className="w-full h-full object-contain" />
      </div>
      <div className="p-6 pb-4 border-b border-border/50">
        <div className="flex items-center mb-2">
          <button onClick={e => onBack(e as React.MouseEvent)} className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Back to hero">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-semibold">Submit Your Entry</h2>
        </div>
        <p className="text-muted-foreground">Start growing your WhatsApp audience today</p>
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <form id="contact-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-3 space-y-4 [scrollbar-width:thin] [scrollbar-color:#9ca3af_transparent] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-semibold">
            Name
          </Label>
          <Input id="name" placeholder="Enter your name" value={name} onChange={e => setName(e.target.value)} required className="text-base bg-background/50 backdrop-blur-sm" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-semibold">
            WhatsApp Number
          </Label>
          <Input id="phone" type="tel" placeholder="+237 6xx xx xx xx" value={phone} onChange={e => setPhone(e.target.value)} required className="text-base bg-background/50 backdrop-blur-sm" />
          <p className="text-sm text-muted-foreground">
            Include country code (e.g., +237 for Cameroon)
          </p>
          
          <div className="space-y-2">
            <Label htmlFor="country" className="text-base font-semibold">
              Country
            </Label>
            <CountrySelect value={country} onChange={setCountry} required />
          </div>
        </div>

        <Collapsible open={showOptional} onOpenChange={setShowOptional}>
          <CollapsibleTrigger asChild>
            <Button type="button" variant="outline" className="w-full flex items-center justify-between hover:bg-white/5">
              <span>Add Optional Information</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${showOptional ? "rotate-180" : ""}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="company" className="text-base">
                Company
              </Label>
              <Input id="company" placeholder="Your company name" value={company} onChange={e => setCompany(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base">
                Email
              </Label>
              <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-base">
                Job Title
              </Label>
              <Input id="jobTitle" placeholder="Your job title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website" className="text-base">
                Website
              </Label>
              <Input id="website" placeholder="https://" value={website} onChange={e => setWebsite(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customFieldLabel" className="text-base">
                Custom Field Label
              </Label>
              <Input id="customFieldLabel" placeholder="e.g., Instagram, Telegram" value={customFieldLabel} onChange={e => setCustomFieldLabel(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customFieldValue" className="text-base">
                Custom Field Value
              </Label>
              <Input id="customFieldValue" placeholder="Value for custom field" value={customFieldValue} onChange={e => setCustomFieldValue(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-base">
                Address
              </Label>
              <Textarea id="address" placeholder="Your full address" value={address} onChange={e => setAddress(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base">
                Notes
              </Label>
              <Textarea id="notes" placeholder="Any additional notes" value={notes} onChange={e => setNotes(e.target.value)} className="text-base bg-background/50 backdrop-blur-sm" rows={3} />
            </div>
          </CollapsibleContent>
        </Collapsible>
        
        </form>
      </div>
      
      {/* Submit button - fixed outside scrollable area */}
      <div className="p-6 pt-4 border-t border-border/50 bg-card/80">
        <Button type="submit" form="contact-form" className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Entry'}
        </Button>
      </div>
    </div>;
};
const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedButton, setFocusedButton] = useState<string | null>(null);

  // Removed parallax scroll effect to keep content fixed

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
  return <React.Fragment>
      <Helmet>
        <title>BoostWhats - Grow Your WhatsApp Status Views Exponentially</title>
        <meta name="description" content="Tired of the same 50 status views? Join thousands growing their WhatsApp audience by 1000+ contacts through our shared contact pool. Start boosting your reach today!" />
      </Helmet>
      
      <section ref={containerRef} id="home" className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden" role="main" aria-label="Hero section with WhatsApp status growth information">
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full" style={{
        backgroundImage: "url('https://res.cloudinary.com/dmxik1gea/image/upload/w_1000/q_auto/f_auto/v1762084948/greenbackground_wzknn8.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }} />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full mix-blend-overlay filter blur-3xl" animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }} />
          <motion.div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full mix-blend-overlay filter blur-3xl" animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }} transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }} />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-4 py-4 flex items-center rounded-none h-full">
          <motion.div className="flip-container w-full" data-flipped={isFlipped} style={{
          touchAction: 'manipulation'
        }}>
            {/* Front side - Hero Content */}
            <motion.div className="flip-front" animate={{
            opacity: isFlipped ? 0 : 1
          }} transition={{
            duration: 0.3,
            ease: "easeInOut",
            delay: isFlipped ? 0 : 0.1
          }} style={{
            pointerEvents: isFlipped ? 'none' : 'auto'
          }}>
              <motion.div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-12 items-center">
                {/* Left Content */}
                <motion.div className="space-y-3 sm:space-y-4 lg:space-y-6 text-white" initial={{
                opacity: 0,
                x: -50
              }} animate={{
                opacity: 1,
                x: 0
              }} transition={{
                duration: 0.8,
                ease: "easeOut"
              }}>
                  {/* Badge */}
                  <motion.div initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.2
                }}>
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
                      🚀 Join 100+ Users Growing Their Reach
                    </span>
                  </motion.div>

                  {/* Main Heading */}
                  <motion.h1 className="text-2xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight" initial={{
                  opacity: 0,
                  y: 30
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.3,
                  duration: 0.8
                }}>
                    <span className="block mb-2">Tired of the same</span>
                    <span className="block bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                       </span><span className="text-white-500">50 Status</span> views?
                    
                  </motion.h1>

                  {/* Subheading */}
                  <motion.p className="text-sm sm:text-lg lg:text-2xl text-gray-200 max-w-2xl leading-relaxed" initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.5
                }}>
                    Tap into a shared contact pool and watch your{' '}
                    <span className="text-green-500">
                      WhatsApp audience scale automatically
                    </span>
                  </motion.p>

                  {/* CTA Buttons */}
                  <motion.div className="flex flex-col gap-2 sm:flex-row sm:gap-4 pt-2 sm:pt-4" initial={{
                  opacity: 0,
                  y: 20
                }} animate={{
                  opacity: 1,
                  y: 0
                }} transition={{
                  delay: 0.7
                }}>
                    <motion.div whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }}>
                      <Button size="lg" onClick={handleFlip} onFocus={() => setFocusedButton('cta-button')} onBlur={() => setFocusedButton(null)} className="group relative overflow-hidden bg-white hover:bg-white/90 text-primary font-semibold text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-6 rounded-full transition-all duration-300 min-h-[48px] sm:min-h-[56px] shadow-xl hover:shadow-2xl" aria-label="Open contact form to boost your WhatsApp status views">
                        <span className="relative z-10 flex items-center gap-2">
                          Let's Grow 
                          <motion.span animate={{
                          x: [0, 5, 0]
                        }} transition={{
                          duration: 1.5,
                          repeat: Infinity
                        }}>
                            →
                          </motion.span>
                        </span>
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{
                    scale: 1.05
                  }} whileTap={{
                    scale: 0.95
                  }}>
                      <Button variant="outline" size="lg" className="group font-semibold text-sm sm:text-lg px-4 py-3 sm:px-8 sm:py-6 rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white backdrop-blur-sm transition-all min-h-[48px] sm:min-h-[56px]" aria-label="Learn how the WhatsApp growth platform works">
                        <Play className="mr-2 w-5 h-5" />
                        How it works
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Stats */}
                  <motion.div className="flex flex-wrap gap-3 sm:gap-6 pt-4 sm:pt-8" initial={{
                  opacity: 0
                }} animate={{
                  opacity: 1
                }} transition={{
                  delay: 0.9
                }}>
                    {[{
                    value: "10K+",
                    label: "Active Users"
                  }, {
                    value: "1M+",
                    label: "Contacts Shared"
                  }, {
                    value: "500%",
                    label: "Avg. Growth"
                  }].map((stat, index) => <div key={index} className="text-center">
                        <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-300">{stat.label}</div>
                      </div>)}
                  </motion.div>
                </motion.div>

                {/* Right Image - Fixed */}
                <motion.div className="relative flex items-center justify-center lg:justify-end" initial={{
                opacity: 0,
                scale: 0.8
              }} animate={{
                opacity: 1,
                scale: 1
              }} transition={{
                delay: 0.4,
                duration: 0.8
              }}>
                  <div className="relative w-full max-w-sm lg:max-w-lg">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-2xl sm:blur-3xl opacity-50" />
                    
                    {/* Image */}
                    <motion.img src="https://res.cloudinary.com/dmxik1gea/image/upload/w_1000/q_auto/f_auto/v1762084953/excited-lady_tektkt.png" alt="Professional woman excited about WhatsApp growth" className="relative z-10 w-full h-auto drop-shadow-2xl" />
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Back side - Contact Form */}
            <motion.div className="flip-back" animate={{
            opacity: isFlipped ? 1 : 0
          }} transition={{
            duration: 0.4,
            ease: "easeInOut",
            delay: isFlipped ? 0.4 : 0
          }} style={{
            pointerEvents: isFlipped ? 'auto' : 'none',
            zIndex: isFlipped ? 40 : -1
          }}>
              <div className="w-full h-full flex items-center justify-center">
                <ContactForm onBack={handleFlip} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </React.Fragment>;
};
export default Hero;