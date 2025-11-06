import { motion } from "framer-motion";
import { Users, Eye, TrendingUp, Globe, MessageSquare, Star } from "lucide-react";

const StatsBannerNew = () => {
  const stats = [
    { 
      icon: Users, 
      value: "500+", 
      label: "Active Members",
      gradient: "from-teal to-green-light"
    },
    { 
      icon: MessageSquare, 
      value: "5K+", 
      label: "Daily Messages",
      gradient: "from-blue-whatsapp to-cyan-400"
    },
    { 
      icon: TrendingUp, 
      value: "150%", 
      label: "Engagement Growth",
      gradient: "from-green-light to-green-400"
    },
    { 
      icon: Globe, 
      value: "30+", 
      label: "Countries",
      gradient: "from-teal-dark to-teal"
    },
  ];

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden bg-gradient-to-br from-teal-dark via-teal to-teal-light dark:from-teal-dark/90 dark:via-teal/80 dark:to-teal-light/80">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-[10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"
          animate={{ y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-[15%] w-40 h-40 bg-white/10 rounded-full blur-2xl"
          animate={{ y: [0, 40, 0], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">Our Impact</span>
          </motion.div>
          <h2 className="text-3xl lg:text-5xl font-black text-white">
            Our Growing Community
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 lg:p-8 text-center hover:bg-white/2 transition-all duration-300 shadow-lg hover:shadow-xl">
                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Value */}
                <motion.div
                  className="text-3xl lg:text-5xl font-black text-white mb-2"
                  initial={{ scale: 0.5 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 200, delay: index * 0.1 + 0.3 }}
                >
                  {stat.value}
                </motion.div>

                {/* Label */}
                <div className="text-sm lg:text-base font-semibold text-white/90">
                  {stat.label}
                </div>

                {/* Premium Silver Shine Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/80 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 opacity-30 group-hover:opacity-50" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Message */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
            <MessageSquare className="w-5 h-5 text-white" />
            <span className="text-white font-semibold">
              Join our WhatsApp community and grow your network today!
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBannerNew;
