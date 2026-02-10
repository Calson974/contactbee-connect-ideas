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
      
      {/* Grow Your Network Section - Modernized */}
      <section className="relative py-12 sm:py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-teal/5 via-blue-whatsapp/5 to-green-light/5 dark:from-teal-dark/10 dark:via-teal/5 dark:to-blue-whatsapp/10">
        {/* Background Elements - More subtle on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-teal/10 dark:bg-teal/5 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-blue-whatsapp/10 dark:bg-blue-whatsapp/5 rounded-full blur-3xl opacity-70" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/20 dark:border-teal/30">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal dark:text-green-light" />
                <span className="text-xs sm:text-sm font-semibold text-teal dark:text-green-light">Exponential Growth</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight">
                Grow Your Network{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-whatsapp-600 dark:from-green-400 dark:to-blue-whatsapp-400 bg-clip-text text-transparent">
                  Exponentially
                </span>
              </h2>

              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                Join thousands of professionals who have already expanded their network by{" "}
                <span className="font-bold text-green-600 dark:text-green-400">1000+ contacts</span>. 
                Our curated contact lists help you connect with like-minded individuals and grow your 
                professional circle on WhatsApp.
              </p>

              {/* Stats - Improved for mobile */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 py-2 sm:py-4">
                {[
                  { value: "1K+", label: "Members", icon: Users },
                  { value: "1000+", label: "Contacts", icon: TrendingUp },
                  { value: "Daily", label: "Updates", icon: Sparkles }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-2 sm:p-3 rounded-xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20px" }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                  >
                    <div className="inline-flex p-1.5 sm:p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-whatsapp-500 mb-1.5 sm:mb-2">
                      <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="w-full sm:w-auto"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto group relative overflow-hidden bg-green-600 hover:bg-green-700 text-white font-bold transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-md"
                  asChild
                >
                  <Link to="/downloads" className="gap-2 sm:gap-3 inline-flex items-center justify-center">
                    <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Download Contact Lists</span>
                    <motion.span 
                      className="hidden sm:inline-flex"
                      animate={{ x: [0, 4, 0] }} 
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-10" />
                <img 
                  src="https://res.cloudinary.com/dmxik1gea/image/upload/w_1000/q_auto/f_auto/v1762084957/gain-1000_contacts_dmnb9i.jpg" 
                  alt="Grow your network by 1000+ contacts" 
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating Badge */}
              <motion.div
                className="absolute -top-6 -right-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-white text-center">
                  <div className="text-3xl font-black">1000+</div>
                  <div className="text-sm font-semibold">New Contacts</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ready to Boost Section - Modernized */}
      <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600">
        {/* Pattern Overlay */}
        <div className="absolute inset-0 dark:opacity-10 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300A884' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/20 backdrop-blur-sm border border-teal/40"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-teal-light" />
              <span className="text-sm font-semibold text-teal-light">Start Today</span>
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black bg-gradient-to-r from-teal to-green-light bg-clip-text text-transparent leading-tight">
              Ready to Boost Your Views?
            </h2>

            <p className="text-xl text-teal-100/90 max-w-2xl mx-auto leading-relaxed">
              Download our latest contact lists and start growing your WhatsApp status views instantly
            </p>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Button asChild size="lg" className="bg-gradient-to-r from-teal to-green-light hover:from-teal-dark hover:to-teal text-white font-bold text-lg h-16 px-12 rounded-2xl shadow-2xl hover:shadow-teal/30 transition-all duration-300">
                <Link to="/downloads" className="gap-3 inline-flex items-center">
                  <Download className="h-6 w-6" />
                  Go to Downloads
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
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
