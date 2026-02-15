import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Play, TrendingUp, Users, Zap, ArrowLeft, ChevronDown, X, CheckCircle, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";
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

  // Set up countdown to 9 PM
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(21, 0, 0, 0);
      if (now > target) target.setDate(target.getDate() + 1);
      const diff = target.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setCountdown(`${hours}h ${minutes}m`);
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showDoneCard) {
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      scrollPositionRef.current = scrollY;
      const scrollPosition = scrollY.toString();
      document.body.setAttribute('data-scroll-y', scrollPosition);
      document.documentElement.setAttribute('data-scroll-y', scrollPosition);
      sessionStorage.setItem('modal-scroll-position', scrollPosition);
      localStorage.setItem('modal-scroll-position', scrollPosition);
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.scrollBehavior = 'auto';
      const protectPosition = setInterval(() => {
        document.body.setAttribute('data-scroll-y', scrollPosition);
        document.documentElement.setAttribute('data-scroll-y', scrollPosition);
        sessionStorage.setItem('modal-scroll-position', scrollPosition);
        localStorage.setItem('modal-scroll-position', scrollPosition);
      }, 100);
      return () => { clearInterval(protectPosition); };
    } else {
      let storedScrollY = scrollPositionRef.current.toString();
      if (storedScrollY === '0') {
        storedScrollY = document.body.getAttribute('data-scroll-y') || 
                        document.documentElement.getAttribute('data-scroll-y') || 
                        sessionStorage.getItem('modal-scroll-position') || 
                        localStorage.getItem('modal-scroll-position') || '0';
      }
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
      const scrollPosition = parseInt(storedScrollY);
      const restoreScroll = () => {
        window.scrollTo(0, scrollPosition);
        document.documentElement.scrollTop = scrollPosition;
        document.body.scrollTop = scrollPosition;
      };
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
      if (e.key === 'Escape') setShowDoneCard(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showDoneCard]);

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error("Please enter your name"); return; }
    if (!phone.trim()) { toast.error("Please enter your WhatsApp number"); return; }
    if (!country.trim()) { toast.error("Please select your country"); return; }
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
        phone, country,
        company: company || null, email: email || null,
        job_title: jobTitle || null, website: website || null,
        custom_field_label: customFieldLabel || null,
        custom_field: customFieldValue || null,
        address: address || null, notes: notes || null
      });
      if (error) throw error;
      setShowDoneCard(true);
      setName(""); setPhone(""); setCountry("");
      setCompany(""); setEmail(""); setJobTitle("");
      setWebsite(""); setCustomFieldLabel(""); setCustomFieldValue("");
      setAddress(""); setNotes(""); setShowOptional(false); setShowForm(false);
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error(`Failed to submit entry: ${error.message || 'Please try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const DoneCard = () => {
    if (typeof document === "undefined") return null;
    return createPortal(
      <div className="fixed inset-0 z-[1000] pointer-events-auto" role="dialog" aria-modal="true" aria-labelledby="success-title" aria-describedby="success-description">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-md" onMouseDown={() => setShowDoneCard(false)} />
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
            <button type="button" aria-label="Close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowDoneCard(false); }} onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); }} className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-700 shadow-sm ring-1 ring-black/10 backdrop-blur hover:bg-white dark:bg-gray-900/60 dark:text-gray-200 dark:ring-white/10 z-10">
              <X className="h-4 w-4" />
            </button>
            <div className="relative px-8 pb-8 pt-7">
              <div className="mx-auto -mt-8 mb-2 w-40 h-40">
                <DotLottieReact src="https://lottie.host/b6ff1611-82ed-401c-9e35-dec5e7c34fc3/PXsxxuYKQx.lottie" autoplay loop={false} />
              </div>
              <div className="text-center">
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary ring-1 ring-primary/20">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Submission received</span>
                </div>
                <h3 id="success-title" className="text-2xl font-black tracking-tight text-foreground">You're all set</h3>
                <p id="success-description" className="mt-2 text-sm leading-relaxed text-muted-foreground">Your contact will be included in today's vCard compilation.</p>
                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 px-4 py-4 text-left text-foreground shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Download window</div>
                      <div className="mt-0.5 text-sm opacity-90">
                        Return at <span className="font-semibold">9:00 PM</span> to download the contact file.
                        {countdown && <span className="ml-1 font-semibold">(in {countdown})</span>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-7 grid gap-3">
                  <Button type="button" onClick={(e) => { e.preventDefault(); setShowDoneCard(false); }} className="h-12 rounded-xl font-bold">Back to form</Button>
                  <Button type="button" variant="outline" onClick={(e) => { e.preventDefault(); setShowDoneCard(false); }} className="h-12 rounded-xl">Close</Button>
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
      <Helmet>
        <title>BoostWhats - Transform Your WhatsApp Status</title>
        <meta name="description" content="Join 1,000+ users growing their WhatsApp audience with curated contact lists." />
      </Helmet>
      
      <section id="home" className="relative w-full min-h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ backgroundImage: `url(${heroBackground})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
        
        {/* Subtle dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

        <div className="relative z-10" style={{ perspective: "1500px" }}>
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="hero-content"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ transformStyle: "preserve-3d" }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-32 lg:pt-36 pb-32 lg:pb-48"
              >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
                  
                  {/* Left Content */}
                  <div className="space-y-6 lg:pr-8">
                    
                    {/* Pill badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-sm font-semibold text-white tracking-wide">
                        1,000+ Growing Their Reach
                      </span>
                    </div>

                    {/* Heading — clean, bold, editorial */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight">
                      <span className="block text-white drop-shadow-sm">Transform Your</span>
                      <span className="block text-primary drop-shadow-sm mt-1">WhatsApp Status</span>
                      <span className="block text-white drop-shadow-sm mt-1">Into a Powerhouse</span>
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
                      Join <strong className="text-primary font-bold">1,000+ users</strong> growing their audience by{' '}
                      <strong className="text-primary font-bold">hundreds of contacts</strong> through our shared contact pool.
                    </p>

                    {/* Micro stats row */}
                    <div className="flex items-center gap-6 pt-2">
                      {[
                        { icon: Users, value: "1K+", label: "Members" },
                        { icon: TrendingUp, value: "500+", label: "Daily" },
                        { icon: Zap, value: "98%", label: "Success" },
                      ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-lg bg-primary/15 backdrop-blur-sm flex items-center justify-center border border-primary/20">
                            <stat.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <div className="text-white font-bold text-sm leading-none">{stat.value}</div>
                            <div className="text-white/50 text-xs mt-0.5">{stat.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-3 pt-4 flex-wrap">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowForm(true)}
                        className="group relative overflow-hidden rounded-xl px-7 py-3.5 font-bold text-sm text-primary-foreground transition-all duration-300"
                        style={{
                          background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                          boxShadow: "0 8px 24px -4px hsl(var(--primary) / 0.4)"
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/10" />
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
                        <span className="relative z-10 flex items-center gap-2">
                          Start Growing
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                        </span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                        className="group rounded-xl px-7 py-3.5 font-semibold text-sm text-white transition-all duration-300 border border-white/25 bg-white/5 backdrop-blur-md hover:bg-white/10 hover:border-white/40"
                      >
                        <span className="flex items-center gap-2">
                          <Play className="w-4 h-4" fill="currentColor" strokeWidth={0} />
                          How It Works
                        </span>
                      </motion.button>
                    </div>
                  </div>

                  {/* Right — Lady Image */}
                  <div className="relative -mb-16 sm:-mb-24 md:-mb-32 lg:-mb-48 xl:-mb-60 -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-16 z-0">
                    <div className="relative w-full mx-auto">
                      <div className="relative z-10 w-full">
                        <img 
                          src={ladyImage}
                          alt="Professional woman excited about WhatsApp growth"
                          className="w-full h-auto scale-[1.15]"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                      </div>
                      <div className="absolute -inset-8 bg-gradient-to-br from-primary/8 to-accent/5 rounded-full blur-3xl -z-10" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* ===== FORM SIDE (flip) ===== */
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
                  <div className="relative rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-primary/10">
                    
                    {/* Accent top bar */}
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-primary via-accent to-primary" />
                    
                    {/* Back Button */}
                    <Button variant="ghost" onClick={() => setShowForm(false)} className="mb-6 text-primary hover:bg-primary/5 -ml-2">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Hero
                    </Button>

                    {/* Form Header */}
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">Join Today</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                        Submit Your <span className="text-primary">Contact</span>
                      </h2>
                      <p className="text-muted-foreground">Fill in your details to be compiled for download by yourself and others</p>
                    </div>

                    {/* Plan Type Selector */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-foreground mb-3 block">Choose Your use case</Label>
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

                    {/* Form Fields */}
                    <div className="space-y-5">
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-foreground mb-2 block">Full Name <span className="text-destructive">*</span></Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required maxLength={planType === "free" ? 8 : undefined} placeholder={planType === "free" ? "Max 8 chars" : "Your full name"} className="h-11 rounded-lg" />
                        {planType === "free" && <p className="text-xs text-muted-foreground mt-1.5">{name.length}/8 characters used</p>}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">WhatsApp Number <span className="text-destructive">*</span></Label>
                        <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+237 6xx xx xx xx" className="h-11 rounded-lg" />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-sm font-medium text-foreground mb-2 block">Country <span className="text-destructive">*</span></Label>
                        <CountrySelect value={country} onChange={setCountry} required />
                      </div>

                      {/* Optional Fields */}
                      <Collapsible open={showOptional} onOpenChange={setShowOptional}>
                        <CollapsibleTrigger asChild>
                          <Button type="button" variant="outline" className="w-full h-11 flex items-center justify-between rounded-lg">
                            <span className="font-medium text-sm">Add Optional Information</span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${showOptional ? 'rotate-180' : ''}`} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-4 mt-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div><Label className="text-sm mb-2 block">Company</Label><Input value={company} onChange={(e) => setCompany(e.target.value)} className="h-11 rounded-lg" /></div>
                            <div><Label className="text-sm mb-2 block">Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="h-11 rounded-lg" /></div>
                            <div><Label className="text-sm mb-2 block">Job Title</Label><Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} className="h-11 rounded-lg" /></div>
                            <div><Label className="text-sm mb-2 block">Website</Label><Input value={website} onChange={(e) => setWebsite(e.target.value)} className="h-11 rounded-lg" /></div>
                          </div>
                          <div><Label className="text-sm mb-2 block">Address</Label><Textarea value={address} onChange={(e) => setAddress(e.target.value)} rows={3} className="rounded-lg resize-none" /></div>
                          <div><Label className="text-sm mb-2 block">Notes</Label><Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} className="rounded-lg resize-none" /></div>
                        </CollapsibleContent>
                      </Collapsible>

                      {/* Submit Button */}
                      <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="group relative overflow-hidden w-full h-12 font-bold text-base rounded-xl border-0 transition-all duration-300 mt-4"
                          style={{
                            background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                            boxShadow: "0 8px 24px -4px hsl(var(--primary) / 0.3)"
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-b from-white/15 via-transparent to-black/10" />
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
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
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      <AnimatePresence>
        {showDoneCard && <DoneCard />}
      </AnimatePresence>
    </>
  );
};

export default HeroModern;
