import HeroModern from "@/components/HeroModern";
import FeaturesNew from "@/components/FeaturesNew";
import HowItWorksNew from "@/components/HowItWorksNew";
import SubmissionFormNew from "@/components/SubmissionFormNew";
import FAQSectionNew from "@/components/FAQSectionNew";
import FooterNew from "@/components/FooterNew";
import StatsBannerNew from "@/components/StatsBannerNew";
import { Button } from "@/components/ui/button";
import { Download, Sparkles, TrendingUp, Users } from "lucide-react";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

// Main landing page
const Index = () => {
  return (
    <>
      <HeroModern />
      
      <StatsBannerNew />
      
      <FeaturesNew />
      <HowItWorksNew />
      
      <SubmissionFormNew />
      
      {/* Exponential Growth Section - Premium Design */}
      <section className="relative py-16 sm:py-20 lg:py-32 overflow-hidden">
        {/* Sophisticated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
        
        {/* Static Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-primary/10 rounded-full blur-[80px] sm:blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-accent/10 rounded-full blur-[80px] sm:blur-[100px]" />
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-md border border-primary/30 shadow-lg">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                <span className="text-xs sm:text-sm font-bold text-primary tracking-wide">Exponential Growth</span>
              </div>

              {/* Hero Text */}
              <h2 className="text-2xl sm:text-3xl lg:text-5xl xl:text-6xl font-black text-foreground leading-[1.1] sm:leading-[1.1]">
                Grow Your Network{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    Exponentially
                  </span>
                  {/* Underline decoration */}
                  <motion.div 
                    className="absolute -bottom-1.5 sm:-bottom-2 left-0 h-1 sm:h-1.5 bg-gradient-to-r from-primary to-accent rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </h2>

              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Join thousands of professionals who have already expanded their network by{" "}
                <span className="font-bold text-primary bg-primary/10 px-2 py-0.5 rounded text-sm sm:text-base">1000+ contacts</span>. 
                Our curated contact lists help you connect with like-minded individuals and grow your 
                professional circle on WhatsApp.
              </p>

              {/* Premium Stats Cards */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 py-3 sm:py-4">
                {[
                  { value: "1K+", label: "Members", icon: Users, gradient: "from-primary to-secondary" },
                  { value: "1000+", label: "Contacts", icon: TrendingUp, gradient: "from-secondary to-accent" },
                  { value: "Daily", label: "Updates", icon: Sparkles, gradient: "from-accent to-primary" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-white/60 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-3 sm:p-5 shadow-lg hover:shadow-xl transition-all duration-500"
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -6, scale: 1.03 }}
                  >
                    {/* Hover glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md mb-2 sm:mb-3`}>
                        <stat.icon className="w-3 h-3 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className={`text-lg sm:text-2xl lg:text-3xl font-black text-transparent bg-gradient-to-r ${stat.gradient} bg-clip-text`}>
                        {stat.value}
                      </div>
                      <div className="text-xs sm:text-sm text-muted-foreground font-medium mt-0.5 sm:mt-1">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Premium CTA Button */}
              <motion.div 
                className="w-full sm:w-auto pt-2 sm:pt-4"
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97, y: -1 }}
              >
                <Button 
                  size="lg" 
                  className="group relative overflow-hidden w-full sm:w-auto h-12 sm:h-16 px-6 sm:px-10 font-bold text-base sm:text-lg rounded-full border-0 transition-all duration-300"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 50%, hsl(var(--secondary)) 100%)",
                    boxShadow: "0 4px 14px -2px hsl(var(--primary) / 0.3), 0 10px 25px -5px hsl(var(--primary) / 0.2), inset 0 1px 0 rgba(255,255,255,0.3)"
                  }}
                  asChild
                >
                  <Link to="/downloads" className="gap-2 sm:gap-3 inline-flex items-center justify-center">
                    {/* Inner glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/25 via-transparent to-black/10" />
                    
                    {/* Light sweep */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                    
                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base">Download Contact Lists</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2 text-sm sm:text-base">→</span>
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Image - Premium Card */}
            <motion.div
              className="relative mt-8 lg:mt-0"
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Glow Effect */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-secondary/30 rounded-[1.5rem] sm:rounded-[2.5rem] blur-xl opacity-50" />
              
              <div className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-xl sm:shadow-2xl border-2 sm:border-4 border-white/20 dark:border-white/10">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 z-10 mix-blend-overlay" />
                
                <img 
                  src="https://res.cloudinary.com/dmxik1gea/image/upload/w_1000/q_auto/f_auto/v1762084957/gain-1000_contacts_dmnb9i.jpg" 
                  alt="Grow your network by 1000+ contacts" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Bottom gradient fade */}
                <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-32 bg-gradient-to-t from-black/40 to-transparent z-20" />
              </div>
              
              {/* Floating Badge - Static */}
              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-primary via-accent to-secondary rounded-2xl p-6 shadow-2xl border-2 border-white/20">
                <div className="text-white text-center">
                  <div className="text-4xl font-black">1000+</div>
                  <div className="text-sm font-semibold opacity-90">New Contacts</div>
                </div>
              </div>
              
              {/* Secondary floating element */}
              <div className="absolute -bottom-4 -left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-xl px-4 py-3 shadow-xl border border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm font-semibold text-foreground">Active Now</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Boost Section - Modernized */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 dark:opacity-10 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Start Today</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Ready to Boost Your Views?
            </h2>

            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Download our latest contact lists and start growing your WhatsApp status views instantly
            </p>

            <motion.div 
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97, y: -1 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="group relative overflow-hidden font-bold text-lg h-16 px-12 rounded-full border-0 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                  boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                }}
              >
                <Link to="/downloads" className="gap-3 inline-flex items-center">
                  {/* Inner glow layer */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                  
                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20">
                    <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary" />
                  </div>
                  
                  {/* Hover light sweep effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <Download className="h-6 w-6" />
                    Go to Downloads
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </span>
                </Link>
              </Button>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-white/80 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Free to Start</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>Daily Updates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full" />
                <span>1,000+ Members</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <FAQSectionNew />
      
      <FooterNew />
    </>
  );
};

export default Index;
