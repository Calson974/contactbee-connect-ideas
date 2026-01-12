import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

const NotFoundNew = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | BoostWhats</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-300/20 dark:bg-pink-600/10 rounded-full blur-3xl" />
        </div>

        {/* Floating Orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-20 left-[15%] w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-2xl"
            animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 right-[20%] w-40 h-40 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl"
            animate={{ y: [0, 40, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Number */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            >
              <h1 className="text-[12rem] sm:text-[16rem] lg:text-[20rem] font-black leading-none bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
                404
              </h1>
            </motion.div>

            {/* Error Icon */}
            <motion.div
              className="flex justify-center mb-8"
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-30" />
                <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-full p-6 border-2 border-gray-200 dark:border-gray-800">
                  <Search className="w-16 h-16 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </motion.div>

            {/* Message */}
            <motion.div
              className="space-y-6 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Oops!</span>
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white">
                Page Not Found
              </h2>

              <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                The page you're looking for doesn't exist or has been moved. Let's get you back on track!
              </p>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold text-lg px-8 py-6 rounded-xl shadow-xl"
                >
                  <Link to="/" className="gap-3 inline-flex items-center">
                    <Home className="w-5 h-5" />
                    Back to Home
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      →
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-semibold text-lg px-8 py-6 rounded-xl border-2 hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                >
                  <Link to="/downloads" className="gap-3 inline-flex items-center">
                    <ArrowLeft className="w-5 h-5" />
                    Go to Downloads
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Popular Links */}
            <motion.div
              className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-6">
                Popular Pages
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { to: "/", label: "Home" },
                  { to: "/#features", label: "Features" },
                  { to: "/#how-it-works", label: "How It Works" },
                  { to: "/downloads", label: "Downloads" }
                ].map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={link.to}
                      className="px-5 py-2.5 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 transition-all"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default NotFoundNew;
