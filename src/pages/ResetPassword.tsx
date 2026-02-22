import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle2, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { resetPassword } from "@/services/operations/authAPI";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            toast.error("Missing Information", {
                description: "Please fill in all fields."
            });
            return;
        }
        if (password !== confirmPassword) {
            toast.error("Password Mismatch", {
                description: "The passwords you entered do not match."
            });
            return;
        }
        if (password.length < 8) {
            toast.error("Password Too Short", {
                description: "Your password must be at least 8 characters long."
            });
            return;
        }

        resetPassword(password, token, navigate);
    };

    return (
        <div className="min-h-screen bg-secondary flex flex-col items-center justify-center px-6">
            <Link to="/" className="text-sm text-muted-foreground mb-6 hover:text-foreground flex items-center gap-1">
                ← Back to home
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-card rounded-2xl p-8 shadow-sm border border-border text-center"
            >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-6 h-6 text-primary" />
                </div>
                <h1 className="text-2xl font-bold font-lora mb-2">Set New Password</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    Create a strong password to secure your ZESTRAW account.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                    <div>
                        <label className="text-sm font-semibold mb-2 block">New Password</label>
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
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold mb-2 block">Confirm New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 mt-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        ) : (
                            <>Reset Password <CheckCircle2 className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <div className="mt-8">
                    <Link to="/login" className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                        <ChevronLeft className="w-4 h-4" /> Back to Login
                    </Link>
                </div>
            </motion.div>

            {/* Bottom text */}
            <div className="flex items-center gap-4 mt-8 text-xs text-muted-foreground uppercase tracking-widest">
                <span>BIODEGRADABLE</span>
                <span>SUSTAINABLE</span>
                <span>RICE STRAW BASED</span>
            </div>
        </div>
    );
}
