import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck, ArrowLeft, KeyRound } from "lucide-react";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-champagne/10 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#121212] border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        {/* Top brand header */}
        <div className="text-center space-y-3 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-champagne transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Store
          </Link>
          <div className="mx-auto h-12 w-12 rounded-2xl bg-champagne/15 border border-champagne/30 flex items-center justify-center text-champagne">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold font-heading tracking-tight text-white">
            ADMIN DASHBOARD
          </h2>
          <p className="text-xs text-white/50">
            Sign in to manage shop products, inventory, and media
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@dapper.com"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-champagne"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5">
              Password
            </label>
            <div className="relative">
              <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-champagne"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-champagne text-black font-bold text-sm hover:bg-champagne-light transition-all shadow-lg shadow-champagne/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <div className="h-5 w-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" /> Sign In to Dashboard
              </>
            )}
          </button>
        </form>


      </motion.div>
    </div>
  );
}
