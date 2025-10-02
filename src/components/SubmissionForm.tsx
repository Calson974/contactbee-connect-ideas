import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import { toast } from "sonner";

const SubmissionForm = () => {
  const [planType, setPlanType] = useState("free");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Entry submitted successfully! Check your email for your password.");
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

            <Button type="submit" size="lg" className="w-full text-base bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
              Submit Entry
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
