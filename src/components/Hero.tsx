import { useState } from 'react';
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
const ContactForm = ({ onBack }: { onBack: () => void }) => {
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
      setJobTitle("");
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
    <div className="w-full max-w-md mx-auto bg-card rounded-2xl border border-border/50 shadow-xl flex flex-col" style={{ maxHeight: '85vh' }}>
      <div className="p-6 pb-4 border-b border-border/50">
        <div className="flex items-center mb-2">
          <button 
            onClick={onBack}
            className="mr-4 p-1 rounded-full hover:bg-accent/50 transition-colors"
            aria-label="Back to hero"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">Submit Your Entry</h2>
        </div>
        <p className="text-muted-foreground">Start growing your WhatsApp audience today</p>
      </div>
      
      <div className="flex-1 overflow-hidden flex flex-col">
        <form 
          id="contact-form"
          onSubmit={handleSubmit} 
          className="flex-1 overflow-y-auto px-6 py-4 space-y-4"
          style={{ scrollbarWidth: 'thin' }}
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
  
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-primary/5">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-secondary/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/5 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`${styles.flipContainer} ${isFlipped ? styles.flipped : ''}`}>
            {/* Front side - Hero Content */}
            <div className={styles.flipFront}>
              <div className="text-center">
                {/* Animated badge */}
                <AnimateOnScroll yOffset={20} delay={0.2}>
                  <div className="inline-flex items-center justify-center space-x-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-8">
                    <Zap className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-primary">TRENDING NOW</span>
                  </div>
                </AnimateOnScroll>
                
                {/* Main heading with gradient text */}
                <AnimateOnScroll yOffset={30} delay={0.3}>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-tight mb-6">
                    <span className="block bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                      Explode Your
                    </span>
                    <span className="relative inline-block group">
                      <span className="relative z-10 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                        Status Views
                        <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-500 group-hover:w-full"></span>
                      </span>
                    </span>
                  </h1>
                </AnimateOnScroll>
                
                {/* Subheading */}
                <AnimateOnScroll yOffset={20} delay={0.4}>
                  <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
                    The community-powered platform where contacts multiply and status views go exponential.
                    <span className="block text-primary font-medium mt-2">Join thousands of satisfied users today.</span>
                  </p>
                </AnimateOnScroll>
                
                {/* CTAs with icons */}
                <AnimateOnScroll yOffset={20} delay={0.5}>
                  <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mt-8">
                    <Button 
                      size="lg"
                      onClick={handleFlip}
                      className="relative overflow-hidden group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg md:text-xl px-8 py-7 rounded-full shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
                    >
                      <span className="relative z-10 flex items-center">
                        Boost My Status Now
                        <Rocket className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </Button>
                    
                    <Button 
                      variant="outline"
                      size="lg"
                      className="group font-bold text-lg px-8 py-7 rounded-full border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    >
                      <Play className="mr-2 w-5 h-5 text-primary group-hover:scale-125 transition-transform" />
                      Watch Demo
                    </Button>
                  </div>
                </AnimateOnScroll>
                
                {/* Trust indicators */}
                <AnimateOnScroll yOffset={20} delay={0.6}>
                  <div className="mt-8 text-sm text-muted-foreground flex flex-wrap items-center justify-center gap-4">
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      No credit card required
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-border" />
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      7-day free trial
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-border" />
                    <div className="flex items-center">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      Cancel anytime
                    </div>
                  </div>
                </AnimateOnScroll>
              </div>
            </div>
            
            {/* Back side - Contact Form */}
            <div className={styles.flipBack}>
              <ContactForm onBack={handleFlip} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
