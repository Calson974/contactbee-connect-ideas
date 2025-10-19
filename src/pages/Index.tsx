import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import SubmissionForm from "@/components/SubmissionForm";
import DownloadVCards from "@/components/DownloadVCards";
import Footer from "@/components/Footer";
import { LiveCounter } from "@/components/LiveCounter";

const Index = () => {
  return (
    <>
      <Hero />
      
      <Features />
      <Pricing />
      <HowItWorks />
      <SubmissionForm />
      <div className="container mx-auto px-4 -mt-20 mb-6 flex justify-center">
        <LiveCounter />
      </div>
      <DownloadVCards />
      <Footer />
    </>
  );
};

export default Index;
