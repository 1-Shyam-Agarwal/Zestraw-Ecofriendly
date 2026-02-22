import { Link, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaf, Recycle, Download, Shield, Truck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  const guests = 150;
  const courses = 3;
  const potentialSaving = (guests * courses * 0.0084).toFixed(1);

  const statsProps = [
    { label: "CO₂ Emissions Saved", icon: <Leaf size={16} className="text-secondary" />, value: "158.4 kg", sub: "Equivalent to planting 8 trees", change: "+12% vs last month" },
    { label: "Parali Repurposed", icon: <Recycle size={16} className="text-secondary" />, value: "420 kg", sub: "Rice straw diverted from burning", change: "+8% vs last month" },
    { label: "Plastic Plates Displaced", icon: <Shield size={16} className="text-secondary" />, value: "2,450 units", sub: "Keeping our oceans cleaner", change: "" },
  ];

  const sidebarLinks = [
    { label: "Impact Tracker", icon: <Leaf size={18} />, href: "/dashboard" },
    { label: "Track Orders", icon: <Truck size={18} />, href: "/orders" },
    { label: "Subscriptions", icon: <Recycle size={18} />, href: "/subscriptions" },
    { label: "Profile Settings", icon: <Shield size={18} />, href: "/profile" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar */}
          <aside className="lg:block">
            <div className="bg-card border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {user?.fullName?.[0] || 'U'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold truncate max-w-[150px]">{user?.fullName || 'User'}</span>
                  <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Account Active</span>
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
          <div className="space-y-6">
            <div>
              <h1 className="font-lora text-3xl font-bold text-foreground mb-1">Your Environmental Impact</h1>
              <p className="text-sm text-muted-foreground italic font-medium">Tracking your journey towards a circular economy and plastic-free dining.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsProps.map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-6 group hover:border-primary/50 transition-colors shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</span>
                    <div className="p-1.5 bg-primary/5 rounded-lg">{stat.icon}</div>
                  </div>
                  <div className="font-lora text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <p className="text-[11px] text-muted-foreground font-medium">{stat.sub}</p>
                  {stat.change && <div className="text-[11px] text-primary font-bold mt-2 flex items-center gap-1">↗ {stat.change} <span className="text-muted-foreground">growth</span></div>}
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-lora text-xl font-bold text-foreground">Sustainability Progress</h2>
                  <p className="text-xs text-muted-foreground font-medium italic">Monthly growth in your eco-footprint</p>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground border border-border rounded-full px-4 py-2 hover:bg-warm-sand transition-colors">
                  <Download size={14} /> Export Stats
                </button>
              </div>
              <div className="relative h-56 w-full opacity-90 group">
                <svg viewBox="0 0 600 180" className="w-full h-full" preserveAspectRatio="none">
                  {[12, 47, 82, 117, 152].map((val, i) => (
                    <g key={i}>
                      <line x1="0" y1={180 - (val / 152) * 160} x2="600" y2={180 - (val / 152) * 160} stroke="hsl(var(--border))" strokeOpacity="0.5" strokeWidth="1" />
                    </g>
                  ))}
                  <motion.polyline
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    points="50,168 150,155 250,140 350,120 450,90 550,45"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            {/* Calculator */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 pointer-events-none" />
              <h2 className="font-lora text-xl font-bold text-foreground mb-2">Plan Your Next Eco-Event</h2>
              <p className="text-sm text-muted-foreground mb-8">Measure the green impact of your upcoming gathering.</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block" htmlFor="eventGuests">Expected Guests</label>
                    <input id="eventGuests" type="number" defaultValue={150} className="w-full text-sm px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block" htmlFor="mealCourses">Meal Courses</label>
                    <input id="mealCourses" type="number" defaultValue={3} className="w-full text-sm px-4 py-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary/20 outline-none transition-all" />
                  </div>
                  <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all text-sm uppercase tracking-widest leading-none">Calculate Savings</button>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-8 flex flex-col items-center justify-center text-center shadow-inner">
                  <Leaf size={40} className="text-primary mb-3 animate-pulse" />
                  <div className="text-[10px] text-primary/70 mb-1 font-black uppercase tracking-tighter">Projected Plastic Saving</div>
                  <div className="font-lora text-5xl font-bold text-primary">{potentialSaving} kg</div>
                  <div className="text-xs text-muted-foreground mt-4 font-medium max-w-[200px]">
                    Switching to ZESTRAW will divert this much waste from landfills.
                  </div>
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

export default Dashboard;
