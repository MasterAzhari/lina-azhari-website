# Lina Azhari Marketing (LAM) website

Marketing site for Lina Azhari Marketing, a Malaysian IT company founded in 2018 that runs digital marketing for clients. Its speciality is an Ads Rotation System for marketing teams, and it builds its own products: MasterBot, MasterAds, MasterBlast and Pibot (intelligent chatbot).

Plain static site (HTML, CSS, JS), no build step, English, mobile-first.

## Pages
| File | Content |
|---|---|
| `index.html` | Home: hero, what we do (digital marketing + Ads Rotation System), products, about LAM, call to action |
| `services.html` | Digital marketing services, Ads Rotation System, apps and websites |
| `products.html` | MasterBot, MasterAds, MasterBlast and Pibot |
| `contact.html` | Enquiry form that opens a pre-filled WhatsApp message, WhatsApp, email, office address with Google Maps link |

## Settings
Everything lives in `assets/config.js`: WhatsApp number, default message, email, office address, Meta Pixel ID and product links.
When `metaPixelId` is set, the site tracks `PageView`, `Contact` (WhatsApp clicks) and `Lead` (form submits).

## Still to do before launch
- [ ] Meta Pixel ID in `assets/config.js`
- [ ] Confirm how the Ads Rotation System works (steps in `services.html`) and the MasterAds/MasterBlast copy in `products.html`
- [ ] Product links currently point to planned `*.lam.my` subdomains; update once DNS is live
- [ ] Real team photo, if wanted (About section now shows the LAM logo)
- [ ] Testimonials, if you'd like a proof section
- [ ] SSM registration number in the footer (in `index.html` etc., marked TODO)

## Photos
The hero photos in `assets/img/` (home, technology) are AI-generated with Google Flow (Nano Banana) for LAM. Each has a full-size and an `-800` version for phones.

## Run locally
```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy
Works on any static host (GitHub Pages, Netlify, Cloudflare Pages). For a container on pibot.io:
```sh
docker build -t lam-website .
docker run -p 8080:80 lam-website
```
Point `lam.my` straight at the container (DNS A/CNAME, not a redirect) and issue SSL through Caddy/Nginx so visitors never see `pibot.io`. Canonical and `og:url` tags already use `https://lam.my/`.
