import React from 'react';
import { Rocket, Users, TrendingUp, Shield, Zap, Heart, Star, CheckCircle, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesNew = () => {
  const features = [
    {
      title: "Thriving Community",
      description: "Join a vibrant ecosystem of 1,000+ users who actively support each other's growth and success.",
      gradient: "from-secondary to-primary",
      stats: "1K+ members",
    },
    {
      title: "Lightning Fast",
      description: "Get results in minutes, not months. Our automated system works 24/7 to amplify your presence.",
      gradient: "from-secondary to-primary",
      stats: "24/7 active",
    },
    {
      title: "Simple & Intuitive",
      description: "Beautiful interface designed for everyone. No technical knowledge required to start growing today.",
      gradient: "from-primary to-accent",
      stats: "No learning curve",
    },
  ];

  const benefits = [
    "No technical skills needed",
    "Grow 5x faster than traditional methods",
    "100% automated workflows",
    "24/7 dedicated support",
    "Works with any WhatsApp account",
    "Real-time analytics tracking"
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-muted to-background">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary/5 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
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
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Why Choose Us</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
            Everything You Need to
            <span className="text-primary">
              {" "}Grow on WhatsApp
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Everything you need to amplify your reach and build a massive, engaged audience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-card rounded-3xl shadow-lg border border-border transition-all duration-300" />
              
              <div className="relative p-8 text-center h-full flex flex-col">
                {/* Image Area */}
                <div className="mb-6 rounded-2xl text-primary overflow-hidden bg-muted min-h-[180px] flex items-center justify-center p-4">
                  {index === 0 && (
                    <img
                      src="https://res.cloudinary.com/dmxik1gea/image/upload/v1767968983/SmartSelect_20260104_042652_Chrome_dnd522.png"
                      alt="Thriving community"
                      className="max-h-[160px] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {index === 1 && (
                    <img
                      src="https://res.cloudinary.com/dmxik1gea/image/upload/v1767969009/12291112_Happy_woman_sitting_on_rocket_and_waving_colleagues_oea8ny.png"
                      alt="Lightning fast"
                      className="max-h-[160px] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {index === 2 && (
                    <img
                      src="https://res.cloudinary.com/dmxik1gea/image/upload/v1767968985/SmartSelect_20260104_043233_Chrome_uz0neb.png"
                      alt="Simple interface"
                      className="max-h-[160px] object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                  {feature.description}
                </p>

                <div className="pt-4 border-t border-border">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary uppercase tracking-wide">
                    {feature.stats}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- IMPROVED BENEFITS SECTION (Uniform Color Mode) --- */}
        <motion.div
          className="mt-24 relative z-10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Main Card: Navy Blue Background */}
          <div className="bg-primary rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-primary/20 border border-white/10">
            
            {/* Animated Background Mesh */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-center relative z-20">
              
              {/* LEFT: Content */}
              <div className="lg:col-span-5 space-y-8 text-center lg:text-left [&>*]:!text-white">
                
                <div className="inline-block">
                  <span className="py-1 px-3 rounded-full bg-white/10 border border-white/30 text-white text-xs font-bold tracking-widest uppercase">
                  </span>
                </div>

                
                <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                  <span className="text-primary-foreground">Stop chasing views.</span> <br />
                  <span className="text-primary-foreground">
                    Let them come to you.
                  </span>
                </h3>

                {/* Body Text */}
                <p className="text-lg text-primary-foreground/90 leading-relaxed font-medium">
                  Did you know: Submiting your contact consistently everyday helps you grow faster with BoostWhats.
                </p>
                
                {/* CTA Button Group */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                    {/* Button 1: White Background, Black Text 
                    <button className="px-8 py-4 bg-white text- font-bold rounded-2xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                        Get Started
                    </button>*/}
                    {/* Button 2: Glass Background, White Text */}
                    <button className="px-8 py-4 bg-white/10 text-primary-foreground border border-white/20 font-semibold rounded-2xl hover:bg-white/20 backdrop-blur-md transition-all">
                        Submit your contact today
                    </button>
                </div>
              </div>

              {/* RIGHT: The "Reactor" Visual */}
              <div className="lg:col-span-7 relative flex items-center justify-center min-h-[500px]">
                
                {/* Radar Circles: White Borders */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] h-[300px] border border-white/20 rounded-full animate-[spin_10s_linear_infinite]" />
                    <div className="absolute w-[450px] h-[450px] border border-white/20 rounded-full animate-[spin_15s_linear_infinite_reverse] border-dashed" />
                    <div className="absolute w-[600px] h-[600px] border border-white/10 rounded-full" />
                </div>

                {/* Central Image - Static */}
                <div className="relative z-10 w-64 md:w-80">
                    <img 
                        src="https://res.cloudinary.com/dmxik1gea/image/upload/v1768303871/20251012_165019_iuijxa.png" 
                        alt="Core App"
                        className="w-full drop-shadow-[0_0_50px_rgba(var(--primary),0.4)]"
                    />
                </div>

                {/* Floating "Satellite" Cards - Hidden on Mobile (hidden), Visible on Tablet+ (md:block) */}
                
               {/* Card 1: Top Left 
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="hidden md:block absolute top-0 left-0 bg-[#1e293b]/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl max-w-[200px]"
                >
                    <div className="bg-teal-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                        <Zap className="w-5 h-5 text-teal-400" />
                    </div>
                    <h4 className="text-teal-400 font-bold text-sm">Lightning Fast</h4>
                    <p className="text-white text-xs mt-1 font-medium">5x faster growth speed</p>
                </motion.div>

                {/* Card 2: Bottom Right 
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="hidden md:block absolute bottom-10 right-0 bg-[#1e293b]/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl max-w-[200px]"
                >
                    <div className="bg-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                        <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-blue-400 font-bold text-sm">Community</h4>
                    <p className="text-white text-xs mt-1 font-medium">Auto-join groups</p>
                </motion.div>

                {/* Card 3: Bottom Left 
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="hidden md:block absolute bottom-0 left-10 bg-[#1e293b]/80 backdrop-blur-xl border border-white/20 p-4 rounded-2xl max-w-[200px]"
                >
                    <div className="bg-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                        <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <h4 className="text-purple-400 font-bold text-sm">Secure</h4>
                    <p className="text-white text-xs mt-1 font-medium">100% Privacy Protection</p>
                </motion.div>

                 {/* Card 4: Top Right
                 <motion.div 
                    initial={{ opacity: 0, y: -50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="hidden md:block absolute top-10 right-10 bg-gradient-to-br from-teal-500 to-emerald-600 p-4 rounded-2xl max-w-[180px] shadow-lg shadow-teal-500/30"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Star className="w-4 h-4 text-white fill-white" />
                        <span className="text-white font-bold text-xs">TOP RATED</span>
                    </div>
                    <p className="text-white text-xs font-medium opacity-95">"The best tool for WhatsApp marketing I've used."</p>
                </motion.div>
*/}
              </div>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
};

export default FeaturesNew;