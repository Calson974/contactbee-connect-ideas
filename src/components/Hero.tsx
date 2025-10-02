import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Zap } from "lucide-react";
import heroWoman from "@/assets/hero-woman-phone.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      
      {/* Animated circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-medium text-sm border border-primary/20">
              <Zap className="w-4 h-4" />
              <span>Boost Your WhatsApp Reach</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Amplify Your
              <span className="block text-primary mt-2">WhatsApp Status</span>
              <span className="block mt-2">Audience</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Join a community where everyone saves each other's contacts. Watch your WhatsApp status views skyrocket as you expand your reach effortlessly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all hover:scale-105 group"
              >
                Start Growing Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="font-semibold text-lg px-8 py-6 border-2 hover:border-primary hover:text-primary transition-all"
              >
                Learn More
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">500%</div>
                  <div className="text-sm text-muted-foreground">Avg. View Increase</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="relative z-10">
              <img 
                src={heroWoman} 
                alt="Excited woman using WhatsApp" 
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
            
            {/* Floating cards */}
            <div className="absolute top-10 -left-10 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">+2,453</div>
                  <div className="text-xs text-muted-foreground">New Views</div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-20 -right-10 bg-card border border-border rounded-2xl p-4 shadow-lg animate-float" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold">+847</div>
                  <div className="text-xs text-muted-foreground">Contacts Added</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
