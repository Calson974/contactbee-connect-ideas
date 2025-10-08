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
      <div className="container mx-auto px-4 -mt-8 mb-16 flex justify-center">
        <LiveCounter />
      </div>
      <Features />
      <Pricing />
      <HowItWorks />
      <SubmissionForm />
      <DownloadVCards />
      <Footer />
    </>
  );
};

export default Index;
