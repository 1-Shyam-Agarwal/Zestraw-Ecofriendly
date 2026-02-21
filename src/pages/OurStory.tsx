import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Flame, ChevronRight, ChevronDown, Target, Eye } from "lucide-react";
import { useState } from "react";
import riceField from "@/assets/rice-field.jpg";
import paraliImage from "@/assets/parali-crisis.jpg";
import heroTableware from "@/assets/hero-tableware.jpg";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const faqs = [
  { q: "Is there any chemical binder used in ZESTRAW?", a: "No. Our innovation lies in the 'Natural Lignin Bond'. By applying specific pressure and temperature, we activate the natural lignin within the rice straw fibers, which acts as its own binder. This makes our plates 100% chemical-free and safe for direct food contact." },
  { q: "How do you support the farmers?", a: "We purchase rice straw directly from farmers at fair market rates, providing them an alternative income source instead of burning the residue." },
  { q: "Are the products microwave and oven safe?", a: "Yes, our products are heat-resistant up to 180°C (356°F), making them safe for microwave and conventional oven use." },
];

const processSteps = [
  { icon: "🌾", step: "STEP 01", title: "Collection", desc: "We source raw rice straw directly from farmers, preventing burning." },
  { icon: "⚙️", step: "STEP 02", title: "Processing", desc: "Straw is cleaned, crushed, and pulped using mechanical energy." },
  { icon: "📊", step: "STEP 03", title: "Molding", desc: "High-pressure thermo-molding creates durable, water-resistant products." },
  { icon: "✓", step: "STEP 04", title: "Quality Control", desc: "Each piece is sterilized and checked for structural integrity." },
  { icon: "🌱", step: "STEP 05", title: "Composting", desc: "After use, it returns to the earth as nutrient-rich compost in 90 days." },
];

export default function OurStoryPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.span variants={fadeUp} className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold mb-4">
                <Flame className="w-3 h-3" /> The Crisis We Face
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                From Smog To{" "}
                <span className="text-gradient-primary italic">Sustainability.</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Every winter, thousands of tons of rice straw are burned across India, creating a toxic haze. At ZESTRAW, we saw this not as a waste, but as a resource.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link to="/impact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                  Our Mission
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                <Flame className="w-4 h-4 text-destructive" />
                <span>100M+ tons burned annually</span>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <img src={riceField} alt="Rice fields" className="rounded-2xl w-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Parali Crisis */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">The Problem</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">The 'Parali' Crisis</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In the heart of India's agricultural belt, a phenomenon known as Parali burning takes place twice a year. After the rice harvest, farmers often burn the leftover straw (stubble) to quickly clear fields for the next crop.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This releases massive amounts of CO₂, methane, and particulate matter, choking cities and damaging the very soil that feeds us. We believe there is a better way to treat the earth.
              </p>
            </div>
            <div>
              <img src={paraliImage} alt="Parali crisis" className="rounded-2xl w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Loop */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-3">The ZESTRAW Innovation Loop</h2>
          <p className="text-muted-foreground mb-12 max-w-lg mx-auto">How we transform agricultural residue into premium, food-safe tableware without a single chemical additive.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {processSteps.map((step) => (
              <div key={step.title} className="flex flex-col items-center gap-3">
                <div className="text-3xl">{step.icon}</div>
                <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">{step.step}</span>
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nature's Alternative */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <img src={heroTableware} alt="ZESTRAW products" className="rounded-2xl w-full object-cover" />
            <div>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">The Solution</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">Nature's Plastic Alternative</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ZESTRAW is not just a plate; it's a statement. By utilizing 100% natural rice straw fiber, we've engineered a material that is heat-resistant, microwave-safe, and naturally oil-repellent.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Unlike paper, we don't cut trees. Unlike plastic, we don't last forever. Our products are designed for the circular economy—born from the soil, returning to the soil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-secondary rounded-2xl p-8 relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Mission</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                To eliminate single-use plastic pollution and agricultural burning by creating the world's most sustainable, high-performance tableware solutions. We empower farmers and protect consumers through transparency and innovation.
              </p>
            </div>
            <div className="bg-secondary rounded-2xl p-8 relative overflow-hidden">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Eye className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Our Vision</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A world where everyday objects are in harmony with the Earth's natural cycles. We envision a future where 'waste' is an obsolete concept, and every meal served is a step toward a cleaner, greener planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-3">Frequently Asked Questions</h2>
          <p className="text-muted-foreground text-center mb-10">Everything you need to know about our material and ethics.</p>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-accent/50 transition-colors"
                >
                  <span className="text-sm font-medium">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-2 mb-4 text-3xl">🌾🌍🍽️</div>
          <div className="w-10 h-10 rounded-full bg-eco flex items-center justify-center mx-auto mb-4">
            <Leaf className="w-5 h-5 text-eco-foreground" />
          </div>
          <h2 className="text-3xl font-bold mb-3">Ready to join the movement?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">Every purchase saves an average of 1.2kg of CO₂ from entering the atmosphere. Make your next meal purposeful.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm">Shop the Collection</Link>
            <Link to="/bulk-orders" className="px-6 py-3 rounded-full border border-border font-semibold text-sm hover:bg-accent transition-colors">For Business Inquiries</Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-foreground">
            <span>✓ ISO 22000 Certified</span>
            <span>✓ 100% Compostable</span>
            <span>✓ Plastic Free Packaging</span>
          </div>
        </div>
      </section>
    </Layout>
  );
}
