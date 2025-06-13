// src/components/Kira.js

import React, { useState } from "react"; import jsPDF from "jspdf"; import { robotoBase64 } from "../fonts/roboto"; // Roboto fontu base64 olarak içeren dosya

export default function Kira() { const [form, setForm] = useState({ kirayaVeren: "", kirayaVerenTC: "", kiraci: "", kiraciTC: "", adres: "", baslangicTarihi: "", bitisTarihi: "", bedel: "", depozito: "", ozelKosullar: "" });

const handleChange = (e) => { const { name, value } = e.target; setForm((prev) => ({ ...prev, [name]: value })); };

const generatePDF = () => { const doc = new jsPDF({ unit: "pt", format: "a4" });

doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
doc.setFont("Roboto");
doc.setFontSize(12);

doc.setFontSize(18);
doc.setFont("Roboto", "normal");
doc.text("KİRA SÖZLEŞMESİ", 300, 60, { align: "center" });
doc.setLineWidth(1);
doc.line(40, 75, 555, 75);

const leftX = 50;
let yPos = 110;
const labelWidth = 140;
const inputWidth = 360;
const inputHeight = 20;
const lineHeight = 40;

const drawField = (label, value, y) => {
  doc.text(label, leftX, y - 8);
  doc.rect(leftX + labelWidth, y - inputHeight, inputWidth, inputHeight);
  doc.text(value || "________________________", leftX + labelWidth + 5, y - 5);
};

drawField("Kiraya Veren Adı Soyadı:", form.kirayaVeren, yPos); yPos += lineHeight;
drawField("Kiraya Veren T.C. Kimlik No:", form.kirayaVerenTC, yPos); yPos += lineHeight;
drawField("Kiracı Adı Soyadı:", form.kiraci, yPos); yPos += lineHeight;
drawField("Kiracı T.C. Kimlik No:", form.kiraciTC, yPos); yPos += lineHeight;
drawField("Kiralanan Adres:", form.adres, yPos); yPos += lineHeight + 10;
drawField("Kira Başlangıç Tarihi:", form.baslangicTarihi, yPos); yPos += lineHeight;
drawField("Kira Bitiş Tarihi:", form.bitisTarihi, yPos); yPos += lineHeight;
drawField("Aylık Kira Bedeli (₺):", form.bedel, yPos); yPos += lineHeight;
drawField("Depozito (₺):", form.depozito, yPos); yPos += lineHeight;

doc.text("İşbu sözleşme taraflarca ... tarihinde düzenlenmiştir.", leftX, yPos + 10);

doc.addPage();

doc.setFontSize(16);
doc.text("GENEL KOŞULLAR", 300, 60, { align: "center" });
doc.setFontSize(12);

const genelKosullar = [
  "1. Kiracı, kiralananı özenle kullanmakla yükümlüdür.",
  "2. Kira süresi boyunca aylık kira bedeli zamanında ödenecektir.",
  "3. Kiralanan, üçüncü kişilere devredilemez.",
  "4. Kiracı, kira süresi bitmeden çıkarsa sorumluluklarını yerine getirmelidir.",
  "5. Bakım ve onarımlar kiraya verene aittir.",
  "6. Kira artışı, yıllık TÜFE oranında yapılır.",
  "7. Elektrik, su, doğalgaz vb. abonelikler kiracıya aittir.",
  "8. Kiracı, komşuluk kurallarına uymalıdır.",
  "9. Sözleşme süresi sonunda kiralanan teslim edilir.",
  "10. Taraflar arasında çıkan ihtilaflarda mahkemeler yetkilidir.",
  "11. İki nüsha olarak hazırlanmıştır.",
  "12. Taraflarca okunarak imzalanmıştır."
];

let y = 100;
genelKosullar.forEach((madde) => {
  const splitText = doc.splitTextToSize(madde, 510);
  doc.text(splitText, 50, y);
  y += splitText.length * 16;
});

doc.addPage();

doc.setFontSize(16);
doc.text("ÖZEL KOŞULLAR", 300, 60, { align: "center" });
doc.setFontSize(12);

const ozel = form.ozelKosullar.trim() || "Belirtilmemiştir.";
const ozelLines = doc.splitTextToSize(ozel, 510);
doc.text(ozelLines, 50, 100);

doc.line(80, 700, 230, 700);
doc.text("Kiraya Veren İmza", 110, 715);
doc.line(350, 700, 500, 700);
doc.text("Kiracı İmza", 400, 715);

doc.save("kira_sozlesmesi.pdf");

};

return ( <div style={containerStyle}> <h1 style={{ textAlign: "center" }}>Kira Sözleşmesi Oluştur</h1> <form onSubmit={(e) => { e.preventDefault(); generatePDF(); }} style={formStyle}> <label>Kiraya Veren Adı Soyadı:<input type="text" name="kirayaVeren" value={form.kirayaVeren} onChange={handleChange} required /></label> <label>Kiraya Veren T.C. Kimlik No:<input type="text" name="kirayaVerenTC" value={form.kirayaVerenTC} onChange={handleChange} maxLength={11} required /></label> <label>Kiracı Adı Soyadı:<input type="text" name="kiraci" value={form.kiraci} onChange={handleChange} required /></label> <label>Kiracı T.C. Kimlik No:<input type="text" name="kiraciTC" value={form.kiraciTC} onChange={handleChange} maxLength={11} required /></label> <label>Kiralanan Adres:<textarea name="adres" value={form.adres} onChange={handleChange} rows={3} required /></label> <label>Kira Başlangıç Tarihi:<input type="date" name="baslangicTarihi" value={form.baslangicTarihi} onChange={handleChange} required /></label> <label>Kira Bitiş Tarihi:<input type="date" name="bitisTarihi" value={form.bitisTarihi} onChange={handleChange} required /></label> <label>Aylık Kira Bedeli (₺):<input type="number" name="bedel" value={form.bedel} onChange={handleChange} required min={0} step="0.01" /></label> <label>Depozito (₺):<input type="number" name="depozito" value={form.depozito} onChange={handleChange} required min={0} step="0.01" /></label> <label>Özel Koşullar:<textarea name="ozelKosullar" value={form.ozelKosullar} onChange={handleChange} rows={5} placeholder="Varsa özel koşulları buraya yazınız..." /></label> <button type="submit" style={buttonStyle}>PDF Oluştur</button> </form> </div> ); }

const containerStyle = { maxWidth: 700, margin: "40px auto", fontFamily: "'Roboto', sans-serif", padding: 20, border: "1px solid #ddd", borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.1)" };

const formStyle = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, alignItems: "start" };

const buttonStyle = { gridColumn: "1 / span 2", padding: "12px 0", backgroundColor: "#3498db", color: "white", border: "none", borderRadius: 6, fontSize: 16, cursor: "poi
                                                                   nter", marginTop: 10 };
