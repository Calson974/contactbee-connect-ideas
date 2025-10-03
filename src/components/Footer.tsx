import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import logoFull from "@/assets/logo-full.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-background to-muted/20 border-t border-border py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <img src={logoFull} alt="BoostWhats" className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Build, save, and manage your WhatsApp contacts easily. Amplify your reach and grow your audience today.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <div className="flex space-x-3 mb-6">
              <a
                href="#"
                className="w-11 h-11 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-11 h-11 bg-primary/10 hover:bg-primary hover:text-primary-foreground rounded-xl flex items-center justify-center transition-all hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@boostwhats.com" className="hover:text-primary transition-colors">
                contact@boostwhats.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground space-y-2">
          <p>&copy; {new Date().getFullYear()} BoostWhats. All rights reserved.</p>
          <p>
            Disclaimer: All transactions involving any BoostWhats contact are at your discretion. Be wise!
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
