import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight, User, Building2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-tableware.jpg";

export default function SignupPage() {
  const [accountType, setAccountType] = useState<"retail" | "b2b">("retail");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !email.includes("@")) errs.email = "Valid email is required";
    if (password.length < 8) errs.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!agreed) errs.agreed = "You must agree to the terms";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    toast({ title: "Account created!", description: "Welcome to the ZESTRAW movement." });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-secondary p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <span className="font-display text-xl font-bold text-primary">ZESTRAW</span>
          </Link>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Join the movement toward{" "}
            <span className="text-gradient-primary italic">sustainable</span>{" "}
            tableware.
          </h1>
          <p className="text-muted-foreground text-lg max-w-md">
            We're turning agricultural waste into premium, biodegradable dining experiences. Choose your path and start making an impact today.
          </p>
        </div>

        <div className="relative z-10 mt-8">
          <img src={heroImage} alt="ZESTRAW products" className="rounded-2xl w-full max-w-md object-cover h-60" />
          <div className="flex gap-8 mt-6">
            <div>
              <span className="text-2xl font-bold">1M+</span>
              <p className="text-xs text-muted-foreground">Straws Replaced</p>
            </div>
            <div>
              <span className="text-2xl font-bold">500+</span>
              <p className="text-xs text-muted-foreground">B2B Partners</p>
            </div>
          </div>
        </div>

        {/* Decorative background */}
        <div className="absolute bottom-10 right-10 w-[200px] h-[200px] text-primary/5">
          <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col justify-center px-6 lg:px-16 py-12">
        <Link to="/" className="text-sm text-muted-foreground mb-6 hover:text-foreground flex items-center gap-1">
          ← Back to home
        </Link>

        <h2 className="text-2xl font-bold mb-1">Create your account</h2>
        <p className="text-muted-foreground text-sm mb-8">Welcome to the future of dining. Let's get started.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Account Type */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">SELECT YOUR ACCOUNT TYPE</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType("retail")}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-colors ${
                  accountType === "retail" ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                }`}
              >
                <User className={`w-6 h-6 ${accountType === "retail" ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <span className={`text-sm font-semibold ${accountType === "retail" ? "text-primary" : ""}`}>Retail Customer</span>
                  <p className="text-xs text-muted-foreground">For individual eco-conscious shoppers.</p>
                </div>
                {accountType === "retail" && <CheckCircle2 className="w-4 h-4 text-primary absolute top-3 right-3" />}
              </button>
              <button
                type="button"
                onClick={() => setAccountType("b2b")}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-colors ${
                  accountType === "b2b" ? "border-primary bg-primary/5" : "border-border hover:bg-accent"
                }`}
              >
                <Building2 className={`w-6 h-6 ${accountType === "b2b" ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <span className={`text-sm font-semibold ${accountType === "b2b" ? "text-primary" : ""}`}>B2B Buyer</span>
                  <p className="text-xs text-muted-foreground">For restaurants, events, and wholesalers.</p>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Full Name</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Jane Doe"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
          </div>

          <div>
            <label className="text-sm font-semibold mb-2 block">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com"
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold mb-2 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Confirm Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
            </div>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 mt-0.5 rounded border-border text-primary" />
            <span className="text-xs text-muted-foreground">
              I agree to the <Link to="/legal" className="text-primary font-semibold hover:underline">Terms of Service</Link> and{" "}
              <Link to="/legal" className="text-primary font-semibold hover:underline">Privacy Policy</Link>, including our commitment to 100% plastic-free logistics.
            </span>
          </label>
          {errors.agreed && <p className="text-xs text-destructive">{errors.agreed}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>Create Account <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
          </p>
        </form>

        {/* Certifications */}
        <div className="flex flex-wrap items-center gap-6 mt-8 text-xs text-muted-foreground">
          {["VERIFIED ORGANIC", "B-CORP CERTIFIED", "CLIMATE NEUTRAL"].map((cert) => (
            <span key={cert} className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> {cert}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
