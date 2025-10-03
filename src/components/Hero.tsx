import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import heroWoman from "@/assets/hero-woman-phone.png";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Diagonal split background */}
      <div className="absolute inset-0 bg-background" />
      <div 
        className="absolute inset-0 bg-primary/5" 
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0 100%)' }}
      />
      
      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border-4 border-primary/20 rotate-12 animate-pulse" />
      <div className="absolute bottom-40 left-10 w-24 h-24 bg-primary/10 rounded-full animate-float" />
      <div className="absolute top-1/2 right-1/3 w-16 h-16 border-4 border-primary/30 rounded-full" style={{ animationDelay: '0.5s' }} />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Unconventional layout - overlapping elements */}
          <div className="relative">
            {/* Main content - offset positioning */}
            <div className="max-w-3xl space-y-6 animate-fade-in">
              <div className="inline-block">
                <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold text-sm tracking-wider uppercase transform -rotate-2 shadow-lg">
                  🚀 Viral Growth Engine
                </div>
              </div>
              
              <h1 className="text-7xl lg:text-8xl font-black leading-none tracking-tight">
                <span className="inline-block transform -rotate-1">Explode</span>
                <br />
                <span className="inline-block text-primary transform rotate-1">Your</span>
                <br />
                <span className="inline-block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent transform -rotate-1">
                  Status Views
                </span>
              </h1>
              
              <p className="text-2xl text-muted-foreground max-w-xl leading-relaxed pl-4 border-l-4 border-primary">
                The community-powered platform where contacts multiply and status views go exponential.
              </p>
            </div>

            {/* Image positioned absolutely - overlapping */}
            <div className="absolute -right-20 top-0 w-[600px] h-[600px] hidden lg:block animate-scale-in">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
                <img 
                  src={heroWoman} 
                  alt="User success"
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                  style={{ transform: 'rotate(-5deg)' }}
                />
                {/* Decorative elements around image */}
                <div className="absolute -top-10 -left-10 bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold shadow-xl transform rotate-12 animate-float">
                  +500% Views
                </div>
                <div className="absolute -bottom-10 left-20 bg-card border-2 border-primary px-6 py-3 rounded-2xl font-bold shadow-xl transform -rotate-6 animate-float" style={{ animationDelay: '0.5s' }}>
                  10K+ Users
                </div>
              </div>
            </div>

            {/* CTAs - creative positioning */}
            <div className="flex flex-wrap gap-6 mt-12 items-center">
              <Button 
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl px-12 py-8 rounded-full shadow-2xl hover:shadow-primary/50 hover:scale-110 transition-all group"
              >
                Get Started Free
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="font-bold text-lg px-10 py-8 rounded-full border-2 hover:bg-primary/5 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:scale-125 transition-transform" />
                Watch Demo
              </Button>

              {/* Stats - horizontal inline */}
              <div className="flex gap-8 ml-8 border-l-2 border-border pl-8">
                <div>
                  <div className="text-3xl font-black text-primary">847K</div>
                  <div className="text-sm text-muted-foreground font-medium">Status Views</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-primary">12K+</div>
                  <div className="text-sm text-muted-foreground font-medium">Active Users</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative wave */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
