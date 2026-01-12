import { motion } from "framer-motion";
import { ArrowLeft, FileText, Shield, Cookie, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LegalIndex = () => {
  const legalDocs = [
    {
      title: "Terms of Service",
      description: "The legal agreement between you and BoostWhats regarding the use of our services.",
      icon: <FileText className="w-6 h-6 text-teal" />,
      path: "/legal/terms"
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your personal information.",
      icon: <Shield className="w-6 h-6 text-teal" />,
      path: "/legal/privacy"
    },
    {
      title: "Cookie Policy",
      description: "Information about how we use cookies and similar technologies.",
      icon: <Cookie className="w-6 h-6 text-teal" />,
      path: "/legal/cookies"
    },
    {
      title: "Acceptable Use Policy",
      description: "Guidelines for appropriate use of our services.",
      icon: <CheckCircle className="w-6 h-6 text-teal" />,
      path: "/legal/acceptable-use"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal/5 to-white dark:from-gray-950 dark:via-teal/10 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/" 
            className="inline-flex items-center text-teal hover:text-teal/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Legal Information
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Review our legal documents to understand how we operate and protect your information.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {legalDocs.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={doc.path}
                  className="h-full block p-6 bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-teal/50 dark:hover:border-teal/30 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-teal/10 rounded-lg">
                      {doc.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-teal transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalIndex;
