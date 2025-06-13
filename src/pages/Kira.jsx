import { useState } from "react";
import jsPDF from "jspdf";

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVeren: "",
    kirayaVerenTC: "",
    kiraci: "",
    kiraciTC: "",
    adres: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    bedel: "",
    depozito: "",
    ozelKosullar: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("KİRA SÖZLEŞMESİ", 80, 20);

    doc.text(`Kiraya Veren: ${form.kirayaVeren}`, 20, 40);
    doc.text(`TC Kimlik No: ${form.kirayaVerenTC}`, 20, 50);

    doc.text(`Kiracı: ${form.kiraci}`, 20, 60);
    doc.text(`TC Kimlik No: ${form.kiraciTC}`, 20, 70);

    doc.text(`Kiralanan Adres: ${form.adres}`, 20, 80);

    doc.text(`Başlangıç Tarihi: ${form.baslangicTarihi}`, 20, 90);
    doc.text(`Bitiş Tarihi: ${form.bitisTarihi}`, 20, 100);

    doc.text(`Aylık Kira Bedeli: ${form.bedel}`, 20, 110);
    doc.text(`Depozito: ${form.depozito}`, 20, 120);

    doc.addPage();
    doc.text("GENEL KOŞULLAR", 80, 20);
    for (let i = 1; i <= 12; i++) {
      doc.text(`${i}. .........................................................`, 20, 30 + i * 10);
    }

    doc.addPage();
    doc.text("ÖZEL KOŞULLAR", 80, 20);
    doc.text(form.ozelKosullar || "......................................................", 20, 40);

    doc.text("Kiraya Veren İmza: ......................", 20, 240);
    doc.text("Kiracı İmza: ......................", 120, 240);

    doc.save("kira-sozlesmesi.pdf");
  };

  return (
    <div style={containerStyle}>
      <h2>Kira Sözleşmesi Oluştur</h2>

      <div style={gridStyle}>
        <label>Kiraya Veren:</label>
        <input name="kirayaVeren" value={form.kirayaVeren} onChange={handleChange} />

        <label>TC Kimlik No:</label>
        <input name="kirayaVerenTC" value={form.kirayaVerenTC} onChange={handleChange} />

        <label>Kiracı:</label>
        <input name="kiraci" value={form.kiraci} onChange={handleChange} />

        <label>TC Kimlik No:</label>
        <input name="kiraciTC" value={form.kiraciTC} onChange={handleChange} />

        <label>Kiralanan Adres:</label>
        <input name="adres" value={form.adres} onChange={handleChange} />

        <label>Başlangıç Tarihi:</label>
        <input name="baslangicTarihi" value={form.baslangicTarihi} onChange={handleChange} />

        <label>Bitiş Tarihi:</label>
        <input name="bitisTarihi" value={form.bitisTarihi} onChange={handleChange} />

        <label>Aylık Kira Bedeli:</label>
        <input name="bedel" value={form.bedel} onChange={handleChange} />

        <label>Depozito:</label>
        <input name="depozito" value={form.depozito} onChange={handleChange} />
      </div>

      <label style={{ marginTop: "20px" }}>Özel Koşullar:</label>
      <textarea
        name="ozelKosullar"
        value={form.ozelKosullar}
        onChange={handleChange}
        rows={4}
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
