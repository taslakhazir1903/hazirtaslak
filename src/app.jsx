import React, { useState } from 'react';

function App() { const [form, setForm] = useState({ kirayaVeren: '', kiraci: '', tcNo: '', adres: '', baslangic: '', bitis: '', kiraBedeli: '' });

const handleChange = (e) => { setForm({ ...form, [e.target.name]: e.target.value }); };

const handleSubmit = (e) => { e.preventDefault(); console.log(form); alert("PDF üretim aşaması bir sonraki adımda eklenecek."); };

return ( <div className="max-w-xl mx-auto p-4 font-sans"> <h1 className="text-2xl font-bold mb-4">Kira Kontratı Formu</h1> <form onSubmit={handleSubmit} className="space-y-4"> <input type="text" name="kirayaVeren" placeholder="Kiraya Veren Ad Soyad" onChange={handleChange} className="w-full border p-2 rounded" /> <input type="text" name="kiraci" placeholder="Kiracı Ad Soyad" onChange={handleChange} className="w-full border p-2 rounded" /> <input type="number" name="tcNo" placeholder="TC Kimlik No" onChange={handleChange} className="w-full border p-2 rounded" /> <textarea name="adres" placeholder="Kiralanan Yer Adresi" onChange={handleChange} className="w-full border p-2 rounded"></textarea> <div className="flex gap-4"> <input type="date" name="baslangic" onChange={handleChange} className="w-full border p-2 rounded" /> <input type="date" name="bitis" onChange={handleChange} className="w-full border p-2 rounded" /> </div> <input type="number" name="kiraBedeli" placeholder="Aylık Kira Bedeli (₺)" onChange={handleChange} className="w-full border p-2 rounded" /> <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">PDF Oluştur</button> </form> </div> ); }

export default App;

