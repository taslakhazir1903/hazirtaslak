const createPDF = async () => {
  const res = await fetch('/roboto.json');
  const data = await res.json();

  const doc = new jsPDF();
  doc.addFileToVFS('Roboto-Regular.ttf', data.font);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
  doc.setFont('Roboto');
  doc.setFontSize(12);

  // PDF metinleri buraya yazılır
  doc.text("İSTİFA DİLEKÇESİ", 105, 30, { align: 'center' });

  doc.save('istifa-dilekcesi.pdf');
};
