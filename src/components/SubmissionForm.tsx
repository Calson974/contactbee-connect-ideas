import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";
import { format, startOfDay } from "date-fns";

const SubmissionForm = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [todaysCount, setTodaysCount] = useState<number | null>(null);
  const [isLoadingCount, setIsLoadingCount] = useState(true);

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
    const subscription = supabase
      .channel('submissions')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'submissions' 
        }, 
        () => {
          fetchTodaysCount();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  // Optional fields
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [customFieldLabel, setCustomFieldLabel] = useState("");
  const [customFieldValue, setCustomFieldValue] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const contactName = name.slice(0, 8);
      const nameWithBW = contactName.endsWith(' BW') ? contactName : `${contactName} BW`;
      
      const { error } = await supabase.from("submissions").insert({
        plan_type: "free",
        name: nameWithBW,
        phone,
        country,
        company: company || null,
        email: email || null,
        job_title: jobTitle || null,
        website: website || null,
        custom_field_label: customFieldLabel || null,
        custom_field: customFieldValue || null,
        address: address || null,
        notes: notes || null,
      });

      if (error) throw error;

      toast.success("Entry submitted successfully! Your contact will be included in today's vCard file.");
      
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
      toast.error("Failed to submit entry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="submit-form" className="py-16 md:py-24 scroll-mt-20">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 border-2 border-border bg-card/80 backdrop-blur-sm relative overflow-hidden">
          {/* Chat icon positioned in the top-right corner */}
          <div className="absolute top-4 right-4 w-16 h-16 z-10">
            <img 
              src="/img/svg/oc-chatting.svg" 
              alt="Chatting illustration" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Submit Your{" "}
              <span className="text-primary">
                Entry
              </span>
            </h2>
            <p className="text-muted-foreground mb-3">
              Start growing your WhatsApp audience today
            </p>
            {!isLoadingCount && todaysCount !== null && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-muted/50 text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                {todaysCount.toLocaleString()} contacts added today
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold">
                WhatsApp Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 234 567 8900"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-base font-semibold">
                Country
              </Label>
              <CountrySelect
                value={country}
                onChange={setCountry}
                required
              />
            </div>

            <Collapsible open={showOptional} onOpenChange={setShowOptional}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-between"
                >
                  <span>Add Optional Information</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${showOptional ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-base">
                    Company
                  </Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-base">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-base">
                    Job Title
                  </Label>
                  <Input
                    id="jobTitle"
                    placeholder="Your job title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-base">
                    Website
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourwebsite.com"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-base">Custom Field</Label>
                  <div className="space-y-2">
                    <Input
                      id="customFieldLabel"
                      placeholder="Field name (e.g., Birthday, Favorite Color)"
                      value={customFieldLabel}
                      onChange={(e) => setCustomFieldLabel(e.target.value)}
                      className="text-base"
                    />
                    <Input
                      id="customFieldValue"
                      placeholder="Field value"
                      value={customFieldValue}
                      onChange={(e) => setCustomFieldValue(e.target.value)}
                      className="text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-base">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="Your full address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="text-base"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-base">
                    Notes
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Additional notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="text-base"
                    rows={3}
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            <Button 
              type="submit" 
              size="lg" 
              className="w-full text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Entry"}
            </Button>

            <p className="text-sm text-center text-muted-foreground">
              By submitting, you agree to our terms and conditions. You'll receive a password to download the daily contact file.
            </p>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default SubmissionForm;
