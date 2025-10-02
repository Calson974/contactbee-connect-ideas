import { Button } from "@/components/ui/button";
import { Check, Zap, Crown } from "lucide-react";

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
    <section id="pricing" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm border border-primary/20">
            <Crown className="w-4 h-4" />
            <span>Simple Pricing</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Choose Your
            <span className="block text-primary mt-2">Growth Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free and upgrade when you're ready to supercharge your growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card border-2 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 animate-scale-in ${
                plan.popular 
                  ? 'border-primary shadow-2xl hover:shadow-primary/20' 
                  : 'border-border hover:border-primary/50 hover:shadow-lg'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-semibold text-sm shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    plan.popular ? 'bg-primary' : 'bg-primary/10'
                  }`}>
                    <plan.icon className={`w-7 h-7 ${
                      plan.popular ? 'text-primary-foreground' : 'text-primary'
                    }`} />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <Button 
                  className={`w-full py-6 text-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl hover:scale-105'
                      : 'border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.buttonText}
                </Button>

                <div className="space-y-4 pt-6 border-t border-border">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-12">
          All plans include 30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
};

export default Pricing;
