import React, { useState } from "react";
import jsPDF from "jspdf";
import { robotoBase64 } from "../fonts/roboto"; // Bu dosyanın projede olduğundan emin ol

export default function Kira() {
  const [form, setForm] = useState({
    kirayaVerenTC: "",
    kirayaVerenAdSoyad: "",
    kirayaVerenAdres: "",
    kiralayanTC: "",
    kiralayanAdSoyad: "",
    kiralayanAdres: "",
    kiraBedeli: "",
    kiraBaslangic: "",
    kiraBitis: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    // Roboto font ekleme
    doc.addFileToVFS("Roboto-Regular.ttf", robotoBase64);
    doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    doc.setFont("Roboto");

    doc.setFontSize(14);
    doc.text("Kira Sözleşmesi", 105, 20, null, null, "center");

    doc.setFontSize(12);
    doc.text(`Kiraya Veren TC: ${form.kirayaVerenTC}`, 20, 40);
    doc.text(`Kiraya Veren Adı Soyadı: ${form.kirayaVerenAdSoyad}`, 20, 50);
    doc.text(`Kiraya Veren Adres: ${form.kirayaVerenAdres}`, 20, 60);

    doc.text(`Kiralayan TC: ${form.kiralayanTC}`, 20, 80);
    doc.text(`Kiralayan Adı Soyadı: ${form.kiralayanAdSoyad}`, 20, 90);
    doc.text(`Kiralayan Adres: ${form.kiralayanAdres}`, 20, 100);

    doc.text(`Kira Bedeli: ${form.kiraBedeli}`, 20, 120);
    doc.text(`Kira Başlangıç Tarihi: ${form.kiraBaslangic}`, 20, 130);
    doc.text(`Kira Bitiş Tarihi: ${form.kiraBitis}`, 20, 140);

    // PDF'i kaydet
    doc.save("kira-sozlesmesi.pdf");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h1>Kira Sözleşmesi Formu</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generatePDF();
        }}
      >
        <label>
          Kiraya Veren TC Kimlik No:
          <input
            name="kirayaVerenTC"
            value={form.kirayaVerenTC}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kiraya Veren Adı Soyadı:
          <input
            name="kirayaVerenAdSoyad"
            value={form.kirayaVerenAdSoyad}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kiraya Veren Adres:
          <input
            name="kirayaVerenAdres"
            value={form.kirayaVerenAdres}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kiralayan TC Kimlik No:
          <input
            name="kiralayanTC"
            value={form.kiralayanTC}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kiralayan Adı Soyadı:
          <input
            name="kiralayanAdSoyad"
            value={form.kiralayanAdSoyad}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kiralayan Adres:
          <input
            name="kiralayanAdres"
            value={form.kiralayanAdres}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kira Bedeli:
          <input
            name="kiraBedeli"
            value={form.kiraBedeli}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kira Başlangıç Tarihi:
          <input
            name="kiraBaslangic"
            type="date"
            value={form.kiraBaslangic}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Kira Bitiş Tarihi:
          <input
            name="kiraBitis"
            type="date"
            value={form.kiraBitis}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">PDF Oluştur</button>
      </form>
    </div>
  );
      }
