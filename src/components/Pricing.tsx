import { Button } from "@/components/ui/button";
import { Check, Sparkles, Zap } from "lucide-react";
import beeMascot from "@/assets/bee-mascot.png";

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-honey-light/10 via-background to-background" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-primary mb-2">
            💰 Pricing Plans
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Choose Your{" "}
            <span className="relative">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Perfect Plan
              </span>
              <Sparkles className="absolute -top-6 -right-8 w-6 h-6 text-primary animate-pulse" />
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Start free forever or unlock premium features for just $1 one-time payment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="group relative animate-fade-in">
            <div className="relative p-10 bg-card border-2 border-border hover:border-primary/50 rounded-3xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
                    <span className="text-xs font-bold uppercase tracking-wide">Starter</span>
                  </div>
                  <h3 className="text-3xl font-extrabold">Free</h3>
                  <p className="text-muted-foreground text-lg">Perfect for getting started</p>
                </div>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-extrabold">$0</span>
                  <span className="text-xl text-muted-foreground">/forever</span>
                </div>

                <div className="h-px bg-border" />

                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-base">Maximum of 8 characters for name</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-base">Contacts saved with "CB" suffix</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-base">Daily contact file updates</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-primary/10 p-1">
                      <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-base">Access to community features</span>
                  </li>
                </ul>

                <Button variant="outline" size="lg" className="w-full text-lg py-6 rounded-xl hover:scale-105 transition-transform">
                  Get Started Free
                </Button>
              </div>
            </div>
          </div>

          {/* Premium Plan */}
          <div className="group relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500" />
            
            <div className="relative p-10 bg-gradient-to-br from-card via-card to-primary/5 border-2 border-primary rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-[0_0_50px_rgba(251,191,36,0.3)] hover:-translate-y-2">
              {/* Popular badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full shadow-lg font-bold text-sm">
                <Zap className="w-4 h-4" />
                <span>MOST POPULAR</span>
              </div>

              {/* Floating bee mascot */}
              <img 
                src={beeMascot} 
                alt="" 
                className="absolute -right-4 -top-4 w-20 h-20 animate-float opacity-80"
              />
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 rounded-full border border-primary/30">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      Premium
                    </span>
                  </div>
                  <h3 className="text-3xl font-extrabold">Premium</h3>
                  <p className="text-muted-foreground text-lg">For businesses & influencers</p>
                </div>
                
                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    $1
                  </span>
                  <span className="text-xl text-muted-foreground">/one-time</span>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

                <ul className="space-y-4">
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-medium">Unlimited character name length</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-medium">Custom spaced names with suffix</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-medium">Priority listing in contact file</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="mt-1 rounded-full bg-gradient-to-br from-primary to-accent p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-medium">Perfect for WhatsApp TV & brands</span>
                  </li>
                </ul>

                <Button variant="hero" size="lg" className="w-full text-lg py-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
                  🚀 Upgrade to Premium
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span>One-time payment, lifetime access</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent rounded-full" />
            <span>No hidden fees</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-secondary rounded-full" />
            <span>Instant activation</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
