import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut, ChevronDown, Leaf, Truck, Recycle, Globe, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import logo from "../assets/logo.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Impact", href: "/impact" },
  { label: "Bulk Orders", href: "/bulk-orders" },
  { label: "Marketplace", href: "/marketplace" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setShowLogoutAlert(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 w-full ${scrolled
        ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5 py-1"
        : "bg-transparent py-4"
        }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center gap-12">
          <Link to="/" className="relative z-10 hover:opacity-90 transition-opacity">
            <img src={logo} alt="ZESTRAW" className="w-28 md:w-32 h-auto" />
          </Link>

          {/* Center Section: Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="relative px-4 py-2 group"
              >
                <span className={`text-sm font-bold tracking-tight transition-colors duration-300 ${isActive(item.href) ? "text-primary" : "text-foreground/70 group-hover:text-primary"
                  }`}>
                  {item.label}
                </span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-4 right-4 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-3">
          <Link to="/cart" className="relative p-2.5 bg-secondary/50 rounded-full hover:bg-secondary transition-all group" aria-label="Cart">
            <ShoppingCart className="w-5 h-5 text-foreground group-hover:scale-110 transition-transform" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-black shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 hover:bg-primary/5 rounded-lg transition-colors focus:outline-none group">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs text-primary font-bold border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-1 p-1 rounded-xl border-border bg-white shadow-xl">
                <div className="px-3 py-2 border-b border-border/50 mb-1">
                  <p className="text-sm font-bold text-foreground truncate">{user.fullName}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{user.email}</p>
                </div>
                <div className="space-y-0.5">
                  <Link to="/dashboard">
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2 focus:bg-primary/5 focus:text-primary transition-colors">
                      <span className="text-sm font-medium">Dashboard</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/orders">
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2 focus:bg-primary/5 focus:text-primary transition-colors">
                      <span className="text-sm font-medium">My Orders</span>
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/profile">
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2 focus:bg-primary/5 focus:text-primary transition-colors">
                      <span className="text-sm font-medium">Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuSeparator className="my-1 bg-border/50" />
                  <DropdownMenuItem
                    onClick={() => setShowLogoutAlert(true)}
                    className="cursor-pointer rounded-lg py-2 text-destructive focus:bg-destructive/5"
                  >
                    <span className="text-sm font-semibold">Log out</span>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden md:inline-flex items-center h-10 px-6 rounded-full bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all">
              Sign in
            </Link>
          )}

          <button
            className="lg:hidden p-2.5 bg-secondary/50 rounded-full hover:bg-secondary transition-all"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <motion.div animate={{ rotate: mobileOpen ? 90 : 0 }}>
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[64px] bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-[64px] bottom-0 w-[85%] max-w-sm bg-background border-l border-border z-50 lg:hidden flex flex-col"
            >
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Discover</p>
                    <nav className="space-y-2">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-5 py-4 rounded-2xl text-base font-black transition-all ${isActive(item.href)
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "hover:bg-secondary/80 bg-secondary/30"
                            }`}
                        >
                          {item.label}
                          <Globe className={`w-4 h-4 opacity-50 ${isActive(item.href) ? "text-primary-foreground" : "text-primary"}`} />
                        </Link>
                      ))}
                    </nav>
                  </div>

                  {user && (
                    <div className="pt-6 border-t border-border">
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">Member Area</p>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: <Recycle className="w-5 h-5" />, label: "Tracker", href: "/dashboard" },
                          { icon: <Truck className="w-5 h-5" />, label: "Orders", href: "/orders" },
                        ].map((item) => (
                          <Link
                            key={item.label}
                            to={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-secondary/30 border border-border group active:scale-95 transition-all"
                          >
                            <div className="p-2 bg-white rounded-xl shadow-sm group-hover:text-primary transition-colors">{item.icon}</div>
                            <span className="text-xs font-black">{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-secondary/20 border-t border-border mt-auto">
                {user ? (
                  <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-black">
                      {user.fullName[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black">{user.fullName}</p>
                      <button
                        onClick={() => setShowLogoutAlert(true)}
                        className="text-[11px] font-bold text-destructive flex items-center gap-1 hover:underline"
                      >
                        <LogOut className="w-3 h-3" /> Log out
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full h-12 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/10"
                  >
                    Sign in to Account
                  </Link>
                )}
                <div className="flex items-center justify-center gap-1.5 mt-4">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" />
                  <span className="text-[10px] font-bold text-muted-foreground">Proudly Plastic-Free India</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
        <AlertDialogContent className="rounded-[2.5rem] border-border bg-white p-8 shadow-2xl max-w-[400px]">
          <AlertDialogHeader>
            <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <LogOut className="w-8 h-8 text-red-500" />
            </div>
            <AlertDialogTitle className="font-lora text-2xl font-black text-foreground text-center">Leaving already?</AlertDialogTitle>
            <AlertDialogDescription className="text-foreground/70 text-center font-medium leading-relaxed">
              We'll be here whenever you're ready to continue your sustainable journey. See you soon!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-col gap-3 mt-8">
            <AlertDialogAction
              onClick={handleLogout}
              className="w-full h-12 rounded-2xl bg-red-500 text-white font-black uppercase tracking-widest hover:bg-red-600 shadow-lg shadow-red-200"
            >
              Sign out
            </AlertDialogAction>
            <AlertDialogCancel className="w-full h-12 rounded-2xl bg-secondary border-none text-foreground font-black uppercase tracking-widest hover:bg-secondary/80">
              Stay signed in
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
