"use client";
import { useState } from "react";

const stats = [
  { label: "Total Revenue", value: "$12,480", change: "+18%", icon: "💰" },
  { label: "Orders This Month", value: "84", change: "+12%", icon: "📦" },
  { label: "Products Listed", value: "32", change: "+3", icon: "🏷️" },
  { label: "Avg. Rating", value: "4.8★", change: "Stable", icon: "⭐" },
];

const orders = [
  { id: "ORD-1042", product: "Mechanical Keyboard Pro", buyer: "Alice M.", amount: 189, status: "DELIVERED", date: "May 15" },
  { id: "ORD-1041", product: "Leather Wallet", buyer: "Bob K.", amount: 59, status: "SHIPPED", date: "May 14" },
  { id: "ORD-1040", product: "Ceramic Pour-Over", buyer: "Carla R.", amount: 74, status: "CONFIRMED", date: "May 13" },
  { id: "ORD-1039", product: "Keyboard Pro", buyer: "Dan W.", amount: 189, status: "PENDING", date: "May 13" },
  { id: "ORD-1038", product: "Leather Wallet", buyer: "Eve S.", amount: 59, status: "DELIVERED", date: "May 12" },
];

const statusColors: Record<string, string> = {
  DELIVERED: "#10b981",
  SHIPPED: "#6366f1",
  CONFIRMED: "#f59e0b",
  PENDING: "#9b8b7e",
};

const revenue = [1200, 1800, 1400, 2200, 2800, 2100, 3100, 2700, 3400, 3800, 4200, 3900];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const maxRev = Math.max(...revenue);

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#f7f5f2", minHeight: "100vh", display: "flex" }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: "#1a1410", minHeight: "100vh", padding: "32px 0", position: "fixed", left: 0, top: 0 }}>
        <div style={{ padding: "0 24px 28px", borderBottom: "1px solid #3d2b1f" }}>
          <h1 style={{ color: "#faf9f7", fontSize: 20, fontWeight: 900 }}>Artis<span style={{ color: "#c9a96e" }}>an</span></h1>
          <p style={{ color: "#9b8b7e", fontSize: 11, marginTop: 4, letterSpacing: 1 }}>SELLER PORTAL</p>
        </div>
        <div style={{ marginTop: 20 }}>
          {[["overview","📊","Overview"],["products","🏷️","Products"],["orders","📦","Orders"],["analytics","📈","Analytics"]].map(([id, icon, label]) => (
            <div key={id} onClick={() => setActiveTab(id)}
              style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 24px", cursor: "pointer",
                color: activeTab === id ? "#faf9f7" : "#9b8b7e", fontSize: 14, fontWeight: 500,
                background: activeTab === id ? "rgba(201,169,110,0.15)" : "transparent",
                borderRight: activeTab === id ? "3px solid #c9a96e" : "3px solid transparent" }}>
              <span>{icon}</span><span>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, padding: "0 24px" }}>
          <a href="/" style={{ color: "#9b8b7e", fontSize: 13, textDecoration: "none" }}>← Back to Shop</a>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 220, flex: 1, padding: 40 }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 36 }}>
          <div>
            <p style={{ fontSize: 12, letterSpacing: 2, color: "#c9a96e", marginBottom: 6, textTransform: "uppercase" as const }}>Welcome back</p>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#1a1410" }}>Dashboard</h1>
          </div>
          <button style={{ background: "#1a1410", color: "#fff", border: "none", padding: "12px 24px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
            + Add Product
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontSize: 28 }}>{s.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 600, padding: "3px 8px", background: "#d1fae5", color: "#065f46" }}>{s.change}</span>
              </div>
              <p style={{ fontSize: 28, fontWeight: 900, color: "#1a1410", marginBottom: 4 }}>{s.value}</p>
              <p style={{ fontSize: 13, color: "#9b8b7e" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 24, marginBottom: 24 }}>

          {/* Revenue Chart */}
          <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Revenue 2025</h2>
              <span style={{ fontSize: 13, color: "#9b8b7e" }}>Total: $32,600</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 140 }}>
              {revenue.map((val, i) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <div style={{ width: "100%", height: `${(val / maxRev) * 120}px`, background: i === 11 ? "#c9a96e" : "#e8e3dc", transition: "all 0.2s", cursor: "pointer" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#c9a96e")}
                    onMouseLeave={e => (e.currentTarget.style.background = i === 11 ? "#c9a96e" : "#e8e3dc")} />
                  <span style={{ fontSize: 9, color: "#9b8b7e" }}>{months[i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Top Products</h2>
            {[["Mechanical Keyboard", 142, "$26,838"], ["Leather Wallet", 89, "$5,251"], ["Ceramic Pour-Over", 54, "$3,996"], ["Cable Organizer", 38, "$950"]].map(([name, sold, rev], i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: "#9b8b7e", fontWeight: 700, width: 16 }}>#{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, fontWeight: 500, marginBottom: 4 }}>{name}</p>
                  <div style={{ height: 4, background: "#f0ebe4" }}>
                    <div style={{ height: "100%", width: `${(Number(sold) / 142) * 100}%`, background: "#c9a96e" }} />
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 12, fontWeight: 700 }}>{rev}</p>
                  <p style={{ fontSize: 11, color: "#9b8b7e" }}>{sold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700 }}>Recent Orders</h2>
            <button style={{ background: "transparent", border: "1.5px solid #1a1410", padding: "8px 18px", cursor: "pointer", fontSize: 13 }}>View All</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e8e3dc" }}>
                {["Order ID", "Product", "Buyer", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} style={{ padding: "10px 12px", textAlign: "left" as const, fontSize: 11, fontWeight: 600, color: "#9b8b7e", letterSpacing: 1, textTransform: "uppercase" as const }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} style={{ borderBottom: "1px solid #f0ebe4" }}>
                  <td style={{ padding: "14px 12px", fontSize: 13, fontWeight: 600, color: "#c9a96e" }}>{order.id}</td>
                  <td style={{ padding: "14px 12px", fontSize: 13 }}>{order.product}</td>
                  <td style={{ padding: "14px 12px", fontSize: 13, color: "#6b5e52" }}>{order.buyer}</td>
                  <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 700 }}>${order.amount}</td>
                  <td style={{ padding: "14px 12px" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", background: `${statusColors[order.status]}20`, color: statusColors[order.status] }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: "14px 12px", fontSize: 13, color: "#9b8b7e" }}>{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}