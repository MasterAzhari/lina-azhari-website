# Laman web Lina Azhari Marketing (LAM)

Laman pemasaran induk untuk LAM, memaut ke MasterBot, MasterAds, Master Blaster dan Bot Chat.
Laman statik biasa (HTML, CSS, JS) tanpa langkah build. Bahasa Melayu, direka untuk telefon dahulu.

## Halaman
| Fail | Kandungan |
|---|---|
| `index.html` | Utama: hero, kad produk, cara ia berfungsi, bukti & testimoni, tentang Master Azhari, CTA |
| `produk.html` | Butiran setiap produk dengan butang WhatsApp khusus produk |
| `hubungi.html` | Borang lead yang membuka mesej siap diisi di WhatsApp (terus ke MasterBot), email, waktu operasi |

## Tetapan
Semua tetapan ada dalam `assets/config.js`:
- `whatsappNumber`: nombor WhatsApp (format `60123456789`). **Masih nombor contoh.**
- `metaPixelId`: ID Meta Pixel. Kosong bermaksud Pixel tidak dimuatkan. Bila diisi, laman menjejak `PageView`, `Contact` (klik WhatsApp) dan `Lead` (borang).
- `email` dan `links` (subdomain setiap produk).

## Perlu diisi sebelum dilancarkan
- [ ] Nombor WhatsApp sebenar dalam `assets/config.js`
- [ ] Testimoni dan angka sebenar dalam `index.html` (bahagian "Bukti & hasil"), kemudian buang nota draf
- [ ] Gambar Master Azhari (gantikan kotak "MA" dalam `index.html`)
- [ ] Sahkan ayat MasterAds dan Master Blaster dalam `index.html` dan `produk.html`
- [ ] No. pendaftaran SSM di footer (jika ada)
- [ ] ID Meta Pixel
- [ ] Logo sebenar (sekarang logo teks "LAM") dan `assets/og-image.png` jika mahu reka bentuk lain

## Uji di komputer
```sh
python3 -m http.server 8000
# buka http://localhost:8000
```

## Deploy
Mana-mana hosting statik boleh guna (GitHub Pages, Netlify, Cloudflare Pages). Untuk container di pibot.io:
```sh
docker build -t lam-website .
docker run -p 8080:80 lam-website
```
Letak domain `lam.my` terus pada container (DNS A/CNAME, bukan redirect) dan keluarkan SSL melalui Caddy/Nginx, supaya pelawat tidak nampak `pibot.io`. Pautan canonical dan `og:url` sudah ditetapkan kepada `https://lam.my/`.
