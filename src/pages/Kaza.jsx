import { useState } from "react";
import jsPDF from "jspdf";

export default function Kaza() {
  const [form, setForm] = useState({
    tarih: "",
    yer: "",
    taraf1: "",
    taraf2: "",
    aciklama: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.setFontSize(12);
    doc.text("KAZA TESPİT TUTANAĞI", 80, 20);
    doc.text(`Tarih: ${form.tarih}`, 20, 40);
    doc.text(`Yer: ${form.yer}`, 20, 50);
    doc.text(`Taraf 1: ${form.taraf1}`, 20, 60);
    doc.text(`Taraf 2: ${form.taraf2}`, 20, 70);
    doc.text("Olay Açıklaması:", 20, 90);
    doc.text(form.aciklama, 20, 100);

    doc.save("kaza-tespit.pdf");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Kaza Tespit Tutanağı</h2>
      <input name="tarih" placeholder="Tarih" onChange={handleChange} />
      <input name="yer" placeholder="Yer" onChange={handleChange} />
      <input name="taraf1" placeholder="Taraf 1 Bilgileri" onChange={handleChange} />
      <input name="taraf2" placeholder="Taraf 2 Bilgileri" onChange={handleChange} />
      <textarea name="aciklama" placeholder="Olay Açıklaması" onChange={handleChange} />
      <button onClick={handlePDF}>PDF Olarak İndir</button>
    </div>
  );
}
