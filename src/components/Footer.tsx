import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import logo from "../assets/logo.png";

export function Footer() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const shopLinks = ["disposablePlates", "disposableBowls", "disposableCups", "disposableCutlery", "shopAll"];
  const companyLinks = ["ourMission", "impact", "sustainabilityBlog", "careers"];
  const helpLinks = ["faqs", "shippingPolicy", "returnsRefund", "contactUs", "termsOfService", "privacyPolicy"];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      toast({ title: t("footer.invalidEmail"), variant: "destructive" });
      return;
    }
    toast({ title: t("footer.subscribed"), description: t("footer.subscribedDesc") });
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
              <h4 className="font-semibold text-sm mb-3">{t("footer.subscribeHeading")}</h4>
              <form onSubmit={handleSubscribe} className="flex max-w-md">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
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
                {t("footer.brandDesc")}
              </p>

              <div className="text-sm text-muted-foreground space-y-1">
                <p>{t("footer.address")}</p>
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
            <h4 className="font-semibold text-sm mb-4">{t("footer.shop")}</h4>
            <ul className="space-y-2.5">
              {shopLinks.map((item) => (
                <li key={item}>
                  <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(`footer.links.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t("footer.company")}</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((item) => (
                <li key={item}>
                  <Link to="/impact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(`footer.links.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help & Account */}
          <div>
            <h4 className="font-semibold text-sm mb-4">{t("footer.helpInfo")}</h4>
            <ul className="space-y-2.5">
              {helpLinks.map((item) => (
                <li key={item}>
                  <Link to="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {t(`footer.links.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.links.privacyPolicy")}
            </Link>
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.links.termsOfService")}
            </Link>
            <Link to="/legal" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {t("footer.shippingReturns")}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}