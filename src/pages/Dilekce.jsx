import { useState } from "react";
import jsPDF from "jspdf";

export default function Dilekce() {
  const [form, setForm] = useState({
    il: "",
    kurum: "",
    konu: "",
    metin: "",
    tarih: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`${form.il.toUpperCase()} ${form.kurum.toUpperCase()}’NA`, 105, 30, { align: "center" });
    doc.text(`KONU: ${form.konu}`, 20, 45);

    const satirlar = doc.splitTextToSize(form.metin, 170);
    doc.text(satirlar, 20, 65);

    doc.text(`Tarih: ${form.tarih}`, 140, 250);
    doc.text
