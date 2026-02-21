import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Droplets, BarChart3, ChevronDown, Award, Shield, Zap, Heart } from "lucide-react";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

export default function ImpactPage() {
  const [guestsPerEvent, setGuestsPerEvent] = useState(100);
  const [eventsPerYear, setEventsPerYear] = useState(12);

  const co2Saved = Math.round(guestsPerEvent * eventsPerYear * 2);
  const plasticDiverted = Math.round(guestsPerEvent * eventsPerYear * 15);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-secondary py-16 text-center">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span variants={fadeUp} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-eco-light text-eco text-xs font-semibold mb-4">
              Real Impact, Real Data
            </motion.span>
            <motion.h1 variants={fadeUp} className="text-3xl md:text-5xl font-bold mb-4">
              Measuring Our Journey<br />Toward a <span className="text-gradient-primary italic">Plastic-Free</span> Planet
            </motion.h1>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mx-auto">
              By converting agricultural waste into high-performance tableware, ZESTRAW creates a circular economy that benefits farmers, consumers, and the earth.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Key Stats */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            {[
              { icon: <Leaf className="w-6 h-6 text-eco" />, value: "45,280 kg", label: "CO₂ EMISSIONS SAVED", sub: "Equivalent to 2,300 trees planted" },
              { icon: <BarChart3 className="w-6 h-6 text-primary" />, value: "1,240 Acres", label: "STUBBLE BURNING PREVENTED", sub: "Reduced local air particulate matter" },
              { icon: <Droplets className="w-6 h-6 text-eco" />, value: "8.4 Million", label: "PLASTIC REPLACED", sub: "Items diverted from landfills" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-3 p-6">
                <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center">{stat.icon}</div>
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</span>
                <span className="text-xs text-muted-foreground">{stat.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Comparison */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Lifecycle Comparison</h2>
          <p className="text-muted-foreground mb-10">See how ZESTRAW compares to traditional materials across key environmental indicators.</p>
          <div className="grid md:grid-cols-2 gap-10">
            {/* Chart placeholder */}
            <div className="bg-secondary rounded-2xl p-6">
              <h3 className="text-sm font-semibold mb-4">Carbon Footprint (kg CO2e)</h3>
              <p className="text-xs text-muted-foreground mb-6">Estimated emissions per 1,000 units of product</p>
              <div className="space-y-4">
                {[
                  { label: "Plastic", value: 95, color: "bg-foreground/20" },
                  { label: "Paper", value: 60, color: "bg-foreground/15" },
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
                <span className="text-xs font-semibold text-eco uppercase">Water Savings</span>
                <p className="text-2xl font-bold mt-1">94% Less</p>
                <p className="text-xs text-muted-foreground">Compared to industrial paper pulping processes.</p>
              </div>
              <div className="bg-eco-light rounded-xl p-5">
                <span className="text-xs font-semibold text-eco uppercase">Decomposition</span>
                <p className="text-2xl font-bold mt-1">90 Days</p>
                <p className="text-xs text-muted-foreground">Home compostable. Plastic takes 450+ years.</p>
              </div>
              <div className="border border-border rounded-xl p-5">
                <button className="w-full flex items-center justify-between text-sm font-medium">
                  Why Agricultural Residue? <ChevronDown className="w-4 h-4" />
                </button>
                <p className="text-xs text-muted-foreground mt-3">
                  Rice straw is typically burned in North India, releasing millions of tons of particulate matter (PM2.5) into the atmosphere. We intercept this "waste" and mold it into tableware, providing farmers an alternative to burning while keeping carbon locked in a physical product.
                </p>
              </div>
              <div className="border border-border rounded-xl p-5">
                <button className="w-full flex items-center justify-between text-sm font-medium">
                  Chemical-Free Production <ChevronDown className="w-4 h-4" />
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
              <h2 className="text-xl font-bold">Calculate Your Potential Savings</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-8">Estimate how much plastic waste and CO₂ you can prevent by switching to ZESTRAW for your events or business.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Average Guests per Event</span>
                    <span>{guestsPerEvent}</span>
                  </div>
                  <input type="range" min={10} max={500} value={guestsPerEvent} onChange={(e) => setGuestsPerEvent(+e.target.value)} className="w-full accent-primary" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Number of Events per Year</span>
                    <span>{eventsPerYear}</span>
                  </div>
                  <input type="range" min={1} max={52} value={eventsPerYear} onChange={(e) => setEventsPerYear(+e.target.value)} className="w-full accent-primary" />
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 text-center flex flex-col justify-center">
                <span className="text-3xl font-bold text-primary">{co2Saved.toLocaleString()} kg</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">CO₂ PREVENTED ANNUALLY</p>
                <span className="text-3xl font-bold text-primary mt-4">{plasticDiverted.toLocaleString()}</span>
                <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">PLASTIC ITEMS DIVERTED</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <Link to="/bulk-orders" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                Start Your Bulk Inquiry ✦
              </Link>
              <p className="text-[10px] text-muted-foreground mt-2">*Estimates based on standard lifecycle analysis (LCA) data comparing ZESTRAW to PS plastic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">Globally Recognized Standards</h2>
          <p className="text-muted-foreground mb-10 max-w-lg mx-auto">Transparency is at the core of ZESTRAW. We hold ourselves to the highest international standards for sustainability and food safety.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "ISO 14001", sub: "ENVIRONMENTAL MANAGEMENT" },
              { icon: <Award className="w-6 h-6" />, title: "OK Compost", sub: "HOME & INDUSTRIAL" },
              { icon: <Heart className="w-6 h-6" />, title: "FDA Approved", sub: "FOOD-GRADE SAFETY" },
              { icon: <Zap className="w-6 h-6" />, title: "BPA Free", sub: "ZERO CHEMICALS" },
              { icon: <Leaf className="w-6 h-6" />, title: "Climate Neutral", sub: "CERTIFIED OFFSET" },
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
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to make the switch?</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">Join over 500+ businesses and thousands of homes in choosing the earth. Every plate counts.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="px-6 py-3 rounded-full bg-card text-foreground font-semibold text-sm">Shop the Collection</Link>
            <Link to="/bulk-orders" className="px-6 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold text-sm">Bulk Orders</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
