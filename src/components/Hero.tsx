import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.png";
import beeMascot from "@/assets/bee-mascot.png";

const Hero = () => {
  return (
    <section id="home" className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(45_93%_88%),transparent_50%)] opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(38_92%_85%),transparent_50%)] opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <img src={beeMascot} alt="Bee mascot" className="w-8 h-8" />
              <span className="text-sm font-medium text-primary">Grow Your WhatsApp Presence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Need More Viewers For Your{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                WhatsApp Status?
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground">
              Grow your WhatsApp audience and views as you and other participants save each other's contacts in just one click. Join the hive today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button variant="hero" size="lg" className="text-lg">
                Submit Entry
              </Button>
              <Button variant="outline" size="lg" className="text-lg">
                Download Contacts
              </Button>
            </div>
            
            <div className="flex items-center space-x-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>100% Free to Start</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span>Daily Updates</span>
              </div>
            </div>
          </div>
          
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent opacity-20 blur-3xl rounded-full" />
            <img
              src={heroImage}
              alt="People connecting through WhatsApp"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
