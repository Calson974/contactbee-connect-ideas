import { motion } from "framer-motion";
import { Plus, Minus, HelpCircle, Zap } from "lucide-react";
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
      answer: "Yes! We offer a completely free Personal plan that allows you to participate in the contact sharing pool. The Personal plan limits your name to 8 characters in the vCard. We also offer a Business plan with additional features like unlimited name length, priority placement, and extended contact information fields."
    },
    {
      question: "How many contacts will I get?",
      answer: "Our growing community has over 1,000 active members! You'll receive a daily vCard file containing verified contacts. The number grows every day as more people join. Most members see their status views increase from around 50 to over 500 within the first week of consistently submiting their contacts daily."
    },
    {
      question: "How often are the contact lists updated?",
      answer: "Contact lists are compiled and updated daily! Every day at 9:00PM (UTC), we generate a fresh vCard file with all the new submissions from that day. This ensures you always have access to the most current and active community members."
    },
    {
      question: "Can I remove my contact later?",
      answer: "No, please note that contacts submited and already distributed in previous vCard files cannot be recalled from users who have already downloaded them."
    },
    {
      question: "What's the difference between Personal and Proffessional?",
      answer: "The Personal plan limits your display name to 8 characters and includes basic contact info (name, phone, country). The Proffessiona plan offers unlimited name length, all optional fields (company, email, job title, website, custom fields), priority placement in the contact list, and enhanced visibility to other members."
    },
    {
      question: "Will this work on iPhone and Android?",
      answer: "Yes! vCard files (.vcf) are a universal standard supported by both iOS and Android. You can easily import the contact file on any smartphone. We provide step-by-step instructions for both platforms in our How It Works section."
    }
  ];

  return (
    <section id="faq" className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent/10 dark:bg-accent/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 dark:border-primary/30"
            whileHover={{ scale: 1.05 }}
          >
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Common Questions</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground">
            Got Questions? 
            <span className="text-primary">
              We've Got Answers
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
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
                className="group overflow-hidden rounded-2xl border border-border hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm"
              >  
                {/* Gradient Accent */}
                {openIndex === index && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 pointer-events-none"
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
                        ? 'bg-primary'
                        : 'bg-muted'
                    }`}>
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full px-6 py-5 text-left text-lg font-semibold text-foreground">
                      <span>{faq.question}</span>
                      {openIndex === index ? (
                        <Minus className="w-5 h-5 text-primary" />
                      ) : (
                        <Plus className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
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
                    <p className="text-base lg:text-lg text-muted-foreground leading-relaxed">
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
          <div className="inline-flex flex-col items-center gap-4 px-8 py-6 bg-primary/10 dark:bg-primary/20 rounded-2xl border border-primary/20 dark:border-primary/30">
            <div className="text-xl font-bold text-foreground">
              Still have questions?
            </div>
            <p className="text-muted-foreground">
              Contact our support team - we're here to help!
            </p>
            <motion.div className="mt-12 text-center">
              <motion.a
                href="#submit-form"
                className="group relative overflow-hidden inline-flex items-center gap-2 font-bold text-lg py-4 px-8 rounded-full transition-all duration-300 border-0"
                style={{
                  background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)",
                  boxShadow: "0 4px 6px -1px hsl(var(--primary) / 0.2), 0 10px 15px -3px hsl(var(--primary) / 0.3), inset 0 1px 0 rgba(255,255,255,0.2), inset 0 -1px 0 rgba(0,0,0,0.1)"
                }}
                whileHover={{ 
                  scale: 1.03, 
                  y: -3,
                  boxShadow: "0 20px 40px -10px hsl(var(--primary) / 0.4), 0 10px 20px -5px hsl(var(--primary) / 0.2)"
                }}
                whileTap={{ scale: 0.97, y: -1 }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById('submit-form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {/* Inner glow layer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 via-transparent to-black/10" />
                
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-br from-white/40 via-transparent to-black/20">
                  <div className="h-full w-full rounded-full bg-gradient-to-br from-primary to-secondary" />
                </div>
                
                {/* Hover light sweep effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                
                <span className="relative z-10 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Still have questions? Contact us
                </span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSectionNew;
