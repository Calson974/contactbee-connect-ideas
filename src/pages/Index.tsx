import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import HowItWorks from "@/components/HowItWorks";
import SubmissionForm from "@/components/SubmissionForm";
import DownloadVCards from "@/components/DownloadVCards";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <HowItWorks />
      <SubmissionForm />
      <DownloadVCards />
      <Footer />
    </div>
  );
};

export default Index;
