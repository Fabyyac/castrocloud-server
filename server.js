const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

const app = express();

// Permite enviar arquivos grandes (base64)
app.use(express.json({ limit: '10mb' }));

// Permite conexão do seu site
app.use(cors());

// CONFIG DO CLOUDINARY
cloudinary.config({
  cloud_name: 'dmbeh0vvd',
  api_key: '615461165588513',
  api_secret: 'PfiOXE1bu433wtIvLO8BuUrV4MY'
});

// ROTA DE UPLOAD
app.post('/upload', async (req, res) => {
  try {
    const file = req.body.file;

    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto'
    });

    res.json({
      url: result.secure_url
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// PORTA DO SERVIDOR
app.listen(3000, () => {
  console.log("Servidor rodando...");
});