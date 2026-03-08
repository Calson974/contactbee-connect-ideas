import { ChevronDown, Zap, Users, TrendingUp, Clock, CheckCircle, X } from "lucide-react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
const COUNTRY_DIAL_CODES: Record<string, string> = {
  'Afghanistan': '+93', 'Albania': '+355', 'Algeria': '+213', 'American Samoa': '+1-684',
  'Andorra': '+376', 'Angola': '+244', 'Anguilla': '+1-264', 'Antigua and Barbuda': '+1-268',
  'Argentina': '+54', 'Armenia': '+374', 'Aruba': '+297', 'Australia': '+61',
  'Austria': '+43', 'Azerbaijan': '+994', 'Bahamas': '+1-242', 'Bahrain': '+973',
  'Bangladesh': '+880', 'Barbados': '+1-246', 'Belarus': '+375', 'Belgium': '+32',
  'Belize': '+501', 'Benin': '+229', 'Bermuda': '+1-441', 'Bhutan': '+975',
  'Bolivia': '+591', 'Bosnia and Herzegovina': '+387', 'Botswana': '+267',
  'Brazil': '+55', 'Brunei Darussalam': '+673', 'Bulgaria': '+359',
  'Burkina Faso': '+226', 'Burundi': '+257', 'Cabo Verde': '+238', 'Cambodia': '+855',
  'Cameroon': '+237', 'Canada': '+1', 'Central African Republic': '+236', 'Chad': '+235',
  'Chile': '+56', 'China': '+86', 'Colombia': '+57', 'Comoros': '+269',
  'Congo': '+242', 'Congo, Democratic Republic of the': '+243', 'Cook Islands': '+682',
  'Costa Rica': '+506', "Côte d'Ivoire": '+225', 'Croatia': '+385', 'Cuba': '+53',
  'Curaçao': '+599', 'Cyprus': '+357', 'Czechia': '+420', 'Czech Republic': '+420',
  'Denmark': '+45', 'Djibouti': '+253', 'Dominica': '+1-767', 'Dominican Republic': '+1-809',
  'Ecuador': '+593', 'Egypt': '+20', 'El Salvador': '+503', 'Equatorial Guinea': '+240',
  'Eritrea': '+291', 'Estonia': '+372', 'Eswatini': '+268', 'Ethiopia': '+251',
  'Fiji': '+679', 'Finland': '+358', 'France': '+33', 'Gabon': '+241',
  'Gambia': '+220', 'Georgia': '+995', 'Germany': '+49', 'Ghana': '+233',
  'Gibraltar': '+350', 'Greece': '+30', 'Greenland': '+299', 'Grenada': '+1-473',
  'Guatemala': '+502', 'Guinea': '+224', 'Guinea-Bissau': '+245', 'Guyana': '+592',
  'Haiti': '+509', 'Holy See': '+379', 'Honduras': '+504', 'Hong Kong': '+852',
  'Hungary': '+36', 'Iceland': '+354', 'India': '+91', 'Indonesia': '+62',
  'Iran': '+98', 'Iran (Islamic Republic of)': '+98', 'Iraq': '+964', 'Ireland': '+353',
  'Israel': '+972', 'Italy': '+39', 'Jamaica': '+1-876', 'Japan': '+81',
  'Jordan': '+962', 'Kazakhstan': '+7', 'Kenya': '+254', 'Kiribati': '+686',
  'Korea, North': '+850', "Korea (Democratic People's Republic of)": '+850',
  'Korea, South': '+82', 'Korea, Republic of': '+82', 'Kosovo': '+383',
  'Kuwait': '+965', 'Kyrgyzstan': '+996', 'Laos': '+856', "Lao People's Democratic Republic": '+856',
  'Latvia': '+371', 'Lebanon': '+961', 'Lesotho': '+266', 'Liberia': '+231',
  'Libya': '+218', 'Liechtenstein': '+423', 'Lithuania': '+370', 'Luxembourg': '+352',
  'Macao': '+853', 'Madagascar': '+261', 'Malawi': '+265', 'Malaysia': '+60',
  'Maldives': '+960', 'Mali': '+223', 'Malta': '+356', 'Marshall Islands': '+692',
  'Mauritania': '+222', 'Mauritius': '+230', 'Mexico': '+52',
  'Micronesia': '+691', 'Micronesia (Federated States of)': '+691',
  'Moldova': '+373', 'Moldova, Republic of': '+373', 'Monaco': '+377',
  'Mongolia': '+976', 'Montenegro': '+382', 'Morocco': '+212', 'Mozambique': '+258',
  'Myanmar': '+95', 'Namibia': '+264', 'Nauru': '+674', 'Nepal': '+977',
  'Netherlands': '+31', 'New Zealand': '+64', 'Nicaragua': '+505', 'Niger': '+227',
  'Nigeria': '+234', 'North Macedonia': '+389', 'Norway': '+47', 'Oman': '+968',
  'Pakistan': '+92', 'Palau': '+680', 'Palestine': '+970', 'Palestine, State of': '+970',
  'Panama': '+507', 'Papua New Guinea': '+675', 'Paraguay': '+595', 'Peru': '+51',
  'Philippines': '+63', 'Poland': '+48', 'Portugal': '+351', 'Puerto Rico': '+1-787',
  'Qatar': '+974', 'Romania': '+40', 'Russia': '+7', 'Russian Federation': '+7',
  'Rwanda': '+250', 'Saint Kitts and Nevis': '+1-869', 'Saint Lucia': '+1-758',
  'Saint Vincent and the Grenadines': '+1-784', 'Samoa': '+685', 'San Marino': '+378',
  'Sao Tome and Principe': '+239', 'Saudi Arabia': '+966', 'Senegal': '+221',
  'Serbia': '+381', 'Seychelles': '+248', 'Sierra Leone': '+232', 'Singapore': '+65',
  'Slovakia': '+421', 'Slovenia': '+386', 'Solomon Islands': '+677', 'Somalia': '+252',
  'South Africa': '+27', 'South Sudan': '+211', 'Spain': '+34', 'Sri Lanka': '+94',
  'Sudan': '+249', 'Suriname': '+597', 'Sweden': '+46', 'Switzerland': '+41',
  'Syria': '+963', 'Syrian Arab Republic': '+963', 'Taiwan': '+886',
  'Taiwan, Province of China': '+886', 'Tajikistan': '+992',
  'Tanzania': '+255', 'Tanzania, United Republic of': '+255', 'Thailand': '+66',
  'Timor-Leste': '+670', 'Togo': '+228', 'Tonga': '+676', 'Trinidad and Tobago': '+1-868',
  'Tunisia': '+216', 'Turkey': '+90', 'Türkiye': '+90', 'Turkmenistan': '+993',
  'Tuvalu': '+688', 'Uganda': '+256', 'Ukraine': '+380', 'United Arab Emirates': '+971',
  'United Kingdom': '+44', 'United States': '+1', 'United States of America': '+1',
  'Uruguay': '+598', 'Uzbekistan': '+998', 'Vanuatu': '+678',
  'Vatican City': '+379', 'Venezuela': '+58', 'Venezuela (Bolivarian Republic of)': '+58',
  'Vietnam': '+84', 'Viet Nam': '+84', 'Yemen': '+967', 'Zambia': '+260', 'Zimbabwe': '+263'
};

const SubmissionFormNew = () => {
  const [planType, setPlanType] = useState("free");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysCount, setTodaysCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(true);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);

  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [customFieldLabel, setCustomFieldLabel] = useState("");
  const [customFieldValue, setCustomFieldValue] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDoneCard, setShowDoneCard] = useState(false);
  const [countdown, setCountdown] = useState("");
  const countdownRef = useRef<NodeJS.Timeout>();
  const scrollPositionRef = useRef<number>(0);

  // Load terms acceptance from localStorage on mount
  useEffect(() => {
    const savedTermsAcceptance = localStorage.getItem('termsAccepted');
    if (savedTermsAcceptance === 'true') {
      setHasAcceptedTerms(true);
    }
  }, []);

  // Save terms acceptance to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('termsAccepted', hasAcceptedTerms.toString());
  }, [hasAcceptedTerms]);

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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showDoneCard) {
      // Store current scroll position immediately and protect it
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      scrollPositionRef.current = scrollY; // Store in React ref
      
      // Store in multiple places immediately
      const scrollPosition = scrollY.toString();
      document.body.setAttribute('data-scroll-y', scrollPosition);
      document.documentElement.setAttribute('data-scroll-y', scrollPosition);
      sessionStorage.setItem('modal-scroll-position', scrollPosition);
      localStorage.setItem('modal-scroll-position', scrollPosition);
      
      // Lock both html and body
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.scrollBehavior = 'auto';
      
      // Protect against any interference by re-storing the position
      const protectPosition = setInterval(() => {
        document.body.setAttribute('data-scroll-y', scrollPosition);
        document.documentElement.setAttribute('data-scroll-y', scrollPosition);
        sessionStorage.setItem('modal-scroll-position', scrollPosition);
        localStorage.setItem('modal-scroll-position', scrollPosition);
      }, 100);
      
      return () => {
        clearInterval(protectPosition);
      };
    } else {
      // Get scroll position from React ref first (most reliable)
      let storedScrollY = scrollPositionRef.current.toString();
      
      // Fallback to other storage methods
      if (storedScrollY === '0') {
        storedScrollY = document.body.getAttribute('data-scroll-y') || 
                        document.documentElement.getAttribute('data-scroll-y') || 
                        sessionStorage.getItem('modal-scroll-position') || 
                        localStorage.getItem('modal-scroll-position') || '0';
      }
      
      // Restore both html and body
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.scrollBehavior = '';
      
      // Clean up attributes
      document.body.removeAttribute('data-scroll-y');
      document.documentElement.removeAttribute('data-scroll-y');
      sessionStorage.removeItem('modal-scroll-position');
      localStorage.removeItem('modal-scroll-position');
      
      // Use the stored scroll position
      const scrollPosition = parseInt(storedScrollY);
      
      // Force scroll restoration with multiple methods
      const restoreScroll = () => {
        window.scrollTo(0, scrollPosition);
        document.documentElement.scrollTop = scrollPosition;
        document.body.scrollTop = scrollPosition;
      };
      
      // Apply immediately and multiple times to override any interference
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
      if (e.key === 'Escape') {
        setShowDoneCard(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [showDoneCard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user has accepted terms
    if (!hasAcceptedTerms) {
      toast.error("Please accept the Terms of Service to continue.");
      setIsSubmitting(false);
      return;
    }
    
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

      // Show the done card
      setShowDoneCard(true);
      
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
    } catch (error) {
      console.error("Error submitting entry:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Done Card Component
  const DoneCard = () => {
    if (typeof document === "undefined") return null;

    return createPortal(
      <div
        className="fixed inset-0 z-[1000] pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-title"
        aria-describedby="success-description"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70 backdrop-blur-md"
          onMouseDown={() => setShowDoneCard(false)}
        />

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

            <button
              type="button"
              aria-label="Close"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowDoneCard(false);
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-gray-700 shadow-sm ring-1 ring-black/10 backdrop-blur hover:bg-white dark:bg-gray-900/60 dark:text-gray-200 dark:ring-white/10 z-10"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative px-8 pb-8 pt-7">
              <div className="mx-auto -mt-8 mb-2 w-40 h-40">
                <DotLottieReact
                  src="https://lottie.host/b6ff1611-82ed-401c-9e35-dec5e7c34fc3/PXsxxuYKQx.lottie"
                  autoplay
                  loop={false}
                />
              </div>

              <div className="text-center">
                <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300 dark:ring-emerald-400/20">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm font-semibold">Submission received</span>
                </div>

                <h3 id="success-title" className="text-2xl font-black tracking-tight text-gray-900 dark:text-white">
                  You’re all set
                </h3>

                <p id="success-description" className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Your contact will be included in today’s vCard compilation.
                </p>

                <div className="mt-6 rounded-2xl border border-blue-200/60 bg-blue-50/80 px-4 py-4 text-left text-blue-800 shadow-sm dark:border-blue-400/20 dark:bg-blue-900/20 dark:text-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-700 dark:bg-blue-400/10 dark:text-blue-200">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-semibold">Download window</div>
                      <div className="mt-0.5 text-sm opacity-90">
                        Return at <span className="font-semibold">9:00 PM</span> to download the contact file.
                        {countdown && (
                          <span className="ml-1 font-semibold">(in {countdown})</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid gap-3">
                  <Button 
                    type="button" 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDoneCard(false);
                    }} 
                    className="h-12 rounded-xl font-bold"
                  >
                    Back to form
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDoneCard(false);
                    }} 
                    className="h-12 rounded-xl"
                  >
                    Close
                  </Button>
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
    <section id="submit-form" className="relative py-16 lg:py-24 overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-primary/10 to-background/90 dark:from-gray-950/95 dark:via-primary/10 dark:to-gray-950/95" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-accent/20 dark:bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ${showDoneCard ? "pointer-events-none" : ""}`}
        aria-hidden={showDoneCard}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
            Submit Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Contact
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Be part of today's vCard compilation and start growing your network exponentially
          </p>

          {/* Today's Count */}
          {!isLoadingCount && todaysCount !== null && (
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary to-accent rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Users className="w-5 h-5 text-primary-foreground" />
              <span className="text-primary-foreground font-bold text-lg">
                {todaysCount} submissions today
              </span>
              <TrendingUp className="w-5 h-5 text-primary-foreground" />
            </motion.div>
          )}
        </motion.div>

        {/* Form Card */}
      <AnimatePresence mode="wait">
          <motion.div
            key="form"
            className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative p-8 lg:p-12">

              {/* Plan Type Selector */}
              <div className="relative mb-8 space-y-4">
                <Label className="text-lg font-bold text-foreground">
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
                        ? 'border-primary bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20'
                        : 'border-border hover:border-primary/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {planType === plan.value && (
                      <CheckCircle className="absolute top-4 right-4 w-6 h-6 text-primary" />
                    )}
                    <div className="font-bold text-lg text-foreground mb-1">
                      {plan.title}
                    </div>
                    <div className="text-sm text-muted-foreground">
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
                <Label htmlFor="name" className="text-base font-semibold text-foreground">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  maxLength={planType === "free" ? 8 : undefined}
                  placeholder={planType === "free" ? "Max 8 chars" : "Your full name"}
                  className="text-base h-12 bg-card/60 backdrop-blur-sm border-border focus:border-primary focus:ring-primary/50 rounded-xl"
                />
                {planType === "free" && (
                  <p className="text-sm text-muted-foreground">
                    {name.length}/8 characters used
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-base font-semibold text-foreground">
                  Country <span className="text-destructive">*</span>
                </Label>
                <CountrySelect value={country} onChange={(val) => {
                  setCountry(val);
                  const dialCode = COUNTRY_DIAL_CODES[val];
                  if (dialCode) {
                    // Only auto-fill if phone is empty or starts with a previous dial code
                    const currentDialCode = Object.values(COUNTRY_DIAL_CODES).find(code => phone.startsWith(code));
                    if (!phone || phone === currentDialCode || phone === '') {
                      setPhone(dialCode);
                    }
                  }
                }} required />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold text-foreground">
                  WhatsApp Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder={country ? `${COUNTRY_DIAL_CODES[country] || ''} xxx xx xx xx` : "+237 6xx xx xx xx"}
                  className="text-base h-12 bg-card/60 backdrop-blur-sm border-border focus:border-primary focus:ring-primary/50 rounded-xl"
                />
                <p className="text-sm text-muted-foreground">
                  Country code is auto-filled — just add your number
                </p>
              </div>

              {/* Optional Fields */}
              <Collapsible open={showOptional} onOpenChange={setShowOptional}>
                <CollapsibleTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-between h-12 hover:bg-primary/10 border-primary/30 rounded-xl"
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
                      <Label htmlFor="company" className="text-base text-foreground">Company</Label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Your company"
                        className="text-base h-12 bg-card/60 backdrop-blur-sm border-border rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base text-foreground">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        className="text-base h-12 bg-card/60 backdrop-blur-sm border-border rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jobTitle" className="text-base text-foreground">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder="Your position"
                        className="text-base h-12 bg-card/60 backdrop-blur-sm border-border rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-base text-foreground">Website</Label>
                      <Input
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        placeholder="https://"
                        className="text-base h-12 bg-card/60 backdrop-blur-sm border-border rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base text-foreground">Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Your full address"
                      rows={3}
                      className="text-base bg-card/60 backdrop-blur-sm border-border rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-base text-foreground">Notes</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Additional information"
                      rows={3}
                      className="text-base bg-card/60 backdrop-blur-sm border-border rounded-xl"
                    />
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Terms and Conditions Checkbox */}
              <div className="space-y-3 p-4 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={hasAcceptedTerms}
                    onCheckedChange={(checked) => setHasAcceptedTerms(checked as boolean)}
                    className="mt-1 border-primary/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <div className="flex-1">
                    <Label 
                      htmlFor="terms" 
                      className="text-sm leading-relaxed cursor-pointer hover:text-primary transition-colors"
                    >
                      I have read and agree to the{" "}
                      <a 
                        href="/legal/terms" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a 
                        href="/legal/privacy" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline font-medium"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </a>
                      . I understand that my contact information will be shared with other users.
                    </Label>
                    {hasAcceptedTerms && (
                      <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        Your preference has been saved for future submissions
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.div 
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97, y: -1 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative overflow-hidden w-full h-14 font-bold text-lg rounded-xl border-0 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                    boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                  }}
                >
                  {/* Inner glow layer */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                  
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20">
                    <div className="h-full w-full rounded-xl bg-gradient-to-br from-primary to-secondary" />
                  </div>
                  
                  {/* Hover light sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  
                  {isSubmitting ? (
                    <span className="relative z-10 flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="relative z-10 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Submit My Contact
                    </span>
                  )}
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showDoneCard && <DoneCard />}
      </AnimatePresence>
      
      </div>
    </section>
  );
};

export default SubmissionFormNew;
