@'
# TaskFlow - Görev Yönetim API'si

Node.js ve Express.js ile geliştirilmiş görev yönetim REST API'si.

## Gereksinimler
- Node.js 18 veya üzeri
- Git

## 1. Projeyi indir
```bash
git clone https://github.com/a-selin/TaskFlow.git
cd taskflow-api
```

## 2. Bağımlılıkları kur
```bash
npm install
```

## 3. Sunucuyu çalıştır
```bash
npm start
```
Terminalde `Sunucu 3000 portunda çalışıyor...` yazısı görünür. API `http://localhost:3000` adresinde çalışır. Kontrol için tarayıcıda `http://localhost:3000/gorevler` adresini aç.

Sunucuyu durdurmak için terminalde `Ctrl + C` tuşlarına bas.
'@ | Set-Content -Path README.md -Encoding UTF8