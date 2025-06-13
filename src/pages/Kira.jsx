import { useState } from "react";
import jsPDF from "jspdf";

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVeren: "",
    kiraci: "",
    kiralananYer: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    kiraBedeli: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
    doc.setFontSize(12);

    doc.text("KİRA SÖZLEŞMESİ", 90, 20);
    doc.text(`Kiraya Veren: ${form.kirayaVeren}`, 20, 40);
    doc.text(`Kiracı: ${form.kiraci}`, 20, 50);
    doc.text(`Kiralanan Yer: ${form.kiralananYer}`, 20, 60);
    doc.text(`Başlangıç Tarihi: ${form.baslangicTarihi}`, 20, 70);
    doc.text(`Bitiş Tarihi: ${form.bitisTarihi}`, 20, 80);
    doc.text(`Aylık Kira Bedeli: ${form.kiraBedeli}`, 20, 90);

    doc.save("kira-sozlesmesi.pdf");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Kira Sözleşmesi</h2>
      <input name="kirayaVeren" placeholder="Kiraya Veren" onChange={handleChange} />
      <input name="kiraci" placeholder="Kiracı" onChange={handleChange} />
      <input name="kiralananYer" placeholder="Kiralanan Yer" onChange={handleChange} />
      <input name="baslangicTarihi" placeholder="Başlangıç Tarihi" onChange={handleChange} />
      <input name="bitisTarihi" placeholder="Bitiş Tarihi" onChange={handleChange} />
      <input name="kiraBedeli" placeholder="Aylık Kira Bedeli" onChange={handleChange} />
      <button onClick={handlePDF}>PDF Olarak İndir</button>
    </div>
  );
}
