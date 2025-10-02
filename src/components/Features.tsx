import { Rocket, Users, TrendingUp, Shield, Zap, Heart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Instant Growth",
      description: "Watch your WhatsApp status views multiply as participants save your contact automatically.",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Users,
      title: "Community Power",
      description: "Join thousands of users helping each other grow their audience organically.",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your growth with real-time analytics and see your reach expand daily.",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your data is protected with enterprise-grade security. We never share your information.",
      gradient: "from-secondary/20 to-secondary/5"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in minutes, not months. Our automated system works 24/7 for you.",
      gradient: "from-primary/20 to-primary/5"
    },
    {
      icon: Heart,
      title: "Easy to Use",
      description: "Simple interface, powerful results. No technical knowledge required to get started.",
      gradient: "from-secondary/20 to-secondary/5"
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm border border-primary/20">
            <Zap className="w-4 h-4" />
            <span>Why Choose BoostWhats</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            Powerful Features for
            <span className="block text-primary mt-2">Maximum Growth</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to boost your WhatsApp presence and reach thousands of viewers
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-2 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10 space-y-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
