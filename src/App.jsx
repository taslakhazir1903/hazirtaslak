import { useState } from 'react'; import jsPDF from 'jspdf'; import { robotoBase64 } from './roboto';

export default function App() { const [form, setForm] = useState({ adSoyad: '', pozisyon: '', sirket: '', istifaTarihi: '', sonGun: '', sebep: '', });

const handleChange = (e) => { const { name, value } = e.target; setForm((prev) => ({ ...prev, [name]: value })); };

const createPDF = () => { const doc = new jsPDF(); doc.addFileToVFS('Roboto-Regular.ttf', robotoBase64); doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal'); doc.setFont('Roboto'); doc.setFontSize(12);

const margin = 20;
let y = margin;

doc.text(`${form.sirket} İnsan Kaynakları Departmanına`, margin, y);
y += 10;

const metin = `\n${form.istifaTarihi} tarihinde, ${form.pozisyon} pozisyonunda görev yaptığım ${form.sirket} şirketindeki görevimden, ${form.sonGun} tarihi itibarıyla istifa ediyorum.`;
doc.text(metin, margin, y);
y += 30;

if (form.sebep) {
  doc.text('İstifa Sebebi:', margin, y);
  y += 10;
  const satirlar = doc.splitTextToSize(form.sebep, 170);
  doc.text(satirlar, margin, y);
  y += satirlar.length * 8;
}

y = 270; // sayfanın en altına al
doc.text("Gereğinin yapılmasını arz ederim.", margin, y - 20);
doc.text(form.adSoyad, 160, y, { align: 'right' });
doc.text(form.sonGun, 160, y + 10, { align: 'right' });

doc.save('istifa-dilekcesi.pdf');

};

return ( <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4"> <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md space-y-4"> <h1 className="text-2xl font-bold text-center">İstifa Dilekçesi</h1>

<input name="adSoyad" onChange={handleChange} value={form.adSoyad} placeholder="Adınız Soyadınız" className="w-full border p-2 rounded" />
    <input name="pozisyon" onChange={handleChange} value={form.pozisyon} placeholder="Pozisyonunuz" className="w-full border p-2 rounded" />
    <input name="sirket" onChange={handleChange} value={form.sirket} placeholder="Şirket Adı" className="w-full border p-2 rounded" />
    <input type="date" name="istifaTarihi" onChange={handleChange} value={form.istifaTarihi} className="w-full border p-2 rounded" />
    <input type="date" name="sonGun" onChange={handleChange} value={form.sonGun} className="w-full border p-2 rounded" />
    <textarea name="sebep" onChange={handleChange} value={form.sebep} placeholder="İstifa Sebebi (isteğe bağlı)" className="w-full border p-2 rounded h-28" />

    <button onClick={createPDF} className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700">
      İstifa Dilekçesi Oluştur
    </button>
  </div>
</div>

); }

