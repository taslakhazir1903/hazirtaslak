import jsPDF from "jspdf";

export default function Kira() {
  const form = {
    kirayaVeren: "Ali Veli",
    kiraci: "Mehmet Can",
    adres: "Atatürk Mah. No:5",
    tarih: "08.06.2025",
    bedel: "10.000 TL"
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Kira Sözleşmesi", 20, 20);
    doc.text(`Kiraya Veren: ${form.kirayaVeren}`, 20, 40);
    doc.text(`Kiracı: ${form.kiraci}`, 20, 50);
    doc.text(`Adres: ${form.adres}`, 20, 60);
    doc.text(`Tarih: ${form.tarih}`, 20, 70);
    doc.text(`Aylık Kira Bedeli: ${form.bedel}`, 20, 80);
    doc.save("kira-sozlesmesi.pdf");
  };

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif" }}>
      <h2>Kira Sözleşmesi</h2>
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
