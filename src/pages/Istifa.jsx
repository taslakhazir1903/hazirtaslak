import jsPDF from "jspdf";

export default function Istifa() {
  const form = {
    adSoyad: "Zeynep Kılıç",
    sebep: "Kişisel nedenler",
    tarih: "08.06.2025"
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("İSTİFA DİLEKÇESİ", 20, 20);
    doc.text(`${form.adSoyad} olarak`, 20, 40);
    doc.text(`${form.sebep} nedeniyle istifa ediyorum.`, 20, 50);
    doc.text("Gereğini arz ederim.", 20, 70);
    doc.text(`Tarih: ${form.tarih}`, 20, 90);
    doc.text("İmza: .....................", 20, 100);
    doc.save("istifa.pdf");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>İstifa Dilekçesi</h2>
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
