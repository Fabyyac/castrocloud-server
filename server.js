// server.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Configurações
app.use(cors()); // permite acessar do seu site no Vercel
app.use(express.json({ limit: '50mb' })); // permite enviar arquivos grandes

cloudinary.config({
  cloud_name: 'dmbeh0vvd',
  api_key: '615461165588513',
  api_secret: 'PfiOXE1bu433wtIvLO8BuUrV4MY'
});

// 🔹 Rota de teste
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// 🔹 Rota de upload
app.post('/upload', async (req, res) => {
  const { file } = req.body;
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: 'castrocloud',
      resource_type: 'auto',
      upload_preset: 'castrocloud_public' // 🔑 usar preset unsigned
    });
    res.json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro no upload' });
  }
});
// 🔹 Start server
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});