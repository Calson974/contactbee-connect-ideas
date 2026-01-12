import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, ChevronDown, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";

// Floating particles component
const FloatingParticles = () => {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-purple-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

// Form component
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
      toast.success("Entry submitted successfully! Your contact will be included in today's vCard file.");

      // Reset form
      setName(""); setPhone(""); setCountry(""); setCompany(""); setEmail(""); setWebsite("");
      setCustomFieldLabel(""); setCustomFieldValue(""); setAddress(""); setNotes("");
      setShowOptional(false);
      onBack();
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-md mx-auto bg-gradient-to-br from-white/95 via-white/90 to-white/85 dark:from-gray-900/95 dark:via-gray-900/90 dark:to-gray-900/85 backdrop-blur-2xl rounded-3xl border border-white/30 dark:border-white/10 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.4)] flex flex-col relative z-30 max-h-[85vh] overflow-hidden"
    >
      <div className="absolute top-4 right-4 w-12 h-12 z-10">
        <img src="/img/svg/oc-chatting.svg" alt="Chatting" className="w-full h-full object-contain opacity-60" />
      </div>

      <div className="p-6 pb-4 border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center mb-2">
          <button 
            onClick={e => onBack(e as React.MouseEvent)} 
            className="mr-4 p-2 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
            aria-label="Back to hero"
          >
            <ArrowLeft className="w-5 h-5 text-purple-600 dark:text-purple-400 group-hover:transform group-hover:-translate-x-1 transition-transform" />
          </button>
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              Submit Your Entry
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Start growing today</p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <form id="contact-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-5 scrollbar-thin scrollbar-thumb-purple-300 dark:scrollbar-thumb-purple-700 scrollbar-track-transparent">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-base font-semibold text-gray-900 dark:text-white">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="name" 
              placeholder="Your full name" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              required 
              className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500" 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-base font-semibold text-gray-900 dark:text-white">
              WhatsApp Number <span className="text-red-500">*</span>
            </Label>
            <Input 
              id="phone" 
              type="tel" 
              placeholder="+237 6xx xx xx xx" 
              value={phone} 
              onChange={e => setPhone(e.target.value)} 
              required 
              className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500" 
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Include country code (e.g., +237 for Cameroon)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-base font-semibold text-gray-900 dark:text-white">
              Country <span className="text-red-500">*</span>
            </Label>
            <CountrySelect value={country} onChange={setCountry} required />
          </div>

          <Collapsible open={showOptional} onOpenChange={setShowOptional}>
            <CollapsibleTrigger asChild>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full flex items-center justify-between hover:bg-purple-50 dark:hover:bg-purple-950/30 border-purple-200 dark:border-purple-800"
              >
                <span className="font-semibold">Add Optional Information</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showOptional ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-base text-gray-900 dark:text-white">
                  Company
                </Label>
                <Input 
                  id="company" 
                  placeholder="Your company" 
                  value={company} 
                  onChange={e => setCompany(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base text-gray-900 dark:text-white">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  placeholder="your@email.com" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-base text-gray-900 dark:text-white">
                  Job Title
                </Label>
                <Input 
                  id="jobTitle" 
                  placeholder="Your position" 
                  value={jobTitle} 
                  onChange={e => setJobTitle(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="website" className="text-base text-gray-900 dark:text-white">
                  Website
                </Label>
                <Input 
                  id="website" 
                  placeholder="https://" 
                  value={website} 
                  onChange={e => setWebsite(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customFieldLabel" className="text-base text-gray-900 dark:text-white">
                  Custom Field Label
                </Label>
                <Input 
                  id="customFieldLabel" 
                  placeholder="e.g., Instagram, Telegram" 
                  value={customFieldLabel} 
                  onChange={e => setCustomFieldLabel(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customFieldValue" className="text-base text-gray-900 dark:text-white">
                  Custom Field Value
                </Label>
                <Input 
                  id="customFieldValue" 
                  placeholder="Value for custom field" 
                  value={customFieldValue} 
                  onChange={e => setCustomFieldValue(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address" className="text-base text-gray-900 dark:text-white">Address</Label>
                <Textarea 
                  id="address" 
                  placeholder="Your full address" 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                  rows={3} 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-base text-gray-900 dark:text-white">Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Additional information" 
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700" 
                  rows={3} 
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </form>
      </div>
      
      <div className="p-6 pt-4 border-t border-gray-200/50 dark:border-gray-800/50 bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-900/80 dark:to-purple-950/80">
        <Button 
          type="submit" 
          form="contact-form" 
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all" 
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <motion.div
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              Submitting...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Submit Entry
            </span>
          )}
        </Button>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedButton, setFocusedButton] = useState<string | null>(null);

  const handleFlip = useCallback((e?: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (navigator.vibrate && 'ontouchstart' in window) {
      navigator.vibrate(50);
    }
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

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
    <>
      <Helmet>
        <title>BoostWhats - Transform Your WhatsApp Status Into a Powerhouse</title>
        <meta name="description" content="Join 10,000+ users growing their WhatsApp audience by 1000+ contacts. Revolutionary shared contact pool for exponential growth." />
      </Helmet>
      
      <section 
        ref={containerRef} 
        id="home" 
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950" 
        role="main"
      >
        {/* Animated Gradient Background with Mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-[10%] w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full filter blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-[15%] w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full filter blur-3xl"
            animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute top-[40%] right-[30%] w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-pink-400/25 to-orange-400/25 rounded-full filter blur-3xl"
            animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <FloatingParticles />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Left Content */}
                <motion.div 
                  className="space-y-6 lg:space-y-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-300/30 dark:border-purple-500/30 shadow-lg"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.2)',
                        '0 0 40px rgba(236, 72, 153, 0.3)',
                        '0 0 20px rgba(168, 85, 247, 0.2)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      10,000+ Growing Their Reach
                    </span>
                  </motion.div>

                  {/* Main Heading */}
                  <motion.div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
                      <span className="block mb-2 text-gray-900 dark:text-white">
                        Transform Your
                      </span>
                      <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        WhatsApp Status
                      </span>
                      <span className="block text-gray-900 dark:text-white">
                        Into a{' '}
                        <span className="relative inline-block">
                          <span className="relative z-10">Powerhouse</span>
                          <motion.span
                            className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-50 -z-10 rounded"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                          />
                        </span>
                      </span>
                    </h1>
                  </motion.div>

                  {/* Subheading */}
                  <motion.div className="space-y-4">
                    <p className="text-lg lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-medium">
                      Join <span className="font-bold text-purple-600 dark:text-purple-400">10,000+ users</span> growing their audience by{' '}
                      <span className="font-bold text-pink-600 dark:text-pink-400">1000+ contacts</span> through our revolutionary shared contact pool.
                    </p>
                    
                    {/* Quick Features */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      {[
                        { icon: TrendingUp, text: 'Exponential Growth' },
                        { icon: Users, text: 'Active Community' },
                        { icon: Zap, text: 'Instant Results' }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                        >
                          <item.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                      <Button 
                        size="lg" 
                        onClick={handleFlip}
                        onFocus={() => setFocusedButton('cta-button')} 
                        onBlur={() => setFocusedButton(null)}
                        className="relative w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-base sm:text-lg px-8 py-6 sm:px-10 sm:py-7 rounded-2xl shadow-2xl border-0 min-h-[56px] sm:min-h-[64px]"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <Sparkles className="w-5 h-5" />
                          Start Growing Now
                          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                            →
                          </motion.span>
                        </span>
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto group font-semibold text-base sm:text-lg px-8 py-6 sm:px-10 sm:py-7 rounded-2xl border-2 border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30 backdrop-blur-sm transition-all min-h-[56px] sm:min-h-[64px] shadow-lg"
                      >
                        <Play className="mr-3 w-5 h-5 text-purple-600 dark:text-purple-400" />
                        <span className="text-gray-900 dark:text-white">How It Works</span>
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Stats Cards */}
                  <motion.div className="grid grid-cols-3 gap-4 pt-6">
                    {[
                      { value: "10K+", label: "Active Users", icon: Users, color: "from-blue-500 to-cyan-500" },
                      { value: "1M+", label: "Contacts Shared", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
                      { value: "500%", label: "Avg. Growth", icon: Zap, color: "from-orange-500 to-red-500" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all">
                          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                            <stat.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Image with 3D Effect */}
                <motion.div 
                  className="relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="relative w-full max-w-sm lg:max-w-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl opacity-60" />
                    <motion.img 
                      src="https://res.cloudinary.com/dmxik1gea/image/upload/w_1000/q_auto/f_auto/v1762084953/excited-lady_tektkt.png" 
                      alt="Professional woman excited about WhatsApp growth" 
                      className="relative z-10 w-full h-auto drop-shadow-2xl"
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full flex items-center justify-center min-h-[600px]"
              >
                <ContactForm onBack={handleFlip} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
};

export default Hero;
