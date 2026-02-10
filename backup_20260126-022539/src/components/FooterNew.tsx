import { motion } from "framer-motion";
import { Heart, Facebook, Linkedin, Mail, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

const FooterNew = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Downloads", href: "/downloads" },
      { name: "Pricing", href: "#pricing" }
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Contact", href: "#contact" },
      { name: "FAQ", href: "#faq" },
      { name: "Support", href: "mailto:support@boostwhats.com" }
    ],
    legal: [
      { name: "Privacy Policy", href: "/legal/privacy" },
      { name: "Terms of Service", href: "/legal/terms" },
      { name: "Cookie Policy", href: "/legal/cookies" },
      { name: "Acceptable Use", href: "/legal/acceptable-use" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/share/1C2fgbhR6H/?mibextid=LQQJ4d", label: "Facebook", color: "hover:bg-blue-600 hover:text-white" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/boostwhats/", label: "LinkedIn", color: "hover:bg-blue-700 hover:text-white" },
    { icon: Mail, href: "boostwhats@gmail.com", label: "Email", color: "hover:bg-red-500 hover:text-white" }
  ];

  return (
    <footer className="relative overflow-hidden font-sans bg-gray-50 dark:bg-[#0f172a] text-slate-600 dark:text-slate-200 transition-colors duration-300">
      
      {/* --- Ambient Background --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Background Image - Adapted for both themes */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-30 mix-blend-overlay" 
          style={{
            backgroundImage: 'url("https://res.cloudinary.com/dmxik1gea/image/upload/v1765119505/1189875_9059_1_g0tsxg.png")'
          }}
        />
        
        {/* Gradient Overlay: White fade for light mode, Dark fade for dark mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-gray-50/80 to-transparent dark:from-gray-950 dark:via-gray-900/90 dark:to-gray-900/80" />
        
        {/* Animated Gradient Orbs */}
        <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300/40 dark:bg-purple-500/20 rounded-full blur-[100px]" 
        />
        <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-300/30 dark:bg-teal-500/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        
        {/* --- Main Content Grid --- */}
        <div className="pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* 1. Brand & Description (Span 4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                {/* Logo Area */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
                    <img 
                      src="/favicon.png" 
                      alt="BoostWhats" 
                      className="relative w-12 h-12 rounded-xl shadow-2xl dark:shadow-none" 
                    />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 via-purple-700 to-slate-800 dark:from-white dark:via-purple-100 dark:to-gray-300 bg-clip-text text-transparent tracking-tight">
                    BoostWhats
                  </span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base max-w-sm">
                  Transform your WhatsApp status into a powerful reach tool. Join <span className="text-slate-900 dark:text-white font-semibold">1000+ users</span> growing exponentially through our shared contact pool.
                </p>

                {/* Theme Toggle & Socials Row */}
                <div className="flex items-center gap-6 mt-8">
                   <div className="p-1 rounded-full border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm shadow-sm dark:shadow-none">
                      <ThemeToggle />
                   </div>
                   <div className="h-6 w-px bg-slate-300 dark:bg-white/10"></div>
                   <div className="flex gap-3">
                    {socialLinks.map((social, index) => (
                        <motion.a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className={`w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-500 dark:text-slate-400 transition-all duration-300 shadow-sm dark:shadow-none ${social.color} hover:border-transparent hover:shadow-lg`}
                        whileHover={{ y: -3, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        >
                        <social.icon className="w-4 h-4" />
                        </motion.a>
                    ))}
                   </div>
                </div>
              </motion.div>
            </div>

            {/* 2. Navigation Links (Span 5 cols) */}
            <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8 pt-2">
              {Object.entries(footerLinks).map(([category, links], idx) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-5">
                    {category}
                  </h3>
                  <ul className="space-y-3">
                    {links.map((link, index) => (
                      <li key={index}>
                        {link.href.startsWith('http') || link.href.startsWith('mailto') ? (
                          <a
                            href={link.href}
                            className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white transition-colors text-sm font-medium"
                            {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                          >
                            <span className="relative">
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-600 dark:bg-purple-400 transition-all group-hover:w-full"></span>
                            </span>
                          </a>
                        ) : (
                          <Link
                            to={link.href}
                            className="group flex items-center text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white transition-colors text-sm font-medium"
                          >
                            <span className="relative">
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-600 dark:bg-purple-400 transition-all group-hover:w-full"></span>
                            </span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* 3. Newsletter / CTA (Span 3 cols) */}
            <motion.div 
                className="lg:col-span-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-2xl p-6 shadow-xl dark:shadow-2xl ring-1 ring-slate-900/5 dark:ring-white/10">
                    <div className="flex items-center gap-2 mb-4">
                        
                        <h3 className="font-bold text-slate-900 dark:text-white">Stay Updated</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                        Get the latest strategies to grow your audience.
                    </p>
                    
                    <div className="space-y-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-gray-900/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm shadow-sm dark:shadow-none"
                        />
                        <Link 
                            to="/downloads" 
                            className="group w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium shadow-lg hover:shadow-teal-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            <span>Subscribe</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>

        {/* --- Footer Bottom --- */}
        <div className="border-t border-slate-200 dark:border-white/10 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              © {new Date().getFullYear()} BoostWhats. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6">
                <Link to="/legal/privacy" className="text-sm text-slate-500 hover:text-purple-600 dark:hover:text-slate-300 transition-colors">
                    Privacy
                </Link>
                <Link to="/legal/terms" className="text-sm text-slate-500 hover:text-purple-600 dark:hover:text-slate-300 transition-colors">
                    Terms
                </Link>
                <div className="flex items-center gap-1.5 text-sm text-slate-500 bg-white/50 dark:bg-white/5 px-3 py-1 rounded-full border border-slate-200 dark:border-white/5 shadow-sm dark:shadow-none">
                    <span>Made with</span>
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;