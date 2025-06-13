import { useState } from "react";
import jsPDF from "jspdf";

export default function Dilekce() {
  const [form, setForm] = useState({
    kurum: "",
    konu: "",
    metin: "",
    adSoyad: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
    doc.setFontSize(12);

    doc.text(`${form.kurum}’a`, 20, 20);
    doc.text(`Konu: ${form.konu}`, 20, 30);
    doc.text(form.metin, 20, 50);
    doc.text("Gereğinin yapılmasını arz ederim.", 20, 100);
    doc.text(form.adSoyad, 150, 120);

    doc.save("dilekce.pdf");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Genel Dilekçe</h2>
      <input name="kurum" placeholder="Kurum Adı" onChange={handleChange} />
      <input name="konu" placeholder="Konu" onChange={handleChange} />
      <textarea name="metin" placeholder="Dilekçe Metni" onChange={handleChange} />
      <input name="adSoyad" placeholder="Ad Soyad" onChange={handleChange} />
      <button onClick={handlePDF}>PDF Olarak İndir</button>
    </div>
  );
}
