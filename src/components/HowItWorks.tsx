import { UserPlus, Users, TrendingUp, Sparkles } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Sign Up",
      description: "Create your free account in seconds. No credit card required to start.",
    },
    {
      icon: Users,
      title: "Join Community",
      description: "Connect with thousands of users ready to save each other's contacts.",
    },
    {
      icon: TrendingUp,
      title: "Watch Growth",
      description: "Sit back as your WhatsApp status views multiply automatically.",
    },
    {
      icon: Sparkles,
      title: "Maximize Reach",
      description: "Upgrade to premium for unlimited growth and advanced features.",
    }
  ];

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden bg-background">
      {/* Diagonal split background */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
        style={{ clipPath: 'polygon(0 20%, 100% 0, 100% 80%, 0 100%)' }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <div className="text-center mb-24 space-y-6 animate-fade-in">
          <h2 className="text-6xl lg:text-7xl font-black">
            <span className="inline-block transform -rotate-1">Get Started</span>
            <br />
            <span className="inline-block text-primary transform rotate-1">In Minutes</span>
          </h2>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to explosive growth
          </p>
        </div>

        {/* Vertical timeline with alternating sides */}
        <div className="max-w-6xl mx-auto relative">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary hidden lg:block transform -translate-x-1/2" />
          
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row gap-12 items-center animate-fade-in ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-card border-2 border-border rounded-3xl p-8 hover:border-primary transition-all duration-300 hover:-translate-y-2 shadow-xl">
                    <div className={`flex items-start gap-6 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="flex-1 space-y-4">
                        <div className={`inline-block bg-primary/10 text-primary px-4 py-2 rounded-full font-bold text-sm ${index % 2 === 0 ? 'lg:float-right lg:ml-4' : ''}`}>
                          Step {index + 1}
                        </div>
                        <h3 className="text-4xl font-black clear-both">
                          {step.title}
                        </h3>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Center icon */}
                <div className="relative flex-shrink-0 z-10">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:blur-3xl transition-all" />
                    <div className="relative w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-2xl border-4 border-background transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                      <step.icon className="w-16 h-16 text-primary-foreground" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-24 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="inline-block bg-gradient-to-r from-primary to-secondary text-primary-foreground px-12 py-6 rounded-full font-black text-2xl shadow-2xl hover:scale-110 transition-transform cursor-pointer">
            Ready to Explode Your Growth? →
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
