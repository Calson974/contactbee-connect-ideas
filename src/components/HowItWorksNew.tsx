import { motion } from "framer-motion";
import { UserPlus, Users, TrendingUp, Download, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

const HowItWorksNew = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Submit Your Contact",
      description: "Fill out our simple form with your WhatsApp contact details. Takes less than 2 minutes!",
      color: "from-primary to-secondary",
      details: ["Select your use case, could be Personal or Proffessional.", "Fill in your information", "Submit your information"]
    },
    {
      icon: Download,
      title: "Download Contact Pool",
      description: "Get access to our daily-updated vCard file containing hundreds of active community members.",
      color: "from-secondary to-primary",
      details: ["Daily updates at 9:00PM", "Verified contacts", "Easy import"]
    },
    {
      icon: Users,
      title: "Import to WhatsApp",
      description: "Simply import the vCard file to your phone's contacts. All contacts added automatically!",
      color: "from-primary to-accent",
      details: ["One-click import", "Auto-save contacts", "Instant sync"]
    },
    {
      icon: TrendingUp,
      title: "Watch Growth Happen",
      description: "Post your status and watch your views multiply as hundreds see your content organically.",
      color: "from-accent to-primary",
      details: ["Exponential reach", "Real engagement", "Submiting your contact daily increases your chances of growing faster."]
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Simple & Effective</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
            How It
            <span className="text-primary">
              {" "}Works
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Four simple steps to transform your WhatsApp status views from dozens to thousands
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative mb-12 lg:mb-16 last:mb-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-[52px] top-[120px] w-1 h-[calc(100%+2rem)] bg-gradient-to-b from-purple-300 to-transparent dark:from-purple-700 dark:to-transparent" />
              )}

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
                  {/* Number Badge */}
                  <motion.div
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-2xl lg:text-3xl font-black text-white">{index + 1}</span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`hidden sm:flex w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br ${step.color} items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <step.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2} />
                  </motion.div>

                  {/* Arrow for Desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    </motion.div>
                  )}
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 group"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-full bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/50 transition-all duration-300 group">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-all">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <div className="mt-6 pt-6 border-t border-border">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${step.color} opacity-5 rounded-2xl transform translate-x-4 -translate-y-4 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-300`} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="#submit-form"
            className="group relative overflow-hidden inline-flex items-center gap-3 font-bold text-lg py-5 px-10 rounded-full transition-all duration-300 border-0"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
              boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
            }}
            whileHover={{ 
              scale: 1.03, 
              y: -3,
              boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.4), 0 10px 20px -5px hsl(var(--primary) / 0.2)"
            }}
            whileTap={{ scale: 0.97, y: -1 }}
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('submit-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            {/* Inner glow layer */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
            
            {/* Animated gradient border */}
            <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary" />
            </div>
            
            {/* Hover light sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            <span className="relative z-10 font-bold tracking-wide">
              Get Started Now
            </span>
            
            <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksNew;
