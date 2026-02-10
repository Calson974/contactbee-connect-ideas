import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

const DownloadVCards = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      
      // Construct the edge function URL
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const url = `${supabaseUrl}/functions/v1/generate-vcards?date=${formattedDate}`;
      
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate vCard file');
      }

      // Create blob and download
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `contacts_${formattedDate}.vcf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

      toast.success("vCard file downloaded successfully!");
    } catch (error) {
      console.error("Error downloading vCards:", error);
      toast.error(error instanceof Error ? error.message : "Failed to download vCard file. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 border-2 border-border bg-card/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <Download className="w-16 h-16 mx-auto mb-4 text-primary" />
            <h2 className="text-3xl font-bold mb-2">
              Download{" "}
              <span className="text-primary">
                vCard File
              </span>
            </h2>
            <p className="text-muted-foreground">
              Download the compiled contacts for any date
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-base font-semibold block">
                Select Date
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    disabled={(date) => date > new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              onClick={handleDownload}
              size="lg"
              className="w-full text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isDownloading}
            >
              <Download className="mr-2 h-5 w-5" />
              {isDownloading ? "Downloading..." : "Download vCard File"}
            </Button>

            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-semibold mb-2">How to use vCard files:</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Download the vCard file for your desired date</li>
                <li>Open the downloaded .vcf file on your device</li>
                <li>Your phone will automatically import all contacts</li>
                <li>All contacts are now saved to your WhatsApp</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DownloadVCards;
