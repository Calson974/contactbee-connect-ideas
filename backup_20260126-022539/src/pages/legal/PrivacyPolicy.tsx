import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            <div className="h-1 w-20 bg-teal rounded-full mb-8"></div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Last updated: November 14, 2024
              </p>

              <section className="mb-8">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  At BoostWhats, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We collect information that you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Contact information (name, phone number, email)</li>
                  <li>Profile information (profile picture, status messages)</li>
                  <li>Usage data and analytics</li>
                  <li>Device information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Provide, maintain, and improve our service</li>
                  <li>Process transactions and send related information</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Monitor and analyze usage and trends</li>
                  <li>Personalize your experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. Sharing of Information</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may share your information in the following ways:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>With other users as part of the contact sharing service</li>
                  <li>With service providers who perform services on our behalf</li>
                  <li>When required by law or to protect rights</li>
                  <li>In connection with a merger or acquisition</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Data Security</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Your Choices</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You may update, correct, or delete your account information at any time by logging into your account. You may also contact us to request access to or deletion of your personal information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">7. Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you have any questions about this Privacy Policy, please contact us at privacy@boostwhats.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
