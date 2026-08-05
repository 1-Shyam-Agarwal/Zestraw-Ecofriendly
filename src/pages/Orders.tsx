import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Package, Truck, CheckCircle, Clock, ChevronRight, Leaf, X, Shield, CreditCard, Building, Recycle, MessageCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getUserOrders } from "@/services/operations/orderAPI";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getProductImageSrc } from "@/lib/images";
import { formatPackLabel, getDeliveryDate } from "@/lib/utils";
import { PageLoader } from "@/components/PageLoader";
import { useTranslation } from "react-i18next";

const Orders = () => {
    const { t } = useTranslation();
    const { token, user } = useAuth();
    const location = useLocation();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    const sidebarLinks = [
        { icon: <Leaf size={14} />, label: t("profile.impactTracker"), href: "/dashboard" },
        { icon: <Truck size={14} />, label: t("profile.trackOrders"), href: "/orders" },
        { icon: <Shield size={14} />, label: t("profile.profileSettings"), href: "/profile" },
    ];
    const statusText = (s: string) => t(`orders.status.${s}`, { defaultValue: s });

    useEffect(() => {
        const fetchOrders = async () => {
            if (token) {
                const data = await getUserOrders(token);
                setOrders(data);
            }
            setLoading(false);
        };
        fetchOrders();
    }, [token]);

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Delivered": return <CheckCircle size={14} className="text-eco" />;
            case "Shipped": return <Truck size={14} className="text-blue-500" />;
            case "Processing": return <Package size={14} className="text-primary" />;
            default: return <Clock size={14} className="text-amber-500" />;
        }
    };

    const getOrderProgress = (status: string) => {
        const steps = [
            { key: "Processing", label: statusText("Processing"), icon: Package },
            { key: "Shipped", label: statusText("Shipped"), icon: Truck },
            { key: "Delivered", label: statusText("Delivered"), icon: CheckCircle },
        ];
        const currentIndex = steps.findIndex((step) => step.key === status);
        return { steps, currentIndex: currentIndex >= 0 ? currentIndex : 0 };
    };

    const formatOrderId = (id?: string) =>
        id ? `#${id.toString().slice(-8).toUpperCase()}` : "#--------";

    const formatOrderDate = (date: string) =>
        new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Delivered": return "bg-eco/10 text-eco border-eco/20";
            case "Shipped": return "bg-blue-50 text-blue-600 border-blue-100";
            case "Processing": return "bg-primary/10 text-primary border-primary/20";
            case "Cancelled": return "bg-red-50 text-red-600 border-red-100";
            default: return "bg-amber-50 text-amber-600 border-amber-100";
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="bg-white border border-border rounded-2xl p-6 sticky top-24 z-10 shadow-sm">
                            <div className="flex items-center gap-3 mb-8 px-2">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                    {user?.fullName?.[0] || 'U'}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold truncate max-w-[150px]">{user?.fullName || 'User'}</span>
                                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{t("dashboard.accountActive")}</span>
                                </div>
                            </div>
                            <nav className="space-y-1">
                                {sidebarLinks.map((item) => (
                                    <Link
                                        key={item.href}
                                        to={item.href}
                                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.href ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-warm-sand hover:text-foreground"}`}
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                ))}
                            </nav>
                            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-6">
                                <div className="text-[10px] font-bold text-primary mb-1 uppercase tracking-wider">{t("orders.ecoTip")}</div>
                                <div className="text-xs text-muted-foreground leading-relaxed">{t("orders.ecoTipText")}</div>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="space-y-6 lg:mt-0 mt-4">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                            <div>
                                <h1 className="font-lora text-3xl font-bold text-foreground mb-1">{t("orders.title")}</h1>
                                <p className="text-sm text-muted-foreground italic font-medium">
                                    {t("orders.subtitle")}
                                </p>
                            </div>
                            {!loading && (
                                <span className="inline-flex items-center gap-2 self-start sm:self-auto px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                    <Package size={14} />
                                    {t("orders.ordersCount", { value: orders.length })}
                                </span>
                            )}
                        </div>

                        {loading ? (
                            <PageLoader message={t("orders.loading")} />
                        ) : orders.length > 0 ? (
                            <div className="space-y-5">
                                {orders.map((order: any) => {
                                    const { steps, currentIndex } = getOrderProgress(order.status);
                                    const isCancelled = order.status === "Cancelled";

                                    return (
                                    <motion.div
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        key={order._id}
                                        className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-all"
                                    >
                                        <div className="p-5 sm:p-6">
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                                                <div className="flex items-start gap-4 min-w-0">
                                                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                                        <Package className="text-primary" size={24} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[11px] font-bold uppercase tracking-wider text-primary mb-1">
                                                            {t("orders.orderLabel", { id: formatOrderId(order._id) })}
                                                        </p>
                                                        <p className="text-sm font-semibold text-foreground">
                                                            {t("orders.placedOn", { date: formatOrderDate(order.createdAt) })}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {t("orders.itemsCount", { value: order.orderItems.length })} · {order.paymentMethod}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:text-right shrink-0">
                                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        {statusText(order.status)}
                                                    </div>
                                                    <p className="text-lg font-bold text-foreground">
                                                        ₹{order.totalPrice.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>

                                            {!isCancelled && (
                                                <div className="mb-6 px-2">
                                                    <div className="grid grid-cols-3 gap-2 relative">
                                                        <div className="absolute top-4 left-[16%] right-[16%] h-0.5 bg-muted" />
                                                        <div
                                                            className="absolute top-4 left-[16%] h-0.5 bg-primary transition-all duration-500"
                                                            style={{
                                                                width: `${(currentIndex / (steps.length - 1)) * 68}%`,
                                                            }}
                                                        />
                                                        {steps.map((step, index) => {
                                                            const StepIcon = step.icon;
                                                            const isComplete = index <= currentIndex;
                                                            const isCurrent = index === currentIndex;

                                                            return (
                                                                <div key={step.key} className="relative z-10 flex flex-col items-center">
                                                                    <div
                                                                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
                                                                            isComplete
                                                                                ? "bg-primary border-primary text-white"
                                                                                : "bg-background border-muted text-muted-foreground"
                                                                        } ${isCurrent ? "ring-4 ring-primary/15" : ""}`}
                                                                    >
                                                                        <StepIcon size={14} />
                                                                    </div>
                                                                    <span
                                                                        className={`mt-2 text-[10px] font-bold uppercase tracking-wider text-center ${
                                                                            isComplete ? "text-primary" : "text-muted-foreground"
                                                                        }`}
                                                                    >
                                                                        {step.label}
                                                                    </span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                    {order.status === "Processing" && (
                                                        <p className="text-xs text-muted-foreground mt-4">
                                                            {t("orders.estimatedDeliveryBy")}{" "}
                                                            <span className="font-semibold text-foreground">
                                                                {getDeliveryDate(2)}
                                                            </span>
                                                        </p>
                                                    )}
                                                </div>
                                            )}

                                            <div className="rounded-xl border border-border/70 bg-muted/20 p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                                                        {t("orders.shipmentItems")}
                                                    </p>
                                                    <p className="text-[11px] font-bold text-primary">
                                                        {t("orders.productsCount", { value: order.orderItems.length })}
                                                    </p>
                                                </div>
                                                <div className="space-y-3">
                                                    {order.orderItems.slice(0, 2).map((item: any, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-3">
                                                            <div className="w-12 h-12 bg-white border border-border rounded-lg p-1 shrink-0">
                                                                <img
                                                                    src={item.image.startsWith("http") ? item.image : getProductImageSrc(item.image)}
                                                                    alt={item.name}
                                                                    className="w-full h-full object-contain"
                                                                />
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                                                                <p className="text-xs text-muted-foreground">
                                                                    {t("orders.qty", { value: item.quantity })}
                                                                    {formatPackLabel(item.size) ? ` · ${formatPackLabel(item.size)}` : ""}
                                                                </p>
                                                            </div>
                                                            <p className="text-sm font-semibold shrink-0">
                                                                ₹{(item.price * item.quantity).toFixed(2)}
                                                            </p>
                                                        </div>
                                                    ))}
                                                    {order.orderItems.length > 2 && (
                                                        <p className="text-xs text-muted-foreground pl-[3.75rem]">
                                                            {t("orders.moreItems", { value: order.orderItems.length - 2 })}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-5 sm:px-6 py-4 bg-muted/30 border-t border-border/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="space-y-1">
                                                <p className="text-xs text-muted-foreground">
                                                    {t("orders.shippingTo")}{" "}
                                                    <span className="font-semibold text-foreground">
                                                        {order.shippingAddress.city}, {order.shippingAddress.state}
                                                    </span>
                                                </p>
                                                <button
                                                    onClick={() => window.dispatchEvent(new CustomEvent("toggleChatbot"))}
                                                    className="text-[11px] font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
                                                >
                                                    <MessageCircle size={12} />
                                                    {t("orders.needHelp")}
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
                                            >
                                                {t("marketplace.viewDetails")}
                                                <ChevronRight size={14} />
                                            </button>
                                        </div>
                                    </motion.div>
                                )})}
                            </div>
                        ) : (
                            <div className="bg-card border-2 border-dashed border-border rounded-3xl p-16 text-center">
                                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Package size={32} className="text-primary/40" />
                                </div>
                                <h2 className="text-2xl font-lora font-bold text-foreground mb-2">{t("orders.noOrdersTitle")}</h2>
                                <p className="text-sm text-muted-foreground mb-8 max-w-sm mx-auto italic">{t("orders.noOrdersText")}</p>
                                <Link to="/shop" className="inline-flex px-8 py-3 bg-primary text-white rounded-full text-xs font-black uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 transition-all">{t("orders.startShopping")}</Link>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />

            {/* Order Details Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrder(null)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-border flex items-center justify-between bg-card/50">
                                <div>
                                    <h3 className="text-xl font-bold font-lora text-foreground">{t("orders.orderDetails")}</h3>
                                    <p className="text-xs text-muted-foreground mt-0.5">{t("orders.orderIdLabel")} #{selectedOrder._id?.toString().toUpperCase()}</p>
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-2.5 rounded-full hover:bg-muted transition-colors border border-border"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">
                                {/* Status & Dates */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                                        <p className="text-[10px] uppercase font-black text-muted-foreground mb-2">{t("orders.statusLabel")}</p>
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${getStatusColor(selectedOrder.status)}`}>
                                            {selectedOrder.status === "Processing" ? t("orders.deliveryBy", { date: getDeliveryDate(2) }) : statusText(selectedOrder.status)}
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                                        <p className="text-[10px] uppercase font-black text-muted-foreground mb-2">{t("orders.timeline")}</p>
                                        <p className="text-xs font-black">{new Date(selectedOrder.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                                        <p className="text-[10px] uppercase font-black text-muted-foreground mb-2">{t("orders.billing")}</p>
                                        <p className="text-xs font-black uppercase">{selectedOrder.paymentMethod}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/30 border border-border">
                                        <p className="text-[10px] uppercase font-black text-muted-foreground mb-2">{t("orders.revenue")}</p>
                                        <p className="text-xs font-black text-primary">₹{selectedOrder.totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-muted-foreground mb-5 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {t("orders.productsSecured")}
                                    </h4>
                                    <div className="space-y-4">
                                        {selectedOrder.orderItems.map((item: any, idx: number) => {
                                            const packLabel = formatPackLabel(item.size);
                                            return (
                                            <div key={idx} className="flex items-center gap-5 p-4 rounded-2xl border border-border hover:bg-muted/10 transition-colors">
                                                <div className="w-16 h-16 bg-white border border-border rounded-lg p-1 flex-shrink-0">
                                                    <img src={item.image.startsWith('http') ? item.image : getProductImageSrc(item.image)} alt={item.name} className="w-full h-full object-contain" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-black line-clamp-1">{item.name}</p>
                                                    <div className="flex items-center gap-3 mt-1.5">
                                                        <span className="text-[10px] font-black bg-secondary px-2 py-0.5 rounded-lg uppercase">{t("orders.qtyColon")} {item.quantity}</span>
                                                        {packLabel && (
                                                            <span className="text-[10px] font-black bg-muted px-2 py-0.5 rounded-lg uppercase">
                                                                {packLabel}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-black text-foreground">₹{(item.price * item.quantity).toFixed(2)}</p>
                                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">₹{item.price.toFixed(2)}{t("orders.perUnit")}</p>
                                                </div>
                                            </div>
                                        )})}
                                    </div>
                                </div>

                                {/* Shipping & Summary */}
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="p-6 rounded-3xl border border-border bg-muted/5 flex flex-col">
                                        <h4 className="text-[11px] font-black uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
                                            <Truck size={14} /> {t("orders.shippingDestination")}
                                        </h4>
                                        <div className="space-y-1.5 text-sm flex-1">
                                            <p className="font-black text-foreground">{user?.fullName}</p>
                                            <p className="text-[11px] text-muted-foreground font-black uppercase tracking-tighter">
                                                {user?.email || user?.phoneNumber}
                                            </p>
                                            <p className="text-muted-foreground font-medium leading-relaxed italic">
                                                {selectedOrder.shippingAddress.address}<br />
                                                {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zip}<br />
                                                {t("orders.republicOfIndia")}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-6 rounded-3xl border border-border bg-muted/5 flex flex-col">
                                        <h4 className="text-[11px] font-black uppercase tracking-widest text-primary mb-5 flex items-center gap-2">
                                            <Shield size={14} /> {t("orders.financialRoundup")}
                                        </h4>
                                        <div className="space-y-3 text-[11px] font-black uppercase tracking-widest">
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>{t("orders.subtotal")}</span>
                                                <span>₹{(selectedOrder.totalPrice - selectedOrder.shippingPrice - selectedOrder.taxPrice).toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>{t("orders.logistics")}</span>
                                                <span className="text-eco">₹{selectedOrder.shippingPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between text-muted-foreground">
                                                <span>{t("orders.taxContribution")}</span>
                                                <span>₹{selectedOrder.taxPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t border-border pt-4 flex justify-between items-center text-foreground">
                                                <span className="text-xs">{t("orders.finalAmount")}</span>
                                                <span className="text-2xl text-primary">₹{selectedOrder.totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Orders;
