import { motion } from "framer-motion";
import { Clock, Calendar, Zap } from "lucide-react";
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

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl" />
        
        {/* Timer card */}
        <div className="relative bg-white/10 backdrop-blur-md border border-white/30 rounded-2xl p-6 min-w-[100px] shadow-2xl">
          <div className="text-6xl font-bold text-white tabular-nums tracking-tight">
            {String(value).padStart(2, '0')}
          </div>
        </div>
      </motion.div>
      
      <div className="mt-3 text-white/80 font-medium text-sm uppercase tracking-widest">
        {label}
      </div>
    </div>
  );

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://res.cloudinary.com/dmxik1gea/image/upload/v1762084948/greenbackground_wzknn8.jpg" 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Header badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/25 mb-8 shadow-xl"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05, borderColor: 'rgba(255,255,255,0.4)' }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-5 h-5 text-white" fill="white" />
            </motion.div>
            <span className="text-base font-semibold text-white tracking-wide">
              Next Generation Countdown
            </span>
          </motion.div>
          
          {/* Title */}
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            vCard Generation at{" "}
            <span className="inline-flex items-center gap-2 bg-white/20 px-4 py-1 rounded-lg">
              <Clock className="w-8 h-8" />
              9:00 PM
            </span>
          </motion.h2>
          
          <motion.p
            className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Your next automated vCard will be ready soon
          </motion.p>

          {/* Timer Display */}
          <motion.div
            className="mb-14"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
              <TimeUnit value={timeLeft.hours} label="Hours" />
              
              {/* Separator */}
              <motion.div
                className="text-6xl font-bold text-white/60 pb-8"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                :
              </motion.div>
              
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              
              {/* Separator */}
              <motion.div
                className="text-6xl font-bold text-white/60 pb-8"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
              >
                :
              </motion.div>
              
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>

              {/* Enhanced Progress bar with animations */}
              <div className="mt-10 max-w-2xl mx-auto px-4">
                <motion.div 
                  className="flex justify-between items-center mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4"
                    >
                      <svg viewBox="0 0 24 24" className="w-full h-full">
                        <motion.path
                          d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          animate={{ 
                            pathLength: [0.5, 1, 0.5],
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      </svg>
                    </motion.div>
                    <span className="text-sm font-semibold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                      Generating vCards
                    </span>
                  </div>
                  <motion.span 
                    className="text-sm font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"
                    key={`percentage-${timeLeft.hours}-${timeLeft.minutes}-${timeLeft.seconds}`}
                    initial={{ scale: 1.2, opacity: 0.5 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {Math.round((1 - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (21 * 3600)) * 100)}%
                  </motion.span>
                </motion.div>
                <div className="relative h-3 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
                  <motion.div 
                    className="h-full rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${(1 - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (21 * 3600)) * 100}%`,
                      background: [
                        'linear-gradient(90deg, #10b981, #3b82f6, #8b5cf6, #ec4899, #10b981)',
                        'linear-gradient(90deg, #ec4899, #10b981, #3b82f6, #8b5cf6, #ec4899)',
                      ]
                    }}
                    transition={{
                      width: { duration: 0.8, ease: "easeOut" },
                      background: { duration: 4, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <motion.div 
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                        width: '50%',
                        height: '100%',
                        transform: 'skewX(-20deg)'
                      }}
                      animate={{
                        x: ['-100%', '200%']
                      }}
                      transition={{
                        x: {
                          repeat: Infinity,
                          duration: 2,
                          ease: "easeInOut"
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-white/10" style={{
                      backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.2) 0%, transparent 20%)',
                      mixBlendMode: 'overlay'
                    }} />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Additional Links */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <motion.a
                href="/downloads"
                className="relative text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 group border-b border-white/50 hover:border-white pb-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                Go to Downloads
              </motion.a>
              
              <motion.a
                href="#submit-form"
                className="relative text-white/80 hover:text-white text-sm font-medium transition-colors duration-300 group border-b border-white/50 hover:border-white pb-1 cursor-pointer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('submit-form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Submit Your Today's Contact if You Haven't Yet
              </motion.a>
            </motion.div>

            {/* Spacer */}
            <div className="h-6"></div>

            {/* CTA Button */}
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            <motion.a
              href="https://chat.whatsapp.com/DHavwjz5l8z5UvM4haUNgf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Subtle shine effect on hover */}
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{ 
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      transform: 'translateX(-100%)',
                      animation: 'shine 3s infinite'
                    }} 
              />
              
              <motion.svg 
                className="w-6 h-6" 
                fill="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.1-.473-.148-.673.15-.197.295-.771.961-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.136-.135.298-.354.446-.471.149-.148.198-.248.298-.413.098-.165.05-.31-.025-.434-.075-.122-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.516-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.359-.272.3-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.495.705.306 1.262.489 1.694.625.712.227 1.36.195 1.869.118.574-.086 1.757-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.345m-5.422 7.403h-.004a9.87 9.87 0 01-5.03-1.375l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.465h.005c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.256-6.169-3.53-8.413z"/>
              </motion.svg>
              <span className="relative z-10 font-semibold tracking-wide">
                Join Our WhatsApp Community
              </span>
              <motion.span
                className="relative z-10 ml-1 transition-transform duration-300 group-hover:translate-x-1"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                →
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBannerNew;