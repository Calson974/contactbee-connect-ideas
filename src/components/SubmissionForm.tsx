import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Download, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";
import { format, startOfDay } from "date-fns";

const SubmissionForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysCount, setTodaysCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState("");
  const countdownRef = useRef<NodeJS.Timeout>();

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

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, []);

  // Fetch today's submission count
  useEffect(() => {
    const fetchTodaysCount = async () => {
      try {
        setIsLoadingCount(true);
        const today = format(new Date(), 'yyyy-MM-dd');
        
        const { count, error } = await supabase
          .from('submissions')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', `${today}T00:00:00`)
          .lt('created_at', `${today}T23:59:59`);

        if (error) throw error;
        
        setTodaysCount(count);
      } catch (error) {
        console.error('Error fetching today\'s count:', error);
      } finally {
        setIsLoadingCount(false);
      }
    };

    fetchTodaysCount();

    // Set up realtime subscription
    const subscription = supabase
      .channel('submissions')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'submissions' 
        }, 
        () => {
          fetchTodaysCount();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
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
      const contactName = name.slice(0, 8);
      const nameWithBW = contactName.endsWith(' BW') ? contactName : `${contactName} BW`;
      
      const { error } = await supabase.from("submissions").insert({
        plan_type: "free",
        name: nameWithBW,
        phone,
        country,
        company: company || null,
        email: email || null,
        job_title: jobTitle || null,
        website: website || null,
        custom_field_label: customFieldLabel || null,
        custom_field: customFieldValue || null,
        address: address || null,
        notes: notes || null,
      });

      if (error) throw error;

      // Set submission success state
      setIsSubmitted(true);
      
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
      
      // Auto-hide success message after 8 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 8000);
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit-form" className="py-16 md:py-24 scroll-mt-20 relative">
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <motion.div 
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-800"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            >
              <div className="text-center">
                <motion.div 
                  className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: [0, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 0.8,
                    ease: "easeInOut",
                    times: [0, 0.2, 0.5, 0.8, 1],
                  }}
                >
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </motion.div>
                
                <h3 id="success-title" className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Successfully Submitted!
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Your contact information has been received and will be included in today's vCard file.
                </p>
                
                <div className="flex items-center justify-center space-x-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-4 py-3 rounded-lg mb-6">
                  <Clock className="w-5 h-5" />
                  <span>Return at 9 PM to download the contact file</span>
                  {countdown && (
                    <span className="font-semibold ml-1">(in {countdown})</span>
                  )}
                </div>
                
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-2"
                >
                  Got it, thanks!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 border-2 border-border bg-card/80 backdrop-blur-sm relative overflow-hidden">
          {/* Chat icon positioned in the top-right corner */}
          <div className="absolute top-4 right-4 w-16 h-16 z-10">
            <img 
              src="/img/svg/oc-chatting.svg" 
              alt="Chatting illustration" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Submit Your{" "}
              <span className="text-primary">
                Entry
              </span>
            </h2>
            <p className="text-muted-foreground mb-3">
              Start growing your WhatsApp audience today
            </p>
            {!isLoadingCount && todaysCount !== null && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted/50 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                {todaysCount.toLocaleString()} contacts added today
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

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
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="text-base"
              />
            </div>

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
                    placeholder="your.email@example.com"
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
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Custom Field</Label>
                  <div className="space-y-2">
                    <Input
                      id="customFieldLabel"
                      placeholder="Field name (e.g., Birthday, Favorite Color)"
                      value={customFieldLabel}
                      onChange={(e) => setCustomFieldLabel(e.target.value)}
                      className="text-base"
                    />
                    <Input
                      id="customFieldValue"
                      placeholder="Field value"
                      value={customFieldValue}
                      onChange={(e) => setCustomFieldValue(e.target.value)}
                      className="text-base"
                    />
                  </div>
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
                    placeholder="Additional notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="text-base"
                    rows={3}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Entry"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              By submitting, you agree to our terms and conditions. You'll receive a password to download the daily contact file.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default SubmissionForm;
