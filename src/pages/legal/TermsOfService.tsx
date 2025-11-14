import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const TermsOfService = () => {
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
              Terms of Service
            </h1>
            <div className="h-1 w-20 bg-teal rounded-full mb-8"></div>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Last updated: November 14, 2024
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Welcome to BoostWhats</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  These Terms of Service govern your access to and use of the BoostWhats website located at www.boostwhats.com. By using this site, you agree to follow the rules described below. If you do not accept these terms, please discontinue use of the website.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Throughout this document, the words "you" and "your" refer to any person using our site or services. "BoostWhats", "BW", "we", "our", and "us" refer to the company that owns and operates this platform. The word "parties" refers to both you and BoostWhats together.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  These terms outline the conditions under which we provide our services, subject to applicable laws in Cameroon.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Data</h2>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>We do not accept responsibility for how transferred data is handled outside our platform.</li>
                  <li>We are not liable for any misuse, damage, or fraud that may arise from data you provide.</li>
                  <li>Any activity carried out with data outside this site is entirely your responsibility.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Cookies</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our website makes use of cookies to support essential functions and improve your experience. By browsing our site, you accept the use of cookies as described in our <Link to="/legal/privacy" className="text-teal hover:underline">Privacy Policy</Link>.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Some of our partners and advertisers may also rely on cookies when delivering their services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Intellectual Property</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  All content found on BoostWhats is owned by BW or its licensors. You may view this material for personal use only. The following actions are not permitted:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Republishing site material</li>
                  <li>Selling, renting, or sub-licensing any content</li>
                  <li>Copying or reproducing material</li>
                  <li>Redistributing BW content</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  User-generated comments or posts on the website reflect the views of their authors, not BoostWhats. We do not review comments before they appear, but we may remove content that is inappropriate or violates these terms.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  By posting comments on the site, you confirm that:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>You have permission to publish the material</li>
                  <li>The content does not violate another party's rights</li>
                  <li>The content is not defamatory, offensive, or unlawful</li>
                  <li>The content is not used to advertise or engage in unlawful activity</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You also grant BW a non-exclusive license to use, adapt, and display your comments in any format.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Links to Our Website</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  The following groups may link to our website without prior approval:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Government entities</li>
                  <li>Search engines</li>
                  <li>News media</li>
                  <li>Online directory services</li>
                  <li>Accredited businesses, except fundraising organizations and similar groups</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Links must not be misleading or imply endorsement. They should appear in a context appropriate to the linking site.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may also consider link requests from:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Business information platforms</li>
                  <li>Online communities</li>
                  <li>Associations and charities</li>
                  <li>Internet portals</li>
                  <li>Professional service firms</li>
                  <li>Educational or industry-related organizations</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Approved links may use our company name, site URL, or a descriptive reference that fits the context. Our logo or branded artwork may not be used without a formal license.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">iFrames</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You may not place frames around our pages that alter the look or function of the website without written permission.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Content Responsibility</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We are not responsible for content that appears on external websites linking to us. You agree to protect and defend BW from claims arising from such content. No links should appear on your website that could be viewed as unlawful, obscene, or infringing on the rights of others.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Privacy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Please review our <Link to="/legal/privacy" className="text-teal hover:underline">Privacy Policy</Link> for details on how your information is handled.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Our Rights</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may request removal of any link to our site at any time. By continuing to link to BoostWhats, you agree to follow these terms and any future changes.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We may revise our policies whenever needed.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Removal of Links</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you find any misleading or harmful link on our site, you may notify us. We may review such requests but are not obligated to act upon them.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We do not guarantee the accuracy, completeness, or timeliness of information on this site, and we do not promise uninterrupted availability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Refund Policy</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  If you are dissatisfied with your purchase, you may request a refund within 30 days. Refunds are handled by our support team.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  This does not apply to free credits or complimentary services.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  All refund requests must follow our verification and review process.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Service Terms</h2>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>BoostWhats is not affiliated with WhatsApp, Meta, or any related company.</li>
                  <li>You are responsible for complying with WhatsApp's rules and any applicable laws.</li>
                  <li>We are not responsible for actions taken on your WhatsApp account.</li>
                  <li>Providing your WhatsApp number is required to generate contact data.</li>
                  <li>We do not store, sell, or share your number with external parties.</li>
                  <li>Expected contact counts or view results cannot be guaranteed.</li>
                  <li>Service uptime is not guaranteed.</li>
                  <li>By purchasing our service, you acknowledge that you understand the product and will not file fraudulent disputes.</li>
                  <li>We may modify, suspend, or withdraw the service at any time without prior notice.</li>
                  <li>You are responsible for reviewing these terms for updates.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Disclaimer</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  As permitted by law, we exclude all warranties and representations regarding the website and the use of our services. Nothing in this disclaimer limits liability for:
                </p>
                <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2 mb-4">
                  <li>Death or personal injury</li>
                  <li>Fraud</li>
                  <li>Anything that cannot be limited under applicable law</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  These limitations apply to all forms of liability, including contract, tort, and statutory duties.
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Since the site and most of its resources are offered at little or no cost, we are not liable for any loss or damage arising from their use.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
