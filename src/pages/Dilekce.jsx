import jsPDF from "jspdf";

export default function Dilekce() {
  const form = {
    adSoyad: "Ahmet Yılmaz",
    konu: "Bilgi talebi",
    metin: "Kurumunuzdan bilgi talep etmekteyim.",
    tarih: "08.06.2025"
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("GENEL DİLEKÇE", 20, 20);
    doc.text(`Ad Soyad: ${form.adSoyad}`, 20, 40);
    doc.text(`Konu: ${form.konu}`, 20, 50);
    doc.text(`Metin: ${form.metin}`, 20, 60);
    doc.text(`Tarih: ${form.tarih}`, 20, 80);
    doc.save("dilekce.pdf");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Genel Dilekçe</h2>
      <button onClick={generatePDF} style={btnStyle}>PDF OLUŞTUR</button>
    </div>
  );
}

const btnStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#2ecc71",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer"
};
