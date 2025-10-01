import { Card } from "@/components/ui/card";
import opportunitiesImg from "@/assets/opportunities.png";
import popularityImg from "@/assets/popularity.png";
import contentImg from "@/assets/content.png";
import salesImg from "@/assets/sales.png";

const features = [
  {
    title: "Better Opportunities",
    description: "Discover new sources of income and expand your business network",
    image: opportunitiesImg,
  },
  {
    title: "More Popularity",
    description: "More people get to know about you and what you do",
    image: popularityImg,
  },
  {
    title: "Engaging Content",
    description: "View lots of interesting status updates from diverse people",
    image: contentImg,
  },
  {
    title: "More Sales",
    description: "Find more clients interested in your products and services",
    image: salesImg,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-background to-honey-light/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Why Join the{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ContactBee Hive?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Unlock amazing benefits when you join our growing community
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-2 border-2 border-border/50 bg-card/80 backdrop-blur-sm"
            >
              <div className="mb-4 relative">
                <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-xl" />
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="relative w-20 h-20 mx-auto object-contain"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-center">{feature.title}</h3>
              <p className="text-muted-foreground text-center text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
