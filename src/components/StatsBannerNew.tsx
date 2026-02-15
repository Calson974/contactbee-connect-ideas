import { motion } from "framer-motion";
import { Clock, Zap, TrendingUp, Users, Download, ArrowRight, Play } from "lucide-react";
import { useEffect, useState } from "react";

const StatsBannerNew = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateTimeLeft = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(21, 0, 0, 0);
      if (now > target) target.setDate(target.getDate() + 1);
      const diffMs = target.getTime() - now.getTime();
      setTimeLeft({
        hours: Math.floor(diffMs / (1000 * 60 * 60)),
        minutes: Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diffMs % (1000 * 60)) / 1000),
      });
    };
    updateTimeLeft();
    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const progressPercent = Math.round(
    (1 - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (21 * 3600)) * 100
  );

  return (
    <div className="relative z-50 -mt-20 lg:-mt-24 px-4 sm:px-6 lg:px-8">
      <motion.section
        className="relative overflow-hidden rounded-3xl shadow-2xl bg-gray-950"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Subtle grain overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }} />

        {/* Accent glow */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/6 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10 py-16 lg:py-20">
          
          {/* Top row: Badge + Title */}
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/8 backdrop-blur-md border border-white/10 mb-8">
              <Zap className="w-4 h-4 text-primary" fill="currentColor" />
              <span className="text-sm font-semibold text-white/90 tracking-wide">Daily Contact Compilation</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-[1.1]">
              Next vCard Drop{" "}
              <span className="inline-flex items-center gap-2 text-primary">
                <Clock className="w-8 h-8 lg:w-10 lg:h-10" />
                <span className="font-mono">9 PM</span>
              </span>
            </h2>
            
            <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Join <span className="text-primary font-semibold">1,000+ members</span> in our daily contact exchange.
            </p>
          </div>

          {/* Main grid: Timer + Video side by side */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            
            {/* Left: Timer */}
            <div className="space-y-8">
              {/* Countdown */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/8 p-8 lg:p-10">
                <div className="flex items-center justify-center gap-3 sm:gap-6">
                  {[
                    { value: timeLeft.hours, label: "Hours" },
                    { value: timeLeft.minutes, label: "Minutes" },
                    { value: timeLeft.seconds, label: "Seconds" },
                  ].map((unit, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-6">
                      <div className="text-center">
                        <div className="bg-gray-900/80 border border-white/10 rounded-2xl px-5 py-4 sm:px-8 sm:py-6 shadow-lg">
                          <div className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tabular-nums font-mono tracking-tighter">
                            {String(unit.value).padStart(2, '0')}
                          </div>
                        </div>
                        <div className="mt-3 text-white/40 font-medium text-xs sm:text-sm uppercase tracking-[0.15em]">{unit.label}</div>
                      </div>
                      {i < 2 && (
                        <div className="text-3xl sm:text-5xl font-thin text-primary/60 font-mono mb-6">:</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center mb-3 px-1">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-white/50 text-xs font-semibold uppercase tracking-widest">Compilation Progress</span>
                  </div>
                  <span className="text-sm font-bold text-primary font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/8">
                    {progressPercent}%
                  </span>
                </div>
                <div className="h-3 bg-gray-800/60 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)))' }}
                  />
                </div>
              </div>

              {/* Stats cards */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Users, label: "Active Users", value: "1,000+" },
                  { icon: Download, label: "Daily Contacts", value: "500+" },
                  { icon: TrendingUp, label: "Success Rate", value: "98%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/8 p-4 text-center hover:bg-white/8 transition-colors duration-300">
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="text-white font-bold text-lg">{stat.value}</div>
                    <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Video Spot */}
            <div className="flex flex-col gap-6">
              {/* Video embed placeholder */}
              <div className="relative flex-1 min-h-[280px] lg:min-h-[360px] rounded-2xl overflow-hidden bg-gray-900 border border-white/8 group">
                {/* Replace the placeholder with your YouTube embed */}
                {/* Example: <iframe src="https://www.youtube.com/embed/YOUR_VIDEO_ID" ... /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300">
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </div>
                  <h4 className="text-white font-bold text-lg mb-2">Watch How It Works</h4>
                  <p className="text-white/50 text-sm max-w-xs">See how our daily contact compilation grows your WhatsApp network</p>
                </div>
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Action buttons */}
              <div className="grid sm:grid-cols-2 gap-3">
                <motion.a
                  href="/downloads"
                  className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary/10 hover:bg-primary/15 border border-primary/20 hover:border-primary/40 text-white font-semibold text-sm transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Download className="w-4 h-4 text-primary" />
                  <span>Access Today's Contacts</span>
                </motion.a>
                <motion.a
                  href="#submit-form"
                  className="group flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 text-white font-semibold text-sm transition-all duration-300"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('submit-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Submit Your Contact</span>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Bottom CTA: WhatsApp Community */}
          <div className="text-center">
            <motion.a
              href="https://chat.whatsapp.com/DHavwjz5I8z5UvM4haUNgf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 font-bold text-base py-4 px-10 rounded-full overflow-hidden text-white transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #25D366 0%, #128C7E 50%, #075E54 100%)",
                boxShadow: "0 8px 24px -6px rgba(37, 211, 102, 0.4)"
              }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <svg className="w-5 h-5 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.1-.473-.148-.673.15-.197.295-.771.961-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.136-.135.298-.354.446-.471.149-.148.198-.248.298-.413.098-.165.05-.31-.025-.434-.075-.122-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.516-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.359-.272.3-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.495.705.306 1.262.489 1.694.625.712.227 1.36.195 1.869.118.574-.086 1.757-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.345m-5.422 7.403h-.004a9.87 9.87 0 01-5.03-1.375l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.465h.005c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.256-6.169-3.53-8.413z"/>
              </svg>
              <span className="relative z-10">Join Our WhatsApp Community</span>
              <span className="relative z-10">→</span>
            </motion.a>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default StatsBannerNew;
