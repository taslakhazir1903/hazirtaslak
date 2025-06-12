import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Hazırtaslak Uygulaması</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
        <Link to="/kira" style={linkStyle}>🏠 Kira Sözleşmesi</Link>
        <Link to="/dilekce" style={linkStyle}>📝 Genel Dilekçe</Link>
        <Link to="/istifa" style={linkStyle}>📤 İstifa Dilekçesi</Link>
        <Link to="/kaza" style={linkStyle}>🚗 Kaza Tespit Tutanağı</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  padding: "12px 24px",
  backgroundColor: "#3498db",
  color: "white",
  borderRadius: "8px",
  textDecoration: "none",
  fontSize: "16px",
  minWidth: "220px"
};
