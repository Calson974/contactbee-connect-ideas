import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  "No technical skills needed",
  "Grow 5x faster",
  "100% automated",
  "24/7 support",
  "Any WhatsApp account",
  "Real-time analytics",
];

const BenefitsBanner = () => {
  return (
    <motion.div
      className="relative rounded-[2.5rem] overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      {/* Solid primary background */}
      <div className="bg-primary relative">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full border border-primary-foreground/30" />
          <div className="absolute bottom-[-30%] left-[-5%] w-[400px] h-[400px] rounded-full border border-primary-foreground/20 border-dashed" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-10 p-8 md:p-12 lg:p-16 items-center">
          {/* Left: Copy */}
          <div className="space-y-6 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl text-primary-foreground leading-tight">
              Stop chasing views.
              <br />
              Let them come to you.
            </h3>

            <p className="text-primary-foreground/80 text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0 font-sans">
              Submitting your contact consistently every day helps you grow faster with BoostWhats.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
              <motion.button
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-primary-foreground text-primary font-semibold rounded-2xl transition-all hover:shadow-lg hover:shadow-primary-foreground/20"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  document.getElementById('submission-form')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Submit your contact
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Right: Benefits grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2.5 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 rounded-2xl p-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <CheckCircle className="w-5 h-5 text-primary-foreground shrink-0 mt-0.5" />
                <span className="text-primary-foreground text-sm font-medium leading-snug">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BenefitsBanner;
