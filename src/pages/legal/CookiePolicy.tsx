import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-teal/5 to-white dark:from-gray-950 dark:via-teal/10 dark:to-gray-950">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/legal" 
            className="inline-flex items-center text-teal hover:text-teal/80 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Legal
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-800"
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Cookie Policy
            </h1>
            <div className="h-1 w-20 bg-teal rounded-full mb-8"></div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Last updated: November 14, 2024
              </p>

              <section className="mb-8">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This Cookie Policy explains how BoostWhats ("we," "us," or "our") uses cookies and similar tracking technologies when you visit our website or use our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. What Are Cookies</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the website owners.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. How We Use Cookies</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                  <li><strong>Functionality Cookies:</strong> Enable enhanced functionality and personalization</li>
                  <li><strong>Targeting/Advertising Cookies:</strong> Used to deliver relevant ads and measure ad performance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. Third-Party Cookies</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may also use various third-party cookies to report usage statistics of the service and deliver advertisements on and through the service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Your Choices Regarding Cookies</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Changes to This Cookie Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you have any questions about this Cookie Policy, please contact us at privacy@boostwhats.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
