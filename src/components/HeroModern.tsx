import React, { useState } from 'react';
import { Button } from './ui/button';
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

const ladyImage = '/img/exited-lady-vectored.png';

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

  const handleSubmit = async () => {
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
      
      <section className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(0,168,132,0.08)_0%,_transparent_50%)]"
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(25,210,100,0.06)_0%,_transparent_50%)]"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          <div className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0, 168, 132, 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(0, 168, 132, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            }}
          />

          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-teal/10 rounded-full filter blur-3xl"
            animate={{ 
              y: [0, -30, 0], 
              x: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-72 h-72 bg-green-light/10 rounded-full filter blur-3xl"
            animate={{ 
              y: [0, 30, 0], 
              x: [0, -20, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
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
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24"
              >
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
                  
                  {/* Left Content */}
                  <div className="space-y-8 lg:pr-8">
                    
                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="inline-flex"
                    >
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/20 dark:border-teal/30">
                        <Sparkles className="w-4 h-4 text-teal dark:text-green-light" />
                        <span className="text-sm font-medium text-teal dark:text-green-light">
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
                        <span className="block text-gray-900 dark:text-white">
                          Transform Your
                        </span>
                        <span className="block text-teal dark:text-green-light mt-1">
                          WhatsApp Status
                        </span>
                        <span className="block text-gray-900 dark:text-white mt-1">
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
                      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                        Join <strong className="text-teal dark:text-green-light">1,000+ users</strong> growing their audience by{' '}
                        <strong className="text-teal dark:text-green-light">hundreds of contacts</strong> through our shared contact pool.
                      </p>
                      
                      
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="flex flex-col sm:flex-row gap-4 pt-2"
                    >
                      <Button 
                        size="lg" 
                        onClick={() => setShowForm(true)}
                        className="bg-teal hover:bg-teal-dark text-white font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      > 
                        <Sparkles className="w-5 h-5 mr-2" />
                        Let's Grow
                      </Button>

                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="font-semibold text-base px-8 py-6 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
                      >
                        <Play className="mr-2 w-5 h-5" />
                        How It Works
                      </Button>
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
                      
                      <div className="absolute -inset-8 bg-gradient-to-br from-teal/5 to-green-light/5 rounded-full blur-3xl -z-10" />
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
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20"
              >
                <div className="max-w-2xl mx-auto">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl p-6 sm:p-8 lg:p-10">
                    
                    {/* Back Button */}
                    <Button
                      variant="ghost"
                      onClick={() => setShowForm(false)}
                      className="mb-6 text-teal hover:bg-teal/5 dark:text-green-light dark:hover:bg-teal/10 -ml-2"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Hero
                    </Button>

                    {/* Form Header */}
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/20 dark:border-teal/30 mb-4">
                        <Sparkles className="w-4 h-4 text-teal dark:text-green-light" />
                        <span className="text-sm font-medium text-teal dark:text-green-light">Join Today</span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        Submit Your <span className="text-teal dark:text-green-light">Contact</span>
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300">
                        Fill in your details to be compiled for download by yourself and others
                      </p>
                    </div>

                    {/* Plan Type Selector */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-gray-900 dark:text-white mb-3 block">
                        Choose Your use case
                      </Label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { value: "free", title: "Personal Use", desc: "Name limited to 8 characters" },
                          { value: "proffessional", title: "Proffessional Use", desc: "Full name & all features" }
                        ].map((plan) => (
                          <button
                            key={plan.value}
                            type="button"
                            onClick={() => setPlanType(plan.value)}
                            className={`p-4 rounded-xl border-2 transition-all text-left ${
                              planType === plan.value
                                ? 'border-teal bg-teal/5 dark:bg-teal/10'
                                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                            }`}
                          >
                            <div className="font-semibold text-gray-900 dark:text-white text-sm">{plan.title}</div>
                            <div className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{plan.desc}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">
                      
                      <div>
                        <Label htmlFor="name" className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                          Full Name <span className="text-red-500">*</span>
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
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
                            {name.length}/8 characters used
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
                          WhatsApp Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          placeholder="+237 6xx xx xx xx"
                          className="h-11 rounded-lg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="country" className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
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

                      {/* Submit Button */}
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full h-12 bg-teal hover:bg-teal-dark text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5" />
                            Submit My Contact
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>
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