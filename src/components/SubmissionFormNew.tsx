import { ChevronDown, Sparkles, Users, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

const SubmissionFormNew = () => {
  const [planType, setPlanType] = useState("free");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysCount, setTodaysCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [customFieldLabel, setCustomFieldLabel] = useState("");
  const [customFieldValue, setCustomFieldValue] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState("");
  const countdownRef = useRef<NodeJS.Timeout>();

  // Preload Lottie animation when component mounts
  useEffect(() => {
    const preloadLottie = async () => {
      try {
        const response = await fetch('https://lottie.host/b6ff1611-82ed-401c-9e35-dec5e7c34fc3/PXsxxuYKQx.lottie');
        await response.blob(); // This will cache the animation
      } catch (error) {
        console.error('Error preloading Lottie animation:', error);
      }
    };

    preloadLottie();
  }, []);

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
    const channel = supabase
      .channel('submissions_count')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'submissions' }, () => {
        fetchTodaysCount();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
      }, 80000);
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit-form" className="relative py-16 lg:py-24 overflow-hidden">
{/* Success Modal */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: 'spring', damping: 25 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/60 [backdrop-filter:none]"
          >
            <motion.div 
              className="bg-[#ffffff] dark:bg-[#1a1a1a] rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl border border-gray-200 dark:border-gray-700 [backdrop-filter:none] [background-blend-mode:normal] [background-color:rgb(255,255,255)] dark:[background-color:rgb(26,26,26)]"
              initial={{ scale: 2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: 'spring', damping: 25 }}
            >
              <div className="text-center">
                <div className="w-40 h-40 mx-auto -mt-10 -mb-6">
                  <DotLottieReact
                    src="https://lottie.host/b6ff1611-82ed-401c-9e35-dec5e7c34fc3/PXsxxuYKQx.lottie"
                    autoplay
                    loop={false}
                  />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Successfully Submitted!
                </h3>
                
                <p className="text-gray-700 dark:text-gray-200 mb-6">
                  Your contact information has been received and will be included in today's vCard file.
                </p>
                
                <div className="flex items-center justify-center space-x-2 bg-teal-50 dark:bg-teal-900/50 text-teal-700 dark:text-teal-200 px-4 py-3 rounded-lg mb-6 border border-teal-100 dark:border-teal-700/50">
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
                  className="mt-2 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                >
                  Got it, thanks!
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dmxik1gea/image/upload/v1762512088/green-abstract-patterns_bqt6g9.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.3
          }}
        />
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-teal-50/60 to-white/90 dark:from-gray-950/95 dark:via-teal-900/20 dark:to-gray-950/95" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-300/20 dark:bg-teal-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-green-300/20 dark:bg-green-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">
            Submit Your{" "}
            <span className="bg-gradient-to-r from-teal to-green-light bg-clip-text text-transparent">
              Contact
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Be part of today's vCard compilation and start growing your network exponentially
          </p>

          {/* Today's Count */}
          {!isLoadingCount && todaysCount !== null && (
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal to-green-light rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Users className="w-5 h-5 text-white" />
              <span className="text-white font-bold text-lg">
                {todaysCount} submissions today
              </span>
              <TrendingUp className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </motion.div>

        {/* Form Card */}
        <motion.div
          className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative p-8 lg:p-12">

            {/* Plan Type Selector */}
            <div className="relative mb-8 space-y-4">
              <Label className="text-lg font-bold text-gray-900 dark:text-white">
                Choose Your Use Case
              </Label>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { value: "free", title: "Personal", desc: "Name limited to 8 characters" },
                  { value: "premium", title: "Proffessional", desc: "Full name & all features" }
                ].map((plan) => (
                  <motion.button
                    key={plan.value}
                    type="button"
                    onClick={() => setPlanType(plan.value)}
                    className={`relative p-6 rounded-2xl border-2 transition-all text-left ${
                      planType === plan.value
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {planType === plan.value && (
                      <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-teal-600 dark:text-teal-400" />
                    )}
                    <div className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                      {plan.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.desc}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Form */}
            <form 
              onSubmit={handleSubmit} 
              className="space-y-6 relative"
            >
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
                  className="text-base h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl"
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
                  className="text-base h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 focus:border-teal focus:ring-teal/50 rounded-xl"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Include country code (e.g., +237 for Cameroon)
                </p>
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
                    className="w-full flex items-center justify-between h-12 hover:bg-teal-50 dark:hover:bg-teal-950/30 border-teal-200 dark:border-teal-800 rounded-xl"
                  >
                    <span className="font-semibold">Add Optional Information</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform duration-300 ${
                        showOptional ? 'rotate-180' : ''
                      }`}
                    />
                  </Button>
                </CollapsibleTrigger>

                <CollapsibleContent className="space-y-6 mt-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-base text-gray-900 dark:text-white">Company</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your company"
                        className="text-base h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base text-gray-900 dark:text-white">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="text-base h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-base text-gray-900 dark:text-white">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Your position"
                        className="text-base h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-base text-gray-900 dark:text-white">Website</Label>
                      <Input
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://"
                        className="text-base h-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base text-gray-900 dark:text-white">Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your full address"
                      rows={3}
                      className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-base text-gray-900 dark:text-white">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Additional information"
                      rows={3}
                      className="text-base bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-gray-300 dark:border-gray-700 rounded-xl"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Submit Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 bg-gradient-to-r from-teal to-green-light hover:from-teal-dark hover:to-teal text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
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
      </div>
    </section>
  );
};

export default SubmissionFormNew;
