const express = require('express');
const app = express();

const logger = require('./middleware/logger');
const gorev = require('./routes/gorev');

app.use(express.json());

app.use(logger);

app.get('/', (req, res) => {
  res.json({ message: 'TaskFlow API çalışıyor' });
});

app.use('/gorevler', gorev);

app.use((req, res) => {
  res.status(404).json({ basarili: false, mesaj: 'Endpoint bulunamadı' });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ basarili: false, mesaj: 'Geçersiz JSON formatı' });
  }
  console.error(err);
  res.status(500).json({ basarili: false, mesaj: 'Sunucu hatası' });
});

module.exports = app;