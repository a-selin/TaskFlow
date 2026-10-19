const express = require('express');
const router = express.Router();

const DURUMLAR = ['beklemede', 'devam-ediyor', 'tamamlandi'];
const ONCELIKLER = ['dusuk', 'orta', 'yuksek'];

let gorevler = [
  {
    id: 1,
    baslik: 'Giriş sayfasını tasarla',
    aciklama: 'Login ekranı arayüzü hazırlanacak.',
    atanan: 'Ayşe Yılmaz',
    durum: 'devam-ediyor',
    oncelik: 'yuksek',
    sonTarih: '2026-10-25',
    olusturmaTarihi: new Date().toISOString()
  },
  {
    id: 2,
    baslik: 'Veritabanı şemasını çıkar',
    aciklama: 'Tablo ve ilişkiler belirlenecek.',
    atanan: 'Ali Demir',
    durum: 'beklemede',
    oncelik: 'orta',
    sonTarih: '2026-10-28',
    olusturmaTarihi: new Date().toISOString()
  }
];

let sonrakiId = 3;

router.get('/', (req, res) => {
  res.json({ basarili: true, adet: gorevler.length, veri: gorevler });
});

router.get('/:id', (req, res) => {
  const gorev = gorevler.find((g) => g.id === Number(req.params.id));

  if (!gorev) {
    return res.status(404).json({ basarili: false, mesaj: 'Görev bulunamadı' });
  }

  res.json({ basarili: true, veri: gorev });
});

router.post('/', (req, res) => {
  const { baslik, aciklama, atanan, durum, oncelik, sonTarih } = req.body || {};

  if (!baslik || typeof baslik !== 'string' || !baslik.trim()) {
    return res.status(400).json({ basarili: false, mesaj: 'baslik alanı zorunludur' });
  }
  if (durum !== undefined && !DURUMLAR.includes(durum)) {
    return res.status(400).json({ basarili: false, mesaj: `durum şunlardan biri olmalı: ${DURUMLAR.join(', ')}` });
  }
  if (oncelik !== undefined && !ONCELIKLER.includes(oncelik)) {
    return res.status(400).json({ basarili: false, mesaj: `oncelik şunlardan biri olmalı: ${ONCELIKLER.join(', ')}` });
  }

  const yeniGorev = {
    id: sonrakiId++,
    baslik,
    aciklama: aciklama || '',
    atanan: atanan || null,
    durum: durum || 'beklemede',
    oncelik: oncelik || 'orta',
    sonTarih: sonTarih || null,
    olusturmaTarihi: new Date().toISOString()
  };

  gorevler.push(yeniGorev);
  res.status(201).json({ basarili: true, mesaj: 'Görev oluşturuldu', veri: yeniGorev });
});

router.put('/:id', (req, res) => {
  const gorev = gorevler.find((g) => g.id === Number(req.params.id));

  if (!gorev) {
    return res.status(404).json({ basarili: false, mesaj: 'Görev bulunamadı' });
  }

  const { baslik, aciklama, atanan, durum, oncelik, sonTarih } = req.body || {};

  if (durum !== undefined && !DURUMLAR.includes(durum)) {
    return res.status(400).json({ basarili: false, mesaj: `durum şunlardan biri olmalı: ${DURUMLAR.join(', ')}` });
  }
  if (oncelik !== undefined && !ONCELIKLER.includes(oncelik)) {
    return res.status(400).json({ basarili: false, mesaj: `oncelik şunlardan biri olmalı: ${ONCELIKLER.join(', ')}` });
  }

  if (baslik !== undefined) gorev.baslik = baslik;
  if (aciklama !== undefined) gorev.aciklama = aciklama;
  if (atanan !== undefined) gorev.atanan = atanan;
  if (durum !== undefined) gorev.durum = durum;
  if (oncelik !== undefined) gorev.oncelik = oncelik;
  if (sonTarih !== undefined) gorev.sonTarih = sonTarih;

  res.json({ basarili: true, mesaj: 'Görev güncellendi', veri: gorev });
});

router.delete('/:id', (req, res) => {
  const index = gorevler.findIndex((g) => g.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({ basarili: false, mesaj: 'Görev bulunamadı' });
  }

  const silinen = gorevler.splice(index, 1)[0];
  res.json({ basarili: true, mesaj: 'Görev silindi', veri: silinen });
});

module.exports = router;