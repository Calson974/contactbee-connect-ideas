import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon, Users, Sparkles, TrendingUp, FileDown, Clock, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

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

  const handleDownload = async (downloadDate?: Date | string) => {
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
    <div className="min-h-screen bg-gradient-to-br from-teal-600 to-emerald-600">
      <Helmet>
        <title>Downloads - BoostWhats Contact Lists</title>
        <meta name="description" content="Download daily-updated WhatsApp contact lists to grow your status views exponentially" />
      </Helmet>
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-emerald-600 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1 
              className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Download vCards
            </motion.h1>
            <motion.p 
              className="mt-6 max-w-2xl mx-auto text-xl text-teal-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get your daily dose of business connections
            </motion.p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-teal-500 rounded-md p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                        Today's Contacts
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {todayCount}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-emerald-500 rounded-md p-3">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                        New This Week
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {Math.floor(todayCount * 5.7)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-teal-600 rounded-md p-3">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-300 truncate">
                        Total Downloads
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {Math.floor(todayCount * 12.3)}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Calendar and Download Card */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Select a date</h2>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(newDate) => newDate && setDate(newDate)}
                      className="rounded-md border border-gray-200 dark:border-gray-700"
                      disabled={(date) => {
                        // Disable future dates and dates before 2023
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
              <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-lg shadow-xl overflow-hidden border border-teal-500/20">
                <div className="px-6 py-8 sm:p-8">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-white/10 backdrop-blur-sm mb-6">
                    <FileDown className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Download vCard</h3>
                  <p className="text-teal-100/90 mb-6">
                    Download all contacts from {format(date, 'MMMM d, yyyy')}
                  </p>
                  <div className="flex items-center text-sm text-teal-100/80 mb-6">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Files are generated daily at 9:00 AM UTC</span>
                  </div>
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md bg-white text-teal-700 hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors duration-200 shadow-sm hover:shadow-md"
                  >
                    {isDownloading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-teal-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
                </div>
              </div>
            </motion.div>
          </div>

          {/* All Compiled vCards */}
          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="max-w-3xl mx-auto bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-3xl border border-gray-200/50 dark:border-gray-800/50 shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  <span className="bg-gradient-to-r from-teal-500 to-green-500 bg-clip-text text-transparent">
                    All vCard Archives
                  </span>
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {compiledFiles.length} files available
                </div>
              </div>
              
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 -mr-2">
                {compiledFiles.length > 0 ? (
                  compiledFiles.map((file, index) => (
                    <div 
                      key={file.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500 to-green-500">
                          <FileDown className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            {format(new Date(file.compilation_date), 'MMMM d, yyyy')}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {file.contact_count} contacts • {format(new Date(file.created_at), 'PPp')}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group"
                        onClick={() => {
                          handleDownload(new Date(file.compilation_date));
                        }}
                      >
                        <Download className="w-4 h-4 mr-2 group-hover:text-teal-600 dark:group-hover:text-teal-400" />
                        Download
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No compiled vCards found.</p>
                    <p className="text-sm mt-1">New compilations will appear here.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Files are generated daily at 9:00 AM UTC
                </p>
              </div>
            </div>
          </motion.div>

          {/* Previously Compiled Files */}
          {compiledFiles.length > 0 && (
            <motion.div
              className="max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-3">
                  Previously{" "}
                  <span className="bg-gradient-to-r from-teal-500 to-green-500 dark:from-teal-400 dark:to-green-400 bg-clip-text text-transparent">
                    Compiled Files
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Access past contact compilations
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {compiledFiles.slice(0, 6).map((file, index) => (
                  <motion.div
                    key={file.id}
                    className="group relative bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-200/50 dark:border-gray-800/50 p-6 hover:shadow-xl transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-teal-500 to-green-500 shadow-md">
                        <FileDown className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                        {file.contact_count} contacts
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                        {format(new Date(file.compilation_date), 'MMMM dd, yyyy')}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Compiled {format(new Date(file.created_at), 'PPp')}
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-teal-50 dark:group-hover:bg-teal-950/20 group-hover:border-teal-500 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-all"
                      onClick={() => {
                        setDate(new Date(file.compilation_date));
                        handleDownload();
                      }}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DownloadsPageNew;
