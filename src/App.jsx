import { useState } from 'react'; import jsPDF from 'jspdf';

// Roboto fontunun gömülü base64 hali (kısaltıldı, yer kazanmak için kısa gösteriliyor) const robotoBase64 = "AAEAAAASAQAABAAgR0RFRrRCsIIAAjWsAAACYkdQT1...";

export default function App() { const [form, setForm] = useState({ adSoyad: '', pozisyon: '', sirket: '', istifaTarihi: '', sonGun: '', sebep: '', });

const handleChange = (e) => { const { name, value } = e.target; setForm((prev) => ({ ...prev, [name]: value })); };

const createPDF = () => { const doc = new jsPDF(); doc.addFileToVFS('Roboto-Regular.ttf', robotoBase64); doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal'); doc.setFont('Roboto'); doc.setFontSize(12);

const margin = 20;
let y = margin;

doc.text(`${form.sirket} İnsan Kaynakları Departmanına`, margin, y);
y += 10;

const metin = `${form.istifaTarihi} tarihinde, ${form.pozisyon} pozisyonunda görev yaptığım ${form.sirket} şirketindeki görevimden, ${form.sonGun} tarihi itibarıyla istifa ediyorum.`;
const metinSatirlar = doc.splitTextToSize(metin, 170);
doc.text(metinSatirlar, margin, y);
y += metinSatirlar.length * 8 + 10;

if (form.sebep) {
  doc.text('İstifa Sebebi:', margin, y);
  y += 8;
  const satirlar = doc.splitTextToSize(form.sebep, 170);
  doc.text(satirlar, margin, y);
  y += satirlar.length * 8 + 10;
}

doc.text("Gereğinin yapılmasını arz ederim.", margin, 250);
doc.text(form.adSoyad, 180, 270, { align: 'right' });
doc.text(form.sonGun, 180, 280, { align: 'right' });

doc.save('istifa-dilekcesi.pdf');

};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4"> <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6"> <h1 className="text-3xl font-bold text-center text-gray-800">İstifa Dilekçesi Oluştur</h1>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Adınız Soyadınız</label>
        <input name="adSoyad" onChange={handleChange} value={form.adSoyad} className="border border-gray-300 rounded-lg p-3" />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Pozisyon</label>
        <input name="pozisyon" onChange={handleChange} value={form.pozisyon} className="border border-gray-300 rounded-lg p-3" />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">Şirket Adı</label>
        <input name="sirket" onChange={handleChange} value={form.sirket} className="border border-gray-300 rounded-lg p-3" />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">İstifa Tarihi</label>
        <input type="date" name="istifaTarihi" onChange={handleChange} value={form.istifaTarihi} className="border border-gray-300 rounded-lg p-3" />
      </div>
      <div className="flex flex-col">
        <label className="mb-1 text-sm font-medium text-gray-700">İşten Ayrılış Tarihi</label>
        <input type="date" name="sonGun" onChange={handleChange} value={form.sonGun} className="border border-gray-300 rounded-lg p-3" />
      </div>
    </div>

    <div className="flex flex-col">
      <label className="mb-1 text-sm font-medium text-gray-700">İstifa Sebebi (isteğe bağlı)</label>
      <textarea name="sebep" onChange={handleChange} value={form.sebep} rows={6} className="border border-gray-300 rounded-lg p-3" />
    </div>

    <button onClick={createPDF} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700">
      PDF Olarak İndir
    </button>
  </div>
</div>

); }

