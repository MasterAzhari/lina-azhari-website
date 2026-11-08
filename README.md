# Lina Azhari Marketing (LAM) website

Marketing site for Lina Azhari Marketing, founded 2018. It covers LAM's two businesses:

1. **Health insurance marketing** as a marketing agent for [Medisavers](https://www.medisavers.my/)
2. **Technology development**: mobile apps, websites and web apps for clients, plus LAM's own products Pibot, MasterBot, MasterAds and MasterBlaster

Plain static site (HTML, CSS, JS), no build step, English, mobile-first.

## Pages
| File | Content |
|---|---|
| `index.html` | Home: hero, the two businesses, product cards, about LAM, call to action |
| `insurance.html` | Health insurance with Medisavers: how we help, who it's for, agent disclaimer |
| `technology.html` | Client services (apps, websites, web apps) and product details |
| `contact.html` | Enquiry form that opens a pre-filled WhatsApp message, WhatsApp, email, office address with Google Maps link |

## Settings
Everything lives in `assets/config.js`: WhatsApp number, default message, email, office address, Meta Pixel ID and product links.
When `metaPixelId` is set, the site tracks `PageView`, `Contact` (WhatsApp clicks) and `Lead` (form submits).

## Still to do before launch
- [ ] Meta Pixel ID in `assets/config.js`
- [ ] Confirm product copy for MasterAds, MasterBlaster and Pibot in `index.html` and `technology.html`
- [ ] Product links currently point to planned `*.lam.my` subdomains; update once DNS is live
- [ ] Real team photo, if wanted (About section now shows the LAM logo)
- [ ] Testimonials, if you'd like a proof section
- [ ] SSM registration number in the footer (in `index.html` etc., marked TODO)
- [ ] Check Medisavers' agent guidelines on using their name, and whether you can use their logo

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
