import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const Pricing = () => {
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Plan
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Select the package that best suits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 border-2 border-border hover:border-primary transition-colors">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-muted-foreground">Perfect for personal use</p>
              </div>
              
              <div>
                <span className="text-4xl font-bold">$0</span>
                <span className="text-muted-foreground">/forever</span>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Maximum of 8 characters for name</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Contacts saved with "CB" suffix (e.g., John CB)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Daily contact file updates</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Access to community features</span>
                </li>
              </ul>

              <Button variant="outline" size="lg" className="w-full">
                Get Started Free
              </Button>
            </div>
          </Card>

          <Card className="p-8 border-2 border-primary bg-gradient-to-br from-primary/5 via-accent/5 to-background relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-accent text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
              POPULAR
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-muted-foreground">For businesses & brands</p>
              </div>
              
              <div>
                <span className="text-4xl font-bold">$1</span>
                <span className="text-muted-foreground">/one-time</span>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Unlimited character name length</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Custom spaced names with suffix (e.g., John Store CB)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Priority listing in contact file</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Perfect for WhatsApp TV, businesses, & influencers</span>
                </li>
              </ul>

              <Button variant="hero" size="lg" className="w-full">
                Upgrade to Premium
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
