import opportunitiesImg from "@/assets/opportunities.png";
import popularityImg from "@/assets/popularity.png";
import contentImg from "@/assets/content.png";
import salesImg from "@/assets/sales.png";
import networkPeople from "@/assets/network-people.png";
import growthChart from "@/assets/growth-chart.png";
import beeCommunity from "@/assets/bee-community.png";

const features = [
  {
    title: "Better Opportunities",
    description: "Discover new sources of income and expand your business network through genuine connections",
    image: opportunitiesImg,
    gradient: "from-amber-400 to-orange-500",
  },
  {
    title: "More Popularity",
    description: "Increase your reach as more people discover you and what you do",
    image: popularityImg,
    gradient: "from-yellow-400 to-amber-500",
  },
  {
    title: "Engaging Content",
    description: "View interesting status updates from diverse people in your expanded network",
    image: contentImg,
    gradient: "from-orange-400 to-red-500",
  },
  {
    title: "More Sales",
    description: "Connect with potential clients who are genuinely interested in your products",
    image: salesImg,
    gradient: "from-amber-500 to-yellow-600",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-honey-light/5 to-background" />
      <img 
        src={networkPeople} 
        alt="" 
        className="absolute top-20 right-0 w-72 opacity-10 pointer-events-none"
      />
      <img 
        src={beeCommunity} 
        alt="" 
        className="absolute bottom-20 left-0 w-80 opacity-10 pointer-events-none"
      />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-20 space-y-6 animate-fade-in">
          <div className="inline-block">
            <span className="text-sm font-bold uppercase tracking-wider text-primary mb-2 block">
              ✨ Benefits
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Why Join the{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  ContactBee Hive?
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-3 bg-primary/20 -rotate-1 -z-10" />
              </span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Unlock amazing benefits when you join our thriving community of entrepreneurs, creators, and professionals
          </p>
        </div>

        {/* Feature grid with creative layout */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Feature card */}
              <div className="relative p-8 md:p-10 bg-card/50 backdrop-blur-sm rounded-3xl border-2 border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
                
                {/* Floating image - no container */}
                <div className="relative mb-6 flex justify-center">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-28 h-28 object-contain drop-shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                  />
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-500`} />
                </div>
                
                {/* Content */}
                <div className="relative text-center space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Number badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional floating illustration */}
        <div className="mt-20 flex justify-center">
          <img 
            src={growthChart} 
            alt="" 
            className="w-64 md:w-80 drop-shadow-2xl opacity-80 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
