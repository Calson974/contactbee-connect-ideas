import { Rocket, Users, TrendingUp, Shield, Zap, Heart, Star, CheckCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const FeaturesNew = () => {
  const features = [
    {
      icon: Rocket,
      title: "Instant Growth",
      description: "Watch your WhatsApp status views skyrocket as thousands of participants automatically save your contact.",
      gradient: "from-teal to-blue-whatsapp",
      stats: "10x faster",
    },
    {
      icon: Users,
      title: "Thriving Community",
      description: "Join a vibrant ecosystem of 1,000+ users who actively support each other's growth and success.",
      gradient: "from-teal-dark to-teal",
      stats: "1K+ members",
    },
    {
      icon: TrendingUp,
      title: "Track & Optimize",
      description: "Monitor your growth with powerful real-time analytics and insights to maximize your reach daily.",
      gradient: "from-green-light to-teal",
      stats: "Real-time data",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Your data is protected with bank-level encryption. We never share your information with anyone.",
      gradient: "from-blue-whatsapp to-teal",
      stats: "100% secure",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Get results in minutes, not months. Our automated system works 24/7 to amplify your presence.",
      gradient: "from-teal-dark to-teal",
      stats: "24/7 active",
    },
    {
      icon: Heart,
      title: "Simple & Intuitive",
      description: "Beautiful interface designed for everyone. No technical knowledge required to start growing today.",
      gradient: "from-teal to-green-light",
      stats: "No learning curve",
    },
  ];

  const benefits = [
    "No technical skills needed - works with any WhatsApp account",
    "Grow your audience 5x faster than traditional methods",
    "100% automated - set it and forget it",
    "24/7 customer support",
    "Cancel anytime, no questions asked",
    "Trusted by 1,000+ users",
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-teal/5 to-blue-whatsapp/5 rounded-full blur-3xl" />
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
          >
            <Sparkles className="w-4 h-4 text-teal dark:text-green-light" />
            <span className="text-sm font-semibold text-teal dark:text-green-light">Why Choose Us</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">
            Everything You Need to
            <span className="text-teal dark:text-green-light">
              {" "}Grow on WhatsApp
            </span>
          </h2>
          
          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Everything you need to amplify your reach and build a massive, engaged audience
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              {/* Card Background with Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl blur-xl" 
                   style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
              
              {/* Card Content */}
              <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-200 dark:border-gray-800 rounded-3xl p-8 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                {/* Icon with Gradient */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Stats Badge */}
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 text-xs font-bold text-purple-700 dark:text-purple-300">
                    <Star className="w-3 h-3 fill-current" />
                    {feature.stats}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          className="mt-16 bg-gradient-to-r from-teal/5 via-blue-whatsapp/5 to-green-light/5 dark:from-teal/10 dark:via-teal-dark/10 dark:to-blue-whatsapp/10 rounded-2xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-whatsapp/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-sm font-semibold text-white">Complete Package</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Join 1,000+ users growing their WhatsApp status views
              </h3>

              <p className="text-lg text-purple-100 leading-relaxed">
                Get access to our complete suite of growth tools designed to maximize your WhatsApp presence and engagement.
              </p>
            </div>

            {/* Right Side - Benefits Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-teal dark:text-green-light mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16 lg:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Our platform provides all the tools and features you need to grow your WhatsApp status views and expand your network like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button className="px-6 py-3 bg-teal hover:bg-teal-dark text-white font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started Now
            </button>
            <button className="px-6 py-3 bg-white/80 hover:bg-white text-gray-800 font-medium rounded-lg transition-all duration-300 border border-gray-200 hover:border-teal/50 shadow-md hover:shadow-lg">
              Learn More
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesNew;
