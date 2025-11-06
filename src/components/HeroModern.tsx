import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Play, Sparkles, TrendingUp, Users, Zap, ArrowLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";

// Hero section with flip form animation
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

      toast.success("🎉 Entry submitted successfully! Your contact will be included in today's vCard file.");

      // Reset form
      setName("");
      setPhone("");
      setCountry("");
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
      toast.error("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>BoostWhats - Transform Your WhatsApp Status</title>
        <meta name="description" content="Join 1,000+ users growing their WhatsApp audience" />
      </Helmet>
      
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        {/* Animated Background with Cross Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle gradient overlays */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(0,168,132,0.1)_0%,_transparent_60%]"
            animate={{
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(25,210,100,0.08)_0%,_transparent_60%]"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 1
            }}
          />
          
          {/* Enhanced cross pattern with animation */}
          <div className="absolute inset-0 opacity-30 dark:opacity-20">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(0, 168, 132, 0.2) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(0, 168, 132, 0.2) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
              }}
            />
          </div>

          {/* Animated floating particles */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-teal/30 dark:bg-green-light/30"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1
              }}
              animate={{
                y: [0, Math.random() * 60 - 30],
                x: [0, Math.random() * 40 - 20],
                opacity: [
                  Math.random() * 0.3 + 0.1,
                  Math.random() * 0.5 + 0.3,
                  Math.random() * 0.3 + 0.1
                ]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>

        {/* Floating Gradient Orbs with WhatsApp Colors */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-[10%] w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-teal/20 to-green-light/20 rounded-full filter blur-3xl"
            animate={{ 
              y: [0, -40, 0], 
              x: [0, 30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 12, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-[15%] w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-blue-whatsapp/20 to-teal/20 rounded-full filter blur-3xl"
            animate={{ 
              y: [0, 40, 0], 
              x: [0, -30, 0],
              scale: [1, 1.15, 1]
            }}
            transition={{ 
              duration: 14, 
              repeat: Infinity, 
              ease: "easeInOut", 
              delay: 1 
            }}
          />
          <motion.div 
            className="absolute top-1/3 right-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-green-light/15 to-teal-dark/15 rounded-full filter blur-2xl"
            animate={{ 
              y: [0, -20, 0], 
              x: [0, 20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </div>

        {/* Content - Flip Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12" style={{ perspective: "2000px" }}>
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="hero-content"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
              >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div 
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal/10 backdrop-blur-md border border-teal/30 dark:border-teal/50 shadow-lg"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(0, 168, 132, 0.2)',
                    '0 0 40px rgba(37, 211, 102, 0.3)',
                    '0 0 20px rgba(0, 168, 132, 0.2)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-teal dark:text-green-light" />
                <span className="text-sm font-semibold text-teal dark:text-green-light">
                  1,000+ Growing Their Reach
                </span>
              </motion.div>

              {/* Main Heading */}
              <motion.div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
                  <span className="block mb-2 text-gray-900 dark:text-white">
                    Transform Your
                  </span>
                  <span className="text-teal dark:text-green-light">
                    WhatsApp Status
                  </span>
                  <span className="block text-gray-900 dark:text-white">
                    Into a Powerhouse
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.div className="space-y-4">
                <p className="text-lg lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-medium">
                  Join <span className="font-bold text-teal dark:text-green-light">1,000+ users</span> growing their audience by{' '}
                  <span className="font-bold text-teal-dark dark:text-green-light/90">hundreds of contacts</span> through our shared contact pool.
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
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                  size="lg" 
                  onClick={() => setShowForm(true)}
                  className="w-full sm:w-auto relative bg-teal hover:bg-teal-dark text-white font-bold text-base sm:text-lg px-8 py-6 sm:px-10 sm:py-7 rounded-2xl shadow-2xl border-0 transition-colors duration-300"
                >  
                    <span className="flex items-center gap-3">
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
                    className="w-full sm:w-auto group font-semibold text-base sm:text-lg px-8 py-6 sm:px-10 sm:py-7 rounded-2xl border-2 border-gray-300 dark:border-gray-700 hover:border-teal hover:bg-teal/5 dark:hover:bg-teal/10 transition-all shadow-lg"
                  >
                    <Play className="mr-3 w-5 h-5 text-teal dark:text-green-light" />
                    <span className="text-gray-900 dark:text-white group-hover:text-teal dark:group-hover:text-green-light transition-colors">How It Works</span>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Stats */}
              <motion.div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { value: "1K+", label: "Active Users", icon: Users },
                  { value: "2K+", label: "Contacts", icon: TrendingUp },
                  { value: "200%", label: "Growth", icon: Zap }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ y: -5 }}
                  >
                    <div className="inline-flex p-2 rounded-lg bg-teal dark:bg-teal-dark mb-2">
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="text-2xl font-black text-gray-900 dark:text-white">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Image - Improved Responsiveness */}
            <motion.div 
              className="relative w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-8 lg:mt-0 px-4 sm:px-6 lg:px-0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative w-full max-w-md xl:max-w-lg 2xl:max-w-xl">
                {/* Subtle gradient background */}
                <div className="absolute -inset-8 md:-inset-12 bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 dark:from-teal-500/5 dark:to-emerald-500/5 rounded-full blur-3xl -z-10" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-teal-400/20 dark:bg-teal-500/10 rounded-full blur-2xl opacity-70 animate-pulse" />
                
                {/* Main image with responsive sizing */}
                <motion.div 
                  className="relative z-10 w-full h-auto"
                  animate={{ 
                    y: [0, -15, 0],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <img 
                    src="img/exited-lady-vectored.png" 
                    alt="Professional woman excited about WhatsApp growth" 
                    className="w-full h-auto max-h-[500px] object-contain drop-shadow-2xl"
                    loading="eager"
                    sizes="(max-width: 768px) 90vw, (max-width: 1280px) 50vw, 40vw"
                    srcSet="
                      img/exited-lady-vectored.png 400w,
                      img/exited-lady-vectored@2x.png 800w,
                      img/exited-lady-vectored@3x.png 1200w
                    "
                  />
                </motion.div>
                
                {/* Floating elements for visual interest */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-teal-400/20 blur-xl animate-float" />
                <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-emerald-400/20 blur-xl animate-float animation-delay-2000" />
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
                transition={{ duration: 0.6 }}
                style={{ transformStyle: "preserve-3d" }}
                className="max-w-3xl mx-auto"
              >
                {/* Form Card */}
                <div className="relative bg-card dark:bg-card-dark backdrop-blur-xl rounded-3xl border border-border dark:border-gray-700 shadow-2xl p-6 sm:p-8 lg:p-12">
                  {/* Gradient Accent */}
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/5 to-blue-whatsapp/5 rounded-3xl pointer-events-none" />

                  {/* Back Button */}
                  <Button
                    variant="ghost"
                    onClick={() => setShowForm(false)}
                    className="mb-6 relative z-10 text-teal hover:bg-teal/10 dark:text-green-light dark:hover:bg-teal/20"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Hero
                  </Button>

                  {/* Form Header */}
                  <div className="relative text-center mb-8">
                    <motion.div
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/20 dark:border-teal/30 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="w-4 h-4 text-teal dark:text-green-light" />
                      <span className="text-sm font-semibold text-teal dark:text-green-light">Join Today</span>
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3">
                      Submit Your{" "}
                      <span className="text-teal dark:text-green-light">
                        Contact
                      </span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Fill in your details to join our growing community
                    </p>
                  </div>

                  {/* Plan Type Selector */}
                  <div className="relative mb-6 space-y-3">
                    <Label className="text-base font-semibold text-gray-900 dark:text-white">
                      Choose Your Plan
                    </Label>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { value: "free", title: "Free Plan", desc: "Name limited to 8 characters" },
                        { value: "premium", title: "Premium Plan", desc: "Full name & all features" }
                      ].map((plan) => (
                        <button
                          key={plan.value}
                          type="button"
                          onClick={() => setPlanType(plan.value)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            planType === plan.value
                              ? 'border-teal bg-teal/5 dark:bg-teal/10'
                              : 'border-gray-200 dark:border-gray-700 hover:border-teal/50 dark:hover:border-teal/50'
                          }`}
                        >
                          <div className="font-bold text-gray-900 dark:text-white">{plan.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{plan.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6 relative">
                    {/* Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-base font-semibold text-gray-900 dark:text-white">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        maxLength={planType === "free" ? 8 : undefined}
                        placeholder={planType === "free" ? "Max 8 chars" : "Your full name"}
                        className="h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl"
                      />
                      {planType === "free" && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {name.length}/8 characters used
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base font-semibold text-gray-900 dark:text-white">
                        WhatsApp Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        placeholder="+237 6xx xx xx xx"
                        className="h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl"
                      />
                    </div>

                    {/* Country */}
                    <div className="space-y-2">
                      <Label htmlFor="country" className="text-base font-semibold text-gray-900 dark:text-white">
                        Country <span className="text-red-500">*</span>
                      </Label>
                      <CountrySelect value={country} onChange={setCountry} required />
                    </div>

                    {/* Optional Fields */}
                    <Collapsible open={showOptional} onOpenChange={setShowOptional}>
                      <CollapsibleTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full flex items-center justify-between h-12 hover:bg-teal/5 dark:hover:bg-teal/10 border-teal/20 dark:border-teal/30 rounded-xl"
                        >
                          <span className="font-semibold">Add Optional Information</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              showOptional ? 'rotate-180' : ''
                            }`}
                          />
                        </Button>
                      </CollapsibleTrigger>

                      <CollapsibleContent className="space-y-4 mt-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Company</Label>
                            <Input 
                              value={company} 
                              onChange={(e) => setCompany(e.target.value)} 
                              className="h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input 
                              type="email" 
                              value={email} 
                              onChange={(e) => setEmail(e.target.value)} 
                              className="h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Job Title</Label>
                            <Input 
                              value={jobTitle} 
                              onChange={(e) => setJobTitle(e.target.value)} 
                              className="h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl" 
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Website</Label>
                            <Input 
                              value={website} 
                              onChange={(e) => setWebsite(e.target.value)} 
                              className="h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl" 
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Address</Label>
                          <Textarea 
                            value={address} 
                            onChange={(e) => setAddress(e.target.value)} 
                            rows={3} 
                            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl" 
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea 
                            value={notes} 
                            onChange={(e) => setNotes(e.target.value)} 
                            rows={3} 
                            className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl" 
                          />
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Submit Button */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-14 bg-teal hover:bg-teal-dark text-white font-bold text-lg rounded-xl shadow-xl transition-colors duration-300"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Submit My Contact
                          </span>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

export default HeroModern;
