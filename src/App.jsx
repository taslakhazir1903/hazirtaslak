import { useState } from 'react';
import jsPDF from 'jspdf';

const robotoBase64 = "AAEAAAASAQAABAAgR0RFRrRCsIIAAjWsAAACYkdQT1...";

export default function App() {
  const [form, setForm] = useState({
    adSoyad: '',
    pozisyon: '',
    sirket: '',
    istifaTarihi: '',
    sonGun: '',
    sebep: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createPDF = () => {
    const doc = new jsPDF();
    doc.addFileToVFS('Roboto-Regular.ttf', robotoBase64);
    doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    doc.setFont('Roboto');
    doc.setFontSize(12);
    doc.text("Test PDF ✓", 20, 20);
    doc.save("istifa-dilekcesi.pdf");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">İstifa Dilekçesi Oluştur</h1>
        <input name="adSoyad" onChange={handleChange} value={form.adSoyad} placeholder="Ad Soyad" className="w-full border p-3 rounded" />
        <button onClick={createPDF} className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700">
          PDF Olarak İndir
        </button>
      </div>
    </div>
  );
}