import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronRight, Leaf, Truck, BarChart3 } from "lucide-react";
import wholesaleHero from "@/assets/bulkorder.webp";
import { useTranslation } from "react-i18next";

import { validateEmail } from "@/lib/utils";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const pricingTiers = [
  { category: "Standard Plates (6, 8, 10 inch)", moq: "5,000 Units", lead: "10-14 Days", price: "₹2.50 - ₹6.00" },
  { category: "Deep Bowls (250ml - 500ml)", moq: "3,500 Units", lead: "10-12 Days", price: "₹3.00 - ₹7.50" },
  { category: "Compartment Trays", moq: "3,000 Units", lead: "20-24 Days", price: "₹6.00 - ₹12.00" },
  { category: "Custom Molds & Sizes", moq: "25,000 Units", lead: "45-60 Days", price: "Custom Quote" },
];

export default function BulkOrdersPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    businessName: "", businessType: "", fullName: "", email: "",
    volume: "", leadTime: "", products: [] as string[], customDesign: false, brandingReqs: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic required field validation
    if (!formData.businessName || !formData.fullName || !formData.email || !formData.volume) {
      toast.error(t("bulk.toastIncompleteTitle"), {
        description: t("bulk.toastIncompleteDesc")
      });
      return;
    }

    // Email format validation
    if (!validateEmail(formData.email)) {
      toast.error(t("bulk.toastInvalidEmailTitle"), {
        description: t("bulk.toastInvalidEmailDesc"),
      });
      return;
    }

    // Product selection validation
    if (formData.products.length === 0) {
      toast.error(t("bulk.toastProductTitle"), {
        description: t("bulk.toastProductDesc")
      });
      return;
    }

    setLoading(true);
    // Simulate enterprise API call
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);

    toast.success(t("bulk.toastSuccessTitle"), {
      description: t("bulk.toastSuccessDesc"),
      duration: 5000
    });

    // Reset form after success
    setFormData({
      businessName: "", businessType: "", fullName: "", email: "",
      volume: "", leadTime: "", products: [], customDesign: false, brandingReqs: "",
    });
  };

  const toggleProduct = (product: string) => {
    setFormData(prev => ({
      ...prev,
      products: prev.products.includes(product) ? prev.products.filter(p => p !== product) : [...prev.products, product],
    }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap--2 items-center">

            {/* Left Content */}
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                {t("bulk.heroTitlePrefix")}{" "}
                <span className="text-gradient-primary">
                  {t("bulk.heroHighlight")}
                </span>{" "}
                {t("bulk.heroTitleSuffix")}
              </h1>

              <p className="text-muted-foreground mb-8">
                {t("bulk.heroSubtitle")}
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="#quote-form"
                  className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm"
                >
                  {t("bulk.requestQuote")}
                </a>

                <button className="px-6 py-3 rounded-full border border-border font-semibold text-sm hover:bg-accent transition-colors">
                  ↓ {t("bulk.downloadCatalog")}
                </button>
              </div>

              <p className="text-xs text-muted-foreground mt-5">
                {t("bulk.trustedByPre")} <strong>20+</strong> {t("bulk.trustedByPost")}
              </p>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src={wholesaleHero}
                alt="Wholesale dining"
                className="w-full h-[400px] md:h-[500px] object-cover rounded-3xl"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Truck className="w-6 h-6" />, title: t("bulk.feature1Title"), desc: t("bulk.feature1Desc") },
              { icon: <Leaf className="w-6 h-6" />, title: t("bulk.feature2Title"), desc: t("bulk.feature2Desc") },
              { icon: <BarChart3 className="w-6 h-6" />, title: t("bulk.feature3Title"), desc: t("bulk.feature3Desc") },
            ].map((f) => (
              <div key={f.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary mx-auto mb-4">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form */}
      <section id="quote-form" className="py-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-card rounded-2xl border border-border p-8">
            <h2 className="text-2xl font-bold text-center mb-2">{t("bulk.formTitle")}</h2>
            <p className="text-sm text-muted-foreground text-center mb-8">{t("bulk.formSubtitle")}</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("bulk.businessName")}</label>
                  <input type="text" placeholder={t("bulk.businessNamePlaceholder")} value={formData.businessName}
                    onChange={(e) => setFormData(p => ({ ...p, businessName: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("bulk.businessType")}</label>
                  <input type="text" placeholder={t("bulk.businessTypePlaceholder")} value={formData.businessType}
                    onChange={(e) => setFormData(p => ({ ...p, businessType: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("bulk.fullName")}</label>
                  <input type="text" placeholder={t("bulk.fullNamePlaceholder")} value={formData.fullName}
                    onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("bulk.workEmail")}</label>
                  <input type="email" placeholder={t("bulk.workEmailPlaceholder")} value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("bulk.monthlyVolume")}</label>
                  <input type="text" placeholder={t("bulk.monthlyVolumePlaceholder")} value={formData.volume}
                    onChange={(e) => setFormData(p => ({ ...p, volume: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">{t("bulk.leadTime")}</label>
                  <input type="text" placeholder={t("bulk.leadTimePlaceholder")} value={formData.leadTime}
                    onChange={(e) => setFormData(p => ({ ...p, leadTime: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">{t("bulk.productsOfInterest")}</label>
                <div className="flex flex-wrap gap-3">
                  {["Plates", "Bowls", "Trays", "Cutlery"].map((p) => (
                    <label key={p} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" checked={formData.products.includes(p)} onChange={() => toggleProduct(p)} className="w-4 h-4 rounded border-border text-primary" />
                      {t(`bulk.prod.${p}`)}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm cursor-pointer mb-2">
                  <input type="checkbox" checked={formData.customDesign} onChange={(e) => setFormData(p => ({ ...p, customDesign: e.target.checked }))} className="w-4 h-4 rounded border-border text-primary" />
                  {t("bulk.customLogo")}
                </label>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">{t("bulk.brandingReqs")}</label>
                <textarea
                  placeholder={t("bulk.brandingPlaceholder")}
                  value={formData.brandingReqs}
                  onChange={(e) => setFormData(p => ({ ...p, brandingReqs: e.target.value }))}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
              >
                {loading ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : t("bulk.submitInquiry")}
              </button>
              <p className="text-[10px] text-muted-foreground text-center">{t("bulk.formConsent")}</p>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">{t("bulk.ctaTitle")}</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">{t("bulk.ctaSubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="px-6 py-3 rounded-full bg-card text-foreground font-semibold text-sm">{t("bulk.contactSales")}</Link>
            <button className="px-6 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold text-sm">{t("bulk.liveChat")}</button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
