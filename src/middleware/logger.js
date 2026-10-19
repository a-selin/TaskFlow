const fs = require('fs');
const path = require('path');

const logKlasoru = path.join(__dirname, '..', '..', 'logs');
const logDosyasi = path.join(logKlasoru, 'requests.log');

if (!fs.existsSync(logKlasoru)) {
  fs.mkdirSync(logKlasoru, { recursive: true });
}

function logger(req, res, next) {
  const zaman = new Date().toISOString();
  const satir = `[${zaman}] ${req.method} ${req.originalUrl}`;

  console.log(satir);
  fs.appendFile(logDosyasi, satir + '\n', (err) => {
    if (err) console.error('Log dosyasına yazılamadı:', err.message);
  });

  next();
}

module.exports = logger;