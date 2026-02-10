import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Download, Calendar as CalendarIcon, LogOut } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { User } from "@supabase/supabase-js";

export const AdminDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const navigate = useNavigate();

  useEffect(() => {
    checkAdmin();
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetchSubmissions();
    }
  }, [filterDate, isAdmin]);

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .eq('role', 'admin')
      .single();

    if (!roles) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/");
      return;
    }

    setIsAdmin(true);
    setLoading(false);
  };

  const fetchSubmissions = async () => {
    const dateStr = format(filterDate, 'yyyy-MM-dd');
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .gte('created_at', `${dateStr}T00:00:00`)
      .lt('created_at', `${dateStr}T23:59:59`)
      .order('created_at', { ascending: false });

    if (error) {
      toast.error("Failed to fetch submissions");
      return;
    }

    setSubmissions(data || []);
  };

  const handleManualCompile = async () => {
    const dateStr = format(filterDate, 'yyyy-MM-dd');
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const url = `${supabaseUrl}/functions/v1/compile-daily-vcards?date=${dateStr}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to compile vCard');
      }

      const result = await response.json();
      toast.success("vCard compiled successfully!");
      
      // Download the file
      downloadVCard(dateStr);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to compile vCard");
    }
  };

  const downloadVCard = async (dateStr: string) => {
    const { data } = await supabase
      .from('daily_vcards')
      .select('file_path')
      .eq('date', dateStr)
      .single();

    if (!data) {
      toast.error("No vCard file found");
      return;
    }

    const { data: fileData } = await supabase.storage
      .from('vcards')
      .download(data.file_path);

    if (fileData) {
      const url = window.URL.createObjectURL(fileData);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts_${dateStr}.vcf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card className="p-6 space-y-4">
          <div className="flex gap-4 items-end">
            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !filterDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filterDate ? format(filterDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filterDate}
                    onSelect={(date) => date && setFilterDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button onClick={handleManualCompile}>
              <Download className="mr-2 h-4 w-4" />
              Compile & Download vCard
            </Button>
          </div>

          <div>
            <p className="text-lg font-semibold mb-4">
              Total Submissions: {submissions.length}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Phone</th>
                    <th className="text-left p-2">Country</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Company</th>
                    <th className="text-left p-2">Plan</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub.id} className="border-b hover:bg-muted/50">
                      <td className="p-2">{sub.name}</td>
                      <td className="p-2">{sub.phone}</td>
                      <td className="p-2">{sub.country}</td>
                      <td className="p-2">{sub.email || "-"}</td>
                      <td className="p-2">{sub.company || "-"}</td>
                      <td className="p-2">
                        <span className={cn(
                          "px-2 py-1 rounded text-xs",
                          sub.plan_type === 'premium' ? "bg-primary/20 text-primary" : "bg-muted"
                        )}>
                          {sub.plan_type}
                        </span>
                      </td>
                      <td className="p-2 text-sm text-muted-foreground">
                        {format(new Date(sub.created_at), "HH:mm")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
