import { useState } from "react";
import jsPDF from "jspdf";

export default function Kaza() {
  const [form, setForm] = useState({
    surucu1: "",
    plaka1: "",
    tc1: "",
    surucu2: "",
    plaka2: "",
    tc2: "",
    tarih: "",
    yer: "",
    aciklama: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text("KAZA TESPİT TUTANAĞI", 80, 20);

    doc.text(`1. Sürücü: ${form.surucu1}`, 20, 40);
    doc.text(`Plaka: ${form.plaka1}`, 20, 50);
    doc.text(`TC: ${form.tc1}`, 20, 60);

    doc.text(`2. Sürücü: ${form.surucu2}`, 20, 80);
    doc.text(`Plaka: ${form.plaka2}`, 20, 90);
    doc.text(`TC: ${form.tc2}`, 20, 100);

    doc.text(`Kaza Yeri: ${form.yer}`, 20, 120);
    doc.text(`Kaza Tarihi: ${form.tarih}`, 20, 130);

    const satirlar = doc.splitTextToSize(form.aciklama, 170);
    doc.text("Kaza Açıklaması:", 20, 150);
    doc.text(satirlar, 20, 160);

    doc.text("1. Sürücü İmza: ...................", 20, 270);
    doc.text("2. Sürücü İmza: ...................", 120, 270);

    doc.save("kaza-tutanagi.pdf");
  };

  return (
    <div style={containerStyle}>
      <h2>Kaza Tespit Tutanağı</h2>

      <div style={gridStyle}>
        <label>1. Sürücü Adı:</label>
        <input name="surucu1" value={form.surucu1} onChange={handleChange} />

        <label>Plaka:</label>
        <input name="plaka1" value={form.plaka1} onChange={handleChange} />

        <label>TC No:</label>
        <input name="tc1" value={form.tc1} onChange={handleChange} />

        <label>2. Sürücü Adı:</label>
        <input name="surucu2" value={form.surucu2} onChange={handleChange} />

        <label>Plaka:</label>
        <input name="plaka2" value={form.plaka2} onChange={handleChange} />

        <label>TC No:</label>
        <input name="tc2" value={form.tc2} onChange={handleChange} />

        <label>Kaza Tarihi:</label>
        <input name="tarih" value={form.tarih} onChange={handleChange} />

        <label>Kaza Yeri:</label>
        <input name="yer" value={form.yer} onChange={handleChange} />
      </div>

      <label style={{ marginTop: "20px" }}>Kaza Açıklaması:</label>
      <textarea
        name="aciklama"
        value={form.aciklama}
        onChange={handleChange}
        rows={5}
        style={{ width: "100%", padding: "10px", marginTop: "5px" }}
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
