"use client";
import { useState } from "react";

const products = [
  { id: 1, name: "Mechanical Keyboard Pro", price: 189, seller: "TechHaven", rating: 4.8, category: "Electronics", img: "⌨️" },
  { id: 2, name: "Leather Minimalist Wallet", price: 59, seller: "CraftedGoods", rating: 4.9, category: "Accessories", img: "👜" },
  { id: 3, name: "Ceramic Pour-Over Set", price: 74, seller: "BrewCraft", rating: 4.7, category: "Kitchen", img: "☕" },
  { id: 4, name: "Noise-Cancel Headphones", price: 249, seller: "SoundWave", rating: 4.6, category: "Electronics", img: "🎧" },
  { id: 5, name: "Merino Wool Throw", price: 115, seller: "Woolvine", rating: 4.9, category: "Home", img: "🧣" },
  { id: 6, name: "Portable Espresso Maker", price: 94, seller: "BrewCraft", rating: 4.5, category: "Kitchen", img: "☕" },
];

const categories = ["All", "Electronics", "Accessories", "Kitchen", "Home"];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div style={{ fontFamily: "Georgia, serif", background: "#faf9f7", minHeight: "100vh" }}>

      {/* Navbar */}
      <nav style={{ background: "#1a1410", padding: "0 40px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h1 style={{ color: "#faf9f7", fontSize: 24, fontWeight: 900 }}>
          Artis<span style={{ color: "#c9a96e" }}>an</span>
        </h1>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: "8px 16px", border: "1px solid #444", background: "#2a1f1a", color: "#fff", width: 220, outline: "none" }}
          />
          <button
            onClick={() => setCartOpen(!cartOpen)}
            style={{ background: "#c9a96e", border: "none", padding: "8px 20px", cursor: "pointer", fontWeight: 700, fontSize: 14 }}
          >
            🛒 Cart ({cartCount})
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ background: "#2a1f1a", padding: "60px 40px", textAlign: "center" }}>
        <p style={{ color: "#c9a96e", fontSize: 13, letterSpacing: 3, marginBottom: 12 }}>MULTI-VENDOR MARKETPLACE</p>
        <h2 style={{ color: "#faf9f7", fontSize: 52, fontWeight: 900, marginBottom: 16 }}>
          Discover goods worth <span style={{ color: "#c9a96e", fontStyle: "italic" }}>keeping.</span>
        </h2>
        <p style={{ color: "#9b8b7e", fontSize: 18, marginBottom: 32 }}>
          Handpicked products from 340+ independent sellers
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 48 }}>
          {[["2,400+", "Products"], ["340+", "Sellers"], ["98%", "Satisfaction"]].map(([val, label]) => (
            <div key={label}>
              <p style={{ color: "#c9a96e", fontSize: 32, fontWeight: 900 }}>{val}</p>
              <p style={{ color: "#9b8b7e", fontSize: 14 }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ background: "#fff", padding: "16px 40px", display: "flex", gap: 12, borderBottom: "1px solid #e8e3dc" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "8px 20px", border: "1.5px solid",
              borderColor: activeCategory === cat ? "#1a1410" : "#d4cbbf",
              background: activeCategory === cat ? "#1a1410" : "transparent",
              color: activeCategory === cat ? "#fff" : "#6b5e52",
              cursor: "pointer", fontWeight: 500, fontSize: 13,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{ maxWidth: 1200, margin: "40px auto", padding: "0 40px" }}>
        <h3 style={{ fontSize: 32, fontWeight: 700, marginBottom: 32 }}>
          {activeCategory === "All" ? "All Products" : activeCategory}
          <span style={{ fontSize: 16, color: "#9b8b7e", fontWeight: 400, marginLeft: 12 }}>({filtered.length} items)</span>
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {filtered.map((product) => (
            <div key={product.id} style={{ background: "#fff", border: "1px solid #e8e3dc", transition: "all 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.12)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
            >
              <div style={{ background: "#f5f0ea", height: 200, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80 }}>
                {product.img}
              </div>
              <div style={{ padding: "20px" }}>
                <p style={{ fontSize: 12, color: "#9b8b7e", marginBottom: 4 }}>by {product.seller}</p>
                <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{product.name}</h4>
                <p style={{ color: "#f59e0b", marginBottom: 16 }}>{"★".repeat(Math.floor(product.rating))} {product.rating}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 24, fontWeight: 900 }}>${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    style={{ background: "#1a1410", color: "#fff", border: "none", padding: "10px 20px", cursor: "pointer", fontWeight: 500 }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      {cartOpen && (
        <div style={{ position: "fixed", right: 0, top: 0, width: 360, height: "100vh", background: "#fff", boxShadow: "-4px 0 20px rgba(0,0,0,0.15)", zIndex: 1000, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "24px", borderBottom: "1px solid #e8e3dc", display: "flex", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 22, fontWeight: 700 }}>Cart ({cartCount})</h2>
            <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer" }}>✕</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {cart.length === 0 ? (
              <p style={{ textAlign: "center", color: "#9b8b7e", marginTop: 60 }}>Your cart is empty 🛒</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} style={{ display: "flex", gap: 14, marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid #f0ebe4" }}>
                  <div style={{ fontSize: 36 }}>{item.img}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</p>
                    <p style={{ color: "#9b8b7e", fontSize: 12 }}>Qty: {item.qty}</p>
                    <p style={{ fontWeight: 700 }}>${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div style={{ padding: "20px 24px", borderTop: "1px solid #e8e3dc" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 16 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 900 }}>${cartTotal.toFixed(2)}</span>
              </div>
              <button style={{ width: "100%", background: "#1a1410", color: "#fff", border: "none", padding: "14px", fontSize: 15, cursor: "pointer", fontWeight: 600 }}>
                CHECKOUT →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer style={{ background: "#1a1410", padding: "40px", textAlign: "center", marginTop: 60 }}>
        <h2 style={{ color: "#faf9f7", fontSize: 24, fontWeight: 900, marginBottom: 8 }}>
          Artis<span style={{ color: "#c9a96e" }}>an</span> Marketplace
        </h2>
        <p style={{ color: "#9b8b7e", fontSize: 14 }}>Built with Next.js · TypeScript · Tailwind CSS</p>
      </footer>
    </div>
  );
}