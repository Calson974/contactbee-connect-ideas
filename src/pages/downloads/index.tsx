import DownloadVCards from "@/components/DownloadVCards";
import { LiveCounter } from "@/components/LiveCounter";
import { CompiledContactsList } from "@/components/CompiledContactsList";

export default function DownloadsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Download <span className="text-primary">Contact Lists</span>
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Download the latest contact lists to boost your WhatsApp status views
        </p>
        
        <div className="bg-card p-6 rounded-lg shadow-sm border border-border/50 mb-12">
          <div className="flex flex-col items-center justify-center mb-8">
            <LiveCounter />
          </div>
          <DownloadVCards />
          
          {/* Previously Compiled Contacts */}
          <div className="mt-12">
            <CompiledContactsList />
          </div>
        </div>
      </div>
    </div>
  );
}
