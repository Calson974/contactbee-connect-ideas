import { Card } from "@/components/ui/card";
import { CreditCard, FileText, Lock, Download } from "lucide-react";

const steps = [
  {
    icon: CreditCard,
    title: "Select Plan",
    description: "Choose either the FREE or PREMIUM package depending on which best suits you.",
  },
  {
    icon: FileText,
    title: "Fill Information",
    description: "Enter the name you'd like others to identify you as and your correct WhatsApp number.",
  },
  {
    icon: Lock,
    title: "Secure Password",
    description: "After submission, you'll receive a unique password required to download the contact file.",
  },
  {
    icon: Download,
    title: "Download Contacts",
    description: "The contact file will be uploaded by 9:00 PM in .VCF format, ready to be saved by all participants.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-b from-honey-light/10 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            4 Easy{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Steps
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get lots of people viewing your status in just four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card
                key={index}
                className="p-6 relative hover:shadow-[var(--shadow-glow)] transition-all duration-300 border-2 border-border/50 bg-card/80 backdrop-blur-sm"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
                
                <div className="pt-4 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center text-sm">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
