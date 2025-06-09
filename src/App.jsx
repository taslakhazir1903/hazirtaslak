import React, { useState } from 'react'; import jsPDF from 'jspdf';

function App() { const [form, setForm] = useState({ mahalle: '', sokak: '', numara: '', cinsi: '', kullanim: '', durum: '', demirbas: '', kirayaVeren: '', kirayaVerenTC: '', kirayaVerenAdres: '', kiraci: '', kiraciTC: '', kiraciAdres: '', baslangic: '', sure: '', yillikBedel: '', aylikBedel: '', odemeSekli: '', tarih: '' });

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => { e.preventDefault(); const doc = new jsPDF(); doc.setFontSize(12);

doc.text('KIRA SOZLESMESI', 105, 15, { align: 'center' });

const lines = [
  `Kiralananin Mahallesi: ${form.mahalle}`,
  `Kiralananin Cadde/Sokagi: ${form.sokak}`,
  `Kiralananin Numarasi: ${form.numara}`,
  `Kiralananin Cinsi: ${form.cinsi}`,
  `Kiralananin Kullanim Sekli: ${form.kullanim}`,
  `Kiralananin Durumu: ${form.durum}`,
  `Demirbaslar: ${form.demirbas}`,
  `Kiraya Veren: ${form.kirayaVeren}`,
  `TC Kimlik No: ${form.kirayaVerenTC}`,
  `Adres: ${form.kirayaVerenAdres}`,
  `Kiraci: ${form.kiraci}`,
  `TC Kimlik No: ${form.kiraciTC}`,
  `Adres: ${form.kiraciAdres}`,
  `Kira Baslangic Tarihi: ${form.baslangic}`,
  `Kira Suresi: ${form.sure}`,
  `Yillik Kira Bedeli: ${form.yillikBedel}`,
  `Aylik Kira Bedeli: ${form.aylikBedel}`,
  `Odeme Sekli: ${form.odemeSekli}`,
];

doc.setFontSize(10);
let y = 25;
lines.forEach((line) => {
  doc.text(line, 20, y);
  y += 6;
});

doc.setFontSize(12);
doc.text('GENEL KOSULLAR', 105, y + 10, { align: 'center' });
const genelKosullar = [
  '1. Kiraci, kiralanani ozenle kullanmak zorundadir.',
  '2. Kiraci, cevrede iyi niyet kurallarina uygun davranmalidir.',
  '3. Kiralanani devredemez, baskasina kiralayamaz.',
  '4. Yazili izin olmadan degisiklik yapilamaz.',
  '5. Ucuncu sahis iddialarinda kiraya verene bildirilmelidir.',
  '6. Onarim ihtiyaci durumunda haber verilmelidir.',
  '7. Kat malikleri kararlarina uyulmalidir.',
  '8. Onarim giderleri kiraciya aittir.',
  '9. Vergiler kiraciya aittir.',
  '10. Kiraci, teslim aldigi sekilde geri vermelidir.',
  '11. Demirbaslar eksiksiz teslim edilmeli.',
  '12. Kiralanan iyi durumda teslim edilmelidir.',
  '13. Sona erme durumunda gezme izni verilmelidir.',
  '14. Bosaltmada zarardan kiraci sorumludur.',
  '15. Saglik tehlikesi durumunda teslim reddi.',
  '16. Luks masraflar kiraciya ait.',
  '17. Yazili onayla anten vb. yaptirilabilir.',
  '18. Borclar kanununa tabi olunacaktir.',
];

y += 16;
genelKosullar.forEach((k) => {
  doc.text(k, 20, y);
  y += 6;
});

doc.text('OZEL KOSULLAR', 105, y + 10, { align: 'center' });
const ozelKosullar = [
  '1. Alt kiraya verilemez, ortak alinmaz.',
  '2. Meskenden baska amacla kullanilamaz.',
  '3. Yalnizca kiraci, es ve cocuklari kalabilir.',
  '4. Odemeler her ayin 5. gunune kadar yapilmalidir.',
  '5. Yakacak ve giderler kiraciya aittir.',
  '6. Tesisatlar saglam olarak teslim edilmistir.',
  '7. Kiraci dikkatli kullanmalidir.',
  '8. Elektrik aboneligi kiraciya aittir.',
  '9. 3 gun icinde beyanname verilecektir.',
  '10. Anlasmazliklar ilgili mahkemelere gider.',
];
y += 16;
ozelKosullar.forEach((k) => {
  doc.text(k, 20, y);
  y += 6;
});

doc.text(`Tarih: ${form.tarih}`, 20, y + 10);
doc.text('Kiraya Veren', 30, y + 30);
doc.text('Kiraci', 100, y + 30);
doc.text('Kefil', 160, y + 30);

doc.save('kira_sozlesmesi.pdf');

};

return ( <div className="max-w-xl mx-auto p-4"> <h1 className="text-xl font-bold mb-4">Kira Sozlesmesi</h1> <form onSubmit={handleSubmit} className="space-y-3"> <input name="mahalle" placeholder="Mahalle" onChange={handleChange} className="w-full border p-2" /> <input name="sokak" placeholder="Cadde/Sokak" onChange={handleChange} className="w-full border p-2" /> <input name="numara" placeholder="Numara" onChange={handleChange} className="w-full border p-2" /> <input name="cinsi" placeholder="Cinsi" onChange={handleChange} className="w-full border p-2" /> <input name="kullanim" placeholder="Kullanim Sekli" onChange={handleChange} className="w-full border p-2" /> <input name="durum" placeholder="Durumu" onChange={handleChange} className="w-full border p-2" /> <textarea name="demirbas" placeholder="Demirbaslar" onChange={handleChange} className="w-full border p-2" /> <hr /> <input name="kirayaVeren" placeholder="Kiraya Veren Ad Soyad" onChange={handleChange} className="w-full border p-2" /> <input name="kirayaVerenTC" placeholder="TC Kimlik No" onChange={handleChange} className="w-full border p-2" /> <textarea name="kirayaVerenAdres" placeholder="Kiraya Veren Adres" onChange={handleChange} className="w-full border p-2" /> <input name="kiraci" placeholder="Kiraci Ad Soyad" onChange={handleChange} className="w-full border p-2" /> <input name="kiraciTC" placeholder="Kiraci TC Kimlik No" onChange={handleChange} className="w-full border p-2" /> <textarea name="kiraciAdres" placeholder="Kiraci Adres" onChange={handleChange} className="w-full border p-2" /> <input name="baslangic" placeholder="Baslangic Tarihi" type="date" onChange={handleChange} className="w-full border p-2" /> <input name="sure" placeholder="Kira Suresi" onChange={handleChange} className="w-full border p-2" /> <input name="yillikBedel" placeholder="Yillik Kira Bedeli" onChange={handleChange} className="w-full border p-2" /> <input name="aylikBedel" placeholder="Aylik Kira Bedeli" onChange={handleChange} className="w-full border p-2" /> <input name="odemeSekli" placeholder="Odeme Sekli" onChange={handleChange} className="w-full border p-2" /> <input name="tarih" placeholder="Tarih" type="date" onChange={handleChange} className="w-full border p-2" /> <button className="bg-blue-600 text-white px-4 py-2 rounded">PDF Olustur</button> </form> </div> ); }

export
  default App;
