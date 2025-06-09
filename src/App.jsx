import React, { useState } from 'react'; import jsPDF from 'jspdf'; import autoTable from 'jspdf-autotable';

function App() { const [form, setForm] = useState({ mahalle: '', sokak: '', numara: '', cinsi: '', kullanim: '', durum: '', demirbas: '', kirayaVeren: '', kirayaVerenTC: '', kirayaVerenAdres: '', kiraci: '', kiraciTC: '', kiraciAdres: '', baslangic: '', sure: '', yillikBedel: '', aylikBedel: '', odemeSekli: '', tarih: '' });

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => { e.preventDefault(); const doc = new jsPDF();

// Sayfa 1 – Bilgi Tablosu
doc.setFontSize(16);
doc.text('KIRA SOZLESMESI', 105, 20, { align: 'center' });

autoTable(doc, {
  startY: 30,
  head: [['Alan', 'Bilgi']],
  body: [
    ['Mahalle', form.mahalle],
    ['Cadde/Sokak', form.sokak],
    ['Numara', form.numara],
    ['Cinsi', form.cinsi],
    ['Kullanim Sekli', form.kullanim],
    ['Durumu', form.durum],
    ['Demirbaslar', form.demirbas],
    ['Kiraya Veren', form.kirayaVeren],
    ['TC Kimlik No', form.kirayaVerenTC],
    ['Adres', form.kirayaVerenAdres],
    ['Kiraci', form.kiraci],
    ['TC Kimlik No', form.kiraciTC],
    ['Adres', form.kiraciAdres],
    ['Baslangic Tarihi', form.baslangic],
    ['Kira Suresi', form.sure],
    ['Yillik Bedel', form.yillikBedel],
    ['Aylik Bedel', form.aylikBedel],
    ['Odeme Sekli', form.odemeSekli],
  ],
  styles: { fontSize: 12, cellPadding: 4 },
  margin: { left: 15, right: 15 },
});

doc.addPage();
doc.setFontSize(14);
doc.text('GENEL KOSULLAR', 105, 20, { align: 'center' });
const genelKosullar = [
  '1. Kiraci, kiralanani ozenle kullanmak zorundadir.',
  '2. Cevede iyi niyet kurallarina uygun davranmalidir.',
  '3. Kiralanani devredemez, baskasina kiralayamaz.',
  '4. Yazili izin olmadan degisiklik yapamaz.',
  '5. Ucuncu sahis iddialarinda bildirim yapilmalidir.',
  '6. Onarim ihtiyacinda kiraya verene haber verilmelidir.',
  '7. Kat malikleri kararlarina uyulmalidir.',
  '8. Onarim giderleri kiraciya aittir.',
  '9. Vergiler kiraciya aittir.',
  '10. Kiraci, teslim aldigi gibi geri vermelidir.',
  '11. Demirbaslar eksiksiz teslim edilmelidir.',
  '12. Kiralanan iyi durumda teslim edilmelidir.',
  '13. Sona erme durumunda gezme izni verilmelidir.',
  '14. Bosaltmada zarardan kiraci sorumludur.',
  '15. Saglik tehlikesi durumunda teslim reddi.',
  '16. Luks masraflar kiraciya aittir.',
  '17. Yazili onayla anten vb. yaptirilabilir.',
  '18. Borclar kanununa tabi olunacaktir.',
];
let y = 30;
doc.setFontSize(12);
genelKosullar.forEach((k) => {
  doc.text(k, 20, y);
  y += 10;
});

doc.addPage();
doc.setFontSize(14);
doc.text('OZEL KOSULLAR', 105, 20, { align: 'center' });
const ozelKosullar = [
  '1. Alt kiraya verilemez.',
  '2. Meskenden baska amacla kullanilamaz.',
  '3. Yalnizca kiraci, es ve cocuklari kalabilir.',
  '4. Odemeler her ayin 5. gunune kadar yapilmalidir.',
  '5. Yakacak ve giderler kiraciya aittir.',
  '6. Tesisatlar saglam teslim edilmistir.',
  '7. Kiraci dikkatli kullanmalidir.',
  '8. Elektrik aboneligi kiraciya aittir.',
  '9. 3 gun icinde beyanname verilecektir.',
  '10. Anlasmazliklarda ilgili mahkemeler yetkilidir.',
];
y = 30;
doc.setFontSize(12);
ozelKosullar.forEach((k) => {
  doc.text(k, 20, y);
  y += 10;
});

y += 10;
doc.text(`Tarih: ${form.tarih}`, 20, y);
y += 25;
doc.text('Kiraya Veren', 30, y);
doc.text('Kiraci', 110, y);
doc.text('Kefil', 160, y);

doc.save('kira_sozlesmesi.pdf');

};

return ( <div className="max-w-3xl mx-auto p-6 space-y-6 text-sm"> <h1 className="text-2xl font-bold text-center mb-4">Hazırtaslak – Kira Sözleşmesi</h1> <form onSubmit={handleSubmit} className="space-y-6"> {/* Kiralanan Bilgiler */} <div className="border p-4 rounded shadow-sm"> <h2 className="font-semibold mb-2">Kiralanan Bilgileri</h2> <div className="grid grid-cols-1 md:grid-cols-2 gap-3"> <input name="mahalle" placeholder="Mahalle" onChange={handleChange} className="border p-2 rounded" /> <input name="sokak" placeholder="Cadde/Sokak" onChange={handleChange} className="border p-2 rounded" /> <input name="numara" placeholder="Numara" onChange={handleChange} className="border p-2 rounded" /> <input name="cinsi" placeholder="Cinsi" onChange={handleChange} className="border p-2 rounded" /> <input name="kullanim" placeholder="Kullanim Sekli" onChange={handleChange} className="border p-2 rounded" /> <input name="durum" placeholder="Durumu" onChange={handleChange} className="border p-2 rounded" /> <textarea name="demirbas" placeholder="Demirbaslar" onChange={handleChange} className="border p-2 rounded col-span-2" /> </div> </div>

{/* Kiraya Veren */}
    <div className="border p-4 rounded shadow-sm">
      <h2 className="font-semibold mb-2">Kiraya Veren Bilgileri</h2>
      <input name="kirayaVeren" placeholder="Ad Soyad" onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <input name="kirayaVerenTC" placeholder="TC Kimlik No" onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <textarea name="kirayaVerenAdres" placeholder="Adres" onChange={handleChange} className="border p-2 rounded w-full" />
    </div>

    {/* Kiracı */}
    <div className="border p-4 rounded shadow-sm">
      <h2 className="font-semibold mb-2">Kiracı Bilgileri</h2>
      <input name="kiraci" placeholder="Ad Soyad" onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <input name="kiraciTC" placeholder="TC Kimlik No" onChange={handleChange} className="border p-2 rounded w-full mb-2" />
      <textarea name="kiraciAdres" placeholder="Adres" onChange={handleChange} className="border p-2 rounded w-full" />
    </div>

    {/* Kira Bilgileri */}
    <div className="border p-4 rounded shadow-sm">
      <h2 className="font-semibold mb-2">Kira Bilgileri</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input name="baslangic" placeholder="Baslangic Tarihi" type="date" onChange={handleChange} className="border p-2 rounded" />
        <input name="sure" placeholder="Kira Suresi" onChange={handleChange} className="border p-2 rounded" />
        <input name="yillikBedel" placeholder="Yillik Bedel" onChange={handleChange} className="border p-2 rounded" />
        <input name="aylikBedel" placeholder="Aylik Bedel" onChange={handleChange} className="border p-2 rounded" />
        <input name="odemeSekli" placeholder="Odeme Sekli" onChange={handleChange} className="border p-2 rounded" />
        <input name="tarih" placeholder="Tarih" type="date" onChange={handleChange} className="border p-2 rounded" />
      </div>
    </div>

    <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">PDF Oluştur</button>
  </form>
</div>

); }

export default App;

