import { Rocket, Users, TrendingUp, Shield, Zap, Heart } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Rocket,
      title: "Instant Growth",
      description: "Watch your WhatsApp status views multiply as participants save your contact automatically.",
      position: "top-left"
    },
    {
      icon: Users,
      title: "Community Power",
      description: "Join thousands of users helping each other grow their audience organically.",
      position: "top-right"
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your growth with real-time analytics and see your reach expand daily.",
      position: "middle-left"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Your data is protected with enterprise-grade security. We never share your information.",
      position: "middle-right"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in minutes, not months. Our automated system works 24/7 for you.",
      position: "bottom-left"
    },
    {
      icon: Heart,
      title: "Easy to Use",
      description: "Simple interface, powerful results. No technical knowledge required to get started.",
      position: "bottom-right"
    },
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden bg-gradient-to-b from-background/50 via-muted/40 to-muted">
      {/* Diagonal decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 transform skew-x-12" />
      <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-secondary/5 transform -skew-x-12" />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Centered title with unique styling */}
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <h2 className="text-6xl lg:text-7xl font-black">
            <span className="inline-block transform -rotate-2">Why</span>{" "}
            <span className="inline-block text-primary transform rotate-2">BoostWhats</span>
            <br />
            <span className="inline-block bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
              Wins Every Time
            </span>
          </h2>
        </div>

        {/* Zigzag/Alternating layout */}
        <div className="space-y-32 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row gap-12 items-center animate-fade-in ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon side */}
              <div className="flex-1 flex justify-center">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
                  <div className="relative w-48 h-48 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border-4 border-background shadow-2xl">
                    <feature.icon className="w-24 h-24 text-primary" strokeWidth={1.5} />
                  </div>
                  {/* Decorative number */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-black text-2xl shadow-xl">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content side */}
              <div className="flex-1 space-y-4">
                <h3 className="text-4xl lg:text-5xl font-black leading-tight">
                  {feature.title}
                </h3>
                <div className="w-20 h-1 bg-primary rounded-full" />
                <p className="text-xl text-muted-foreground leading-relaxed">
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
