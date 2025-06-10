import React, { useState } from 'react';
import jsPDF from 'jspdf';

function App() {
  const [form, setForm] = useState({
    adSoyad: '',
    tc: '',
    kurum: '',
    departman: '',
    tarih: '',
    sebep: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = new jsPDF();

    const fontBase64 = 'AAEAAAARAQAABAAQRFNJRwAAAAEAAfT/...'; // Gerçek font çok uzundu, seni uğraştırmamak için bu halini vereceğim

    doc.addFileToVFS('Roboto-Regular.ttf', fontBase64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    doc.setFontSize(16);
    doc.text('İSTİFA DİLEKÇESİ', 105, 30, { align: 'center' });

    doc.setFontSize(12);
    const giris = `${form.adSoyad} olarak, ${form.kurum} bünyesindeki ${form.departman} görevimden kendi isteğimle istifa ediyorum.`;
    const sebep = form.sebep ? `\n\nİstifa sebebim: ${form.sebep}` : '';
    const kapanis = '\n\nGereğinin yapılmasını arz ederim.';
    const metin = giris + sebep + kapanis;

    const yStart = 50;
    const lines = doc.splitTextToSize(metin, 170);
    lines.forEach((line, i) => {
      doc.text(line, 20, yStart + i * 8);
    });

    doc.text(`Ad Soyad: ${form.adSoyad}`, 140, 260);
    doc.text('İmza: ..........................', 140, 270);
    doc.text(`Tarih: ${form.tarih}`, 140, 280);

    doc.save('istifa_dilekcesi.pdf');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-sm">
      <h1 className="text-2xl font-bold text-center mb-6">Hazırtaslak – İstifa Dilekçesi</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="adSoyad" placeholder="Ad Soyad" onChange={handleChange} className="border p-2 rounded w-full" />
          <input name="tc" placeholder="TC Kimlik No" onChange={handleChange} className="border p-2 rounded w-full" />
          <input name="kurum" placeholder="Kurum / Şirket Adı" onChange={handleChange} className="border p-2 rounded w-full" />
          <input name="departman" placeholder="Departman / Görev" onChange={handleChange} className="border p-2 rounded w-full" />
          <input name="tarih" type="date" onChange={handleChange} className="border p-2 rounded w-full" />
        </div>
        <textarea name="sebep" placeholder="İstifa sebebiniz (isteğe bağlı)" onChange={handleChange} rows={8} className="border p-2 rounded w-full" />
        <button className="w-full bg-green-600 text-white px-4 py-2 rounded">PDF Oluştur</button>
      </form>
    </div>
  );
}

export default App;
