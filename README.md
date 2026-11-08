# Lina Azhari Marketing (LAM) website

Marketing site for Lina Azhari Marketing, a Malaysian IT company founded in 2018 that runs digital marketing for clients. Its speciality is an Ads Rotation System for marketing teams, and it builds its own products: MasterBot, MasterAds, MasterBlaster and Pibot (intelligent chatbot).

Plain static site (HTML, CSS, JS), no build step, English, mobile-first.

## Pages
| File | Content |
|---|---|
| `index.html` | Home: hero, what we do (digital marketing + Ads Rotation System), products, about LAM, call to action |
| `services.html` | Digital marketing services, Ads Rotation System, apps and websites |
| `products.html` | MasterBot, MasterAds, MasterBlaster and Pibot |
| `masterbot.html` | MasterBot AI WhatsApp bot: features, real panel screenshots, FAQ, free demo |
| `pibot.html` | Pibot chatbot builder: builder and live chat screenshots, free demo |
| `contact.html` | Enquiry form that opens a pre-filled WhatsApp message, WhatsApp, email, office address with Google Maps link |

## Settings
Everything lives in `assets/config.js`: WhatsApp number, default message, email, office address, Meta Pixel ID and product links.
When `metaPixelId` is set, the site tracks `PageView`, `Contact` (WhatsApp clicks) and `Lead` (form submits).

## Still to do before launch
- [ ] Meta Pixel ID in `assets/config.js`
- [ ] Confirm how the Ads Rotation System works (steps in `services.html`) and the MasterAds/MasterBlaster copy in `products.html`
- [ ] Product links currently point to planned `*.lam.my` subdomains; update once DNS is live
- [ ] Real team photo, if wanted (About section now shows the LAM logo)
- [ ] Testimonials, if you'd like a proof section
- [ ] SSM registration number in the footer (in `index.html` etc., marked TODO)

## SEO
- Each page has its own title, meta description, canonical URL, Open Graph and Twitter tags.
- JSON-LD structured data: Organization/ProfessionalService with address and phone (Home, Contact), SoftwareApplication (MasterBot, Pibot), FAQPage (MasterBot), BreadcrumbList (all pages).
- `sitemap.xml` and `robots.txt` at the site root; submit the sitemap in Google Search Console.
- nginx: gzip, 7-day cache for `/assets/`, `no-cache` for pages, `/index.html` redirects to `/`.
- CSS/JS links carry `?v=<hash>` of the file content; regenerate the pages after changing `style.css`, `main.js` or `config.js` so the hash changes and browsers fetch the new file.

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
Point `lam.my` straight at the container (DNS A/CNAME, not a redirect) and issue SSL through Caddy/Nginx so visitors never see `pibot.io`. Canonical, `og:url`, structured data, `sitemap.xml` and `robots.txt` currently use `https://lam.pibot.io` so Google can index the live site. When `lam.my` is live: change every `https://lam.pibot.io` in the HTML, `sitemap.xml` and `robots.txt` to `https://lam.my`, and 301-redirect lam.pibot.io to lam.my.
