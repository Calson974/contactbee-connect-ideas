import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AcceptableUsePolicy = () => {
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
              Acceptable Use Policy
            </h1>
            <div className="h-1 w-20 bg-teal rounded-full mb-8"></div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Last updated: November 14, 2024
              </p>

              <section className="mb-8">
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This Acceptable Use Policy ("AUP") outlines the rules and guidelines for using the BoostWhats service. By accessing or using our service, you agree to comply with this AUP.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">1. Prohibited Activities</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You agree not to use the service to:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the intellectual property rights of others</li>
                  <li>Transmit any viruses, malware, or other harmful code</li>
                  <li>Engage in spamming, phishing, or other fraudulent activities</li>
                  <li>Harass, abuse, or harm others</li>
                  <li>Impersonate any person or entity</li>
                  <li>Interfere with or disrupt the service or servers</li>
                  <li>Collect or store personal data about other users without their consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">2. Content Standards</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You are responsible for all content you submit through the service. Your content must not:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Be illegal, defamatory, or fraudulent</li>
                  <li>Contain hate speech or promote violence</li>
                  <li>Include adult content or nudity</li>
                  <li>Promote illegal activities</li>
                  <li>Contain false or misleading information</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">3. Enforcement</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We reserve the right to investigate and take appropriate action against anyone who violates this AUP, including:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Removing or disabling access to content that violates this policy</li>
                  <li>Suspending or terminating user accounts</li>
                  <li>Reporting violations to law enforcement authorities</li>
                  <li>Taking legal action against violators</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">4. Reporting Violations</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you become aware of any violations of this AUP, please report them to us at abuse@boostwhats.com. Include as much detail as possible, including any relevant URLs or usernames.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">5. Changes to This Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may update this AUP from time to time. We will notify you of any changes by posting the new AUP on this page.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">6. Contact Us</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  If you have any questions about this Acceptable Use Policy, please contact us at support@boostwhats.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AcceptableUsePolicy;
