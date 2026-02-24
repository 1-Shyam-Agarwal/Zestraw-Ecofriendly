import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X, LogOut, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
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
  const { user, logout } = useAuth();
  const location = useLocation();
  const isActive = (href: string) => location.pathname === href;

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    setShowLogoutAlert(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fff5ed] py-2">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="pt-2">
          <img src={logo} alt="logo" className="w-28 md:w-32 h-auto" />
        </Link>

        {/* Left nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`text-md font-medium transition-colors hover:text-primary ${isActive(item.href) ? "text-primary" : "text-foreground"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="p-2 hover:bg-accent rounded-full transition-colors relative" aria-label="Cart">
            <ShoppingCart className="w-5 h-5 text-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-primary-foreground text-[10px] rounded-full flex items-center justify-center font-bold">3</span>
          </Link>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-white hover:bg-accent transition-colors focus:outline-none">
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] text-primary-foreground font-bold">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium">{user.fullName.split(' ')[0]}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2">
                <div className="p-2 px-4">
                  <p className="text-sm font-semibold">{user.fullName}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <Link to="/dashboard">
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem onClick={() => setShowLogoutAlert(true)} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground border border-border text-sm font-medium hover:opacity-90 transition-opacity">
              Sign in
            </Link>
          )}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-full transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border bg-card"
          >
            <nav className="flex flex-col p-4 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.href) ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="px-4 py-3 border-t border-border mt-2">
                    <p className="text-sm font-semibold">{user.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <button
                    onClick={() => setShowLogoutAlert(true)}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-center bg-primary text-primary-foreground mt-2"
                >
                  Sign in
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <AlertDialog open={showLogoutAlert} onOpenChange={setShowLogoutAlert}>
        <AlertDialogContent className="rounded-2xl border-border bg-orange-50 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-lora text-xl text-foreground">Are you sure you want to log out? </AlertDialogTitle>
            <AlertDialogDescription className="text-foreground/80">
              You’re about to sign out of your ZESTRAW account. <br />Once logged out, you’ll need to sign back in to access your orders, profile, and personalized settings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-full bg-primary text-white hover:bg-primary/90 hover:text-white">Stay signed in</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="rounded-full border-border bg-red-500 hover:bg-red-600 text-white"
            >
              Confirm and log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </header>
  );
}
