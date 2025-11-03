import { Users, Zap, ThumbsUp, BarChart2 } from "lucide-react";

const stats = [
  { icon: Users, value: "10,000+", label: "Active Users" },
  { icon: Zap, value: "1M+", label: "Daily Views" },
  { icon: ThumbsUp, value: "98%", label: "Satisfaction" },
  { icon: BarChart2, value: "10x", label: "Growth" },
];

const StatsBanner = () => {
  return (
    <div className="bg-gradient-to-r from-primary/5 via-background to-secondary/5 py-8 border-y border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-4 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
                <stat.icon className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBanner;
