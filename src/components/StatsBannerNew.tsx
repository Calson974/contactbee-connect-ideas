import { Clock, Users, Download, TrendingUp, ArrowRight, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const progressPercent = Math.round(
    (1 - (timeLeft.hours * 3600 + timeLeft.minutes * 60 + timeLeft.seconds) / (21 * 3600)) * 100
  );

  const stats = [
    { icon: Users, value: "1,000+", label: "Active Users" },
    { icon: Download, value: "500+", label: "Daily Contacts" },
    { icon: TrendingUp, value: "98%", label: "Success Rate" },
  ];

  return (
    <div className="relative z-50 -mt-16 lg:-mt-20 px-4 sm:px-6 lg:px-8">
      <motion.section
        className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
        style={{ background: "linear-gradient(145deg, hsl(210 20% 8%), hsl(210 18% 12%), hsl(210 20% 8%))" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Subtle top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07]" style={{ background: "hsl(142 70% 45%)" }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05]" style={{ background: "hsl(142 60% 35%)" }} />

        <div className="relative z-10 p-8 sm:p-10 lg:p-14">
          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT: Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                  Live · Daily Compilation
                </span>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl text-white mb-4 leading-tight">
                  Next vCard Drop
                </h2>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white/5 border border-white/10">
                  <Clock className="w-6 h-6 text-primary" />
                  <span className="text-white font-mono text-2xl md:text-3xl font-bold tracking-tight">9:00 PM</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-white/60 text-lg leading-relaxed max-w-md">
                Join <span className="text-primary font-medium">1,000+ members</span> in our daily contact exchange. Your network grows while you sleep.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg leading-tight">{stat.value}</div>
                      <div className="text-white/40 text-xs font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="/downloads"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  <Download className="w-4 h-4" />
                  Today's Contacts
                </a>
                <a
                  href="#submit-form"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('submit-form')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                  Submit Contact
                </a>
              </div>
            </div>

            {/* RIGHT: Timer + Progress */}
            <div className="space-y-8">
              {/* Timer card */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-8 sm:p-10">
                <div className="text-center mb-6">
                  <span className="text-white/40 text-sm font-medium uppercase tracking-widest">Countdown</span>
                </div>

                <div className="flex items-center justify-center gap-3 sm:gap-5">
                  {[
                    { value: timeLeft.hours, label: "HRS" },
                    { value: timeLeft.minutes, label: "MIN" },
                    { value: timeLeft.seconds, label: "SEC" },
                  ].map((unit, i) => (
                    <div key={i} className="flex items-center gap-3 sm:gap-5">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="bg-white/[0.04] border border-white/10 rounded-2xl px-5 py-4 sm:px-7 sm:py-6 min-w-[72px] sm:min-w-[96px] text-center">
                            <span className="text-4xl sm:text-5xl lg:text-6xl font-mono font-black text-white tabular-nums tracking-tighter">
                              {String(unit.value).padStart(2, "0")}
                            </span>
                          </div>
                        </div>
                        <span className="mt-3 text-white/30 text-[10px] sm:text-xs font-bold tracking-[0.25em]">
                          {unit.label}
                        </span>
                      </div>
                      {i < 2 && (
                        <span className="text-primary/60 text-3xl sm:text-4xl font-mono font-light mb-6">:</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress section */}
              <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">
                      Compilation Progress
                    </span>
                  </div>
                  <span className="text-primary font-mono font-bold text-sm bg-primary/10 px-3 py-1 rounded-lg">
                    {progressPercent}%
                  </span>
                </div>

                <div className="relative h-2.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ width: { duration: 0.8, ease: "easeOut" } }}
                    style={{ background: "linear-gradient(90deg, hsl(142 70% 35%), hsl(142 70% 45%), hsl(142 60% 55%))" }}
                  >
                    <div className="absolute inset-0 shimmer" />
                  </motion.div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://chat.whatsapp.com/DHavwjz5I8z5UvM4haUNgf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 w-full py-4 px-6 rounded-2xl font-bold text-white text-base transition-all duration-300 hover:shadow-lg"
                style={{
                  background: "linear-gradient(135deg, #25D366, #128C7E)",
                  boxShadow: "0 4px 20px -4px rgba(37,211,102,0.3)",
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.1-.473-.148-.673.15-.197.295-.771.961-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.761-1.66-2.059-.173-.297-.018-.458.13-.606.136-.135.298-.354.446-.471.149-.148.198-.248.298-.413.098-.165.05-.31-.025-.434-.075-.122-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.516-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.359-.272.3-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.495.705.306 1.262.489 1.694.625.712.227 1.36.195 1.869.118.574-.086 1.757-.718 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.345m-5.422 7.403h-.004a9.87 9.87 0 01-5.03-1.375l-.36-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.723 1.465h.005c6.554 0 11.89-5.335 11.89-11.893 0-3.18-1.256-6.169-3.53-8.413z" />
                </svg>
                <span>Join WhatsApp Community</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default StatsBannerNew;
