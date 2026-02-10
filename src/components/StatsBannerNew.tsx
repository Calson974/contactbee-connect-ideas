import { motion } from "framer-motion";
import { Clock, Zap, TrendingUp, Users, Download, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const StatsBannerNew = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(21, 0, 0, 0);
      
      if (now > target) {
        target.setDate(target.getDate() + 1);
      }
      
      const diffMs = target.getTime() - now.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      setTimeLeft({ hours: diffHrs, minutes: diffMins, seconds: diffSecs });
    };

    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.08, y: -4 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {/* Premium glass card with layered effects */}
        <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-white/30 via-white/10 to-transparent">
          <div className="relative bg-gradient-to-br from-gray-900/95 to-gray-950/95 rounded-3xl px-6 py-5 sm:px-10 sm:py-8 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/50">
            {/* Subtle inner glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/5 via-transparent to-transparent" />
            
            {/* Number display */}
            <div className="relative z-10 text-4xl sm:text-6xl lg:text-7xl font-black text-white tabular-nums tracking-tighter font-mono">
              {String(value).padStart(2, '0')}
            </div>
          </div>
        </div>
      </motion.div>
      
      <div className="mt-4 sm:mt-6 text-white/60 font-medium text-sm sm:text-base uppercase tracking-[0.2em]">
        {label}
      </div>
    </div>
  );

  return (
    <div className="relative z-50 -mt-24 lg:-mt-28 px-4 sm:px-6 lg:px-8">
      <motion.section 
        className="relative overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl shadow-black/30"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Sophisticated layered background */}
        <div className="absolute inset-0">
          <img 
            src="https://res.cloudinary.com/dmxik1gea/image/upload/v1767494069/23254650_arrow_13_ibummh.jpg" 
            alt="Background"
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/70 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30" />
        </div>

        {/* Elegant noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Sophisticated grid pattern */}
        <div className="absolute inset-0 opacity-[0.04]">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Floating ambient orbs */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-[80px]"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
              background: i % 2 === 0 
                ? 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)',
            }}
            animate={{
              x: [0, 30, -20, 0],
              y: [0, -20, 30, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            className="py-20 lg:py-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Premium header section */}
            <div className="max-w-5xl mx-auto text-center mb-16 lg:mb-24">
              {/* Floating badge */}
              <motion.div
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-10 shadow-xl shadow-black/20"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
              >
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <div className="absolute inset-0 bg-primary/50 rounded-full blur-md" />
                  <Zap className="w-6 h-6 text-primary relative z-10" fill="currentColor" />
                </motion.div>
                <span className="text-lg font-semibold text-white tracking-wide">
                  Daily Contact Compilation
                </span>
              </motion.div>
              
              {/* Main title with sophisticated typography */}
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-8 tracking-tight leading-[1.1]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Next vCard Drop{" "}
                <span className="inline-flex items-center gap-3 bg-gradient-to-r from-primary/30 to-accent/30 px-8 py-3 rounded-3xl backdrop-blur-md border border-white/20 shadow-2xl">
                  <Clock className="w-10 h-10 text-primary" />
                  <span className="font-mono font-bold text-4xl md:text-5xl lg:text-6xl">9:00 PM</span>
                </span>
              </motion.h2>
              
              {/* Sophisticated subtitle */}
              <motion.p
                className="text-white/80 text-xl md:text-2xl lg:text-3xl max-w-3xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Join <span className="text-primary font-semibold">1,000+ members</span> in our daily contact exchange. 
                Your network grows while you sleep.
              </motion.p>
            </div>

            {/* Stats cards - horizontal layout with glass morphism */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-16 lg:mb-20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {[
                { icon: Users, label: "Active Users", value: "1,000+", color: "from-primary to-accent" },
                { icon: Download, label: "Daily Contacts", value: "500+", color: "from-accent to-primary" },
                { icon: TrendingUp, label: "Success Rate", value: "98%", color: "from-secondary to-primary" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="group relative px-8 py-5 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden"
                  whileHover={{ scale: 1.08, y: -6 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-left">
                      <div className={`text-3xl font-black text-transparent bg-gradient-to-r ${stat.color} bg-clip-text`}>
                        {stat.value}
                      </div>
                      <div className="text-white/60 text-sm font-medium">{stat.label}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Premium Timer Display */}
            <motion.div
              className="max-w-4xl mx-auto mb-16 lg:mb-24"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              <div className="relative p-10 sm:p-14 lg:p-16 rounded-[2rem] bg-gradient-to-br from-gray-900/40 to-gray-950/40 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-black/50">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-tl-[2rem]" />
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-accent/20 to-transparent rounded-br-[2rem]" />
                
                <div className="relative flex items-center justify-center gap-4 sm:gap-8 lg:gap-12">
                  <TimeUnit value={timeLeft.hours} label="Hours" />
                  
                  {/* Elegant separator */}
                  <motion.div
                    className="text-4xl sm:text-6xl lg:text-7xl font-thin text-primary/80 font-mono"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    :
                  </motion.div>
                  
                  <TimeUnit value={timeLeft.minutes} label="Minutes" />
                  
                  {/* Elegant separator */}
                  <motion.div
                    className="text-4xl sm:text-6xl lg:text-7xl font-thin text-primary/80 font-mono"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    :
                  </motion.div>
                  
                  <TimeUnit value={timeLeft.seconds} label="Seconds" />
                </div>
              </div>
            </motion.div>

            {/* Sophisticated Progress Section */}
            <motion.div 
              className="max-w-4xl mx-auto mb-16 lg:mb-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex justify-between items-center mb-6 px-2">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-primary"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/70 text-sm font-semibold uppercase tracking-widest">
                    Compilation in Progress
                  </span>
                </div>
                <motion.span 
                  className="text-2xl font-black text-primary font-mono bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10"
                  key={`percentage-${timeLeft.hours}-${timeLeft.minutes}-${timeLeft.seconds}`}
                  initial={{ scale: 1.1, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {Math.round((1 - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (21 * 3600)) * 100)}%
                </motion.span>
              </div>
              
              {/* Premium progress bar */}
              <div className="relative h-5 bg-gray-800/50 rounded-full overflow-hidden border border-white/5 shadow-inner">
                <motion.div 
                  className="h-full relative overflow-hidden"
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(1 - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (21 * 3600)) * 100}%`,
                  }}
                  transition={{ width: { duration: 0.8, ease: "easeOut" } }}
                  style={{
                    background: 'linear-gradient(90deg, #059669, #10b981, #34d399, #6ee7b7)',
                  }}
                >
                  {/* Animated shimmer */}
                  <motion.div 
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  />
                  {/* Inner glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </motion.div>
              </div>
            </motion.div>

            {/* Action buttons row */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 lg:gap-6 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              {[
                { label: "Access Today's Contacts", href: "/downloads", icon: Download },
                { label: "Submit Your Contact", href: "#submit-form", icon: ArrowRight },
              ].map((action, index) => (
                <motion.a
                  key={index}
                  href={action.href}
                  className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 hover:border-white/40 text-white font-semibold transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    if (action.href.startsWith('#')) {
                      e.preventDefault();
                      const element = document.getElementById(action.href.slice(1));
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  {/* Subtle hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <action.icon className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform" />
                  <span className="relative z-10">{action.label}</span>
                </motion.a>
              ))}
            </motion.div>

            {/* Premium CTA Button */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <motion.a
                href="https://chat.whatsapp.com/DHavwjz5I8z5UvM4haUNgf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 font-bold text-xl py-6 px-14 rounded-full overflow-hidden transition-all duration-500"
                style={{
                  background: "linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)",
                  boxShadow: "0 8px 32px -8px rgba(37, 211, 102, 0.5), inset 0 1px 0 rgba(255,255,255,0.3), inset 0 -1px 0 rgba(0,0,0,0.1)"
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 20px 60px -10px rgba(37, 211, 102, 0.6), 0 10px 30px -5px rgba(37, 211, 102, 0.4)"
                }}
                whileTap={{ scale: 0.97, y: -2 }}
              >
                {/* Inner glow layers */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/30 via-transparent to-black/10" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-white/50 via-transparent to-black/30">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-[#25D366] via-[#128C7E] to-[#075E54]" />
                </div>
                
                {/* Light sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                
                {/* WhatsApp icon */}
                <svg 
                  className="w-7 h-7 relative z-10" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.1-.473-.148-.673.15-.197.295-.771.961-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.136-.135.298-.354.446-.471.149-.148.198-.248.298-.413.098-.165.05-.31-.025-.434-.075-.122-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.516-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.359-.272.3-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.495.705.306 1.262.489 1.694.625.712.227 1.36.195 1.869.118.574-.086 1.757-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.345m-5.422 7.403h-.004a9.87 9.87 0 01-5.03-1.375l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.465h.005c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.256-6.169-3.53-8.413z"/>
                </svg>
                
                <span className="relative z-10 font-bold tracking-wide text-lg">
                  Join Our WhatsApp Community
                </span>
                
                <motion.span 
                  className="relative z-10"
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default StatsBannerNew;