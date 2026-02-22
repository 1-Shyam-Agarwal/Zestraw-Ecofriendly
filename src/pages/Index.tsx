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
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

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
      <section className="bg-[#fff5ed] overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            <motion.div variants={stagger}>
              <motion.h1
                variants={fadeUp}
                className="text-4xl lg:text-5xl font-normal font-lora text-foreground leading-tight  mb-6"
              >
                Meals made with love deserve thoughtful plates.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg text-muted-foreground mb-8 max-w-md leading-relaxed"
              >
                Premium, biodegradable tableware crafted from rice straw residue. Combatting air pollution while elevating your dining experience.
              </motion.p>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-8">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors"
                >
                  Book a Sample Kit
                </Link>
                <Link
                  to="/impact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-border bg-card text-foreground rounded-full font-semibold hover:bg-accent transition-colors"
                >
                  Shop Now
                </Link>
              </motion.div>

            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <img
                src={heroImage}
                alt="ZESTRAW eco-friendly tableware collection"
                className="rounded-2xl shadow-lg w-full object-cover aspect-[4/3] rotate-2 shadow-[0_4px_10px_0_rgba(0,0,0,0.3)]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Impact in Numbers */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold font-lora mb-3">Impact in Numbers</motion.h2>
            <motion.p variants={fadeUp} className="text-muted-foreground mb-12 max-w-lg mx-auto">
              Every ZESTRAW plate you use directly contributes to a healthier planet.
            </motion.p>
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              {[
                { icon: <Leaf className="w-6 h-6 text-eco bg-auto" />, value: "1,240 Tons", label: "CO₂ EMISSIONS SAVED" },
                { icon: <Flame className="w-6 h-6 text-primary bg-auto" />, value: "4,500 Acres", label: "STUBBLE BURNING AVOIDED" },
                { icon: <Droplets className="w-6 h-6 text-eco bg-auto" />, value: "15,000", label: "TREES EQUIVALENT SAVED" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-3 p-6 border border-border rounded-2xl shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]">
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
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={fadeUp} className="relative rounded-2xl overflow-hidden">
              <img src={riceField} alt="Rice fields - from smog to sustainability" className="w-full object-cover aspect-[4/3] rounded-2xl" />
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl p-4 max-w-[200px]">
                <p className="text-xs text-muted-foreground italic">"Solving the Haze"</p>
                <p className="text-xs text-muted-foreground mt-1">Every year, thousands of acres of rice straw are burned, creating severe smog.</p>
              </div>
            </motion.div>
            <motion.div variants={stagger}>
              <motion.span variants={fadeUp} className="inline-flex px-3 py-1 bg-amber-light text-primary text-xs font-semibold rounded-full mb-4">OUR STORY</motion.span>
              <motion.h2 variants={fadeUp} className="text-3xl lg:text-4xl font-lora font-bold mb-4">
                From Smog to Sustainable Splendor.
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">
                The "Parali" problem isn't just an agricultural issue—it's a public health crisis. By providing farmers an alternative to burning, ZESTRAW creates a circular economy. Our innovative heat-press molding technology converts raw rice straw into durable, premium tableware that returns to the earth in 90 days.
              </motion.p>
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-2xl font-lora font-bold text-foreground">90 Days</p>
                  <p className="text-sm text-muted-foreground">Home Compostable</p>
                </div>
                <div>
                  <p className="text-2xl font-lora font-bold text-foreground">0%</p>
                  <p className="text-sm text-muted-foreground">Plastic or Chemicals</p>
                </div>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Discover Our Process
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Conscious Collections */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <div className="flex justify-between items-end mb-10">
              <div>
                <motion.h2 variants={fadeUp} className="text-3xl font-lora font-bold text-foreground">Conscious Collections</motion.h2>
                <motion.p variants={fadeUp} className="text-muted-foreground mt-1">High-performance tableware that doesn't cost the Earth.</motion.p>
              </div>
              <motion.div variants={fadeUp}>
                <Link to="/shop" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline group">
                  View Full Catalog <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="mt-10 text-center md:hidden">
              <Link to="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                View All Products <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose ZESTRAW */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.h2 variants={fadeUp} className="text-3xl font-bold font-lora mb-3">Why Choose ZESTRAW?</motion.h2>
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
                  <h3 className="font-semibold text-sm font-lora ">{feature.title}</h3>
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
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold font-lora text-primary-foreground mb-4">
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
