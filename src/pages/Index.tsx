import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { motion } from "framer-motion";
import { Droplets, Leaf, Shield, Flame, ChevronRight, Star } from "lucide-react";
import heroImage from "@/assets/hero-tableware.jpg";
import paraliImage from "@/assets/parali-crisis.jpg";
import productPlates from "@/assets/product-plates.jpg";
import productBowls from "@/assets/product-bowls.jpg";
import productTray from "@/assets/product-tray.jpg";
import productCombo from "@/assets/product-combo.jpg";
import riceField from "@/assets/rice-field.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp}>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-eco-light text-eco text-xs font-semibold mb-6">
                  <Leaf className="w-3 h-3" /> Sustainable Innovation
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Turning{" "}
                <span className="text-gradient-primary italic">Parali</span> into
                Purposeful Plates.
              </motion.h1>
              <motion.p variants={fadeUp} className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
                Premium, biodegradable tableware crafted from rice straw residue. Combatting air pollution while elevating your dining experience.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                >
                  Shop Now
                </Link>
                <Link
                  to="/impact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-semibold text-sm hover:bg-accent transition-colors"
                >
                  Our Impact
                </Link>
              </motion.div>
              <motion.div variants={fadeUp} className="flex items-center gap-2 mt-6 text-sm text-muted-foreground">
                <Leaf className="w-4 h-4 text-eco" />
                <span>100% Compostable · <strong>Soil to Soil</strong></span>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="ZESTRAW eco-friendly tableware"
                className="rounded-2xl w-full object-cover shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-3">Impact in Numbers</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-12 max-w-lg mx-auto">
              Every ZESTRAW plate you use directly contributes to a healthier planet.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { icon: <Leaf className="w-6 h-6 text-eco" />, value: "1,240 Tons", label: "CO₂ EMISSIONS SAVED" },
                { icon: <Flame className="w-6 h-6 text-primary" />, value: "4,500 Acres", label: "STUBBLE BURNING AVOIDED" },
                { icon: <Droplets className="w-6 h-6 text-eco" />, value: "15,000", label: "TREES EQUIVALENT SAVED" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-3 p-6">
                  <div className="w-12 h-12 rounded-full bg-eco-light flex items-center justify-center">{stat.icon}</div>
                  <span className="text-3xl font-bold">{stat.value}</span>
                  <span className="text-xs text-muted-foreground tracking-wide uppercase">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* From Smog to Sustainable Splendor */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp}>
              <img src={paraliImage} alt="Rice straw fields" className="rounded-2xl w-full object-cover" />
              <div className="mt-4 p-4 bg-card rounded-xl">
                <p className="text-sm italic text-muted-foreground">"Solving the Haze"</p>
                <p className="text-xs text-muted-foreground mt-1">Every year, thousands of tons of rice straw are burned across northern India, creating massive air pollution.</p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">OUR STORY</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">From Smog to Sustainable Splendor.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The "Parali" problem isn't just an agricultural issue—it's a public health crisis. By providing farmers an alternative to burning, ZESTRAW creates a circular economy. Our innovative heat-press molding technology converts raw rice straw into durable, premium tableware that returns to the earth in 90 days.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <span className="text-2xl font-bold">90 Days</span>
                  <p className="text-xs text-muted-foreground">Home Compostable</p>
                </div>
                <div>
                  <span className="text-2xl font-bold">0%</span>
                  <p className="text-xs text-muted-foreground">PFAS or Chemicals</p>
                </div>
              </div>
              <Link to="/our-story" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                Discover Our Process <ChevronRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Conscious Collections */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="flex justify-between items-end mb-10">
              <div>
                <motion.h2 variants={fadeUp} className="text-3xl font-bold">Conscious Collections</motion.h2>
                <motion.p variants={fadeUp} className="text-muted-foreground mt-1">High-performance tableware that doesn't cost the Earth.</motion.p>
              </div>
              <motion.div variants={fadeUp}>
                <Link to="/shop" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  View Full Catalog <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Classic Dinner Plate", price: "$24.00", img: productPlates, badge: "Best" },
                { name: "Organic Bowl Set", price: "$18.00", img: productBowls, badge: "New" },
                { name: "Deep Rectangle Tray", price: "$32.00", img: productTray },
                { name: "The Event Combo", price: "$85.00", img: productCombo, badge: "Bulk Only" },
              ].map((product) => (
                <Link key={product.name} to="/shop" className="group">
                  <div className="relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow">
                    {product.badge && (
                      <span className="absolute top-3 left-3 z-10 px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full uppercase">
                        {product.badge}
                      </span>
                    )}
                    <div className="aspect-square overflow-hidden">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-sm font-bold text-foreground mt-1">{product.price}</p>
                      <p className="text-xs text-muted-foreground">Pack of 25</p>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose ZESTRAW */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-3">Why Choose ZESTRAW?</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-12">Beyond sustainability, we deliver uncompromised quality.</motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: <Droplets className="w-6 h-6" />, title: "Water Resistant", desc: "Engineered to withstand liquids for 5+ hours without leaking." },
                { icon: <Leaf className="w-6 h-6" />, title: "100% Compostable", desc: "Fully biodegradable in a backyard compost within 90 days." },
                { icon: <Shield className="w-6 h-6" />, title: "Chemical-Free", desc: "Food-grade certified. No glue, liners, or plastic coatings." },
                { icon: <Flame className="w-6 h-6" />, title: "Heat Resistant", desc: "Microwave and oven safe up to 180°C for retail locations." },
              ].map((feature) => (
                <div key={feature.title} className="flex flex-col items-center gap-3 p-4">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-primary">{feature.icon}</div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeUp} className="w-10 h-10 mx-auto mb-6 text-primary">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" /></svg>
            </motion.div>
            <motion.blockquote variants={fadeUp} className="text-lg italic leading-relaxed mb-6">
              "Switching to ZESTRAW was the best decision for our catering business. Our clients love the premium feel and the fact that we're actively helping clean up the air in northern India. It's a win-win."
            </motion.blockquote>
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warm-sand" />
              <div className="text-left">
                <p className="text-sm font-semibold">Raman Mehta</p>
                <p className="text-xs text-muted-foreground">Founder, GreenEvents India</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-12 border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-8">Trusted by Leading Eco-Conscious Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {["ECOHOTEL", "PUREEATS", "IMPACTCORP", "NATURA", "CATERWELL"].map((brand) => (
              <span key={brand} className="text-sm font-semibold text-muted-foreground tracking-wider">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={riceField} alt="Rice field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative container mx-auto px-6 py-20 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to make the switch?
            </motion.h2>
            <motion.p variants={fadeUp} className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
              Join 5,000+ conscious households and businesses in the revolution. Get 10% off your first bulk order today.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <Link
                to="/shop"
                className="px-6 py-3 rounded-full bg-card text-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Shop Now
              </Link>
              <Link
                to="/bulk-orders"
                className="px-6 py-3 rounded-full border border-primary-foreground/30 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-colors"
              >
                Bulk Orders
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
