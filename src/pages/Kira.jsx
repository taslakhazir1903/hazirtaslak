import { useState } from "react";
import jsPDF from "jspdf";

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVeren: "",
    kiraci: "",
    adres: "",
    kiraBedeli: "",
    baslangic: "",
    bitis: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePDF = async () => {
    const doc = new jsPDF();

    const fontUrl = "/fonts/Roboto-Regular.ttf";
    const fontBytes = await fetch(fontUrl).then(res => res.arrayBuffer());
    doc.addFileToVFS("Roboto-Regular.ttf", fontBytes);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.setFontSize(12);
    doc.text("KİRA SÖZLEŞMESİ", 105, 20, null, null, "center");
    doc.text(`Kiraya Veren: ${form.kirayaVeren}`, 20, 40);
    doc.text(`Kiracı: ${form.kiraci}`, 20, 50);
    doc.text(`Adres: ${form.adres}`, 20, 60);
    doc.text(`Aylık Kira Bedeli: ${form.kiraBedeli} TL`, 20, 70);
    doc.text(`Başlangıç Tarihi: ${form.baslangic}`, 20, 80);
    doc.text(`Bitiş Tarihi: ${form.bitis}`, 20, 90);
    doc.text("Taraflar yukarıdaki bilgileri kabul eder.", 20, 110);

    doc.text("Kiraya Veren İmza", 30, 140);
    doc.text("Kiracı İmza", 150, 140);

    doc.save("kira-sozlesmesi.pdf");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Kira Sözleşmesi</h2>
      <input name="kirayaVeren" placeholder="Kiraya Veren" value={form.kirayaVeren} onChange={handleChange} style={inputStyle} />
      <input name="kiraci" placeholder="Kiracı" value={form.kiraci} onChange={handleChange} style={inputStyle} />
      <input name="adres" placeholder="Kiralanan Adres" value={form.adres} onChange={handleChange} style={inputStyle} />
      <input name="kiraBedeli" placeholder="Aylık Kira Bedeli" value={form.kiraBedeli} onChange={handleChange} style={inputStyle} />
      <input name="baslangic" placeholder="Başlangıç Tarihi" value={form.baslangic} onChange={handleChange} style={inputStyle} />
      <input name="bitis" placeholder="Bitiş Tarihi" value={form.bitis} onChange={handleChange} style={inputStyle} />
      <button onClick={handlePDF} style={buttonStyle}>PDF Olarak İndir</button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "10px",
  border: "1px solid #ccc",
  borderRadius: "6px",
  fontSize: "14px"
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px"
};
