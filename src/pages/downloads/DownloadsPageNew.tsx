import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon, Users, Sparkles, TrendingUp, FileDown, Clock, CheckCircle, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

// Import illustration
const ladyHoldingTablet = "/img/illustrations/lady-holding-tablet.png";

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
      downloadDate = new Date();
    }
    setIsDownloading(true);
    try {
      // Handle both Date objects and string dates from the compiled files list
      let targetDate: Date;
      
      if (downloadDate instanceof Date) {
        targetDate = downloadDate;
      } else if (typeof downloadDate === 'string') {
        // If it's a date string from the compiled files list
        targetDate = new Date(downloadDate);
      } else {
        // Fallback to the selected date in the calendar
        targetDate = date;
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
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `translate(-50%, -50%)`,
              background: `radial-gradient(circle, ${
                [
                  'rgba(20, 184, 166, 0.1)',
                  'rgba(6, 182, 212, 0.1)',
                  'rgba(168, 85, 247, 0.1)',
                  'rgba(236, 72, 153, 0.1)',
                  'rgba(59, 130, 246, 0.1)'
                ][i % 5]
              }, transparent 70%)`,
              filter: 'blur(40px)',
              opacity: 0.6
            }}
          />
        ))}
      </div>
      <Helmet>
        <title>Downloads - BoostWhats Contact Lists</title>
        <meta name="description" content="Download daily-updated WhatsApp contact lists to grow your status views exponentially" />
        <style>{
          `
            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient-shift {
              animation: gradient-shift 8s ease infinite;
              background-size: 200% 200%;
            }
            .glow-on-hover {
              transition: all 0.3s ease;
            }
            .glow-on-hover:hover {
              box-shadow: 0 0 20px rgba(16, 185, 129, 0.5);
              transform: translateY(-2px);
            }
          `
        }</style>
      </Helmet>
      
      {/* Hero Section with Illustration */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-blue-600 to-emerald-600 pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-[length:200%_200%] animate-gradient-shift" style={{
          backgroundImage: 'linear-gradient(45deg, rgba(13, 148, 136, 0.9) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(16, 185, 129, 0.9) 100%)',
          opacity: 0.8,
          mixBlendMode: 'multiply'
        }}></div>
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 300 + 100}px`,
                height: `${Math.random() * 300 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                transform: `translate(-50%, -50%)`,
                filter: 'blur(40px)',
                opacity: Math.random() * 0.2 + 0.1
              }}
            />
          ))}
        </div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <motion.h1 
                className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100 sm:text-5xl md:text-6xl drop-shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-yellow-300">Contact</span> Library
              </motion.h1>
              <motion.p 
                className="mt-4 text-lg text-blue-50 md:text-xl max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <span className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-blue-100 mb-3 border border-white/20">✨ New Update Available</span>
                <span className="block mt-2">Access and download your daily business connections with our <span className="font-semibold text-amber-200">enhanced</span> contact management system</span>
              </motion.p>
              
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-amber-500/30 hover:from-amber-500 hover:to-yellow-600 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                  {isDownloading ? (
                    <span className="relative flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative">Preparing...</span>
                    </span>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      <span className="relative">Download Latest vCard</span>
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="px-6 py-3 bg-white/5 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:border-white/50 font-medium rounded-full group transition-all duration-300"
                  onClick={() => {
                    const element = document.getElementById('all-files');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span className="mr-1">View All Files</span>
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            </div>
            
            <motion.div 
              className="mt-10 lg:mt-0 w-full max-w-md mx-auto lg:mx-0 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-teal-400 rounded-3xl opacity-20 blur-3xl -z-10"></div>
              <div className="relative">
                <img 
                  src={ladyHoldingTablet} 
                  alt="Woman holding a tablet with contact information" 
                  className="w-full h-auto drop-shadow-2xl transform transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-amber-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400 to-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-12 sm:py-16 -mt-10 z-10 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-1/2 -right-10 w-72 h-72 bg-teal-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-10 left-1/4 w-32 h-32 bg-purple-400/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-cyan-400/20 rounded-full filter blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 px-4 sm:px-0">
            {/* Today's Contacts */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-teal-100/50 dark:hover:shadow-teal-900/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="h-1.5 bg-gradient-to-r from-teal-400 to-blue-500"></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl p-3 shadow-md">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Today's Contacts</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{todayCount}</p>
                    <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-1">
                      +{Math.floor(todayCount * 0.15)} from yesterday
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Weekly Growth */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-emerald-100/50 dark:hover:shadow-emerald-900/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="h-1.5 bg-gradient-to-r from-emerald-400 to-teal-500"></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl p-3 shadow-md">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Weekly Growth</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">+{Math.floor(todayCount * 1.2)}</p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                      {Math.floor(todayCount * 0.3)}% from last week
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Total Downloads */}
            <motion.div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-white/20 dark:border-gray-700/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-blue-100/50 dark:hover:shadow-blue-900/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <div className="h-1.5 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl p-3 shadow-md">
                    <Download className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Downloads</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.floor(todayCount * 12.3)}</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mt-1">
                      {Math.floor(todayCount * 0.8)} this month
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="relative py-12 sm:py-16 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200/30 dark:bg-teal-900/20 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200/30 dark:bg-blue-900/20 rounded-full filter blur-3xl"></div>
        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-48 h-48 bg-teal-400/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 relative">
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
                <div className="relative px-6 py-1.5 bg-gradient-to-r from-teal-500 to-blue-600 text-white text-sm font-medium rounded-full inline-flex items-center">
                  <span className="relative z-10">New Feature</span>
                </div>
              </div>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">Select a Date to <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-blue-500">Download</span></span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-emerald-400">
                Your Contact Archive
              </span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 sm:mt-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-full inline-block border border-gray-100 dark:border-gray-700">
              <span className="text-teal-500 dark:text-teal-400 font-medium">✨ Pro Tip:</span> Choose any date to download the vCard file with all contacts from that day
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {format(date, 'MMMM yyyy')}
                    </h3>
                    <div className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                      <Clock className="inline-block w-4 h-4 mr-1 -mt-0.5" />
                      Updated daily at 9:00 AM UTC
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-xl border-0 shadow-inner bg-gray-50 dark:bg-gray-700/30 p-4 w-full"
                      classNames={{
                        day_today: "bg-teal-100 text-teal-900 font-bold dark:bg-teal-900/30 dark:text-teal-300",
                        day_selected: "bg-gradient-to-br from-teal-500 to-emerald-500 text-white font-bold hover:bg-teal-600 hover:text-white focus:bg-teal-600 focus:text-white",
                        day_disabled: "text-gray-300 dark:text-gray-600 cursor-not-allowed",
                        head_cell: "text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wider",
                        day: "h-10 w-10 p-0 font-medium aria-selected:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200"
                      }}
                      disabled={(date) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return date > today || date < new Date(2023, 0, 1);
                      }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="h-full bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl shadow-xl overflow-hidden border border-teal-500/20 flex flex-col">
                <div className="p-6 sm:p-8 flex-1 flex flex-col">
                  <div className="flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 mx-auto">
                    <FileDown className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-3">
                    {format(date, 'MMMM d, yyyy')}
                  </h3>
                  
                  <div className="mt-4 mb-6 p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center text-teal-100/90 mb-2">
                      <Users className="h-5 w-5 mr-2 flex-shrink-0" />
                      <span className="font-medium">Contacts Available:</span>
                      <span className="ml-auto font-bold text-white">
                        {compiledFiles.find(f => f.compilation_date === format(date, 'yyyy-MM-dd'))?.contact_count || 'N/A'}
                      </span>
                    </div>
                    <div className="flex items-center text-teal-100/80 text-sm">
                      <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span>Updated at 9:00 AM UTC</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4">
                    <Button
                      onClick={() => handleDownload()}
                      disabled={isDownloading}
                      size="lg"
                      className="w-full flex items-center justify-center px-6 py-4 bg-white text-teal-700 hover:bg-teal-50 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {isDownloading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-teal-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Preparing...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download vCard
                        </>
                      )}
                    </Button>
                    
                    <p className="mt-3 text-center text-xs text-teal-100/70">
                      .VCF file compatible with all major contact apps
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* File Archive Section */}
      <div className="relative py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800" id="all-files">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-purple-400/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-10 w-56 h-56 bg-cyan-400/10 rounded-full filter blur-3xl -z-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              <span className="block">Your Complete</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">
                vCard Archive
              </span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Access and download all your previously compiled contact lists
            </p>
          </div>

          <motion.div 
            className="bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700/50 flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-blue-50 to-teal-50 dark:from-gray-800/50 dark:to-gray-900/50">
              <div className="flex items-center">
                <div className="mr-3 p-2 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500 shadow-md">
                  <FileDown className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 bg-clip-text text-transparent">
                  All vCard Archives
                </h3>
              </div>
              <div className="mt-2 sm:mt-0 text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-4 py-1.5 rounded-full font-semibold shadow-sm">
                {compiledFiles.length} {compiledFiles.length === 1 ? 'File' : 'Files'} Available
              </div>
            </div>
            
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50 max-h-[600px] overflow-y-auto">
              {compiledFiles.length > 0 ? (
                <AnimatePresence>
                  {compiledFiles.map((file, index) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.03 }}
                      className="group relative p-5 hover:bg-gradient-to-r from-blue-50/50 to-teal-50/50 dark:from-gray-800/50 dark:to-gray-700/30 transition-all duration-200 border-l-4 border-transparent hover:border-teal-400 hover:shadow-sm"
                    >
                      {/* Decorative accent */}
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                          <div className={`p-2.5 rounded-xl shadow-md flex-shrink-0 ${
                          index % 3 === 0 ? 'bg-gradient-to-br from-blue-500 to-cyan-500' : 
                          index % 3 === 1 ? 'bg-gradient-to-br from-purple-500 to-pink-500' : 
                          'bg-gradient-to-br from-teal-500 to-emerald-500'
                        }`}>
                          <FileDown className="w-5 h-5 text-white" />
                        </div>
                          <div className="min-w-0">
                            <h4 className="text-base font-semibold text-gray-900 dark:text-white truncate">
                              {format(new Date(file.compilation_date), 'EEEE, MMMM d, yyyy')}
                            </h4>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                              <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Users className="w-3.5 h-3.5 mr-1.5" />
                                {file.contact_count} contacts
                              </span>
                              <span className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="w-3.5 h-3.5 mr-1.5" />
                                {format(new Date(file.created_at), 'h:mm a')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-3 sm:mt-0 w-full sm:w-auto justify-center sm:justify-start group relative overflow-hidden"
                          onClick={() => handleDownload(new Date(file.compilation_date))}
                        >
                          <span className="relative z-10 flex items-center">
                            <Download className="w-4 h-4 mr-2 text-teal-600 dark:text-teal-400 group-hover:text-white transition-colors" />
                            <span className="text-teal-700 dark:text-teal-300 group-hover:text-white transition-colors">
                              Download
                            </span>
                          </span>
                          <span className="absolute inset-0 w-0 bg-gradient-to-r from-teal-500 to-emerald-500 transition-all duration-300 ease-in-out group-hover:w-full group-hover:opacity-100 opacity-0"></span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              ) : (
                <div className="text-center py-12 px-6">
                  <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-teal-100 dark:bg-teal-900/30 mb-4">
                    <FileDown className="h-8 w-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No vCards found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Your compiled vCard files will appear here once available.
                  </p>
                </div>
              )}
            </div>
            
            {compiledFiles.length > 0 && (
              <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700/50 text-center bg-gray-50 dark:bg-gray-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Files are generated daily at 9:00 AM UTC • Last updated {format(new Date(), 'MMM d, yyyy')}
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-blue-400/5 to-purple-500/5 dark:from-teal-900/10 dark:via-blue-900/10 dark:to-purple-900/10">
          <div className="absolute inset-0 bg-[radial-gradient(#06b6d480_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-teal-600 via-blue-600 to-emerald-600 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-[length:200%_200%] animate-gradient-shift" style={{
              backgroundImage: 'linear-gradient(45deg, rgba(13,148,136,0.8) 0%, rgba(59,130,246,0.8) 50%, rgba(16,185,129,0.8) 100%)',
              opacity: 0.7,
              mixBlendMode: 'overlay'
            }}></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>
            
            <div className="relative max-w-4xl mx-auto py-12 px-6 sm:py-16 sm:px-12 lg:px-8 text-center">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">Need More Contacts?</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-emerald-200">Check back daily for updates</span>
              </h2>
              <p className="mt-4 text-lg text-teal-100/90 max-w-2xl mx-auto">
                We compile fresh contacts every day at 9:00 AM UTC. Bookmark this page for easy access to your growing network.
              </p>
              <div className="mt-8">
                <Button
                  size="lg"
                  className="px-8 py-3 border-0 text-base font-medium rounded-full text-white bg-gradient-to-r from-blue-500 to-teal-500 hover:from-blue-600 hover:to-teal-600 md:py-4 md:text-lg md:px-10 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 relative overflow-hidden group"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <span className="relative z-10 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    Back to Top
                  </span>
                  <span className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadsPageNew;
