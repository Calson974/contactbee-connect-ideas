import { Button } from "@/components/ui/button";
import { Check, Zap, Crown, Star } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free Plan",
      price: "0",
      description: "Perfect for getting started",
      icon: Zap,
      features: [
        "Up to 50 contact saves",
        "Basic analytics",
        "Community access",
        "Email support",
        "7-day trial"
      ],
      popular: false,
      buttonText: "Start Free"
    },
    {
      name: "Premium Plan",
      price: "9.99",
      description: "For serious growth",
      icon: Crown,
      features: [
        "Unlimited contact saves",
        "Advanced analytics dashboard",
        "Priority community access",
        "24/7 priority support",
        "Custom targeting",
        "API access",
        "Growth tools & resources"
      ],
      popular: true,
      buttonText: "Go Premium"
    }
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      {/* Unique background pattern */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary) / 0.05) 0%, transparent 50%),
                         radial-gradient(circle at 80% 80%, hsl(var(--secondary) / 0.05) 0%, transparent 50%)`
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Unique title treatment */}
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-8 py-4 rounded-full font-bold text-lg border-2 border-primary/30 transform -rotate-1">
            <Star className="w-6 h-6 fill-primary" />
            <span>Choose Your Power Level</span>
            <Star className="w-6 h-6 fill-primary" />
          </div>
          
          <h2 className="text-6xl lg:text-7xl font-black">
            <span className="inline-block">Simple</span>{" "}
            <span className="inline-block text-primary transform rotate-2">Transparent</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>
        </div>

        {/* Overlapping cards design */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-0">
            {/* Free Plan - Behind */}
            <div className="lg:pr-6 lg:pt-12 animate-fade-in">
              <div className="relative bg-card border-2 border-border rounded-3xl p-10 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 shadow-xl h-full">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Zap className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-3xl font-black mb-2">{plans[0].name}</h3>
                    <p className="text-muted-foreground text-lg">{plans[0].description}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black">$0</span>
                    <span className="text-xl text-muted-foreground">/forever</span>
                  </div>

                  <Button 
                    variant="outline"
                    className="w-full py-7 text-xl font-bold border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-2xl"
                  >
                    {plans[0].buttonText}
                  </Button>

                  <div className="space-y-4 pt-6 border-t-2 border-border">
                    {plans[0].features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-4 h-4 text-primary" strokeWidth={3} />
                        </div>
                        <span className="text-foreground text-lg">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Plan - Front and elevated */}
            <div className="lg:pl-6 lg:-mt-12 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-[3px] hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-4 h-full">
                {/* Popular badge */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-8 py-3 rounded-full font-black text-sm tracking-wider uppercase shadow-xl z-10">
                  ⚡ MOST POPULAR ⚡
                </div>
                
                <div className="bg-card rounded-3xl p-10 h-full">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                        <Crown className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-3xl font-black mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        {plans[1].name}
                      </h3>
                      <p className="text-muted-foreground text-lg">{plans[1].description}</p>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ${plans[1].price}
                      </span>
                      <span className="text-xl text-muted-foreground">/month</span>
                    </div>

                    <Button 
                      className="w-full py-7 text-xl font-black bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all rounded-2xl"
                    >
                      {plans[1].buttonText} →
                    </Button>

                    <div className="space-y-4 pt-6 border-t-2 border-border">
                      {plans[1].features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Check className="w-4 h-4 text-primary-foreground" strokeWidth={3} />
                          </div>
                          <span className="text-foreground text-lg font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-lg text-muted-foreground mt-16 font-medium">
          💚 30-day money-back guarantee • No questions asked • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default Pricing;
