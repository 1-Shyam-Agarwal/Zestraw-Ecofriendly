import { Layout } from "@/components/Layout";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, Leaf, Shield, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { getProductImageSrc } from "@/lib/images";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState("");
  const { toast } = useToast();

  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    toast({ title: "Invalid promo code", variant: "destructive" });
  };

  return (
    <Layout>
      {/* Progress */}
      <div className="bg-card border-b border-border py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-8 text-sm">
            <span className="flex items-center gap-2 text-primary font-semibold">
              <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</span>
              Shopping Cart
            </span>
            <div className="w-16 h-px bg-border" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">2</span>
              Checkout
            </span>
            <div className="w-16 h-px bg-border" />
            <span className="flex items-center gap-2 text-muted-foreground">
              <span className="w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs flex items-center justify-center">3</span>
              Success
            </span>
          </div>
        </div>
      </div>

      <section className="py-10">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold mb-1">My Shopping Cart</h1>
          <p className="text-muted-foreground mb-8">You have {totalItems} eco-friendly items in your cart.</p>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-card rounded-xl border border-border divide-y divide-border">
                {items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="flex items-center gap-4 p-4"
                  >
                    <img src={getProductImageSrc(item.image)} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                    <div className="flex-1">
                      <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">{item.category}</span>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} / unit</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent text-muted-foreground">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-accent text-muted-foreground">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="text-sm font-bold w-16 text-right">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="w-4 h-4" />
                      <span className="text-xs block">Remove</span>
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Promo + Continue */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="px-4 py-2 rounded-lg border border-border bg-background text-sm w-48 focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button onClick={handleApplyPromo} className="px-4 py-2 text-sm font-semibold text-primary hover:underline">Apply</button>
                </div>
                <Link to="/shop" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4" /> Continue Shopping
                </Link>
              </div>

              {/* Delivery + Guarantee */}
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Truck className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-semibold">Delivery Options</h3>
                  </div>
                  <div className="p-3 rounded-lg bg-eco-light">
                    <span className="text-sm font-medium">Standard Green Delivery</span>
                    <span className="ml-2 px-2 py-0.5 bg-eco text-eco-foreground text-[10px] rounded-full font-bold">Free</span>
                    <p className="text-xs text-muted-foreground mt-1">Arrives in 3-5 business days</p>
                  </div>
                </div>
                <div className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="text-sm font-semibold">ZESTRAW Guarantee</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">Every item is 100% biodegradable and certified plastic-free. If you're not happy with the quality, we offer hassle-free returns within 30 days.</p>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Sustainability Impact */}
              <div className="bg-card rounded-xl border border-border p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <h3 className="text-sm font-semibold">Sustainability Impact</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">✦</span>
                    <div>
                      <span className="text-sm font-bold text-eco">8.5 kg CO2 Offset</span>
                      <p className="text-xs text-muted-foreground">Equivalent to planting 1 tree</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💧</span>
                    <div>
                      <span className="text-sm font-bold text-eco">120L Water Saved</span>
                      <p className="text-xs text-muted-foreground">Vs. traditional plastic production</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-secondary text-xs text-muted-foreground italic">
                  "Your purchase prevents 12kg of rice straw from being burned in Punjab fields."
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-card rounded-xl border border-border p-5">
                <h3 className="text-sm font-bold mb-4">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Eco-Shipping</span><span className="text-eco font-semibold">FREE</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Estimated Tax</span><span>${tax.toFixed(2)}</span></div>
                  <div className="border-t border-border pt-2 flex justify-between">
                    <span className="font-bold">Order Total</span>
                    <span className="text-xl font-bold text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="w-full mt-4 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Link>
                <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-muted-foreground uppercase tracking-wider">
                  <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> SECURE SSL</span>
                  <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> CERTIFIED ECO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
