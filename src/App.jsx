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
    kiraBedeli: '',
    adSoyad: '',
    tc: '',
    adresDilekce: '',
    baslik: '',
    metin: '',
    tarih: ''
  });

  const [seciliBelge, setSeciliBelge] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const normalizeText = (text) => {
    return text
      .replace(/ş/g, 's').replace(/Ş/g, 'S')
      .replace(/ğ/g, 'g').replace(/Ğ/g, 'G')
      .replace(/ü/g, 'u').replace(/Ü/g, 'U')
      .replace(/ö/g, 'o').replace(/Ö/g, 'O')
      .replace(/ç/g, 'c').replace(/Ç/g, 'C')
      .replace(/ı/g, 'i').replace(/İ/g, 'I');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.setFontSize(12);

    if (seciliBelge === 'kira') {
      doc.text('KIRA SOZLESMESI', 20, 20);
      doc.text(`Kiraya Veren: ${normalizeText(form.kirayaVeren)}`, 20, 40);
      doc.text(`Kiraci: ${normalizeText(form.kiraci)}`, 20, 50);
      doc.text(`TC Kimlik No: ${form.tcNo}`, 20, 60);
      doc.text(`Kiralanan Yer: ${normalizeText(form.adres)}`, 20, 70);
      doc.text(`Baslangic Tarihi: ${form.baslangic}`, 20, 80);
      doc.text(`Bitis Tarihi: ${form.bitis}`, 20, 90);
      doc.text(`Aylik Kira Bedeli: ${form.kiraBedeli} ₺`, 20, 100);
      doc.save('kira_sozlesmesi.pdf');
    } else if (seciliBelge === 'dilekce') {
      doc.text(`Konu: ${normalizeText(form.baslik)}`, 20, 20);
      doc.text(normalizeText(form.metin), 20, 40);
      doc.text("\nGeregini arz ederim.", 20, 80);
      doc.text(`Ad Soyad: ${normalizeText(form.adSoyad)}`, 20, 100);
      doc.text(`TC: ${form.tc}`, 20, 110);
      doc.text(`Adres: ${normalizeText(form.adresDilekce)}`, 20, 120);
      doc.text(`Tarih: ${form.tarih}`, 20, 130);
      doc.save("dilekce.pdf");
    }
  };

  const renderForm = () => {
    if (seciliBelge === 'kira') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input type="text" name="kirayaVeren" placeholder="Kiraya Veren Ad Soyad" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="kiraci" placeholder="Kiraci Ad Soyad" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="number" name="tcNo" placeholder="TC Kimlik No" onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea name="adres" placeholder="Kiralanan Yer Adresi" onChange={handleChange} className="w-full border p-2 rounded" />
          <div className="flex gap-4">
            <input type="date" name="baslangic" onChange={handleChange} className="w-full border p-2 rounded" />
            <input type="date" name="bitis" onChange={handleChange} className="w-full border p-2 rounded" />
          </div>
          <input type="number" name="kiraBedeli" placeholder="Aylik Kira Bedeli (₺)" onChange={handleChange} className="w-full border p-2 rounded" />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">PDF Olustur</button>
        </form>
      );
    } else if (seciliBelge === 'dilekce') {
      return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input type="text" name="adSoyad" placeholder="Ad Soyad" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="number" name="tc" placeholder="TC Kimlik No" onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea name="adresDilekce" placeholder="Adres" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="baslik" placeholder="Dilekçe Başlığı (Konu)" onChange={handleChange} className="w-full border p-2 rounded" />
          <textarea name="metin" placeholder="Dilekçe Metni" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="date" name="tarih" onChange={handleChange} className="w-full border p-2 rounded" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">PDF Oluştur</button>
        </form>
      );
    } else if (seciliBelge === 'istifa') {
      return <p className="mt-4">👔 Istifa dilekçesi yakında burada olacak.</p>;
    } else if (seciliBelge === 'teklif') {
      return <p className="mt-4">📄 Teklif formu yakında burada olacak.</p>;
    } else {
      return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Hazırtaslak</h1>
      {!seciliBelge && (
        <div className="space-y-2">
          <p className="mb-2">Hangi belgeyi oluşturmak istiyorsunuz?</p>
          <button onClick={() => setSeciliBelge('kira')} className="w-full bg-gray-200 p-2 rounded">🏠 Kira Sözleşmesi</button>
          <button onClick={() => setSeciliBelge('dilekce')} className="w-full bg-gray-200 p-2 rounded">✍️ Dilekçe</button>
          <button onClick={() => setSeciliBelge('istifa')} className="w-full bg-gray-200 p-2 rounded">👔 İstifa Dilekçesi</button>
          <button onClick={() => setSeciliBelge('teklif')} className="w-full bg-gray-200 p-2 rounded">📄 Teklif Formu</button>
        </div>
      )}
      {renderForm()}
    </div>
  );
}

export default App;
