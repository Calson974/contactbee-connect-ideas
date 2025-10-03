import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ChevronDown } from "lucide-react";

const SubmissionForm = () => {
  const [planType, setPlanType] = useState("free");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [showOptional, setShowOptional] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Optional fields
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [website, setWebsite] = useState("");
  const [customField, setCustomField] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("submissions").insert({
        plan_type: planType,
        name: planType === "free" ? name.slice(0, 8) : name,
        phone,
        country,
        company: company || null,
        email: email || null,
        job_title: jobTitle || null,
        website: website || null,
        custom_field: customField || null,
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
      setCustomField("");
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
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto p-8 border-2 border-border bg-card/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">
              Submit Your{" "}
              <span className="text-primary">
                Entry
              </span>
            </h2>
            <p className="text-muted-foreground">
              Start growing your WhatsApp audience today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base font-semibold">Package Type</Label>
              <RadioGroup value={planType} onValueChange={setPlanType}>
                <div className="flex items-center space-x-3 p-4 border-2 border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="free" id="free" />
                  <Label htmlFor="free" className="flex-1 cursor-pointer">
                    <span className="font-semibold">Free</span>
                    <span className="block text-sm text-muted-foreground">
                      For personal use - Maximum 8 characters
                    </span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border-2 border-border rounded-lg hover:border-primary transition-colors cursor-pointer">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="flex-1 cursor-pointer">
                    <span className="font-semibold">Premium ($1)</span>
                    <span className="block text-sm text-muted-foreground">
                      For businesses - Unlimited characters
                    </span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Name {planType === "free" && <span className="text-sm text-muted-foreground">(Max 8 characters)</span>}
              </Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={planType === "free" ? 8 : undefined}
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
              <p className="text-sm text-muted-foreground">
                Include country code (e.g., +1 for USA)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country" className="text-base font-semibold">
                Country
              </Label>
              <Select value={country} onValueChange={setCountry} required>
                <SelectTrigger className="text-base">
                  <SelectValue placeholder="Select your country" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  <SelectItem value="US">United States</SelectItem>
                  <SelectItem value="GB">United Kingdom</SelectItem>
                  <SelectItem value="CA">Canada</SelectItem>
                  <SelectItem value="AU">Australia</SelectItem>
                  <SelectItem value="NG">Nigeria</SelectItem>
                  <SelectItem value="GH">Ghana</SelectItem>
                  <SelectItem value="KE">Kenya</SelectItem>
                  <SelectItem value="ZA">South Africa</SelectItem>
                  <SelectItem value="IN">India</SelectItem>
                  <SelectItem value="PK">Pakistan</SelectItem>
                  <SelectItem value="BD">Bangladesh</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="ES">Spain</SelectItem>
                  <SelectItem value="IT">Italy</SelectItem>
                  <SelectItem value="BR">Brazil</SelectItem>
                  <SelectItem value="MX">Mexico</SelectItem>
                  <SelectItem value="AR">Argentina</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
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
                  <Label htmlFor="customField" className="text-base">
                    Custom Field
                  </Label>
                  <Input
                    id="customField"
                    placeholder="Any custom information"
                    value={customField}
                    onChange={(e) => setCustomField(e.target.value)}
                    className="text-base"
                  />
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
