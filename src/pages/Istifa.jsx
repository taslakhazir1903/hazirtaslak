import { useState } from "react";
import jsPDF from "jspdf";
import "../fonts/roboto"; // Roboto fontu entegre edildi

export default function Istifa() {
  const [form, setForm] = useState({
    adSoyad: "",
    pozisyon: "",
    sirket: "",
    istifaTarihi: "",
    sonGun: "",
    sebep: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.setFont("Roboto");

    doc.setFontSize(12);
    doc.text(`${form.sirket} İnsan Kaynakları Departmanına`, 20, 30);
    doc.text(
      `${form.istifaTarihi} tarihinde başladığım ${form.pozisyon} pozisyonundaki görevimden ${form.sonGun} tarihi itibariyle istifa ediyorum.`,
      20,
      50
    );
    if (form.sebep) {
      doc.text(`İstifa sebebim: ${form.sebep}`, 20, 70);
    }
    doc.text("Gereğinin yapılmasını arz ederim.", 20, 90);
    doc.text(`${form.adSoyad}`, 150, 120);

    doc.save("istifa-dilekcesi.pdf");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>İstifa Dilekçesi</h2>
      <input name="adSoyad" placeholder="Ad Soyad" value={form.adSoyad} onChange={handleChange} style={inputStyle} />
      <input name="pozisyon" placeholder="Pozisyon" value={form.pozisyon} onChange={handleChange} style={inputStyle} />
      <input name="sirket" placeholder="Şirket Adı" value={form.sirket} onChange={handleChange} style={inputStyle} />
      <input name="istifaTarihi" placeholder="İşe Başlama Tarihi" value={form.istifaTarihi} onChange={handleChange} style={inputStyle} />
      <input name="sonGun" placeholder="Son Çalışma Günü" value={form.sonGun} onChange={handleChange} style={inputStyle} />
      <textarea name="sebep" placeholder="İstifa Sebebi (İsteğe bağlı)" value={form.sebep} onChange={handleChange} style={textareaStyle} />
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

const textareaStyle = {
  ...inputStyle,
  height: "100px",
  resize: "vertical"
};

const buttonStyle = {
  padding: "12px 20px",
  backgroundColor: "#2ecc71",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
  marginTop: "10px"
};
