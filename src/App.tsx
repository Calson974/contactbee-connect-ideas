import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { HelmetProvider } from "react-helmet-async";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import AdminPage from "./pages/AdminPage";
import ArchivePage from "./pages/ArchivePage";
import DownloadsPage from "./pages/downloads";
import LegalIndex from "./pages/legal";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import CookiePolicy from "./pages/legal/CookiePolicy";
import AcceptableUsePolicy from "./pages/legal/AcceptableUsePolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Layout><Index /></Layout>} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/archive" element={<ArchivePage />} />
              <Route path="/downloads" element={<Layout><DownloadsPage /></Layout>} />
              
              {/* Legal Pages */}
              <Route path="/legal" element={<Layout><LegalIndex /></Layout>} />
              <Route path="/legal/terms" element={<Layout><TermsOfService /></Layout>} />
              <Route path="/legal/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
              <Route path="/legal/cookies" element={<Layout><CookiePolicy /></Layout>} />
              <Route path="/legal/acceptable-use" element={<Layout><AcceptableUsePolicy /></Layout>} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
