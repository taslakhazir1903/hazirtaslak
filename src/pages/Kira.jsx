import { useState } from "react";
import jsPDF from "jspdf";

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVeren: "",
    kirayaVerenTC: "",
    kiraci: "",
    kiraciTC: "",
    adres: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    bedel: "",
    depozito: "",
    ozelKosullar: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(12);
    doc.text("KİRA SÖZLEŞMESİ", 80, 20);

    doc.text(`Kiraya Veren: ${form.kirayaVeren}`, 20, 40);
    doc.text(`TC Kimlik No: ${form.kirayaVerenTC}`, 20, 50);

import { useState } from "react";
import jsPDF from "jspdf";
import { robotoBase64 } from "../fonts/roboto"; // bu dosyayı ayrıca vereceğim

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVeren: "",
    kirayaVerenTC: "",
    kiraci: "",
    kiraciTC: "",
    adres: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    bedel: "",
    depozito: "",
    ozelKosullar: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

import { useState } from "react";
import jsPDF from "jspdf";
import { robotoBase64 } from "../fonts/roboto"; // Bu dosya src/fonts içine eklenecek

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVeren: "",
    kirayaVerenTC: "",
    kiraci: "",
    kiraciTC: "",
    adres: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    bedel: "",
    depozito: "",
    ozelKosullar: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Roboto fontu gömülüyor
    doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
    doc.setFontSize(11);

    // Sayfa 1: Temel Bilgiler
    doc.text("KİRA SÖZLEŞMESİ", 80, 20);
    doc.text(`Kiraya Veren: ${form.kirayaVeren}`, 20, 40);
    doc.text(`TC Kimlik No: ${form.kirayaVerenTC}`, 20, 50);
    doc.text(`Kiracı: ${form.kiraci}`, 20, 60);
    doc.text(`TC Kimlik No: ${form.kiraciTC}`, 20, 70);
    doc.text(`Kiralanan Adres: ${form.adres}`, 20, 80);
    doc.text(`Başlangıç Tarihi: ${form.baslangicTarihi}`, 20, 90);
    doc.text(`Bitiş Tarihi: ${form.bitisTarihi}`, 20, 100);
    doc.text(`Aylık Kira Bedeli: ${form.bedel}`, 20, 110);
    doc.text(`Depozito: ${form.depozito}`, 20, 120);

    // Sayfa 2: Genel Koşullar
    doc.addPage();
    doc.text("GENEL KOŞULLAR", 80, 20);
    const genelKosullar = [
      "Kiracı, kiralananı özenle kullanmakla yükümlüdür.",
      "Kira süresi boyunca aylık kira bedeli zamanında ödenecektir.",
      "Kiralanan, üçüncü kişilere devredilemez.",
      "Kiracı, kira süresi bitmeden çıkarsa sorumluluklarını yerine getirmelidir.",
      "Bakım ve onarımlar kiraya verene aittir.",
      "Kira artışı, yıllık TÜFE oranında yapılır.",
      "Elektrik, su, doğalgaz vb. abonelikler kiracıya aittir.",
      "Kiracı, komşuluk kurallarına uymalıdır.",
// src/components/Kira.js

import React, { useState } from "react";
import jsPDF from "jspdf";
import { robotoBase64 } from "../fonts/roboto"; // src/fonts/roboto.js içinde base64 formatında Roboto font

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVeren: "",
    kirayaVerenTC: "",
    kiraci: "",
    kiraciTC: "",
    adres: "",
    baslangicTarihi: "",
    bitisTarihi: "",
    bedel: "",
    depozito: "",
    ozelKosullar: ""
  });

  // Form inputlarını güncelle
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // PDF oluşturma fonksiyonu
  const generatePDF = () => {
    const doc = new jsPDF({
      unit: "pt",
      format: "a4"
    });

    // Roboto font ekleme (Türkçe karakter için)
    doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");
    doc.setFontSize(12);

    // --- SAYFA 1 - Başlık ve Temel Bilgiler ---

    // Başlık
    doc.setFontSize(18);
    doc.setFont("Roboto", "bold");
    doc.text("KİRA SÖZLEŞMESİ", 300, 60, { align: "center" });

    doc.setFontSize(12);
    doc.setFont("Roboto", "normal");

    // Çizgi üst başlık altı
    doc.setLineWidth(1);
    doc.line(40, 75, 555, 75);

    // Form alanları çizgili kutularla
    const leftX = 50;
    let yPos = 110;
    const labelWidth = 140;
    const inputWidth = 360;
    const inputHeight = 20;
    const lineHeight = 40;

    // Helper fonksiyon: label + kutu + içerik yaz
    function drawField(label, value, y) {
      doc.text(label, leftX, y - 8);
      doc.rect(leftX + labelWidth, y - inputHeight, inputWidth, inputHeight); // kutu çiz
      doc.text(value || "________________________", leftX + labelWidth + 5, y - 5);
    }

    drawField("Kiraya Veren Adı Soyadı:", form.kirayaVeren, yPos);
    yPos += lineHeight;

    drawField("Kiraya Veren T.C. Kimlik No:", form.kirayaVerenTC, yPos);
    yPos += lineHeight;

    drawField("Kiracı Adı Soyadı:", form.kiraci, yPos);
    yPos += lineHeight;

    drawField("Kiracı T.C. Kimlik No:", form.kiraciTC, yPos);
    yPos += lineHeight;

    drawField("Kiralanan Adres:", form.adres, yPos);
    yPos += lineHeight + 10;

    drawField("Kira Başlangıç Tarihi:", form.baslangicTarihi, yPos);
    yPos += lineHeight;

    drawField("Kira Bitiş Tarihi:", form.bitisTarihi, yPos);
    yPos += lineHeight;

    drawField("Aylık Kira Bedeli (₺):", form.bedel, yPos);
    yPos += lineHeight;

    drawField("Depozito (₺):", form.depozito, yPos);
    yPos += lineHeight;

    // Altına tarih ve imza alanı için boşluk bırak
    doc.text("İşbu sözleşme taraflarca ... tarihinde düzenlenmiştir.", leftX, yPos + 10);

    // --- SAYFA 2 - Genel Koşullar ---

    doc.addPage();

    doc.setFontSize(16);
    doc.setFont("Roboto", "bold");
    doc.text("GENEL KOŞULLAR", 300, 60, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("Roboto", "normal");

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

    // --- SAYFA 3 - Özel Koşullar ve İmzalar ---

    doc.addPage();

    doc.setFontSize(16);
    doc.setFont("Roboto", "bold");
    doc.text("ÖZEL KOŞULLAR", 300, 60, { align: "center" });
    doc.setFontSize(12);
    doc.setFont("Roboto", "normal");

    // Özel koşullar çok satırlı text olabilir
    const ozelKosullarMetni = form.ozelKosullar.trim() || "Belirtilmemiştir.";
    const ozelLines = doc.splitTextToSize(ozelKosullarMetni, 510);
    doc.text(ozelLines, 50, 100);

    // İmza alanları (alt kısım)
    doc.line(80, 700, 230, 700); // Kiraya Veren imza çizgisi
    doc.text("Kiraya Veren İmza", 110, 715);

    doc.line(350, 700, 500, 700); // Kiracı imza çizgisi
    doc.text("Kiracı İmza", 400, 715);

    // Kaydet
    doc.save("kira_sozlesmesi.pdf");
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ textAlign: "center" }}>Kira Sözleşmesi Oluştur</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePDF();
        }}
        style={formStyle}
      >
        <label>
          Kiraya Veren Adı Soyadı:
          <input
            type="text"
            name="kirayaVeren"
            value={form.kirayaVeren}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kiraya Veren T.C. Kimlik No:
          <input
            type="text"
            name="kirayaVerenTC"
            value={form.kirayaVerenTC}
            onChange={handleChange}
            maxLength={11}
            required
          />
        </label>

        <label>
          Kiracı Adı Soyadı:
          <input
            type="text"
            name="kiraci"
            value={form.kiraci}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kiracı T.C. Kimlik No:
          <input
            type="text"
            name="kiraciTC"
            value={form.kiraciTC}
            onChange={handleChange}
            maxLength={11}
            required
          />
        </label>

        <label>
          Kiralanan Adres:
          <textarea
            name="adres"
            value={form.adres}
            onChange={handleChange}
            rows={3}
            required
          />
        </label>

        <label>
          Kira Başlangıç Tarihi:
          <input
            type="date"
            name="baslangicTarihi"
            value={form.baslangicTarihi}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kira Bitiş Tarihi:
          <input
            type="date"
            name="bitisTarihi"
            value={form.bitisTarihi}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Aylık Kira Bedeli (₺):
          <input
            type="number"
            name="bedel"
            value={form.bedel}
            onChange={handleChange}
            required
            min={0}
            step="0.01"
          />
        </label>

        <label>
          Depozito (₺):
          <input
            type="number"
            name="depozito"
            value={form.depozito}
            onChange={handleChange}
            required
            min={0}
            step="0.01"
          />
        </label>

        <label>
          Özel Koşullar:
          <textarea
            name="ozelKosullar"
            value={form.ozelKosullar}
            onChange={handleChange}
            rows={5}
            placeholder="Varsa özel koşulları buraya yazınız..."
          />
        </label>

        <button type="submit" style={buttonStyle}>
          PDF Oluştur
        </button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: 700,
  margin: "40px auto",
  fontFamily: "'Roboto', sans-serif",
  padding: 20,
  border: "1px solid #ddd",
  borderRadius: 8,
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const formStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 20,
  alignItems: "start"
};

const buttonStyle = {
  gridColumn: "1 / span 2",
  padding: "12px 0",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: 6,
  fontSize: 16,
  cursor: "pointer",
  marginTop: 10
};
 "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer"
};
71",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer"
};
