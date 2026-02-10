import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users } from "lucide-react";

export const LiveCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      const today = new Date().toISOString().split('T')[0];
      const { count: totalCount, error } = await supabase
        .from('submissions')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', `${today}T00:00:00`)
        .lt('created_at', `${today}T23:59:59`);

      if (!error && totalCount !== null) {
        setCount(totalCount);
      }
    };

    fetchCount();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('submissions-counter')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'submissions'
        },
        () => {
          fetchCount();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex items-center gap-3 bg-muted/30 px-6 py-4 rounded-2xl border border-border/50 backdrop-blur-sm">
      <div className="bg-primary/20 p-3 rounded-xl">
        <Users className="h-6 w-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">Today's Contacts</p>
        <p className="text-3xl font-bold text-primary">{count}</p>
      </div>
    </div>
  );
};
