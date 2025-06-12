import jsPDF from "jspdf";

export default function Kaza() {
  const form = {
    taraf1: "Araba A",
    taraf2: "Araba B",
    yer: "Kadıköy",
    tarih: "08.06.2025"
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Kaza Tespit Tutanağı", 20, 20);
    doc.text(`Taraf 1: ${form.taraf1}`, 20, 40);
    doc.text(`Taraf 2: ${form.taraf2}`, 20, 50);
    doc.text(`Yer: ${form.yer}`, 20, 60);
    doc.text(`Tarih: ${form.tarih}`, 20, 70);
    doc.save("kaza-tutanagi.pdf");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Kaza Tespit Tutanağı</h2>
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
