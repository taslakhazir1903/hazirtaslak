import { useState } from "react";
import jsPDF from "jspdf";

export default function Dilekce() {
  const [form, setForm] = useState({
    il: "",
    kurum: "",
    konu: "",
    metin: "",
    tarih: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`${form.il.toUpperCase()} ${form.kurum.toUpperCase()}’NA`, 105, 30, { align: "center" });
    doc.text(`KONU: ${form.konu}`, 20, 45);

    const satirlar = doc.splitTextToSize(form.metin, 170);
    doc.text(satirlar, 20, 65);

    doc.text(`Tarih: ${form.tarih}`, 140, 250);
    doc.text("İmza: ....................", 140, 260);

    doc.save("genel-dilekce.pdf");
  };

  return (
    <div style={containerStyle}>
      <h2>Genel Dilekçe Oluştur</h2>

      <div style={gridStyle}>
        <label>İl:</label>
        <input name="il" value={form.il} onChange={handleChange} />

        <label>Kurum:</label>
        <input name="kurum" value={form.kurum} onChange={handleChange} />

        <label>Konu:</label>
        <input name="konu" value={form.konu} onChange={handleChange} />

        <label>Tarih:</label>
        <input name="tarih" value={form.tarih} onChange={handleChange} />
      </div>

      <label style={{ marginTop: "20px" }}>Dilekçe Metni:</label>
      <textarea
        name="metin"
        value={form.metin}
        onChange={handleChange}
        rows={6}
        style={{ width: "100%", padding: "10px", marginTop: "5px", fontSize: "14px" }}
        placeholder="Lütfen dilekçe metninizi buraya yazınız..."
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
