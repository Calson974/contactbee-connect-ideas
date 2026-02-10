import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Play, ArrowLeft, ChevronDown, TrendingUp, Users, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { CountrySelect } from "@/components/ui/country-select";
import { ContactFlipForm } from "@/components/ContactFlipForm";

// Floating particles component
const FloatingParticles = () => {
  return (
    <>
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-purple-400/40 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut"
          }}
        />
      ))}
    </>
  );
};

const Hero = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedButton, setFocusedButton] = useState<string | null>(null);

  const handleFlip = useCallback((e?: React.MouseEvent | React.TouchEvent | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (navigator.vibrate && 'ontouchstart' in window) {
      navigator.vibrate(50);
    }
    setIsFlipped(!isFlipped);
  }, [isFlipped]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (focusedButton === 'cta-button') {
          handleFlip(e as any);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedButton, handleFlip]);

  return (
    <>
      <Helmet>
        <title>BoostWhats - Transform Your WhatsApp Status Into a Powerhouse</title>
        <meta name="description" content="Join 10,000+ users growing their WhatsApp audience by 1000+ contacts. Revolutionary shared contact pool for exponential growth." />
      </Helmet>
      
      <section 
        ref={containerRef} 
        id="home" 
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950" 
        role="main"
      >
        {/* Animated Gradient Background with Mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-indigo-600/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-500/10 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-20 left-[10%] w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full filter blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute bottom-20 right-[15%] w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full filter blur-3xl"
            animate={{ y: [0, 40, 0], x: [0, -30, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
          <motion.div 
            className="absolute top-[40%] right-[30%] w-40 h-40 sm:w-64 sm:h-64 bg-gradient-to-br from-pink-400/25 to-orange-400/25 rounded-full filter blur-3xl"
            animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
          <FloatingParticles />
        </div>

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                {/* Left Content */}
                <motion.div 
                  className="space-y-6 lg:space-y-8"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {/* Badge */}
                  <motion.div
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-300/30 dark:border-purple-500/30 shadow-lg"
                    animate={{ 
                      boxShadow: [
                        '0 0 20px rgba(168, 85, 247, 0.2)',
                        '0 0 40px rgba(236, 72, 153, 0.3)',
                        '0 0 20px rgba(168, 85, 247, 0.2)'
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                      10,000+ Growing Their Reach
                    </span>
                  </motion.div>

                  {/* Main Heading */}
                  <motion.div className="space-y-4">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.1] tracking-tight">
                      <span className="block mb-2 text-gray-900 dark:text-white">
                        Transform Your
                      </span>
                      <span className="block bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
                        WhatsApp Status
                      </span>
                      <span className="block text-gray-900 dark:text-white">
                        Into a{' '}
                        <span className="relative inline-block">
                          <span className="relative z-10">Powerhouse</span>
                          <motion.span
                            className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-50 -z-10 rounded"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                          />
                        </span>
                      </span>
                    </h1>
                  </motion.div>

                  {/* Subheading */}
                  <motion.div className="space-y-4">
                    <p className="text-lg lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed font-medium">
                      Join <span className="font-bold text-purple-600 dark:text-purple-400">10,000+ users</span> growing their audience by{' '}
                      <span className="font-bold text-pink-600 dark:text-pink-400">1000+ contacts</span> through our revolutionary shared contact pool.
                    </p>
                    
                    {/* Quick Features */}
                    <div className="flex flex-wrap gap-4 pt-2">
                      {[
                        { icon: TrendingUp, text: 'Exponential Growth' },
                        { icon: Users, text: 'Active Community' },
                        { icon: Zap, text: 'Instant Results' }
                      ].map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                        >
                          <item.icon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* CTA Buttons */}
                  <motion.div className="flex flex-col sm:flex-row gap-4 pt-6">
                    {/* Primary CTA Button */}
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      {/* Enhanced animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl opacity-90 group-hover:opacity-100 transition-opacity duration-300 blur-xl group-hover:blur-2xl" />
                      
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl" />
                      
                      <Button 
                        size="lg" 
                        onClick={handleFlip}
                        onFocus={() => setFocusedButton('cta-button')} 
                        onBlur={() => setFocusedButton(null)}
                        className="relative w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-base sm:text-lg px-10 py-7 sm:px-12 sm:py-8 rounded-2xl shadow-2xl transition-all duration-300 border-0 overflow-hidden min-h-[56px] sm:min-h-[64px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <span className="tracking-wide">Start Growing Now</span>
                          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </span>
                      </Button>
                    </motion.div>

                    {/* Secondary CTA Button */}
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }} 
                      whileTap={{ scale: 0.98 }}
                      className="relative group"
                    >
                      {/* Subtle background glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md" />
                      
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="relative w-full sm:w-auto font-semibold text-base sm:text-lg px-10 py-7 sm:px-12 sm:py-8 rounded-2xl border-2 border-purple-300/50 dark:border-purple-700/50 hover:border-purple-500 dark:hover:border-purple-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-purple-50/80 dark:hover:bg-purple-950/40 transition-all duration-300 overflow-hidden group min-h-[56px] sm:min-h-[64px] shadow-lg hover:shadow-xl"
                      >
                        {/* Hover effect overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <span className="relative z-10 flex items-center gap-3">
                          <Play className="w-5 h-5 text-purple-600 dark:text-purple-400 transition-transform duration-200 group-hover:scale-[1.04]" />
                          <span className="tracking-wide text-gray-900 dark:text-white">How It Works</span>
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Stats Cards */}
                  <motion.div className="grid grid-cols-3 gap-4 pt-6">
                    {[
                      { value: "10K+", label: "Active Users", icon: Users, color: "from-blue-500 to-cyan-500" },
                      { value: "1M+", label: "Contacts Shared", icon: TrendingUp, color: "from-purple-500 to-pink-500" },
                      { value: "500%", label: "Avg. Growth", icon: Zap, color: "from-orange-500 to-red-500" }
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + index * 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-lg group-hover:shadow-xl transition-all">
                          <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${stat.color} mb-2`}>
                            <stat.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white">
                            {stat.value}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                            {stat.label}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Image with 3D Effect */}
                <motion.div 
                  className="relative flex items-center justify-center lg:justify-end mt-8 lg:mt-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <div className="relative w-full max-w-sm lg:max-w-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl opacity-60" />
                    <motion.img 
                      src="https://res.cloudinary.com/dmxik1gea/image/upload/w_1000/q_auto/f_auto/v1762084953/excited-lady_tektkt.png" 
                      alt="Professional woman excited about WhatsApp growth" 
                      className="relative z-10 w-full h-auto drop-shadow-2xl"
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full flex items-center justify-center min-h-[600px]"
              >
                <ContactFlipForm onClose={handleFlip} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
};

export default Hero;
