import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import SubmissionForm from "@/components/SubmissionForm";
import { FAQSection } from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <>
      <Hero />
      
      <Features />
      <HowItWorks />
      <SubmissionForm />
      
      {/* Grow Your Network Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Grow Your Network Exponentially</h2>
              <p className="text-muted-foreground mb-6">
                Join thousands of professionals who have already expanded their network by 1000+ contacts. 
                Our curated contact lists help you connect with like-minded individuals and grow your 
                professional circle on WhatsApp.
              </p>
              <Button asChild>
                <Link to="/downloads" className="gap-2 inline-flex items-center">
                  <Download className="h-4 w-4" />
                  Get Started
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src="/img/gain-1000+contacts.jpg" 
                  alt="Grow your network by 1000+ contacts" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center py-12">
        <h3 className="text-2xl font-bold mb-4">Ready to boost your views?</h3>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Download our latest contact lists to start growing your WhatsApp status views
        </p>
        <Button asChild size="lg">
          <Link to="/downloads" className="gap-2 inline-flex items-center">
            <Download className="h-4 w-4" />
            Go to Downloads
          </Link>
        </Button>
      </div>
      <FAQSection />
      <Footer />
    </>
  );
};

export default Index;
