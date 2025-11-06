import { motion } from "framer-motion";
import { Plus, Minus, HelpCircle, Sparkles } from "lucide-react";
import { useState } from "react";

const FAQSectionNew = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does BoostWhats work?",
      answer: "BoostWhats operates through a shared contact pool system. When you submit your contact, it gets added to our daily vCard file. You then download this file containing thousands of other members' contacts. Once you import these contacts to your phone, all members will see your WhatsApp status, exponentially increasing your views from a handful to thousands!"
    },
    {
      question: "Is it really free to join?",
      answer: "Yes! We offer a completely free plan that allows you to participate in the contact sharing pool. The free plan limits your name to 8 characters in the vCard. We also offer a premium plan with additional features like unlimited name length, priority placement, and extended contact information fields."
    },
    {
      question: "How many contacts will I get?",
      answer: "Our growing community has over 1,000 active members! You'll receive a daily vCard file containing hundreds of verified contacts. The number grows every day as more people join. Most members see their status views increase from around 50 to over 500 within the first week."
    },
    {
      question: "Is my data safe and private?",
      answer: "Absolutely! We take privacy seriously. Your contact information is only shared within our closed community of members who have also voluntarily submitted their details. We use bank-level encryption and never sell or share your data with third parties. You have full control and can request removal at any time."
    },
    {
      question: "How often are the contact lists updated?",
      answer: "Contact lists are compiled and updated daily! Every day at midnight (UTC), we generate a fresh vCard file with all the new submissions from that day. This ensures you always have access to the most current and active community members."
    },
    {
      question: "Can I remove my contact later?",
      answer: "Yes, you can request removal at any time. Simply contact our support team through the admin portal, and we'll remove your information from future compilations. However, please note that contacts already distributed in previous vCard files cannot be recalled from users who have already downloaded them."
    },
    {
      question: "What's the difference between Free and Premium?",
      answer: "The Free plan limits your display name to 8 characters and includes basic contact info (name, phone, country). The Premium plan offers unlimited name length, all optional fields (company, email, job title, website, custom fields), priority placement in the contact list, and enhanced visibility to other members."
    },
    {
      question: "Will this work on iPhone and Android?",
      answer: "Yes! vCard files (.vcf) are a universal standard supported by both iOS and Android. You can easily import the contact file on any smartphone. We provide step-by-step instructions for both platforms in our How It Works section."
    }
  ];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-white via-teal/5 to-white dark:from-gray-950 dark:via-teal/10 dark:to-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-teal/10 dark:bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-whatsapp/10 dark:bg-blue-whatsapp/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16 space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal/10 dark:bg-teal/20 border border-teal/20 dark:border-teal/30"
            whileHover={{ scale: 1.05 }}
          >
            <HelpCircle className="w-4 h-4 text-teal dark:text-green-light" />
            <span className="text-sm font-semibold text-teal dark:text-green-light">Common Questions</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white">
            Got Questions? 
            <span className="text-teal dark:text-green-light">
              We've Got Answers
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need to know about growing your WhatsApp audience
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div 
                className="group overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-teal/50 dark:hover:border-teal/30 transition-all duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
              >  
                {/* Gradient Accent */}
                {openIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}

                {/* Question Button */}
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left p-6 lg:p-8 flex items-start gap-4 relative z-10"
                >
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                      openIndex === index
                        ? 'bg-teal dark:bg-green-light'
                        : 'bg-gray-200 dark:bg-gray-800'
                    }`}>
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-white" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500 group-hover:text-teal dark:text-gray-400 dark:group-hover:text-green-light" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full px-6 py-5 text-left text-lg font-semibold text-gray-900 dark:text-white">
                      <span>{faq.question}</span>
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-teal dark:text-green-light" />
                      ) : (
                        <Plus className="w-5 h-5 text-gray-500 group-hover:text-teal dark:text-gray-400 dark:group-hover:text-green-light" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-6 lg:px-8 pb-6 lg:pb-8 pl-20 lg:pl-24">
                    <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12 lg:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-teal/10 dark:bg-teal/20 rounded-2xl border border-teal/20 dark:border-teal/30">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              Still have questions?
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Contact our support team - we're here to help!
            </p>
            <div className="mt-12 text-center">
              <a 
                href="#" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-teal hover:bg-teal-dark text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                Still have questions? Contact us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSectionNew;
