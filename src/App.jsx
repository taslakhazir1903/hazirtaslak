import { useState } from "react";
import jsPDF from "jspdf";

const robotoBase64 = "AAEAAAASAQAABAAgR0RFRrRCsIIAAjWsAAACYkdQT1...";

export default function App() {
  const [form, setForm] = useState({
    adSoyad: "",
    pozisyon: "",
    sirket: "",
    istifaTarihi: "",
    sonGun: "",
    sebep: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
    doc.setFontSize(12);

    let y = 20;
    doc.text(`${form.sirket} İnsan Kaynakları Departmanına`, 20, y); y += 10;
    doc.text(`Pozisyon: ${form.pozisyon}`, 20, y); y += 10;
    doc.text(`Ad Soyad: ${form.adSoyad}`, 20, y); y += 10;
    doc.text(`İstifa Tarihi: ${form.istifaTarihi}`, 20, y); y += 10;
    doc.text(`Son Çalışma Günü: ${form.sonGun}`, 20, y); y += 10;

    if (form.sebep) {
      const lines = doc.splitTextToSize("İstifa Sebebi: " + form.sebep, 170);
      doc.text(lines, 20, y); y += lines.length * 8;
    }

    doc.text("Gereğinin yapılmasını arz ederim.", 20, y + 20);
    doc.text(form.adSoyad, 180, 270, { align: "right" });
    doc.save("istifa-dilekcesi.pdf");
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    fontSize: "14px",
    borderRadius: "8px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer"
  };

  return (
    <div style={ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "sans-serif" }>
      <h2 style={ textAlign: "center", marginBottom: "20px" }>İstifa Dilekçesi</h2>
      <input name="adSoyad" placeholder="Ad Soyad" value={form.adSoyad} onChange={handleChange} style={...inputStyle} />
      <input name="pozisyon" placeholder="Pozisyon" value={form.pozisyon} onChange={handleChange} style={...inputStyle} />
      <input name="sirket" placeholder="Şirket Adı" value={form.sirket} onChange={handleChange} style={...inputStyle} />
      <input type="date" name="istifaTarihi" value={form.istifaTarihi} onChange={handleChange} style={...inputStyle} />
      <input type="date" name="sonGun" value={form.sonGun} onChange={handleChange} style={...inputStyle} />
      <textarea name="sebep" placeholder="İstifa Sebebi (isteğe bağlı)" value={form.sebep} onChange={handleChange} style={ ...inputStyle, height: "100px" } />
      <button onClick={handlePDF} style={...buttonStyle}>📄 PDF Olarak İndir</button>
    </div>
  );
}
