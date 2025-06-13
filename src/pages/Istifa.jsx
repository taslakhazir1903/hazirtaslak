import { useState } from "react";
import jsPDF from "jspdf";

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
    doc.addFont("/fonts/Roboto-Regular.ttf", "Roboto", "normal");
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
    <div style={{ padding: "40px" }}>
      <h2>İstifa Dilekçesi</h2>
      <input name="adSoyad" placeholder="Ad Soyad" onChange={handleChange} />
      <input name="pozisyon" placeholder="Pozisyon" onChange={handleChange} />
      <input name="sirket" placeholder="Şirket Adı" onChange={handleChange} />
      <input name="istifaTarihi" placeholder="İşe Başlama Tarihi" onChange={handleChange} />
      <input name="sonGun" placeholder="Son Çalışma Günü" onChange={handleChange} />
      <textarea name="sebep" placeholder="İstifa Sebebi (İsteğe bağlı)" onChange={handleChange} />
      <button onClick={handlePDF}>PDF Olarak İndir</button>
    </div>
  );
}
