"use client";
import { useState } from "react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("BUYER");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(isLogin ? "Login successful!" : "Account created!");
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#faf9f7", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <nav style={{ background: "#1a1410", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ color: "#faf9f7", fontSize: 24, fontWeight: 900, textDecoration: "none" }}>Artis<span style={{ color: "#c9a96e" }}>an</span></a>
        <a href="/" style={{ color: "#c9a96e", fontSize: 14, textDecoration: "none" }}>Back to Shop</a>
      </nav>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ background: "#fff", border: "1px solid #e8e3dc", width: "100%", maxWidth: 440, padding: 48 }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1 style={{ fontSize: 32, fontWeight: 900 }}>Artis<span style={{ color: "#c9a96e" }}>an</span></h1>
            <p style={{ color: "#9b8b7e", fontSize: 15 }}>{isLogin ? "Welcome back!" : "Create your account"}</p>
          </div>
          <div style={{ display: "flex", marginBottom: 28, border: "1.5px solid #e8e3dc" }}>
            {["Login", "Register"].map((tab) => (
              <button key={tab} onClick={() => { setIsLogin(tab === "Login"); setSuccess(""); }}
                style={{ flex: 1, padding: 12, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "Georgia, serif",
                  background: (isLogin ? tab === "Login" : tab === "Register") ? "#1a1410" : "transparent",
                  color: (isLogin ? tab === "Login" : tab === "Register") ? "#fff" : "#6b5e52" }}>
                {tab}
              </button>
            ))}
          </div>
          {success && (
            <div style={{ background: "#d1fae5", border: "1px solid #10b981", padding: "12px 16px", marginBottom: 20, color: "#065f46", fontSize: 14, textAlign: "center" }}>
              {success}
            </div>
          )}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {!isLogin && (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>Full Name</label>
                <input placeholder="Aravinth" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, fontFamily: "Georgia, serif", boxSizing: "border-box" as const }} />
              </div>
            )}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>Email</label>
              <input type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, fontFamily: "Georgia, serif", boxSizing: "border-box" as const }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>Password</label>
              <input type="password" placeholder="••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, fontFamily: "Georgia, serif", boxSizing: "border-box" as const }} />
            </div>
            {!isLogin && (
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>I want to</label>
                <div style={{ display: "flex", gap: 12 }}>
                  {[["BUYER", "Buy Products"], ["SELLER", "Sell Products"]].map(([val, label]) => (
                    <button key={val} onClick={() => setRole(val)}
                      style={{ flex: 1, padding: 12, border: "1.5px solid", borderColor: role === val ? "#1a1410" : "#d4cbbf",
                        background: role === val ? "#1a1410" : "transparent", color: role === val ? "#fff" : "#6b5e52",
                        cursor: "pointer", fontSize: 13, fontFamily: "Georgia, serif" }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <button onClick={handleSubmit} disabled={loading}
              style={{ background: loading ? "#9b8b7e" : "#1a1410", color: "#fff", border: "none", padding: 14,
                fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "Georgia, serif", marginTop: 8 }}>
              {loading ? "Please wait..." : isLogin ? "LOGIN" : "CREATE ACCOUNT"}
            </button>
          </div>
          <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "#9b8b7e" }}>
            {isLogin ? "No account? " : "Have an account? "}
            <span onClick={() => { setIsLogin(!isLogin); setSuccess(""); }} style={{ color: "#c9a96e", cursor: "pointer", fontWeight: 600 }}>
              {isLogin ? "Register" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}