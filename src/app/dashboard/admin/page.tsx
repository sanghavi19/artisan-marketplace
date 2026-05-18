"use client";
import { useState } from "react";

const stats = [
  { label: "Total Revenue", value: "$84,320", change: "+22%", icon: "💰" },
  { label: "Total Orders", value: "1,240", change: "+15%", icon: "📦" },
  { label: "Active Sellers", value: "342", change: "+8", icon: "🏪" },
  { label: "Total Users", value: "5,820", change: "+120", icon: "👥" },
];

const sellers = [
  { name: "TechHaven", email: "tech@artisan.com", products: 142, sales: "$26,838", status: "VERIFIED", joined: "Jan 2025" },
  { name: "CraftedGoods", email: "craft@artisan.com", products: 89, sales: "$12,451", status: "VERIFIED", joined: "Feb 2025" },
  { name: "BrewCraft", email: "brew@artisan.com", products: 34, sales: "$8,200", status: "PENDING", joined: "Mar 2025" },
  { name: "SoundWave", email: "sound@artisan.com", products: 56, sales: "$19,300", status: "VERIFIED", joined: "Jan 2025" },
  { name: "Woolvine", email: "wool@artisan.com", products: 28, sales: "$5,100", status: "PENDING", joined: "Apr 2025" },
];

const users = [
  { name: "Alice Johnson", email: "alice@gmail.com", role: "BUYER", orders: 12, joined: "Mar 2025" },
  { name: "Bob Smith", email: "bob@gmail.com", role: "BUYER", orders: 5, joined: "Apr 2025" },
  { name: "John Seller", email: "tech@artisan.com", role: "SELLER", orders: 0, joined: "Jan 2025" },
  { name: "Sarah Maker", email: "craft@artisan.com", role: "SELLER", orders: 0, joined: "Feb 2025" },
  { name: "Admin User", email: "admin@artisan.com", role: "ADMIN", orders: 0, joined: "Jan 2025" },
];

const recentOrders = [
  { id: "ORD-2042", buyer: "Alice J.", seller: "TechHaven", amount: 189, status: "DELIVERED", date: "May 15" },
  { id: "ORD-2041", buyer: "Bob S.", seller: "CraftedGoods", amount: 59, status: "SHIPPED", date: "May 14" },
  { id: "ORD-2040", buyer: "Carol R.", seller: "BrewCraft", amount: 74, status: "CONFIRMED", date: "May 13" },
  { id: "ORD-2039", buyer: "Dan W.", seller: "SoundWave", amount: 249, status: "PENDING", date: "May 13" },
];

const statusColors: Record<string, string> = {
  DELIVERED: "#10b981", SHIPPED: "#6366f1",
  CONFIRMED: "#f59e0b", PENDING: "#9b8b7e",
  VERIFIED: "#10b981", PENDING_S: "#f59e0b",
};

const roleColors: Record<string, string> = {
  BUYER: "#6366f1", SELLER: "#f59e0b", ADMIN: "#ef4444",
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sellerList, setSellerList] = useState(sellers);

  const approveSeller = (name: string) => {
    setSellerList((prev) => prev.map((s) => s.name === name ? { ...s, status: "VERIFIED" } : s));
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#f7f5f2", minHeight: "100vh", display: "flex" }}>

      {/* Sidebar */}
      <div style={{ width: 220, background: "#1a0a0a", minHeight: "100vh", padding: "32px 0", position: "fixed", left: 0, top: 0 }}>
        <div style={{ padding: "0 24px 28px", borderBottom: "1px solid #3d1515" }}>
          <h1 style={{ color: "#faf9f7", fontSize: 20, fontWeight: 900 }}>Artis<span style={{ color: "#c9a96e" }}>an</span></h1>
          <p style={{ color: "#9b8b7e", fontSize: 11, marginTop: 4, letterSpacing: 1 }}>ADMIN PANEL</p>
        </div>
        <div style={{ marginTop: 20 }}>
          {[["overview","📊","Overview"],["sellers","🏪","Sellers"],["users","👥","Users"],["orders","📦","Orders"]].map(([id, icon, label]) => (
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
            <p style={{ fontSize: 12, letterSpacing: 2, color: "#ef4444", marginBottom: 6, textTransform: "uppercase" as const }}>Admin Access</p>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#1a1410" }}>
              {activeTab === "overview" && "Overview"}
              {activeTab === "sellers" && "Manage Sellers"}
              {activeTab === "users" && "Manage Users"}
              {activeTab === "orders" && "All Orders"}
            </h1>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ background: "transparent", border: "1.5px solid #1a1410", padding: "10px 20px", cursor: "pointer", fontSize: 13 }}>Export Data</button>
            <button style={{ background: "#ef4444", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>🔴 Admin Mode</button>
          </div>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <>
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

            {/* Pending Approvals */}
            <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28, marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>⏳ Pending Seller Approvals</h2>
              {sellerList.filter(s => s.status === "PENDING").length === 0 ? (
                <p style={{ color: "#10b981", fontWeight: 600 }}>✅ All sellers approved!</p>
              ) : (
                sellerList.filter(s => s.status === "PENDING").map((s) => (
                  <div key={s.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderBottom: "1px solid #f0ebe4" }}>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 15 }}>{s.name}</p>
                      <p style={{ color: "#9b8b7e", fontSize: 13 }}>{s.email} · Joined {s.joined}</p>
                    </div>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button onClick={() => approveSeller(s.name)}
                        style={{ background: "#10b981", color: "#fff", border: "none", padding: "8px 18px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                        ✓ Approve
                      </button>
                      <button style={{ background: "#ef4444", color: "#fff", border: "none", padding: "8px 18px", cursor: "pointer", fontSize: 13 }}>
                        ✗ Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Recent Orders */}
            <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Recent Orders</h2>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e8e3dc" }}>
                    {["Order", "Buyer", "Seller", "Amount", "Status", "Date"].map(h => (
                      <th key={h} style={{ padding: "10px 12px", textAlign: "left" as const, fontSize: 11, color: "#9b8b7e", letterSpacing: 1, textTransform: "uppercase" as const }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id} style={{ borderBottom: "1px solid #f0ebe4" }}>
                      <td style={{ padding: "14px 12px", fontSize: 13, fontWeight: 600, color: "#c9a96e" }}>{o.id}</td>
                      <td style={{ padding: "14px 12px", fontSize: 13 }}>{o.buyer}</td>
                      <td style={{ padding: "14px 12px", fontSize: 13, color: "#6b5e52" }}>{o.seller}</td>
                      <td style={{ padding: "14px 12px", fontSize: 14, fontWeight: 700 }}>${o.amount}</td>
                      <td style={{ padding: "14px 12px" }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", background: `${statusColors[o.status]}20`, color: statusColors[o.status] }}>{o.status}</span>
                      </td>
                      <td style={{ padding: "14px 12px", fontSize: 13, color: "#9b8b7e" }}>{o.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* SELLERS TAB */}
        {activeTab === "sellers" && (
          <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e8e3dc" }}>
                  {["Store", "Email", "Products", "Sales", "Status", "Joined", "Action"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left" as const, fontSize: 11, color: "#9b8b7e", letterSpacing: 1, textTransform: "uppercase" as const }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sellerList.map(s => (
                  <tr key={s.name} style={{ borderBottom: "1px solid #f0ebe4" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 700 }}>{s.name}</td>
                    <td style={{ padding: "14px 12px", fontSize: 13, color: "#6b5e52" }}>{s.email}</td>
                    <td style={{ padding: "14px 12px", fontSize: 13 }}>{s.products}</td>
                    <td style={{ padding: "14px 12px", fontWeight: 700 }}>{s.sales}</td>
                    <td style={{ padding: "14px 12px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px",
                        background: s.status === "VERIFIED" ? "#d1fae5" : "#fef3c7",
                        color: s.status === "VERIFIED" ? "#065f46" : "#92400e" }}>{s.status}</span>
                    </td>
                    <td style={{ padding: "14px 12px", fontSize: 13, color: "#9b8b7e" }}>{s.joined}</td>
                    <td style={{ padding: "14px 12px" }}>
                      {s.status === "PENDING" ? (
                        <button onClick={() => approveSeller(s.name)}
                          style={{ background: "#10b981", color: "#fff", border: "none", padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>Approve</button>
                      ) : (
                        <button style={{ background: "transparent", border: "1px solid #e8e3dc", padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>View</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div style={{ background: "#fff", border: "1px solid #e8e3dc", padding: 28 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #e8e3dc" }}>
                  {["Name", "Email", "Role", "Orders", "Joined", "Action"].map(h => (
                    <th key={h} style={{ padding: "10px 12px", textAlign: "left" as const, fontSize: 11, color: "#9b8b7e", letterSpacing: 1, textTransform: "uppercase" as const }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.email} style={{ borderBottom: "1px solid #f0ebe4" }}>
                    <td style={{ padding: "14px 12px", fontWeight: 600 }}>{u.name}</td>
                    <td style={{ padding: "14px 12px", fontSize: 13, color: "#6b5e52" }}>{u.email}</td>
                    <td style={{ padding: "14px 12px" }}>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", background: `${roleColors[u.role]}20`, color: roleColors[u.role] }}>{u.role}</span>
                    </td>
                    <td style={{ padding: "14px 12px", fontSize: 13 }}>{u.orders}</td>
                    <td style={{ padding: "14px 12px", fontSize: 13, color: "#9b8b7e" }}>{u.joined}</td>
                    <td style={{ padding: "14px 12px" }}>
                      <button style={{ background: "transparent", border: "1px solid #e8e3dc", padding: "6px 14px", cursor: "pointer", fontSize: 12, marginRight: 8 }}>View</button>
                      <button style={{ background: "#ef4444", color: "#fff", border: "none", padding: "6px 14px", cursor: "pointer", fontSize: 12 }}>Ban</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}