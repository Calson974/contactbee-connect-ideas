import { Button } from "@/components/ui/button";
import heroWomanPhone from "@/assets/hero-woman-phone.png";
import beeMascot from "@/assets/bee-mascot.png";
import beeThumbsUp from "@/assets/bee-thumbs-up.png";
import statusViews from "@/assets/status-views.png";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-32 relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,hsl(45_93%_88%),transparent_40%)] opacity-40 animate-pulse" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,hsl(38_92%_85%),transparent_40%)] opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Floating bee illustration */}
      <img 
        src={beeThumbsUp} 
        alt="" 
        className="absolute top-32 right-[15%] w-16 md:w-24 opacity-20 animate-bounce"
        style={{ animationDuration: '3s' }}
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-fade-in z-10">
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-primary/20 to-accent/20 px-5 py-3 rounded-full border-2 border-primary/30 backdrop-blur-sm">
              <img src={beeMascot} alt="Bee mascot" className="w-10 h-10 animate-bounce" style={{ animationDuration: '2s' }} />
              <span className="text-sm font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                🚀 Grow Your WhatsApp Presence
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight">
              Need More Viewers For Your{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  WhatsApp Status?
                </span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 300 12" fill="none">
                  <path d="M2 10C100 2 200 2 298 10" stroke="hsl(45 93% 58%)" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Grow your WhatsApp audience and views as you and other participants save each other's contacts in just one click. Join the hive today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <Button variant="hero" size="lg" className="text-lg py-6 px-10 rounded-xl shadow-lg hover:scale-105 transition-transform">
                🐝 Submit Entry
              </Button>
              <Button variant="outline" size="lg" className="text-lg py-6 px-10 rounded-xl hover:scale-105 transition-transform">
                📥 Download Contacts
              </Button>
            </div>
            
            <div className="flex flex-wrap items-center gap-8 pt-6">
              <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="font-medium">100% Free to Start</span>
              </div>
              <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                <span className="font-medium">Daily Updates</span>
              </div>
              <div className="flex items-center space-x-3 bg-card/50 backdrop-blur-sm px-4 py-2 rounded-full border border-border">
                <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                <span className="font-medium">10K+ Users</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            {/* Main hero image - woman with phone */}
            <div className="relative z-10">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary via-accent to-secondary opacity-30 blur-3xl animate-pulse" />
              <img
                src={heroWomanPhone}
                alt="Excited woman viewing WhatsApp status"
                className="relative rounded-[3rem] shadow-2xl w-full transform hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Floating status views illustration */}
            <img 
              src={statusViews} 
              alt="" 
              className="absolute -bottom-12 -left-12 w-48 md:w-64 drop-shadow-2xl animate-float z-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
