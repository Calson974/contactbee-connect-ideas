import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { Download } from "lucide-react";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type VCardArchive = {
  id: string;
  date: string;
  contact_count: number;
  created_at: string;
  file_path: string | null;
};

export function CompiledContactsList() {
  const [archives, setArchives] = useState<VCardArchive[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase.rpc('get_daily_submission_counts');

        if (error) throw error;

        const rows = (data as { submission_date: string; contact_count: number }[]) || [];
        setArchives(
          rows
            .filter((row) => row.submission_date && row.contact_count > 0)
            .map((row) => ({
              id: `archive-${row.submission_date}`,
              date: row.submission_date,
              contact_count: row.contact_count,
              created_at: `${row.submission_date}T21:00:00.000Z`,
              file_path: `${row.submission_date}/daily_contacts_${row.submission_date}.vcf`,
            }))
        );
      } catch (err) {
        console.error('Error fetching archives:', err);
        setError('Failed to load contact archives. Please try again later.');
        toast.error('Failed to load contact archives');
      } finally {
        setLoading(false);
      }
    };

    fetchArchives();
  }, []);


  const handleDownload = async (filePath: string, archiveId: string) => {
    try {
      console.log('Starting download for file path:', filePath);
      
      // Extract the date from the file path (format: YYYY-MM-DD)
      const dateMatch = filePath.match(/(\d{4}-\d{2}-\d{2})/);
      const formattedDate = dateMatch ? dateMatch[0] : '';
      
      if (!formattedDate) {
        throw new Error('Could not determine date from file path');
      }
      
      setIsDownloading(true);
      
      // Use the same approach as DownloadVCards component
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

      toast.success('vCard file downloaded successfully!');
    } catch (err: any) {
      console.error('Error in handleDownload:', err);
      toast.error(`Download failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading archives...</div>;
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      return format(parseISO(dateString), 'MMMM d, yyyy');
    } catch (e) {
      console.error('Error formatting date:', e);
      return dateString; // Return the original string if formatting fails
    }
  };

  // Render loading state
  if (loading) {
    return (
      <Card className="p-6 mt-8">
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-muted/30 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </Card>
    );
  }

  // Render error state
  if (error) {
    return (
      <Card className="p-6 mt-8">
        <div className="text-center py-8">
          <p className="text-destructive mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  // Render empty state
  if (archives.length === 0) {
    return (
      <Card className="p-6 mt-8">
        <div className="text-center py-12 space-y-2">
          <p className="text-muted-foreground">No contact archives found.</p>
          <p className="text-sm text-muted-foreground">New contact lists will appear here after they're compiled.</p>
        </div>
      </Card>
    );
  }

  // Render archives list
  return (
    <Card className="p-6 mt-8">
      <div className="space-y-3">
        {archives.map((archive) => (
          <div
            key={archive.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors border border-border/50"
          >
            <div>
              <h3 className="font-medium text-base">
                {formatDate(archive.date)}
              </h3>
              <p className="text-sm text-muted-foreground">
                Showing all historical archives
              </p>
              <p className="text-sm text-muted-foreground">
                {archive.contact_count?.toLocaleString() || 'N/A'} contacts
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => handleDownload(archive.file_path || '', archive.id)}
              className="gap-2 min-w-[120px] justify-center"
              disabled={isDownloading}
            >
              <Download className="h-4 w-4" />
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
