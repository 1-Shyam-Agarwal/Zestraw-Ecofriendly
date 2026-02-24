import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import logo from "../assets/logo.png";

export function Footer() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast({ title: "Please enter a valid email address", variant: "destructive" });
      return;
    }
    toast({ title: "Subscribed!", description: "Welcome to the ZESTRAW community." });
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-6 py-16">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">

          {/* Subscribe + Brand */}
          <div className="md:col-span-2 space-y-6">

            {/* Subscribe */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Subscribe to our emails</h4>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-l-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  →
                </button>
              </form>
            </div>

            {/* Logo + Description */}
            <div>
              <img src={logo} alt="logo" className="w-32 h-auto mb-4" />
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                The OG Choice for Non-Toxic Kitchen Essentials. Crafted sustainably
                for a cleaner kitchen and a greener planet.
              </p>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>BPTP Discovery Park, Faridabad, Haryana, India</p>
                <p>care@zestraw.com</p>
                <p>+91 8595643038</p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 mt-4">
                <a href="#" className="p-2 rounded-full hover:bg-accent transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-accent transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full hover:bg-accent transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Shop</h4>
            <ul className="space-y-2.5">
              {["Disposable Plates", "Disposable Bowls", "Disposable Cups", "Disposable Cutlery", "Shop All"].map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["Our Mission", "Impact", "Sustainability Blog", "Careers"].map((item) => (
                <li key={item}>
                  <Link to="/impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Account */}
          <div>
            <h4 className="font-semibold text-sm mb-4">Help & Info</h4>
            <ul className="space-y-2.5">
              {[
                "FAQs",
                "Shipping Policy",
                "Returns & Refund",
                "Contact Us",
                "Terms of Service",
                "Privacy Policy"
              ].map((item) => (
                <li key={item}>
                  <Link to="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024 ZESTRAW. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              Shipping & Returns
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}