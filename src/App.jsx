import { useState, useEffect, useRef, useCallback } from "react";

const SUPABASE_URL = 'https://fuikrlwvqnrhgbtztavm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aWtybHd2cW5yaGdidHp0YXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMwODM1NDEsImV4cCI6MjA5ODY1OTU0MX0.bZ5_fWi2XR5ancZs0P23SSk4ldwKrp7uG7aJY2np_6A';

const supabaseFetch = async (path, options = {}) => {
  const response = await fetch(`\( {SUPABASE_URL} \){path}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return response.json();
};

const BRAND = { name: "AetherForge", tagline: "Institutional-Grade Trading Returns for Everyone", since: "2019" };

const PALETTE = {
  void: "#080C18", navy: "#0D1526", navyLight: "#131F35", steel: "#1A3050",
  teal: "#00D4AA", tealDim: "#009E80", gold: "#C9A84C", goldLight: "#E8C96E",
  text: "#E8EDF5", textMuted: "#8892A4", textDim: "#4A5568",
  danger: "#F56565", success: "#48BB78",
};

// const CRYPTO_ASSETS = [
  { sym: "BTC/USD", price: 67842.30, chg: +2.14 }, { sym: "ETH/USD", price: 3521.88, chg: -0.87 },
  { sym: "SOL/USD", price: 182.44, chg: +5.32 }, { sym: "BNB/USD", price: 608.12, chg: +1.09 },
  { sym: "XRP/USD", price: 0.6218, chg: -1.44 }, { sym: "MATIC/USD", price: 0.9871, chg: +3.77 },
  { sym: "DOGE/USD", price: 0.1634, chg: -2.11 }, { sym: "ADA/USD", price: 0.5922, chg: +0.88 },
  { sym: "LTC/USD", price: 94.38, chg: -0.33 }, { sym: "AVAX/USD", price: 38.92, chg: +4.15 },
  { sym: "EUR/USD", price: 1.0842, chg: +0.12 }, { sym: "GBP/USD", price: 1.2714, chg: -0.08 },
  { sym: "GOLD/USD", price: 2341.60, chg: +0.55 }, { sym: "LINK/USD", price: 18.74, chg: +6.22 },
  { sym: "DOT/USD", price: 8.93, chg: -1.02 },
];

const PLANS = [ /* your full PLANS array */ ];

const CRYPTO_WALLETS = [ /* your full CRYPTO_WALLETS with real addresses */ ];

const TESTIMONIALS = [ /* your full TESTIMONIALS */ ];

const LIVE_TRADES = [ /* your full LIVE_TRADES */ ];

const STATS = [ /* your full STATS */ ];

const fmt = (n, d = 2) => n?.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d }) ?? "0.00";
const fmtUSD = (n) => "$" + fmt(n);

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return mobile;
}

function useInterval(cb, delay) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);
  useEffect(() => {
    if (!delay) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

function usePrices() {
  const [prices, setPrices] = useState(CRYPTO_ASSETS);
  useInterval(() => {
    setPrices(prev => prev.map(a => ({
      ...a,
      price: +(a.price * (1 + (Math.random() - 0.499) * 0.0008)).toFixed(a.price > 100 ? 2 : 4),
      chg: +(a.chg + (Math.random() - 0.5) * 0.1).toFixed(2),
    })));
  }, 1800);
  return prices;
}
const S = {
  glassCard: { background: "rgba(19,31,53,0.9)", border: "1px solid rgba(0,212,170,0.12)", borderRadius: 16 },
  tealBtn: { background: `linear-gradient(135deg,\( {PALETTE.teal}, \){PALETTE.tealDim})`, color: "#080C18", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", transition: "opacity .2s" },
  outlineBtn: { background: "transparent", color: PALETTE.teal, border: `1.5px solid ${PALETTE.teal}`, borderRadius: 10, fontWeight: 600, cursor: "pointer", transition: "opacity .2s" },
  input: { background: "rgba(13,21,38,0.9)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 10, color: PALETTE.text, padding: "13px 14px", fontSize: 15, width: "100%", boxSizing: "border-box", outline: "none" },
  badge: { background: "rgba(0,212,170,0.12)", border: "1px solid rgba(0,212,170,0.3)", color: PALETTE.teal, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", display: "inline-block" },
  label: { fontSize: 13, color: PALETTE.textMuted, marginBottom: 6, display: "block", fontWeight: 500 },
};

// LiveTicker and Nav remain the same as your original code
function LiveTicker({ prices }) {
  // your original LiveTicker code
}

function Nav({ page, setPage, user, setUser, setShowAuth }) {
  // your original Nav code
}function AuthModal({ mode, onClose, onSuccess }) {
  const [tab, setTab] = useState(mode);
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const isMobile = useIsMobile();

  const handle = async () => {
    if (!form.email || !form.password) {
      setErr("Please fill required fields.");
      return;
    }

    setLoading(true);
    setErr("");

    try {
      if (tab === "register") {
        const { data, error } = await supabaseFetch('/auth/v1/signup', {
          method: 'POST',
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            options: { data: { full_name: form.name } }
          })
        });

        if (error) throw error;

        await supabaseFetch('/rest/v1/profiles', {
          method: 'POST',
          body: JSON.stringify({
            user_id: data.user.id,
            full_name: form.name || form.email.split("@")[0],
            email: form.email,
            country: form.country || "Other",
            balance: 0
          })
        });

        onSuccess({ name: form.name || form.email.split("@")[0], email: form.email, balance: 0 });
      } else {
        const { data, error } = await supabaseFetch('/auth/v1/token?grant_type=password', {
          method: 'POST',
          body: JSON.stringify({
            email: form.email,
            password: form.password
          })
        });

        if (error) throw error;

        onSuccess({ name: form.email.split("@")[0], email: form.email, balance: 0 });
      }
      onClose();
    } catch (error) {
      setErr(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: isMobile ? "flex-end" : "center", justifyContent: "center", background: "rgba(8,12,24,0.85)", backdropFilter: "blur(8px)" }}>
      <div style={{ ...S.glassCard, width: "100%", maxWidth: isMobile ? "100%" : 440, padding: isMobile ? "28px 20px 40px" : 40, borderRadius: isMobile ? "20px 20px 0 0" : 16, position: "relative", maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", color: PALETTE.textMuted, fontSize: 22, cursor: "pointer" }}>✕</button>
        <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: 4 }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px", border: "none", borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: "pointer", background: tab === t ? PALETTE.teal : "transparent", color: tab === t ? "#080C18" : PALETTE.textMuted, transition: "all .2s" }}>{t === "login" ? "Sign In" : "Register"}</button>
          ))}
        </div>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{tab === "login" ? "Welcome back" : "Create Account"}</div>
          <div style={{ color: PALETTE.textMuted, fontSize: 13 }}>{tab === "login" ? "Access your trading dashboard" : "Join 284,917+ investors worldwide"}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tab === "register" && <div><label style={S.label}>Full Name *</label><input style={S.input} placeholder="John Smith" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} /></div>}
          <div><label style={S.label}>Email *</label><input style={S.input} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} /></div>
          <div><label style={S.label}>Password *</label><input style={S.input} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} /></div>
          {tab === "register" && (
            <div><label style={S.label}>Country</label>
              <select style={{ ...S.input, appearance: "none" }} value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}>
                <option value="">Select...</option>
                {["United Kingdom","Singapore","United States","Australia","Germany","Canada","UAE","Other"].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          )}
          {err && <div style={{ color: PALETTE.danger, fontSize: 13, textAlign: "center" }}>{err}</div>}
          <button onClick={handle} style={{ ...S.tealBtn, width: "100%", padding: "14px 0", fontSize: 15, marginTop: 4 }} disabled={loading}>{loading ? "Processing..." : tab === "login" ? "Sign In" : "Create Account"}</button>
        </div>
        <div style={{ marginTop: 16, padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8, fontSize: 11, color: PALETTE.textDim, lineHeight: 1.6 }}>🔒 AES-256 encrypted. FCA regulated. Capital at risk.</div>
      </div>
    </div>
  );
}
function PlanCard({ plan, onSelect }) {
  const [hover, setHover] = useState(false);
  const totalReturn = plan.daily * plan.duration;
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ ...S.glassCard, padding: "22px 20px", transition: "all .25s", transform: hover ? "translateY(-3px)" : "none", boxShadow: hover ? `0 16px 48px rgba(0,0,0,0.4),0 0 0 1px ${plan.color}40` : "none", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,\( {plan.color}, \){plan.color}40)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 11, color: PALETTE.textMuted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 3 }}>Investment Plan</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: plan.color }}>{plan.name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 26, fontWeight: 900, color: PALETTE.teal }}>{plan.daily}%</div>
          <div style={{ fontSize: 11, color: PALETTE.textMuted }}>Daily ROI</div>
        </div>
      </div>
      <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 10, padding: "12px 14px", marginBottom: 16, fontSize: 13 }}>
        {[["Range", `${fmtUSD(plan.min)} – \( {fmtUSD(plan.max)}`], ["Duration", ` \){plan.duration} Days`], ["Total Return", `+${totalReturn.toFixed(1)}%`]].map(([l, v], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 2 ? 8 : 0 }}>
            <span style={{ color: PALETTE.textMuted }}>{l}</span>
            <span style={{ fontWeight: 700, color: i === 2 ? PALETTE.success : PALETTE.text }}>{v}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom: 18 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, alignItems: "center" }}>
            <span style={{ color: PALETTE.teal, fontSize: 13, flexShrink: 0 }}>✓</span>
            <span style={{ fontSize: 13, color: PALETTE.textMuted }}>{f}</span>
          </div>
        ))}
      </div>
      <button onClick={() => onSelect(plan)} style={{ ...S.tealBtn, width: "100%", padding: "13px 0", fontSize: 14 }}>Choose {plan.name}</button>
    </div>
  );
}

// Keep your HomePage, PlansPage, MarketsPage, DashboardPage, PaymentPage, etc. as they are in your original code.

function HomePage({ prices, setPage, setShowAuth, setSelectedPlan }) {
  // your original HomePage code
}

// ... (add the rest of your pages)

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const prices = usePrices();
  const isMobile = useIsMobile();

  const nav = useCallback((p) => {
    if (p === "dashboard" && !user) { setShowAuth("login"); return; }
    setPage(p); window.scrollTo({ top: 0, behavior: "smooth" });
  }, [user]);

  const onAuth = (u) => { setUser(u); setShowAuth(null); setPage("dashboard"); };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage prices={prices} setPage={nav} setShowAuth={setShowAuth} setSelectedPlan={setSelectedPlan} />;
      case "plans": return <PlansPage setPage={nav} setSelectedPlan={setSelectedPlan} />;
      // ... other cases
      default: return <HomePage prices={prices} setPage={nav} setShowAuth={setShowAuth} setSelectedPlan={setSelectedPlan} />;
    }
  };

  return (
    <div style={{ background: PALETTE.void, color: PALETTE.text, fontFamily: "-apple-system,'SF Pro Display','Segoe UI',system-ui,sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      {/* your style and Nav, LiveTicker, main, Footer */}
      {showAuth && <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} onSuccess={onAuth} />}
    </div>
  );
}