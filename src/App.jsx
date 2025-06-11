import React, { useState } from "react";
import jsPDF from "jspdf";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    position: "",
    company: "",
    resignationDate: "",
    lastWorkingDay: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    doc.setFont("Roboto", "normal");
    doc.setFontSize(12);

    const text = `
${formData.company} İnsan Kaynakları Departmanına,

Aşağıda bilgileri yer alan ${formData.position} pozisyonundaki görevimden, ${formData.resignationDate} tarihinde istifa etmek istediğimi bildiririm. 
${formData.lastWorkingDay} tarihi itibarıyla görevimden ayrılacağım.

${formData.reason ? `İstifa Sebebi: ${formData.reason}` : ""}

Gereğinin yapılmasını arz ederim.

${new Date().toLocaleDateString("tr-TR")}

Ad Soyad: ${formData.fullName}
İmza:
    `.trim();

    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 15, 20);
    doc.save("istifa-dilekcesi.pdf");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", fontFamily: "Roboto, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>İstifa Dilekçesi</h2>

      <label>Adınız Soyadınız</label>
      <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />

      <label>Pozisyonunuz</label>
      <input type="text" name="position" value={formData.position} onChange={handleChange} />

      <label>Şirket Adı</label>
      <input type="text" name="company" value={formData.company} onChange={handleChange} />

      <label>İstifa Tarihi</label>
      <input type="date" name="resignationDate" value={formData.resignationDate} onChange={handleChange} />

      <label>Son Çalışma Günü</label>
      <input type="date" name="lastWorkingDay" value={formData.lastWorkingDay} onChange={handleChange} />

      <label>İstifa Sebebi (isteğe bağlı)</label>
      <textarea name="reason" value={formData.reason} onChange={handleChange} rows={5} />

      <button
        onClick={handleGeneratePDF}
        style={{
          backgroundColor: "#2ecc71",
          color: "#fff",
          padding: "10px",
          border: "none",
          marginTop: "20px",
          width: "100%",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        📄 İstifa Dilekçesi Oluştur
      </button>
    </div>
  );
}

export default App;
