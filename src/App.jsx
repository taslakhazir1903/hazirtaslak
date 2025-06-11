const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Türkçe karakterler için font dosyası yolu
const FONT_PATH = path.join(__dirname, 'fonts', 'DejaVuSans.ttf');

// Ana sayfa HTML'i serve etmek için
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="tr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>İstifa Dilekçesi Oluşturucu</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .container {
                background: white;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            h1 {
                color: #333;
                text-align: center;
                margin-bottom: 30px;
            }
            .form-group {
                margin-bottom: 20px;
            }
            label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
                color: #555;
            }
            input, textarea, select {
                width: 100%;
                padding: 10px;
                border: 2px solid #ddd;
                border-radius: 5px;
                font-size: 16px;
                box-sizing: border-box;
            }
            input:focus, textarea:focus, select:focus {
                border-color: #4CAF50;
                outline: none;
            }
            textarea {
                height: 100px;
                resize: vertical;
            }
            .btn {
                background-color: #4CAF50;
                color: white;
                padding: 12px 30px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                width: 100%;
                margin-top: 20px;
            }
            .btn:hover {
                background-color: #45a049;
            }
            .row {
                display: flex;
                gap: 20px;
            }
            .col {
                flex: 1;
            }
            @media (max-width: 600px) {
                .row {
                    flex-direction: column;
                    gap: 0;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>📄 İstifa Dilekçesi Oluşturucu</h1>
            <form id="resignationForm">
                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="employeeName">Ad Soyad:</label>
                            <input type="text" id="employeeName" name="employeeName" required>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="position">Pozisyon:</label>
                            <input type="text" id="position" name="position" required>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="department">Departman:</label>
                            <input type="text" id="department" name="department" required>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="employeeId">Sicil No:</label>
                            <input type="text" id="employeeId" name="employeeId">
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="companyName">Şirket Adı:</label>
                    <input type="text" id="companyName" name="companyName" required>
                </div>

                <div class="form-group">
                    <label for="managerName">Amir/Yönetici Adı:</label>
                    <input type="text" id="managerName" name="managerName" required>
                </div>

                <div class="row">
                    <div class="col">
                        <div class="form-group">
                            <label for="startDate">İşe Başlama Tarihi:</label>
                            <input type="date" id="startDate" name="startDate" required>
                        </div>
                    </div>
                    <div class="col">
                        <div class="form-group">
                            <label for="resignationDate">İstifa Tarihi:</label>
                            <input type="date" id="resignationDate" name="resignationDate" required>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="lastWorkingDay">Son Çalışma Günü:</label>
                    <input type="date" id="lastWorkingDay" name="lastWorkingDay" required>
                </div>

                <div class="form-group">
                    <label for="reason">İstifa Nedeni (Opsiyonel):</label>
                    <select id="reason" name="reason">
                        <option value="">Seçiniz...</option>
                        <option value="Kişisel nedenler">Kişisel nedenler</option>
                        <option value="Kariyer değişikliği">Kariyer değişikliği</option>
                        <option value="Yeni iş fırsatı">Yeni iş fırsatı</option>
                        <option value="Eğitim">Eğitim</option>
                        <option value="Aile nedenleri">Aile nedenleri</option>
                        <option value="Sağlık nedenleri">Sağlık nedenleri</option>
                        <option value="Diğer">Diğer</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="additionalNotes">Ek Notlar (Opsiyonel):</label>
                    <textarea id="additionalNotes" name="additionalNotes" placeholder="Teşekkür mesajı veya diğer notlarınızı buraya yazabilirsiniz..."></textarea>
                </div>

                <button type="submit" class="btn">📄 PDF Oluştur ve İndir</button>
            </form>
        </div>

        <script>
            document.getElementById('resignationForm').addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                try {
                    const response = await fetch('/generate-resignation-pdf', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data)
                    });
                    
                    if (response.ok) {
                        const blob = await response.blob();
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'istifa-dilekçesi-' + data.employeeName.replace(/\\s+/g, '-').toLowerCase() + '.pdf';
                        document.body.appendChild(a);
                        a.click();
                        window.URL.revokeObjectURL(url);
                        document.body.removeChild(a);
                    } else {
                        alert('PDF oluşturulurken bir hata oluştu.');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('PDF oluşturulurken bir hata oluştu.');
                }
            });

            // Bugünün tarihini varsayılan olarak ayarla
            document.getElementById('resignationDate').valueAsDate = new Date();
            
            // Son çalışma gününü otomatik hesapla (30 gün sonra)
            const lastWorkingDay = new Date();
            lastWorkingDay.setDate(lastWorkingDay.getDate() + 30);
            document.getElementById('lastWorkingDay').valueAsDate = lastWorkingDay;
        </script>
    </body>
    </html>
    `);
});

// PDF oluşturma endpoint'i
app.post('/generate-resignation-pdf', async (req, res) => {
    try {
        const {
            employeeName,
            position,
            department,
            employeeId,
            companyName,
            managerName,
            startDate,
            resignationDate,
            lastWorkingDay,
            reason,
            additionalNotes
        } = req.body;

        // PDF dökümanı oluştur
        const doc = new PDFDocument({
            size: 'A4',
            margin: 50
        });

        // Türkçe font ayarla (font dosyası mevcut değilse varsayılan font kullanılır)
        try {
            if (fs.existsSync(FONT_PATH)) {
                doc.font(FONT_PATH);
            }
        } catch (err) {
            console.log('Font dosyası bulunamadı, varsayılan font kullanılıyor');
        }

        // PDF içeriğini buffer'a yazma
        const chunks = [];
        doc.on('data', chunk => chunks.push(chunk));
        doc.on('end', () => {
            const pdfBuffer = Buffer.concat(chunks);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="istifa-dilekçesi-${employeeName.replace(/\\s+/g, '-').toLowerCase()}.pdf"`);
            res.send(pdfBuffer);
        });

        // Tarih formatı
        const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString('tr-TR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        };

        // Başlık
        doc.fontSize(16).fillColor('#000').text('İSTİFA DİLEKÇESİ', 50, 50, { align: 'center' });
        doc.moveDown(2);

        // Tarih ve kimden bilgileri
        doc.fontSize(12);
        doc.text(`Tarih: ${formatDate(resignationDate)}`, 400, 120);
        doc.moveDown(2);

        // Kime
        doc.text('Sayın,', 50, 160);
        doc.text(managerName, 50, 180);
        doc.text(companyName, 50, 200);
        doc.moveDown(2);

        // Ana metin
        doc.text('Konu: İstifa Dilekçesi', 50, 240);
        doc.moveDown(1);

        let mainText = `Sayın Yöneticim,

${startDate ? formatDate(startDate) + ' tarihinden bu yana' : 'Uzun süredir'} ${companyName} bünyesinde ${position} olarak görev yapmaktayım. Bu süre zarfında edindiğim tecrübeler ve kazandığım bilgiler için teşekkür ederim.

${reason ? `${reason} nedeniyle` : 'Kişisel nedenlerle'} işimden istifa etmeye karar verdim. Bu kararımı ${formatDate(resignationDate)} tarihinde size bildiriyor ve son çalışma günümün ${formatDate(lastWorkingDay)} olmasını talep ediyorum.

Görev devir teslim işlemlerimi zamanında ve eksiksiz olarak gerçekleştireceğimi taahhüt ederim. Bu süreçte size ve ekip arkadaşlarıma her türlü desteği vermeye hazırım.`;

        if (additionalNotes && additionalNotes.trim()) {
            mainText += `

${additionalNotes.trim()}`;
        }

        mainText += `

Anlayışınız için teşekkür eder, saygılarımı sunarım.`;

        doc.text(mainText, 50, 280, {
            align: 'justify',
            lineGap: 5
        });

        // İmza bölümü
        const currentY = doc.y + 40;
        doc.text('Saygılarımla,', 50, currentY);
        doc.text('______________________', 50, currentY + 40);
        doc.text(employeeName, 50, currentY + 60);
        
        if (employeeId) {
            doc.text(`Sicil No: ${employeeId}`, 50, currentY + 80);
        }
        
        doc.text(`Departman: ${department}`, 50, currentY + 100);
        doc.text(`Pozisyon: ${position}`, 50, currentY + 120);

        // Alt bilgi
        doc.fontSize(10).fillColor('#666');
        doc.text('Bu belge elektronik ortamda oluşturulmuştur.', 50, 750, { align: 'center' });

        doc.end();

    } catch (error) {
        console.error('PDF oluşturma hatası:', error);
        res.status(500).json({ error: 'PDF oluşturulurken bir hata oluştu' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor`);
    console.log(`Uygulama: http://localhost:${PORT}`);
});

module.exports = app;
