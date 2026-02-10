import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Can I increase my WhatsApp status views for free?',
      answer: 'Yes. Submit your contact using the free form and download the daily VCF files to start gaining views.'
    },
    {
      question: 'Is this only for users in Nigeria?',
      answer: 'No. It works in many countries, including Ghana, India, and the United States. It\'s just most active in Nigeria.'
    },
    {
      question: 'Does it work on iPhone?',
      answer: 'Yes. The VCF files are fully compatible with both Android and iPhone.'
    },
    {
      question: 'How many views can I get?',
      answer: 'With regular use, your status views can grow from around 1,000 to over 5,000 in a few weeks.'
    },
    {
      question: 'How often are new VCF files available?',
      answer: 'New contact lists are updated every day, so you can download fresh VCF files daily.'
    },
    {
      question: 'Is it safe to use?',
      answer: 'Yes. We only share public contacts for connection purposes, and no personal data is collected.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get answers to common questions about boosting your WhatsApp status views
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-background rounded-lg shadow-sm border border-border/50 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-${index}`}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              {openIndex === index && (
                <div id={`faq-${index}`} className="px-6 pb-4 pt-2 text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
