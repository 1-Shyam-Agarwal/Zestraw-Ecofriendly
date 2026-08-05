import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Droplets, BarChart3, ChevronDown, Award, Shield, Zap, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { getImpactStats, type ImpactStats } from "@/services/operations/impactAPI";
import { PageLoader } from "@/components/PageLoader";
import { formatPlasticReplaced } from "@/lib/impactStats";
import { useTranslation } from "react-i18next";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

export default function ImpactPage() {
  const { t } = useTranslation();
  const [guestsPerEvent, setGuestsPerEvent] = useState(100);
  const [eventsPerYear, setEventsPerYear] = useState(12);
  const [impactStats, setImpactStats] = useState<ImpactStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [impactError, setImpactError] = useState(false);

  const co2Saved = Math.round(guestsPerEvent * eventsPerYear * 2);
  const plasticDiverted = Math.round(guestsPerEvent * eventsPerYear * 15);

  useEffect(() => {
    let isMounted = true;

    const loadImpactStats = async () => {
      try {
        setLoading(true);
        const stats = await getImpactStats();
        if (isMounted) {
          setImpactStats(stats);
          setImpactError(false);
        }
      } catch (error) {
        console.error("GET_IMPACT_STATS_API ERROR...", error);
        if (isMounted) setImpactError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadImpactStats();

    return () => {
      isMounted = false;
    };
  }, []);

  const keyStats = [
    {
      icon: <Leaf className="w-6 h-6 text-eco" />,
      value: impactStats
        ? `${impactStats.totalCo2EmissionsSaved.toLocaleString()} kg`
        : impactError ? t("impactPage.unavailable") : "—",
      label: t("impactPage.co2Label"),
      sub: t("impactPage.co2Sub"),
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-primary" />,
      value: impactStats
        ? `${impactStats.totalParaliUsed.toLocaleString()} kg`
        : impactError ? t("impactPage.unavailable") : "—",
      label: t("impactPage.paraliLabel"),
      sub: t("impactPage.paraliSub"),
    },
    {
      icon: <Droplets className="w-6 h-6 text-eco" />,
      value: impactStats
        ? formatPlasticReplaced(impactStats.plasticPlatesReplaced)
        : impactError ? t("impactPage.unavailable") : "—",
      label: t("impactPage.plasticLabel"),
      sub: t("impactPage.plasticSub"),
    },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-16 text-center">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-eco-light text-eco text-xs font-semibold mb-4">
              {t("impactPage.badge")}
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              {t("impactPage.heroLine1")}<br />{t("impactPage.heroLine2")} <span className="text-gradient-primary italic">{t("impactPage.heroHighlight")}</span> {t("impactPage.heroLine3")}
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              {t("impactPage.heroSubtitle")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {loading ? (
            <PageLoader message={t("impactPage.loadingMetrics")} />
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {keyStats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-3 p-6">
                <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center">{stat.icon}</div>
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</span>
                <span className="text-xs text-muted-foreground">{stat.sub}</span>
              </div>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Lifecycle Comparison */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">{t("impactPage.lifecycleTitle")}</h2>
          <p className="text-muted-foreground mb-10">{t("impactPage.lifecycleSubtitle")}</p>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Chart placeholder */}
            <div className="bg-secondary rounded-2xl p-6">
              <h3 className="text-sm font-semibold mb-4">{t("impactPage.carbonFootprint")}</h3>
              <p className="text-xs text-muted-foreground mb-6">{t("impactPage.carbonSub")}</p>
              <div className="space-y-4">
                {[
                  { label: t("impactPage.barPlastic"), value: 95, color: "bg-foreground/20" },
                  { label: t("impactPage.barPaper"), value: 60, color: "bg-foreground/15" },
                  { label: "ZESTRAW", value: 8, color: "bg-eco" },
                ].map((bar) => (
                  <div key={bar.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{bar.label}</span>
                      <span>{bar.value}</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${bar.value}%` }}
                        viewport={{ once: true }}
                        className={`h-full ${bar.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-eco-light rounded-xl p-5">
                <span className="text-xs font-semibold text-eco uppercase">{t("impactPage.waterSavings")}</span>
                <p className="text-2xl font-bold mt-1">{t("impactPage.waterValue")}</p>
                <p className="text-xs text-muted-foreground">{t("impactPage.waterSub")}</p>
              </div>
              <div className="bg-eco-light rounded-xl p-5">
                <span className="text-xs font-semibold text-eco uppercase">{t("impactPage.decomposition")}</span>
                <p className="text-2xl font-bold mt-1">{t("impactPage.decompValue")}</p>
                <p className="text-xs text-muted-foreground">{t("impactPage.decompSub")}</p>
              </div>
              <div className="border border-border rounded-xl p-5">
                <button className="w-full flex items-center justify-between text-sm font-medium">
                  {t("impactPage.whyResidue")} <ChevronDown className="w-4 h-4" />
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  {t("impactPage.whyResidueText")}
                </p>
              </div>
              <div className="border border-border rounded-xl p-5">
                <button className="w-full flex items-center justify-between text-sm font-medium">
                  {t("impactPage.chemicalFree")} <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-primary/5 border-2 border-primary/20 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">✦</span>
              <h2 className="text-xl font-bold">{t("impactPage.calcTitle")}</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-8">{t("impactPage.calcSubtitle")}</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{t("impactPage.avgGuests")}</span>
                    <span>{guestsPerEvent}</span>
                  </div>
                  <input type="range" min={10} max={500} value={guestsPerEvent} onChange={(e) => setGuestsPerEvent(+e.target.value)} className="w-full accent-primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{t("impactPage.numEvents")}</span>
                    <span>{eventsPerYear}</span>
                  </div>
                  <input type="range" min={1} max={52} value={eventsPerYear} onChange={(e) => setEventsPerYear(+e.target.value)} className="w-full accent-primary" />
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center flex flex-col justify-center">
                <span className="text-3xl font-bold text-primary">{co2Saved.toLocaleString()} kg</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t("impactPage.co2Prevented")}</p>
                <span className="text-3xl font-bold text-primary mt-4">{plasticDiverted.toLocaleString()}</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t("impactPage.plasticDivertedLabel")}</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link to="/bulk-orders" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                {t("impactPage.startBulkInquiry")} ✦
              </Link>
              <p className="text-[10px] text-muted-foreground mt-2">{t("impactPage.calcFootnote")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">{t("impactPage.standardsTitle")}</h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">{t("impactPage.standardsSubtitle")}</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "ISO 14001", sub: t("impactPage.certIso") },
              { icon: <Award className="w-6 h-6" />, title: "OK Compost", sub: t("impactPage.certCompost") },
              { icon: <Heart className="w-6 h-6" />, title: "FDA Approved", sub: t("impactPage.certFda") },
              { icon: <Zap className="w-6 h-6" />, title: "BPA Free", sub: t("impactPage.certBpa") },
              { icon: <Leaf className="w-6 h-6" />, title: "Climate Neutral", sub: t("impactPage.certClimate") },
            ].map((cert) => (
              <div key={cert.title} className="flex flex-col items-center gap-2 p-4">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">{cert.icon}</div>
                <span className="text-sm font-semibold">{cert.title}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{cert.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">{t("impactPage.ctaTitle")}</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">{t("impactPage.ctaSubtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="px-6 py-3 rounded-full bg-card text-foreground font-semibold text-sm">{t("impactPage.shopCollection")}</Link>
            <Link to="/bulk-orders" className="px-6 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold text-sm">{t("nav.bulkOrders")}</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
