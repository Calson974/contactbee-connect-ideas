import { motion } from "framer-motion";
import { UserPlus, Users, TrendingUp, Download, Sparkles, ArrowRight, CheckCircle } from "lucide-react";

const HowItWorksNew = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Submit Your Contact",
      description: "Fill out our simple form with your WhatsApp contact details. Takes less than 2 minutes!",
      color: "from-teal to-blue-whatsapp",
      details: ["Select your use case, could be Personal or Proffessional.", "Fill in your information", "Submit your information"]
    },
    {
      icon: Download,
      title: "Download Contact Pool",
      description: "Get access to our daily-updated vCard file containing hundreds of active community members.",
      color: "from-teal-dark to-teal",
      details: ["Daily updates at 9:00PM", "Verified contacts", "Easy import"]
    },
    {
      icon: Users,
      title: "Import to WhatsApp",
      description: "Simply import the vCard file to your phone's contacts. All contacts added automatically!",
      color: "from-blue-whatsapp to-teal",
      details: ["One-click import", "Auto-save contacts", "Instant sync"]
    },
    {
      icon: TrendingUp,
      title: "Watch Growth Happen",
      description: "Post your status and watch your views multiply as hundreds see your content organically.",
      color: "from-green-light to-teal",
      details: ["Exponential reach", "Real engagement", "Submiting your contact daily increases your chances of growing faster."]
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-white via-teal/5 to-white dark:from-gray-950 dark:via-teal/10 dark:to-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal/10 dark:bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-whatsapp/10 dark:bg-blue-whatsapp/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 lg:mb-24 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/20 dark:border-teal/30"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-teal dark:text-green-light" />
            <span className="text-sm font-semibold text-teal dark:text-green-light">Simple & Effective</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">
            How It
            <span className="text-teal dark:text-green-light">
              {" "}Works
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Four simple steps to transform your WhatsApp status views from dozens to thousands
          </p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative mb-12 lg:mb-16 last:mb-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute left-[52px] top-[120px] w-1 h-[calc(100%+2rem)] bg-gradient-to-b from-purple-300 to-transparent dark:from-purple-700 dark:to-transparent" />
              )}

              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-center">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
                  {/* Number Badge */}
                  <motion.div
                    className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-xl relative z-10`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-2xl lg:text-3xl font-black text-white">{index + 1}</span>
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    className={`hidden sm:flex w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-gradient-to-br ${step.color} items-center justify-center`}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                  >
                    <step.icon className="w-7 h-7 lg:w-8 lg:h-8 text-white" strokeWidth={2} />
                  </motion.div>

                  {/* Arrow for Desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowRight className="w-8 h-8 text-gray-400 dark:text-gray-600" />
                    </motion.div>
                  )}
                </div>

                {/* Content Card */}
                <motion.div
                  className="flex-1 group"
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-800/50 hover:border-teal/50 dark:hover:border-teal/30 transition-all duration-300 group">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      {/* Title */}
                      <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-lg text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Details List */}
                      <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <CheckCircle className="w-4 h-4 text-teal dark:text-green-light" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Decorative Corner */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${step.color} opacity-5 rounded-2xl transform translate-x-4 -translate-y-4 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform duration-300`} />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.a
            href="/downloads"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-teal hover:bg-teal-dark text-white font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksNew;
