import { UserPlus, Users, TrendingUp, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your free account in seconds. No credit card required to start.",
      color: "from-primary/20 to-primary/5"
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with thousands of users ready to save each other's contacts.",
      color: "from-secondary/20 to-secondary/5"
    },
    {
      icon: TrendingUp,
      title: "Watch Growth",
      description: "Sit back as your WhatsApp status views multiply automatically.",
      color: "from-primary/20 to-primary/5"
    },
    {
      icon: Sparkles,
      title: "Maximize Reach",
      description: "Upgrade to premium for unlimited growth and advanced features.",
      color: "from-secondary/20 to-secondary/5"
    }
  ];

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 space-y-4 animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm border border-primary/20">
            <Sparkles className="w-4 h-4" />
            <span>Simple Process</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold">
            How It Works
            <span className="block text-primary mt-2">In 4 Easy Steps</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps and watch your audience grow
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative bg-card border-2 border-border rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg h-full">
                <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <step.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
