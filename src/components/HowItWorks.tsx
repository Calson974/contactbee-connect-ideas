import { CreditCard, FileText, Lock, Download, ArrowRight } from "lucide-react";
import beeCommunity from "@/assets/bee-community.png";

const steps = [
  {
    icon: CreditCard,
    title: "Select Plan",
    description: "Choose either the FREE or PREMIUM package depending on which best suits you.",
    color: "from-yellow-400 to-amber-500",
  },
  {
    icon: FileText,
    title: "Fill Information",
    description: "Enter the name you'd like others to identify you as and your correct WhatsApp number.",
    color: "from-amber-400 to-orange-500",
  },
  {
    icon: Lock,
    title: "Secure Password",
    description: "After submission, you'll receive a unique password required to download the contact file.",
    color: "from-orange-400 to-red-400",
  },
  {
    icon: Download,
    title: "Download Contacts",
    description: "The contact file will be uploaded by 9:00 PM in .VCF format, ready to be saved by all participants.",
    color: "from-amber-500 to-yellow-600",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-honey-light/5 to-background" />
      <img 
        src={beeCommunity} 
        alt="" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] opacity-5 pointer-events-none"
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <span className="inline-block text-sm font-bold uppercase tracking-wider text-primary mb-2">
            📋 How It Works
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            4 Easy{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Steps to Success
              </span>
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Get lots of people viewing your status in just four simple steps
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative max-w-7xl mx-auto">
          {/* Connection lines for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative group animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Arrow connector for desktop */}
                {index < steps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-24 -right-4 w-8 h-8 text-primary/40 z-10" />
                )}
                
                <div className="relative p-8 bg-card/50 backdrop-blur-sm rounded-3xl border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 h-full">
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                  
                  {/* Step number */}
                  <div className={`absolute -top-6 -left-6 w-14 h-14 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-xl transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>
                    {index + 1}
                  </div>
                  
                  <div className="relative pt-6 space-y-5">
                    {/* Icon */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${step.color} opacity-10 rounded-2xl flex items-center justify-center mx-auto group-hover:opacity-20 transition-opacity relative`}>
                      <Icon className={`w-10 h-10 text-primary group-hover:scale-110 transition-transform`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-center">{step.title}</h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Ready to grow your WhatsApp presence?
          </p>
          <div className="flex justify-center gap-4">
            <div className="flex items-center space-x-2 bg-primary/10 px-6 py-3 rounded-full border border-primary/30">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="font-semibold text-sm">Simple & Fast</span>
            </div>
            <div className="flex items-center space-x-2 bg-accent/10 px-6 py-3 rounded-full border border-accent/30">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="font-semibold text-sm">Join 10K+ Users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
