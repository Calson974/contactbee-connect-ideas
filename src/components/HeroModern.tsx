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
      
      <section className="relative w-full min-h-screen overflow-hidden z-10 bg-background">
        {/* Branded background image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Readability overlay (keeps background visible, but ensures text contrast) */}
        <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/55 to-background/30" />
        
        {/* Subtle background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_hsl(var(--primary)/0.08)_0%,_transparent_50%)]"
            animate={{ opacity: [0.6, 0.8, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_hsl(var(--accent)/0.06)_0%,_transparent_50%)]"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          
          <div className="absolute inset-0 opacity-20 dark:opacity-10"
            style={{
              backgroundImage: `linear-gradient(to right, hsl(var(--primary) / 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, hsl(var(--primary) / 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
            }}
          />

          <motion.div 
            className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"
            animate={{ 
              y: [0, -30, 0], 
              x: [0, 20, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"
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
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24 pb-32 lg:pb-48"
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
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30">
                        <Sparkles className="w-4 h-4 text-primary" />
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
                        <span className="block text-foreground">
                          Transform Your
                        </span>
                        <span className="block text-primary mt-1">
                          WhatsApp Status
                        </span>
                        <span className="block text-foreground mt-1">
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
                        className="bg-primary hover:bg-secondary text-primary-foreground font-semibold text-base px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
                      > 
                        <Sparkles className="w-5 h-5 mr-2" />
                        Let's Grow
                      </Button>

                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="font-semibold text-base px-8 py-6 rounded-xl border-2 hover:bg-muted transition-all"
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
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20 pb-32 lg:pb-48"
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
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30 mb-4">
                        <Sparkles className="w-4 h-4 text-primary" />
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
                          { value: "proffessional", title: "Proffessional Use", desc: "Full name & all features" }
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
                        <Label htmlFor="phone" className="text-sm font-medium text-foreground mb-2 block">
                          WhatsApp Number <span className="text-destructive">*</span>
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
                        <Label htmlFor="country" className="text-sm font-medium text-foreground mb-2 block">
                          Country <span className="text-destructive">*</span>
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
                        className="w-full h-12 bg-primary hover:bg-secondary text-primary-foreground font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all mt-6"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
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
