import { motion } from "framer-motion";
import { Heart, Github, Twitter, Linkedin, Mail, Sparkles, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const FooterNew = () => {
  const footerLinks = {
    product: [
      { name: "Features", href: "#features" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Downloads", href: "/downloads" },
      { name: "Pricing", href: "#home" }
    ],
    company: [
      { name: "About Us", href: "#home" },
      { name: "Contact", href: "#home" },
      { name: "FAQ", href: "#faq" },
      { name: "Support", href: "#home" }
    ],
    legal: [
      { name: "Privacy Policy", href: "#home" },
      { name: "Terms of Service", href: "#home" },
      { name: "Cookie Policy", href: "#home" },
      { name: "Disclaimer", href: "#home" }
    ]
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" }
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-teal-950 to-teal-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden dark:opacity-10 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300A884' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-whatsapp/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={`social-${index}`}
                      href={social.href}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-200 group"
                      whileHover={{ y: -3 }}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="w-5 h-5 text-white group-hover:text-green-light transition-colors" />
                    </motion.a>
                  );
                })}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                {/* Logo */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl blur-lg opacity-50" />
                    <img 
                      src="/favicon.png" 
                      alt="BoostWhats" 
                      className="relative w-12 h-12 rounded-xl" 
                    />
                  </div>
                  <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    BoostWhats
                  </span>
                </div>

                <p className="text-gray-300 leading-relaxed max-w-md">
                  Transform your WhatsApp status into a powerful reach tool. Join 10,000+ users growing their audience exponentially through our shared contact pool.
                </p>

                {/* Social Links */}
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-bold text-white capitalize">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-teal-light transition-colors"
                        aria-label={link.name}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          className="py-8 border-t border-teal/30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 lg:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-bold">Stay Updated</h3>
                </div>
                <p className="text-gray-300">
                  Get the latest updates and tips to grow your WhatsApp audience
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Link to="/downloads" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal hover:bg-teal-dark text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                  Get Started for Free
                  <span className="group-hover:translate-x-1 transition-transform">
                    <Sparkles className="w-4 h-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-teal/30">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">
              Made with <Heart className="inline w-4 h-4 text-teal" /> by BoostWhats Team
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-teal-light transition-colors">
                Privacy Policy
              </a>
              <span className="text-teal/50">•</span>
              <a href="#" className="text-sm text-gray-400 hover:text-teal-light transition-colors">
                Terms of Service
              </a>
              <span className="text-teal/50">•</span>
              <a href="#" className="text-sm text-gray-400 hover:text-teal-light transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterNew;
