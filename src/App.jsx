import React, { useState } from 'react';
import jsPDF from 'jspdf';

function App() {
  const [form, setForm] = useState({
    kirayaVeren: '',
    kiraci: '',
    tcNo: '',
    adres: '',
    baslangic: '',
    bitis: '',
    kiraBedeli: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("KİRA SÖZLEŞMESİ", 20, 20);
    doc.text(`Kiraya Veren: ${form.kirayaVeren}`, 20, 40);
    doc.text(`Kiracı: ${form.kiraci}`, 20, 50);
    doc.text(`TC Kimlik No: ${form.tcNo}`, 20, 60);
    doc.text(`Kiralanan Yer: ${form.adres}`, 20, 70);
    doc.text(`Başlangıç Tarihi: ${form.baslangic}`, 20, 80);
    doc.text(`Bitiş Tarihi: ${form.bitis}`, 20, 90);
    doc.text(`Aylık Kira Bedeli: ${form.kiraBedeli} ₺`, 20, 100);
    doc.save("kira_sozlesmesi.pdf");
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Kira Kontratı Formu</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="kirayaVeren" placeholder="Kiraya Veren Ad Soyad" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="text" name="kiraci" placeholder="Kiracı Ad Soyad" onChange={handleChange} className="w-full border p-2 rounded" />
        <input type="number" name="tcNo" placeholder="TC Kimlik No" onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="adres" placeholder="Kiralanan Yer Adresi" onChange={handleChange} className="w-full border p-2 rounded"></textarea>
        <div className="flex gap-4">
          <input type="date" name="baslangic" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="date" name="bitis" onChange={handleChange} className="w-full border p-2 rounded" />
        </div>
        <input type="number" name="kiraBedeli" placeholder="Aylık Kira Bedeli (₺)" onChange={handleChange} className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">PDF Oluştur</button>
      </form>
    </div>
  );
}

export default App;
