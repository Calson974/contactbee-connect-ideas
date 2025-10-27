import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Logo */}
          <div className="text-2xl font-bold text-primary">
            BoostWhats
          </div>
          
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Cameroon</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:boostwhats@gmail.com" className="hover:text-primary transition-colors">
                boostwhats@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+237 676 078 168" className="hover:text-primary transition-colors">
                +237 676 078 168
              </a>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="text-sm text-muted-foreground pt-4 border-t border-border/30 w-full max-w-md">
            <p>&copy; {new Date().getFullYear()} Disclaimer: All transactions carried out involving any WV contact is at your discretion. Be Wise!

© Copyright 2025 WassapViews - Get more WhatsApp views</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
