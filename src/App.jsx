import React, { useState } from 'react'; import jsPDF from 'jspdf'; import autoTable from 'jspdf-autotable';

function App() { const [form, setForm] = useState({ adSoyad: '', tc: '', kurum: '', departman: '', tarih: '', sebep: '' });

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => { e.preventDefault(); const doc = new jsPDF();

doc.setFontSize(16);
doc.text('ISTIFA DILEKCESI', 105, 20, { align: 'center' });

autoTable(doc, {
  startY: 30,
  head: [['Alan', 'Bilgi']],
  body: [
    ['Ad Soyad', form.adSoyad],
    ['TC Kimlik No', form.tc],
    ['Kurum / Şirket', form.kurum],
    ['Departman / Görev', form.departman],
    ['Tarih', form.tarih]
  ],
  styles: { fontSize: 12, cellPadding: 4 },
  margin: { left: 15, right: 15 },
});

doc.setFontSize(12);
const startY = 90;
const metin = `${form.adSoyad} olarak, ${form.kurum} bünyesindeki ${form.departman} görevimden kendi isteğimle ${form.tarih} tarihi itibariyle istifa ediyorum.`;
const sebepMetni = form.sebep ? `\n\nİstifa sebebim: ${form.sebep}` : '';

doc.text(metin + sebepMetni + '\n\nGereğini arz ederim.', 20, startY, { maxWidth: 170 });

doc.text(form.adSoyad, 150, 250);
doc.text('(İmza)', 160, 260);

doc.save('istifa_dilekcesi.pdf');

};

return ( <div className="max-w-2xl mx-auto p-6 text-sm"> <h1 className="text-2xl font-bold text-center mb-6">Hazırtaslak – İstifa Dilekçesi</h1> <form onSubmit={handleSubmit} className="space-y-6">

{/* Kişisel Bilgiler */}
    <div className="border rounded shadow-sm p-4">
      <h2 className="font-semibold mb-3 text-lg">Kişisel Bilgiler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="adSoyad" placeholder="Ad Soyad" onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="tc" placeholder="TC Kimlik No" onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
    </div>

    {/* Kurumsal Bilgiler */}
    <div className="border rounded shadow-sm p-4">
      <h2 className="font-semibold mb-3 text-lg">Kurumsal Bilgiler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="kurum" placeholder="Kurum / Şirket Adı" onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="departman" placeholder="Departman / Görev" onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
    </div>

    {/* Dilekçe Bölümü */}
    <div className="border rounded shadow-sm p-4">
      <h2 className="font-semibold mb-3 text-lg">Dilekçe Detayları</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="tarih" type="date" placeholder="Tarih" onChange={handleChange} className="border p-2 rounded w-full" />
      </div>
      <textarea name="sebep" placeholder="İstifa sebebiniz (isteğe bağlı)" onChange={handleChange} rows={4} className="border p-2 rounded w-full mt-4" />
    </div>

    <button className="w-full bg-green-600 text-white px-4 py-2 rounded">PDF Oluştur</button>
  </form>
</div>

); }

export default App;

