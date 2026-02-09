import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stat: string;
  statLabel: string;
  imageUrl: string;
  imageAlt: string;
  index: number;
}

const FeatureCard = ({ title, description, icon: Icon, stat, statLabel, imageUrl, imageAlt, index }: FeatureCardProps) => {
  return (
    <motion.div
      className="group relative rounded-[2rem] overflow-hidden bg-card border border-border"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      {/* Image strip */}
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Gradient fade at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card to-transparent" />
        
        {/* Floating stat badge */}
        <motion.div 
          className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-xs font-bold tracking-wide">{stat}</span>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 pt-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground !normal-case !tracking-normal !font-sans">
            {title}
          </h3>
        </div>
        
        <p className="text-sm text-muted-foreground leading-relaxed pl-[52px]">
          {description}
        </p>

        <div className="pl-[52px] pt-1">
          <span className="text-xs text-muted-foreground/70 uppercase tracking-widest font-medium">
            {statLabel}
          </span>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

export default FeatureCard;
