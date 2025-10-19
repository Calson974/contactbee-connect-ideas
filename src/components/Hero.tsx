import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Play, Zap, Check, Rocket, ArrowLeft, ChevronDown } from "lucide-react";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import styles from './Hero.module.css';

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
          <h2 className="text-2xl font-bold">Submit Your Entry</h2>
        </div>
        <p className="text-muted-foreground">Start growing your WhatsApp audience today</p>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col noScrollbar">
        <form 
          id="contact-form"
          onSubmit={handleSubmit} 
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4 noScrollbar"
        >
        <div className="space-y-3"> 
          <Label className="text-base font-semibold">Package Type</Label>
          <RadioGroup value={planType} onValueChange={setPlanType}>
            <div className="flex items-center space-x-3 p-4 border-2 border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
              <RadioGroupItem value="free" id="free" />
              <Label htmlFor="free" className="flex-1 cursor-pointer">
                <span className="font-semibold">Free</span>
                <span className="block text-sm text-muted-foreground">
                  For personal use - Maximum 8 characters
                </span>
              </Label>
            </div>
            <div className="flex items-center space-x-3 p-4 border-2 border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
              <RadioGroupItem value="premium" id="premium" />
              <Label htmlFor="premium" className="flex-1 cursor-pointer">
                <span className="font-semibold">Premium ($1)</span>
                <span className="block text-sm text-muted-foreground">
                  For businesses - Unlimited characters
                </span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-semibold">
            Name {planType === "free" && <span className="text-sm text-muted-foreground">(Max 8 characters)</span>}
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={planType === "free" ? 8 : undefined}
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
            placeholder="+1 234 567 8900"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="text-base"
          />
          <p className="text-sm text-muted-foreground">
            Include country code (e.g., +1 for USA)
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
        <div className="p-4 border-t border-border/50 bg-card/80 backdrop-blur-sm mt-auto">
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
  
  const handleFlip = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent double-tap zoom on mobile
    if (e) {
      e.preventDefault();
      e.stopPropagation();
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
  };
  return (
    <React.Fragment>
      <section id="home" className="relative h-[calc(100vh-120px)] sm:h-[calc(100vh-160px)] lg:h-[calc(100vh-200px)] w-full flex items-center justify-center overflow-hidden bg-[#06e777]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto w-full">
            <div
              className={`${styles.flipContainer} ${isFlipped ? styles.flipped : ''}`}
              style={{
                minHeight: isFlipped ? '100vh' : 'auto',
                touchAction: 'manipulation',
                position: 'relative',
                zIndex: isFlipped ? 40 : 'auto',
              }}
            >
              {/* Front side - Hero Content */}
              <div className={styles.flipFront}>
                {/* Main content area with sophisticated layout */}
                <div className="relative">
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl animate-pulse animation-delay-2000" />
                  </div>

                  {/* Hero Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center h-full min-h-[50vh] sm:min-h-[60vh]">
                    {/* Content Section - Left Side */}
                    <div className="lg:col-span-6 xl:col-span-5 text-center lg:text-left order-1 text-white space-y-4 sm:space-y-6 md:space-y-8">
                      {/* Animated badge */}
                      <AnimateOnScroll yOffset={20} delay={0.1}>
                        <div className="inline-flex items-center justify-center lg:justify-start space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2 md:py-3 mb-4 sm:mb-6 md:mb-8 lg:mb-10 shadow-lg hover:bg-white/15 transition-all duration-300">
                          <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white animate-pulse" />
                          <span className="text-xs sm:text-xs md:text-sm font-semibold text-white tracking-wide uppercase">WHATSAPP GROWTH STRATEGY</span>
                        </div>
                      </AnimateOnScroll>

                      {/* Main heading with enhanced typography */}
                      <AnimateOnScroll yOffset={30} delay={0.2}>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight mb-4 sm:mb-6 md:mb-8 text-white">
                          <span className="block text-white mb-2 drop-shadow-lg">
                            Explode Your
                          </span>
                          <span className="relative inline-block group">
                            <span className="relative z-10 text-white drop-shadow-lg">
                              Status Views
                            </span>
                            <span className="absolute left-0 -bottom-2 w-0 h-1 bg-gradient-to-r from-white to-white/60 transition-all duration-700 group-hover:w-full rounded-full shadow-lg"></span>
                          </span>
                        </h1>
                      </AnimateOnScroll>

                      {/* Enhanced subheading */}
                      <AnimateOnScroll yOffset={20} delay={0.3}>
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 max-w-3xl mx-auto lg:mx-0 mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-relaxed font-light">
                          The <span className="text-white font-semibold">community-powered platform</span> where contacts multiply and status views go exponential.
                          <span className="block text-white font-medium mt-3 sm:mt-4 text-sm sm:text-base md:text-lg">Join thousands of satisfied users today.</span>
                        </p>
                      </AnimateOnScroll>

                      {/* Enhanced CTA section */}
                      <AnimateOnScroll yOffset={20} delay={0.4}>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-center justify-center lg:justify-start mb-6 sm:mb-8 md:mb-10 lg:mb-12">
                          <Button
                            size="lg"
                            onClick={handleFlip}
                            onTouchStart={(e) => e.currentTarget.classList.add('active:scale-95')}
                            onTouchEnd={(e) => e.currentTarget.classList.remove('active:scale-95')}
                            className="relative overflow-hidden group bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white text-[#1a5632] font-bold text-sm sm:text-base md:text-lg lg:text-xl px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-6 md:py-7 lg:py-8 rounded-full shadow-2xl hover:shadow-white/30 hover:scale-105 active:scale-95 transition-all duration-300 touch-manipulation w-full sm:w-auto min-w-[200px] sm:min-w-[240px] md:min-w-[280px]"
                            style={{
                              WebkitTapHighlightColor: 'transparent',
                              WebkitTouchCallout: 'none',
                              WebkitUserSelect: 'none',
                              KhtmlUserSelect: 'none',
                              MozUserSelect: 'none',
                              msUserSelect: 'none',
                              userSelect: 'none',
                            }}
                          >
                            <span className="relative z-10 flex items-center justify-center">
                              Boost My Status Now
                              <Rocket className="ml-2 sm:ml-2 md:ml-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                          </Button>

                          <Button
                            variant="outline"
                            size="lg"
                            className="group font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-6 md:py-7 lg:py-8 rounded-full border-2 border-white/30 hover:border-white/50 hover:bg-white/10 text-white hover:text-white transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
                          >
                            <Play className="mr-2 sm:mr-2 md:mr-3 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:scale-125 transition-transform" />
                            How it works
                          </Button>
                        </div>
                      </AnimateOnScroll>

                      {/* Trust indicators with enhanced styling */}
                      <AnimateOnScroll yOffset={20} delay={0.5}>
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 sm:gap-x-6 gap-y-2 sm:gap-y-3 text-xs sm:text-sm text-gray-300">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="font-medium">No credit card required</span>
                          </div>
                          <div className="hidden sm:block w-px h-4 sm:h-6 bg-white/20" />
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse animation-delay-500"></div>
                            <span className="font-medium">7-day free trial</span>
                          </div>
                          <div className="hidden sm:block w-px h-4 sm:h-6 bg-white/20" />
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse animation-delay-1000"></div>
                            <span className="font-medium">Cancel anytime</span>
                          </div>
                        </div>
                      </AnimateOnScroll>
                    </div>

                    {/* Image Section - Right Side */}
                    <div className="lg:col-span-6 xl:col-span-7 relative order-2 h-full min-h-[250px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
                      <AnimateOnScroll yOffset={40} delay={0.2}>
                        <div className="relative group w-full h-full flex items-center justify-center">
                          {/* Image that scales with viewport */}
                          <div className="relative w-full h-full flex items-center justify-center max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
                            <img
                              src="/img/1760164223448 (1).png"
                              alt="WhatsApp Growth Strategy Platform"
                              className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500 max-h-[250px] sm:max-h-[350px] md:max-h-[400px] lg:max-h-[500px]"
                            />

                            {/* Subtle overlay for better text readability */}
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-background/5 to-background/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Floating accent elements */}
                            <div className="absolute -top-3 -right-3 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-primary/20 rounded-full animate-pulse shadow-2xl" />
                            <div className="absolute -bottom-3 -left-3 w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-accent/20 rounded-full animate-pulse animation-delay-1000 shadow-xl" />
                          </div>
                        </div>
                      </AnimateOnScroll>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back side - Contact Form */}
              <div className={styles.flipBack}>
                <div className="w-full h-full pt-24 sm:pt-32">
                  <ContactForm onBack={handleFlip} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curved bottom extension - separate from hero section */}
      <div className="relative w-full h-[90px] bg-[#06e777] hero-curve-extension z-0"></div>
    </React.Fragment>
  );
};

export default Hero;
