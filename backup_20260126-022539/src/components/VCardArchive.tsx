import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export const VCardArchive = () => {
  const [archives, setArchives] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchives();
  }, []);

  const fetchArchives = async () => {
    const { data, error } = await supabase
      .from('daily_vcards')
      .select('*')
      .order('date', { ascending: false });

    if (error) {
      toast.error("Failed to fetch archives");
      return;
    }

    setArchives(data || []);
    setLoading(false);
  };

  const handleDownload = async (filePath: string, date: string) => {
    const { data: fileData } = await supabase.storage
      .from('vcards')
      .download(filePath);

    if (fileData) {
      const url = window.URL.createObjectURL(fileData);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts_${date}.vcf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Download started!");
    } else {
      toast.error("Failed to download file");
    }
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <p className="text-center">Loading archives...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            vCard <span className="text-primary">Archive</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Download previously compiled contact lists
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-4">
          {archives.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No archived vCard files yet</p>
            </Card>
          ) : (
            archives.map((archive) => (
              <Card key={archive.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {format(new Date(archive.date), "MMMM dd, yyyy")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {archive.contact_count} contacts
                      </p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDownload(archive.file_path, archive.date)}
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
