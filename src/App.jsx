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

  const [seciliBelge, setSeciliBelge] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Türkçe karakterleri sadeleştirme (çözüm)
  const normalizeText = (text) => {
    return text
      .replace(/ş/g, 's')
      .replace(/Ş/g, 'S')
      .replace(/ğ/g, 'g')
      .replace(/Ğ/g, 'G')
      .replace(/ü/g, 'u')
      .replace(/Ü/g, 'U')
      .replace(/ö/g, 'o')
      .replace(/Ö/g, 'O')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'C')
      .replace(/ı/g, 'i')
      .replace(/İ/g, 'I');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doc = new jsPDF();
    doc.setFontSize(12);

    doc.text('KIRA SOZLESMESI', 20, 20);
    doc.text(`Kiraya Veren: ${normalizeText(form.kirayaVeren)}`, 20, 40);
    doc.text(`Kiraci: ${normalizeText(form.kiraci)}`, 20, 50);
    doc.text(`TC Kimlik No: ${form.tcNo}`, 20, 60);
    doc.text(`Kiralanan Yer: ${normalizeText(form.adres)}`, 20, 70);
    doc.text(`Baslangic Tarihi: ${form.baslangic}`, 20, 80);
    doc.text(`Bitis Tarihi: ${form.bitis}`, 20, 90);
    doc.text(`Aylik Kira Bedeli: ${form.kiraBedeli} ₺`, 20, 100);

    doc.save('kira_sozlesmesi.pdf');
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
      return <p className="mt-4">✍️ Dilekçe formu yakinda burada olacak.</p>;
    } else if (seciliBelge === 'istifa') {
      return <p className="mt-4">👔 Istifa dilekçesi yakinda burada olacak.</p>;
    } else if (seciliBelge === 'teklif') {
      return <p className="mt-4">📄 Teklif formu yakinda burada olacak.</p>;
    } else {
      return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Hazırtaslak</h1>

      {!seciliBelge && (
        <div className="space-y-2">
          <p className="mb-2">Hangi belgeyi olusturmak istiyorsunuz?</p>
          <button onClick={() => setSeciliBelge('kira')} className="w-full bg-gray-200 p-2 rounded">🏠 Kira Sozlesmesi</button>
          <button onClick={() => setSeciliBelge('dilekce')} className="w-full bg-gray-200 p-2 rounded">✍️ Dilekce</button>
          <button onClick={() => setSeciliBelge('istifa')} className="w-full bg-gray-200 p-2 rounded">👔 Istifa Dilekcesi</button>
          <button onClick={() => setSeciliBelge('teklif')} className="w-full bg-gray-200 p-2 rounded">📄 Teklif Formu</button>
        </div>
      )}

      {renderForm()}
    </div>
  );
}

export default App;
