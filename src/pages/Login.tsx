import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Smartphone, Code2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { login, phoneAuth } from "@/services/operations/authAPI";
import { sendOtp, verifyOtp } from "@/lib/firebase";
import { Checkbox } from "@/components/ui/checkbox";
import logo from "@/assets/logo.png";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [phoneNumber, setPhoneNumber] = useState("");
  const [stage, setStage] = useState<'enterNumber' | 'enterCode'>('enterNumber');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [otp, setOtp] = useState('');
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'email') {
      if (!email || !password) {
        toast.error("Required Fields", {
          description: "Please enter both email and password to log in.",
        });
        return;
      }
      login(email, password, navigate, setAuth);
      return;
    }

    // Phone OTP flow
    if (mode === 'phone') {
      if (stage === 'enterNumber') {
        if (!phoneNumber) {
          toast.error('Enter phone number');
          return;
        }
        setLoading(true);
        try {
          const cr = await sendOtp(phoneNumber);
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

      if (stage === 'enterCode') {
        if (!otp || !confirmationResult) {
          toast.error('Enter OTP code');
          return;
        }
        setLoading(true);
        try {
          const res = await verifyOtp(confirmationResult, otp);
          const phone = res.user?.phoneNumber || phoneNumber;
          // Call phoneAuth with correct parameters (phone, fullName, accountType, navigate, setAuth)
          await phoneAuth(phone, 'User', 'retail', navigate, setAuth);
        } catch (err: any) {
          console.error('Verify OTP error:', err);
          toast.error('Invalid OTP code', {
            description: err.message || 'Please check the code and try again'
          });
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const toggleMode = (m: 'email' | 'phone') => {
    setMode(m);
    setStage('enterNumber');
    setConfirmationResult(null);
    setOtp('');
    setPhoneNumber('');
  };

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-[500px] h-[500px] rounded-full border border-primary/5 opacity-40" />
        <div className="absolute bottom-20 right-40 w-[300px] h-[300px] rounded-full border border-primary/5 opacity-30" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        <Link to="/" className="text-sm text-muted-foreground mb-6 hover:text-foreground flex items-center gap-1 self-start md:self-center">
          ← Back to home
        </Link>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-2 font-lora"
        >
          Welcome Back
        </motion.h1>
        <p className="text-muted-foreground text-sm mb-8 text-center">
          Enter your credentials to access your sustainable tableware dashboard.
        </p>

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-md bg-card rounded-2xl p-8 shadow-sm border border-border"
        >
          {/* Auth Mode Slider */}
          <div className="flex gap-2 mb-6 bg-muted p-1 rounded-lg">
            <button
              type="button"
              onClick={() => toggleMode('email')}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-all ${
                mode === 'email'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-2" />
              Email
            </button>
            <button
              type="button"
              onClick={() => toggleMode('phone')}
              className={`flex-1 py-2 px-3 rounded-md font-medium text-sm transition-all ${
                mode === 'phone'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Smartphone className="w-4 h-4 inline mr-2" />
              Phone
            </button>
          </div>

          <div id="recaptcha-container" className="flex justify-center mb-4" />

          <form onSubmit={handleLogin} className="space-y-5">
            {mode === 'phone' ? (
              <>
                {stage === 'enterNumber' ? (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+15551234567"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="text-xs text-muted-foreground mt-1">E.164 format: +{'{countrycode}{number}'} (e.g., +15551234567)</p>
                  </div>
                ) : (
                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                      VERIFICATION CODE
                    </label>
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="123456"
                      maxLength={6}
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Enter the 6-digit code sent to {phoneNumber}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      PASSWORD
                    </label>
                    <Link to="/forgot-password" className="text-xs font-semibold text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(checked) => setRemember(checked === true)}
                  />
                  <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer select-none">
                    Remember this device
                  </label>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'phone' && stage === 'enterNumber' ? 'Send Code' : 'Login to Account'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-sm text-center text-muted-foreground mt-6">
            New to the movement?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </p>
        </motion.div>

        {/* Bottom links */}
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
