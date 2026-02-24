import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaf, Recycle, Download, Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const guests = 150;
  const courses = 3;
  const potentialSaving = (guests * courses * 0.0084).toFixed(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          {/* Sidebar */}
          <div>
            <div className="bg-card border border-border rounded-2xl p-5 mb-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3 overflow-hidden">
                <span className="text-primary font-bold text-xl">{user?.fullName?.split(' ').map(n => n[0]).join('') || "U"}</span>
              </div>
              <div className="text-base font-bold text-foreground">{user?.fullName || "Guest User"}</div>
              <div className="text-xs text-muted-foreground mb-2">Conscious Member since 2024</div>
              <span className="inline-flex items-center gap-1 bg-eco/10 border border-eco/20 text-eco text-xs font-bold px-2.5 py-1 rounded-full">
                <Leaf size={10} /> Eco-Warrior Status
              </span>
            </div>
            <nav className="space-y-1">
              {[
                { icon: <Leaf size={14} />, label: "Impact Tracker", active: true, href: "/dashboard" },
                { icon: <Shield size={14} />, label: "Order History", href: "/dashboard" },
                { icon: <Recycle size={14} />, label: "Subscriptions", href: "/dashboard" },
                { icon: <Shield size={14} />, label: "Profile Settings", href: "/dashboard" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${item.active ? "bg-primary text-white" : "text-muted-foreground hover:bg-warm-sand hover:text-foreground"}`}
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-4 bg-primary/10 border border-primary/20 rounded-xl p-3">
              <div className="text-xs font-bold text-primary mb-1">REMINDER</div>
              <div className="text-xs text-muted-foreground">You have an upcoming event! Don't forget to place your eco order.</div>
            </div>
          </div>

          {/* Main */}
          <div className="space-y-6">
            <div>
              <h1 className="font-display text-2xl font-bold text-foreground mb-1">Your Environmental Impact</h1>
              <p className="text-sm text-muted-foreground">Tracking your journey towards a circular economy and plastic-free dining.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "CO₂ Emissions Saved", icon: <Leaf size={16} className="text-eco" />, value: "158.4 kg", sub: "Equivalent to planting 8 trees", change: "+12% vs last month" },
                { label: "Parali Repurposed", icon: <Recycle size={16} className="text-primary" />, value: "420 kg", sub: "Rice straw diverted from burning", change: "+8% vs last month" },
                { label: "Plastic Plates Displaced", icon: <Shield size={16} className="text-eco" />, value: "2,450 units", sub: "Keeping our oceans cleaner", change: "" },
              ].map((stat, i) => (
                <div key={i} className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                    {stat.icon}
                  </div>
                  <div className="font-display text-2xl font-bold text-foreground mb-0.5">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.sub}</div>
                  {stat.change && <div className="text-xs text-eco font-medium mt-1">↗ {stat.change}</div>}
                </div>
              ))}
            </div>

            {/* Impact Progress Chart */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-display text-lg font-bold text-foreground">Impact Progress</h2>
                  <p className="text-xs text-muted-foreground">Monthly growth in sustainability metrics</p>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-semibold text-foreground border border-border rounded-lg px-3 py-1.5 hover:bg-warm-sand transition-colors">
                  <Download size={12} /> Export Report
                </button>
              </div>
              {/* Simple line chart visualization */}
              <div className="relative h-48">
                <svg viewBox="0 0 600 180" className="w-full h-full" preserveAspectRatio="none">
                  {/* Grid lines */}
                  {[12, 47, 82, 117, 152].map((val, i) => (
                    <g key={i}>
                      <line x1="0" y1={180 - (val / 152) * 160} x2="600" y2={180 - (val / 152) * 160} stroke="hsl(42,20%,90%)" strokeWidth="1" />
                      <text x="0" y={180 - (val / 152) * 160 - 3} fontSize="10" fill="hsl(0,0%,60%)">{val}</text>
                    </g>
                  ))}
                  {/* CO2 line (amber) */}
                  <polyline
                    points="50,168 150,155 250,140 350,120 450,90 550,45"
                    fill="none"
                    stroke="hsl(38,90%,52%)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Parali line (green) */}
                  <polyline
                    points="50,175 150,170 250,165 350,158 450,150 550,140"
                    fill="none"
                    stroke="hsl(98,38%,40%)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Dots */}
                  {[50, 150, 250, 350, 450, 550].map((x, i) => (
                    <g key={i}>
                      <circle cx={x} cy={[168, 155, 140, 120, 90, 45][i]} r="4" fill="hsl(38,90%,52%)" />
                      <circle cx={x} cy={[175, 170, 165, 158, 150, 140][i]} r="4" fill="hsl(98,38%,40%)" />
                    </g>
                  ))}
                  {/* X axis labels */}
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
                    <text key={m} x={50 + i * 100} y="178" textAnchor="middle" fontSize="10" fill="hsl(0,0%,60%)">{m}</text>
                  ))}
                </svg>
              </div>
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-3 h-0.5 bg-eco" />
                  CO₂ Saved (kg)
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="w-3 h-0.5 bg-primary" />
                  Parali Repurposed (kg)
                </div>
              </div>
            </div>

            {/* Eco Event Calculator */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-display text-lg font-bold text-foreground mb-1">Plan Your Next Eco-Event</h2>
              <p className="text-sm text-muted-foreground mb-5">Calculate the environmental savings for your upcoming party or wedding.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1.5" htmlFor="eventGuests">Number of Guests</label>
                    <input id="eventGuests" type="number" defaultValue={150} placeholder="e.g. 150" className="w-full text-sm px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-foreground block mb-1.5" htmlFor="mealCourses">Meal Course Count</label>
                    <input id="mealCourses" type="number" defaultValue={3} className="w-full text-sm px-3 py-2.5 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <button className="w-full bg-primary text-primary-foreground font-semibold rounded-lg py-3 hover:opacity-90 transition-opacity">Calculate Footprint</button>
                </div>
                <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <Leaf size={28} className="text-primary mb-2" />
                  <div className="text-xs text-muted-foreground mb-1 font-semibold uppercase">Potential Saving</div>
                  <div className="font-display text-4xl font-bold text-primary">{potentialSaving} kg</div>
                  <div className="text-xs text-muted-foreground mt-2 leading-relaxed">
                    Enter event details to see how many plastic plates you'll save from landfills.
                  </div>
                </div>
              </div>
            </div>

            {/* Spread the Impact */}
            <div className="text-center py-8">
              <Leaf size={28} className="text-primary mx-auto mb-3" />
              <h2 className="font-display text-xl font-bold text-foreground mb-2">Spread the Impact</h2>
              <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
                Invite friends to ZESTRAW. For every successful referral, we repurpose an additional 10kg of Parali in your name.
              </p>
              <button className="bg-eco text-white font-semibold text-sm px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
                Invite Your Friends
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
