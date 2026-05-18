"use client";
import { useState } from "react";

const cartItems = [
  { id: 1, name: "Mechanical Keyboard Pro", price: 189, qty: 1, seller: "TechHaven", img: "⌨️" },
  { id: 2, name: "Leather Minimalist Wallet", price: 59, qty: 2, seller: "CraftedGoods", img: "👜" },
];

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", state: "", zip: "", card: "", expiry: "", cvv: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 75 ? 0 : 8.99;
  const total = subtotal + shipping;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 2000);
  };

  if (done) return (
    <div style={{ fontFamily: "Georgia, serif", background: "#faf9f7", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", padding: 60 }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, marginBottom: 12 }}>Order Confirmed!</h1>
        <p style={{ color: "#6b5e52", fontSize: 18, marginBottom: 8 }}>Thank you for your purchase!</p>
        <p style={{ color: "#9b8b7e", fontSize: 15, marginBottom: 36 }}>Order #ORD-{Math.floor(Math.random() * 9000 + 1000)} · Confirmation sent to {form.email || "your email"}</p>
        <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28, maxWidth: 400, margin: "0 auto 32px", textAlign: "left" }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 14 }}>{item.img} {item.name} x{item.qty}</span>
              <span style={{ fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #e8e3dc", paddingTop: 12, marginTop: 4, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontWeight: 700 }}>Total Paid</span>
            <span style={{ fontWeight: 900, fontSize: 18 }}>${total.toFixed(2)}</span>
          </div>
        </div>
        <a href="/" style={{ background: "#1a1410", color: "#fff", padding: "14px 36px", textDecoration: "none", fontSize: 15, fontWeight: 700 }}>Continue Shopping</a>
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#faf9f7", minHeight: "100vh" }}>
      <nav style={{ background: "#1a1410", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <a href="/" style={{ color: "#faf9f7", fontSize: 24, fontWeight: 900, textDecoration: "none" }}>Artis<span style={{ color: "#c9a96e" }}>an</span></a>
        <span style={{ color: "#9b8b7e", fontSize: 14 }}>Secure Checkout 🔒</span>
      </nav>

      {/* Steps */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e8e3dc", padding: "16px 40px", display: "flex", gap: 40 }}>
        {[["1", "Shipping"], ["2", "Payment"], ["3", "Confirm"]].map(([num, label]) => (
          <div key={num} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700,
              background: Number(num) <= step ? "#1a1410" : "#e8e3dc", color: Number(num) <= step ? "#fff" : "#9b8b7e" }}>{num}</div>
            <span style={{ fontSize: 14, fontWeight: Number(num) === step ? 700 : 400, color: Number(num) === step ? "#1a1410" : "#9b8b7e" }}>{label}</span>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1000, margin: "40px auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 32 }}>

        {/* Left - Form */}
        <div>
          {/* Step 1 - Shipping */}
          {step === 1 && (
            <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Shipping Address</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[["Full Name", "name", "Aravinth"], ["Email", "email", "aravinth@example.com"], ["Address", "address", "123 Main Street"], ["City", "city", "Chennai"]].map(([label, key, placeholder]) => (
                  <div key={key}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>{label}</label>
                    <input placeholder={placeholder} value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, boxSizing: "border-box" as const }} />
                  </div>
                ))}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[["State", "state", "Tamil Nadu"], ["ZIP Code", "zip", "600001"]].map(([label, key, placeholder]) => (
                    <div key={key}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>{label}</label>
                      <input placeholder={placeholder} value={(form as any)[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                        style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, boxSizing: "border-box" as const }} />
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} style={{ background: "#1a1410", color: "#fff", border: "none", padding: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                  Continue to Payment →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 - Payment */}
          {step === 2 && (
            <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Payment Details</h2>
              <p style={{ color: "#9b8b7e", fontSize: 14, marginBottom: 24 }}>🔒 Secured by Stripe</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>Card Number</label>
                  <input placeholder="4242 4242 4242 4242" value={form.card} onChange={e => setForm({ ...form, card: e.target.value })}
                    style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, boxSizing: "border-box" as const }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>Expiry</label>
                    <input placeholder="MM/YY" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, boxSizing: "border-box" as const }} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#3d2b1f", letterSpacing: 1, textTransform: "uppercase" as const, display: "block", marginBottom: 8 }}>CVV</label>
                    <input placeholder="123" value={form.cvv} onChange={e => setForm({ ...form, cvv: e.target.value })}
                      style={{ width: "100%", padding: "12px 16px", border: "1.5px solid #d4cbbf", outline: "none", fontSize: 15, boxSizing: "border-box" as const }} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <button onClick={() => setStep(1)} style={{ background: "transparent", border: "1.5px solid #1a1410", padding: 14, fontSize: 14, cursor: "pointer", flex: 1 }}>← Back</button>
                  <button onClick={() => setStep(3)} style={{ background: "#1a1410", color: "#fff", border: "none", padding: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", flex: 2 }}>Review Order →</button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 - Confirm */}
          {step === 3 && (
            <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 32 }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24 }}>Confirm Order</h2>
              <div style={{ background: "#f7f5f2", padding: 20, marginBottom: 20 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>📍 Shipping to:</p>
                <p style={{ color: "#6b5e52", fontSize: 14 }}>{form.name || "John Smith"}</p>
                <p style={{ color: "#6b5e52", fontSize: 14 }}>{form.address || "123 Main St"}, {form.city || "Chennai"}</p>
                <p style={{ color: "#6b5e52", fontSize: 14 }}>{form.state || "Tamil Nadu"} {form.zip || "600001"}</p>
              </div>
              <div style={{ background: "#f7f5f2", padding: 20, marginBottom: 24 }}>
                <p style={{ fontWeight: 600, marginBottom: 8 }}>💳 Card ending in:</p>
                <p style={{ color: "#6b5e52", fontSize: 14 }}>**** **** **** {form.card.slice(-4) || "4242"}</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => setStep(2)} style={{ background: "transparent", border: "1.5px solid #1a1410", padding: 14, fontSize: 14, cursor: "pointer", flex: 1 }}>← Back</button>
                <button onClick={handlePay} disabled={loading}
                  style={{ background: loading ? "#9b8b7e" : "#10b981", color: "#fff", border: "none", padding: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", flex: 2 }}>
                  {loading ? "Processing..." : `Pay $${total.toFixed(2)} →`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right - Order Summary */}
        <div>
          <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Order Summary</h2>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", gap: 14, marginBottom: 16, paddingBottom: 16, borderBottom: "1px solid #f0ebe4" }}>
                <div style={{ fontSize: 36 }}>{item.img}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.name}</p>
                  <p style={{ color: "#9b8b7e", fontSize: 12 }}>by {item.seller} · Qty: {item.qty}</p>
                  <p style={{ fontWeight: 700, marginTop: 4 }}>${(item.price * item.qty).toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ color: "#6b5e52" }}>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ color: "#6b5e52" }}>Shipping</span>
              <span style={{ color: shipping === 0 ? "#10b981" : "#1a1410" }}>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
            </div>
            <div style={{ borderTop: "2px solid #1a1410", paddingTop: 16, display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Total</span>
              <span style={{ fontWeight: 900, fontSize: 22 }}>${total.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: 12, color: "#9b8b7e", marginTop: 16, textAlign: "center" }}>🔒 256-bit SSL encryption · Powered by Stripe</p>
          </div>
        </div>

      </div>
    </div>
  );
}