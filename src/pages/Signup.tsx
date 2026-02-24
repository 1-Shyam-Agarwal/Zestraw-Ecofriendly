import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, User, Building2, CheckCircle2, Wheat, Code2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { signUp, phoneAuth } from "@/services/operations/authAPI";
import { sendOtp, verifyOtp } from "@/lib/firebase";
import { Checkbox } from "@/components/ui/checkbox";
import heroImage from "@/assets/hero-tableware.jpg"
import logo from "@/assets/logo.png"

export default function SignupPage() {
  const [accountType, setAccountType] = useState<"retail" | "b2b">("retail");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [mode, setMode] = useState<'email'|'phone'>('email');
  const [phone, setPhone] = useState('');
  const [stage, setStage] = useState<'enterNumber'|'enterCode'>('enterNumber');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [demoMode, setDemoMode] = useState(() => localStorage.getItem('DEMO_OTP_MODE') === 'true');
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const toggleDemoMode = () => {
    const newDemoMode = !demoMode;
    setDemoMode(newDemoMode);
    if (newDemoMode) {
      localStorage.setItem('DEMO_OTP_MODE', 'true');
      toast.success('Demo OTP Mode Enabled', {
        description: 'OTP codes will be generated and shown in the browser console.'
      });
    } else {
      localStorage.removeItem('DEMO_OTP_MODE');
      toast.success('Demo OTP Mode Disabled', {
        description: 'Using real Firebase Phone Authentication.'
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = "Full name is required";
    if (!email.trim() || !email.includes("@")) errs.email = "Valid email is required";
    if (password.length < 8) errs.password = "Password must be at least 8 characters";
    if (password !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!agreed) errs.agreed = "You must agree to the terms";
    if (!accountType) errs.accountType = "Account type is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'email') {
      if (!validate()) return;
      signUp(fullName, email, password, accountType, navigate);
      return;
    }

    // Phone flow: first stage should send OTP
    if (mode === 'phone') {
      if (stage === 'enterNumber') {
        if (!phone) {
          toast.error('Enter phone number');
          return;
        }
        setLoading(true);
        try {
          const cr = await sendOtp(phone);
          setConfirmationResult(cr);
          setStage('enterCode');
          toast.success('OTP sent to your phone');
        } catch (err: any) {
          console.error('Send OTP error:', err);
          toast.error('Failed to send OTP', {
            description: err.message || 'Please check your phone number and try again. Use format: +15551234567'
          });
        } finally {
          setLoading(false);
        }
        return;
      }

      // verify code
      if (stage === 'enterCode') {
        if (!otpCode || !confirmationResult) {
          toast.error('Enter OTP');
          return;
        }
        setLoading(true);
        try {
          const result = await verifyOtp(confirmationResult, otpCode);
          const phoneNumber = result.user?.phoneNumber || phone;

          // Call phoneAuth directly instead of signUp
          await phoneAuth(phoneNumber, fullName, accountType, navigate, setAuth);
          toast.success('Account created');
        } catch (err: any) {
          console.error('Verify OTP error:', err);
          toast.error('OTP verification failed', {
            description: err.message || 'Please check the code and try again'
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const onModeToggle = (m: 'email'|'phone') => {
    setMode(m);
    setStage('enterNumber');
    setConfirmationResult(null);
    setOtpCode('');
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col justify-between bg-[#fff5ed] p-12 relative overflow-hidden">
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2 mb-12">
            <img src={logo} alt="" className="w-28 md:w-32 h-auto" />
          </Link>
          <h1 className="text-4xl font-bold font-lora leading-tight mb-4">
            Join the movement toward{" "}
            <span className="text-gradient-primary font-lora italic">sustainable</span>{" "}
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
          <Wheat className="w-full h-full" strokeWidth={0.5} />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-col justify-center px-6 lg:px-16 py-12">
        <Link to="/" className="text-sm text-muted-foreground mb-6 hover:text-foreground flex items-center gap-1">
          ← Back to home
        </Link>

        <h2 className="text-2xl font-bold font-lora mb-1">Create your account</h2>
        <p className="text-muted-foreground text-sm mb-8">Welcome to the future of dining. Let's get started.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Auth Mode Slider */}
          <div className="flex gap-2 mb-6 bg-muted p-1 rounded-lg">
            <button
              type="button"
              onClick={() => onModeToggle('email')}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-all ${
                mode === 'email'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Email
            </button>
            <button
              type="button"
              onClick={() => onModeToggle('phone')}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-all ${
                mode === 'phone'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Phone (OTP)
            </button>
          </div>

          {mode === 'phone' && stage === 'enterNumber' && (
            <div id="recaptcha-container" className="flex justify-center mb-4" />
          )}

          {mode === 'phone' ? (
            <>
              {stage === 'enterNumber' ? (
                <>
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">FULL NAME</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">PHONE NUMBER</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+15551234567"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="text-xs text-muted-foreground mt-1">E.164 format: +{'{countrycode}{number}'} (e.g., +15551234567)</p>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">VERIFICATION CODE</label>
                  <input
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Enter the 6-digit code sent to {phone}</p>
                </div>
              )}
            </>
          ) : (
            <>
              <div>
                <label className="text-sm font-semibold mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold mb-2 block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Confirm Password</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </>
          )}
          {/* Account Type - Show for phone mode enterNumber stage and email mode */}
          {(mode === 'email' || (mode === 'phone' && stage === 'enterNumber')) && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 block">SELECT YOUR ACCOUNT TYPE</label>
              <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAccountType("retail")}
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-colors relative ${accountType === "retail" ? "border-primary bg-primary/5" : "border-border hover:bg-accent"}`}
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
                className={`flex flex-col items-start gap-2 p-4 rounded-xl border-2 text-left transition-colors relative ${accountType === "b2b" ? "border-primary bg-primary/5" : "border-border hover:bg-accent"}`}
              >
                <Building2 className={`w-6 h-6 ${accountType === "b2b" ? "text-primary" : "text-muted-foreground"}`} />
                <div>
                  <span className={`text-sm font-semibold ${accountType === "b2b" ? "text-primary" : ""}`}>B2B Buyer</span>
                  <p className="text-xs text-muted-foreground">For restaurants, events, and wholesalers.</p>
                </div>
                {accountType === "b2b" && <CheckCircle2 className="w-4 h-4 text-primary absolute top-3 right-3" />}
              </button>
            </div>
            </div>
          )}

          {/* Terms and conditions */}
          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer select-none">
              I agree to the <Link to="/legal" className="text-primary font-semibold hover:underline">Terms of Service</Link> and{" "}
              <Link to="/legal" className="text-primary font-semibold hover:underline">Privacy Policy</Link>, including our commitment to 100% plastic-free logistics.
            </label>
          </div>
          {errors.agreed && <p className="text-xs text-destructive">{errors.agreed}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                {mode === 'phone' && stage === 'enterNumber' ? 'Send Code' : 'Create Account'}
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Log in</Link>
          </p>
        </form>

        {/* Bottom links with Demo Mode Toggle */}
        <div className="flex items-center gap-6 mt-8 text-xs text-muted-foreground uppercase tracking-wider justify-between">
          <div className="flex items-center gap-6">
            <Link to="/legal" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="/legal" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="/legal" className="hover:text-foreground transition-colors">
              Help
            </Link>
          </div>
          {/* Demo Mode Toggle - Only show in development */}
          {import.meta.env.MODE === 'development' && (
            <button
              onClick={toggleDemoMode}
              className={`flex items-center gap-2 px-3 py-1 rounded-md text-xs transition-all ${
                demoMode
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              title="Toggle Demo OTP Mode for testing without Firebase Phone Auth"
            >
              <Code2 className="w-3 h-3" />
              {demoMode ? 'Demo Mode ON' : 'Demo Mode OFF'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
