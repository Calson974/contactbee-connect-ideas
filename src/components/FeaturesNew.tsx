import React from 'react';
import { Users, Zap, Smartphone, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import FeatureCard from './features/FeatureCard';
import BenefitsBanner from './features/BenefitsBanner';

const features = [
  {
    title: "Thriving Community",
    description: "Join a vibrant ecosystem of 1,000+ users who actively support each other's growth and success.",
    icon: Users,
    stat: "1K+",
    statLabel: "Active members",
    imageUrl: "https://res.cloudinary.com/dmxik1gea/image/upload/v1767968983/SmartSelect_20260104_042652_Chrome_dnd522.png",
    imageAlt: "Thriving community illustration",
  },
  {
    title: "Lightning Fast",
    description: "Get results in minutes, not months. Our automated system works 24/7 to amplify your presence.",
    icon: Zap,
    stat: "24/7",
    statLabel: "Always active",
    imageUrl: "https://res.cloudinary.com/dmxik1gea/image/upload/v1767969009/12291112_Happy_woman_sitting_on_rocket_and_waving_colleagues_oea8ny.png",
    imageAlt: "Lightning fast illustration",
  },
  {
    title: "Simple & Intuitive",
    description: "Beautiful interface designed for everyone. No technical knowledge required to start growing today.",
    icon: Smartphone,
    stat: "Easy",
    statLabel: "No learning curve",
    imageUrl: "https://res.cloudinary.com/dmxik1gea/image/upload/v1767968985/SmartSelect_20260104_043233_Chrome_uz0neb.png",
    imageAlt: "Simple interface illustration",
  },
];

const FeaturesNew = () => {
  return (
    <section id="features" className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Subtle radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16 lg:mb-20 space-y-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Why Choose Us</span>
          </div>

          <h2 className="text-foreground">
            Everything You Need to
            <span className="text-primary"> Grow on WhatsApp</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed font-sans">
            Everything you need to amplify your reach and build a massive, engaged audience
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 lg:mb-28">
          {features.map((feature, index) => (
            <FeatureCard key={index} index={index} {...feature} />
          ))}
        </div>

        {/* Benefits banner */}
        <BenefitsBanner />
      </div>
    </section>
  );
};

export default FeaturesNew;
