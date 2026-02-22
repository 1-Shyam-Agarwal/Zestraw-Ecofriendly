import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { User, Mail, MapPin, Shield, CheckCircle2, Leaf, Truck, Recycle, ArrowRight, Save, Key } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { updateProfile, changePassword } from "@/services/operations/authAPI";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
    const { user, token, setAuth } = useAuth();
    const location = useLocation();
    const [loading, setLoading] = useState(false);

    // Profile State
    const [profileData, setProfileData] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        shippingAddress: {
            address: user?.shippingAddress?.address || "",
            city: user?.shippingAddress?.city || "",
            state: user?.shippingAddress?.state || "",
            zip: user?.shippingAddress?.zip || ""
        }
    });

    // Password State
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const sidebarLinks = [
        { icon: <Leaf size={14} />, label: "Impact Tracker", href: "/dashboard" },
        { icon: <Truck size={14} />, label: "Track Orders", href: "/orders" },
        { icon: <Recycle size={14} />, label: "Subscriptions", href: "/dashboard" },
        { icon: <Shield size={14} />, label: "Profile Settings", href: "/profile" },
    ];

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const success = await updateProfile(token, profileData, setAuth);
        setLoading(false);
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.newPassword !== passwords.confirmPassword) {
            return; // In real app, show error toast
        }
        setLoading(true);
        await changePassword(token, {
            currentPassword: passwords.currentPassword,
            newPassword: passwords.newPassword
        });
        setLoading(false);
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#fffaf5]">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
                    {/* Sidebar */}
                    <aside className="hidden lg:block">
                        <div className="bg-card border border-border rounded-2xl p-6 sticky top-24 shadow-sm">
                            <div className="flex items-center gap-3 mb-8 px-2">
                                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                    {user?.fullName?.[0] || 'U'}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold truncate max-w-[150px]">{user?.fullName || 'User'}</span>
                                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Verified Account</span>
                                </div>
                            </div>
                            <nav className="space-y-1">
                                {sidebarLinks.map((item) => (
                                    <Link
                                        key={item.label}
                                        to={item.href}
                                        className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${location.pathname === item.href ? "bg-primary text-white shadow-md shadow-primary/20" : "text-muted-foreground hover:bg-warm-sand hover:text-foreground"}`}
                                    >
                                        {item.icon} {item.label}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="font-lora text-3xl font-bold text-foreground mb-1">Account Settings</h1>
                            <p className="text-sm text-muted-foreground italic font-medium">Manage your personal details and security preferences.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">
                            <div className="space-y-8">
                                {/* Profile Info */}
                                <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-8 border-b border-border pb-6">
                                        <div className="p-2 bg-primary/5 rounded-xl"><User className="text-primary" size={20} /></div>
                                        <h2 className="font-lora text-xl font-bold">Personal Information</h2>
                                    </div>
                                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</label>
                                                <Input
                                                    value={profileData.fullName}
                                                    onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                                    className="bg-muted/30 border-border rounded-xl h-12"
                                                />
                                            </div>
                                            <div className="space-y-2 opacity-60">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</label>
                                                <Input disabled value={profileData.email} className="bg-muted/10 border-border rounded-xl h-12 cursor-not-allowed" />
                                            </div>
                                        </div>

                                        <div className="pt-4">
                                            <div className="flex items-center gap-3 mb-6">
                                                <div className="p-2 bg-primary/5 rounded-xl"><MapPin className="text-primary" size={20} /></div>
                                                <h3 className="font-lora text-lg font-bold">Default Delivery Address</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                                <div className="md:col-span-2 space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Street Address</label>
                                                    <Input
                                                        value={profileData.shippingAddress.address}
                                                        onChange={(e) => setProfileData({ ...profileData, shippingAddress: { ...profileData.shippingAddress, address: e.target.value } })}
                                                        className="bg-muted/30 border-border rounded-xl h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">City</label>
                                                    <Input
                                                        value={profileData.shippingAddress.city}
                                                        onChange={(e) => setProfileData({ ...profileData, shippingAddress: { ...profileData.shippingAddress, city: e.target.value } })}
                                                        className="bg-muted/30 border-border rounded-xl h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">State</label>
                                                    <Input
                                                        value={profileData.shippingAddress.state}
                                                        onChange={(e) => setProfileData({ ...profileData, shippingAddress: { ...profileData.shippingAddress, state: e.target.value } })}
                                                        className="bg-muted/30 border-border rounded-xl h-12"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Zip Code</label>
                                                    <Input
                                                        value={profileData.shippingAddress.zip}
                                                        onChange={(e) => setProfileData({ ...profileData, shippingAddress: { ...profileData.shippingAddress, zip: e.target.value } })}
                                                        className="bg-muted/30 border-border rounded-xl h-12"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <Button type="submit" disabled={loading} className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20">
                                            {loading ? "Processing..." : "Save Profile Details"}
                                        </Button>
                                    </form>
                                </section>

                                {/* Security */}
                                <section className="bg-card border border-border rounded-3xl p-8 shadow-sm">
                                    <div className="flex items-center gap-3 mb-8 border-b border-border pb-6">
                                        <div className="p-2 bg-primary/5 rounded-xl"><Key className="text-primary" size={20} /></div>
                                        <h2 className="font-lora text-xl font-bold">Security & Password</h2>
                                    </div>
                                    <form onSubmit={handlePasswordUpdate} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Current Password</label>
                                            <Input
                                                type="password"
                                                value={passwords.currentPassword}
                                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                                                className="bg-muted/30 border-border rounded-xl h-12"
                                            />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">New Password</label>
                                                <Input
                                                    type="password"
                                                    value={passwords.newPassword}
                                                    onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                                    className="bg-muted/30 border-border rounded-xl h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Confirm New Password</label>
                                                <Input
                                                    type="password"
                                                    value={passwords.confirmPassword}
                                                    onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                                    className="bg-muted/30 border-border rounded-xl h-12"
                                                />
                                            </div>
                                        </div>
                                        <Button type="submit" disabled={loading} variant="outline" className="w-full h-12 rounded-xl text-xs font-black uppercase tracking-[0.2em] border-primary text-primary hover:bg-primary/5">
                                            Update Credentials
                                        </Button>
                                    </form>
                                </section>
                            </div>

                            {/* Info Sidebar */}
                            <div className="space-y-6">
                                <div className="bg-primary/10 border border-primary/20 rounded-3xl p-6 text-center shadow-inner">
                                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                                        <Shield className="text-primary" size={24} />
                                    </div>
                                    <h4 className="font-lora text-lg font-bold mb-2">Sustainable Member</h4>
                                    <p className="text-xs text-muted-foreground font-medium italic mb-6">Your data is secured with AES-256 encryption and managed according to GDPR principles.</p>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-white/50 py-2 px-4 rounded-full justify-center">
                                            <CheckCircle2 size={12} /> Email Verified
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-primary bg-white/50 py-2 px-4 rounded-full justify-center">
                                            <CheckCircle2 size={12} /> Multi-Factor Enabled
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-secondary/30 border border-border rounded-3xl p-6 shadow-sm">
                                    <h4 className="font-lora text-sm font-bold mb-3 flex items-center gap-2">
                                        <Recycle size={14} className="text-primary" /> Why Update Profile?
                                    </h4>
                                    <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold italic">
                                        "Accurate shipping details ensure your parali-made tableware reaches you with the lowest carbon footprint possible."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Profile;
