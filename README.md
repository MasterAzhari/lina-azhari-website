# Lina Azhari Marketing (LAM) website

Marketing site for Lina Azhari Marketing, founded 2018. LAM is a Malaysian IT company that runs digital marketing for clients. Its speciality is an ads rotation system for marketing teams to advertise their products. LAM also builds apps and websites, and its own products MasterBot, MasterAds, MasterBlast and Pibot (an intelligent chatbot).

Plain static site (HTML, CSS, JS), no build step, English, mobile-first.

## Pages
| File | Content |
|---|---|
| `index.html` | Home: hero, what we do, product cards, about LAM, call to action |
| `digital-marketing.html` | Digital marketing services for clients and the ads rotation system for marketing teams |
| `technology.html` | Client services (apps, websites, web apps) and product details |
| `contact.html` | Enquiry form that opens a pre-filled WhatsApp message, WhatsApp, email, office address with Google Maps link |

## Settings
Everything lives in `assets/config.js`: WhatsApp number, default message, email, office address, Meta Pixel ID and product links.
When `metaPixelId` is set, the site tracks `PageView`, `Contact` (WhatsApp clicks) and `Lead` (form submits).

## Still to do before launch
- [ ] Meta Pixel ID in `assets/config.js`
- [ ] Confirm ads rotation system features in `digital-marketing.html`
- [ ] Confirm product copy for MasterAds, MasterBlast and Pibot in `index.html` and `technology.html`
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
