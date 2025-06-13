import { useState } from "react";
import jsPDF from "jspdf";

export default function Istifa() {
  const [form, setForm] = useState({
    adSoyad: "",
    kurum: "",
    sebep: "",
    tarih: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`${form.kurum} Müdürlüğü'ne`, 20, 30);
    doc.text("KONU: İstifa Dilekçesi", 20, 40);

    const metin = `${form.adSoyad} olarak ${form.kurum} kurumunda görev yapmaktayım. ${form.sebep} nedeniyle istifa etmek istiyorum. Gereğinin yapılmasını arz ederim.`;

    const satirlar = doc.splitTextToSize(metin, 170);
    doc.text(satirlar, 20, 60);

    doc.text(`Tarih: ${form.tarih}`, 140, 250);
    doc.text("İmza: ....................", 140, 260);

    doc.save("istifa-dilekcesi.pdf");
  };

  return (
    <div style={containerStyle}>
      <h2>İstifa Dilekçesi Oluştur</h2>

      <div style={gridStyle}>
        <label>Ad Soyad:</label>
        <input name="adSoyad" value={form.adSoyad} onChange={handleChange} />

        <label>Çalıştığınız Kurum:</label>
        <input name="kurum" value={form.kurum} onChange={handleChange} />

        <label>Tarih:</label>
        <input name="tarih" value={form.tarih} onChange={handleChange} />
      </div>

      <label style={{ marginTop: "20px" }}>İstifa Sebebiniz:</label>
      <textarea
        name="sebep"
        value={form.sebep}
        onChange={handleChange}
        rows={5}
        style={{ width: "100%", padding: "10px", marginTop: "5px", fontSize: "14px" }}
        placeholder="Örn: kişisel nedenlerle, iş değişikliği nedeniyle vb."
      />

      <button onClick={generatePDF} style={buttonStyle}>PDF OLUŞTUR</button>
    </div>
  );
}

const containerStyle = {
  padding: "40px",
  fontFamily: "sans-serif",
  maxWidth: "800px",
  margin: "0 auto"
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 2fr",
  gap: "10px",
  marginTop: "20px"
};

const buttonStyle = {
  marginTop: "30px",
  padding: "12px 24px",
  backgroundColor: "#2ecc71",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer"
};
