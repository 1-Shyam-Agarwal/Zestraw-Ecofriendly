import { Layout } from "@/components/Layout";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ArrowLeft, Leaf, Shield, Truck, ShoppingCart, Sprout, Flame, Recycle, Lock, CreditCard, Footprints, X, User, Save, Edit3 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { getProductImageSrc } from "@/lib/images";
import { updateShippingAddress } from "@/services/operations/authAPI";
import { createOrder } from "@/services/operations/orderAPI";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { formatPackLabel, getDeliveryDate } from "@/lib/utils";
import { calculateImpactFromItems, formatKg } from "@/lib/impactStats";
import { useTranslation } from "react-i18next";

export default function CartPage() {
  const { t } = useTranslation();
  const { items, updateQuantity, removeItem, subtotal, totalItems, clearCart } = useCart();
  const { token, user, setAuth } = useAuth();
  const [step, setStep] = useState<"cart" | "checkout">("cart");
  const [promoCode, setPromoCode] = useState("");
  const [promoError, setPromoError] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showOrderConfirmModal, setShowOrderConfirmModal] = useState(false);
  const navigate = useNavigate();

  const cartImpact = useMemo(() => calculateImpactFromItems(items), [items]);

  // Checkout form state
  const [shippingMethod, setShippingMethod] = useState<"carbon" | "standard">("carbon");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Auto-fill user info
  useEffect(() => {
    if (user) {
      setAddress(prev => ({
        ...prev,
        firstName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.shippingAddress?.address || "",
        city: user.shippingAddress?.city || "",
        state: user.shippingAddress?.state || "",
        zip: user.shippingAddress?.zip || "",
      }));
    }
  }, [user]);

  const shippingCost = step === "checkout" ? (shippingMethod === "carbon" ? 40 : 120) : 0;
  const tax = subtotal * 0.05; // 5% GST
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const totalAmount = subtotal + shippingCost + tax - appliedDiscount;

  const handleSaveAddress = async () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    if (!address.address || !address.city || !address.state || !address.zip) {
      toast.error(t("cart.missingAddressTitle"), { description: t("cart.missingAddressDesc") });
      return;
    }

    const success = await updateShippingAddress(token, {
      address: address.address,
      city: address.city,
      state: address.state,
      zip: address.zip
    }, setAuth);
  };

  const handleCheckout = () => {
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    setStep("checkout");
    window.scrollTo(0, 0);
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) {
      setPromoError(t("cart.promoEnter"));
      return;
    }
    setPromoError(t("cart.promoInvalid"));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setShowAuthModal(true);
      return;
    }
    if (!address.firstName || !address.email || !address.address || !address.city || !address.state || !address.zip) {
      toast.error(t("cart.infoIncompleteTitle"), {
        description: t("cart.infoIncompleteDesc"),
        duration: 4000
      });
      return;
    }
    setShowOrderConfirmModal(true);
  };

  const confirmPlaceOrder = async () => {
    setShowOrderConfirmModal(false);
    const orderData = {
      orderItems: items.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        product: item.id,
        weight: item.weight,
        size: item.size
      })),
      shippingAddress: {
        address: address.address,
        city: address.city,
        state: address.state,
        zip: address.zip
      },
      paymentMethod: 'COD',
      taxPrice: tax,
      shippingPrice: shippingCost,
      totalPrice: totalAmount
    };

    await createOrder(token, orderData, navigate, clearCart);
  };

  return (
    <Layout>
      {/* Progress */}
      <div className="bg-card border-b border-border py-4 overflow-x-auto no-scrollbar">
        <div className="container mx-auto px-6 min-w-[420px]">
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm">
            <button
              onClick={() => setStep("cart")}
              className={`flex items-center gap-2 font-semibold whitespace-nowrap transition-colors ${step === "cart" ? "text-primary" : "text-muted-foreground hover:text-primary"}`}
            >
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs transition-colors ${step === "cart" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>1</span>
              {t("cart.stepCart")}
            </button>
            <div className="w-8 sm:w-16 h-px bg-border" />
            <button
              onClick={() => items.length > 0 && handleCheckout()}
              disabled={items.length === 0}
              className={`flex items-center gap-2 font-semibold whitespace-nowrap transition-colors ${step === "checkout" ? "text-primary" : "text-muted-foreground hover:text-primary"} ${items.length === 0 ? "opacity-30 cursor-not-allowed" : ""}`}
            >
              <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs transition-colors ${step === "checkout" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>2</span>
              {t("cart.stepCheckout")}
            </button>
            <div className="w-8 sm:w-16 h-px bg-border" />
            <span className="flex items-center gap-2 text-muted-foreground whitespace-nowrap opacity-50 cursor-not-allowed">
              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-muted text-muted-foreground text-[10px] sm:text-xs flex items-center justify-center">3</span>
              {t("cart.stepSuccess")}
            </span>
          </div>
        </div>
      </div>

      <section className="py-10 min-h-[60vh] flex items-center">
        <div className="container mx-auto px-6">
          {items.length > 0 ? (
            <>
              <h1 className="text-3xl font-bold mb-1 font-lora">
                {step === "cart" ? t("cart.titleCart") : t("cart.titleCheckout")}
              </h1>
              <p className="text-muted-foreground mb-8 text-sm">
                {step === "cart"
                  ? t("cart.subtitleCart", { value: totalItems })
                  : t("cart.subtitleCheckout")}
              </p>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Content Column */}
                <div className="lg:col-span-2 space-y-8">
                  {step === "cart" ? (
                    <>
                      <div className="bg-card rounded-xl border border-border divide-y divide-border">
                        {items.map((item) => {
                          const imgSrc = item.image.startsWith('http') ? item.image : getProductImageSrc(item.image);
                          return (
                            <motion.div
                              key={`${item.id}-${item.size}`}
                              layout
                              className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-6"
                            >
                              <div className="flex items-center gap-4 w-full sm:w-auto">
                                <img src={imgSrc} alt={item.name} className="w-20 h-20 rounded-lg object-contain bg-white border border-border flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <span className="text-[10px] text-primary font-semibold uppercase tracking-wider">{item.category}</span>
                                  <h3 className="text-sm font-medium font-lora line-clamp-1">{item.name}</h3>
                                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                                    <p className="text-xs font-bold text-foreground">₹{item?.price?.toFixed(2)}</p>
                                    {formatPackLabel(item.size) && (
                                      <span className="text-[10px] bg-secondary px-2 py-0.5 rounded-full font-bold uppercase">
                                        {formatPackLabel(item.size)}
                                      </span>
                                    )}
                                  </div>
                                </div>
                                {/* Mobile Trash */}
                                <button onClick={() => removeItem(item.id, item.size)} className="sm:hidden p-2 text-muted-foreground hover:text-destructive" title={t("cart.removeItem")}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex items-center justify-between w-full sm:w-auto sm:ml-auto gap-4 pt-4 sm:pt-0 border-t sm:border-0 border-border/50">
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors active:scale-90" disabled={item.quantity <= 1}>
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-muted-foreground transition-colors active:scale-90">
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <div className="flex items-center gap-4">
                                  <span className="text-sm font-bold sm:w-20 text-right font-lora">₹{(item.price * item.quantity).toFixed(2)}</span>
                                  {/* Desktop Trash */}
                                  <button onClick={() => removeItem(item.id, item.size)} className="hidden sm:block p-2 text-muted-foreground hover:text-destructive transition-colors" title={t("cart.removeItem")}>
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Promo + Continue */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-2">
                        <div className="flex flex-col gap-1 w-full sm:w-auto">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoCode}
                              onChange={(e) => {
                                setPromoCode(e.target.value);
                                setPromoError("");
                              }}
                              placeholder={t("cart.promoPlaceholder")}
                              className={`px-4 py-2.5 rounded-lg border bg-background text-sm flex-1 sm:w-48 focus:outline-none focus:ring-1 ${promoError ? 'border-destructive focus:ring-destructive' : 'border-border focus:ring-primary'}`}
                            />
                            <button onClick={handleApplyPromo} className="px-6 py-2.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors bg-primary/5 rounded-lg border border-primary/10">{t("cart.apply")}</button>
                          </div>
                          {promoError && (
                            <p className="text-[10px] text-destructive font-medium ml-1 animate-in fade-in slide-in-from-top-1">
                              {promoError}
                            </p>
                          )}
                        </div>
                        <Link to="/shop" className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group">
                          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> {t("cart.continueShopping")}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-8 pb-10">
                      {/* Shipping Info */}
                      <section>
                        <h2 className="flex items-center gap-2 text-lg font-bold mb-4 font-lora">
                          <span className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">1</span>
                          {t("cart.shippingDetails")}
                        </h2>
                        <div className="bg-card border border-border rounded-xl p-5 sm:p-6 space-y-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">{t("cart.fullName")}</label>
                              <div className="relative group">
                                <input
                                  value={address.firstName}
                                  readOnly
                                  className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-neutral-100 text-muted-foreground cursor-not-allowed focus:outline-none transition-all pr-10"
                                />
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">
                                {address.email ? t("cart.emailAddress") : t("cart.phoneNumber")}
                              </label>
                              <div className="relative group">
                                <input
                                  type="text"
                                  value={address.email || address.phoneNumber}
                                  readOnly
                                  className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-neutral-100 text-muted-foreground cursor-not-allowed focus:outline-none transition-all pr-10"
                                />
                                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">{t("cart.streetAddress")}</label>
                            <input value={address.address} onChange={e => setAddress({ ...address, address: e.target.value })} placeholder={t("cart.streetPlaceholder")} className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" required />
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            <div className="col-span-2 sm:col-span-1">
                              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">{t("cart.city")}</label>
                              <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} placeholder={t("cart.city")} className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">{t("cart.state")}</label>
                              <input value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} placeholder={t("cart.state")} className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1.5 block">{t("cart.zipCode")}</label>
                              <input value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} placeholder="110001" className="w-full px-4 py-2.5 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
                            </div>
                          </div>
                          <div className="pt-2 flex justify-end">
                            <button
                              type="button"
                              onClick={handleSaveAddress}
                              className="group flex items-center gap-2 px-6 py-2.5 bg-primary/5 text-primary border border-primary/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-all active:scale-95 shadow-sm"
                            >
                              {user?.shippingAddress ? (
                                <><Edit3 className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" /> {t("cart.updateSavedAddress")}</>
                              ) : (
                                <><Save className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" /> {t("cart.saveToProfile")}</>
                              )}
                            </button>
                          </div>
                        </div>
                      </section>

                      {/* Shipping Method */}
                      <section>
                        <h2 className="flex items-center gap-2 text-lg font-bold mb-4 font-lora">
                          <span className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">2</span>
                          {t("cart.shippingMethod")}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => setShippingMethod("carbon")}
                            className={`p-4 border-2 rounded-xl text-left transition-all ${shippingMethod === "carbon" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <Leaf className="w-5 h-5 text-eco-green" />
                              <span className="px-2 py-0.5 bg-primary text-white text-[9px] font-bold rounded">{t("cart.ecoSafe")}</span>
                            </div>
                            <p className="font-bold text-sm">{t("cart.carbonNeutral")}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t("cart.carbonNeutralDesc", { date: getDeliveryDate(4) })}</p>
                            <p className="text-sm font-bold mt-2">₹40.00</p>
                          </button>
                          <button
                            type="button"
                            onClick={() => setShippingMethod("standard")}
                            className={`p-4 border-2 rounded-xl text-left transition-all ${shippingMethod === "standard" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                          >
                            <Truck className="w-5 h-5 text-muted-foreground mb-2" />
                            <p className="font-bold text-sm">{t("cart.standardDelivery")}</p>
                            <p className="text-xs text-muted-foreground mt-1">{t("cart.standardDeliveryDesc")}</p>
                            <p className="text-sm font-bold mt-2">₹120.00</p>
                          </button>
                        </div>
                      </section>

                      {/* Payment */}
                      <section>
                        <h2 className="flex items-center gap-2 text-lg font-bold mb-4 font-lora">
                          <span className="w-7 h-7 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold">3</span>
                          {t("cart.paymentMethod")}
                        </h2>
                        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                          <div className="flex items-center gap-4 p-4 rounded-xl bg-primary/5 border border-primary/20">
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                              <Truck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <p className="font-bold text-sm">{t("cart.codFull")}</p>
                              <p className="text-xs text-muted-foreground">{t("cart.codDesc")}</p>
                            </div>
                          </div>
                          <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 flex gap-3">
                            <Lock className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] text-orange-700 leading-relaxed font-medium">
                              {t("cart.secureNote")}
                            </p>
                          </div>
                        </div>
                      </section>

                      <button onClick={() => setStep("cart")} className="flex items-center gap-2 text-sm text-primary font-bold hover:underline transition-all active:scale-95">
                        <ArrowLeft className="w-4 h-4" /> {t("cart.goBackToCart")}
                      </button>
                    </div>
                  )}

                  {/* Delivery + Guarantee */}
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="bg-card rounded-xl border border-border p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Truck className="w-5 h-5 text-primary" />
                        <h3 className="text-sm font-semibold font-lora">{t("cart.deliveryOptions")}</h3>
                      </div>
                      <div className="p-3 rounded-lg bg-[#fdfaf5] border border-[#f5eadc]">
                        <span className="text-sm font-medium font-lora">{t("cart.standardEcoDelivery")}</span>
                        <span className="ml-2 px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] rounded-full font-bold">₹40.00</span>
                        <p className="text-xs text-muted-foreground mt-1 font-lora">{t("cart.expected")}: {getDeliveryDate(2)} - {getDeliveryDate(4)}</p>
                      </div>
                    </div>
                    <div className="bg-card rounded-xl border border-border p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-primary" />
                        <h3 className="text-sm font-semibold font-lora">{t("cart.protectionTitle")}</h3>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed font-lora">{t("cart.protectionText")}</p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Sidebar Content Toggles */}
                  {step === "cart" ? (
                    /* Sustainability Impact Overview */
                    <div className="bg-card rounded-2xl border border-border p-6 shadow-sm relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-[#8fb339]/[0.08] pointer-events-none" />
                      <div className="flex items-center justify-between mb-6 relative z-10">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <Leaf className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-base font-bold font-lora">{t("cart.yourImpact")}</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{t("cart.fromThisCart")}</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                          </span>
                          {t("cart.live")}
                        </span>
                      </div>

                      <div className="space-y-3 relative z-10">
                        <div className="rounded-xl border border-border/70 bg-background/70 p-3.5">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#8fb339]/15 text-[#6f8f2a] flex items-center justify-center flex-shrink-0">
                              <Flame className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("cart.co2Saved")}</p>
                                <p className="text-sm font-bold text-foreground font-lora">{formatKg(cartImpact.co2SavedKg)} <span className="text-[10px] font-semibold text-muted-foreground">kg</span></p>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(100, (cartImpact.co2SavedKg / 2) * 100)}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  className="h-full bg-[#8fb339] rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-border/70 bg-background/70 p-3.5">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#4a7c59]/15 text-[#4a7c59] flex items-center justify-center flex-shrink-0">
                              <Recycle className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("cart.paraliUsed")}</p>
                                <p className="text-sm font-bold text-foreground font-lora">{formatKg(cartImpact.paraliRepurposedKg)} <span className="text-[10px] font-semibold text-muted-foreground">kg</span></p>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(100, (cartImpact.paraliRepurposedKg / 1.5) * 100)}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  className="h-full bg-[#4a7c59] rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border border-border/70 bg-background/70 p-3.5">
                          <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                              <Shield className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline justify-between gap-2">
                                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{t("cart.plasticDisplaced")}</p>
                                <p className="text-sm font-bold text-foreground font-lora">{cartImpact.plasticAvoided.toLocaleString()} <span className="text-[10px] font-semibold text-muted-foreground">{t("cart.units")}</span></p>
                              </div>
                              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden mt-2.5">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${Math.min(100, (cartImpact.plasticAvoided / 50) * 100)}%` }}
                                  transition={{ duration: 0.6, ease: "easeOut" }}
                                  className="h-full bg-primary rounded-full"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="relative z-10 mt-4 text-[11px] text-muted-foreground leading-relaxed">
                        {t("cart.impactNote")}
                      </p>
                    </div>

                  ) : (
                    /* Products Purchased List (Checkout Step) */
                    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                            <ShoppingCart className="w-4 h-4 text-foreground" />
                          </div>
                          <h3 className="text-base font-semibold font-lora">{t("cart.yourSelection")}</h3>
                        </div>
                        <span className="text-[10px] font-bold bg-muted px-2 py-0.5 rounded-full uppercase">{t("cart.itemsCount", { value: totalItems })}</span>
                      </div>
                      <div className="space-y-4 max-h-[400px] overflow-y-auto no-scrollbar pr-1">
                        {items.map((item) => (
                          <div key={`${item.id}-${item.size}`} className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="w-12 h-12 bg-white rounded-lg border border-border p-1 flex-shrink-0">
                              <img src={item.image.startsWith('http') ? item.image : getProductImageSrc(item.image)} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-bold font-lora line-clamp-1">{item.name}</p>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                                <span className="text-[10px] text-muted-foreground font-medium">{t("cart.qtyColon")} {item.quantity}</span>
                                {formatPackLabel(item.size) && (
                                  <>
                                    <span className="text-[10px] text-muted-foreground">•</span>
                                    <span className="text-[10px] font-bold bg-secondary px-2 py-0.5 rounded-full uppercase">
                                      {formatPackLabel(item.size)}
                                    </span>
                                  </>
                                )}
                                <span className="text-[10px] text-muted-foreground">•</span>
                                <span className="text-[10px] font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                    <h3 className="text-base font-bold font-lora mb-6">{t("cart.summary")}</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between font-medium"><span className="text-muted-foreground font-lora">{t("cart.subtotal")}</span><span className="font-lora">₹{subtotal.toFixed(2)}</span></div>

                      <div className="flex justify-between font-medium">
                        <span className="text-muted-foreground font-lora">{t("cart.discount")}</span>
                        <span className="text-eco-green font-bold font-lora">-₹{appliedDiscount.toFixed(2)}</span>
                      </div>

                      {step === "checkout" && (
                        <div className="flex justify-between font-medium">
                          <span className="text-muted-foreground font-lora">{t("cart.shippingCost")}</span>
                          <span className="font-bold text-foreground font-lora">₹{shippingCost.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between font-medium">
                        <span className="text-muted-foreground font-lora">{t("cart.taxGst")}</span>
                        <span className="font-lora">₹{tax.toFixed(2)}</span>
                      </div>

                      <div className="border-t border-border pt-4 mt-4 flex justify-between items-end">
                        <span className="font-bold text-neutral-600 font-lora">{t("cart.total")}</span>
                        <span className="text-2xl font-bold text-primary font-lora leading-none">₹{totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                    {step === "cart" && (
                      <button
                        onClick={handleCheckout}
                        className="w-full mt-8 py-4 rounded-lg bg-primary text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
                      >
                        {t("cart.checkout")} <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                    {step === "checkout" && (
                      <button
                        onClick={handlePlaceOrder}
                        className="w-full mt-8 py-4 rounded-lg bg-primary text-white font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-md"
                      >
                        <Lock className="w-4 h-4" /> {t("cart.placeOrder")}
                      </button>
                    )}
                    <div className="flex items-center justify-center gap-4 mt-6 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                      <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {t("cart.secure")}</span>
                      <span className="flex items-center gap-1"><Leaf className="w-3 h-3" /> {t("cart.organic")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center py-12"
            >
              <div className="w-24 h-24 bg-[#fff5ed] rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-dashed border-orange-200">
                <ShoppingCart className="w-10 h-10 text-primary opacity-50" />
              </div>
              <h2 className="text-3xl font-lora font-bold text-neutral-900 mb-4">{t("cart.emptyTitle")}</h2>
              <p className="text-neutral-600 text-lg mb-8 leading-relaxed">
                {t("cart.emptyText")}
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-lg active:scale-95"
              >
                {t("cart.exploreCollection")} <ArrowRight className="w-5 h-5" />
              </Link>

              <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 border-t border-neutral-100 pt-16">
                <div className="flex flex-col items-center">
                  <Sprout className="w-6 h-6 text-green-800 mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{t("cart.organic100")}</span>
                </div>
                <div className="flex flex-col items-center">
                  <Flame className="w-6 h-6 text-orange-400 mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{t("cart.zeroCropBurn")}</span>
                </div>
                <div className="flex flex-col items-center col-span-2 md:col-span-1">
                  <Recycle className="w-6 h-6 text-blue-400 mb-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">{t("cart.biodegradable")}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setShowAuthModal(false)}
                className="absolute right-1 top-1 p-2 rounded-full hover:bg-black/5 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 sm:p-10 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-bold font-lora  ">{t("cart.authRequired")}</h3>
                </div>

                <p className="text-muted-foreground text-sm mb-8 leading-relaxed text-justify">
                  {t("cart.authText")}
                </p>

                <div className="space-y-3">
                  <Link
                    to="/login?redirect=cart"
                    className="flex items-center justify-center w-full py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:opacity-90 transition-all shadow-lg active:scale-95"
                  >
                    {t("cart.logInNow")}
                  </Link>
                  <p className="text-xs text-muted-foreground pt-2">
                    {t("cart.noAccount")} <Link to="/signup?redirect=cart" className="text-primary font-bold hover:underline">{t("cart.createOneHere")}</Link>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showOrderConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowOrderConfirmModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 sm:p-10 text-center flex flex-col justify-center items-center gap-2">
                <div className="flex jtstify-center items-center gap-2">
                  <Truck className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-lora text-foreground">{t("cart.confirmTitle")}</h3>
                </div>


                <p className="text-muted-foreground text-sm mb-4 mt-2 leading-relaxed">
                  {t("cart.confirmTextPre")} <strong className="text-foreground">{t("cart.codFull")}</strong> {t("cart.confirmTextPost")}
                </p>

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-4 text-left">
                  <div className="flex gap-3">

                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">{t("cart.totalPayable")}</p>
                        <p className="text-xl font-bold text-amber-900">₹{totalAmount.toFixed(2)}</p>
                      </div>
                      <div className="text-right border-l border-amber-200 pl-4">
                        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-1">{t("cart.estimatedArrival")}</p>
                        <p className="text-sm font-black text-amber-900">{getDeliveryDate(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setShowOrderConfirmModal(false)}
                    className="py-3.5 px-6 rounded-md border border-border text-sm font-bold text-muted-foreground hover:bg-accent transition-all active:scale-95"
                  >
                    {t("cart.goBack")}
                  </button>
                  <button
                    onClick={confirmPlaceOrder}
                    className="py-3.5 px-6 rounded-md bg-primary text-white text-sm font-bold uppercase tracking-widest hover:opacity-90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    {t("cart.confirm")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
