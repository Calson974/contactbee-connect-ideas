import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon, Users, Zap, TrendingUp, FileDown, Clock, CheckCircle, ChevronRight, ArrowUp, Archive, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Import illustration
const ladyHoldingTablet = "https://res.cloudinary.com/dmxik1gea/image/upload/v1763131169/lady-holding-tablet_sa2qxe.png";

const DownloadsPageNew = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isDownloading, setIsDownloading] = useState(false);
  const [todayCount, setTodayCount] = useState(0);
  const [compiledFiles, setCompiledFiles] = useState<any[]>([]);

  // Fetch today's count
  useEffect(() => {
    const fetchCount = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { count, error } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', `${today}T00:00:00`)
        .lt('created_at', `${today}T23:59:59`);

      if (!error && count !== null) {
        setTodayCount(count);
      }
    };

    fetchCount();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('submissions-counter')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'submissions' }, () => {
        fetchCount();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Define the type for compiled files
  type CompiledFile = {
    id: string;
    compilation_date: string;
    created_at: string;
    contact_count: number;
    file_url?: string;
  };

  // Fetch compiled files
  useEffect(() => {
    const fetchCompiledFiles = async () => {
      try {
        // First, try to fetch from the correct table
        const { data, error } = await supabase
          .from('submissions')
          .select('created_at, plan_type')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          // Group submissions by date and count contacts
          const groupedByDate = data.reduce((acc: Record<string, number>, submission) => {
            const date = new Date(submission.created_at).toISOString().split('T')[0];
            acc[date] = (acc[date] || 0) + 1;
            return acc;
          }, {});

          // Convert to array of CompiledFile
          const compiledFiles = Object.entries(groupedByDate).map(([date, count]) => ({
            id: `file-${date}`,
            compilation_date: date,
            created_at: `${date}T09:00:00.000Z`, // Set to 9 AM UTC
            contact_count: count as number
          }));

          setCompiledFiles(compiledFiles);
        } else {
          setCompiledFiles([]);
        }
      } catch (error) {
        console.error('Error fetching compiled files:', error);
        toast.error('Failed to load compiled files. Please try again later.');
      }
    };

    fetchCompiledFiles();
  }, []);

  const handleDownload = async (downloadDate?: Date | string | React.MouseEvent<HTMLButtonElement>) => {
    // Handle event object if passed by onClick
    if (downloadDate && typeof downloadDate !== 'string' && !(downloadDate instanceof Date)) {
      downloadDate = undefined; // Will use latest compiled file
    }
    setIsDownloading(true);
    try {
      let targetDate: Date;
      
      if (downloadDate instanceof Date) {
        targetDate = downloadDate;
      } else if (typeof downloadDate === 'string') {
        // If it's a date string from the compiled files list
        targetDate = new Date(downloadDate);
      } else {
        // Get the latest compiled file (not today's file unless it's already compiled)
        const latestFile = compiledFiles.length > 0 
          ? compiledFiles.reduce((latest, current) => 
              new Date(current.compilation_date) > new Date(latest.compilation_date) ? current : latest
            )
          : null;
        
        if (!latestFile) {
          throw new Error('No compiled files available for download');
        }
        
        // Don't allow downloading today's file unless it's after 9 AM (compilation time)
        const today = new Date().toISOString().split('T')[0];
        if (latestFile.compilation_date === today) {
          const now = new Date();
          const compilationTime = new Date();
          compilationTime.setHours(9, 0, 0, 0); // 9:00 AM
          
          if (now < compilationTime) {
            // If today's file isn't ready, get the previous day's file
            const previousFiles = compiledFiles.filter(f => f.compilation_date !== today);
            if (previousFiles.length > 0) {
              const previousLatest = previousFiles.reduce((latest, current) => 
                new Date(current.compilation_date) > new Date(latest.compilation_date) ? current : latest
              );
              targetDate = new Date(previousLatest.compilation_date);
            } else {
              throw new Error("Today's file will be available at 9:00 AM. No previous files available.");
            }
          } else {
            targetDate = new Date(latestFile.compilation_date);
          }
        } else {
          targetDate = new Date(latestFile.compilation_date);
        }
      }

      // Ensure the date is valid
      if (isNaN(targetDate.getTime())) {
        throw new Error('Invalid date selected');
      }

      // Format the date as YYYY-MM-DD in local timezone
      const year = targetDate.getFullYear();
      const month = String(targetDate.getMonth() + 1).padStart(2, '0');
      const day = String(targetDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      if (!supabaseUrl) {
        throw new Error('Missing Supabase URL configuration');
      }
      
      const url = `${supabaseUrl}/functions/v1/generate-vcards?date=${formattedDate}`;
      
      // Get the current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        throw sessionError;
      }
      
      // Make the API request to generate the vCard
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.access_token || ''}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if the response is successful
      if (!response.ok) {
        let errorMessage = 'Failed to generate vCard file';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch (e) {
          // If we can't parse the error as JSON, use the status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Get the blob data and create a download link
      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error('Received empty vCard file');
      }

      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `contacts_${formattedDate}.vcf`;
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(downloadUrl);
        document.body.removeChild(a);
      }, 100);

      toast.success("🎉 vCard file downloaded successfully!");
    } catch (error) {
      console.error("Error downloading vCards:", error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast.error(`Failed to download vCard: ${errorMessage}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-x-hidden">
      {/* Sophisticated ambient background */}
      <div className="fixed inset-0 -z-10">
        {/* Static gradient orbs */}
        <div className="absolute rounded-full blur-[100px]" style={{ width: '400px', height: '400px', top: '10%', left: '5%', background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)' }} />
        <div className="absolute rounded-full blur-[100px]" style={{ width: '500px', height: '500px', top: '40%', left: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />
        
        {/* Noise texture */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
        </div>
      </div>
      <Helmet>
        <title>Downloads - BoostWhats Contact Lists</title>
        <meta name="description" content="Download daily-updated WhatsApp contact lists to grow your status views exponentially" />
        <style>{`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-shift {
            animation: gradient-shift 10s ease infinite;
            background-size: 200% 200%;
          }
        `}</style>
      </Helmet>
      
      {/* Hero Section - Sophisticated Design */}
      <div className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-40 lg:pb-28">
        {/* Background with layered effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
            {/* Text Content */}
            <div className="text-center lg:text-left max-w-xl mx-auto lg:mx-0 w-full lg:w-auto overflow-visible">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 backdrop-blur-md border border-primary/20 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold text-primary">Daily Updated Contact Library</span>
              </motion.div>

              <motion.h1 
                className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black tracking-tight text-foreground mb-4 sm:mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Contact</span> Library
              </motion.h1>
              
              <motion.p 
                className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8 sm:mb-10 px-2 lg:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Access and download your daily <span className="font-semibold text-primary">vCard files</span>. Build your network with verified contacts.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full min-w-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex-shrink-0"
                >
                  <Button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="group relative overflow-hidden w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 h-auto bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-sm sm:text-base rounded-full border-0 transition-all duration-300 whitespace-nowrap"
                    style={{
                      boxShadow: "0 4px 14px -2px hsl(var(--primary) / 0.3), 0 8px 20px -4px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255,255,255,0.2)"
                    }}
                  >
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                    
                    {/* Light sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    
                    <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 justify-center">
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin h-3.5 w-3.5 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span className="text-xs sm:text-sm">Preparing...</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm">Download Latest vCard</span>
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full sm:w-auto flex-shrink-0"
                >
                  <Button 
                    variant="outline"
                    className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 h-auto bg-white/50 dark:bg-white/5 backdrop-blur-sm border-2 border-border/50 hover:border-primary/50 text-foreground font-semibold rounded-full transition-all duration-300 whitespace-nowrap"
                    onClick={() => {
                      const element = document.getElementById('all-files');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    <span className="flex items-center gap-1.5 sm:gap-2 justify-center">
                      <span className="text-xs sm:text-sm">View All Files</span>
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
            
            {/* Illustration */}
            <motion.div 
              className="w-full max-w-lg mx-auto lg:mx-0 relative"
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary/20 to-accent/20 rounded-[3rem] blur-3xl -z-10" />
              
              <div className="relative">
                <img 
                  src={ladyHoldingTablet} 
                  alt="Woman holding a tablet with contact information" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section - Premium Cards */}
      <div className="relative -mt-8 z-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: Users, 
                label: "Today's Contacts", 
                value: compiledFiles.find(f => f.compilation_date === new Date().toISOString().split('T')[0])?.contact_count?.toString() || '0', 
                subtext: `Compiled at 9:00 AM`,
                gradient: "from-primary to-accent",
                bgGradient: "from-primary/5 to-accent/5"
              },
              { 
                icon: TrendingUp, 
                label: "Total Files", 
                value: compiledFiles.length.toString(),
                subtext: "Available downloads",
                gradient: "from-accent to-secondary",
                bgGradient: "from-accent/5 to-secondary/5"
              },
              { 
                icon: FileDown, 
                label: "Total Contacts", 
                value: compiledFiles.reduce((sum, f) => sum + (f.contact_count || 0), 0).toLocaleString(),
                subtext: "All time",
                gradient: "from-secondary to-primary",
                bgGradient: "from-secondary/5 to-primary/5"
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl border border-white/20 dark:border-white/10 p-8 shadow-lg hover:shadow-xl transition-all duration-500`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
              >
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                
                <div className="relative flex items-start gap-5">
                  <div className={`flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                    <p className={`text-4xl font-black text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-primary/70 font-medium mt-2">
                      {stat.subtext}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Section - Sophisticated Design */}
      <div className="relative py-24 lg:py-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px]" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent/10 backdrop-blur-md border border-accent/20 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <CalendarIcon className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Select Any Date</span>
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Download Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Contact Archive</span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Choose any date to download the vCard file with all contacts from that day
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Calendar */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-[2rem] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="px-8 py-6 border-b border-border/50 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-foreground">
                    {format(date, 'MMMM yyyy')}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Updated daily at 9:00 AM UTC</span>
                  </div>
                </div>
                
                {/* Calendar */}
                <div className="p-8">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    className="rounded-none border-0 w-full"
                    classNames={{
                      month: "w-full space-y-4",
                      caption: "flex flex-col sm:flex-row justify-between items-center gap-2 mb-4",
                      caption_label: "text-base sm:text-lg font-semibold text-foreground",
                      caption_dropdowns: "flex gap-2",
                      nav: "flex gap-2",
                      nav_button: "h-8 w-8 p-0 rounded-lg hover:bg-primary/10 transition-colors",
                      nav_button_previous: "rotate-0",
                      nav_button_next: "rotate-0",
                      table: "w-full border-collapse",
                      head_row: "grid grid-cols-7 gap-1 mb-2 sm:flex sm:justify-between sm:mb-4",
                      head_cell: "text-muted-foreground font-medium text-xs sm:text-sm w-full h-8 sm:h-12 sm:w-12 flex items-center justify-center",
                      row: "grid grid-cols-7 gap-1 mb-1 sm:flex sm:justify-between sm:mb-2",
                      cell: "w-full h-8 sm:w-12 sm:h-12 p-0 relative",
                      day: "w-full h-8 sm:w-12 sm:h-12 p-0 text-xs sm:text-sm font-medium text-foreground hover:bg-primary/10 rounded-lg sm:rounded-xl transition-all duration-200 flex items-center justify-center",
                      day_today: "bg-primary/10 text-primary font-bold",
                      day_selected: "bg-gradient-to-br from-primary to-accent text-white font-bold hover:from-primary/90 hover:to-accent/90 shadow-lg",
                      day_disabled: "text-muted-foreground/30 cursor-not-allowed",
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      return date > today || date < new Date(2024, 0, 1);
                    }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Download Card */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-full rounded-[2rem] bg-gradient-to-br from-primary to-accent p-[2px] shadow-2xl">
                <div className="h-full rounded-[calc(2rem-2px)] bg-gradient-to-br from-primary/95 to-accent/95 backdrop-blur-xl p-8 flex flex-col">
                  {/* Icon */}
                  <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 mx-auto">
                    <FileDown className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Date */}
                  <h3 className="text-3xl font-bold text-white text-center mb-2">
                    {format(date, 'MMMM d')}
                  </h3>
                  <p className="text-white/70 text-center mb-8">
                    {format(date, 'yyyy')}
                  </p>
                  
                  {/* Stats */}
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                      <div className="flex items-center gap-3 text-white/80">
                        <Users className="w-5 h-5" />
                        <span>Contacts</span>
                      </div>
                      <span className="font-bold text-white text-xl">
                        {compiledFiles.find(f => f.compilation_date === format(date, 'yyyy-MM-dd'))?.contact_count || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-white/60 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>Updated at 9:00 AM UTC</span>
                    </div>
                  </div>
                  
                  {/* Download Button */}
                  <div className="mt-auto">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleDownload()}
                        disabled={isDownloading}
                        className="w-full h-14 bg-white text-primary hover:bg-white/90 font-bold text-lg rounded-xl transition-all duration-300 shadow-lg"
                      >
                        {isDownloading ? (
                          <span className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Preparing...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            Download vCard
                          </span>
                        )}
                      </Button>
                    </motion.div>
                    
                    <p className="mt-4 text-center text-xs text-white/60">
                      .VCF file compatible with all major contact apps
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* File Archive Section - Modern List Design */}
      <div className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-transparent via-muted/30 to-transparent" id="all-files">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-secondary/10 backdrop-blur-md border border-secondary/20 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Archive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
              <span className="text-xs sm:text-sm font-semibold text-secondary">Complete History</span>
            </motion.div>

            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Your vCard <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Archive</span>
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Access and download all your previously compiled contact lists
            </motion.p>
          </div>

          {/* File List */}
          <motion.div 
            className="rounded-[2rem] bg-white/80 dark:bg-gray-900/80 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* List Header */}
            <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-border/50 flex items-center justify-between bg-gradient-to-r from-muted/50 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                  <Archive className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground">All vCard Archives</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">Download any previous day's contacts</p>
                </div>
              </div>
              <div className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-gradient-to-r from-primary to-accent text-white text-xs font-bold shadow-md min-w-[3rem] text-center">
                {compiledFiles.length} {compiledFiles.length === 1 ? 'File' : 'Files'}
              </div>
            </div>
            
            {/* File Items */}
            <div className="overflow-x-auto overflow-y-auto max-h-[400px] sm:max-h-[500px]">
              {compiledFiles.length > 0 ? (
                <div className="min-w-[600px]">
                  <AnimatePresence>
                    {compiledFiles.map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="group relative px-4 sm:px-6 lg:px-8 py-3 sm:py-5 border-b border-border/30 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            {/* File Icon */}
                            <div 
                              className="flex-shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center shadow-md"
                              style={{
                                background: index % 3 === 0 
                                  ? 'linear-gradient(to bottom right, #3b82f6, #06b6d4)' 
                                  : index % 3 === 1 
                                  ? 'linear-gradient(to bottom right, #a855f7, #ec4899)' 
                                  : 'linear-gradient(to bottom right, #10b981, #14b8a6)'
                              }}
                            >
                              <FileDown className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
                            </div>
                            
                            {/* File Info */}
                            <div className="min-w-0 flex-1">
                              <h4 className="text-sm sm:text-lg font-bold text-foreground truncate">
                                {format(new Date(file.compilation_date), 'EEEE, MMMM d, yyyy')}
                              </h4>
                              <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-1 mt-1">
                                <span className="inline-flex items-center text-xs sm:text-sm text-muted-foreground">
                                  <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                  {file.contact_count} contacts
                                </span>
                                <span className="inline-flex items-center text-xs sm:text-sm text-muted-foreground">
                                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                                  {format(new Date(file.created_at), 'h:mm a')}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Download Button */}
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0"
                          >
                            <Button
                              variant="outline"
                              className="group/btn relative overflow-hidden px-4 py-2.5 sm:px-6 sm:py-5 h-auto rounded-xl border-2 border-primary/30 hover:border-primary bg-white/50 dark:bg-white/5 hover:bg-primary transition-all duration-300"
                              onClick={() => handleDownload(new Date(file.compilation_date))}
                            >
                              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 text-primary group-hover/btn:text-white transition-colors text-sm sm:text-base">
                                <Download className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                <span className="font-semibold">Download</span>
                              </span>
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12 sm:py-16 px-4 sm:px-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-primary/10 mb-4 sm:mb-6">
                    <Archive className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">No vCards found</h3>
                  <p className="text-sm text-muted-foreground">
                    Your compiled vCard files will appear here once available.
                  </p>
                </div>
              )}
            </div>
            
            {/* Footer */}
            {compiledFiles.length > 0 && (
              <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-5 border-t border-border/50 bg-muted/30 text-center">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Files are generated daily at 9:00 AM UTC • Last updated {format(new Date(), 'MMM d, yyyy')}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* CTA Section - Premium Design */}
      <div className="relative py-24 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_50%,rgba(34,197,94,0.05),transparent)]" />
        </div>
        
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div 
            className="relative rounded-[2.5rem] bg-gradient-to-r from-primary via-accent to-secondary p-[2px] shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-[calc(2.5rem-2px)] bg-gradient-to-br from-primary/95 via-accent/95 to-secondary/95 backdrop-blur-xl px-12 py-16 text-center overflow-hidden">
              {/* Inner glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/10" />
              
              {/* Grid pattern */}
              <div className="absolute inset-0 opacity-[0.05]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
              </div>
              
              <div className="relative z-10">
                <motion.h2 
                  className="text-4xl sm:text-5xl font-black text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  Need More Contacts?
                </motion.h2>
                <motion.p 
                  className="text-xl text-white/80 max-w-2xl mx-auto mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  We compile fresh contacts every day at 9:00 AM UTC. Bookmark this page for easy access.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="group relative overflow-hidden px-10 py-7 h-auto bg-white text-primary hover:bg-white/90 font-bold text-lg rounded-full border-0 transition-all duration-300 shadow-xl"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      {/* Light sweep */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      
                      <span className="relative z-10 flex items-center gap-3">
                        <ArrowUp className="w-5 h-5" />
                        Back to Top
                      </span>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPageNew;
